---
title: "Importação e exportação de dados"
sidebar_position: 1
description: "Importe dados na inicialização ou com refresh e exporte mapas mentais como objetos JavaScript ou strings JSON com o Mind Elixir Core."
keywords:
  - "exportação de dados"
  - "JSON"
  - "getDataString"
  - "getData"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Importação e exportação de dados

## Importação

O Mind Elixir Core oferece duas formas de importar dados: na inicialização e ao chamar o método `refresh`.

```js
let mind = new MindElixir(options)

mind.init(data) // initialization
mind.refresh(data) // refresh with new data
```

Quando `data` não é passado para `refresh`, o objeto de dados original é usado na atualização.

### Atualização incremental

`refresh(data)` reconstrói o mapa inteiro, sai do modo de foco e emite um evento `refresh` quando os novos dados estão no lugar. Se apenas alguns nós mudaram, `diffRefresh(data)` costuma ser a melhor escolha: aplica só a diferença, mantém os elementos DOM, os listeners e o estado de foco dos nós inalterados e recorre a um `refresh` completo quando a mudança não pode ser expressa de forma incremental.

```js
mind.diffRefresh(data) // patch only what changed
mind.refresh(data) // full rebuild
```

## Exportação

O Mind Elixir Core oferece dois formatos de exportação de dados: um objeto JavaScript e sua string JSON:

```js
// data export
const data = mind.getData() // JavaScript object, see src/example.js
mind.getDataString() // stringify object
```

Para saída em Markdown, converta você mesmo o objeto retornado por `getData()`.

Exemplo da saída de `getData`:

```js
const data = {
  nodeData: {
    id: 'd451a556d866ba7b',
    topic: 'new topic',
    root: true,
    children: [
      {
        topic: 'new node',
        id: 'd451a6f027c33b1f',
        direction: 0,
        children: [
          {
            topic: 'new node',
            id: 'd451a724b7c10970',
          },
          {
            topic: 'new node',
            id: 'd451a77ca7348eae',
          },
          {
            topic: 'new node',
            id: 'd451a78e1ec7181c',
          },
        ],
      },
    ],
  },
  arrows: [
    {
      id: 'd451a9149a1e3a15',
      label: 'Custom Link',
      from: 'd451a77ca7348eae',
      to: 'd451a78e1ec7181c',
      delta1: {
        x: -230,
        y: -9,
      },
      delta2: {
        x: -236,
        y: 14,
      },
    },
  ],
  summaries: [
    {
      id: 'd451a84c2e77cc2f',
      parent: 'd451a6f027c33b1f',
      start: 0,
      end: 0,
      text: 'summary',
    },
  ],
  direction: 2,
  theme: {
    name: 'Latte',
    palette: [
      '#4968a3',
      '#3b88c4',
      '#4fa3d4',
      '#2b5b84',
      '#367fa2',
      '#5e93b7',
      '#4a719c',
      '#28567d',
      '#214e6d',
      '#336699',
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
  },
}
```

As partes principais são:

- Dados dos nós `nodeData`, veja [Dados dos nós](./node-data.md)
- Dados de ligação entre nós `arrows`
- Dados de resumo de vários nós `summaries`
- Dados do tema `theme`, veja [Uso de temas](./use-theme.md)

:::info

Os dados exportados incluem o tema atual. `refresh(data)` não aplica `data.theme` — o tratamento do tema é separado do refresh. Chame `changeTheme(data.theme)` explicitamente quando precisar trocar de tema e remova o campo `theme` se quiser renderizar sempre com um único tema.

:::
