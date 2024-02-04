# 插件

逻辑十分简单，仅仅是对 `MindElixirInstance` 进行任意处理，就可以称为一个插件。

以 [@mind-elixir/node-menu](https://github.com/SSShooter/node-menu/blob/bec096cbd52770d082fce57a82568b4fb25c19f8/nodeMenu.ts#L34C26-L34C30) 为例，你可以通过 `mind.container.append(menuContainer)` 向 Mind Elixir 容器插入自定义元素；以 [@mind-elixir/export-xmind](https://github.com/SSShooter/export-xmind/blob/6690e97e1b081dcaa8932d20b4f14ddd58fc678c/index.js#L65) 为例，你可以直接向 Mind Elixir 对象添加新的方法 `me.exportXmind =  function(){ /* ... */}`。

## 现有插件

- [@mind-elixir/node-menu](https://github.com/ssshooter/node-menu)
- [@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo)
- [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind)
- [@mind-elixir/export-html](https://github.com/ssshooter/export-html)

欢迎 PR 你的插件！

## 节点菜单

[@mind-elixir/node-menu](https://github.com/ssshooter/node-menu) 是一个比较常用的插件，它提供了一个修改节点样式的菜单。

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/NWJwBNV?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/NWJwBNV">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

[@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo) 使用 Svelte 编写，添加了图片选择器。

## 输出扩展

[@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind) 和 [@mind-elixir/export-html](https://github.com/ssshooter/export-html) 插件可以使 Mind Elixir 输出 Xmind 和 HTML 格式的文件，大大增加输出文件泛用性。
