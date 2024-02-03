---
sidebar_position: 1
---

# データのエクスポート

Mind Elixir は3つのデータ出力フォーマットを提供しています：JavaScript オブジェクト、オブジェクトの文字列、markdown（非推奨、お勧めしません）。それぞれ以下の3つのAPIに対応しています：

```js
// データのエクスポート
const data = mind.getData() // JavaScriptオブジェクト、src/example.jsを参照してください
mind.getDataString() // オブジェクトの文字列化
mind.getDataMd() // markdown
```

`getData` の出力例：

```js
const data = {
  nodeData: {
    id: 'd451a556d866ba7b',
    topic: '新しいトピック',
    root: true,
    children: [
      {
        topic: '新しいノード',
        id: 'd451a6f027c33b1f',
        direction: 0,
        children: [
          {
            topic: '新しいノード',
            id: 'd451a724b7c10970',
          },
          {
            topic: '新しいノード',
            id: 'd451a77ca7348eae',
          },
          {
            topic: '新しいノード',
            id: 'd451a78e1ec7181c',
          },
        ],
      },
    ],
  },
  arrows: [
    {
      id: 'd451a9149a1e3a15',
      label: 'カスタムリンク',
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
      text: '要約',
    },
  ],
  direction: 2,
  theme: {
    name: 'ラテ',
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

重要な部分は：

- ノードデータ `nodeData`、詳細は[ノードデータ](./node-data.md)を参照
- 関連ノードの接続データ `arrows`
- 複数のノードの要約データ `summaries`
- テーマデータ `theme`、詳細は[テーマの使用](./use-theme.md)を参照

:::info

出力されたデータにはデフォルトで現在のテーマが含まれ、レンダリング時にもデータの中のテーマが優先されます。一貫したテーマでレンダリングが必要な場合は、データを取得した後に `theme` フィールドを手動でクリアすることができます。

:::