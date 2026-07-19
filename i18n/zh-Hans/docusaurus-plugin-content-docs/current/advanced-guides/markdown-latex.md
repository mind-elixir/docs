# Markdown 与 LaTeX

Mind Elixir **不内置** Markdown 或 LaTeX 渲染器。渲染完全可插拔：在构造选项中传入自定义 `markdown` 函数即可。该函数接收节点（或箭头 / 概要）文本，并返回 HTML。

这与 [Mind Elixir Desktop](https://github.com/SSShooter/mind-elixir-desktop) 的实现方式一致。

## 安装

```bash
npm i marked katex
```

## 接入解析器

```js
import MindElixir from 'mind-elixir'
import { marked } from 'marked'
import katex from 'katex'
import 'katex/dist/katex.min.css' // 公式样式，必须引入
// 可选：化学公式 mhchem
// import 'katex/contrib/mhchem'

function md2html(text) {
  if (!text) return ''

  // 块级公式：$$...$$
  text = text.replace(/\$\$([^$]+)\$\$/g, (_, math) =>
    katex.renderToString(math.trim(), {
      displayMode: true,
      output: 'html',
      throwOnError: false,
    }),
  )

  // 行内公式：$...$
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
    topic: '数学笔记',
    root: true,
    children: [
      {
        id: 'fourier',
        topic:
          '傅里叶变换：$$F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt$$',
      },
      {
        id: 'inline',
        topic: '质能方程：$E = mc^2$',
      },
      {
        id: 'md',
        topic: '**加粗**、*斜体* 与 [链接](https://katex.org)',
      },
    ],
  },
})
```

`markdown` 的第二个参数是完整对象（`NodeObj` | `Arrow` | `Summary`）。可以只在部分节点开启 Markdown（例如自定义 `useMd` 字段）：

```js
function md2html(text, obj) {
  if (obj && 'useMd' in obj && !obj.useMd) return text
  // ... 与上文相同的转换逻辑
}
```

## 公式语法

| 模式 | 写法 | 示例 |
| --- | --- | --- |
| 行内 | `$...$` | `$E = mc^2$` |
| 块级 | `$$...$$` | `$$\int_0^1 x^2\,dx$$` |

常用示例：

```text
# 行内
质能关系为 $E = mc^2$。

# 块级
$$
i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi
$$

# 化学式（需启用 mhchem）
$$\ce{CO2 + C -> 2 CO}$$
$$\ce{H2O}$$
```

## Markdown 能力

配合 [marked](https://marked.js.org/)（或其他 Markdown 库）可在节点主题中渲染标题、强调、列表、链接、代码和表格。桌面端会将链接在新标签页打开，你也可以自定义 renderer：

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

可选的强调着色语法（与桌面端一致）：

- `**%:red:重要**` — 彩色加粗  
- `__%:yellow:高亮__` — 背景高亮  

通过自定义 `strong` renderer 实现（可参考 Mind Elixir Desktop 中的 `md2html`）。

## 样式建议

1. 务必引入 `katex/dist/katex.min.css`，否则公式几乎无法阅读。
2. 将 Markdown 样式限定在 `.map-container` 下，避免污染页面其他区域：

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

## 图片 / SVG 导出

导出 SVG 或 PNG 时，需要通过导出接口注入 KaTeX CSS（以及自定义 Markdown CSS），公式样式才会正确。详见 [图片导出](../guides/image-export.md)。

```js
// 将 KaTeX + 自定义 CSS 作为 injectCss 传入 exportPng / exportSvg
const blob = await mind.exportPng(false, style + katexCss)
```

## 安全

`markdown` 选项会像 [`dangerouslySetInnerHTML`](./dangerouslySetInnerHTML.md) 一样把 HTML 写入思维导图。请仅用于可信内容，或在返回前用 [DOMPurify](https://github.com/cure53/DOMPurify) 等库做消毒。

## API 参考

- [`Options.markdown`](../api/mind-elixir.options.markdown.md)
- [`MindElixirInstance.markdown`](../api/mind-elixir.mindelixirinstance.markdown.md)

## 相关文档

- [dangerouslySetInnerHTML](./dangerouslySetInnerHTML.md) — 向节点插入原始 HTML
- [图片导出](../guides/image-export.md) — 导出时注入样式
- [KaTeX 文档](https://katex.org/docs/supported.html)
