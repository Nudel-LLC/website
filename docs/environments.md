# デプロイ環境

## 環境一覧

| 環境 | Worker名 | URL | トリガー |
|------|----------|-----|----------|
| alpha | nudel-website-alpha | https://alpha.nudel.co.jp | main ブランチへのマージ |
| prod | nudel-website | https://nudel.co.jp | semver タグの作成 (`X.Y.Z`) |

## 運用フロー

```
開発ブランチ → PR → main マージ → alpha デプロイ → 動作確認 → タグ作成 → prod デプロイ
```

1. 開発ブランチで作業し、PR を作成
2. CI（lint, typecheck, test）が通ったら main にマージ
3. **alpha** (`alpha.nudel.co.jp`) に自動デプロイされる
4. alpha で動作確認
5. semver タグを作成して prod にデプロイ

```bash
git tag 1.0.0
git push origin 1.0.0
```

または GitHub Releases からタグを作成してもよい。

## npm スクリプト

| コマンド | 説明 |
|----------|------|
| `npm run deploy:alpha` | alpha 環境にデプロイ |
| `npm run deploy:prod` | prod 環境にデプロイ |
| `npm run preview` | alpha 環境設定でローカルプレビュー |

## Wrangler 環境設定

環境設定は `wrangler.jsonc` の `env` セクションで定義されている。
共通設定（compatibility_date, flags, assets, observability）は各環境に自動継承される。

- **alpha**: `custom_domain: true` により初回デプロイ時に `alpha.nudel.co.jp` のDNSが自動設定される（Cloudflare管理ドメインが前提）
- **prod**: 既存の Cloudflare ダッシュボード設定をそのまま使用

## GitHub Environments

リポジトリの Settings > Environments で以下を設定する:

- **alpha**: 保護ルールなし（自動デプロイ）
- **prod**: 必要に応じて Required reviewers を設定可能

## タグの命名規則

`v` プレフィックスなしの semver 形式を使用する。

- `1.0.0` (o)
- `v1.0.0` (x) — ワークフローのトリガーに一致しない
