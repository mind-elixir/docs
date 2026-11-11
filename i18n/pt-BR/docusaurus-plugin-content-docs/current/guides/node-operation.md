---
title: "Operações com nós"
sidebar_position: 2
description: "Escute e intercepte operações com nós no Mind Elixir Core, ou manipule nós programaticamente com as APIs integradas."
keywords:
  - "operações com nós"
  - "eventos"
  - "bus"
  - "API"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Operações com nós

Esta seção mostra como escutar e interceptar operações com nós, além de apresentar formas de manipulá-los programaticamente.

## Assinar operações com nós

Podemos assinar as operações do usuário no mapa mental ouvindo eventos de operação. É tão simples quanto ouvir eventos DOM:

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

O evento mais usado é `operation`, que engloba todas as operações com nós.

`operation` é uma união discriminada por `name`:

- `target` é o nó afetado — um único `NodeObj` ou um `NodeObj[]` em operações em lote (`copyNodes`, `removeNodes`, `moveNodes*`).
- `destination` é o destino do movimento e `position` é `'before' | 'after'` para `insertSibling`.
- Recolher e expandir chegam em `operation` como `expandNode` / `collapseNode`. `op.silent` é `true` para expansões internas silenciosas e chamadas `{ silent: true }`, que nunca criam entradas no histórico.
- Os métodos de nós recebem arrays: `copyNodes([node], to)` e `moveNodesIn` / `moveNodesBefore` / `moveNodesAfter(nodes, to)`.

Consulte o [Guia da API v6](../getting-started/migration-v6.md) para a lista completa.

## Guardas de operações com nós

Como o nome sugere, as guardas de operações podem interceptar o comportamento de uma operação específica.

Na configuração, defina o objeto `before`: os nomes das propriedades correspondem a operações com nós e os valores são funções que retornam um booleano (ou um booleano envolvido em uma Promise).

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

Com `async` nas guardas, podemos interceptar casos em que é preciso informação assíncrona para decidir se a operação continua.

## Operações programáticas com nós

O Mind Elixir Core fornece uma API para manipular nós diretamente:

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

Por exemplo, usando `insertSibling`, se quisermos adicionar um nó irmão ao nó com id `d6e5f69edb6336c3`, fazemos o seguinte:

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E` é um método para obter o objeto DOM de um nó pelo seu id. Muitas APIs do Mind Elixir Core usam `Topic` como tipo para objetos DOM, e você pode usar a função `E` para obtê-los.

:::