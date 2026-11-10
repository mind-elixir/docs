---
title: "节点操作"
sidebar_position: 2
description: "在 Mind Elixir Core 中监听与拦截节点操作，或通过内置节点 API 以编程方式操作节点。"
keywords:
  - "节点操作"
  - "事件"
  - "bus"
  - "API"
  - "JavaScript 思维导图"
  - "Mind Elixir Core"
  - "mind-elixir"
---


# 节点操作

本节讲述如何监听和拦截节点操作，同时介绍编程式操作节点的方式。

## 订阅节点操作

我们可以通过订阅操作事件订阅用户对思维导图的操作。十分简单，就像监听 DOM 事件那样：

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

其中最常用的是 `operation` 事件，所有节点操作都会归到这个事件中。

`operation` 是按 `name` 区分的联合类型：

- `target` 是受影响的节点：单节点操作为 `NodeObj`，批量操作（`copyNodes`、`removeNodes`、`moveNodes*`）为 `NodeObj[]`。
- `destination` 表示移动目标；`insertSibling` 使用 `position: 'before' | 'after'`。
- 折叠与展开通过 `operation` 事件以 `expandNode` / `collapseNode` 派发。内部静默展开或显式传入 `{ silent: true }` 时 `op.silent` 为 `true`，这类操作不会进入撤销栈。
- 节点方法接收数组：`copyNodes([node], to)`、`moveNodesIn` / `moveNodesBefore` / `moveNodesAfter(nodes, to)`。

完整清单见 [v6 API 指南](../getting-started/migration-v6.md)。

## 节点操作守卫

节点操作守卫就如其名，他能拦截某个节点操作的操作行为。

在配置中设定 `before` 对象，属性名为对应节点操作，值为一个返回布尔值（或由 Promise 包裹的布尔值）的函数。

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

我们可以通过 `async` 操作守卫可以拦截需要异步获取信息才能决定是否通过的情况。

## 编程式节点操作

Mind Elixir Core 提供直接操作节点的 API：

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

使用 `insertSibling` 举例，如果需要对 id 为 `d6e5f69edb6336c3` 的节点新增一个兄弟节点，我们可以这么做：

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E` 是一个通过节点 id 获取节点 DOM 对象的方法，在 Mind Elixir Core 中很多 API 会使用类型为 `Topic` 的 DOM 对象，都可以使用 `E` 函数获取。

:::
