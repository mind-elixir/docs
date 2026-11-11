---
title: "Guía de la API v6"
sidebar_position: 5
description: "La API de Mind Elixir Core 6.0: selectores del DOM, operaciones con nodos, payloads de operación, genéricos de TypeScript y eventos del bus."
keywords:
  - "migración"
  - "v6"
  - "API"
  - "actualización"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Guía de la API v6

Mind Elixir Core 6.0 se publicó el 2026-11-02. Esta página recoge la API actual para selectores del DOM, operaciones con nodos, payloads de operación, tipos TypeScript y eventos del bus, además de las novedades de v6. El formato del documento no cambia.

## 1. Selectores del DOM

Los elementos internos del mapa son elementos `<div>` con clases `me-*`. Usa siempre selectores de clase:

```css
.me-tpc { ... }
.me-main.lhs { ... }
.me-main.rhs { ... }
.me-main.down { ... }
```

```js
const root = map.querySelector('.me-root')
```

Las clases disponibles son `.me-main`, `.me-wrapper`, `.me-parent`, `.me-children`, `.me-tpc`, `.me-epd`, `.me-nodes` y `.me-root`. Las clases de dirección están en `.me-main`.

:::tip

Un id de nodo como `id: 'me-root'` en tus datos no es un selector CSS.

:::

Consulta [Estilos de rama personalizados](../advanced-guides/customize-branch-style.md) para usar `querySelector` dentro de un generador de ramas.

## 2. Copiar y mover nodos

```js
mind.copyNodes([node], to)
mind.moveNodesIn(nodes, to)
mind.moveNodesBefore(nodes, to)
mind.moveNodesAfter(nodes, to)
mind.moveUpNode(el)
mind.moveDownNode(el)
```

Cada método por lotes recibe un array de elementos `Topic` más un `Topic` de destino. Los nombres de operación correspondientes son `copyNodes`, `moveNodesIn`, `moveNodesBefore` y `moveNodesAfter`. Consulta [Operaciones con nodos](../guides/node-operation.md) para ver la lista completa de firmas.

## 3. Payloads de operación

```js
mind.bus.addListener('operation', operation => {
  console.log(operation.name, operation.target)
  if (['moveNodesIn', 'moveNodesBefore', 'moveNodesAfter'].includes(operation.name)) {
    console.log(operation.destination)
  }
})
```

`operation` es una unión discriminada sobre `name`. `target` es un único `NodeObj` para operaciones de un solo destino y un `NodeObj[]` para operaciones por lotes. `destination` contiene el destino del movimiento, `position` es `'before' | 'after'` para `insertSibling`, y `origin` lleva el estado anterior para `reshapeNode` / `finishEdit`. Plegar y desplegar llegan como `expandNode` / `collapseNode` en el mismo evento.

## 4. Genéricos de TypeScript

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData

const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport` y `Theme` aceptan el mismo parámetro de tipo para metadatos. Consulta [Compatibilidad con TypeScript](./typescript-support.md).

## 5. Compilación ligera

```js
import MindElixir from 'mind-elixir/lite'
// the built file is named MindElixirLite.js
```

## 6. Eventos de plegado y desplegado

```js
mind.bus.addListener('operation', op => {
  if (op.name === 'expandNode' || op.name === 'collapseNode') {
    console.log('node: ', op.target)
    console.log('silent: ', op.silent)
  }
})
```

Plegar es un cambio en el documento y llega en `operation`. `target` es el `NodeObj` plegado; `silent` es `true` para los desplegados silenciosos internos y las llamadas `{ silent: true }`, que no crean entradas en el historial. `expandNode` y `expandNodeAll` aceptan `{ silent: true }`.

## Novedades de v6

- **Texto de derecha a izquierda.** Pasa `rtl: true` a `Options` para cambiar a RTL los temas de los nodos, el editor, las etiquetas y el menú contextual (árabe, hebreo, persa, urdu). El eje de disposición de las ramas no se ve afectado. La configuración regional `ar` está disponible en `mind-elixir/i18n`.
- **Outliner como punto de entrada propio.** `import { Outliner } from 'mind-elixir/outliner'` junto con `mind-elixir/outliner/style.css`. El punto de entrada principal sigue reexportándolo. Consulta [Outliner](../advanced-guides/outliner.md).
- **Actualización incremental.** `mind.diffRefresh(data)` aplica solo la diferencia y conserva los elementos, los listeners y el estado de foco de los nodos que no cambian. Consulta [Importación y exportación de datos](../guides/data-export.md).
- **Plegado deshacible.** `Ctrl + Z` restaura el estado de plegado anterior; el mapa y el outliner comparten una única línea de tiempo de deshacer. `expandNode` / `expandNodeAll` aceptan `{ silent: true }` para omitir la entrada en el historial.
- **Navegación entre ramas.** `ArrowDown` desde el último hijo y `ArrowUp` desde el primero saltan a la rama hermana más cercana. Consulta [Atajos de teclado](../guides/shortcuts.md).
- **Renderizador Markdown en todas partes.** La opción `markdown` renderiza los temas tanto en el mapa como en el outliner. Consulta [Markdown y LaTeX](../advanced-guides/markdown-latex.md).
- **Tema y foco.** Llama explícitamente a `changeTheme(data.theme)` para cambiar de tema; `refresh(data)` sale del modo enfoque y emite un evento `refresh`; `focusNode` / `cancelFocus` vacían la pila de deshacer/rehacer.
