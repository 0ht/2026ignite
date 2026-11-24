---
id: microsoft-perception
title: Microsoft Perception
summary: 旧 Project Perception が一般提供。Red・Blue・Green の専門エージェントとプレイブックで調査、防御、リスク削減を支援します。第三者環境の調査や検知の作成も拡張。Web アプリのテストやリスク削減、AI エージェント保護などの追加機能には個別のプレビュー条件があります。
content_type: announcement
topic: security
tags: [security, agents, governance]
last_verified: "2026-11-20"
official_sources:
  - https://news.microsoft.com/events/ignite/2026/book-of-news/
  - https://blogs.microsoft.com/blog/2026/11/17/ignite-2026-building-the-frontier-ecosystem/
---

## 概要

Perception は複数の専門エージェントをプレイブックで組み合わせるセキュリティシステムです。Red は攻撃者視点の弱点確認、Blue は検知と調査、Green は弱点の優先順位付けや対策を担います。

## 主な発表

- Triage と Investigation の対象を広げ、AWS、Salesforce、Okta などの第三者データも、エージェントごとの対応範囲に応じて扱います。
- 新しい脅威情報から環境に合わせた KQL 検知案を作成し、過去データで確認するプレイブックを追加します。
- Defender 内での起動、自動トリガー、API・MCP による既存の ITSM・SIEM・SOAR との接続を備えます。

## 提供状況・注意点

本体と 7 月に発表したエージェント・プレイブックは GA。Web App Pen Test Agent と Reduce exposure risk は Preview、AI エージェントを保護する新しいプレイブックは Private Preview とされています。

最小権限、承認、監査、利用額の確認を組み合わせます。認可された範囲でのテストと、修正・パッチ展開の承認境界を明確にして運用してください。

## 参考リンク

- [Book of News の Perception 節](https://news.microsoft.com/events/ignite/2026/book-of-news/)
- [基調講演録の Perception 説明](https://blogs.microsoft.com/blog/2026/11/17/ignite-2026-building-the-frontier-ecosystem/)
