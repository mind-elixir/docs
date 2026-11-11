---
title: "Outliner"
description: "Usa el punto de entrada Outliner para mostrar un documento de Mind Elixir como un esquema editable que comparte datos e historial de deshacer con el mapa."
keywords:
  - "outliner"
  - "esquema"
  - "mind-elixir/outliner"
  - "deshacer"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Outliner

El outliner se distribuye como punto de entrada propio y es una vista pura de una instancia de `MindElixir`. Renderiza `mei.nodeData`, devuelve cada edición al mapa a través de las operaciones con nodos del mapa y comparte su historial de deshacer/rehacer. Un documento, dos vistas.

## Importaciones

```ts
import MindElixir from 'mind-elixir'
import { Outliner } from 'mind-elixir/outliner'
import 'mind-elixir/outliner/style.css'
```

Cuando el mapa y el esquema conviven en la misma aplicación, puedes usar el punto de entrada principal: su hoja de estilos ya incluye las reglas del esquema:

```ts
import MindElixir, { Outliner } from 'mind-elixir'
import 'mind-elixir/style.css'
```

Elige una sola ruta de importación por aplicación. Importar desde ambas te da dos copias de la clase; es inofensivo, pero no hay motivo para hacerlo.

## Vincular un esquema a un mapa

```ts
const mei = new MindElixir({
  el: '#map',
  allowUndo: true, // the outline reads mei.historyStack
  markdown: renderMarkdown,
})
await mei.init(data) // wait for init before creating the outline

const outliner = new Outliner({
  el: '#outline',
  mei,
  fileName: 'Outline',
  markdown: renderMarkdown,
})
```

`mei` aporta tanto los datos como el historial, así que no hay que conectar nada más. `allowUndo: true` es obligatorio y `init()` debe haberse resuelto. El esquema escucha tanto el historial compartido (ediciones estructurales, deshacer/rehacer, plegar/desplegar) como el evento `operation` del mapa (operaciones internas silenciosas) y los combina en un único renderizado por tick.

## Markdown y KaTeX

La opción `markdown` acepta el mismo renderizador que `Options.markdown`. Los temas se renderizan como HTML mientras no se editan y vuelven al código Markdown original al recibir el foco, para que el origen siga siendo editable. Usa el mismo renderizador en el mapa y en el esquema para que ambas vistas se vean igual. Consulta [Markdown y LaTeX](./markdown-latex.md).

## Deshacer, plegado y foco

Como ambas vistas comparten `mei.historyStack`, `Ctrl + Z` deshace las ediciones hechas en cualquiera de ellas, incluidos los plegados. Plegar un nodo sin hijos o volver a aplicar el estado de plegado existente no toca ni el DOM ni el historial. `focusNode` y `cancelFocus` vacían la pila de deshacer/rehacer, de modo que el límite de foco es también un límite del historial en ambos sentidos.

## Modelo de documento

El outliner es una vista sobre una instancia de `MindElixir`: pasa siempre `mei` en las opciones. Los datos viven en `mei.nodeData` y cada edición pasa por las operaciones con nodos del mapa, por lo que el mapa sigue siendo la única fuente de verdad. Las ediciones disponibles están en [Operaciones con nodos](../guides/node-operation.md).
