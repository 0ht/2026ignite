# Azure Cosmos DB

Shell、Rust SDK、Semantic reranker、全文検索のスコア取得、Azure Backup が一般提供。開発ツール、検索品質、独立したバックアップを強化します。VS Code 拡張の AI 支援データモデラーは Preview で、パーティションキーやコンテナー構成の設計を支援します。

確認日 2026-11-20

## 概要

Cosmos DB は開発時のデータ設計、検索時の関連性、本番データの保護をそれぞれ更新します。開発と運用で使う機能を横断した発表です。

## 主な発表

- Shell を VS Code と Azure portal で利用し、対話的なクエリや管理、MCP 連携による AI 支援を行います。Rust SDK も追加します。
- Semantic reranker は検索結果候補を意味と文脈で並べ替えます。全文検索では FuzzyBM25 のスコアをアプリに返せます。
- Azure Backup は保管庫ベースの独立した保護層として、バックアップポリシー、保持、監視、復旧をまとめます。

## 提供状況・注意点

上記の Shell、Rust SDK、検索、Backup は GA。AI 支援データモデラーと VS Code 拡張の関連機能は Preview。検索方式やバックアップの選択は、利用中の構成における対応状況を確認します。

## 参考リンク

- [Book of News の Azure Cosmos DB 発表](https://news.microsoft.com/events/ignite/2026/book-of-news/)
