---
title: "Estilos de ramo personalizados"
description: "Personalize as linhas dos ramos principais e secundários no Mind Elixir Core com as opções generateMainBranch e generateSubBranch."
keywords:
  - "estilo de ramo"
  - "generateMainBranch"
  - "generateSubBranch"
  - "caminhos SVG"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Estilos de ramo personalizados

Você pode modificar o estilo do ramo principal (que liga o nó raiz ao nó principal) e dos sub-ramos (que ligam o nó principal aos seus descendentes) passando configurações para `generateMainBranch` e `generateSubBranch` nos ajustes.

Abaixo estão exemplos de `generateMainBranch` e `generateSubBranch`.

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

O parâmetro de entrada `direction` indica se o nó está à esquerda (`'lhs'`) ou à direita (`'rhs'`). `containerHeight` é a altura do mapa mental.

`pT`, `pL`, `pH` e `pW` representam, respectivamente, o topo, a esquerda, a altura e a largura do nó pai; `cT, cL, cW, cH` são os valores correspondentes do nó filho.

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

O parâmetro `isFirst` indica se é a primeira camada de ramos fora do ramo principal. Alguns estilos para essa primeira camada podem exigir tratamento especial, daí este parâmetro. Os demais parâmetros têm o mesmo significado que seus equivalentes em `generateMainBranch`, por isso não são repetidos.

## Experimente livremente

No exemplo a seguir, os ramos têm cantos arredondados. Continue ajustando `generateMainBranch` e `generateSubBranch` até obter as curvas que você preferir.

<iframe height="600" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/WNmZMmq?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/WNmZMmq">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
