---
title: "Markdown und LaTeX"
description: "Markdown und LaTeX innerhalb von Mind Elixir Core-Knoten rendern, indem du eine eigene markdown-Funktion wie marked oder katex an den Konstruktor übergibst."
keywords:
  - "Markdown"
  - "LaTeX"
  - "KaTeX"
  - "marked"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Markdown und LaTeX

Mind Elixir Core enthält **keinen** eingebauten Markdown- oder LaTeX-Renderer. Die Darstellung ist vollständig austauschbar: Übergib eine eigene `markdown`-Funktion in den Konstruktoroptionen. Sie erhält den Text des Knotens (bzw. des Pfeils / der Zusammenfassung) und sollte HTML zurückgeben.

Denselben Ansatz verwendet die [Mind Elixir App](https://app.mind-elixir.com).

## Installation

```bash
npm i marked katex
```

## Parser einbinden

```js
import MindElixir from 'mind-elixir'
import { marked } from 'marked'
import katex from 'katex'
import 'katex/dist/katex.min.css' // required for formula styles
// Optional: chemical formulas via mhchem
// import 'katex/contrib/mhchem'

function md2html(text) {
  if (!text) return ''

  // Display math: $$...$$
  text = text.replace(/\$\$([^$]+)\$\$/g, (_, math) =>
    katex.renderToString(math.trim(), {
      displayMode: true,
      output: 'html',
      throwOnError: false,
    }),
  )

  // Inline math: $...$
  text = text.replace(/\$([^$]+)\$/g, (_, math) =>
    katex.renderToString(math.trim(), {
      displayMode: false,
      output: 'html',
      throwOnError: false,
    }),
  )

  return marked.parse(text, { gfm: true }).trim()
}

const mind = new MindElixir({
  el: '#map',
  markdown: md2html,
})

mind.init({
  nodeData: {
    id: 'root',
    topic: 'Math notes',
    root: true,
    children: [
      {
        id: 'fourier',
        topic:
          'Fourier transform: $$F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt$$',
      },
      {
        id: 'inline',
        topic: 'Einstein: $E = mc^2$',
      },
      {
        id: 'md',
        topic: '**Bold**, *italic*, and [links](https://katex.org)',
      },
    ],
  },
})
```

Das zweite Argument von `markdown` ist das vollständige Objekt (`NodeObj` | `Arrow` | `Summary`). Damit kannst du Markdown nur für ausgewählte Knoten aktivieren (beispielsweise über ein eigenes Flag `useMd`):

```js
function md2html(text, obj) {
  if (obj && 'useMd' in obj && !obj.useMd) return text
  // ... same conversion as above
}
```

## Formelsyntax

| Modus | Syntax | Beispiel |
| --- | --- | --- |
| Inline | `$...$` | `$E = mc^2$` |
| Block (abgesetzt) | `$$...$$` | `$$\int_0^1 x^2\,dx$$` |

Häufige Beispiele:

```text
# Inline
The mass–energy relation is $E = mc^2$.

# Display
$$
i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi
$$

# Chemistry (requires mhchem)
$$\ce{CO2 + C -> 2 CO}$$
$$\ce{H2O}$$
```

## Markdown-Funktionen

Mit [marked](https://marked.js.org/) (oder einer anderen Markdown-Bibliothek) kannst du Überschriften, Hervorhebungen, Listen, Links, Code und Tabellen innerhalb von Knotenthemen darstellen. Links öffnen in der Mind Elixir App über einen eigenen Renderer in einem neuen Tab – das kannst du genauso machen:

```js
import { marked } from 'marked'

const renderer = {
  link({ href, title, text }) {
    const t = title ? ` title="${title}"` : ''
    return `<a href="${href || ''}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
  },
}

marked.use({ renderer, gfm: true })
```

Optionale Farben für Hervorhebungen:

- `**%:red:Important**` – farbiger Fetttext  
- `__%:yellow:Highlight__` – hervorgehobener Hintergrund  

Implementiere diese, indem du den `strong`-Renderer anpasst (siehe den Helfer `md2html` im Quellcode dieser Website).

## Tipps zur Gestaltung

1. Importiere immer `katex/dist/katex.min.css`, sonst erscheinen Formeln ohne Stile.
2. Begrenze Markdown-Stile auf `.map-container`, damit sie nicht auf den Rest der Seite wirken:

```css
.map-container h1 { font-size: 1.5rem; font-weight: 700; }
.map-container h2 { font-size: 1.25rem; font-weight: 600; }
.map-container strong.asterisk,
.map-container em { color: var(--selected); }
.map-container strong.underscore {
  background-color: rgba(255, 255, 0, 0.3);
  padding: 0 0.2rem;
  border-radius: 0.1rem;
}
.map-container a { color: var(--selected); }
```

## Bild- / SVG-Export

Beim SVG- oder PNG-Export solltest du das KaTeX-CSS (und beliebiges eigenes Markdown-CSS) über die Export-Helfer einfügen, damit Formeln korrekt aussehen. Siehe [Bildexport](../guides/image-export.md).

```js
// Pass KaTeX + custom CSS into exportPng / exportSvg as injectCss
const blob = await mind.exportPng(false, style + katexCss)
```

## Sicherheit

Die Option `markdown` schreibt HTML auf dieselbe Weise in die Mindmap wie [`dangerouslySetInnerHTML`](./dangerouslySetInnerHTML.md). Verwende nur vertrauenswürdige Inhalte oder bereinige das HTML (beispielsweise mit [DOMPurify](https://github.com/cure53/DOMPurify)), bevor du es aus deinem Parser zurückgibst.

## API-Referenz

- [`Options.markdown`](../api/mind-elixir.options.markdown.md)
- [`MindElixir.markdown`](../api/mind-elixir.mindelixir.markdown.md)

## Weiterführendes

- [dangerouslySetInnerHTML](./dangerouslySetInnerHTML.md) – rohes HTML in einen Knoten einfügen
- [Bildexport](../guides/image-export.md) – Export mit eingefügten Stilen
- [KaTeX-Dokumentation](https://katex.org/docs/supported.html)
