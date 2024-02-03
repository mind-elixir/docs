# 画像のエクスポート

Mind Elixir の画像エクスポート API は 2 つあります：

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

`noForeignObject` が `true` に設定されると、SVG のエクスポート時に foreignObject が使用されません。

すべての SVG レンダラが foreignObject をサポートしているわけではないため、特定のシナリオでエクスポートされた SVG を使用できない場合は foreignObject を無効にすることができます。その代償として、ノード内の非常に長いテキストは改行されません。（もちろん、直接 PNG を出力することもできます）

`injectCss` は `dangerouslySetInnerHTML` を使用する場合に、カスタムノード内の CSS を補完する必要がある場合に、直接 CSS 文字列を渡すことができます。渡された CSS は生成された SVG に追加され、レンダリングがブラウザと大きく異ならないようにします。

:::warning

`dangerouslySetInnerHTML`を使用する場合、任意の内容を注入できるため、エクスポートアルゴリズムが考慮しきれない状況が発生する可能性があり、このため画像のエクスポートに予測できない問題が発生する可能性があります。

:::

## 実践

以下は`download`関数を包装する例です。ここで`style + katex`はカスタム CSS と katex の必要なスタイルです（詳細は[このリンク](https://github.com/SSShooter/mind-elixir-core/blob/87bb57ff060a62f4c4c66cc57689af29da780393/src/dev.ts#L102)を参照してください）。これを出力関数に渡すと、SVG の出力時にスタイルが正しく適用されます。

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
