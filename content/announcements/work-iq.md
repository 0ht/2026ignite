---
id: work-iq
title: Work IQ
summary: Microsoft 365 の文脈をエージェントへ供給し、長時間のタスクや他エージェントとの連携へ拡張。Retrieve、業務アプリとの接続、会議中の文脈を強化します。Listen、メモリ、Office 作成・編集、操作承認には個別の提供条件があり、公式の総覧と詳細ブログで記載に差がある項目を確認する必要があります。
content_type: announcement
topic: iq
tags: [iq, copilot, agents, governance]
last_verified: "2026-11-20"
official_sources:
  - https://news.microsoft.com/events/ignite/2026/book-of-news/
  - https://azure.microsoft.com/en-us/blog/introducing-the-new-microsoft-iq-putting-your-organizations-intelligence-to-work-in-every-agent/
  - https://techcommunity.microsoft.com/blog/microsoft_365blog/whats-new-in-work-iq-at-ignite-2026-agents-that-get-work-done/4572219
---

## 概要

Work IQ はメール、会議、チャット、ファイル、人の関係を、既存のアクセス権を守りながらエージェントへ供給します。今回の発表は情報取得に加え、業務を実行し、イベントを起点に継続するための拡張です。

## 主な発表

- Retrieve は権限を反映した Microsoft 365 コンテンツと接続先のデータを取得。長時間のタスクと agent-to-agent 連携も強化します。
- Listen はメッセージや業務イベントに反応する仕組みです。メモリと Office 文書の作成・編集も追加します。
- 詳細ブログは WorkIQ.Read と WorkIQ.Act、テナント側の上限とエージェントごとのポリシーを説明。許可・ブロック・人への確認で操作範囲を制御します。

## 提供状況・注意点

Microsoft IQ の総合ブログでは Retrieve、会議中の文脈、長時間タスクなどを GA、Listen・Memory・Office 作成編集・人の承認を伴うポリシーを Public Preview としています。

公式資料間に差があります。総合ブログは OpenAI と Anthropic のプラグインを GA と記載しますが、11 月 18 日更新の Work IQ 詳細ブログは ChatGPT のプラグインを提供中、Anthropic と Gemini を「coming soon」としています。業務アプリも総合ブログは GA とする一方、詳細ブログでは ERP を Preview と記載しています。

ここではこれらの差を保持します。Anthropic 連携、ERP、メモリ、Office 操作の導入可否は、個別の公式ドキュメントとテナント上の提供状態を確認してください。

## 参考リンク

- [Work IQ 詳細ブログ、11 月 18 日更新](https://techcommunity.microsoft.com/blog/microsoft_365blog/whats-new-in-work-iq-at-ignite-2026-agents-that-get-work-done/4572219)
- [Microsoft IQ 総合ブログ](https://azure.microsoft.com/en-us/blog/introducing-the-new-microsoft-iq-putting-your-organizations-intelligence-to-work-in-every-agent/)
- [Book of News の Work IQ 節](https://news.microsoft.com/events/ignite/2026/book-of-news/)
