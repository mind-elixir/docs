---
title: "大纲视图"
description: "使用 Outliner 独立入口，把 Mind Elixir 文档渲染成可编辑大纲，并与导图共享数据和撤销历史。"
keywords:
  - "大纲"
  - "outliner"
  - "mind-elixir/outliner"
  - "撤销"
  - "JavaScript 思维导图"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# 大纲视图

大纲视图（Outliner）拥有独立入口，并且是 `MindElixir` 实例的纯视图：它渲染 `mei.nodeData`，所有编辑都通过导图的节点操作回写，并共用导图自身的撤销/重做记录。一份数据，两个视图。

## 引入方式

```ts
import MindElixir from 'mind-elixir'
import { Outliner } from 'mind-elixir/outliner'
import 'mind-elixir/outliner/style.css'
```

如果导图和大纲在同一个应用中，也可以直接使用主入口——它的样式表已经包含大纲所需样式：

```ts
import MindElixir, { Outliner } from 'mind-elixir'
import 'mind-elixir/style.css'
```

一个应用请固定使用其中一种引入路径。同时从两处引入会得到两份类副本，虽然不会出错，但没有必要。

## 绑定到导图实例

```ts
const mei = new MindElixir({
  el: '#map',
  allowUndo: true, // 大纲会读取 mei.historyStack
  markdown: renderMarkdown,
})
await mei.init(data) // 等 init 完成后再创建大纲

const outliner = new Outliner({
  el: '#outline',
  mei,
  fileName: '大纲',
  markdown: renderMarkdown,
})
```

`mei` 同时提供数据和历史记录，无需额外连线。`allowUndo: true` 是必需的，且必须等 `init()` 完成。大纲同时监听共享的历史记录（结构编辑、撤销/重做、折叠/展开）和导图的 `operation` 事件（静默的内部操作），并合并为每帧一次渲染。

## Markdown 与 KaTeX

`markdown` 选项与 `Options.markdown` 使用同一个渲染函数。节点在未编辑时以 HTML 渲染，获得焦点时会切回原始 Markdown 源码以便编辑。导图与大纲使用同一个渲染函数，可以让两个视图的显示保持一致。详见 [Markdown 与 LaTeX](./markdown-latex.md)。

## 撤销、折叠与聚焦

由于两个视图共用 `mei.historyStack`，在任意一侧的编辑（包括折叠）都可以用 `Ctrl + Z` 撤销。折叠无子节点的节点、或重复设置相同的折叠状态，既不会改动 DOM 也不会写入历史。`focusNode` 与 `cancelFocus` 会清空撤销/重做栈，因此聚焦边界同时也是历史边界。

## 文档模型

大纲视图是 `MindElixir` 实例之上的一层视图：请始终通过 `mei` 选项传入实例。数据来自 `mei.nodeData`，所有编辑都经由导图的节点操作回写，导图始终是唯一数据源。可用的编辑方式见[节点操作](../guides/node-operation.md)。
