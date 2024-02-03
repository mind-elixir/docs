# テーマの使用

## カスタムテーマ

カスタムテーマを使用するには、独自の `theme` を定義し、それを `options` に渡すだけです。`palette` はルートノードから主要ノードへの接続線であり、Mind Elixir はこの配列の色をループして使用します。`cssVar` は他の主要な色のオプションであり、元の CSS 変数をオーバーライドできます。

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
  el: '#map', // または HTMLDivElement
  theme,
}

let mind = new MindElixir(options)

// 初期化後にテーマを変更
mind.changeTheme(theme)
```

:::info

完全な構成は[theme API セクション](../api/mind-elixir.theme.md)を参照してください。

:::

Codepen で Mind Elixir のテーマを調整する例を以下に示します。この例では、テーマの調色板を青色に設定しています：

<iframe height="600" style="width: 100%;" scrolling="no" title="Mind Elixir 3.x" src="https://codepen.io/ssshooter/embed/oNVwZJw?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/oNVwZJw">
  Mind Elixir 3.x</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## デフォルトのテーマ

デフォルトのテーマのカラーリングは [Catppuccin Theme](https://github.com/catppuccin/catppuccin) から取得しています。

デフォルトのテーマを使用する必要がある場合や、ライトモードとダークモードのテーマを切り替える必要がある場合、`MindElixir` の静的プロパティを使用してデフォルトのテーマを取得できます。

```js
import MindElixir from 'mind-elixir'

MindElixir.THEME = THEME
MindElixir.DARK_THEME = DARK_THEME
```

Mind Elixir は**インスタンス化時**に、システムの現在のカラープリファレンスに基づいてライトモードまたはダークモードのテーマを使用するかを決定します。

:::info

Mind Elixir 自体はシステムのカラープリファレンスの変更を監視しておらず、言い換えれば、システムのカラースキームが変更されたときに Mind Elixir は自動的にテーマを切り替えません。関連する機能は、`changeTheme`を使用して自分で実装してください。

:::
