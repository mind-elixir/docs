---
sidebar_position: 2
---

# Node Operations

This section discusses how to listen to and intercept node operations, while also introducing ways to programmatically manipulate nodes.

## Subscribe to Node Operations

We can subscribe to user operations on the mind map by listening to operation events. It's as simple as listening to DOM events:

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

The most commonly used event is the `operation` event, which encompasses all node operations.

## Node Operation Guards

As the name suggests, node operation guards can intercept the behavior of a specific node operation.

In the configuration, set the `before` object, where the property names correspond to node operations, and the values are functions returning a boolean (or a boolean wrapped in a Promise).

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

With `async` in operation guards, we can intercept cases where asynchronous information is needed to decide whether to proceed.

## Programmatic Node Operations

Mind Elixir provides an API for directly manipulating nodes:

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

For example, using `insertSibling`, if we want to add a sibling node to the node with the id `d6e5f69edb6336c3`, we can do the following:

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E` is a method to obtain the DOM object of a node by its id. Many APIs in Mind Elixir use `Topic` as the type for DOM objects, and you can use the `E` function to get them.

:::