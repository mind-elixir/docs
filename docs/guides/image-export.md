# Image Export

Mind Elixir provides two APIs for exporting images:

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

If `noForeignObject` is set to `true`, the SVG export will not use foreignObject.

Not all SVG renderers support foreignObject, so in specific scenarios where exported SVG cannot be used, you can disable foreignObject. The trade-off is that long text inside nodes won't wrap. (Alternatively, you can choose to directly output PNG.)

`injectCss` is for cases using `dangerouslySetInnerHTML`. If you need to supplement custom CSS inside nodes, you can directly pass a CSS string. The provided CSS will be added to the generated SVG, ensuring the rendering is not too different from the browser.

:::warning

When using `dangerouslySetInnerHTML`, as it allows injecting arbitrary content, there may be situations where the export algorithm cannot accommodate. In such cases, unexpected issues may arise when exporting images.

:::

## Practice

Here is an example of encapsulating a `download` function. In this example, `style + katex` represents the necessary styles for custom CSS and Katex (refer to [this link](https://github.com/SSShooter/mind-elixir-core/blob/87bb57ff060a62f4c4c66cc57689af29da780393/src/dev.ts#L102) for specific content). By passing this to the export functions, you can ensure correct styling when exporting SVG.

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
