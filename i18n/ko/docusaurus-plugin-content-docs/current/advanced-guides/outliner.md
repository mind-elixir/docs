---
title: "아웃라이너"
description: "Outliner 진입점으로 Mind Elixir 문서를 편집 가능한 아웃라인으로 표시하고, 데이터와 실행 취소 기록을 마인드맵과 공유하세요."
keywords:
  - "아웃라이너"
  - "아웃라인"
  - "mind-elixir/outliner"
  - "실행 취소"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# 아웃라이너

아웃라이너는 독립 진입점으로 제공되며 `MindElixir` 인스턴스의 순수한 뷰입니다. `mei.nodeData`를 렌더링하고, 모든 편집을 마인드맵의 노드 연산을 통해 되돌려 보내며, 마인드맵의 실행 취소/다시 실행 기록을 공유합니다. 하나의 문서, 두 개의 뷰입니다.

## Import

```ts
import MindElixir from 'mind-elixir'
import { Outliner } from 'mind-elixir/outliner'
import 'mind-elixir/outliner/style.css'
```

마인드맵과 아웃라인이 같은 앱에 있다면 메인 진입점을 써도 됩니다. 해당 스타일시트에 아웃라인 규칙이 이미 포함되어 있습니다:

```ts
import MindElixir, { Outliner } from 'mind-elixir'
import 'mind-elixir/style.css'
```

애플리케이션마다 import 경로는 하나만 고르세요. 둘 다에서 가져오면 클래스 복사본이 두 개 생깁니다. 해롭지는 않지만 그렇게 할 이유가 없습니다.

## 아웃라인을 마인드맵에 연결

```ts
const mei = new MindElixir({
  el: '#map',
  allowUndo: true, // the outline reads mei.historyStack
  markdown: renderMarkdown,
})
await mei.init(data) // wait for init before creating the outline

const outliner = new Outliner({
  el: '#outline',
  mei,
  fileName: 'Outline',
  markdown: renderMarkdown,
})
```

`mei`가 데이터와 기록을 모두 제공하므로 추가로 연결할 것은 없습니다. `allowUndo: true`가 필요하고 `init()`이 완료되어야 합니다. 아웃라인은 공유 기록(구조 편집, 실행 취소/다시 실행, 접기/펼치기)과 마인드맵의 `operation` 이벤트(내부 조용한 연산)를 모두 구독해 틱당 한 번의 렌더링으로 합칩니다.

## Markdown과 KaTeX

`markdown` 옵션은 `Options.markdown`과 동일한 렌더러를 받습니다. 주제는 편집 중이 아닐 때 HTML로 렌더링되고 포커스를 받으면 원본 Markdown 소스로 돌아가므로 소스를 계속 편집할 수 있습니다. 두 뷰를 시각적으로 맞추려면 마인드맵과 아웃라인에 같은 렌더러를 사용하세요. [Markdown과 LaTeX](./markdown-latex.md)를 참고하세요.

## 실행 취소, 접기, 포커스

두 뷰가 `mei.historyStack`을 공유하므로 `Ctrl + Z`는 접기를 포함해 어느 쪽에서 한 편집이든 되돌립니다. 자식이 없는 노드를 접거나 기존 접기 상태를 다시 적용하는 경우 DOM과 기록 모두 건드리지 않습니다. `focusNode`와 `cancelFocus`는 실행 취소/다시 실행 스택을 비워 포커스 경계를 양방향 기록 경계로 만듭니다.

## 문서 모델

아웃라이너는 `MindElixir` 인스턴스 위의 뷰입니다. 옵션에 항상 `mei`를 전달하세요. 데이터는 `mei.nodeData`에 있고 모든 편집은 마인드맵의 노드 연산을 거치므로 마인드맵이 유일한 데이터 원본으로 남습니다. 사용 가능한 편집은 [노드 연산](../guides/node-operation.md)을 참고하세요.
