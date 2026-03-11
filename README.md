# Next.js + Cloudflare Workers テンプレート

Next.js 16 (App Router) + Cloudflare Workers で構築するコーポレートサイトのテンプレート。

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5 (strict mode)
- **UI**: React 19, Radix UI (shadcn/ui), Tailwind CSS 4
- **Animation**: Motion (Framer Motion)
- **API**: tRPC 11 + TanStack Query 5
- **Validation**: Zod 4
- **CMS**: microCMS
- **Email**: Resend
- **Logging**: Pino
- **Deploy**: Cloudflare Workers (OpenNext)
- **CI/CD**: GitHub Actions

## セットアップ

### 1. リポジトリ作成

GitHub の「Use this template」ボタンから新しいリポジトリを作成してください。

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、各値を設定してください。

```bash
cp .env.example .env.local
```

### 4. TODO の置換

以下のファイルで `TODO` コメントを検索し、プロジェクトに合わせて変更してください。

- `package.json` — `name`
- `wrangler.jsonc` — プロジェクト名、ドメイン、環境変数
- `src/lib/constants.ts` — サイト名、ナビゲーション項目、会社情報
- `src/app/layout.tsx` — メタデータ、JSON-LD
- `src/server/trpc/routers/contact.ts` — 送信元メールアドレス
- `.github/workflows/workflow.yml` — Alpha URL
- `.claude/CLAUDE.md` — プロジェクト情報

### 5. 開発サーバーの起動

```bash
npm run dev
```

## コマンド一覧

```bash
npm run dev            # 開発サーバー (Turbopack)
npm run build          # 本番ビルド
npm run lint           # Biome リント
npm run lint:fix       # リント自動修正
npm run typecheck      # TypeScript 型チェック
npm run test           # Vitest ユニットテスト
npm run test:coverage  # テスト + カバレッジ
npm run e2e            # Playwright E2Eテスト
npm run e2e:smoke      # スモークテストのみ
npm run preview        # Cloudflare ローカルプレビュー
npm run deploy:alpha   # Alpha デプロイ
npm run deploy:prod    # 本番デプロイ
```

## プロジェクト構成

```
src/
├── app/                   # Next.js App Router
│   ├── api/trpc/          # tRPC HTTP エンドポイント
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # ページセクション (Hero, Contact 等)
│   ├── providers/         # React コンテキストプロバイダー (tRPC)
│   └── ui/                # shadcn/ui コンポーネント
├── lib/
│   ├── microcms/          # microCMS クライアント・型定義
│   ├── trpc/              # tRPC クライアント設定
│   ├── email/             # Resend クライアント・メールテンプレート
│   ├── constants.ts       # サイトデータ定義
│   ├── utils.ts           # ユーティリティ
│   ├── fonts.ts           # フォント設定
│   └── logger.ts          # Pino ロガー
└── server/
    └── trpc/              # tRPC サーバー・ルーター
e2e/                       # Playwright E2Eテスト
```

## デプロイ

### Cloudflare Workers

1. Cloudflare アカウントで API Token と Account ID を取得
2. GitHub Secrets に `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` を設定
3. `wrangler.jsonc` でドメインとプロジェクト名を設定

### ブランチ戦略

- **main マージ** → Alpha 環境に自動デプロイ
- **semver タグ** (`X.Y.Z`) → 本番デプロイ

## 環境変数

| 変数名 | 用途 | 設定場所 |
|---|---|---|
| `RESEND_API_KEY` | Resend メール送信 API キー | Cloudflare Secret / `.env.local` |
| `CONTACT_EMAIL_TO` | お問い合わせメール送信先 | `wrangler.jsonc` の `vars` |
| `MICROCMS_SERVICE_DOMAIN` | microCMS サービスドメイン | `wrangler.jsonc` の `vars` / `.env.local` |
| `MICROCMS_API_KEY` | microCMS API キー | Cloudflare Secret / `.env.local` |
| `CLOUDFLARE_API_TOKEN` | Cloudflare デプロイ用 | GitHub Secrets |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID | GitHub Secrets |
| `LOG_LEVEL` | Pino ログレベル (default: `info`) | 任意 |
