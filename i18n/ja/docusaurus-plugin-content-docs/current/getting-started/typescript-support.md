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

## ジェネリック型

デフォルトエクスポートはジェネリッククラスなので、カスタムのノード metadata はクラス側で指定します：

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData
```

コンストラクタを変数に保持する場合（ファクトリ関数など）は、`typeof MindElixir` で注釈します：

```ts
const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`、`MindElixirData`、`NodeObj`、`NodeObjExport`、`Theme` はいずれも同じ metadata 型パラメータを受け取ります。その他の API は [v6 API ガイド](./migration-v6.md) を参照してください。