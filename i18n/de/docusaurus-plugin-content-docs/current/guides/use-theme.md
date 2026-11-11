---
title: "Themes verwenden"
description: "Eigene Themes in Mind Elixir Core erstellen und anwenden: Farbpalette, CSS-Variablen, eingebaute helle und dunkle Themes sowie Themewechsel zur Laufzeit."
keywords:
  - "Themes"
  - "Farbpalette"
  - "Dark Mode"
  - "cssVar"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Themes verwenden

## Benutzerdefiniertes Theme

Für ein benutzerdefiniertes Theme definierst du einfach dein `theme` und übergibst es an die `options`. Die `palette` bestimmt die Farben vom Wurzelknoten bis zu den Hauptknoten und beeinflusst damit den gesamten Zweig in Mind Elixir Core. Diese Farbliste wird zyklisch verwendet. `cssVar` enthält weitere wichtige Farboptionen, mit denen du die ursprünglichen CSS-Variablen überschreiben kannst.

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

Die vollständige Konfiguration findest du im [Theme-API-Abschnitt](../api/mind-elixir.theme).

:::

Du kannst das Theme von Mind Elixir Core in Codepen ausprobieren. Das folgende Beispiel setzt die Farbpalette des Themes auf Blau:

<iframe height="600" style="width: 100%;" scrolling="no" title="Mind Elixir Core 3.x" src="https://codepen.io/ssshooter/embed/oNVwZJw?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/oNVwZJw">
  Mind Elixir Core 3.x</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Standard-Theme

Das Farbschema des Standard-Themes ist vom [Catppuccin-Theme](https://github.com/catppuccin/catppuccin) inspiriert.

Wenn du zum Standard-Theme zurückkehren oder zwischen hellem und dunklem Theme wechseln möchtest, kannst du über die statischen Eigenschaften von `MindElixir` auf die Standard-Themes zugreifen.

```js
import MindElixir from 'mind-elixir'

MindElixir.THEME = THEME
MindElixir.DARK_THEME = DARK_THEME
```

Mind Elixir Core entscheidet bei der **Instanzierung** anhand der aktuellen System-Farbpräferenz, ob das helle oder das dunkle Theme verwendet wird.

:::info

Mind Elixir Core wechselt das Theme nicht automatisch, wenn sich die System-Farbpräferenz ändert. Diese Funktion musst du manuell mit `changeTheme` implementieren.

:::
