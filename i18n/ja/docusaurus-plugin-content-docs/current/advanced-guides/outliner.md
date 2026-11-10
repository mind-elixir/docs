---
title: "アウトライナー"
description: "Outliner 専用エントリーポイントを使い、Mind Elixir のドキュメントを編集可能なアウトラインとして表示し、データとアンドゥ履歴をマップと共有します。"
keywords:
  - "アウトライナー"
  - "アウトライン"
  - "mind-elixir/outliner"
  - "アンドゥ"
  - "JavaScript マインドマップ"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# アウトライナー

アウトライナーは専用のエントリーポイントを持ち、`MindElixir` インスタンスの純粋なビューになりました。`mei.nodeData` を描画し、すべての編集をマップのノード操作経由で書き戻し、マップのアンドゥ／リドゥ履歴を共有します。1 つのドキュメント、2 つのビューです。

## インポート

```ts
import MindElixir from 'mind-elixir'
import { Outliner } from 'mind-elixir/outliner'
import 'mind-elixir/outliner/style.css'
```

マップとアウトラインが同じアプリ内にある場合は、メインエントリーを使うこともできます。こちらのスタイルシートにはアウトライン用のルールが最初から含まれています：

```ts
import MindElixir, { Outliner } from 'mind-elixir'
import 'mind-elixir/style.css'
```

1 つのアプリではどちらか一方のパスに統一してください。両方からインポートするとクラスのコピーが 2 つになります（動作上の問題はありませんが、必要性がありません）。

## マップにバインドする

```ts
const mei = new MindElixir({
  el: '#map',
  allowUndo: true, // アウトラインは mei.historyStack を参照します
  markdown: renderMarkdown,
})
await mei.init(data) // アウトライン生成前に init の完了を待ちます

const outliner = new Outliner({
  el: '#outline',
  mei,
  fileName: 'アウトライン',
  markdown: renderMarkdown,
})
```

`mei` がデータと履歴の両方を提供するため、追加の配線は不要です。`allowUndo: true` が必須で、`init()` の完了を待つ必要があります。アウトラインは共有ジャーナル（構造編集、アンドゥ／リドゥ、折りたたみ／展開）とマップの `operation` イベント（履歴に残らない静默な内部操作）の両方を購読し、1 ティックに 1 回の描画にまとめます。

## Markdown と KaTeX

`markdown` オプションには `Options.markdown` と同じレンダラーを渡します。編集していないノードは HTML として描画され、フォーカス時には編集できるよう元の Markdown ソースに切り替わります。マップとアウトラインで同じレンダラーを使うと、両者の表示を揃えられます。詳細は [Markdown と LaTeX](./markdown-latex.md) を参照してください。

## アンドゥ・折りたたみ・フォーカス

両ビューが `mei.historyStack` を共有するため、どちらで行った編集（折りたたみを含む）も `Ctrl + Z` で取り消せます。子のないノードの折りたたみや、同じ折りたたみ状態の再適用は DOM も履歴も変更しません。`focusNode` / `cancelFocus` はアンドゥ／リドゥスタックをクリアするため、フォーカスの境界は履歴の境界にもなります。

## ドキュメントモデル

アウトライナーは `MindElixir` インスタンスの上に成り立つビューです。オプションには必ず `mei` を渡してください。データは `mei.nodeData` にあり、すべての編集はマップのノード操作を経由して書き戻されるため、マップが唯一のデータ源になります。利用できる編集は [ノード操作](../guides/node-operation.md) を参照してください。
