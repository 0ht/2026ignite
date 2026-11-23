# Fabric HorizonDB・Database Hub

Microsoft Fabric HorizonDB をサーバーレス PostgreSQL として Preview で発表。OneLake の分析データと業務 DB をつなぎます。複数環境の DB を検出・監視・管理する Database Hub は一般提供、SQL と PostgreSQL の障害や性能を調べる Database agents は Preview で追加します。

確認日 2026-11-20

## 概要

Fabric 内のアプリ用データベースと、複数環境にまたがる DB 運用の入口を拡張します。Azure HorizonDB の GA と、Fabric 内の新サービスの Preview を分けて捉えます。

## 主な発表

- Fabric HorizonDB は需要に応じた自動スケール、アイドル時の停止とクエリ時の再開を行うサーバーレス PostgreSQL です。
- Translytical queries、ミラーリング、Reverse ETL により、業務 DB と OneLake・Fabric Data Warehouse の分析結果をつなぎます。
- Database Hub は Azure、Fabric、オンプレミス、他クラウドの DB を扱います。Database agents は既存の ID と承認境界の下で問題の説明、修正提案、承認済みの操作を支援します。

## 提供状況・注意点

Fabric HorizonDB は Preview。Database Hub は GA、Database agents は Preview。対応する DB サービスや SQL・PostgreSQL の機能範囲を確認してください。

## 参考リンク

- [Book of News の Fabric HorizonDB と Database Hub 発表](https://news.microsoft.com/events/ignite/2026/book-of-news/)
