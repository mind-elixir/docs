# 使用主题

## 自定义主题

要使用自定义主题，只需要定义自己的 `theme` 传入 `options` 即可。其中 `palette` 是根节点到主要节点的连线，决定整个分支的颜色，Mind Elixir 会循环使用这个数组的颜色。`cssVar` 是其他主要的颜色选项，可以覆盖原本 css 的变量。

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

// 在初始化后更换主题
mind.changeTheme(theme)
```

:::info

完整配置可以参考[theme API 章节](../api/mind-elixir.theme.md)

:::

你可以在 Codepen 中试着调整 Mind Elixir 主题，下面的例子把主题的调色板设置为蓝色：

<iframe height="600" style="width: 100%;" scrolling="no" title="Mind Elixir 3.x" src="https://codepen.io/ssshooter/embed/oNVwZJw?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/oNVwZJw">
  Mind Elixir 3.x</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 默认主题

默认主题配色来自 [Catppuccin Theme](https://github.com/catppuccin/catppuccin)。

如果有需要使用回默认主题，或切换亮色与暗色主题时，我们可以通过 `MindElixir` 的静态属性获取默认主题。

```js
import MindElixir from 'mind-elixir'

MindElixir.THEME = THEME
MindElixir.DARK_THEME = DARK_THEME
```

Mind Elixir 在**实例化时**会根据系统当前配色偏好决定使用亮色主题或暗色主题。

:::info

Mind Elixir 本身没有监听系统配色偏好修改，换言之系统配色方案修改时 Mind Elixir 不会自动切换主题，相关功能请自行通过 `changeTheme` 实现。

:::
