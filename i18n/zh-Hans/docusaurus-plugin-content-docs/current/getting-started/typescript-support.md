---
title: "TypeScript 支持"
sidebar_position: 3
description: "Mind Elixir Core 自带 TypeScript 类型声明，无需安装额外的 @types 包，选项、节点数据与实例方法均有类型提示。"
keywords:
  - "TypeScript"
  - "类型声明"
  - "类型提示"
  - "JavaScript 思维导图"
  - "Mind Elixir Core"
  - "mind-elixir"
---


# TypeScript 支持

Mind Elixir Core 使用 TypeScript 编写，不用安装其他 npm 包，天然支持 TypeScript。

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
