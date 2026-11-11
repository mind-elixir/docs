---
title: "Suporte a TypeScript"
sidebar_position: 3
description: "O Mind Elixir Core já traz seus próprios tipos TypeScript. Não é necessário nenhum pacote @types extra: opções, dados de nós e métodos de instância tipados de imediato."
keywords:
  - "TypeScript"
  - "tipos"
  - "definições de tipos"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Suporte a TypeScript

O Mind Elixir Core é escrito em TypeScript e não exige a instalação de pacotes npm adicionais. O suporte a TypeScript é nativo.

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

## Tipos genéricos

A exportação padrão é uma classe genérica, portanto os metadados personalizados dos nós fluem pela própria classe:

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData
```

Quando uma variável guarda o construtor (por exemplo, em uma factory), anote-a com `typeof MindElixir`:

```ts
const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport` e `Theme` aceitam o mesmo parâmetro de tipo para metadados. Consulte o [Guia da API v6](./migration-v6.md) para o restante da API.