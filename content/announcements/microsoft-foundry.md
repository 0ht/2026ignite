---
id: microsoft-foundry
title: Microsoft Foundry
summary: 本番トレース、評価、Agent optimizer、モデルの追加学習を一つの改善サイクルへ接続。会話全体を評価する Multi-turn evaluation、問題を整理する Insights、Agent optimizer が一般提供となります。専門家による注釈と Managed Training・Programmed Training は Preview として展開します。
content_type: announcement
topic: foundry
tags: [foundry, agents]
last_verified: "2026-11-20"
official_sources:
  - https://news.microsoft.com/events/ignite/2026/book-of-news/
  - https://azure.microsoft.com/en-us/blog/introducing-the-new-microsoft-iq-putting-your-organizations-intelligence-to-work-in-every-agent/
---

## 概要

Foundry の発表は、作ったエージェントを本番で観測し、改善案を評価してから採用する継続的改善が中心です。品質、安全性、遅延、コストの基準を先に定め、変更後も同じ基準で比較します。

## 主な発表

- Multi-turn evaluation は会話全体を評価。Insights はハルシネーションやトークン急増などの繰り返す問題をまとめ、調査対象を順位付けします。
- Agent optimizer は設定変更の候補を作成・比較し、チームの評価基準で結果を示します。開発者が採用する変更を選びます。
- Human annotation で専門家の評価や期待回答をトレースへ付与。Managed Training は学習工程を管理し、Programmed Training は独自の教師あり学習・強化学習ループを実行する選択肢です。

## 提供状況・注意点

Multi-turn evaluation、Insights、Agent optimizer は GA。Human annotation、新しい安全性評価サポート、Managed Training と Programmed Training は Book of News で Preview としています。

モデルの学習は対応モデルと利用条件を確認してください。最適化候補の生成と本番への反映は分け、チームが変更を承認してデプロイする構成として説明されています。

## 参考リンク

- [Book of News の Continuous improvement in Foundry 節](https://news.microsoft.com/events/ignite/2026/book-of-news/)
- [Microsoft IQ と継続的改善の公式説明](https://azure.microsoft.com/en-us/blog/introducing-the-new-microsoft-iq-putting-your-organizations-intelligence-to-work-in-every-agent/)
