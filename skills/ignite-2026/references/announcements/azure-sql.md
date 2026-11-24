# Azure SQL

SQL Managed Instance の Next-gen General Purpose でゾーン冗長と柔軟なメモリ設定が一般提供。Always On 可用性グループを扱う MI link も一般提供となります。Azure SQL Database エンジンをローカルで動かすコンテナーは Preview で、クラウドへの移行前に開発や統合テストを行う用途を対象にします。

確認日 2026-11-20

## 概要

Azure SQL の更新は既存 SQL Server の移行・災害対策、マネージド環境の可用性、ローカル開発の三つに分かれます。

## 主な発表

- MI の Next-gen General Purpose にゾーン冗長を追加。Premium-series のゾーン冗長インスタンスでは CPU と独立してメモリを調整できます。
- MI link は複数 DB を含む SQL Server Always On 可用性グループを扱い、ほぼリアルタイムの複製で移行と災害対策を支援します。
- Azure SQL Database container は同じエンジン、T-SQL、接続プロトコル、ドライバー動作をローカルで使う開発環境です。Ledger、ベクトル検索、埋め込みのワークフローも対象です。

## 提供状況・注意点

MI の上記拡張は GA。Azure SQL Database container は Preview。ローカル開発は Azure サブスクリプションやカード登録を要せず無料としていますが、クラウド DB とモデル利用の費用はそれぞれ発生します。

## 参考リンク

- [Book of News の Azure SQL 発表](https://news.microsoft.com/events/ignite/2026/book-of-news/)
