---
title: "Outliner"
description: "Mit dem Outliner-Einstiegspunkt ein Mind Elixir-Dokument als editierbare Gliederung darstellen, die Daten und Undo-Historie mit der Mindmap teilt."
keywords:
  - "Outliner"
  - "Gliederung"
  - "mind-elixir/outliner"
  - "Undo"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Outliner

Der Outliner wird als eigener Einstiegspunkt ausgeliefert und ist eine reine Ansicht einer `MindElixir`-Instanz. Er rendert `mei.nodeData`, leitet jede Bearbeitung über die Knotenoperationen der Mindmap zurück an diese und teilt sich deren Undo-/Redo-Protokoll. Ein Dokument, zwei Ansichten.

## Importe

```ts
import MindElixir from 'mind-elixir'
import { Outliner } from 'mind-elixir/outliner'
import 'mind-elixir/outliner/style.css'
```

Liegen Mindmap und Gliederung in derselben Anwendung, kannst du stattdessen den Haupteinstieg verwenden – dessen Stylesheet enthält die Gliederungsregeln bereits:

```ts
import MindElixir, { Outliner } from 'mind-elixir'
import 'mind-elixir/style.css'
```

Wähle pro Anwendung genau einen Importpfad. Aus beiden zu importieren ergibt zwei Kopien der Klasse; das ist harmlos, aber es gibt keinen Grund dafür.

## Gliederung an eine Mindmap binden

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

`mei` liefert sowohl die Daten als auch die Historie, es muss also nichts weiter verdrahtet werden. `allowUndo: true` ist erforderlich, und `init()` muss abgeschlossen sein. Die Gliederung lauscht sowohl auf das gemeinsame Protokoll (strukturelle Änderungen, Undo/Redo, Ein-/Ausklappen) als auch auf das `operation`-Ereignis der Mindmap (stille interne Operationen) und fasst beides zu einem Renderdurchlauf pro Tick zusammen.

## Markdown und KaTeX

Die Option `markdown` erwartet denselben Renderer wie `Options.markdown`. Themen werden außerhalb der Bearbeitung als HTML gerendert und wechseln bei Fokus zurück zum reinen Markdown-Quelltext, damit dieser editierbar bleibt. Verwende in Mindmap und Gliederung denselben Renderer, damit beide Ansichten optisch übereinstimmen. Siehe [Markdown & LaTeX](./markdown-latex.md).

## Undo, Einklappen und Fokus

Da beide Ansichten `mei.historyStack` teilen, macht `Ctrl + Z` Änderungen aus beiden Ansichten rückgängig – einschließlich Faltvorgängen. Das Einklappen eines Knotens ohne Kinder oder das erneute Anwenden des bestehenden Faltzustands berührt weder DOM noch Historie. `focusNode` und `cancelFocus` leeren den Undo-/Redo-Stapel und machen die Fokusgrenze damit in beide Richtungen zu einer Historiengrenze.

## Dokumentmodell

Der Outliner ist eine Ansicht über eine `MindElixir`-Instanz: Übergib `mei` immer in den Optionen. Die Daten liegen in `mei.nodeData`, und jede Bearbeitung läuft über die Knotenoperationen der Mindmap, sodass diese die einzige Wahrheitsquelle bleibt. Die verfügbaren Operationen findest du unter [Knotenoperationen](../guides/node-operation.md).
