# PostgreSQL on Azure

Oracle から PostgreSQL、Azure Database for PostgreSQL から HorizonDB への Azure DMS 移行支援を Preview で追加。Cobalt 200 と AMD v6 confidential compute、不変のポイントインタイム復元、同一ゾーンからゾーン冗長 HA への変更が一般提供。移行、性能、保護、回復性を機能ごとに拡張します。

確認日 2026-11-20

## 概要

PostgreSQL への移行と、Azure 上での運用の選択肢を拡張します。DMS はデータ移動、VS Code 拡張は評価・スキーマ・アプリ変換を支援する構成です。

## 主な発表

- Oracle から PostgreSQL、既存の Azure Database for PostgreSQL から Azure HorizonDB への DMS 移行を追加。接続確認、データコピー、同期、監視、切り替えを扱います。
- Cobalt 200 と AMD v6 の機密コンピューティングを追加し、性能と使用中データの保護に対応します。
- ポイントインタイム復元の不変性、ゾーン冗長 HA へのインプレース変換、スナップショット方式の Backup を拡張します。

## 提供状況・注意点

| GA | Preview |
| --- | --- |
| Cobalt 200、AMD v6 confidential compute | DMS の上記移行経路 |
| ポイントインタイム復元の不変性 | Burstable v2 |
| 同一ゾーンからゾーン冗長 HA への変換 | Flexible server・elastic clusters v2 向け Azure Backup |

利用中のサーバー形態、サイズ、リージョン、移行元の対応バージョンを個別に確認します。

## 参考リンク

- [Book of News の PostgreSQL on Azure 発表](https://news.microsoft.com/events/ignite/2026/book-of-news/)
