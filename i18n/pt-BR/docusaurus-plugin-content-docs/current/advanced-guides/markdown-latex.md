---
title: "Markdown e LaTeX"
description: "Renderize Markdown e LaTeX dentro dos nós do Mind Elixir Core passando uma função markdown personalizada como marked ou katex ao construtor."
keywords:
  - "Markdown"
  - "LaTeX"
  - "KaTeX"
  - "marked"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Markdown e LaTeX

O Mind Elixir Core **não** inclui um renderizador de Markdown ou LaTeX embutido. A renderização é totalmente plugável: passe uma função `markdown` personalizada nas opções do construtor. Essa função recebe o texto do nó (ou da seta / do resumo) e deve retornar HTML.

É a mesma abordagem usada pelo [Mind Elixir App](https://app.mind-elixir.com).

## Instalação

```bash
npm i marked katex
```

## Conectar o parser

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

O segundo argumento de `markdown` é o objeto completo (`NodeObj` | `Arrow` | `Summary`). Você pode usá-lo para ativar Markdown apenas em nós selecionados (por exemplo, com uma flag `useMd` personalizada):

```js
function md2html(text, obj) {
  if (obj && 'useMd' in obj && !obj.useMd) return text
  // ... same conversion as above
}
```

## Sintaxe de fórmulas

| Modo | Sintaxe | Exemplo |
| --- | --- | --- |
| Em linha | `$...$` | `$E = mc^2$` |
| Bloco | `$$...$$` | `$$\int_0^1 x^2\,dx$$` |

Exemplos comuns:

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

## Recursos Markdown

Com o [marked](https://marked.js.org/) (ou qualquer outra biblioteca Markdown) você pode renderizar títulos, ênfase, listas, links, código e tabelas dentro dos tópicos dos nós. No Mind Elixir App os links abrem em uma nova aba por meio de um renderizador personalizado — você pode fazer o mesmo:

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

Cores de ênfase opcionais:

- `**%:red:Important**` — texto em negrito colorido  
- `__%:yellow:Highlight__` — fundo destacado  

Implemente isso personalizando o renderizador `strong` (veja o helper `md2html` no código-fonte deste site).

## Dicas de estilo

1. Sempre importe `katex/dist/katex.min.css`, ou as fórmulas ficarão sem estilo.
2. Limite os estilos Markdown a `.map-container` para que não vazem para o restante da página:

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

## Exportação de imagem / SVG

Ao exportar SVG ou PNG, injete o CSS do KaTeX (e qualquer CSS Markdown personalizado) pelos helpers de exportação para que as fórmulas continuem corretas. Veja [Exportação de imagens](../guides/image-export.md).

```js
// Pass KaTeX + custom CSS into exportPng / exportSvg as injectCss
const blob = await mind.exportPng(false, style + katexCss)
```

## Segurança

A opção `markdown` escreve HTML no mapa mental da mesma forma que [`dangerouslySetInnerHTML`](./dangerouslySetInnerHTML.md). Use apenas conteúdo confiável ou higienize o HTML (por exemplo com [DOMPurify](https://github.com/cure53/DOMPurify)) antes de retorná-lo do seu parser.

## Referência da API

- [`Options.markdown`](../api/mind-elixir.options.markdown)
- [`MindElixir.markdown`](../api/mind-elixir.mindelixir.markdown)

## Relacionados

- [dangerouslySetInnerHTML](./dangerouslySetInnerHTML.md) — inserir HTML bruto em um nó
- [Exportação de imagens](../guides/image-export.md) — exportar com estilos injetados
- [Documentação do KaTeX](https://katex.org/docs/supported.html)
