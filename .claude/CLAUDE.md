# Nudel LLC Corporate Website

## Project Overview

Nudel LLC のコーポレートサイト。Next.js 16 (App Router) + Cloudflare Workers で構築されたシングルページアプリケーション。

- **Prod**: https://nudel.co.jp
- **Alpha**: https://alpha.nudel.co.jp
- **Repository**: https://github.com/Nudel-LLC/website

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5 (strict mode)
- **UI**: React 19, Radix UI (shadcn/ui), Tailwind CSS 4
- **Animation**: Motion (Framer Motion)
- **API**: tRPC 11 + TanStack Query 5
- **Validation**: Zod 4
- **Email**: Resend
- **Logging**: Pino
- **Deploy**: Cloudflare Workers (OpenNext)
- **CI/CD**: GitHub Actions

## Commands

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
npm run preview        # Cloudflare ローカルプレビュー (alpha設定)
npm run deploy:alpha   # Alpha デプロイ
npm run deploy:prod    # 本番デプロイ
```

## Project Structure

```
src/
├── app/                   # Next.js App Router (ページ、レイアウト)
│   └── api/trpc/          # tRPC HTTP エンドポイント
├── components/
│   ├── layout/            # Navbar, Footer (サイト共通レイアウト)
│   ├── sections/          # ページセクション (Hero, Services, Contact 等)
│   ├── providers/         # React コンテキストプロバイダー (tRPC)
│   └── ui/                # shadcn/ui ベースの汎用UIコンポーネント
├── lib/
│   ├── trpc/              # tRPC クライアント設定
│   ├── email/             # Resend クライアント、メールテンプレート
│   ├── constants.ts       # サイトデータ定義 (NAV_ITEMS, SERVICES 等)
│   ├── utils.ts           # ユーティリティ (cn 関数等)
│   ├── fonts.ts           # フォント設定
│   └── logger.ts          # Pino ロガー
└── server/
    └── trpc/              # tRPC サーバー定義、ルーター
e2e/                       # Playwright E2Eテスト
docs/                      # プロジェクトドキュメント
```

## Coding Conventions

- **Linter**: Biome (recommended ルール、formatter は無効)
- **Quote style**: ダブルクォート
- **Semicolons**: あり
- **Path alias**: `@/*` → `src/*`
- **コンポーネント**: named export を使用 (`export function` / `export const`)
- **テストファイル**: 対象ファイルと同じディレクトリに `*.test.ts(x)` として配置
- **言語**: UIテキスト・ログメッセージ・コメントは日本語、コード・変数名は英語

## Environment Variables

| 変数名                  | 用途                              | 設定場所                   |
| ----------------------- | --------------------------------- | -------------------------- |
| `RESEND_API_KEY`        | Resend メール送信 API キー        | Cloudflare / `.env.local`  |
| `CONTACT_EMAIL_TO`      | お問い合わせメール送信先          | `wrangler.jsonc` の `vars` |
| `CLOUDFLARE_API_TOKEN`  | Cloudflare デプロイ用             | GitHub Secrets             |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID          | GitHub Secrets             |
| `LOG_LEVEL`             | Pino ログレベル (default: `info`) | 任意                       |

## Branching & Deploy Strategy

- **ブランチ命名**: `feat/`, `fix/`, `docs/` 等のプレフィックス
- **main マージ** → alpha 環境に自動デプロイ → E2E テスト自動実行
- **semver タグ** (`X.Y.Z`, `v` プレフィックスなし) → 本番デプロイ
- PRは CI (lint, typecheck, test) が通ってからマージ

## Testing Strategy

- **ユニットテスト (Vitest)**: ロジック・コンポーネントの単体テスト。jsdom 環境で実行
- **E2E テスト (Playwright)**: alpha 環境に対して実行。smoke, home, navigation, contact-form
- テスト内で motion/react, next/image, next/link はモック化 (`src/__tests__/setup.ts`)
