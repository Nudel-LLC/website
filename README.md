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
| テスト | [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/) |
| Lint | [Biome](https://biomejs.dev/) |
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

## 開発

```bash
# 開発サーバーを起動（Turbopack 使用）
npm run dev
```

http://localhost:3000 でサイトが表示されます。

## スクリプト一覧

| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | Biome によるリント |
| `npm run lint:fix` | リントの自動修正 |
| `npm run typecheck` | TypeScript 型チェック |
| `npm run test` | テスト実行 |
| `npm run test:watch` | テスト監視モード |
| `npm run test:coverage` | テスト + カバレッジ |
| `npm run preview` | Cloudflare プレビュー |
| `npm run deploy` | Cloudflare へデプロイ |

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
├── hooks/                  # カスタムフック
├── lib/
│   ├── trpc/               # tRPC クライアント設定
│   ├── constants.ts        # 定数定義
│   ├── utils.ts            # ユーティリティ関数
│   └── fonts.ts            # フォント設定
└── server/
    └── trpc/               # tRPC サーバー / ルーター
        └── routers/        # API ルーター（contact 等）
```

## CI/CD

GitHub Actions により、プッシュ・PR 時に以下が自動実行されます。

1. **Lint** - Biome によるコード検証
2. **Type Check** - TypeScript 型チェック
3. **Test** - Vitest によるテスト + カバレッジ
4. **Build** - Next.js ビルド
5. **Deploy** - Cloudflare Workers へデプロイ（`main` ブランチのみ）

## デプロイ

本番環境は [Cloudflare Workers](https://workers.cloudflare.com/) にデプロイされます。

```bash
# プレビュー環境で確認
npm run preview

# 本番デプロイ
npm run deploy
```

デプロイには以下の環境変数（Cloudflare）が必要です。

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
