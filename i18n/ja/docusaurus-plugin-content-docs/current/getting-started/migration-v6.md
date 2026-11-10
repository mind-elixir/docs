---
title: "v6 API ガイド"
sidebar_position: 5
description: "Mind Elixir Core 6.0 の現在の API：DOM セレクター、ノード操作、イベントペイロード、TypeScript ジェネリクス、イベントマップ。"
keywords:
  - "移行"
  - "v6"
  - "API"
  - "アップグレード"
  - "JavaScript マインドマップ"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# v6 API ガイド

Mind Elixir Core 6.0 は 2026-11-02 にリリースされました。このページでは DOM セレクター、ノード操作、イベントペイロード、TypeScript 型、イベントマップの現在の API と、v6 で追加された機能をまとめています。データ形式自体は変わりません。

## 1. DOM セレクター

マップ内部の要素は `me-*` クラスを持つ `<div>` です。常にクラスセレクターを使用します：

```css
.me-tpc { ... }
.me-main.lhs { ... }
.me-main.rhs { ... }
.me-main.down { ... }
```

```js
const root = map.querySelector('.me-root')
```

使用できるクラスは `.me-main`、`.me-wrapper`、`.me-parent`、`.me-children`、`.me-tpc`、`.me-epd`、`.me-nodes`、`.me-root` です。方向クラスは `.me-main` に付きます。

:::tip

ノードデータの `id: 'me-root'` は CSS セレクターではありません。

:::

ブランチ生成関数内で `querySelector` を使う例は[ブランチスタイルのカスタマイズ](../advanced-guides/customize-branch-style.md)を参照してください。

## 2. ノードのコピーと移動

```js
mind.copyNodes([node], to)
mind.moveNodesIn(nodes, to)
mind.moveNodesBefore(nodes, to)
mind.moveNodesAfter(nodes, to)
mind.moveUpNode(el)
mind.moveDownNode(el)
```

一括操作のメソッドは `Topic` の配列と移動先の `Topic` を受け取ります。対応する操作名は `copyNodes`、`moveNodesIn`、`moveNodesBefore`、`moveNodesAfter` です。完全なシグネチャ一覧は[ノード操作](../guides/node-operation.md)を参照してください。

## 3. 操作イベントのペイロード

```js
mind.bus.addListener('operation', operation => {
  console.log(operation.name, operation.target)
  if (['moveNodesIn', 'moveNodesBefore', 'moveNodesAfter'].includes(operation.name)) {
    console.log(operation.destination)
  }
})
```

`operation` は `name` による判別共用体です。単一ノードの操作では `target` は `NodeObj`、一括操作では `NodeObj[]` になります。`destination` は移動先、`position` は `insertSibling` の `'before' | 'after'`、`origin` は `reshapeNode` / `finishEdit` の变更前の状態を表します。折りたたみと展開も同じイベントの `expandNode` / `collapseNode` として通知されます。

## 4. TypeScript ジェネリクス

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData

const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`、`MindElixirData`、`NodeObj`、`NodeObjExport`、`Theme` はいずれも同じ metadata 型パラメータを受け取ります。詳細は [TypeScript サポート](./typescript-support.md)を参照してください。

## 5. lite ビルド

```js
import MindElixir from 'mind-elixir/lite'
// ビルド成果物のファイル名は MindElixirLite.js
```

## 6. 折りたたみ / 展開イベント

```js
mind.bus.addListener('operation', op => {
  if (op.name === 'expandNode' || op.name === 'collapseNode') {
    console.log('node: ', op.target)
    console.log('silent: ', op.silent)
  }
})
```

折りたたみはデータ変更として `operation` イベントで通知されます。`target` は折りたたまれた `NodeObj` です。内部の暗黙の展開や `{ silent: true }` を指定した呼び出しでは `silent` が `true` になり、アンドゥ履歴には残りません。`expandNode` と `expandNodeAll` は `{ silent: true }` を受け取ります。

## v6 の新機能

- **右から左へのテキスト。** `Options` に `rtl: true` を渡すと、ノードのテキスト、エディター、ラベル、コンテキストメニューが RTL（アラビア語、ヘブライ語、ペルシア語、ウルドゥー語）になります。ブランチの配置軸は影響を受けません。`ar` ロケールは `mind-elixir/i18n` からインポートできます。
- **アウトライナーの独立エントリーポイント。** `import { Outliner } from 'mind-elixir/outliner'` と `mind-elixir/outliner/style.css` を使用します。メインエントリーからの再エクスポートも継続されます。詳細は[アウトライナー](../advanced-guides/outliner.md)を参照してください。
- **差分リフレッシュ。** `mind.diffRefresh(data)` は差分のみを適用し、変更のないノードの DOM 要素・イベントリスナー・フォーカス状態を保持します。詳細は[データのインポートとエクスポート](../guides/data-export.md)を参照してください。
- **折りたたみのアンドゥ対応。** `Ctrl + Z` で直前の折りたたみ状態に戻せます。マップとアウトライナーは同じアンドゥ履歴を共有し、`expandNode` / `expandNodeAll` は `{ silent: true }` で履歴をスキップできます。
- **ブランチをまたぐ矢印キー移動。** 最後の子ノードでの `ArrowDown`、最初の子ノードでの `ArrowUp` は隣接ブランチへ移動します。詳細は[ショートカットキー](../guides/shortcuts.md)を参照してください。
- **共通の Markdown レンダラー。** `markdown` オプションがマップとアウトライナーの両方のノードに適用されます。詳細は [Markdown と LaTeX](../advanced-guides/markdown-latex.md) を参照してください。
- **テーマとフォーカス。** テーマの切り替えには `changeTheme(data.theme)` を明示的に呼び出します。`refresh(data)` はフォーカスモードを解除し `refresh` イベントを発火し、`focusNode` / `cancelFocus` はアンドゥ／リドゥスタックをクリアします。
