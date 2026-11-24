# MAI モデル・Model router

Microsoft-Decision-1.1 が一般提供となり、分類、ルーティング、検証などの構造化された判断を支援。MAI-Code-2 と Code-2-Flash は GitHub で一般提供。画像生成・サイバーセキュリティ・動画生成のモデルや、Foundry の Model router の拡張も発表し、タスクに応じて品質・速度・費用を選ぶ構成を広げます。

確認日 2026-11-20

## 概要

汎用の大規模モデルだけに処理を集約する代わりに、判断、コード、画像、セキュリティなどのタスクにモデルを割り当てる発表です。

## 主な発表

- Microsoft-Decision-1.1 は許可された操作の選択、分類、優先順位付け、検証を担い、信頼度も返します。画像入力を追加し、Copilot のルーティングや Cowork の処理量選択に使います。
- MAI-Code-2 は複雑なエージェント型コーディング、Code-2-Flash は高頻度の日常作業を対象とします。
- Foundry の Model router は対象モデル群を拡大し、AI Gateway、messages・responses API での対応を拡張します。画像・動画生成や Baseten の推論基盤も追加します。

## 提供状況・注意点

| 対象 | 発表時点の状況 |
| --- | --- |
| Microsoft-Decision-1.1 | GA |
| MAI-Code-2・Code-2-Flash の GitHub 提供 | GA |
| Code-2-Flash の Foundry 提供 | Book of News では Private Preview |
| MAI-Image-2.7・Flash、動画生成モデル、Baseten on Foundry | Preview |
| MAI-Cyber-2-Flash | Codename MDASH 内で Preview |

基調講演録は Code モデルの Foundry 提供にも触れていますが、対象モデルごとの条件は Book of News の個別記載を併記しました。モデル名が同じでも提供先によって段階が異なります。

## 参考リンク

- [Book of News の New models 節](https://news.microsoft.com/events/ignite/2026/book-of-news/)
- [モデルと製品への適用を説明する基調講演録](https://blogs.microsoft.com/blog/2026/11/17/ignite-2026-building-the-frontier-ecosystem/)
