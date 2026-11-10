---
title: "v6 API Guide"
sidebar_position: 5
description: "The Mind Elixir Core 6.0 API: DOM selectors, node operations, operation payloads, TypeScript generics and bus events."
keywords:
  - "migration"
  - "v6"
  - "API"
  - "upgrade"
  - "JavaScript mind map"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# v6 API Guide

Mind Elixir Core 6.0 was released on 2026-11-02. This page collects the current API for DOM selectors, node operations, operation payloads, TypeScript types and bus events, plus the features added in v6. The document format itself is unchanged.

## 1. DOM selectors

Inner map elements are `<div>` elements with `me-*` classes. Always use class selectors:

```css
.me-tpc { ... }
.me-main.lhs { ... }
.me-main.rhs { ... }
.me-main.down { ... }
```

```js
const root = map.querySelector('.me-root')
```

The available classes are `.me-main`, `.me-wrapper`, `.me-parent`, `.me-children`, `.me-tpc`, `.me-epd`, `.me-nodes` and `.me-root`. Direction classes live on `.me-main`.

:::tip

A node id such as `id: 'me-root'` in your data is not a CSS selector.

:::

See [Custom Branch Styles](../advanced-guides/customize-branch-style.md) for `querySelector` inside a branch generator.

## 2. Copying and moving nodes

```js
mind.copyNodes([node], to)
mind.moveNodesIn(nodes, to)
mind.moveNodesBefore(nodes, to)
mind.moveNodesAfter(nodes, to)
mind.moveUpNode(el)
mind.moveDownNode(el)
```

Every batch method takes an array of `Topic` elements plus a destination `Topic`. The matching operation names are `copyNodes`, `moveNodesIn`, `moveNodesBefore` and `moveNodesAfter`. See [Node Operations](../guides/node-operation.md) for the full signature list.

## 3. Operation payloads

```js
mind.bus.addListener('operation', operation => {
  console.log(operation.name, operation.target)
  if (['moveNodesIn', 'moveNodesBefore', 'moveNodesAfter'].includes(operation.name)) {
    console.log(operation.destination)
  }
})
```

`operation` is a discriminated union on `name`. `target` is a single `NodeObj` for single-target operations and a `NodeObj[]` for batch operations. `destination` holds the move target, `position` is `'before' | 'after'` for `insertSibling`, and `origin` carries the previous state for `reshapeNode` / `finishEdit`. Folding arrives as `expandNode` / `collapseNode` on the same event.

## 4. TypeScript generics

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData

const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport` and `Theme` all accept the same metadata type parameter. See [TypeScript Support](./typescript-support.md).

## 5. Lite build

```js
import MindElixir from 'mind-elixir/lite'
// the built file is named MindElixirLite.js
```

## 6. Collapse / expand events

```js
mind.bus.addListener('operation', op => {
  if (op.name === 'expandNode' || op.name === 'collapseNode') {
    console.log('node: ', op.target)
    console.log('silent: ', op.silent)
  }
})
```

Folding is a document change and arrives on `operation`. `target` is the folded `NodeObj`; `silent` is `true` for internal silent expands and `{ silent: true }` calls, which create no undo entry. `expandNode` and `expandNodeAll` accept `{ silent: true }`.

## v6 features

- **Right-to-left text.** Pass `rtl: true` to `Options` to switch node topics, the editor, labels and the context menu to RTL (Arabic, Hebrew, Persian, Urdu). The branch layout axis is unaffected. The `ar` locale is available from `mind-elixir/i18n`.
- **Outliner as its own entry point.** `import { Outliner } from 'mind-elixir/outliner'` plus `mind-elixir/outliner/style.css`. The main entry still re-exports it. See [Outliner](../advanced-guides/outliner.md).
- **Incremental refresh.** `mind.diffRefresh(data)` applies only the difference, keeping unchanged nodes' elements, listeners and focus state. See [Data Import and Export](../guides/data-export.md).
- **Undoable folding.** `Ctrl + Z` restores the previous fold state; the map and the outliner share one undo timeline. `expandNode` / `expandNodeAll` accept `{ silent: true }` to skip the history entry.
- **Cross-branch arrow navigation.** `ArrowDown` from the last child and `ArrowUp` from the first child step into the nearest sibling branch. See [Keyboard Shortcuts](../guides/shortcuts.md).
- **Markdown renderer everywhere.** The `markdown` option renders topics in both the map and the outliner. See [Markdown & LaTeX](../advanced-guides/markdown-latex.md).
- **Theme and focus.** Call `changeTheme(data.theme)` explicitly to switch themes; `refresh(data)` leaves focus mode and emits a `refresh` event; `focusNode` / `cancelFocus` clear the undo/redo stack.
