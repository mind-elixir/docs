---
title: "dangerouslySetInnerHTML"
description: "dangerouslySetInnerHTML 노드 속성으로 Mind Elixir Core 노드 안에 KaTeX, 구문 강조 코드, 사용자 정의 HTML을 렌더링하세요."
keywords:
  - "dangerouslySetInnerHTML"
  - "사용자 정의 HTML"
  - "리치 콘텐츠"
  - "JavaScript 마인드맵"
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

`dangerouslySetInnerHTML`을 사용하면 이미지 출력 기능에서 예상치 못한 문제가 생길 수 있습니다. 사용자 정의 스타일이 있다면 반드시 `injectCss` 속성으로 전달하세요.

:::

## 주의: 신중하게 사용

:::danger

이름 그대로 `dangerouslySetInnerHTML`을 무제한으로 사용하면 웹사이트가 XSS 공격에 노출될 수 있습니다. 신뢰할 수 있는 콘텐츠에만 사용하세요.

:::

아래 같은 상황에서 아무 처리도 하지 않으면 사용자 쿠키가 노출될 수 있습니다:

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

`dangerouslySetInnerHTML`에 값을 할당하기 전에 [DOMPurify](https://github.com/cure53/DOMPurify) 같은 라이브러리로 데이터를 정제해 XSS 공격을 막는 것을 권장합니다.
