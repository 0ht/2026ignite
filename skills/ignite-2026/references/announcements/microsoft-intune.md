# Microsoft Intune

端末上の AI エージェントを検出し、承認されていないエージェントがある端末を非準拠として扱う機能を Preview で追加。Agent 365、Entra 条件付きアクセス、Microsoft Execution Containers、Global Secure Access を組み合わせ、端末・実行環境・通信の境界を管理します。

確認日 2026-11-20

## 概要

Intune は管理対象端末のアプリ管理を AI エージェントへ広げます。見つける、許可を判断する、アクセスを制限するという流れを既存の端末管理に接続します。

## 主な発表

- Agent 365 と連携して管理端末上のエージェントを検出します。
- 未承認エージェントを持つ端末をソフトウェア準拠ポリシーで非準拠とし、Entra 条件付きアクセスで企業データへのアクセスを制限できます。
- 承認したエージェントは Execution Containers で実行範囲を定義し、Global Secure Access でインターネット、SaaS、プライベートリソースへの通信を制御します。

## 提供状況・注意点

今回のローカル AI エージェント管理は Preview。対象 OS、検出できるエージェント、各製品のライセンス、準拠判定が既存業務へ与える影響を確認します。

## 参考リンク

- [Book of News の Intune 節](https://news.microsoft.com/events/ignite/2026/book-of-news/)
