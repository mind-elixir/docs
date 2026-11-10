---
title: "Node Operations"
sidebar_position: 2
description: "Listen to and intercept node operations in Mind Elixir Core, or manipulate nodes programmatically with the built-in node APIs."
keywords:
  - "node operations"
  - "events"
  - "bus"
  - "API"
  - "JavaScript mind map"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Node Operations

This section discusses how to listen to and intercept node operations, while also introducing ways to programmatically manipulate nodes.

## Subscribe to Node Operations

We can subscribe to user operations on the mind map by listening to operation events. It's as simple as listening to DOM events:

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

The most commonly used event is the `operation` event, which encompasses all node operations.

`operation` is a discriminated union on `name`:

- `target` is the affected node — a single `NodeObj`, or a `NodeObj[]` for batch operations (`copyNodes`, `removeNodes`, `moveNodes*`).
- `destination` is the move target, and `position` is `'before' | 'after'` for `insertSibling`.
- Folding and expanding arrive on `operation` as `expandNode` / `collapseNode`. `op.silent` is `true` for internal silent expands and `{ silent: true }` calls, which never create undo entries.
- Node methods take arrays: `copyNodes([node], to)` and `moveNodesIn` / `moveNodesBefore` / `moveNodesAfter(nodes, to)`.

See the [v6 API Guide](../getting-started/migration-v6.md) for the full list.

## Node Operation Guards

As the name suggests, node operation guards can intercept the behavior of a specific node operation.

In the configuration, set the `before` object, where the property names correspond to node operations, and the values are functions returning a boolean (or a boolean wrapped in a Promise).

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

With `async` in operation guards, we can intercept cases where asynchronous information is needed to decide whether to proceed.

## Programmatic Node Operations

Mind Elixir Core provides an API for directly manipulating nodes:

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

For example, using `insertSibling`, if we want to add a sibling node to the node with the id `d6e5f69edb6336c3`, we can do the following:

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E` is a method to obtain the DOM object of a node by its id. Many APIs in Mind Elixir Core use `Topic` as the type for DOM objects, and you can use the `E` function to get them.

:::