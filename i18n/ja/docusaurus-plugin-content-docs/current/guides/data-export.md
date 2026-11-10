---
title: "データのインポートとエクスポート"
sidebar_position: 1
description: "Mind Elixir Core は初期化時または refresh 時にデータを読み込み、マインドマップを JavaScript オブジェクトまたは JSON 文字列として書き出せます。"
keywords:
  - "データ書き出し"
  - "JSON"
  - "getDataString"
  - "getData"
  - "JavaScript マインドマップ"
  - "Mind Elixir Core"
  - "mind-elixir"
---


# データのインポートとエクスポート

## インポート

Mind Elixir Core は、初期化時にデータを渡すか、リフレッシュメソッドを呼び出すときにデータを渡す、という 2 つの方法でデータをインポートします。

```js
let mind = new MindElixir(options)

mind.init(data) // 初期化
mind.refresh(data) // 新しいデータでリフレッシュ
```

`refresh` に `data` が渡されない場合、元のデータオブジェクトが更新に使用されます。

### 差分リフレッシュ

`refresh(data)` はマップ全体を再構築し、フォーカスモードを解除して、データ反映後に `refresh` イベントを一度発火します。変更が少数のノードだけであれば、`diffRefresh(data)` の方が適しています。差分だけを適用するため、変更のないノードの DOM 要素・イベントリスナー・フォーカス状態が保持され、差分で表現できない変更の場合は自動的に完全な `refresh` にフォールバックします。

```js
mind.diffRefresh(data) // 変更差分のみ適用
mind.refresh(data) // 全体を再構築
```

## エクスポート

Mind Elixir Core は 2 つのデータ出力フォーマットを提供しています：JavaScript オブジェクトとその JSON 文字列です。

```js
// データのエクスポート
const data = mind.getData() // JavaScriptオブジェクト、src/example.jsを参照してください
mind.getDataString() // オブジェクトの文字列化
```

Markdown が必要な場合は、`getData()` が返すオブジェクトを独自に変換してください。

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

出力されたデータには現在のテーマが含まれます。`refresh(data)` は `data.theme` を自動適用しません（テーマ処理はリフレッシュから分離されています）。テーマを切り替えたい場合は `changeTheme(data.theme)` を明示的に呼び出してください。常に同じテーマで描画したい場合は、取得後に `theme` フィールドを削除します。

:::
