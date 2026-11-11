---
title: "테마 사용"
description: "Mind Elixir Core에서 팔레트 색상, CSS 변수, 기본 밝은/어두운 테마, 런타임 테마 전환까지 사용자 정의 테마를 만들고 적용하세요."
keywords:
  - "테마"
  - "팔레트"
  - "다크 모드"
  - "cssVar"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# 테마 사용

## 사용자 정의 테마

사용자 정의 테마를 쓰려면 `theme`을 정의해 `options`에 전달하기만 하면 됩니다. `palette`는 루트 노드에서 주요 노드까지의 색을 결정하며 Mind Elixir Core의 가지 전체에 영향을 줍니다. 이 색 배열은 순환하며 사용됩니다. `cssVar`에는 그 밖의 주요 색 옵션이 담기며 기존 CSS 변수를 덮어쓸 수 있습니다.

```js
const theme = {
  name: 'Latte',
  palette: [
    '#dd7878',
    '#ea76cb',
    '#8839ef',
    '#e64553',
    '#fe640b',
    '#df8e1d',
    '#40a02b',
    '#209fb5',
    '#1e66f5',
    '#7287fd',
  ],
  cssVar: {
    '--main-color': '#444446',
    '--main-bgcolor': '#ffffff',
    '--color': '#777777',
    '--bgcolor': '#f6f6f6',
    '--panel-color': '#444446',
    '--panel-bgcolor': '#ffffff',
    '--panel-border-color': '#eaeaea',
  },
}

let options = {
  el: '#map', // or HTMLDivElement
  theme,
}

let mind = new MindElixir(options)

// Change the theme after initialization
mind.changeTheme(theme)
```

:::info

전체 설정은 [테마 API 섹션](../api/mind-elixir.theme.md)을 참고하세요.

:::

Codepen에서 Mind Elixir Core 테마를 직접 조정해 볼 수 있습니다. 아래 예제는 테마 색상 팔레트를 파란색으로 설정합니다:

<iframe height="600" style="width: 100%;" scrolling="no" title="Mind Elixir Core 3.x" src="https://codepen.io/ssshooter/embed/oNVwZJw?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/oNVwZJw">
  Mind Elixir Core 3.x</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 기본 테마

기본 테마 색상 구성은 [Catppuccin 테마](https://github.com/catppuccin/catppuccin)에서 영감을 받았습니다.

기본 테마로 돌아가거나 밝은/어두운 테마를 전환하려면 `MindElixir`의 정적 속성으로 기본 테마에 접근할 수 있습니다.

```js
import MindElixir from 'mind-elixir'

MindElixir.THEME = THEME
MindElixir.DARK_THEME = DARK_THEME
```

Mind Elixir Core는 **인스턴스 생성 시점**의 시스템 색상 환경 설정에 따라 밝은 테마 또는 어두운 테마를 선택합니다.

:::info

시스템 색상 환경 설정이 바뀌어도 Mind Elixir Core가 테마를 자동으로 전환하지는 않습니다. `changeTheme`으로 직접 구현해야 합니다.

:::
