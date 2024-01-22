# 节点操作

如果使用了节点操作方法，请注意大版本更新时可能会造成接口改动。

原则上不推荐直接编程式操作节点，而是使用[快捷键](./shortcuts.md)和拖拽等方式直接输入，再通过订阅操作事件响应节点操作。

```js
mind.bus.addListener('operation', (operation) => {
  console.log(operation)
  // return {
  //   name: action name,
  //   obj: target object
  // }

  // name: [insertSibling|addChild|removeNode|beginEdit|finishEdit]
  // obj: target

  // name: moveNode
  // obj: {from:target1,to:target2}
})

mind.bus.addListener('selectNode', (node) => {
  console.log(node)
})

mind.bus.addListener('expandNode', (node) => {
  console.log('expandNode: ', node)
})
```

## 节点操作守卫

节点操作守卫就如其名，他能拦截某个节点操作的操作行为。

在配置中设定 `before` 对象，属性名为对应节点操作，值为一个返回布尔值（或由 Promise 包裹的布尔值）的函数。

```js
let mind = new MindElixir({
  // ...
  before: {
    insertSibling(el, obj) {
      console.log(el, obj)
      if (this.currentNode.nodeObj.parent.root) {
        return false
      }
      return true
    },
    async addChild(el, obj) {
      await sleep()
      if (this.currentNode.nodeObj.parent.root) {
        return false
      }
      return true
    },
  },
})
```

我们可以通过 `async` 操作守卫可以拦截需要异步获取信息才能决定是否通过的情况。