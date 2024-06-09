---
sidebar_position: 1
---

# Data Import and Export

## Import

Mind Elixir provides two ways to import data: when initializing and when calling the refresh method.

```js
let mind = new MindElixir(options)

mind.init(data) // initialization
mind.refresh(data) // refresh with new data
```

When `data` is not passed into `refresh`, the original data object will be used for updating.

## Export

Mind Elixir provides three data export formats: JavaScript objects, object strings, and markdown (deprecated, not recommended). Corresponding to the following three APIs:

```js
// data export
const data = mind.getData() // JavaScript object, see src/example.js
mind.getDataString() // stringify object
mind.getDataMd() // markdown
```

The `getData` output example:

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

Key parts to note are:

- Node data `nodeData`, see [Node Data](./node-data.md)
- Associated node connection data `arrows`
- Multi-node summary data `summaries`
- Theme data `theme`, see [Using Themes](./use-theme.md)

:::info

The exported data will default to include the current theme, and during rendering, it will prioritize using the theme from the data. If you need to render with a consistent theme, you can manually remove the `theme` field after obtaining the data.

:::
