---
title: "TypeScript Support"
sidebar_position: 3
description: "Mind Elixir Core ships its own TypeScript types. No extra @types package needed — typed options, node data and instance methods out of the box."
keywords:
  - "TypeScript"
  - "types"
  - "type definitions"
  - "JavaScript mind map"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# TypeScript Support

Mind Elixir Core is written in TypeScript and does not require the installation of additional npm packages. It inherently supports TypeScript.

```ts
import MindElixir, { MindElixirData, Options } from 'mind-elixir'

const options: Options = {
  el: '#map',
}
const data: MindElixirData = {
  nodeData: {
    id: 'root',
    topic: 'root',
    children: [
      {
        id: 'sub1',
        topic: 'sub1',
        children: [
          {
            id: 'sub2',
            topic: 'sub2',
          },
        ],
      },
    ],
  },
}
const mei = new MindElixir(options)
mei.init(data)
```

## Generic types

The default export is a generic class, so custom node metadata flows through the class itself:

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData
```

When a variable holds the constructor (for example in a factory), annotate it with `typeof MindElixir`:

```ts
const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport` and `Theme` all accept the same metadata type parameter. See the [v6 API Guide](./migration-v6.md) for the rest of the API.