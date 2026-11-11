---
title: "Plugins"
description: "Amplía Mind Elixir Core con plugins: menús de nodos, exportación a XMind y HTML, y métodos personalizados en la instancia de MindElixir."
keywords:
  - "plugins"
  - "extensiones"
  - "exportación XMind"
  - "menú de nodos"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Plugins

La lógica es muy sencilla: manipula la instancia de `MindElixir` como quieras y ya puedes llamarlo plugin.

Tomando [@mind-elixir/node-menu](https://github.com/SSShooter/node-menu/blob/bec096cbd52770d082fce57a82568b4fb25c19f8/nodeMenu.ts#L34C26-L34C30) como ejemplo, puedes insertar elementos personalizados en el contenedor de Mind Elixir Core con `mind.container.append(menuContainer)`; en el caso de [@mind-elixir/export-xmind](https://github.com/SSShooter/export-xmind/blob/6690e97e1b081dcaa8932d20b4f14ddd58fc678c/index.js#L65), puedes añadir directamente nuevos métodos al objeto de Mind Elixir Core, como `me.exportXmind =  function(){ /* ... */}`.

## Plugins existentes

- [@mind-elixir/node-menu](https://github.com/ssshooter/node-menu)
- [@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo)
- [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind)
- [@mind-elixir/export-html](https://github.com/ssshooter/export-html)

¡Envía un PR con tus propios plugins!

## Menú de nodos

[@mind-elixir/node-menu](https://github.com/ssshooter/node-menu) es un plugin muy utilizado que ofrece un menú para modificar los estilos de los nodos.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/NWJwBNV?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/NWJwBNV">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

[@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo) está escrito en Svelte e incluye un selector de imágenes.

## Extensiones de salida

Los plugins [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind) y [@mind-elixir/export-html](https://github.com/ssshooter/export-html) permiten a Mind Elixir Core generar archivos en formatos XMind y HTML, lo que aumenta mucho la versatilidad de los archivos de salida.
