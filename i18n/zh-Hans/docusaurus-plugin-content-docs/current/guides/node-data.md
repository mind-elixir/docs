# 节点数据

```typescript
export type NodeObj = {
  topic: string // 主题内同
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
