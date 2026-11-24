---
id: lab692d
title: "LAB692D: Digital Lab: Build a grounded AI agent with Azure HorizonDB"
summary: "Azure HorizonDB 上に法律文書の埋め込み・全文検索・引用グラフを作り、5種類の検索／分析ツールを持つエージェントにつなぐ実習です。"
content_type: session
topic: sessions
tags: [catalog]
last_verified: "2026-11-24"
official_sources:
  - "https://ignite.microsoft.com/en-US/sessions/1792442922557001bSuI-AAAAAAAAAAAAAAAAAAAA?source=sessions"
---

<!-- Manually curated session; catalog refresh keeps this article. -->

## 概要

Microsoft の公開ラボ資料に沿って、Azure HorizonDB の PostgreSQL データを使う法律リサーチ用エージェントを構築します。公式 README はデータ準備とアプリ開発の2冊の Jupyter Notebook を案内し、60分のカンファレンス向け短縮パスと、追加の深掘り演習を区別しています。

## 実習内容

1. **データ基盤:** Azure portal で HorizonDB と Foundry のラボリソースを確認し、VS Code の PostgreSQL 拡張からデータベースへ接続します。Notebook 1 では `cases.csv` を読み込み、HorizonDB の `azure_ai` を使ってモデルを登録し、AI Pipeline で法律意見をチャンク化・埋め込みます。
2. **検索用インデックス:** パイプライン結果を検証し、Apache AGE で判例の引用グラフを作成。BM25 の全文検索インデックスと DiskANN のベクトルインデックスも構築します。
3. **エージェント開発:** Notebook 2 で Agent Framework を使い、BM25 のキーワード検索、DiskANN による意味検索、AGE による引用グラフ検索、ケース分析の抽出、Open-Meteo からの外部気象情報取得という5つのツールを順に定義して、統合エージェントを実行します。
4. **任意の発展演習:** HorizonDB に保存する Mem0 の長期メモリ、Gradio チャット UI、HorizonDB のフェイルオーバー実演が案内されています。

公開ノートブックは「agentic legal research application」と題しており、単なるベクトル検索ではなく、全文・意味・グラフ検索と外部情報を組み合わせて回答の根拠を補う構成です。

## セッション情報

| 項目 | 内容 |
| --- | --- |
| セッションコード | LAB692D |
| 登壇者 | 未掲載 |
| トピック | Data |
| 配信形式 | Online |

## 開催枠・動画・資料

| 開始日時 | 公式ページ | 動画 | 実習資料 |
| --- | --- | --- | --- |
| 日時未掲載 | [公式詳細](https://ignite.microsoft.com/en-US/sessions/1792442922557001bSuI-AAAAAAAAAAAAAAAAAAAA?source=sessions) | 確認した公開ページに動画リンクの掲載なし | [公式 README](https://github.com/microsoft/ignite26-LAB692/blob/main/README.md)・[データ準備ノート](https://github.com/microsoft/ignite26-LAB692/blob/main/instructions/1-data-setup.ipynb)・[アプリ開発ノート](https://github.com/microsoft/ignite26-LAB692/blob/main/instructions/2-app-development.ipynb) |

## 確認範囲・注意点

2026-11-24に公式セッションページと Microsoft の LAB692 リポジトリを確認し、README と2冊のノートブックの説明・章立てを読んで要約しました。確認した公開資料に録画やスライドは見つかりませんでした。コードセルの実行や Azure リソースの作成は行っておらず、ノートブック添付画像も視覚確認していません。

## 参考リンク

- [公式セッション詳細](https://ignite.microsoft.com/en-US/sessions/1792442922557001bSuI-AAAAAAAAAAAAAAAAAAAA?source=sessions)
- [Microsoft 公式ラボリポジトリ](https://github.com/microsoft/ignite26-LAB692)
- [ラボ README](https://github.com/microsoft/ignite26-LAB692/blob/main/README.md)
- [Notebook 1: Data Setup](https://github.com/microsoft/ignite26-LAB692/blob/main/instructions/1-data-setup.ipynb)
- [Notebook 2: Application Development](https://github.com/microsoft/ignite26-LAB692/blob/main/instructions/2-app-development.ipynb)
