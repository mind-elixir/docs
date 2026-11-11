---
title: "Knotenoperationen"
sidebar_position: 2
description: "Knotenoperationen in Mind Elixir Core beobachten und abfangen oder Knoten programmatisch über die integrierten APIs bearbeiten."
keywords:
  - "Knotenoperationen"
  - "Ereignisse"
  - "Bus"
  - "API"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Knotenoperationen

In diesem Abschnitt geht es darum, Knotenoperationen zu beobachten und abzufangen; außerdem werden Möglichkeiten vorgestellt, Knoten programmatisch zu bearbeiten.

## Knotenoperationen abonnieren

Operationen der Nutzerinnen und Nutzer auf der Mindmap können wir abonnieren, indem wir auf Operationsereignisse lauschen. Das ist so einfach wie das Lauschen auf DOM-Ereignisse:

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

Das am häufigsten verwendete Ereignis ist `operation`, das alle Knotenoperationen umfasst.

`operation` ist eine diskriminierte Union über `name`:

- `target` ist der betroffene Knoten – ein einzelnes `NodeObj` oder ein `NodeObj[]` bei Stapeloperationen (`copyNodes`, `removeNodes`, `moveNodes*`).
- `destination` ist das Verschiebungsziel, und `position` ist `'before' | 'after'` für `insertSibling`.
- Ein- und Ausklappen erscheinen auf `operation` als `expandNode` / `collapseNode`. `op.silent` ist `true` bei internen stillen Ausklappvorgängen und `{ silent: true }`-Aufrufen, die niemals Historieneinträge erzeugen.
- Knotenmethoden erwarten Arrays: `copyNodes([node], to)` sowie `moveNodesIn` / `moveNodesBefore` / `moveNodesAfter(nodes, to)`.

Die vollständige Liste findest du im [v6-API-Leitfaden](../getting-started/migration-v6.md).

## Guards für Knotenoperationen

Wie der Name schon sagt, können Guards für Knotenoperationen das Verhalten einer bestimmten Knotenoperation abfangen.

Setze in der Konfiguration das Objekt `before`: Die Eigenschaftsnamen entsprechen den Knotenoperationen, die Werte sind Funktionen, die einen Boolean zurückgeben (oder einen in ein Promise verpackten Boolean).

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

Mit `async` in Operations-Guards lassen sich auch Fälle abfangen, in denen asynchrone Informationen nötig sind, um über den Fortgang zu entscheiden.

## Programmatische Knotenoperationen

Mind Elixir Core stellt eine API zur direkten Bearbeitung von Knoten bereit:

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

Wenn wir beispielsweise mit `insertSibling` einen Geschwisterknoten zum Knoten mit der ID `d6e5f69edb6336c3` hinzufügen möchten, gehen wir so vor:

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E` liefert das DOM-Objekt eines Knotens anhand seiner ID. Viele APIs von Mind Elixir Core verwenden `Topic` als Typ für DOM-Objekte; mit der Funktion `E` erhältst du sie.

:::