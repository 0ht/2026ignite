---
id: lab680d
title: "LAB680D: Digital Lab: AI Agents Are Sending Signals. Make Access Respond."
summary: "Conditional Access Policy Plans の整理、Entra と Defender での動的エージェントリスク確認、リスク別の段階的なアクセス制御を扱う実習です。"
content_type: session
topic: sessions
tags: [catalog]
last_verified: "2026-11-24"
official_sources:
  - "https://ignite.microsoft.com/en-US/sessions/1792438662775001wa6r-AAAAAAAAAAAAAAAAAAAA?source=sessions"
---

<!-- Manually curated session; catalog refresh keeps this article. -->

## 概要

Microsoft Entra の Conditional Access Policy Plans と AI エージェントのリスク評価を組み合わせ、アクセス制御を段階的に設計するセルフペースのデジタルラボです。公開されている実習ガイドに沿い、ポリシーの整理からリスク調査、テスト用ルールの設計までを行います。

## 実習内容

1. **ポリシーの整理:** 共通のユーザー割り当てを共有する Policy Plan を作り、認証強度や準拠デバイスを要求するルールを分けます。既存の支店向け Conditional Access ポリシー5件を、共通条件と個別ルールを保ったプランへまとめる流れも確認します。
2. **エージェントリスクの調査:** Microsoft Entra の Risky Agents と Microsoft Defender の AI Agents で同じ「IT Management」エージェントを調べ、runtime・exposure・blast radius の情報や証拠、ソース、時刻、IDを照合します。リスク表示だけで侵害と決めつけず、裏付け情報を確認する構成です。
3. **リスクに応じた制御:** テストユーザーと Assistive Agents を対象に、低リスクではセンシティブな操作への人の承認、中リスクでは操作の制限、高リスクでは全リソースへのアクセス遮断を意図したルールを作成します。ガイドは検証のためルールを Report-only に保つよう指示しています。

シナリオは Contoso の準備済みテナントを使う想定です。実習ガイドは、本番 ID を使わないこと、既存ユーザー向けポリシーを維持すること、ポリシーを有効化して強制しないことを明記しています。

## セッション情報

| 項目 | 内容 |
| --- | --- |
| セッションコード | LAB680D |
| 登壇者 | 未掲載 |
| トピック | Security |
| 配信形式 | Online |

## 開催枠・動画・資料

| 開始日時 | 公式ページ | 動画 | 実習資料 |
| --- | --- | --- | --- |
| 日時未掲載 | [公式詳細](https://ignite.microsoft.com/en-US/sessions/1792438662775001wa6r-AAAAAAAAAAAAAAAAAAAA?source=sessions) | 確認した公開ページに動画リンクの掲載なし | [公式ラボ手順](https://github.com/microsoft/ignite26-LAB680/blob/main/instructions/LabInstructions.md) |

## 確認範囲・注意点

2026-11-24に公式セッションページと Microsoft の LAB680 リポジトリ（参加者向け手順、全実習ガイド）を確認し、上記はガイド記載の演習を要約したものです。公開ページではセルフペースのラボとして案内されていますが、確認した範囲で録画やスライドは見つかりませんでした。ラボ環境は実行しておらず、手順書内の画像も視覚確認していません。

## 参考リンク

- [公式セッション詳細](https://ignite.microsoft.com/en-US/sessions/1792438662775001wa6r-AAAAAAAAAAAAAAAAAAAA?source=sessions)
- [Microsoft 公式ラボリポジトリ](https://github.com/microsoft/ignite26-LAB680)
- [参加者向け手順とラボの流れ](https://github.com/microsoft/ignite26-LAB680/blob/main/instructions/README.md)
