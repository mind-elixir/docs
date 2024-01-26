---
sidebar_position: 2
---

# 安装与使用

简单介绍 Mind Elixir 的安装与使用。

## 安装

```
npm i mind-elixir -S
```

## 使用

```js
import MindElixir from 'mind-elixir'

let options = {
  el: '#map', // or HTMLDivElement
}

let mind = new MindElixir(options)

// create new map data
const data = MindElixir.new('new topic')
mind.init(data)
```

其他设定可查阅[完整配置](../api/mind-elixir.options.md)

:::warning

因为 Mind Elixir 挂载时高度为容器高度的 100%，所以请务必设置容器高度，否则造成显示异常。

:::

```html
<div id="map"></div>
<style>
  #map {
    height: 500px;
    width: 100%;
  }
</style>
```

## 对思维导图的操作

## 数据导出与更新

用户对思维导图的操作后，可以调用 `getData` 方法获取最新数据。数据格式可见[数据导出](./data-export.md)。

```js
const data = mind.getData()
```

有需要使用整组新数据刷新当前思维导图时，可以使用 `refresh` 方法。

```js
mind.refresh(data)
```
