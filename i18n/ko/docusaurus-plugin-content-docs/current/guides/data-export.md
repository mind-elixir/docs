---
title: "데이터 가져오기와 내보내기"
sidebar_position: 1
description: "초기화 시점이나 refresh로 데이터를 가져오고, Mind Elixir Core 마인드맵을 JavaScript 객체 또는 JSON 문자열로 내보내세요."
keywords:
  - "데이터 내보내기"
  - "JSON"
  - "getDataString"
  - "getData"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# 데이터 가져오기와 내보내기

## 가져오기

Mind Elixir Core는 초기화 시점과 `refresh` 메서드 호출 시, 두 가지 방법으로 데이터를 가져올 수 있습니다.

```js
let mind = new MindElixir(options)

mind.init(data) // initialization
mind.refresh(data) // refresh with new data
```

`refresh`에 `data`를 전달하지 않으면 원래 데이터 객체로 갱신합니다.

### 증분 갱신

`refresh(data)`는 마인드맵 전체를 다시 만들고 포커스 모드를 해제한 뒤, 새 데이터가 적용되면 `refresh` 이벤트를 한 번 발생시킵니다. 노드 몇 개만 바뀌었다면 보통 `diffRefresh(data)`가 더 좋습니다. 차이만 적용하여 변경되지 않은 노드의 DOM 요소, 이벤트 리스너, 포커스 상태를 유지하고, 증분으로 표현할 수 없는 변경은 전체 `refresh`로 폴백합니다.

```js
mind.diffRefresh(data) // patch only what changed
mind.refresh(data) // full rebuild
```

## 내보내기

Mind Elixir Core는 JavaScript 객체와 그 JSON 문자열, 두 가지 데이터 내보내기 형식을 제공합니다:

```js
// data export
const data = mind.getData() // JavaScript object, see src/example.js
mind.getDataString() // stringify object
```

Markdown 출력이 필요하면 `getData()`가 반환한 객체를 직접 변환하세요.

`getData` 출력 예시:

```js
const data = {
  nodeData: {
    id: 'd451a556d866ba7b',
    topic: 'new topic',
    root: true,
    children: [
      {
        topic: 'new node',
        id: 'd451a6f027c33b1f',
        direction: 0,
        children: [
          {
            topic: 'new node',
            id: 'd451a724b7c10970',
          },
          {
            topic: 'new node',
            id: 'd451a77ca7348eae',
          },
          {
            topic: 'new node',
            id: 'd451a78e1ec7181c',
          },
        ],
      },
    ],
  },
  arrows: [
    {
      id: 'd451a9149a1e3a15',
      label: 'Custom Link',
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
      text: 'summary',
    },
  ],
  direction: 2,
  theme: {
    name: 'Latte',
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

주요 항목은 다음과 같습니다:

- 노드 데이터 `nodeData`, [노드 데이터](./node-data.md) 참고
- 노드 연결 데이터 `arrows`
- 여러 노드 요약 데이터 `summaries`
- 테마 데이터 `theme`, [테마 사용](./use-theme.md) 참고

:::info

내보낸 데이터에는 현재 테마가 포함됩니다. `refresh(data)`는 `data.theme`을 적용하지 않으며, 테마 처리는 refresh와 분리되어 있습니다. 테마를 바꿔야 한다면 `changeTheme(data.theme)`을 명시적으로 호출하고, 항상 같은 테마로 렌더링하려면 `theme` 필드를 제거하세요.

:::
