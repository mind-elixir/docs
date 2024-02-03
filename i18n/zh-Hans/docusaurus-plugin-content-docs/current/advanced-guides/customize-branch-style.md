# 自定义分支样式

可以在配置中传入 `generateMainBranch` 和 `generateSubBranch`，修改主分支（连接根节点到主节点的分支）和次分支（连接主节点与其后代的分支）的样式。

下面将分别给出 `generateMainBranch` 和 `generateSubBranch` 的例子。

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
  const root = this.map.querySelector('me-root')
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

输入参数中的 `direction` 代表节点位于左侧还是右侧，值为 `'lhs'|'rhs'`。`containerHeight` 为思维导图的高度。

`pT`、`pL`、`pH`、`pW` 分别代表父节点的 top、left、height、width 数值；`cT, cL, cW, cH` 同理，对应子节点的相应数值。

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

`isFirst` 参数代表是否为主分支之外的第一层分支，一些样式的第一层分支或许会有特殊的处理方法，因而添加此参数。其他参数的含义与 `generateMainBranch` 的对应参数一致因此不赘述。

## 自由尝试

以下例子中，分支都被设置为圆角，你可以继续自由调整 `generateMainBranch` 和 `generateSubBranch` 得到你最满意的曲线。

<iframe height="600" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/WNmZMmq?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/WNmZMmq">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
