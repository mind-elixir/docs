---
sidebar_position: 2
---

# ノード操作

このセクションでは、ノード操作をリッスンし、インターセプトする方法について説明し、同時にプログラムでノードを操作する方法も紹介します。

## ノード操作の購読

マインドマップ上のユーザー操作に購読して、操作イベントをリッスンすることができます。これは DOM イベントをリッスンするのと同じくらい簡単です。

```js
mind.bus.addListener('operation', (operation) => {
  console.log(operation)
  // return {
  //   name: アクション名,
  //   obj: 対象オブジェクト
  // }

  // name: [insertSibling|addChild|removeNode|beginEdit|finishEdit]
  // obj: 対象

  // name: moveNode
  // obj: {from:target1,to:target2}
})

mind.bus.addListener('selectNode', (node) => {
  console.log(node)
})

mind.bus.addListener('expandNode', (node) => {
  console.log('expandNode: ', node)
})
```

最も一般的に使用されるイベントは `operation` イベントで、これにはすべてのノード操作が含まれます。

## ノード操作ガード

その名の通り、ノード操作ガードは特定のノード操作の挙動をインターセプトできます。

構成で `before` オブジェクトを設定し、プロパティ名はノード操作に対応し、値はブール値（または Promise で包まれたブール値）を返す関数です。

```js
let mind = new MindElixir({
  // ...
  before: {
    insertSibling(el, obj) {
      console.log(el, obj)
      if (this.currentNode.nodeObj.parent.root) {
        return false
      }
      return true
    },
    async addChild(el, obj) {
      await sleep()
      if (this.currentNode.nodeObj.parent.root) {
        return false
      }
      return true
    },
  },
})
```

`async` を使用することで、非同期情報が必要な場合に進行するかどうかを決定できるようになります。

## プログラムでのノード操作

Mind Elixir はノードを直接操作するための API を提供しています。

```ts
{
  insertSibling: (
    this: MindElixirInstance,
    type: 'before' | 'after',
    el?: Topic | undefined,
    node?: NodeObj | undefined
  ) => Promise<void>
  insertParent: (
    this: MindElixirInstance,
    el?: Topic | undefined,
    node?: NodeObj | undefined
  ) => Promise<void>
  addChild: (
    this: MindElixirInstance,
    el?: Topic | undefined,
    node?: NodeObj | undefined
  ) => Promise<void>
  copyNode: (this: MindElixirInstance, node: Topic, to: Topic) => Promise<void>
  copyNodes: (this: MindElixirInstance, tpcs: Topic[], to: Topic) =>
    Promise<void>
  moveUpNode: (this: MindElixirInstance, el?: Topic | undefined) =>
    Promise<void>
  moveDownNode: (this: MindElixirInstance, el?: Topic | undefined) =>
    Promise<void>
  removeNode: (this: MindElixirInstance, el?: Topic | undefined) =>
    Promise<void>
  removeNodes: (this: MindElixirInstance, tpcs: Topic[]) => Promise<void>
  moveNodeIn: (this: MindElixirInstance, from: Topic[], to: Topic) =>
    Promise<void>
  moveNodeBefore: (this: MindElixirInstance, from: Topic[], to: Topic) =>
    Promise<void>
  moveNodeAfter: (this: MindElixirInstance, from: Topic[], to: Topic) =>
    Promise<void>
}
```

例えば、`insertSibling` を使用して、id が `d6e5f69edb6336c3` のノードに兄弟ノードを追加したい場合、次のようにします。

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E` は、id によってノードの DOM オブジェクトを取得するメソッドです。Mind Elixir の多くの API では DOM オブジェクトの型として `Topic` を使用し、それらを取得するために `E` 関数を使用できます。

:::