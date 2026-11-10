---
title: "v6 API 指南"
sidebar_position: 5
description: "Mind Elixir Core 6.0 当前 API：DOM 选择器、节点操作、事件载荷、TypeScript 泛型与事件表。"
keywords:
  - "迁移"
  - "v6"
  - "API"
  - "升级"
  - "JavaScript 思维导图"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# v6 API 指南

Mind Elixir Core 6.0 于 2026-11-02 发布。本页汇总 DOM 选择器、节点操作、事件载荷、TypeScript 类型与事件表的当前写法，并列出 v6 新增能力。数据格式本身没有变化。

## 1. DOM 选择器

导图内部元素是带 `me-*` 类的 `<div>`，请统一使用类选择器：

```css
.me-tpc { ... }
.me-main.lhs { ... }
.me-main.rhs { ... }
.me-main.down { ... }
```

```js
const root = map.querySelector('.me-root')
```

可用的类有 `.me-main`、`.me-wrapper`、`.me-parent`、`.me-children`、`.me-tpc`、`.me-epd`、`.me-nodes` 和 `.me-root`，方向类挂在 `.me-main` 上。

:::tip

节点数据里的 `id: 'me-root'` 并不是 CSS 选择器。

:::

在分支生成函数里使用 `querySelector` 的示例见[自定义分支样式](../advanced-guides/customize-branch-style.md)。

## 2. 复制与移动节点

```js
mind.copyNodes([node], to)
mind.moveNodesIn(nodes, to)
mind.moveNodesBefore(nodes, to)
mind.moveNodesAfter(nodes, to)
mind.moveUpNode(el)
mind.moveDownNode(el)
```

批量方法的第一个参数是 `Topic` 数组，第二个参数是目标 `Topic`；对应的操作名称为 `copyNodes`、`moveNodesIn`、`moveNodesBefore`、`moveNodesAfter`。完整签名见[节点操作](../guides/node-operation.md)。

## 3. 操作事件载荷

```js
mind.bus.addListener('operation', operation => {
  console.log(operation.name, operation.target)
  if (['moveNodesIn', 'moveNodesBefore', 'moveNodesAfter'].includes(operation.name)) {
    console.log(operation.destination)
  }
})
```

`operation` 是按 `name` 区分的联合类型。单节点操作的 `target` 是一个 `NodeObj`，批量操作则是 `NodeObj[]`；`destination` 表示移动目标，`insertSibling` 使用 `position: 'before' | 'after'`，`reshapeNode` / `finishEdit` 通过 `origin` 携带变更前的状态。折叠与展开也在同一事件中以 `expandNode` / `collapseNode` 派发。

## 4. TypeScript 泛型

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData

const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`、`MindElixirData`、`NodeObj`、`NodeObjExport` 和 `Theme` 都接受同一个 metadata 类型参数，详见 [TypeScript 支持](./typescript-support.md)。

## 5. Lite 构建产物

```js
import MindElixir from 'mind-elixir/lite'
// 构建产物文件名为 MindElixirLite.js
```

## 6. 折叠 / 展开事件

```js
mind.bus.addListener('operation', op => {
  if (op.name === 'expandNode' || op.name === 'collapseNode') {
    console.log('node: ', op.target)
    console.log('silent: ', op.silent)
  }
})
```

折叠属于数据变更，通过 `operation` 事件派发。`target` 是被折叠的 `NodeObj`；内部静默展开或显式传入 `{ silent: true }` 时 `silent` 为 `true`，这类操作不会写入撤销栈。`expandNode` 与 `expandNodeAll` 都支持 `{ silent: true }`。

## v6 新增特性

- **从右向左排版。** 在 `Options` 中传入 `rtl: true`，可将节点文字、编辑器、标签和右键菜单切换为 RTL（阿拉伯语、希伯来语、波斯语、乌尔都语），分支布局方向不受影响。`ar` 语言包可从 `mind-elixir/i18n` 导入。
- **大纲独立入口。** `import { Outliner } from 'mind-elixir/outliner'` 配合 `mind-elixir/outliner/style.css`，主入口仍然导出它。详见[大纲视图](../advanced-guides/outliner.md)。
- **增量刷新。** `mind.diffRefresh(data)` 只应用差异，保留未变化节点的 DOM 元素、事件监听和焦点状态。详见[数据导入与导出](../guides/data-export.md)。
- **折叠可撤销。** `Ctrl + Z` 可恢复上一次折叠状态，导图与大纲共用同一条撤销记录；`expandNode` / `expandNodeAll` 支持 `{ silent: true }` 跳过历史记录。
- **方向键跨分支导航。** 在最后一个子节点按 `↓`、第一个子节点按 `↑` 会进入最近的相邻分支，详见[快捷键](../guides/shortcuts.md)。
- **统一的 Markdown 渲染。** `markdown` 选项同时作用于导图和大纲中的节点文字，详见 [Markdown 与 LaTeX](../advanced-guides/markdown-latex.md)。
- **主题与聚焦。** 切换主题请显式调用 `changeTheme(data.theme)`；`refresh(data)` 会退出聚焦模式并触发 `refresh` 事件；`focusNode` / `cancelFocus` 会清空撤销/重做栈。
