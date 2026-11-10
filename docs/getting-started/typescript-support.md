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