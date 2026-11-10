---
title: "TypeScript サポート"
sidebar_position: 3
description: "Mind Elixir Core は TypeScript の型定義を同梱しており、追加の @types パッケージなしでオプションやノードデータ、インスタンスメソッドが型付けされます。"
keywords:
  - "TypeScript"
  - "型定義"
  - "型"
  - "JavaScript マインドマップ"
  - "Mind Elixir Core"
  - "mind-elixir"
---


# TypeScript サポート

Mind Elixir CoreはTypeScriptで書かれており、他のnpmパッケージのインストールは不要で、ネイティブでTypeScriptをサポートしています。

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