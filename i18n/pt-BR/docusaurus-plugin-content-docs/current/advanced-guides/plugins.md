---
title: "Plugins"
description: "Estenda o Mind Elixir Core com plugins: menus de nós, exportação XMind e HTML, e métodos personalizados na instância MindElixir."
keywords:
  - "plugins"
  - "extensões"
  - "exportação XMind"
  - "menu de nós"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Plugins

A lógica é bem simples: manipule a instância de `MindElixir` como quiser e já pode chamar isso de plugin.

Tomando [@mind-elixir/node-menu](https://github.com/SSShooter/node-menu/blob/bec096cbd52770d082fce57a82568b4fb25c19f8/nodeMenu.ts#L34C26-L34C30) como exemplo, você pode inserir elementos personalizados no contêiner do Mind Elixir Core com `mind.container.append(menuContainer)`; no caso de [@mind-elixir/export-xmind](https://github.com/SSShooter/export-xmind/blob/6690e97e1b081dcaa8932d20b4f14ddd58fc678c/index.js#L65), pode adicionar novos métodos diretamente ao objeto do Mind Elixir Core, como `me.exportXmind =  function(){ /* ... */}`.

## Plugins existentes

- [@mind-elixir/node-menu](https://github.com/ssshooter/node-menu)
- [@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo)
- [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind)
- [@mind-elixir/export-html](https://github.com/ssshooter/export-html)

Fique à vontade para enviar um PR com seus próprios plugins!

## Menu de nós

[@mind-elixir/node-menu](https://github.com/ssshooter/node-menu) é um plugin muito usado que fornece um menu para alterar estilos dos nós.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/NWJwBNV?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/NWJwBNV">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

[@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo) é escrito em Svelte e inclui um seletor de imagens.

## Extensões de saída

Os plugins [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind) e [@mind-elixir/export-html](https://github.com/ssshooter/export-html) permitem que o Mind Elixir Core gere arquivos nos formatos XMind e HTML, aumentando bastante a versatilidade dos arquivos de saída.
