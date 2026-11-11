---
title: "TypeScript 지원"
sidebar_position: 3
description: "Mind Elixir Core는 자체 TypeScript 타입을 제공합니다. 추가 @types 패키지 없이 옵션, 노드 데이터, 인스턴스 메서드에 타입이 적용됩니다."
keywords:
  - "TypeScript"
  - "타입"
  - "타입 정의"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# TypeScript 지원

Mind Elixir Core는 TypeScript로 작성되었으며 추가 npm 패키지 설치가 필요하지 않습니다. TypeScript를 기본적으로 지원합니다.

```ts
import MindElixir, { MindElixirData, Options } from 'mind-elixir'

const options: Options = {
  el: '#map',
}
const data: MindElixirData = {
  nodeData: {
    id: 'root',
    topic: 'root',
    children: [
      {
        id: 'sub1',
        topic: 'sub1',
        children: [
          {
            id: 'sub2',
            topic: 'sub2',
          },
        ],
      },
    ],
  },
}
const mei = new MindElixir(options)
mei.init(data)
```

## 제네릭 타입

기본 내보내기는 제네릭 클래스이므로 사용자 정의 노드 메타데이터가 클래스 자체를 통해 전달됩니다:

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData
```

생성자를 변수에 담아 두는 경우(예: 팩토리)에는 `typeof MindElixir`로 타입을 지정하세요:

```ts
const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport`, `Theme` 모두 동일한 메타데이터 타입 매개변수를 받습니다. 나머지 API는 [v6 API 가이드](./migration-v6.md)를 참고하세요.