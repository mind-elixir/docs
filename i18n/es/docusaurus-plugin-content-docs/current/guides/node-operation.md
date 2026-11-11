---
title: "Operaciones con nodos"
sidebar_position: 2
description: "Escucha e intercepta las operaciones con nodos en Mind Elixir Core, o manipula nodos mediante código con las APIs integradas."
keywords:
  - "operaciones con nodos"
  - "eventos"
  - "bus"
  - "API"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Operaciones con nodos

En esta sección se explica cómo escuchar e interceptar las operaciones con nodos, y también se presentan formas de manipular nodos mediante código.

## Suscribirse a las operaciones con nodos

Podemos suscribirnos a las operaciones del usuario sobre el mapa mental escuchando los eventos de operación. Es tan sencillo como escuchar eventos del DOM:

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

El evento más utilizado es `operation`, que engloba todas las operaciones con nodos.

`operation` es una unión discriminada sobre `name`:

- `target` es el nodo afectado: un único `NodeObj` o un `NodeObj[]` en operaciones por lotes (`copyNodes`, `removeNodes`, `moveNodes*`).
- `destination` es el destino del movimiento y `position` es `'before' | 'after'` para `insertSibling`.
- Plegar y desplegar llegan en `operation` como `expandNode` / `collapseNode`. `op.silent` es `true` para los desplegados silenciosos internos y las llamadas `{ silent: true }`, que nunca crean entradas en el historial.
- Los métodos de nodos reciben arrays: `copyNodes([node], to)` y `moveNodesIn` / `moveNodesBefore` / `moveNodesAfter(nodes, to)`.

Consulta la [guía de la API v6](../getting-started/migration-v6.md) para ver la lista completa.

## Guardas de operaciones con nodos

Como su nombre indica, las guardas de operaciones pueden interceptar el comportamiento de una operación concreta.

En la configuración, define el objeto `before`: los nombres de las propiedades corresponden a operaciones con nodos y los valores son funciones que devuelven un booleano (o un booleano envuelto en una Promise).

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

Con `async` en las guardas podemos interceptar casos en los que se necesita información asíncrona para decidir si se continúa.

## Operaciones programáticas con nodos

Mind Elixir Core proporciona una API para manipular nodos directamente:

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

Por ejemplo, con `insertSibling`, si queremos añadir un nodo hermano al nodo con id `d6e5f69edb6336c3` hacemos lo siguiente:

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E` es un método para obtener el objeto DOM de un nodo a partir de su id. Muchas APIs de Mind Elixir Core usan `Topic` como tipo para los objetos DOM y puedes usar la función `E` para obtenerlos.

:::