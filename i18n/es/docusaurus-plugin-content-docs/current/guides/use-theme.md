---
title: "Uso de temas"
description: "Crea y aplica temas personalizados en Mind Elixir Core: colores de la paleta, variables CSS, temas claro y oscuro integrados y cambio de tema en tiempo de ejecución."
keywords:
  - "temas"
  - "paleta"
  - "modo oscuro"
  - "cssVar"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Uso de temas

## Tema personalizado

Para usar un tema personalizado, basta con definir tu `theme` y pasarlo en `options`. La `palette` determina los colores desde el nodo raíz hasta los nodos principales e influye en toda la rama de Mind Elixir Core. Esta lista de colores se usa de forma cíclica. `cssVar` incluye el resto de opciones de color principales y permite sobrescribir las variables CSS originales.

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

Para ver la configuración completa, consulta la [sección de la API de temas](../api/mind-elixir.theme).

:::

Puedes experimentar con el tema de Mind Elixir Core en Codepen. El siguiente ejemplo pone la paleta de colores del tema en azul:

<iframe height="600" style="width: 100%;" scrolling="no" title="Mind Elixir Core 3.x" src="https://codepen.io/ssshooter/embed/oNVwZJw?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/oNVwZJw">
  Mind Elixir Core 3.x</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Tema por defecto

El esquema de colores del tema por defecto está inspirado en el [tema Catppuccin](https://github.com/catppuccin/catppuccin).

Si necesitas volver al tema por defecto o cambiar entre los temas claro y oscuro, puedes acceder a los temas por defecto mediante las propiedades estáticas de `MindElixir`.

```js
import MindElixir from 'mind-elixir'

MindElixir.THEME = THEME
MindElixir.DARK_THEME = DARK_THEME
```

Mind Elixir Core decide si usa el tema claro o el oscuro en función de las preferencias de color del sistema durante la **instanciación**.

:::info

Mind Elixir Core no cambia de tema automáticamente cuando cambian las preferencias de color del sistema. Debes implementar esta función manualmente con `changeTheme`.

:::
