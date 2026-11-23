# Microsoft Ignite 2026 Info Hub

2026 年 11 月 17 日から 20 日に San Francisco とオンラインで開催の Microsoft Ignite 2026 の主要発表と基調講演を、日本語で調査・要約するプロジェクトです。

[openjny/msbuild-2026](https://github.com/openjny/msbuild-2026) を参考に、同じコンテンツから閲覧用 Web サイト、AI 向け `llms.txt`、インストール用スキルを生成します。要約本文と生成プログラムは、このイベント向けに新規作成しています。

> [!NOTE]
> 2026 年 11 月 20 日時点の公式 Book of News と公式ブログを基にした非公式の要約です。GA・プレビュー・Frontier・提供予定を分けて記載しています。対象地域、ライセンス、参加条件、更新後の仕様は各記事の一次情報で確認してください。

## 収録範囲

Microsoft Copilot、Microsoft IQ、Foundry、GitHub、Azure、データ基盤、セキュリティ、Windows の主要発表 38 件、基調講演 1 件、参考資料 1 件を収録しています。[アナウンスの原稿](content/announcements) と [基調講演の原稿](content/sessions) は GitHub 上でも読めます。

セッションは公式の編集済み講演録を根拠とするオープニング基調講演に加え、公式カタログの「Online」「Technical Decision Maker」該当枠を一覧化しています。開催枠ごとに動画・スライド・関連資料へのリンクを記録し、録画予定と公開済み動画を区別しています。動画の内容要約や字幕全文は収録していません。

## 人間向け Web サイト

ローカル環境で起動します。Node.js 24 以降を使用してください。

```powershell
npm ci
npm run dev
```

表示されたローカル URL を開くと、トピック別・タグ別の索引と全文検索を利用できます。

GitHub Pages の公開先は `https://0ht.github.io/2026ignite/` を想定しています。公開はリポジトリ側で設定し、実行結果を確認してください。ローカル生成の時点と、公開済みの状態は分けて扱います。

## AI エージェント向け Web サイト

ビルド後の `site/.vitepress/dist/llms.txt` が入口です。個別記事は `llms/{種別}/{id}/llms.txt`、機械可読の全件索引は `.well-known/docs-index.json` に生成します。Pages 公開後は、次のように利用できます。

```text
私はクラウドインフラエンジニアです。
Microsoft Ignite 2026 の発表から、運用とセキュリティに関係する変更を整理してください。
GA とプレビュー、将来の提供予定を分け、根拠となる公式 URL を示してください。
情報源: https://0ht.github.io/2026ignite/llms.txt
```

## AI エージェント向けスキル

[ignite-2026 スキル](skills/ignite-2026/SKILL.md) と詳細資料をリポジトリに同梱しています。生成済みのため、Markdown を読むだけならビルドは不要です。リポジトリ公開後、対応するクライアントでインストールできます。

```text
/plugin install 0ht/2026ignite
```

```powershell
gh skill install 0ht/2026ignite ignite-2026
```

```text
Ignite 2026 スキルを使い、Copilot、Microsoft IQ、Agent 365 の関係と
導入前に確認する項目を、公式情報のリンク付きで説明してください。
```

インストールコマンドの対応状況は、利用するクライアントのバージョンで確認してください。

## 更新と公開

原稿は `content/` で管理します。[コンテンツ規約](docs/content-guide.md) に沿って編集した後、次を実行します。

```powershell
npm run validate
npm test
npm run build
```

公式セッションカタログの一覧を更新する場合は、次を実行します。

```powershell
npm run refresh:sessions
```

`site/` 内の生成記事、`site/public/`、VitePress のビルド成果物は Git 管理から除外しています。`skills/` と `plugin.json` は生成後の変更をコミットしてください。構成は [アーキテクチャ](docs/architecture.md) を参照してください。

GitHub Actions は pull request と `main` への push で検証とビルドを実行します。公開する場合は Settings → Pages → Source を GitHub Actions に設定し、`main` を選んで「Validate and build」を手動実行します。手動実行時のみデプロイが進みます。

## 一次情報

- [Microsoft Ignite 2026](https://ignite.microsoft.com/en-US/home)
- [Microsoft Ignite 2026 Book of News](https://news.microsoft.com/events/ignite/2026/book-of-news/)
- [Satya Nadella の公式基調講演録](https://blogs.microsoft.com/blog/2026/11/17/ignite-2026-building-the-frontier-ecosystem/)

参照先リポジトリの発表内容を Ignite に置き換えて流用する方法を避け、Ignite の一次情報から要約しています。Microsoft の原文、画像、映像の権利は各権利者に帰属します。
