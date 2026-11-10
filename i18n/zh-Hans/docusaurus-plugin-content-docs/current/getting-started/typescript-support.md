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

## 泛型类型

默认导出本身就是一个泛型类，自定义节点 metadata 直接通过类传递：

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData
```

如果需要用变量保存构造函数（例如工厂函数），使用 `typeof MindElixir` 标注：

```ts
const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`、`MindElixirData`、`NodeObj`、`NodeObjExport` 和 `Theme` 都接受同一个 metadata 类型参数。其余 API 见 [v6 API 指南](./migration-v6.md)。
