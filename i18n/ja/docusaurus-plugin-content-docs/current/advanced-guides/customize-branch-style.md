# カスタムブランチスタイル

`generateMainBranch` と `generateSubBranch` に `generateMainBranch` と `generateSubBranch` を設定して、メインブランチ（ルートノードとメインノードを接続するブランチ）とサブブランチ（メインノードとその子孫を接続するブランチ）のスタイルを変更できます。

以下に `generateMainBranch` と `generateSubBranch` の例を示します。

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

入力パラメータの `direction` はノードが左側にあるか右側にあるかを示し、値は `'lhs'|'rhs'` です。`containerHeight` はマインドマップの高さです。

`pT`、`pL`、`pH`、`pW` は親ノードの top、left、height、width の値をそれぞれ表し、`cT, cL, cW, cH` は同様に、対応する子ノードの対応する値です。

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
    // 距離が+-50の範囲内の場合、直線を描画
    return `M ${x1} ${y1} H ${xMiddle} V ${y2} H ${x2}`
  } else if (y2 >= y1) {
    // 子ボトムが親より低い場合
    return `M ${x1} ${y1} H ${xMiddle} V ${
      y2 - TURNPOINT_R
    } A ${TURNPOINT_R} ${TURNPOINT_R} 0 0 ${x1 > x2 ? 1 : 0} ${
      x1 > x2 ? xMiddle - TURNPOINT_R : xMiddle + TURNPOINT_R
    } ${y2} H ${x2}`
  } else {
    // 子ボトムが親より高い場合
    return `M ${x1} ${y1} H ${xMiddle} V ${
      y2 + TURNPOINT_R
    } A ${TURNPOINT_R} ${TURNPOINT_R} 0 0 ${x1 > x2 ? 0 : 1} ${
      x1 > x2 ? xMiddle - TURNPOINT_R : xMiddle + TURNPOINT_R
    } ${y2} H ${x2}`
  }
}
```

`isFirst` パラメータは、メインブランチ以外の最初のレベルのブランチかどうかを示し、いくつかのスタイルの最初のレベルのブランチには特別な処理方法があるかもしれないため、このパラメータが追加されています。他のパラメータの意味は `generateMainBranch` の対応するパラメータと同じですので、詳細は省略します。

## 自由に試す

以下の例では、すべてのブランチが角丸に設定されています。`generateMainBranch` と `generateSubBranch` を調整して、最も満足のいく曲線を得るために自由に調整できます。

<iframe height="600" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/WNmZMmq?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/WNmZMmq">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
