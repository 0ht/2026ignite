# Azure HorizonDB

PostgreSQL 互換のマネージドデータベースが一般提供。Entra ID、Private Endpoint、マネージド ID、暗号化、複数ゾーンでの保護を組み合わせます。DB 内の AI モデル管理、SQL からモデルを呼ぶ AI Functions・AI Pipelines、Fabric へのミラーリングは Preview。Fabric HorizonDB とは提供形態と段階を区別します。

確認日 2026-11-20

## 概要

Azure HorizonDB は、トランザクションデータとベクトル検索・AI を組み合わせる PostgreSQL 互換サービスです。可用性と管理されたセキュリティを備えた本番向け基盤として GA を発表しました。

## 主な発表

- Entra ID 認証、Private Endpoint、ユーザー割り当てマネージド ID、サービス管理・顧客管理キー、複数ゾーンのレプリケーションを提供します。
- AI モデル管理、AI Functions、AI Pipelines を追加し、SQL からのモデル呼び出しやランキングを支援します。
- VS Code の PostgreSQL 拡張は DB 管理やクエリ計画・監視に対応。Fabric へのミラーリングで分析との接続を広げます。

## 提供状況・注意点

Azure HorizonDB と VS Code の PostgreSQL 拡張は GA。AI モデル管理、AI Functions、AI Pipelines、Fabric ミラーリングは Preview。

同時に発表された Microsoft Fabric HorizonDB は Preview のサーバーレス PostgreSQL です。Azure のサービスと Fabric 内のサービスについて、対応機能と運用・課金条件を分けて確認してください。

## 参考リンク

- [Book of News の Azure HorizonDB 発表](https://news.microsoft.com/events/ignite/2026/book-of-news/)
