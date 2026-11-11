---
title: "사용자 정의 가지 스타일"
description: "generateMainBranch와 generateSubBranch 옵션으로 Mind Elixir Core의 주 가지와 하위 가지 선을 원하는 대로 바꾸세요."
keywords:
  - "가지 스타일"
  - "generateMainBranch"
  - "generateSubBranch"
  - "SVG 경로"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# 사용자 정의 가지 스타일

설정에 `generateMainBranch`와 `generateSubBranch` 설정을 전달하면 주 가지(루트 노드와 주요 노드를 잇는 선)와 하위 가지(주요 노드와 그 자손을 잇는 선)의 스타일을 바꿀 수 있습니다.

아래는 `generateMainBranch`와 `generateSubBranch` 예제입니다.

## generateMainBranch

```js
function generateMainBranch({
  pT,
  pL,
  pW,
  pH,
  cT,
  cL,
  cW,
  cH,
  direction,
  containerHeight,
}) {
  let x1 = pL + pW / 2
  const y1 = pT + pH / 2
  let x2
  if (direction === 'lhs') {
    x2 = cL + cW
  } else {
    x2 = cL
  }
  const y2 = cT + cH / 2
  const root = this.map.querySelector('.me-root')
  if (this.direction === MindElixir.SIDE) {
    if (direction === 'lhs') {
      x1 = x1 - root.offsetWidth / 8
    } else {
      x1 = x1 + root.offsetWidth / 8
    }
  }
  return `M ${x1} ${y1} V ${
    y2 > y1 ? y2 - 20 : y2 + 20
  } C ${x1} ${y2} ${x1} ${y2} ${x2 > x1 ? x1 + 20 : x1 - 20} ${y2} H ${x2}`
}
```

입력 매개변수 `direction`은 노드가 왼쪽(`'lhs'`)인지 오른쪽(`'rhs'`)인지를 나타냅니다. `containerHeight`는 마인드맵의 높이입니다.

`pT`, `pL`, `pH`, `pW`는 각각 부모 노드의 위쪽, 왼쪽, 높이, 너비 값이며 `cT, cL, cW, cH`는 자식 노드의 대응 값입니다.

## generateSubBranch

```js
function generateSubBranch({
  pT,
  pL,
  pW,
  pH,
  cT,
  cL,
  cW,
  cH,
  direction,
  isFirst,
}) {
  const GAP = 30
  const TURNPOINT_R = 8
  let y1
  if (isFirst) {
    y1 = pT + pH / 2
  } else {
    y1 = pT + pH
  }
  const y2 = cT + cH
  let x1 = 0
  let x2 = 0
  let xMiddle = 0
  if (direction === 'lhs') {
    x1 = pL + GAP
    x2 = cL
    xMiddle = cL + cW
  } else if (direction === 'rhs') {
    x1 = pL + pW - GAP
    x2 = cL + cW
    xMiddle = cL
  }

  if (y2 < y1 + 50 && y2 > y1 - 50) {
    // draw a straight line if the distance is between +-50
    return `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`
  } else if (y2 >= y1) {
    // child bottom lower than parent
    return `M ${x1} ${y1} H ${xMiddle} V ${
      y2 - TURNPOINT_R
    } A ${TURNPOINT_R} ${TURNPOINT_R} 0 0 ${x1 > x2 ? 1 : 0} ${
      x1 > x2 ? xMiddle - TURNPOINT_R : xMiddle + TURNPOINT_R
    } ${y2} H ${x2}`
  } else {
    // child bottom higher than parent
    return `M ${x1} ${y1} H ${xMiddle} V ${
      y2 + TURNPOINT_R
    } A ${TURNPOINT_R} ${TURNPOINT_R} 0 0 ${x1 > x2 ? 0 : 1} ${
      x1 > x2 ? xMiddle - TURNPOINT_R : xMiddle + TURNPOINT_R
    } ${y2} H ${x2}`
  }
}
```

`isFirst` 매개변수는 주 가지 바깥의 첫 번째 가지 층인지를 나타냅니다. 첫 층의 일부 스타일은 별도 처리가 필요할 수 있어 이 매개변수가 있습니다. 나머지 매개변수는 `generateMainBranch`의 대응 매개변수와 뜻이 같으므로 다시 설명하지 않습니다.

## 자유롭게 실험하기

아래 예제에서는 가지 모서리를 둥글게 처리했습니다. 원하는 곡선이 나올 때까지 `generateMainBranch`와 `generateSubBranch`를 계속 조정해 보세요.

<iframe height="600" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/WNmZMmq?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/WNmZMmq">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
