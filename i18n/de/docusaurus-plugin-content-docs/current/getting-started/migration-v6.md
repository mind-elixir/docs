---
title: "v6-API-Leitfaden"
sidebar_position: 5
description: "Die API von Mind Elixir Core 6.0: DOM-Selektoren, Knotenoperationen, Operations-Payloads, TypeScript-Generics und Bus-Ereignisse."
keywords:
  - "Migration"
  - "v6"
  - "API"
  - "Upgrade"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# v6-API-Leitfaden

Mind Elixir Core 6.0 wurde am 02.11.2026 veröffentlicht. Diese Seite beschreibt die aktuelle API für DOM-Selektoren, Knotenoperationen, Operations-Payloads, TypeScript-Typen und Bus-Ereignisse sowie die neuen Funktionen in v6. Das Dokumentformat selbst bleibt unverändert.

## 1. DOM-Selektoren

Innere Elemente der Mindmap sind `<div>`-Elemente mit `me-*`-Klassen. Verwende immer Klassenselektoren:

```css
.me-tpc { ... }
.me-main.lhs { ... }
.me-main.rhs { ... }
.me-main.down { ... }
```

```js
const root = map.querySelector('.me-root')
```

Die verfügbaren Klassen sind `.me-main`, `.me-wrapper`, `.me-parent`, `.me-children`, `.me-tpc`, `.me-epd`, `.me-nodes` und `.me-root`. Die Richtungsklassen liegen auf `.me-main`.

:::tip

Eine Knoten-ID wie `id: 'me-root'` in deinen Daten ist kein CSS-Selektor.

:::

Siehe [Benutzerdefinierte Zweigstile](../advanced-guides/customize-branch-style.md) für `querySelector` innerhalb eines Zweig-Generators.

## 2. Kopieren und Verschieben von Knoten

```js
mind.copyNodes([node], to)
mind.moveNodesIn(nodes, to)
mind.moveNodesBefore(nodes, to)
mind.moveNodesAfter(nodes, to)
mind.moveUpNode(el)
mind.moveDownNode(el)
```

Jede Stapelmethode erwartet ein Array von `Topic`-Elementen plus ein Ziel-`Topic`. Die zugehörigen Operationsnamen sind `copyNodes`, `moveNodesIn`, `moveNodesBefore` und `moveNodesAfter`. Die vollständige Signaturliste findest du unter [Knotenoperationen](../guides/node-operation.md).

## 3. Operations-Payloads

```js
mind.bus.addListener('operation', operation => {
  console.log(operation.name, operation.target)
  if (['moveNodesIn', 'moveNodesBefore', 'moveNodesAfter'].includes(operation.name)) {
    console.log(operation.destination)
  }
})
```

`operation` ist eine diskriminierte Union über `name`. `target` ist ein einzelnes `NodeObj` bei Operationen mit einem Ziel und ein `NodeObj[]` bei Stapeloperationen. `destination` enthält das Verschiebungsziel, `position` ist `'before' | 'after'` für `insertSibling`, und `origin` enthält den vorherigen Zustand für `reshapeNode` / `finishEdit`. Ein- und Ausklappen erscheinen als `expandNode` / `collapseNode` auf demselben Ereignis.

## 4. TypeScript-Generics

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData

const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport` und `Theme` akzeptieren alle denselben Metadaten-Typparameter. Siehe [TypeScript-Unterstützung](./typescript-support.md).

## 5. Lite-Build

```js
import MindElixir from 'mind-elixir/lite'
// the built file is named MindElixirLite.js
```

## 6. Ein-/Ausklapp-Ereignisse

```js
mind.bus.addListener('operation', op => {
  if (op.name === 'expandNode' || op.name === 'collapseNode') {
    console.log('node: ', op.target)
    console.log('silent: ', op.silent)
  }
})
```

Das Einklappen ist eine Dokumentänderung und erscheint auf `operation`. `target` ist das eingeklappte `NodeObj`; `silent` ist `true` bei internen stillen Ausklappvorgängen und `{ silent: true }`-Aufrufen, die keinen Historieneintrag erzeugen. `expandNode` und `expandNodeAll` akzeptieren `{ silent: true }`.

## Neue Funktionen in v6

- **Rechts-nach-links-Text.** Übergib `rtl: true` an `Options`, um Knotenthemen, Editor, Beschriftungen und Kontextmenü auf RTL umzustellen (Arabisch, Hebräisch, Persisch, Urdu). Die Achse des Zweig-Layouts bleibt unberührt. Die Sprachdatei `ar` ist über `mind-elixir/i18n` verfügbar.
- **Outliner als eigener Einstiegspunkt.** `import { Outliner } from 'mind-elixir/outliner'` plus `mind-elixir/outliner/style.css`. Der Haupteinstieg re-exportiert ihn weiterhin. Siehe [Outliner](../advanced-guides/outliner.md).
- **Inkrementelle Aktualisierung.** `mind.diffRefresh(data)` wendet nur die Differenz an und behält Elemente, Listener und Fokuszustand unveränderter Knoten bei. Siehe [Datenimport und -export](../guides/data-export.md).
- **Rückgängig machbares Einklappen.** `Ctrl + Z` stellt den vorherigen Faltzustand wieder her; Mindmap und Outliner teilen sich eine Undo-Timeline. `expandNode` / `expandNodeAll` akzeptieren `{ silent: true }`, um den Historieneintrag zu überspringen.
- **Navigation über Zweige hinweg.** `ArrowDown` vom letzten Kind und `ArrowUp` vom ersten Kind springen in den nächstgelegenen Geschwisterzweig. Siehe [Tastenkürzel](../guides/shortcuts.md).
- **Markdown-Renderer überall.** Die Option `markdown` rendert Themen sowohl in der Mindmap als auch im Outliner. Siehe [Markdown & LaTeX](../advanced-guides/markdown-latex.md).
- **Theme und Fokus.** Rufe `changeTheme(data.theme)` explizit auf, um das Theme zu wechseln; `refresh(data)` verlässt den Fokusmodus und sendet ein `refresh`-Ereignis; `focusNode` / `cancelFocus` leeren den Undo-/Redo-Stapel.
