# コンテンツ規約

原稿は UTF-8 の Markdown で記述します。製品ごとに発表をまとめ、公式一次情報の事実と、利用を検討する際の判断を分けます。

```yaml
---
id: product-name
title: Product Name
summary: 何が変わったかを一行で記載します。
content_type: announcement
topic: azure
tags: [azure, agents]
last_verified: "2026-11-20"
official_sources:
  - https://news.microsoft.com/events/ignite/2026/book-of-news/
deliveries:
  site: true
  llms: true
  skills: true
---
```

`id` は kebab-case でファイル名と一致させ、原稿全体で一意にします。`content_type` は `announcement`・`session`・`resource` のいずれかで、格納先の `announcements/`・`sessions/`・`resources/` に対応します。トピックとタグは JSON の定義を使用します。`deliveries` は省略時に全出力を有効にします。

`last_verified` は資料を確認した日付を引用符付きで指定し、イベントメタデータの確認日以下にします。発表日や実機での動作確認日と区別してください。`official_sources` は HTTPS の公式 URL を最低一件指定します。許可ドメインは完全一致で判定します。

## 発表記事

「概要」「主な発表」「提供状況・注意点」「参考リンク」の順を基本にします。提供状況は機能単位で GA・Preview・Private Preview・Frontier・提供予定を記載します。製品全体の GA と新機能のプレビューを区別してください。

異なる公式ページの記載に差がある場合、両方を示して差がある機能を具体的に記述します。将来予定は日付と発表時点を添え、提供済みと混同しないようにします。記事は独立して読める長さにし、元記事の全文や字幕の転載を避けます。

## セッション

「概要」「セッション情報」「キーポイント」「確認範囲・注意点」「参考リンク」を基本にします。登壇者、日付、セッション ID、時刻は公式資料で確認した値だけを使用します。編集済み講演録による要約、字幕による要約、実際の動画視聴を区別します。

`content/sessions/session-catalog.md` は公式カタログ API から生成する一覧です。フィルター条件や録画・資料リンクの形式を変える場合は `scripts/refresh-catalog.mjs` を更新し、`npm run refresh:sessions` でスナップショットを再生成します。確認日が進んだ場合は共有の `content/build-info.json` も更新します。開催枠ごとの記録とし、録画予定を公開済み動画として扱わないでください。

セッションごとの日本語の要点は `content/session-summaries.json` にセッションコードをキーとして管理します。`npm run refresh:sessions` は要点と公式カタログから、セッションごとに `content/sessions/` 配下へ Markdown を生成します。要点は JSON を編集してください。生成後の本文が直接編集されている場合やマーカーのない手書き記事がある場合、更新処理は上書きを拒否します。基調講演 `opening-keynote.md` は手書き記事として維持します。同じコードの複数の開催枠は一つの記事にまとめます。

字幕や資料を読み込んで個別に編集した記事は、生成マーカーとチェックサムを削除し、`<!-- Manually curated session; catalog refresh keeps this article. -->` を追加します。更新処理はその記事を保持し、一覧の要点は引き続き JSON から更新します。個別記事の開催情報や資料リンクは手動で確認・更新してください。

公式カタログの説明や公式 AI 要約を確認して記述し、動画の視聴や逐語確認と区別します。カタログ更新時、未作成の要約は明示されます。要約を見直したときは同ファイルの `last_verified` を更新してください。

## 配信先に依存しないリンク

本文では公式情報への絶対 URL を使います。索引と関連記事の内部リンクはビルドスクリプト側で作成するため、サイト用パスをスキルへ持ち込む必要を減らせます。AI の回答には個別記事の一次情報 URL を付け、確認範囲を超えた補完を避けてください。
