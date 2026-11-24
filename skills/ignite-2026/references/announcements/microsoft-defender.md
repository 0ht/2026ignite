# Microsoft Defender・Sentinel

Integrated SOC の中核機能と、Windows 上の対象ローカル AI エージェントに対する実行時保護が一般提供。統合した監視と防御をエージェントへ広げます。SIEM 全機能、90 日の Defender データ保持、攻撃時に一時的な制御を適用する Vulnerability shielding、ゼロデイ・新興脅威の表示は Preview です。

確認日 2026-11-20

## 概要

SIEM と脅威保護を統合する SOC 基盤と、端末上で動く AI エージェントの保護を更新します。エージェントが読む情報に埋め込まれた悪意ある指示も、実行時保護の対象にします。

## 主な発表

- Integrated SOC の中核機能を GA とし、人とエージェントが共通の情報を使って調査・対応する基盤にします。
- Claude Code、GitHub Copilot CLI・app、対応する VS Code 拡張などへ agent-native runtime protection を提供。一部の他のアプリはネットワーク経由の保護を対象にします。
- Vulnerability shielding は進行中の攻撃に対し、既知の脆弱性があるシステムへ一時的な制御を適用し、恒久的な修正までの時間を確保します。

## 提供状況・注意点

Integrated SOC の中核機能と対象ローカルエージェントの保護は GA。SIEM 機能全体、90 日のデータ保持、Shielding、ゼロデイ・新興脅威の新しい表示は Preview。

ローカルエージェントの保護は Windows と対象アプリの条件があり、Defender for Endpoint P2 向けとしています。Audit と Block のモード、対象アプリごとの保護方式を確認してください。

## 参考リンク

- [Book of News の Defender 節](https://news.microsoft.com/events/ignite/2026/book-of-news/)
