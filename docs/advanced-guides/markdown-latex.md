# Markdown and LaTeX

Mind Elixir does **not** ship a built-in Markdown or LaTeX renderer. Rendering is fully pluggable: pass a custom `markdown` function in the constructor options. That function receives the node (or arrow / summary) text and should return HTML.

This is the same approach used by [Mind Elixir Desktop](https://github.com/SSShooter/mind-elixir-desktop).

## Install

```bash
npm i marked katex
```

## Wire up the parser

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

The second argument of `markdown` is the full object (`NodeObj` | `Arrow` | `Summary`). You can use it to enable Markdown only for selected nodes (for example via a custom `useMd` flag):

```js
function md2html(text, obj) {
  if (obj && 'useMd' in obj && !obj.useMd) return text
  // ... same conversion as above
}
```

## Formula syntax

| Mode | Syntax | Example |
| --- | --- | --- |
| Inline | `$...$` | `$E = mc^2$` |
| Display (block) | `$$...$$` | `$$\int_0^1 x^2\,dx$$` |

Common examples:

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

## Markdown features

With [marked](https://marked.js.org/) (or any other Markdown library) you can render headings, emphasis, lists, links, code, and tables inside node topics. Links in the desktop app open in a new tab via a custom renderer — you can do the same:

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

Optional desktop-style emphasis colors:

- `**%:red:Important**` — colored bold text  
- `__%:yellow:Highlight__` — highlighted background  

Implement these by customizing the `strong` renderer (see `md2html` in Mind Elixir Desktop).

## Styling tips

1. Always import `katex/dist/katex.min.css`, or formulas will look unstyled.
2. Scope Markdown styles under `.map-container` so they do not leak into the rest of the page:

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

## Image / SVG export

When exporting SVG or PNG, inject KaTeX CSS (and any custom Markdown CSS) via the export helpers so formulas still look correct. See [Image Export](../guides/image-export.md).

```js
// Pass KaTeX + custom CSS into exportPng / exportSvg as injectCss
const blob = await mind.exportPng(false, style + katexCss)
```

## Security

The `markdown` option writes HTML into the mind map the same way as [`dangerouslySetInnerHTML`](./dangerouslySetInnerHTML.md). Only use trusted content, or sanitize the HTML (for example with [DOMPurify](https://github.com/cure53/DOMPurify)) before returning it from your parser.

## API reference

- [`Options.markdown`](../api/mind-elixir.options.markdown.md)
- [`MindElixirInstance.markdown`](../api/mind-elixir.mindelixirinstance.markdown.md)

## Related

- [dangerouslySetInnerHTML](./dangerouslySetInnerHTML.md) — insert raw HTML into a node
- [Image Export](../guides/image-export.md) — export with injected styles
- [KaTeX documentation](https://katex.org/docs/supported.html)
