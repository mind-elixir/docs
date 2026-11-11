---
title: "Compatibilidad con TypeScript"
sidebar_position: 3
description: "Mind Elixir Core incluye sus propios tipos de TypeScript. No hace falta ningún paquete @types adicional: opciones, datos de nodos y métodos de instancia tipados desde el principio."
keywords:
  - "TypeScript"
  - "tipos"
  - "definiciones de tipos"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Compatibilidad con TypeScript

Mind Elixir Core está escrito en TypeScript y no requiere instalar paquetes npm adicionales. Es compatible con TypeScript de forma nativa.

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

La exportación por defecto es una clase genérica, por lo que los metadatos personalizados de los nodos fluyen a través de la propia clase:

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData
```

Cuando una variable contiene el constructor (por ejemplo en una fábrica), anótala con `typeof MindElixir`:

```ts
const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport` y `Theme` aceptan el mismo parámetro de tipo para metadatos. Consulta la [guía de la API v6](./migration-v6.md) para ver el resto de la API.