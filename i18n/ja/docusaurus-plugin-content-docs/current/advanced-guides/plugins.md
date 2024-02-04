# プラグイン

ロジックは非常に単純で、`MindElixirInstance` に対して任意の処理を行うだけで、それをプラグインと呼ぶことができます。

例えば、[@mind-elixir/node-menu](https://github.com/SSShooter/node-menu/blob/bec096cbd52770d082fce57a82568b4fb25c19f8/nodeMenu.ts#L34C26-L34C30) を見てみましょう。ここでは、`mind.container.append(menuContainer)` を使用して、Mind Elixir コンテナにカスタム要素を挿入できます。また、[@mind-elixir/export-xmind](https://github.com/SSShooter/export-xmind/blob/6690e97e1b081dcaa8932d20b4f14ddd58fc678c/index.js#L65) を見てみましょう。ここでは、直接 Mind Elixir オブジェクトに新しいメソッドを追加できます `me.exportXmind = function(){ /* ... */}`。

## 現在のプラグイン

- [@mind-elixir/node-menu](https://github.com/ssshooter/node-menu)
- [@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo)
- [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind)
- [@mind-elixir/export-html](https://github.com/ssshooter/export-html)

あなたのプラグインの PR を歓迎します！

## ノードメニュー

[@mind-elixir/node-menu](https://github.com/ssshooter/node-menu) は、ノードのスタイルを変更するメニューを提供する比較的一般的なプラグインです。

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/NWJwBNV?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/NWJwBNV">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

[@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo) は Svelte を使用しており、画像選択機能を追加しています。

## 出力拡張

[@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind) および[@mind-elixir/export-html](https://github.com/ssshooter/export-html) プラグインは、Mind Elixir が Xmind および HTML 形式のファイルを出力できるようにし、出力ファイルの汎用性を大幅に向上させます。
