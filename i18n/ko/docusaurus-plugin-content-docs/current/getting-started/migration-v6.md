---
title: "v6 API 가이드"
sidebar_position: 5
description: "Mind Elixir Core 6.0 API: DOM 셀렉터, 노드 연산, 연산 페이로드, TypeScript 제네릭, 버스 이벤트."
keywords:
  - "마이그레이션"
  - "v6"
  - "API"
  - "업그레이드"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# v6 API 가이드

Mind Elixir Core 6.0은 2026-11-02에 공개되었습니다. 이 페이지에는 DOM 셀렉터, 노드 연산, 연산 페이로드, TypeScript 타입, 버스 이벤트의 현재 API와 v6에서 추가된 기능을 모아 두었습니다. 문서 형식 자체는 변경되지 않았습니다.

## 1. DOM 셀렉터

마인드맵 내부 요소는 `me-*` 클래스를 가진 `<div>` 요소입니다. 항상 클래스 셀렉터를 사용하세요:

```css
.me-tpc { ... }
.me-main.lhs { ... }
.me-main.rhs { ... }
.me-main.down { ... }
```

```js
const root = map.querySelector('.me-root')
```

사용 가능한 클래스는 `.me-main`, `.me-wrapper`, `.me-parent`, `.me-children`, `.me-tpc`, `.me-epd`, `.me-nodes`, `.me-root`입니다. 방향 클래스는 `.me-main`에 있습니다.

:::tip

데이터에 있는 `id: 'me-root'` 같은 노드 id는 CSS 셀렉터가 아닙니다.

:::

가지 생성기 안에서 `querySelector`를 사용하는 방법은 [사용자 정의 가지 스타일](../advanced-guides/customize-branch-style.md)을 참고하세요.

## 2. 노드 복사와 이동

```js
mind.copyNodes([node], to)
mind.moveNodesIn(nodes, to)
mind.moveNodesBefore(nodes, to)
mind.moveNodesAfter(nodes, to)
mind.moveUpNode(el)
mind.moveDownNode(el)
```

모든 일괄 메서드는 `Topic` 요소 배열과 대상 `Topic`을 받습니다. 대응하는 연산 이름은 `copyNodes`, `moveNodesIn`, `moveNodesBefore`, `moveNodesAfter`입니다. 전체 시그니처 목록은 [노드 연산](../guides/node-operation.md)을 참고하세요.

## 3. 연산 페이로드

```js
mind.bus.addListener('operation', operation => {
  console.log(operation.name, operation.target)
  if (['moveNodesIn', 'moveNodesBefore', 'moveNodesAfter'].includes(operation.name)) {
    console.log(operation.destination)
  }
})
```

`operation`은 `name`을 기준으로 하는 판별 유니온입니다. 단일 대상 연산에서 `target`은 `NodeObj` 하나이고, 일괄 연산에서는 `NodeObj[]`입니다. `destination`은 이동 대상, `position`은 `insertSibling`에서 `'before' | 'after'`, `origin`은 `reshapeNode` / `finishEdit`의 이전 상태를 담습니다. 접기와 펼치기는 같은 이벤트에 `expandNode` / `collapseNode`로 전달됩니다.

## 4. TypeScript 제네릭

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData

const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport`, `Theme` 모두 동일한 메타데이터 타입 매개변수를 받습니다. [TypeScript 지원](./typescript-support.md)을 참고하세요.

## 5. 라이트 빌드

```js
import MindElixir from 'mind-elixir/lite'
// the built file is named MindElixirLite.js
```

## 6. 접기 / 펼치기 이벤트

```js
mind.bus.addListener('operation', op => {
  if (op.name === 'expandNode' || op.name === 'collapseNode') {
    console.log('node: ', op.target)
    console.log('silent: ', op.silent)
  }
})
```

접기는 문서 변경이며 `operation`으로 전달됩니다. `target`은 접힌 `NodeObj`이고, `silent`는 내부 조용한 펼치기와 `{ silent: true }` 호출에서 `true`이며 이때는 실행 취소 기록이 만들어지지 않습니다. `expandNode`와 `expandNodeAll`은 `{ silent: true }`를 받습니다.

## v6 기능

- **오른쪽에서 왼쪽 텍스트.** `Options`에 `rtl: true`를 전달하면 노드 주제, 편집기, 라벨, 컨텍스트 메뉴가 RTL로 바뀝니다(아랍어, 히브리어, 페르시아어, 우르두어). 가지 레이아웃 축은 영향을 받지 않습니다. `ar` 로케일은 `mind-elixir/i18n`에서 제공됩니다.
- **독립 진입점이 된 아웃라이너.** `import { Outliner } from 'mind-elixir/outliner'`와 `mind-elixir/outliner/style.css`를 사용합니다. 메인 진입점도 계속 재내보내기합니다. [아웃라이너](../advanced-guides/outliner.md)를 참고하세요.
- **증분 갱신.** `mind.diffRefresh(data)`는 차이만 적용하여 변경되지 않은 노드의 요소, 리스너, 포커스 상태를 유지합니다. [데이터 가져오기와 내보내기](../guides/data-export.md)를 참고하세요.
- **실행 취소 가능한 접기.** `Ctrl + Z`로 이전 접기 상태를 복원하며, 마인드맵과 아웃라이너는 하나의 실행 취소 타임라인을 공유합니다. `expandNode` / `expandNodeAll`에 `{ silent: true }`를 전달하면 기록을 남기지 않습니다.
- **가지 간 이동.** 마지막 자식에서 `ArrowDown`, 첫 자식에서 `ArrowUp`을 누르면 가장 가까운 형제 가지로 이동합니다. [단축키](../guides/shortcuts.md)를 참고하세요.
- **모든 곳에서 Markdown 렌더러.** `markdown` 옵션은 마인드맵과 아웃라이너 양쪽에서 주제를 렌더링합니다. [Markdown과 LaTeX](../advanced-guides/markdown-latex.md)를 참고하세요.
- **테마와 포커스.** 테마를 바꿀 때는 `changeTheme(data.theme)`을 명시적으로 호출하세요. `refresh(data)`는 포커스 모드를 해제하고 `refresh` 이벤트를 발생시킵니다. `focusNode` / `cancelFocus`는 실행 취소/다시 실행 스택을 비웁니다.
