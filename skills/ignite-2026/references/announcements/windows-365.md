# Windows 365・Windows 365 for Agents

Direct Stream の改善と接続の信頼度に応じたリダイレクト制御が一般提供。エージェント向けには常時利用する Cloud PC、オンプレミスへの Agent ID アクセス、Foundry からの接続を段階的に追加します。管理アシスタントと Windows MAM は Preview、GPU の新しい配信機能と Foundry MCP は翌年の Preview を予定します。

確認日 2026-11-20

## 概要

人向けの Cloud PC の品質・管理と、API を持たない業務アプリを操作するエージェントの作業環境を拡張します。

## 主な発表

- Direct Stream は接続の回復性とマルチメディア品質を改善。Context-based redirections は接続の信頼度でクリップボードやドライブなどの利用を変えます。
- Windows 365 admin assistant は Intune 内で端末の状態、原因調査、トラブル対応を支援。Windows MAM は管理対象外の Windows 端末から接続する Windows App の保護を対象とします。
- Windows 365 for Agents は Copilot credits の対象となり、Agent ID によるオンプレミスへのアクセス、永続的な Cloud PC、Foundry 接続を拡張します。

## 提供状況・注意点

| 機能 | 発表時点の状況 |
| --- | --- |
| 基本の Direct Stream 改善、接続別リダイレクト、対応 Cloud PC のローカルモデル実行 | GA |
| Admin assistant、Windows MAM、Agent ID のオンプレミス接続 | Preview |
| エージェント向け永続 Cloud PC | Frontier の Preview |
| Copilot Studio の Microsoft Copilot harness 対応 | 2026 年 12 月に Preview 予定 |
| Foundry 用 MCP、NVIDIA と改善する GPU 配信 | 2027 年初めに Preview 予定 |

Standard harness の computer-use tool と、今後の別 harness・Foundry 対応を分けて確認してください。Cloud PC の構成、接続先、課金の条件も個別に確認します。

## 参考リンク

- [Book of News の Windows 365 と Windows 365 for Agents 発表](https://news.microsoft.com/events/ignite/2026/book-of-news/)
