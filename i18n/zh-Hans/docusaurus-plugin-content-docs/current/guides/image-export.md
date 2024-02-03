# 图片导出

Mind Elixir 导出图片的 API 有 2 个：

```ts
exportSvg: (
  this: MindElixirInstance,
  noForeignObject?: boolean,
  injectCss?: string | undefined
) => Blob
exportPng: (
  this: MindElixirInstance,
  noForeignObject?: boolean,
  injectCss?: string | undefined
) => Promise<Blob | null>
```

如果 `noForeignObject` 置为 `true`，SVG 导出时不会使用 foreignObject。

不是所有的 SVG 渲染器都支持 foreignObject，因此在特定场景无法使用导出的 SVG 时可以禁用 foreignObject，其代价是节点内的超长文本无法换行。（当然也可以选择直接输出 png）

`injectCss` 是针对使用 `dangerouslySetInnerHTML` 时，如果需要补充自定义节点内的 CSS，可以直接传入 CSS 字符串。传入的 CSS 会添加到生成的 SVG 内，保证渲染不与浏览器相差太远。

:::warning

使用 `dangerouslySetInnerHTML` 时，因为可以注入任意内容，可能会出现导出算法无法兼顾的情况，此时导出图片可能会出现无法预料的问题。

:::

## 实践

以下是一个封装 `download` 函数的例子，其中 `style + katex` 是自定义 CSS 和 katex 的必要样式（具体内容参考[此链接](https://github.com/SSShooter/mind-elixir-core/blob/87bb57ff060a62f4c4c66cc57689af29da780393/src/dev.ts#L102)），如此传入输出函数即可使用输出 SVG 时样式正确。

```js
const download = (type) => {
  return async () => {
    try {
      let blob = null
      if (type === 'png') blob = await mind.exportPng(false, style + katex)
      else blob = await mind.exportSvg(false, style + katex)
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'filename.' + type
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    }
  }
}
```
