# Plugins

The logic is quite straightforward, just manipulate the `MindElixirInstance` in any way, and you can call it a plugin.

Taking [@mind-elixir/node-menu](https://github.com/SSShooter/node-menu/blob/bec096cbd52770d082fce57a82568b4fb25c19f8/nodeMenu.ts#L34C26-L34C30) as an example, you can insert custom elements into the Mind Elixir container by using `mind.container.append(menuContainer)`; in the case of [@mind-elixir/export-xmind](https://github.com/SSShooter/export-xmind/blob/6690e97e1b081dcaa8932d20b4f14ddd58fc678c/index.js#L65), you can directly add new methods to the Mind Elixir object like `me.exportXmind =  function(){ /* ... */}`.

## Existing Plugins

- [@mind-elixir/node-menu](https://github.com/ssshooter/node-menu)
- [@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo)
- [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind)
- [@mind-elixir/export-html](https://github.com/ssshooter/export-html)

Feel free to submit a PR for your own plugins!

## Node Menu

[@mind-elixir/node-menu](https://github.com/ssshooter/node-menu) is a commonly used plugin that provides a menu for modifying node styles.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/NWJwBNV?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/NWJwBNV">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

[@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo) is written in Svelte and includes an image selector.

## Output Extensions

[@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind) and [@mind-elixir/export-html](https://github.com/ssshooter/export-html) plugins enable Mind Elixir to output files in Xmind and HTML formats, significantly increasing the versatility of output files.
