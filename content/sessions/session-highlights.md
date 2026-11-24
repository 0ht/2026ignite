---
id: session-highlights
title: Ignite 2026 セッションの主な論点
summary: 公式セッションの説明と AI 要約を基に、開発、企業コンテキスト、ガバナンス、データ基盤、業務への展開を横断して整理します。
content_type: session
topic: sessions
tags: [catalog, agents, copilot, governance]
last_verified: "2026-11-24"
official_sources:
  - https://ignite.microsoft.com/en-US/sessions?liveAndUpcoming=0&filter=deliveryTypes%2FlogicalValue%3EOnline&filter=audienceTypes%2FlogicalValue%3ETechnical+Decision+Maker
---

## 概要

Online・Technical Decision Maker 対象のセッションを横断し、実務で検討しやすい論点をまとめます。各セッションの詳細、動画、資料はセッションカタログの一覧を参照してください。

公式カタログの説明と Microsoft が掲載した AI 要約を基に整理しています。AI 要約には誤りが含まれる可能性があり、動画の全編視聴や発言の逐語確認は行っていません。機能の提供条件は個別の公式資料で確認してください。

## エージェントを業務に組み込む

- **開発者とエージェントの共同作業:** BRK273 は Copilot を IDE、CLI、アプリ、Slack、Teams にまたがって利用する流れ、BRK274 は VS Code で委任と手動編集を切り替える流れを扱います。BRK268 はチーム共通のスキルや指示を活用します。
- **作成から管理までの共通化:** BRK237 はツール、スキル、エージェントをプラグインとして公開・評価・管理する方法を示します。BRK379 は顧客対応の複数チャネルから担当者への引き継ぎを扱います。
- **評価を使った改善:** BRK238 と BRK365 は、それぞれエージェントの学習ループと、品質・遅延・費用を観測して改善につなげる方法を紹介します。LAB661D は評価を基に変更を繰り返す演習です。

## 企業データとガバナンス

- **企業の文脈を安全に使う:** BRK302 は Work IQ とコネクターを使い、利用者の権限に沿って組織の文脈をエージェントへ渡す方法を示します。BRK307 は文書の関係を知識グラフで扱い、検索の質を高める設計を取り上げます。
- **ID と実行時の保護:** BRK331 は人とエージェントの条件付きアクセス、BRK345 は Agent 365 による所有者・権限・ツールの管理を扱います。BRK340 はプロンプトインジェクションやツールの悪用を想定した防御を説明します。
- **運用データと AI をつなぐ:** BRK370 は HorizonDB の AI パイプライン、検索、知識グラフを組み合わせます。BRK373 は SQL 拡張と Copilot を使い、Azure SQL のベクトル検索や RAG アプリを構築します。

## 本番運用と事業への展開

- **移行と継続性:** BRK409 は資産の発見から移行計画までを結び付けます。BRK446 は主権や接続断を考慮したアプリの移植性、BRK452 は復旧と回復性の向上を扱います。
- **現場のプロセスにつなぐ:** BRK470 はサプライチェーンの計画・物流・運用にエージェントと人の確認を組み込む事例を紹介します。利用するデータの信頼性と、人が判断する場面を合わせて検討することが重要です。

## 参考リンク

- [Microsoft Ignite セッションカタログ](https://ignite.microsoft.com/en-US/sessions?liveAndUpcoming=0&filter=deliveryTypes%2FlogicalValue%3EOnline&filter=audienceTypes%2FlogicalValue%3ETechnical+Decision+Maker)
- 各セッションコードに対応する公式ページ・動画・資料は、本リポジトリのセッションカタログ一覧に掲載しています。
