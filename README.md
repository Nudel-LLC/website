# Nudel LLC - Corporate Website

**ご縁を力に、価値を形に。**

[Nudel LLC](https://nudel.co.jp) のコーポレートサイトのソースコードです。

## 技術スタック

| カテゴリ | 技術 |
| --- | --- |
| フレームワーク | [Next.js](https://nextjs.org/) 16 (App Router) |
| 言語 | [TypeScript](https://www.typescriptlang.org/) 5 |
| UI | [React](https://react.dev/) 19, [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/) 4 |
| アニメーション | [Motion](https://motion.dev/) |
| API | [tRPC](https://trpc.io/) 11, [TanStack Query](https://tanstack.com/query) |
| バリデーション | [Zod](https://zod.dev/) |
| ユニットテスト | [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/) |
| E2E テスト | [Playwright](https://playwright.dev/) |
| Lint | [Biome](https://biomejs.dev/) |
| メール | [Resend](https://resend.com/) |
| デプロイ | [Cloudflare Workers](https://workers.cloudflare.com/) ([OpenNext](https://opennext.js.org/cloudflare)) |
| CI/CD | [GitHub Actions](https://github.com/features/actions) |

## 必要要件

- Node.js >= 22
- npm

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/Nudel-LLC/website.git
cd website

# 依存関係をインストール
npm install
```

### 環境変数

ローカル開発には `.env.local` ファイルを作成してください。

```bash
# メール送信（コンタクトフォームのテストに必要）
RESEND_API_KEY=re_xxxxxxxx

# メール送信先（ローカルでは Resend のテストアドレスを使用）
CONTACT_EMAIL_TO=delivered@resend.dev
```

> **Note**: `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` はデプロイ時のみ必要です。GitHub Secrets に設定されています。

## 開発

```bash
# 開発サーバーを起動（Turbopack 使用）
npm run dev
```

http://localhost:3000 でサイトが表示されます。

## スクリプト一覧

### 開発

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバー起動（Turbopack） |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run preview` | Cloudflare ローカルプレビュー（alpha 環境設定） |

### コード品質

| コマンド | 説明 |
| --- | --- |
| `npm run lint` | Biome によるリント |
| `npm run lint:fix` | リントの自動修正 |
| `npm run typecheck` | TypeScript 型チェック |

### テスト

| コマンド | 説明 |
| --- | --- |
| `npm run test` | ユニットテスト実行 |
| `npm run test:watch` | ユニットテスト監視モード |
| `npm run test:coverage` | ユニットテスト + カバレッジ |
| `npm run e2e` | Playwright E2E テスト |
| `npm run e2e:ui` | Playwright UI モード |
| `npm run e2e:headed` | Playwright ブラウザ表示付き |
| `npm run e2e:smoke` | スモークテストのみ |
| `npm run e2e:install` | Playwright ブラウザインストール |

### デプロイ

| コマンド | 説明 |
| --- | --- |
| `npm run deploy:alpha` | alpha 環境にデプロイ |
| `npm run deploy:prod` | prod 環境にデプロイ |

## プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── api/trpc/           # tRPC API エンドポイント
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # トップページ
│   └── globals.css
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # ページセクション（Hero, Services 等）
│   ├── providers/          # tRPC Provider
│   └── ui/                 # 共通 UI コンポーネント（shadcn/ui）
├── lib/
│   ├── trpc/               # tRPC クライアント設定
│   ├── email/              # Resend クライアント、メールテンプレート
│   ├── constants.ts        # 定数定義
│   ├── utils.ts            # ユーティリティ関数
│   ├── fonts.ts            # フォント設定
│   └── logger.ts           # Pino ロガー設定
└── server/
    └── trpc/               # tRPC サーバー / ルーター
        └── routers/        # API ルーター（contact 等）
e2e/                        # Playwright E2E テスト
docs/                       # プロジェクトドキュメント
```

## CI/CD

GitHub Actions により、プッシュ・PR 時に以下が自動実行されます。

```
PR / Push → Lint → Type Check → Test → Build
                                         │
                          main マージ → Alpha デプロイ → E2E テスト
                          semver タグ → Prod デプロイ
```

1. **Lint** - Biome によるコード検証
2. **Type Check** - TypeScript 型チェック
3. **Test** - Vitest によるユニットテスト + カバレッジ
4. **Build** - Next.js ビルド
5. **Deploy to Alpha** - `main` ブランチへのマージで自動デプロイ
6. **E2E Tests** - Alpha 環境に対して Playwright テストを実行
7. **Deploy to Prod** - semver タグ（`X.Y.Z` 形式）の作成でデプロイ

## デプロイ

### 環境

| 環境 | URL | トリガー |
|------|-----|----------|
| alpha | https://alpha.nudel.co.jp | main ブランチへのマージ |
| prod | https://nudel.co.jp | semver タグの作成 (`X.Y.Z`) |

### リリースフロー

```
開発ブランチ → PR → main マージ → alpha 自動デプロイ → 動作確認 → タグ作成 → prod デプロイ
```

```bash
# 本番リリース
git tag 1.0.0
git push origin 1.0.0
```

> **注意**: タグは `v` プレフィックスなしの semver 形式（`1.0.0`）を使用してください。`v1.0.0` ではワークフローがトリガーされません。

詳細は [docs/environments.md](docs/environments.md) を参照してください。

## ドキュメント

- [デプロイ環境](docs/environments.md) - 環境一覧、運用フロー、Wrangler 設定
- [アーキテクチャ](docs/architecture.md) - 設計方針、コンポーネント構成、データフロー
