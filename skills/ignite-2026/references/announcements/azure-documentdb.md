# Azure DocumentDB

VS Code 拡張と M10 から M30 の高速クラスター作成が一般提供。Azure Arc と Azure Local で MongoDB 互換ワークロードを実行する選択肢を Preview で追加します。DB・コレクション単位の細かな RBAC も Preview とし、配置先の制御と最小権限を強化します。

確認日 2026-11-20

## 概要

DocumentDB は MongoDB 互換の開発体験を拡張し、ハイブリッド環境やデータの所在地に要件がある用途への選択肢を増やします。

## 主な発表

- VS Code からクラスター、DB、コレクション、文書、クエリを扱います。M10 から M30 は作成の待ち時間を短縮します。
- Azure Arc 対応はハイブリッド・マルチクラウド、Azure Local 対応は自社管理のインフラでの実行を対象にします。
- カスタムロールの適用範囲をデータベースとコレクションへ絞る RBAC を追加します。

## 提供状況・注意点

VS Code 拡張と対象サイズの高速プロビジョニングは GA。Arc、Azure Local、細粒度 RBAC は Preview。既存のサービスとの互換性や配置条件は、導入先ごとに確認してください。

## 参考リンク

- [Book of News の Azure DocumentDB 発表](https://news.microsoft.com/events/ignite/2026/book-of-news/)
