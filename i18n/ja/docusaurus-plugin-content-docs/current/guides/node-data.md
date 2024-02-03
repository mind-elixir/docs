# ノードデータ

```typescript
export type NodeObj = {
  topic: string // トピック内容
  id: Uid // ノードID（自動生成）
  style?: {
    // ノードのスタイル
    fontSize?: string
    color?: string
    background?: string
    fontWeight?: string
  }
  children?: NodeObj[] // 子ノード
  tags?: string[] // タグ
  icons?: string[] // アイコン
  hyperLink?: string // ハイパーリンク
  expanded?: boolean // 展開されているかどうか
  direction?: number // ノードの方向（メインノードのみ有効）
  root?: boolean // ルートノードかどうか
  image?: {
    // ノードに画像を追加する際は、幅と高さを指定する必要があります
    url: string // 画像のリンク
    width: number
    height: number
  }
  branchColor?: string // このブランチの色
  parent?: NodeObj // このノードの親ノードオブジェクト（プログラムによって自動生成）
  dangerouslySetInnerHTML?: string // HTMLを直接挿入
}
```

:::tip

`image` プロパティを使用する場合、画像の幅と高さは必須です。これは `new Image()` を使用して取得できます。詳細な方法は[このリンク](https://stackoverflow.com/questions/623172/how-to-get-the-image-size-height-width-using-javascript)を参照してください。

:::

## 個別のノードの更新

特定のノードを更新するには、`reshapeNode` を使用できます。前述の `E` 関数も使用でき、2 番目の引数には更新するノードのデータが含まれます：

```js
mind.reshapeNode(MindElixir.E('d6e5f69edb6336c3'), { style: { fontWeight } })
```
