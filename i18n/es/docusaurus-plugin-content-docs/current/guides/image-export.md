---
title: "Exportación de imágenes"
description: "Exporta un mapa mental de Mind Elixir Core a SVG o PNG con las APIs exportSvg y exportPng, incluida la inyección opcional de CSS."
keywords:
  - "exportación SVG"
  - "exportación PNG"
  - "exportPng"
  - "exportSvg"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Exportación de imágenes

Mind Elixir Core ofrece dos APIs para exportar imágenes:

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

Si `noForeignObject` vale `true`, la exportación SVG no usará foreignObject.

No todos los renderizadores SVG admiten foreignObject, por lo que en situaciones concretas en las que el SVG exportado no sirve puedes desactivarlo. La contrapartida es que el texto largo dentro de los nodos no se ajustará a la línea. (Como alternativa, puedes exportar directamente en PNG.)

`injectCss` está pensado para los casos en que se usa `dangerouslySetInnerHTML`. Si necesitas añadir CSS personalizado dentro de los nodos, puedes pasar directamente una cadena CSS. El CSS se añadirá al SVG generado para que el resultado no se aleje demasiado del navegador.

:::warning

Al usar `dangerouslySetInnerHTML` se permite inyectar contenido arbitrario, por lo que puede haber situaciones que el algoritmo de exportación no pueda manejar. En esos casos pueden aparecer problemas inesperados al exportar imágenes.

:::

## Ejemplo práctico

Aquí tienes un ejemplo de cómo encapsular una función `download`. En él, `style + katex` representa los estilos necesarios de CSS personalizado y KaTeX (consulta [este enlace](https://github.com/SSShooter/mind-elixir-core/blob/87bb57ff060a62f4c4c66cc57689af29da780393/src/dev.ts#L102) para ver el contenido concreto). Pasándolo a las funciones de exportación te aseguras de que los estilos sean correctos al exportar SVG.

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
