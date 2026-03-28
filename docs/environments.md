# デプロイ環境

## 環境一覧

| 環境 | Worker名 | URL | トリガー |
|------|----------|-----|----------|
| preview | nudel-website-pr-{N} | https://nudel-website-pr-{N}.workers.dev | PR の作成・更新 |
| alpha | nudel-website-alpha | https://alpha.nudel.co.jp | main ブランチへのマージ |
| prod | nudel-website | https://nudel.co.jp | semver タグの作成 (`X.Y.Z`) |

## 運用フロー

```
開発ブランチ → PR 作成 → preview デプロイ → レビュー → main マージ → alpha デプロイ → 動作確認 → タグ作成 → prod デプロイ
```

1. 開発ブランチで作業し、PR を作成
2. **preview** (`nudel-website-pr-{PR番号}.workers.dev`) に自動デプロイされ、PR コメントに URL が投稿される
3. preview 環境でレビュー・動作確認
4. CI（lint, typecheck, test）が通ったら main にマージ（preview Worker は自動削除される）
5. **alpha** (`alpha.nudel.co.jp`) に自動デプロイされる
6. alpha で動作確認
7. semver タグを作成して prod にデプロイ

```bash
git tag 1.0.0
git push origin 1.0.0
```

または GitHub Releases からタグを作成してもよい。

## npm スクリプト

| コマンド | 説明 |
|----------|------|
| `npm run deploy:preview` | preview 環境にデプロイ（CI から `--name` 付きで実行） |
| `npm run deploy:alpha` | alpha 環境にデプロイ |
| `npm run deploy:prod` | prod 環境にデプロイ |
| `npm run preview` | alpha 環境設定でローカルプレビュー |

## Wrangler 環境設定

環境設定は `wrangler.jsonc` の `env` セクションで定義されている。
共通設定（compatibility_date, flags, assets, observability）は各環境に自動継承される。

- **preview**: PR ごとに `--name nudel-website-pr-{N}` で Worker 名を動的に上書き。`workers.dev` サブドメインで公開される
- **alpha**: `custom_domain: true` により初回デプロイ時に `alpha.nudel.co.jp` のDNSが自動設定される（Cloudflare管理ドメインが前提）
- **prod**: 既存の Cloudflare ダッシュボード設定をそのまま使用

### 環境変数

`wrangler.jsonc` の `vars` に定義する公開変数:

| 変数名 | 説明 |
|--------|------|
| `CONTACT_EMAIL_TO` | お問い合わせメール送信先 |
| `SITE_URL` | サイト URL |
| `MICROCMS_SERVICE_DOMAIN` | microCMS サービスドメイン |

任意で設定できる変数:

| 変数名 | 説明 | デフォルト |
|--------|------|----------|
| `LOG_LEVEL` | Pino ログレベル (`trace` / `debug` / `info` / `warn` / `error`) | `info` |

Cloudflare Secret として設定するシークレット変数（`wrangler secret put` で設定）:

| 変数名 | 説明 |
|--------|------|
| `RESEND_API_KEY` | Resend メール送信 API キー |
| `MICROCMS_API_KEY` | microCMS API キー |

## GitHub Secrets

リポジトリの Settings > Secrets and variables > Actions で以下を設定する。
ビルド時の静的生成（プリレンダリング）でmicroCMS APIを呼び出すため、CI環境にもmicroCMSの認証情報が必要。

| Secret名 | 説明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare デプロイ用 API トークン |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID |
| `MICROCMS_SERVICE_DOMAIN` | microCMS サービスドメイン |
| `MICROCMS_API_KEY` | microCMS API キー（GET用） |

## GitHub Environments

リポジトリの Settings > Environments で以下を設定する:

- **preview**: 保護ルールなし（PR 時に自動デプロイ）
- **alpha**: 保護ルールなし（自動デプロイ）
- **prod**: 必要に応じて Required reviewers を設定可能

## PR プレビュー環境

### 仕組み

- PR が作成・更新されると `deploy-preview` ジョブが実行される
- Worker 名は `nudel-website-pr-{PR番号}` で、`https://nudel-website-pr-{N}.workers.dev` でアクセス可能
- デプロイ完了後、[marocchino/sticky-pull-request-comment](https://github.com/marocchino/sticky-pull-request-comment) でプレビュー URL が PR にコメントされる（同一コメントが更新される）
- PR がクローズ（マージ含む）されると `preview-cleanup.yml` ワークフローで Worker が自動削除される

### シークレット

preview 環境はリポジトリレベルの GitHub Secrets をそのまま使用する。フォーク PR からはシークレットにアクセスできない（GitHub のデフォルト保護）。

`MICROCMS_API_KEY` と `RESEND_API_KEY` は `wrangler secret bulk` により各 preview Worker に個別設定される。そのためコンタクトフォームのメール送信も preview 環境で動作する。

### 制限事項

- `workers.dev` のサブドメインを使用するため、カスタムドメインは設定されない

## タグの命名規則

`v` プレフィックスなしの semver 形式を使用する。

- `1.0.0` (o)
- `v1.0.0` (x) — ワークフローのトリガーに一致しない
