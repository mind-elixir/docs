---
title: "Estilos de rama personalizados"
description: "Personaliza las líneas de las ramas principales y secundarias en Mind Elixir Core con las opciones generateMainBranch y generateSubBranch."
keywords:
  - "estilo de rama"
  - "generateMainBranch"
  - "generateSubBranch"
  - "rutas SVG"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Estilos de rama personalizados

Puedes modificar el estilo de la rama principal (la que une el nodo raíz con el nodo principal) y de las subramas (las que unen el nodo principal con sus descendientes) pasando la configuración de `generateMainBranch` y `generateSubBranch` en los ajustes.

A continuación tienes ejemplos de `generateMainBranch` y `generateSubBranch`.

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

El parámetro `direction` de entrada indica si el nodo está a la izquierda (`'lhs'`) o a la derecha (`'rhs'`). `containerHeight` es la altura del mapa mental.

`pT`, `pL`, `pH` y `pW` representan respectivamente la posición superior, la izquierda, la altura y la anchura del nodo padre; `cT, cL, cW, cH` son los valores correspondientes del nodo hijo.

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

El parámetro `isFirst` indica si se trata de la primera capa de ramas por fuera de la rama principal. Algunos estilos para esa primera capa pueden necesitar un tratamiento especial, de ahí este parámetro. Los demás parámetros tienen el mismo significado que sus equivalentes en `generateMainBranch`, así que no se repiten.

## Experimenta libremente

En el siguiente ejemplo las ramas tienen esquinas redondeadas. Sigue ajustando `generateMainBranch` y `generateSubBranch` hasta conseguir las curvas que prefieras.

<iframe height="600" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/WNmZMmq?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/WNmZMmq">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
