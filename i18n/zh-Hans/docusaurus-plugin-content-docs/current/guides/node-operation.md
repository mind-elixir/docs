---
sidebar_position: 2
---

# 节点操作

本节讲述如何监听和拦截节点操作，同时介绍编程式操作节点的方式。

## 订阅节点操作

我们可以通过订阅操作事件订阅用户对思维导图的操作。十分简单，就像监听 DOM 事件那样：

```js
mind.bus.addListener('operation', (operation) => {
  console.log(operation)
  // return {
  //   name: action name,
  //   obj: target object
  // }

  // name: [insertSibling|addChild|removeNode|beginEdit|finishEdit]
  // obj: target

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

其中最常用的是 `operation` 事件，所有节点操作都会归到这个事件中。

## 节点操作守卫

节点操作守卫就如其名，他能拦截某个节点操作的操作行为。

在配置中设定 `before` 对象，属性名为对应节点操作，值为一个返回布尔值（或由 Promise 包裹的布尔值）的函数。

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

我们可以通过 `async` 操作守卫可以拦截需要异步获取信息才能决定是否通过的情况。

## 编程式节点操作

Mind Elixir 提供直接操作节点的 API：

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

使用 `insertSibling` 举例，如果需要对 id 为 `d6e5f69edb6336c3` 的节点新增一个兄弟节点，我们可以这么做：

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E` 是一个通过节点 id 获取节点 DOM 对象的方法，在 Mind Elixir 中很多 API 会使用类型为 `Topic` 的 DOM 对象，都可以使用 `E` 函数获取。

:::
