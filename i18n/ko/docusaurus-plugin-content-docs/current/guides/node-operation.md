---
title: "노드 연산"
sidebar_position: 2
description: "Mind Elixir Core에서 노드 연산을 구독하고 가로채거나, 기본 제공 노드 API로 코드에서 노드를 조작하세요."
keywords:
  - "노드 연산"
  - "이벤트"
  - "bus"
  - "API"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# 노드 연산

이 섹션에서는 노드 연산을 구독하고 가로채는 방법과, 코드로 노드를 조작하는 방법을 다룹니다.

## 노드 연산 구독

연산 이벤트를 구독하면 마인드맵에서 사용자의 연산을 확인할 수 있습니다. DOM 이벤트를 듣는 것만큼 간단합니다:

```js
mind.bus.addListener('operation', (operation) => {
  console.log(operation)
  // { name: 'addChild', target: NodeObj }
  // { name: 'insertSibling', target: NodeObj, position: 'before' | 'after' }
  // { name: 'copyNodes', target: NodeObj[] }
  // { name: 'moveNodesIn', target: NodeObj[], destination: NodeObj }
})

mind.bus.addListener('selectNodes', (nodes) => {
  console.log(nodes)
})

// Folding is reported through the `operation` event:
mind.bus.addListener('operation', (op) => {
  if (op.name === 'expandNode' || op.name === 'collapseNode') {
    console.log('node: ', op.target)
    console.log('silent: ', op.silent)
  }
})
```

가장 자주 쓰는 이벤트는 모든 노드 연산을 아우르는 `operation` 이벤트입니다.

`operation`은 `name`을 기준으로 하는 판별 유니온입니다:

- `target`은 영향을 받은 노드로, 단일 연산에서는 `NodeObj` 하나, 일괄 연산(`copyNodes`, `removeNodes`, `moveNodes*`)에서는 `NodeObj[]`입니다.
- `destination`은 이동 대상이고, `insertSibling`의 `position`은 `'before' | 'after'`입니다.
- 접기와 펼치기는 `operation`에 `expandNode` / `collapseNode`로 전달됩니다. `op.silent`는 내부 조용한 펼치기와 `{ silent: true }` 호출에서 `true`이며, 실행 취소 기록을 만들지 않습니다.
- 노드 메서드는 배열을 받습니다: `copyNodes([node], to)`, `moveNodesIn` / `moveNodesBefore` / `moveNodesAfter(nodes, to)`.

전체 목록은 [v6 API 가이드](../getting-started/migration-v6.md)를 참고하세요.

## 노드 연산 가드

이름 그대로 노드 연산 가드는 특정 노드 연산의 동작을 가로챌 수 있습니다.

설정에서 `before` 객체를 지정합니다. 속성 이름은 노드 연산에 대응하고, 값은 불리언(또는 Promise로 감싼 불리언)을 반환하는 함수입니다.

```js
let mind = new MindElixir({
  // ...
  before: {
    insertSibling(type, el, node) {
      console.log(type, el, node)
      if (this.currentNode?.nodeObj.parent?.root) {
        return false
      }
      return true
    },
    async addChild(el, node) {
      await sleep()
      if (this.currentNode?.nodeObj.parent?.root) {
        return false
      }
      return true
    },
  },
})
```

연산 가드에 `async`를 쓰면 진행 여부를 판단하는 데 비동기 정보가 필요한 경우도 가로챌 수 있습니다.

## 코드로 노드 조작하기

Mind Elixir Core는 노드를 직접 조작할 수 있는 API를 제공합니다:

```ts
{
  insertSibling: (
    this: MindElixir,
    type: 'before' | 'after',
    el?: Topic,
    node?: NodeObj
  ) => Promise<void>
  insertParent: (this: MindElixir, el?: Topic, node?: NodeObj) => Promise<void>
  addChild: (this: MindElixir, el?: Topic, node?: NodeObj) => Promise<void>
  copyNodes: (this: MindElixir, tpcs: Topic[], to: Topic) => Promise<void>
  moveUpNode: (this: MindElixir, el?: Topic) => Promise<void>
  moveDownNode: (this: MindElixir, el?: Topic) => Promise<void>
  removeNodes: (this: MindElixir, tpcs: Topic[]) => Promise<void>
  moveNodesIn: (this: MindElixir, from: Topic[], to: Topic) => Promise<void>
  moveNodesBefore: (this: MindElixir, from: Topic[], to: Topic) => Promise<void>
  moveNodesAfter: (this: MindElixir, from: Topic[], to: Topic) => Promise<void>
  beginEdit: (this: MindElixir, el?: Topic) => Promise<void>
  setNodeTopic: (this: MindElixir, el: Topic, topic: string) => Promise<void>
}
```

예를 들어 `insertSibling`으로 id가 `d6e5f69edb6336c3`인 노드에 형제 노드를 추가하려면 다음과 같이 합니다:

```js
mind.insertSibling(MindElixir.E('d6e5f69edb6336c3'))
```

:::tip

`MindElixir.E`는 id로 노드의 DOM 객체를 얻는 메서드입니다. Mind Elixir Core의 많은 API가 DOM 객체 타입으로 `Topic`을 사용하며, `E` 함수로 구할 수 있습니다.

:::