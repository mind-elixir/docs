---
title: "Exportação de imagens"
description: "Exporte um mapa mental do Mind Elixir Core como SVG ou PNG com as APIs exportSvg e exportPng, incluindo injeção opcional de CSS."
keywords:
  - "exportação SVG"
  - "exportação PNG"
  - "exportPng"
  - "exportSvg"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Exportação de imagens

O Mind Elixir Core oferece duas APIs para exportar imagens:

```ts
exportSvg: (
  this: MindElixir,
  noForeignObject?: boolean,
  injectCss?: string | undefined
) => Blob
exportPng: (
  this: MindElixir,
  noForeignObject?: boolean,
  injectCss?: string | undefined
) => Promise<Blob | null>
```

Se `noForeignObject` for `true`, a exportação SVG não usará foreignObject.

Nem todos os renderizadores SVG suportam foreignObject, então em cenários específicos em que o SVG exportado não funciona você pode desativá-lo. A contrapartida é que textos longos dentro dos nós não terão quebra de linha. (Como alternativa, você pode gerar PNG diretamente.)

`injectCss` existe para casos com `dangerouslySetInnerHTML`. Se precisar complementar CSS personalizado dentro dos nós, passe diretamente uma string CSS. O CSS será adicionado ao SVG gerado, garantindo que a renderização não fique muito diferente do navegador.

:::warning

Ao usar `dangerouslySetInnerHTML`, como ele permite injetar conteúdo arbitrário, pode haver situações que o algoritmo de exportação não consiga tratar. Nesses casos, podem surgir problemas inesperados ao exportar imagens.

:::

## Prática

Aqui está um exemplo de encapsulamento de uma função `download`. Nele, `style + katex` representa os estilos necessários de CSS personalizado e KaTeX (consulte [este link](https://github.com/SSShooter/mind-elixir-core/blob/87bb57ff060a62f4c4c66cc57689af29da780393/src/dev.ts#L102) para o conteúdo exato). Passando isso às funções de exportação, você garante os estilos corretos ao exportar SVG.

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
