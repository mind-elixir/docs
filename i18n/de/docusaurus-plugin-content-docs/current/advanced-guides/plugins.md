---
title: "Plugins"
description: "Mind Elixir Core mit Plugins erweitern: Knotenmenüs, XMind- und HTML-Export sowie eigene Methoden auf der MindElixir-Instanz."
keywords:
  - "Plugins"
  - "Erweiterungen"
  - "XMind-Export"
  - "Knotenmenü"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Plugins

Die Logik ist ganz einfach: Verändere die `MindElixir`-Instanz beliebig – und schon kannst du es ein Plugin nennen.

Am Beispiel von [@mind-elixir/node-menu](https://github.com/SSShooter/node-menu/blob/bec096cbd52770d082fce57a82568b4fb25c19f8/nodeMenu.ts#L34C26-L34C30) kannst du mit `mind.container.append(menuContainer)` eigene Elemente in den Container von Mind Elixir Core einfügen; bei [@mind-elixir/export-xmind](https://github.com/SSShooter/export-xmind/blob/6690e97e1b081dcaa8932d20b4f14ddd58fc678c/index.js#L65) kannst du dem Objekt direkt neue Methoden hinzufügen, etwa `me.exportXmind =  function(){ /* ... */}`.

## Vorhandene Plugins

- [@mind-elixir/node-menu](https://github.com/ssshooter/node-menu)
- [@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo)
- [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind)
- [@mind-elixir/export-html](https://github.com/ssshooter/export-html)

Reiche gerne einen PR für deine eigenen Plugins ein!

## Knotenmenü

[@mind-elixir/node-menu](https://github.com/ssshooter/node-menu) ist ein häufig verwendetes Plugin, das ein Menü zum Ändern von Knotenstilen bereitstellt.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/NWJwBNV?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/NWJwBNV">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

[@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo) ist in Svelte geschrieben und enthält eine Bildauswahl.

## Export-Erweiterungen

Die Plugins [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind) und [@mind-elixir/export-html](https://github.com/ssshooter/export-html) ermöglichen es Mind Elixir Core, Dateien im XMind- und HTML-Format auszugeben, und erhöhen die Vielseitigkeit der Ausgabedateien deutlich.
