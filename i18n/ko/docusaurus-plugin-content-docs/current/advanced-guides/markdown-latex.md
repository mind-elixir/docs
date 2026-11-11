---
title: "Markdown과 LaTeX"
description: "marked나 katex 같은 사용자 정의 markdown 함수를 생성자에 전달해 Mind Elixir Core 노드 안에서 Markdown과 LaTeX를 렌더링하세요."
keywords:
  - "Markdown"
  - "LaTeX"
  - "KaTeX"
  - "marked"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Markdown과 LaTeX

Mind Elixir Core에는 Markdown/LaTeX 렌더러가 **내장되어 있지 않습니다**. 렌더링은 완전히 교체 가능하므로 생성자 옵션에 사용자 정의 `markdown` 함수를 전달하세요. 이 함수는 노드(또는 화살표/요약) 텍스트를 받아 HTML을 반환해야 합니다.

[Mind Elixir App](https://app.mind-elixir.com)도 같은 방식을 사용합니다.

## 설치

```bash
npm i marked katex
```

## 파서 연결

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

`markdown`의 두 번째 인자는 전체 객체(`NodeObj` | `Arrow` | `Summary`)입니다. 이를 이용해 특정 노드에만 Markdown을 적용할 수 있습니다(예: 사용자 정의 `useMd` 플래그):

```js
function md2html(text, obj) {
  if (obj && 'useMd' in obj && !obj.useMd) return text
  // ... same conversion as above
}
```

## 수식 문법

| 모드 | 문법 | 예시 |
| --- | --- | --- |
| 인라인 | `$...$` | `$E = mc^2$` |
| 블록 | `$$...$$` | `$$\int_0^1 x^2\,dx$$` |

자주 쓰는 예시:

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

## Markdown 기능

[marked](https://marked.js.org/)(또는 다른 Markdown 라이브러리)를 사용하면 노드 주제 안에 제목, 강조, 목록, 링크, 코드, 표를 렌더링할 수 있습니다. Mind Elixir App에서는 사용자 정의 렌더러로 링크를 새 탭에서 열며, 동일하게 구현할 수 있습니다:

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

선택적 강조 색상:

- `**%:red:Important**` — 색이 있는 굵은 텍스트  
- `__%:yellow:Highlight__` — 강조 배경  

`strong` 렌더러를 사용자 정의해 구현하세요(이 사이트 소스의 `md2html` 헬퍼 참고).

## 스타일 팁

1. `katex/dist/katex.min.css`를 항상 import하세요. 그렇지 않으면 수식에 스타일이 적용되지 않습니다.
2. Markdown 스타일은 `.map-container` 아래로 범위를 제한해 페이지 나머지 부분에 새지 않도록 하세요:

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

## 이미지 / SVG 내보내기

SVG나 PNG로 내보낼 때는 내보내기 헬퍼를 통해 KaTeX CSS(및 사용자 정의 Markdown CSS)를 주입해야 수식이 올바르게 보입니다. [이미지 내보내기](../guides/image-export.md)를 참고하세요.

```js
// Pass KaTeX + custom CSS into exportPng / exportSvg as injectCss
const blob = await mind.exportPng(false, style + katexCss)
```

## 보안

`markdown` 옵션은 [`dangerouslySetInnerHTML`](./dangerouslySetInnerHTML.md)과 같은 방식으로 마인드맵에 HTML을 씁니다. 신뢰할 수 있는 콘텐츠만 사용하거나, 파서에서 반환하기 전에 [DOMPurify](https://github.com/cure53/DOMPurify) 등으로 HTML을 정제하세요.

## API 참고

- [`Options.markdown`](../api/mind-elixir.options.markdown)
- [`MindElixir.markdown`](../api/mind-elixir.mindelixir.markdown)

## 관련 문서

- [dangerouslySetInnerHTML](./dangerouslySetInnerHTML.md) — 노드에 원시 HTML 삽입
- [이미지 내보내기](../guides/image-export.md) — 스타일을 주입해 내보내기
- [KaTeX 문서](https://katex.org/docs/supported.html)
