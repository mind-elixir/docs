---
title: "플러그인"
description: "노드 메뉴, XMind·HTML 내보내기, MindElixir 인스턴스에 메서드 추가 등 플러그인으로 Mind Elixir Core를 확장하세요."
keywords:
  - "플러그인"
  - "확장"
  - "XMind 내보내기"
  - "노드 메뉴"
  - "JavaScript 마인드맵"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# 플러그인

로직은 아주 단순합니다. `MindElixir` 인스턴스를 원하는 대로 조작하면 그것이 곧 플러그인입니다.

예를 들어 [@mind-elixir/node-menu](https://github.com/SSShooter/node-menu/blob/bec096cbd52770d082fce57a82568b4fb25c19f8/nodeMenu.ts#L34C26-L34C30)는 `mind.container.append(menuContainer)`로 Mind Elixir Core 컨테이너에 사용자 정의 요소를 넣고, [@mind-elixir/export-xmind](https://github.com/SSShooter/export-xmind/blob/6690e97e1b081dcaa8932d20b4f14ddd58fc678c/index.js#L65)는 `me.exportXmind =  function(){ /* ... */}`처럼 Mind Elixir Core 객체에 새 메서드를 직접 추가합니다.

## 기존 플러그인

- [@mind-elixir/node-menu](https://github.com/ssshooter/node-menu)
- [@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo)
- [@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind)
- [@mind-elixir/export-html](https://github.com/ssshooter/export-html)

직접 만든 플러그인도 PR로 보내 주세요!

## 노드 메뉴

[@mind-elixir/node-menu](https://github.com/ssshooter/node-menu)는 노드 스타일을 바꾸는 메뉴를 제공하는 자주 쓰이는 플러그인입니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ssshooter/embed/NWJwBNV?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ssshooter/pen/NWJwBNV">
  Untitled</a> by ssshooter (<a href="https://codepen.io/ssshooter">@ssshooter</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

[@mind-elixir/node-menu-neo](https://github.com/ssshooter/node-menu-neo)는 Svelte로 작성되었으며 이미지 선택기를 포함합니다.

## 출력 확장

[@mind-elixir/export-xmind](https://github.com/ssshooter/export-xmind)와 [@mind-elixir/export-html](https://github.com/ssshooter/export-html) 플러그인은 Mind Elixir Core가 XMind, HTML 형식의 파일을 출력할 수 있게 해 출력 파일의 활용 범위를 크게 넓혀 줍니다.
