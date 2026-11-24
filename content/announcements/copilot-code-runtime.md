---
id: copilot-code-runtime
title: Copilot Code・Copilot Managed Runtime
summary: Copilot Managed Runtime が一般提供となり、Copilot Code、Cowork、Copilot Studio などで作成したアプリを組織の管理下でホストする共通基盤を提供。必要に応じて Fabric のデータベースやストレージを組み合わせます。自然言語でアプリを作る Copilot Code は Frontier で提供中で、12 月に一般提供を予定しています。
content_type: announcement
topic: copilot
tags: [copilot, agents, fabric, governance]
last_verified: "2026-11-20"
official_sources:
  - https://news.microsoft.com/events/ignite/2026/book-of-news/
  - https://www.microsoft.com/en-us/copilot/blog/2026/11/17/copilot-at-microsoft-ignite-expanding-whats-possible-with-intelligence-built-for-work/
---

## 概要

アプリの作成体験と、公開後のホスティング・実行・管理を分離。利用者が自然言語や開発ツールで作成したアプリを、組織の ID と管理の仕組みに接続します。

## 主な発表

- Copilot Managed Runtime は対応アプリのホスティングと企業管理を提供。データが必要なアプリには Fabric のデータベース、ストレージ、データ API を任意で追加できます。
- Copilot Code は自然言語からダッシュボード、トラッカー、アプリを作成。クラウドのプロジェクトをテナント内のサンドボックスで実行します。
- Agents and Workflows の初期段階として、Copilot Studio のエージェントやワークフローをローカルで作成・編集し、CLI から公開する開発方法を発表しました。

## 提供状況・注意点

| 機能 | 発表時点の状況 |
| --- | --- |
| Copilot Managed Runtime | GA |
| Copilot Code | Frontier。2026 年 12 月に GA 予定 |
| Code のローカルサンドボックス | Windows で提供。macOS は今後予定 |
| Agents and Workflows | 初期機能を発表。詳細条件は公式情報で確認 |

Runtime の一般提供と、そこに公開する個々のアプリ作成機能の提供段階を区別してください。

## 参考リンク

- [Book of News の Code と Managed Runtime 発表](https://news.microsoft.com/events/ignite/2026/book-of-news/)
- [Copilot の公式ブログ](https://www.microsoft.com/en-us/copilot/blog/2026/11/17/copilot-at-microsoft-ignite-expanding-whats-possible-with-intelligence-built-for-work/)
