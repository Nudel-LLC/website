# テスト戦略

## 概要

| 種別 | ツール | 実行環境 | コマンド |
|------|--------|----------|---------|
| ユニットテスト | Vitest + Testing Library | jsdom（ローカル） | `npm run test` |
| E2E テスト | Playwright | alpha 環境（CI）/ ローカル dev サーバー | `npm run e2e` |

## ユニットテスト（Vitest）

### 設定（`vitest.config.ts`）

- **環境**: jsdom
- **グローバル**: `true`（`describe`, `it`, `expect` 等をインポート不要）
- **セットアップ**: `src/__tests__/setup.ts`
- **検出パターン**: `src/**/*.test.{ts,tsx}`
- **CSS 処理**: 無効（高速化のため）
- **カバレッジ対象**: `src/**/*.{ts,tsx}`（テストファイル自体は除外）

### テストセットアップ（`src/__tests__/setup.ts`）

jsdom 環境では動作しないライブラリをモック化している。

| モジュール | モック内容 |
|------------|-----------|
| `motion/react` | `motion.*` コンポーネントを通常の HTML 要素に変換。アニメーション専用 props（`initial`, `animate`, `transition` 等）を除去 |
| `next/image` | `<img>` タグに変換 |
| `next/link` | `<a>` タグに変換 |

また `@testing-library/jest-dom/vitest` をインポートし、`toBeInTheDocument()` 等のカスタムマッチャーを有効化している。

### テストファイルの配置

テスト対象ファイルと同じディレクトリに `*.test.ts(x)` として配置する。

```
src/lib/microcms/
├── client.ts
├── client.test.ts
├── sanitize.ts
└── sanitize.test.ts
```

### コマンド

| コマンド | 説明 |
|----------|------|
| `npm run test` | 全ユニットテストを一度実行 |
| `npm run test:watch` | ファイル変更を監視して自動再実行 |
| `npm run test:coverage` | テスト + カバレッジレポート生成 |

## E2E テスト（Playwright）

### 設定（`playwright.config.ts`）

**ベース URL**:
- `PLAYWRIGHT_BASE_URL` 環境変数で指定（CI では alpha 環境の URL を設定）
- 未指定の場合は `http://localhost:3000`（ローカル dev サーバー）

**ローカル実行時の自動 dev サーバー起動**: `PLAYWRIGHT_BASE_URL` が未設定の場合、`npm run dev` を自動起動する。

**ブラウザプロジェクト**:

| プロジェクト | 環境 | 実行タイミング |
|-------------|------|----------------|
| `chromium` | Desktop Chrome | 常時 |
| `mobile-chrome` | Pixel 5 | 常時 |
| `firefox` | Desktop Firefox | ローカルのみ |
| `webkit` | Desktop Safari | ローカルのみ |

**CI 設定**:
- `workers: 1`（並列無効）
- `retries: 2`
- `forbidOnly: true`（`.only` を含むテストはエラー）
- 失敗時にスクリーンショットとトレースを保存
- レポートは `playwright-report/` と `test-results/` にアーティファクトとして 7 日間保存される

### テストファイル

| ファイル | テスト内容 |
|----------|------------|
| `e2e/smoke.spec.ts` | サイト全体の基本疎通確認（最小限のチェック） |
| `e2e/home.spec.ts` | トップページの各セクション表示・機能 |
| `e2e/navigation.spec.ts` | ナビゲーションのリンク遷移 |
| `e2e/contact-form.spec.ts` | コンタクトフォームの入力・送信フロー |
| `e2e/services.spec.ts` | サービス一覧・詳細ページの表示 |

### コマンド

| コマンド | 説明 |
|----------|------|
| `npm run e2e` | 全 E2E テストを実行 |
| `npm run e2e:smoke` | スモークテストのみ実行（`e2e/smoke.spec.ts`） |
| `npm run e2e:ui` | Playwright UI モードで実行 |
| `npm run e2e:headed` | ブラウザ表示付きで実行 |
| `npm run e2e:install` | Playwright ブラウザをインストール |

### ローカルで alpha 環境に対して実行する

```bash
PLAYWRIGHT_BASE_URL=https://alpha.nudel.co.jp npm run e2e
```

## CI でのテスト実行順序

```
PR / Push
  ↓
Lint ┐
     ├→ Build → Deploy Preview（PR時のみ、dependabot除く）
Typecheck ┤
     └→（main マージ）→ Deploy Alpha → E2E テスト（Playwright）
Test ┘                 （semver タグ）→ Deploy Prod
```

Lint / Typecheck / Test は並列実行され、すべて成功した場合に Build が実行される。

### CI での E2E テストの動作

- **実行ブラウザ**: Chromium のみ（mobile-chrome / Firefox / Safari は除外）
- **オプション**: `--ignore-snapshots`（スナップショットの差分は無視）
- **alpha 環境の準備待機**: デプロイ後に最大 300 秒（10 秒 × 30 回）ポーリングして疎通確認
- **レポート保存**: `playwright-report/` と `test-results/` を 7 日間アーティファクトとして保存

### セキュリティワークフロー

PR / main へのプッシュ時に以下が追加で実行される：

| ワークフロー | 内容 |
|-------------|------|
| `security.yml` | `npm audit --audit-level=high`。除外設定済みの脆弱性は `scripts/check-audit.mjs` で許容 |
| `codeql.yml` | CodeQL による静的解析（JavaScript / TypeScript, security-extended クエリ）。毎週月曜にも定期実行 |

### ローカルでの確認

PR マージ前に必ず以下を実行してすべて通ることを確認すること。

```bash
npm run lint
npm run typecheck
npm run test
```
