---
title: "TypeScript-Unterstützung"
sidebar_position: 3
description: "Mind Elixir Core liefert eigene TypeScript-Typen mit. Kein zusätzliches @types-Paket nötig – typisierte Optionen, Knotendaten und Instanzmethoden direkt einsatzbereit."
keywords:
  - "TypeScript"
  - "Typen"
  - "Typdefinitionen"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# TypeScript-Unterstützung

Mind Elixir Core ist in TypeScript geschrieben und benötigt keine zusätzlichen npm-Pakete. TypeScript wird von Haus aus unterstützt.

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

## Generische Typen

Der Standard-Export ist eine generische Klasse, sodass benutzerdefinierte Knoten-Metadaten durch die Klasse selbst fließen:

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData
```

Wenn eine Variable den Konstruktor enthält (etwa in einer Factory), annotiere sie mit `typeof MindElixir`:

```ts
const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport` und `Theme` akzeptieren alle denselben Metadaten-Typparameter. Den Rest der API findest du im [v6-API-Leitfaden](./migration-v6.md).