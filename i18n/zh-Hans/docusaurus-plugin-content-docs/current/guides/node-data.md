# 节点数据

```typescript
export type NodeObj = {
  topic: string // 主题内容
  id: Uid // 节点 ID（自动生成）
  style?: {
    // 节点样式
    fontSize?: string
    color?: string
    background?: string
    fontWeight?: string
  }
  children?: NodeObj[] // 子节点
  tags?: string[] // 标签
  icons?: string[] // 标记
  hyperLink?: string // 超链接
  expanded?: boolean // 是否展开
  direction?: number // 节点方向（仅主节点生效）
  root?: boolean // 是否根节点
  image?: {
    // 添加图片到节点，添加图片时，必须填写宽高
    url: string // 图片链接
    width: number
    height: number
  }
  branchColor?: string // 此分支的颜色
  parent?: NodeObj // 此节点的父节点对象（程序自动生成）
  dangerouslySetInnerHTML?: string // 直接插入 html
}
```

:::tip

使用 `image` 属性时图片宽高为必填值，可以使用 `new Image()` 获取，详细方法参考[此链接](https://stackoverflow.com/questions/623172/how-to-get-the-image-size-height-width-using-javascript)。

:::

## 单个节点更新

可以使用 `reshapeNode` 更新特定节点，同样可以使用之前提到的 `E` 函数，第二个参数为需要更新的节点数据：

```js
mind.reshapeNode(MindElixir.E('d6e5f69edb6336c3'), { style: { fontWeight } })
```
