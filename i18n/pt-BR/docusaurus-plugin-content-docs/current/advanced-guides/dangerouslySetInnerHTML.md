---
title: "dangerouslySetInnerHTML"
description: "Renderize KaTeX, código destacado e HTML personalizado dentro dos nós do Mind Elixir Core com a propriedade dangerouslySetInnerHTML."
keywords:
  - "dangerouslySetInnerHTML"
  - "HTML personalizado"
  - "conteúdo rico"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# dangerouslySetInnerHTML

```js
const katexHTML = `<div class="math math-display"><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:2.4em;vertical-align:-0.95em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size1">[</span></span><span class="mord"><span class="mtable"><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">x</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.85em;"><span style="top:-3.01em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">y</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height:0.35em;"><span></span></span></span></span></span></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size1">]</span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size3">[</span></span><span class="mord"><span class="mtable"><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.61em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">a</span></span></span><span style="top:-2.41em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">b</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:0.5em;"></span><span class="arraycolsep" style="width:0.5em;"></span><span class="col-align-c"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.45em;"><span style="top:-3.61em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">c</span></span></span><span style="top:-2.41em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">d</span></span></span></span><span class="vlist-s">&ZeroWidthSpace;</span></span><span class="vlist-r"><span class="vlist" style="height:0.95em;"><span></span></span></span></span></span></span></span><span class="mclose delimcenter" style="top:0em;"><span class="delimsizing size3">]</span></span></span></span></span></span></span></div>`

const codeBlock = `<pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> message <span class="token operator">=</span> <span class="token string">'Hello world'</span>
<span class="token function">alert</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span></code></pre>`

const styledDiv = `<div><style>.title{font-size:50px}</style><div class="title">Title</div><div style="color: red; font-size: 20px;">Hello world</div></div>`

const data = {
  children: [
    {
      direction: 0,
      id: 'd34338c074901546',
      topic: 'new node',
    },
  ],
  dangerouslySetInnerHTML: styledDiv,
  id: 'root',
  root: true,
  topic: 'ceshi',
}
```

:::warning

Ao usar `dangerouslySetInnerHTML`, esteja ciente de que podem ocorrer problemas inesperados na saída de imagens. Se houver estilos personalizados, passe-os pela propriedade `injectCss`.

:::

## Atenção: use com cuidado

:::danger

Como o nome indica, o uso irrestrito de `dangerouslySetInnerHTML` pode expor seu site a ataques XSS. Use `dangerouslySetInnerHTML` apenas quando o conteúdo for confiável.

:::

Em cenários como o abaixo, não tratar o conteúdo pode expor os cookies dos usuários:

```json
{
  "children": [
    {
      "direction": 0,
      "id": "d34338c074901546",
      "topic": "new node"
    }
  ],
  "dangerouslySetInnerHTML": "<img src=\"\" onerror=\"alert(document.cookie);\"><img src=\"https://dda.com\" />",
  "id": "root",
  "root": true,
  "topic": "ceshi"
}
```

Antes de atribuir `dangerouslySetInnerHTML`, considere usar uma biblioteca como [DOMPurify](https://github.com/cure53/DOMPurify) para higienizar os dados e evitar ataques XSS.
