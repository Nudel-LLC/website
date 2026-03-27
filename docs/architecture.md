# アーキテクチャ

## 全体構成

```mermaid
graph TB
    subgraph CF["Cloudflare Workers"]
        subgraph NX["Next.js 16 (OpenNext)"]
            AR["App Router<br/>(SSR/RSC)"]
            TR["tRPC Server<br/>(API Layer)"]
        end
    end
    AR -->|"コンテンツ取得"| MC["microCMS<br/>(Headless CMS)"]
    TR -->|"メール送信"| RS["Resend<br/>(Email API)"]
```

- **フロントエンド**: Next.js App Router による SSR + クライアントサイドインタラクション
- **API**: tRPC でタイプセーフな API 通信
- **CMS**: microCMS でサービス一覧・実績のコンテンツを管理
- **インフラ**: Cloudflare Workers 上で OpenNext を介して Next.js を実行
- **外部サービス**: Resend によるメール送信、microCMS によるコンテンツ管理

## ディレクトリ設計

### `src/app/` - ルーティング & ページ

Next.js App Router のルーティング層。

- `layout.tsx` - ルートレイアウト（メタデータ、JSON-LD、フォント、TRPCProvider）
- `page.tsx` - トップページ（microCMS からサービス一覧を取得し、各セクションコンポーネントを配置）
- `services/[slug]/` - サービス詳細ページ（microCMS からサービス情報と紐づく実績を取得）
- `api/trpc/` - tRPC の HTTP エンドポイント
- `robots.ts` - robots.txt 生成（非 prod 環境はクローラーを禁止）
- `sitemap.ts` - sitemap.xml 生成

### `src/components/` - コンポーネント

4つのカテゴリに分類して管理している。

| ディレクトリ | 役割 | 例 |
|-------------|------|-----|
| `layout/` | サイト全体の構造を構成する共通レイアウト | `Navbar`, `Footer` |
| `sections/` | ページ内の各セクション。ビジネスロジックを含む | `HeroSection`, `ContactForm` |
| `providers/` | React コンテキストプロバイダー | `TRPCProvider` |
| `ui/` | shadcn/ui ベースの汎用 UI パーツ。ビジネスロジックなし | `Button`, `Input`, `Card` |

**コンポーネント配置ルール**:
- 再利用可能で汎用的なもの → `ui/`
- ページ固有のセクション → `sections/`
- サイト全体で使うレイアウト要素 → `layout/`
- 新しい UI コンポーネントの追加は `npx shadcn add <component>` を使用

### `src/lib/` - ユーティリティ & 設定

アプリケーション全体で使う共通ロジック・設定。

- `constants.ts` - サイトのデータ定義（ナビゲーション項目、会社情報等）
- `utils.ts` - ユーティリティ関数（`cn()` for Tailwind クラス結合）
- `fonts.ts` - Google Fonts 設定（Noto Serif JP, Syncopate）
- `logger.ts` - Pino ロガーのインスタンス
- `microcms/client.ts` - microCMS クライアント（遅延初期化）とデータ取得関数
- `microcms/types.ts` - microCMS レスポンスの型定義（Service, Work）
- `microcms/icon-map.ts` - microCMS のアイコン種別から Lucide アイコンコンポーネントへのマッピング
- `microcms/sanitize.ts` - microCMS から取得した HTML コンテンツのサニタイズ処理
- `trpc/client.ts` - tRPC React クライアント
- `email/resend.ts` - Resend クライアント（シングルトン）
- `email/templates.ts` - メールテンプレート（管理者通知、自動返信）

### `src/server/` - サーバーサイドロジック

tRPC サーバーの定義とルーター。

- `trpc/trpc.ts` - tRPC インスタンス（`router`, `publicProcedure` のエクスポート）
- `trpc/context.ts` - tRPC コンテキストファクトリ（リクエスト情報の受け渡し）
- `trpc/index.ts` - `appRouter` の定義と `AppRouter` 型のエクスポート
- `trpc/routers/contact.ts` - コンタクトフォーム API

## データフロー

### コンタクトフォーム送信

```mermaid
graph TD
    A["ユーザー入力"] --> B["ContactForm<br/>(React コンポーネント)"]
    B -->|"trpc.contact.submit.useMutation()"| C["tRPC Client (HTTP POST)"]
    C --> D["tRPC Server - contact.submit"]
    D -->|"1. Zod バリデーション"| E{"2. Resend API メール送信 (並列)"}
    E --> F["管理者への通知メール<br/>(CONTACT_EMAIL_TO)"]
    E --> G["ユーザーへの自動返信"]
    F --> H["レスポンス → UI にフィードバック表示"]
    G --> H
    D -.->|"エラー時"| I["TRPCError をスロー"]
```

