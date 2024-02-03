# Theme Usage

## Custom Theme

To use a custom theme, simply define your `theme` and pass it into the `options`. The `palette` determines the colors from the root node to the main nodes, influencing the entire branch in Mind Elixir. This array of colors will be cyclically used. `cssVar` includes other major color options, allowing you to override the original CSS variables.

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

For a complete configuration, refer to the [theme API section](../api/mind-elixir.theme.md).

:::

You can experiment with adjusting the Mind Elixir theme in Codepen. The example below sets the theme's color palette to blue:

<iframe height="600" style="width: 100%;" scrolling="no" title="Mind Elixir 3.x" src="https://codepen.io/ssshooter/embed/oNVwZJw?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/oNVwZJw">
  Mind Elixir 3.x</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Default Theme

The default theme color scheme is inspired by the [Catppuccin Theme](https://github.com/catppuccin/catppuccin).

If you need to revert to the default theme or switch between light and dark themes, you can use the static properties of `MindElixir` to access the default themes.

```js
import MindElixir from 'mind-elixir'

MindElixir.THEME = THEME
MindElixir.DARK_THEME = DARK_THEME
```

Mind Elixir will determine whether to use the light or dark theme based on the system's current color preferences during **instantiation**.

:::info

Mind Elixir does not automatically switch themes when the system color preferences change. You need to implement this functionality manually using `changeTheme`.

:::
