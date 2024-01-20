# 使用主题

默认主题配色来自 [Catppuccin Theme](https://github.com/catppuccin/catppuccin)，其中 `palette` 是根节点到主要节点的连线，决定整个分支的颜色，Mind Elixir 会循环使用这个数组的颜色。`cssVar` 是其他主要的颜色选项，可以覆盖原本 css 的变量。

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
```

要使用自定义主题，只需要定义自己的 `theme` 传入 `options` 即可。

:::info

完整配置可以参考[theme API 章节](../api/mind-elixir.theme.md)

:::
