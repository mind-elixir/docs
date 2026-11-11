---
title: "Uso de temas"
description: "Crie e aplique temas personalizados no Mind Elixir Core: cores da paleta, variáveis CSS, temas claro e escuro embutidos e troca de tema em tempo de execução."
keywords:
  - "temas"
  - "paleta"
  - "modo escuro"
  - "cssVar"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Uso de temas

## Tema personalizado

Para usar um tema personalizado, basta definir seu `theme` e passá-lo em `options`. A `palette` determina as cores do nó raiz até os nós principais, influenciando todo o ramo no Mind Elixir Core. Essa lista de cores é usada de forma cíclica. `cssVar` reúne as outras opções principais de cor e permite sobrescrever as variáveis CSS originais.

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

Para a configuração completa, consulte a [seção da API de temas](../api/mind-elixir.theme).

:::

Você pode experimentar o tema do Mind Elixir Core no Codepen. O exemplo abaixo define a paleta de cores do tema em azul:

<iframe height="600" style="width: 100%;" scrolling="no" title="Mind Elixir Core 3.x" src="https://codepen.io/ssshooter/embed/oNVwZJw?default-tab=js%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/oNVwZJw">
  Mind Elixir Core 3.x</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## Tema padrão

O esquema de cores do tema padrão é inspirado no [tema Catppuccin](https://github.com/catppuccin/catppuccin).

Se você precisa voltar ao tema padrão ou alternar entre os temas claro e escuro, use as propriedades estáticas de `MindElixir` para acessar os temas padrão.

```js
import MindElixir from 'mind-elixir'

MindElixir.THEME = THEME
MindElixir.DARK_THEME = DARK_THEME
```

O Mind Elixir Core decide entre o tema claro e o escuro com base nas preferências de cor do sistema durante a **instanciação**.

:::info

O Mind Elixir Core não troca de tema automaticamente quando as preferências de cor do sistema mudam. Você precisa implementar isso manualmente com `changeTheme`.

:::
