---
title: "이미지 내보내기"
description: "exportSvg와 exportPng API로 Mind Elixir Core 마인드맵을 SVG 또는 PNG로 내보내세요. CSS 주입도 지원합니다."
keywords:
  - "SVG 내보내기"
  - "PNG 내보내기"
  - "exportPng"
  - "exportSvg"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# 이미지 내보내기

Mind Elixir Core는 이미지를 내보내는 두 가지 API를 제공합니다:

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

`noForeignObject`를 `true`로 설정하면 SVG 내보내기에서 foreignObject를 사용하지 않습니다.

모든 SVG 렌더러가 foreignObject를 지원하지는 않으므로, 내보낸 SVG를 쓸 수 없는 특정 상황에서는 foreignObject를 끌 수 있습니다. 단점은 노드 안의 긴 텍스트가 줄바꿈되지 않는다는 것입니다. (대신 PNG로 바로 출력할 수도 있습니다.)

`injectCss`는 `dangerouslySetInnerHTML`을 쓰는 경우를 위한 것입니다. 노드 안에 사용자 정의 CSS를 보태야 한다면 CSS 문자열을 그대로 전달하면 됩니다. 전달한 CSS는 생성된 SVG에 추가되어 브라우저와 렌더링 차이가 크지 않게 해 줍니다.

:::warning

`dangerouslySetInnerHTML`은 임의의 콘텐츠를 삽입할 수 있으므로 내보내기 알고리즘이 처리하지 못하는 경우가 생길 수 있습니다. 이때 이미지 내보내기에서 예상치 못한 문제가 발생할 수 있습니다.

:::

## 실전 예제

`download` 함수를 감싼 예제입니다. 여기서 `style + katex`는 사용자 정의 CSS와 KaTeX에 필요한 스타일을 뜻합니다(구체적인 내용은 [이 링크](https://github.com/SSShooter/mind-elixir-core/blob/87bb57ff060a62f4c4c66cc57689af29da780393/src/dev.ts#L102) 참고). 이를 내보내기 함수에 전달하면 SVG 내보내기 시 스타일이 올바르게 적용됩니다.

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
