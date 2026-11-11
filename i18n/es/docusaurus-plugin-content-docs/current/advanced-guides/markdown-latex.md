---
title: "Markdown y LaTeX"
description: "Renderiza Markdown y LaTeX dentro de los nodos de Mind Elixir Core pasando una función markdown personalizada como marked o katex al constructor."
keywords:
  - "Markdown"
  - "LaTeX"
  - "KaTeX"
  - "marked"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Markdown y LaTeX

Mind Elixir Core **no** incluye un renderizador de Markdown o LaTeX integrado. El renderizado es totalmente conectable: pasa una función `markdown` personalizada en las opciones del constructor. Esa función recibe el texto del nodo (o de la flecha / el resumen) y debe devolver HTML.

Es el mismo enfoque que usa la [Mind Elixir App](https://app.mind-elixir.com).

## Instalación

```bash
npm i marked katex
```

## Conectar el parser

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

El segundo argumento de `markdown` es el objeto completo (`NodeObj` | `Arrow` | `Summary`). Puedes usarlo para activar Markdown solo en determinados nodos (por ejemplo mediante una marca `useMd` personalizada):

```js
function md2html(text, obj) {
  if (obj && 'useMd' in obj && !obj.useMd) return text
  // ... same conversion as above
}
```

## Sintaxis de fórmulas

| Modo | Sintaxis | Ejemplo |
| --- | --- | --- |
| En línea | `$...$` | `$E = mc^2$` |
| Bloque | `$$...$$` | `$$\int_0^1 x^2\,dx$$` |

Ejemplos habituales:

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

## Funciones Markdown

Con [marked](https://marked.js.org/) (o cualquier otra biblioteca Markdown) puedes renderizar encabezados, énfasis, listas, enlaces, código y tablas dentro de los temas de los nodos. En la Mind Elixir App los enlaces se abren en una pestaña nueva mediante un renderizador personalizado, y tú puedes hacer lo mismo:

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

Colores de énfasis opcionales:

- `**%:red:Important**` – texto en negrita de color  
- `__%:yellow:Highlight__` – fondo resaltado  

Para implementarlos, personaliza el renderizador `strong` (consulta el helper `md2html` en el código fuente de este sitio).

## Consejos de estilo

1. Importa siempre `katex/dist/katex.min.css` o las fórmulas aparecerán sin estilos.
2. Limita los estilos Markdown a `.map-container` para que no afecten al resto de la página:

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

## Exportación de imagen / SVG

Al exportar SVG o PNG, inyecta el CSS de KaTeX (y cualquier CSS Markdown personalizado) mediante los helpers de exportación para que las fórmulas sigan viéndose bien. Consulta [Exportación de imágenes](../guides/image-export.md).

```js
// Pass KaTeX + custom CSS into exportPng / exportSvg as injectCss
const blob = await mind.exportPng(false, style + katexCss)
```

## Seguridad

La opción `markdown` escribe HTML en el mapa mental igual que [`dangerouslySetInnerHTML`](./dangerouslySetInnerHTML.md). Usa solo contenido de confianza o sanea el HTML (por ejemplo con [DOMPurify](https://github.com/cure53/DOMPurify)) antes de devolverlo desde tu parser.

## Referencia de la API

- [`Options.markdown`](../api/mind-elixir.options.markdown)
- [`MindElixir.markdown`](../api/mind-elixir.mindelixir.markdown)

## Relacionado

- [dangerouslySetInnerHTML](./dangerouslySetInnerHTML.md) – insertar HTML sin procesar en un nodo
- [Exportación de imágenes](../guides/image-export.md) – exportar con estilos inyectados
- [Documentación de KaTeX](https://katex.org/docs/supported.html)
