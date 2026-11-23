# アーキテクチャ

`content/` を唯一の原稿とし、人間向け・AI 向け・インストール用に同じ情報を配信します。[参照プロジェクト](https://github.com/openjny/msbuild-2026) の Single Source, Multiple Outputs の形式に合わせた独自実装です。

```text
content/
  announcements/*.md       個別の発表
  sessions/*.md            確認済みセッション
  resources/*.md           参考資料
  build-info.json          日程、確認日、公開先、調査範囲
  topics.json              トピック定義
  tags.json                タグ定義
  allowed-domains.json     一次情報として許可するホスト
scripts/
  content.mjs              原稿読み込みと検証
  validate.mjs             検証コマンド
  build.mjs                全出力の生成
  check-site.mjs           公開成果物の内部リンクと機械可読索引の検証
site/.vitepress/           サイト設定とテーマ
skills/ignite-2026/        生成済みスキルと references
plugin.json               生成済みプラグイン定義
```

`npm run build` は原稿を検証し、記事、種別別索引、トピック・タグ別索引、`llms.txt`、個別の `llms.txt`、スキル、JSON 索引を生成してから VitePress で HTML に変換します。検証エラーがあれば生成を停止します。

サイトの生成 Markdown は `site/`、配信用のテキストと JSON は `site/public/` に置きます。VitePress の標準動作により、`site/public/` が公開ルートにコピーされます。最終的な配信ディレクトリは `site/.vitepress/dist/` です。

`site_base` は GitHub Pages のサブパス、`site_url` はその絶対 URL です。HTML 内のリンクは VitePress がベースパスを付け、AI 用索引は生成時に絶対 URL を組み立てます。

`deliveries` で記事ごとの配信先を制御できます。配信を止めた記事や削除した記事が残らないよう、再生成時に所定の生成記事ディレクトリから古い Markdown と個別の `llms.txt` を取り除きます。手書きの設定と `content/` は保持します。

GitHub Actions のビルドは、コミット済みのスキルと生成結果の一致も確認します。Pages へのデプロイは `main` の手動実行に限定しています。
