# Azure AI 基盤・AKS

Foundry のオープンウェイトモデルやエージェントを自社の AKS クラスターへ展開する機能を Preview で発表。Agent Grid、VM レベルで隔離する Agent Sandbox、Azure 外のサーバーを使う Flex nodes も追加します。機密コンピューティングは複数 GPU、コンテナー、共同分析の保護を拡張します。

確認日 2026-11-20

## 概要

マネージドな Foundry の開発体験を保ちながら、インフラや配置先を組織側で選ぶための機能群です。既存の AKS のセキュリティポリシーと管理を利用する構成を示しています。

## 主な発表

- Foundry から既存の AKS へ対応モデルとエージェントを展開。GPU、リージョン、データ所在地を要件に合わせて選びます。
- Agent Grid はエージェント・モデル・ツール・Azure サービス間の操作へ共通ポリシーを適用。Agent Sandbox extension はエージェント生成コードを VM レベルで隔離し、Flex nodes は Azure 外のサーバーへクラスターを拡張します。
- 機密コンピューティングには VR72 複数 GPU、Azure Confidential Enclaves、AKS Kata CoCo、Azure Confidential Clean Room を追加します。

## 提供状況・注意点

ここに記載した新しい AKS・隔離・機密コンピューティング機能は Preview。Cobalt 200 VM は別の発表として GA です。

対応するモデル、GPU、リージョン、信頼境界は機能ごとに確認してください。Clean Room は複数組織のデータ分析を対象とし、Agent Sandbox のコード実行隔離とは保護する対象が異なります。

## 参考リンク

- [Book of News の Azure infrastructure foundation と confidential computing 発表](https://news.microsoft.com/events/ignite/2026/book-of-news/)
