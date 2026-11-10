---
title: "数据导入与导出"
sidebar_position: 1
description: "Mind Elixir Core 支持在初始化或调用 refresh 时导入数据，并可将思维导图导出为 JavaScript 对象或 JSON 字符串。"
keywords:
  - "数据导出"
  - "JSON"
  - "getDataString"
  - "getData"
  - "JavaScript 思维导图"
  - "Mind Elixir Core"
  - "mind-elixir"
---


# 数据导入与导出

## 导入

Mind Elixir Core 提供两种数据导入方式：初始化时传入、调用刷新方法时传入。

```js
let mind = new MindElixir(options)

mind.init(data) // 初始化
mind.refresh(data) // 使用新数据刷新
```

不向 `refresh` 传入 `data` 时会使用原来的数据对象进行更新。

### 增量刷新

`refresh(data)` 会整体重建导图、退出聚焦模式，并在数据就位后触发一次 `refresh` 事件。如果只有少量节点发生变化，通常更推荐 `diffRefresh(data)`：它只应用差异，保留未变化节点的 DOM 元素、事件监听和焦点状态；当变更无法用增量方式表达时会自动回退到完整的 `refresh`。

```js
mind.diffRefresh(data) // 只更新变化的部分
mind.refresh(data) // 整体重建
```

## 导出

Mind Elixir Core 提供两种数据输出格式：JavaScript 对象及其 JSON 字符串：

```js
// data export
const data = mind.getData() // javascript object, see src/example.js
mind.getDataString() // stringify object
```

如需 Markdown 输出，请基于 `getData()` 返回的对象自行转换。

`getData` 输出范例：

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

比较重要的部分是：

- 节点数据 `nodeData`，详见[节点数据](./node-data.md)
- 关联节点连线数据 `arrows`
- 多节点摘要数据 `summaries`
- 主题数据 `theme`，详见[使用主题](./use-theme.md)

:::info

输出的数据会默认包含当前主题。`refresh(data)` 不会自动应用 `data.theme`，主题处理与刷新相互独立：需要切换主题时请显式调用 `changeTheme(data.theme)`；如果希望始终用统一主题渲染，可以在得到数据后手动清除 `theme` 字段。

:::