### ページレンダリング（トップページ）

```mermaid
graph TD
    A["リクエスト"] --> B["Cloudflare Workers (OpenNext)"]
    B --> C["Next.js App Router"]
    C -->|"layout.tsx: メタデータ, JSON-LD, フォント, TRPCProvider"| D["page.tsx"]
    D -->|"getServices()"| MC["microCMS API"]
    MC --> D
    D --> E["Navbar"]
    D --> F["HeroSection"]
    D --> G["StrengthSection"]
    D --> H["FounderSection"]
    D --> I["ServicesSection (サービス一覧データを props で受取)"]
    D --> J["CompanySection"]
    D --> K["ContactForm (クライアントコンポーネント)"]
    D --> L["Footer"]
```

### ページレンダリング（サービス詳細ページ）

```mermaid
graph TD
    A["リクエスト /services/:slug"] --> B["Cloudflare Workers (OpenNext)"]
    B --> C["Next.js App Router"]
    C --> D["services/[slug]/page.tsx"]
    D -->|"getServiceBySlug(slug)"| MC["microCMS API"]
    D -->|"getWorksByServiceId(id)"| MC
    MC --> D
    D --> E["サービス詳細 + 実績一覧を表示"]
```

## API 設計

### tRPC ルーター構成

```mermaid
graph LR
    A["appRouter"] --> B["contact"]
    B --> C["submit (mutation)"]
    C --- D["Input: { name, email, message }"]
    C --- E["Output: { success, message }"]
```

- **publicProcedure** を使用（認証なし）
- バリデーションは Zod スキーマで入力時に実行
- エラーは `TRPCError` で適切な HTTP ステータスコードと共に返却

### 新しいルーターの追加方法

1. `src/server/trpc/routers/` に新しいルーターファイルを作成
2. `src/server/trpc/index.ts` の `appRouter` にルーターを追加
3. 型は `AppRouter` 経由で自動的にクライアント側に共有される

## テスト構成

### ユニットテスト（Vitest）

`src/**/*.test.{ts,tsx}` パターンで検出。jsdom 環境で実行される。

**テストセットアップ** (`src/__tests__/setup.ts`):

以下のモジュールをモック化している。

| モジュール | 理由 |
|------------|------|
| `motion/react` | アニメーションライブラリの jsdom 非互換を回避 |
| `next/image` | Next.js Image コンポーネントの最適化処理を省略 |
| `next/link` | Next.js Link コンポーネントのルーター依存を省略 |

**テストファイルの配置**: テスト対象ファイルと同じディレクトリに `*.test.ts(x)` として配置する。

```
src/lib/microcms/
├── client.ts
├── client.test.ts      ← client.ts のユニットテスト
├── sanitize.ts
└── sanitize.test.ts    ← sanitize.ts のユニットテスト
```

### E2E テスト（Playwright）

`e2e/` ディレクトリに配置。alpha 環境（`alpha.nudel.co.jp`）に対して実行。

| ファイル | テスト対象 |
|----------|------------|
| `smoke.spec.ts` | サイト全体の基本的な疎通確認 |
| `home.spec.ts` | トップページの表示・機能 |
| `navigation.spec.ts` | ナビゲーションリンクの動作 |
| `contact-form.spec.ts` | コンタクトフォームの送信フロー |
| `services.spec.ts` | サービス一覧・詳細ページ |

**実行環境**:
- CI: Chromium + Mobile Chrome（Pixel 5）。並列無効、リトライ 2 回
- ローカル: 上記に加え Firefox・Safari も実行

## 技術的判断

### Next.js on Cloudflare Workers

OpenNext を使用して Next.js を Cloudflare Workers 上で実行している。サーバーレスかつエッジでの配信により、低レイテンシーを実現。

### tRPC の採用

フロントエンドとバックエンドで型を共有し、API 通信のタイプセーフティを確保。現状は API エンドポイントが少ないが、拡張時にも一貫した方法で API を追加できる。

### shadcn/ui (Radix UI)

コンポーネントのソースコードを直接プロジェクトに持つことで、完全なカスタマイズ性を確保。`components.json` で設定を管理。

### Biome

ESLint + Prettier の代替として採用。単一ツールで lint を実行。formatter は無効化しており、lint のみ使用。
