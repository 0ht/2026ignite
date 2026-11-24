---
id: windows
title: Windows の AI・管理機能
summary: プロセスコンテナーでエージェントの通信、ネットワーク、ID を管理する機能を拡張。Copilot のローカルファイル操作・PC 診断・検索からの利用も Preview で発表しました。Windows Endpoint Security Platform は一般提供となり、端末の基準設定、宣言的管理、アプリ更新や信頼性レポートは個別のプレビュー段階です。
content_type: announcement
topic: windows
tags: [windows, agents, security, governance]
last_verified: "2026-11-20"
official_sources:
  - https://news.microsoft.com/events/ignite/2026/book-of-news/
---

## 概要

ローカル AI に業務を任せる機能と、その実行範囲を IT が定める仕組みを同時に拡張します。端末上の文脈とクラウドの管理を組み合わせる構成です。

## 主な発表

- プロセスコンテナーは COM・IPC、細かなネットワークポリシー、ID の検証によってエージェントやアプリの境界を設定します。
- Copilot は自然言語でファイルの検索・整理・移動・コピー・名前変更を支援し、端末診断とタスクバーの検索からの利用も拡張します。
- 管理機能は Windows baseline protection、宣言的な端末管理、幅広いアプリの自動更新、OS の信頼性レポートを追加します。

## 提供状況・注意点

| 機能 | 発表時点の状況 |
| --- | --- |
| 新しいプロセスコンテナーの制御、Copilot の上記機能、宣言的な端末管理 | Preview |
| コンテナーの Learning and permissive mode、Windows Endpoint Security Platform | GA |
| Baseline protection、アプリ自動更新の拡張、Experience controls、OS 信頼性レポート | Private Preview |

Book of News のコンテナー節は新機能群を Preview としつつ、Learning and permissive mode は個別に GA と記載しています。制限を適用する前に観測し、既存業務への影響を確認する段階を設けます。

## 参考リンク

- [Book of News の Windows 節](https://news.microsoft.com/events/ignite/2026/book-of-news/)
