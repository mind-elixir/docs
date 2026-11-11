---
title: "Benutzerdefinierte Zweigstile"
description: "Haupt- und Unterzweige in Mind Elixir Core mit den Optionen generateMainBranch und generateSubBranch anpassen."
keywords:
  - "Zweigstil"
  - "generateMainBranch"
  - "generateSubBranch"
  - "SVG-Pfade"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Benutzerdefinierte Zweigstile

Du kannst die Darstellung des Hauptzweigs (vom Wurzelknoten zum Hauptknoten) und der Unterzweige (vom Hauptknoten zu seinen Nachfahren) anpassen, indem du in den Einstellungen Konfigurationen für `generateMainBranch` und `generateSubBranch` übergibst.

Unten findest du Beispiele für `generateMainBranch` und `generateSubBranch`.

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

Der Eingabeparameter `direction` gibt an, ob der Knoten links (`'lhs'`) oder rechts (`'rhs'`) liegt. `containerHeight` ist die Höhe der Mindmap.

`pT`, `pL`, `pH` und `pW` stehen für oben, links, Höhe und Breite des übergeordneten Knotens; `cT, cL, cW, cH` sind die entsprechenden Werte des untergeordneten Knotens.

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

Der Parameter `isFirst` gibt an, ob es sich um die erste Zweigebene außerhalb des Hauptzweigs handelt. Manche Stile für diese erste Ebene erfordern eine gesonderte Behandlung – daher dieser Parameter. Alle anderen Parameter haben dieselbe Bedeutung wie ihre Entsprechungen in `generateMainBranch` und werden hier nicht erneut erläutert.

## Freies Experimentieren

Im folgenden Beispiel sind die Zweige mit abgerundeten Ecken versehen. Passe `generateMainBranch` und `generateSubBranch` nach Belieben weiter an, um die Kurven zu erhalten, die dir gefallen.

<iframe height="600" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/WNmZMmq?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/WNmZMmq">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
