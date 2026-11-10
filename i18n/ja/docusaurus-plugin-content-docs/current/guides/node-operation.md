---
title: "ノード操作"
sidebar_position: 2
description: "Mind Elixir Core でノード操作を購読・インターセプトする方法と、組み込み API によるプログラム的なノード操作を解説します。"
keywords:
  - "ノード操作"
  - "イベント"
  - "bus"
  - "API"
  - "JavaScript マインドマップ"
  - "Mind Elixir Core"
  - "mind-elixir"
---


# ノード操作

このセクションでは、ノード操作をリッスンし、インターセプトする方法について説明し、同時にプログラムでノードを操作する方法も紹介します。

## ノード操作の購読

マインドマップ上のユーザー操作に購読して、操作イベントをリッスンすることができます。これは DOM イベントをリッスンするのと同じくらい簡単です。

```js
mind.bus.addListener('operation', (operation) => {
  console.log(operation)
  // { name: 'addChild', target: NodeObj }
  // { name: 'insertSibling', target: NodeObj, position: 'before' | 'after' }
  // { name: 'copyNodes', target: NodeObj[] }
  // { name: 'moveNodesIn', target: NodeObj[], destination: NodeObj }
})

mind.bus.addListener('selectNodes', (nodes) => {
  console.log(nodes)
})

// Folding is reported through the `operation` event:
mind.bus.addListener('operation', (op) => {
  if (op.name === 'expandNode' || op.name === 'collapseNode') {
    console.log('node: ', op.target)
    console.log('silent: ', op.silent)
  }
})
```

最も一般的に使用されるイベントは `operation` イベントで、これにはすべてのノード操作が含まれます。

`operation` は `name` による判別共用体です。

- `target` は対象ノードです。単一操作では `NodeObj`、一括操作（`copyNodes`、`removeNodes`、`moveNodes*`）では `NodeObj[]` になります。
- `destination` は移動先、`position` は `insertSibling` の `'before' | 'after'` です。
- 折りたたみと展開は `operation` イベントの `expandNode` / `collapseNode` として通知されます。内部の暗黙の展開や `{ silent: true }` を指定した場合は `op.silent` が `true` になり、アンドゥ履歴には残りません。
- ノードメソッドは配列を受け取ります：`copyNodes([node], to)`、`moveNodesIn` / `moveNodesBefore` / `moveNodesAfter(nodes, to)`。

API の一覧は [v6 API ガイド](../getting-started/migration-v6.md) を参照してください。

## ノード操作ガード

その名の通り、ノード操作ガードは特定のノード操作の挙動をインターセプトできます。

構成で `before` オブジェクトを設定し、プロパティ名はノード操作に対応し、値はブール値（または Promise で包まれたブール値）を返す関数です。

```js
let mind = new MindElixir({
  // ...
  before: {
    insertSibling(type, el, node) {
      console.log(type, el, node)
      if (this.currentNode?.nodeObj.parent?.root) {
        return false
      }
      return true
    },
    async addChild(el, node) {
      await sleep()
      if (this.currentNode?.nodeObj.parent?.root) {
        return false
      }
      return true
    },
  },
})
```

`async` を使用することで、非同期情報が必要な場合に進行するかどうかを決定できるようになります。

## プログラムでのノード操作

Mind Elixir Core はノードを直接操作するための API を提供しています。

```ts
{
  insertSibling: (
    this: MindElixir,
    type: 'before' | 'after',
    el?: Topic,
    node?: NodeObj
  ) => Promise<void>
  insertParent: (this: MindElixir, el?: Topic, node?: NodeObj) => Promise<void>
  addChild: (this: MindElixir, el?: Topic, node?: NodeObj) => Promise<void>
  copyNodes: (this: MindElixir, tpcs: Topic[], to: Topic) => Promise<void>
  moveUpNode: (this: MindElixir, el?: Topic) => Promise<void>
  moveDownNode: (this: MindElixir, el?: Topic) => Promise<void>
  removeNodes: (this: MindElixir, tpcs: Topic[]) => Promise<void>
  moveNodesIn: (this: MindElixir, from: Topic[], to: Topic) => Promise<void>
  moveNodesBefore: (this: MindElixir, from: Topic[], to: Topic) => Promise<void>
  moveNodesAfter: (this: MindElixir, from: Topic[], to: Topic) => Promise<void>
  beginEdit: (this: MindElixir, el?: Topic) => Promise<void>
  setNodeTopic: (this: MindElixir, el: Topic, topic: string) => Promise<void>
}
```

例えば、`insertSibling` を使用して、id が `d6e5f69edb6336c3` のノードに兄弟ノードを追加したい場合、次のようにします。

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E` は、id によってノードの DOM オブジェクトを取得するメソッドです。Mind Elixir Core の多くの API では DOM オブジェクトの型として `Topic` を使用し、それらを取得するために `E` 関数を使用できます。

:::