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
  topic: 'test',
}
```

:::warning

`dangerouslySetInnerHTML` を使用した場合、画像の出力機能に予測できない問題が発生する可能性があります。カスタムスタイルが存在する場合は、`injectCss` を指定することに注意してください。

:::

## 危険に注意

:::danger

`dangerouslySetInnerHTML` はその名の通り、制限なしに使用すると XSS 攻撃にさらされる可能性があります。`dangerouslySetInnerHTML` を使用する際は、コンテンツが信頼できることを確認してください。

:::

以下のようなケースでは、処理を行わないとユーザーのクッキー情報が露出します：

```json
{
  "children": [
    {
      "direction": 0,
      "id": "d34338c074901546",
      "topic": "新しいノード"
    }
  ],
  "dangerouslySetInnerHTML": "<img src=\"\" onerror=\"alert(document.cookie);\"><img src=\"https://dda.com\" />",
  "id": "root",
  "root": true,
  "topic": "テスト"
}
```

`dangerouslySetInnerHTML` に値を代入する前に、[DOMPurify](https://github.com/cure53/DOMPurify)などの XSS 攻撃を防ぐライブラリを使用してデータを処理できます。
