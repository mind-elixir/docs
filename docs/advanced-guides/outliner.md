---
title: "Outliner"
description: "Use the Outliner entry point to render a Mind Elixir document as an editable outline that shares data and undo history with the map."
keywords:
  - "outliner"
  - "outline"
  - "mind-elixir/outliner"
  - "undo"
  - "JavaScript mind map"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Outliner

The outliner ships as its own entry point and is a pure view of a `MindElixir` instance. It renders `mei.nodeData`, routes every edit back to the map through the map's node operations, and shares the map's undo/redo journal. One document, two views.

## Imports

```ts
import MindElixir from 'mind-elixir'
import { Outliner } from 'mind-elixir/outliner'
import 'mind-elixir/outliner/style.css'
```

When the map and the outline live in the same app, you can use the main entry instead — its stylesheet already contains the outline rules:

```ts
import MindElixir, { Outliner } from 'mind-elixir'
import 'mind-elixir/style.css'
```

Pick one import path per application. Importing from both gives you two copies of the class; this is harmless, but there is no reason to do it.

## Bind an outline to a map

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

`mei` supplies both the data and the history, so nothing else needs to be wired up. `allowUndo: true` is required, and `init()` must have resolved. The outline listens to both the shared journal (structural edits, undo/redo, collapse/expand) and the map's `operation` event (silent internal operations), merging them into one render per tick.

## Markdown and KaTeX

The `markdown` option takes the same renderer as `Options.markdown`. Topics are rendered as HTML while not being edited and switch back to the raw Markdown source when focused, so the source stays editable. Use the same renderer on the map and the outline to keep both views visually in step. See [Markdown & LaTeX](./markdown-latex.md).

## Undo, folding and focus

Because both views share `mei.historyStack`, `Ctrl + Z` undoes edits made in either view, including folds. Collapsing a childless node, or re-applying the existing fold state, touches neither the DOM nor the history. `focusNode` and `cancelFocus` clear the undo/redo stack, making the focus boundary a history boundary in both directions.

## Document model

The outliner is a view over a `MindElixir` instance: always pass `mei` in the options. Data lives in `mei.nodeData`, and every edit goes through the map's node operations, so the map stays the single source of truth. See [Node Operations](../guides/node-operation.md) for the available edits.
