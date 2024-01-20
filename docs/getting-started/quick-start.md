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