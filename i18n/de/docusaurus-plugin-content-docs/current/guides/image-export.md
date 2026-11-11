---
title: "Bildexport"
description: "Eine Mind Elixir Core-Mindmap mit den APIs exportSvg und exportPng als SVG oder PNG ausgeben, optional mit eingefügtem CSS."
keywords:
  - "SVG-Export"
  - "PNG-Export"
  - "exportPng"
  - "exportSvg"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Bildexport

Mind Elixir Core stellt zwei APIs für den Bildexport bereit:

```ts
exportSvg: (
  this: MindElixir,
  noForeignObject?: boolean,
  injectCss?: string | undefined
) => Blob
exportPng: (
  this: MindElixir,
  noForeignObject?: boolean,
  injectCss?: string | undefined
) => Promise<Blob | null>
```

Wenn `noForeignObject` auf `true` gesetzt ist, verwendet der SVG-Export kein foreignObject.

Nicht alle SVG-Renderer unterstützen foreignObject. Falls ein exportiertes SVG in bestimmten Szenarien nicht verwendbar ist, kannst du foreignObject deaktivieren. Der Preis dafür: Langer Text innerhalb von Knoten wird nicht mehr umgebrochen. (Alternativ kannst du direkt PNG ausgeben.)

`injectCss` ist für Fälle mit `dangerouslySetInnerHTML` gedacht. Wenn du benutzerdefiniertes CSS innerhalb von Knoten ergänzen möchtest, kannst du direkt eine CSS-Zeichenkette übergeben. Das CSS wird dem erzeugten SVG hinzugefügt, sodass die Darstellung möglichst nah am Browser bleibt.

:::warning

Bei Verwendung von `dangerouslySetInnerHTML` können beliebige Inhalte eingefügt werden; es kann daher Situationen geben, mit denen der Exportalgorithmus nicht umgehen kann. Dann können beim Bildexport unerwartete Probleme auftreten.

:::

## Praxisbeispiel

Hier ist ein Beispiel für die Kapselung einer `download`-Funktion. `style + katex` steht dabei für die nötigen Stile aus benutzerdefiniertem CSS und KaTeX (Einzelheiten siehe [dieser Link](https://github.com/SSShooter/mind-elixir-core/blob/87bb57ff060a62f4c4c66cc57689af29da780393/src/dev.ts#L102)). Wenn du dies an die Exportfunktionen übergibst, ist die Darstellung beim SVG-Export korrekt.

```js
const download = (type) => {
  return async () => {
    try {
      let blob = null
      if (type === 'png') blob = await mind.exportPng(false, style + katex)
      else blob = await mind.exportSvg(false, style + katex)
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'filename.' + type
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    }
  }
}
```
