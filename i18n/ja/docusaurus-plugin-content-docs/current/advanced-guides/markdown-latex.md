# Markdown と LaTeX

Mind Elixir には **Markdown / LaTeX の組み込みレンダラーはありません**。コンストラクタの `markdown` オプションにカスタム関数を渡すことで、完全に差し替え可能です。関数はノード（または矢印 / サマリー）のテキストを受け取り、HTML を返します。

これは [Mind Elixir Desktop](https://github.com/SSShooter/mind-elixir-desktop) と同じ方式です。

## インストール

```bash
npm i marked katex
```

## パーサーの接続

```js
import MindElixir from 'mind-elixir'
import { marked } from 'marked'
import katex from 'katex'
import 'katex/dist/katex.min.css' // 数式スタイルに必須
// 任意: 化学式 mhchem
// import 'katex/contrib/mhchem'

function md2html(text) {
  if (!text) return ''

  // ディスプレイ数式: $$...$$
  text = text.replace(/\$\$([^$]+)\$\$/g, (_, math) =>
    katex.renderToString(math.trim(), {
      displayMode: true,
      output: 'html',
      throwOnError: false,
    }),
  )

  // インライン数式: $...$
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
    topic: '数学メモ',
    root: true,
    children: [
      {
        id: 'fourier',
        topic:
          'フーリエ変換: $$F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt$$',
      },
      {
        id: 'inline',
        topic: 'アインシュタイン: $E = mc^2$',
      },
      {
        id: 'md',
        topic: '**太字**、*斜体*、[リンク](https://katex.org)',
      },
    ],
  },
})
```

`markdown` の第 2 引数はオブジェクト全体（`NodeObj` | `Arrow` | `Summary`）です。カスタムの `useMd` フラグなどで、特定ノードだけ Markdown を有効にできます：

```js
function md2html(text, obj) {
  if (obj && 'useMd' in obj && !obj.useMd) return text
  // ... 上記と同じ変換
}
```

## 数式の書き方

| モード | 記法 | 例 |
| --- | --- | --- |
| インライン | `$...$` | `$E = mc^2$` |
| ディスプレイ | `$$...$$` | `$$\int_0^1 x^2\,dx$$` |

よく使う例：

```text
# インライン
質量とエネルギーの関係は $E = mc^2$ です。

# ディスプレイ
$$
i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi
$$

# 化学式（mhchem が必要）
$$\ce{CO2 + C -> 2 CO}$$
$$\ce{H2O}$$
```

## Markdown の機能

[marked](https://marked.js.org/)（または任意の Markdown ライブラリ）を使えば、見出し・強調・リスト・リンク・コード・表をノード内に描けます。デスクトップ版と同様にリンクを新しいタブで開く renderer も定義できます：

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

任意の強調カラー構文（デスクトップ版と同じ）：

- `**%:red:重要**` — 色付き太字  
- `__%:yellow:ハイライト__` — 背景ハイライト  

`strong` renderer をカスタマイズして実装します（Mind Elixir Desktop の `md2html` を参照）。

## スタイルのヒント

1. 必ず `katex/dist/katex.min.css` を読み込んでください。
2. Markdown 用スタイルは `.map-container` 以下に限定し、ページ全体へ漏れないようにします：

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

## 画像 / SVG エクスポート

SVG / PNG 出力時は、KaTeX CSS（と任意の Markdown CSS）を export ヘルパーへ注入しないと数式の見た目が崩れます。[画像エクスポート](../guides/image-export.md) を参照してください。

```js
// KaTeX + カスタム CSS を injectCss として渡す
const blob = await mind.exportPng(false, style + katexCss)
```

## セキュリティ

`markdown` オプションは [`dangerouslySetInnerHTML`](./dangerouslySetInnerHTML.md) と同様に HTML をマップへ書き込みます。信頼できる内容だけを使うか、[DOMPurify](https://github.com/cure53/DOMPurify) などでサニタイズしてから返してください。

## API リファレンス

- [`Options.markdown`](../api/mind-elixir.options.markdown.md)
- [`MindElixirInstance.markdown`](../api/mind-elixir.mindelixirinstance.markdown.md)

## 関連

- [dangerouslySetInnerHTML](./dangerouslySetInnerHTML.md) — ノードへ生 HTML を挿入
- [画像エクスポート](../guides/image-export.md) — スタイル注入付きエクスポート
- [KaTeX ドキュメント](https://katex.org/docs/supported.html)
