---
title: "Guia da API v6"
sidebar_position: 5
description: "A API do Mind Elixir Core 6.0: seletores DOM, operações com nós, payloads de operação, generics TypeScript e eventos do bus."
keywords:
  - "migração"
  - "v6"
  - "API"
  - "atualização"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Guia da API v6

O Mind Elixir Core 6.0 foi lançado em 2026-11-02. Esta página reúne a API atual para seletores DOM, operações com nós, payloads de operação, tipos TypeScript e eventos do bus, além dos recursos adicionados na v6. O formato do documento permanece o mesmo.

## 1. Seletores DOM

Os elementos internos do mapa são elementos `<div>` com classes `me-*`. Use sempre seletores de classe:

```css
.me-tpc { ... }
.me-main.lhs { ... }
.me-main.rhs { ... }
.me-main.down { ... }
```

```js
const root = map.querySelector('.me-root')
```

As classes disponíveis são `.me-main`, `.me-wrapper`, `.me-parent`, `.me-children`, `.me-tpc`, `.me-epd`, `.me-nodes` e `.me-root`. As classes de direção ficam em `.me-main`.

:::tip

Um id de nó como `id: 'me-root'` nos seus dados não é um seletor CSS.

:::

Consulte [Estilos de ramo personalizados](../advanced-guides/customize-branch-style.md) para usar `querySelector` dentro de um gerador de ramos.

## 2. Copiar e mover nós

```js
mind.copyNodes([node], to)
mind.moveNodesIn(nodes, to)
mind.moveNodesBefore(nodes, to)
mind.moveNodesAfter(nodes, to)
mind.moveUpNode(el)
mind.moveDownNode(el)
```

Todo método em lote recebe um array de elementos `Topic` mais um `Topic` de destino. Os nomes de operação correspondentes são `copyNodes`, `moveNodesIn`, `moveNodesBefore` e `moveNodesAfter`. Consulte [Operações com nós](../guides/node-operation.md) para a lista completa de assinaturas.

## 3. Payloads de operação

```js
mind.bus.addListener('operation', operation => {
  console.log(operation.name, operation.target)
  if (['moveNodesIn', 'moveNodesBefore', 'moveNodesAfter'].includes(operation.name)) {
    console.log(operation.destination)
  }
})
```

`operation` é uma união discriminada por `name`. `target` é um único `NodeObj` em operações com um alvo e um `NodeObj[]` em operações em lote. `destination` traz o destino do movimento, `position` é `'before' | 'after'` para `insertSibling` e `origin` carrega o estado anterior para `reshapeNode` / `finishEdit`. Recolher e expandir chegam como `expandNode` / `collapseNode` no mesmo evento.

## 4. Generics do TypeScript

```ts
import MindElixir, { type NodeObj, type Options } from 'mind-elixir'

type Metadata = { owner?: string; due?: string }

const options: Options<Metadata> = { el: '#map' }
const mind = new MindElixir<Metadata>(options)
const root: NodeObj<Metadata> = mind.nodeData

const Ctor: typeof MindElixir = MindElixir
const anotherMind = new Ctor<Metadata>({ el: '#map' })
```

`Options`, `MindElixirData`, `NodeObj`, `NodeObjExport` e `Theme` aceitam o mesmo parâmetro de tipo para metadados. Consulte [Suporte a TypeScript](./typescript-support.md).

## 5. Build leve

```js
import MindElixir from 'mind-elixir/lite'
// the built file is named MindElixirLite.js
```

## 6. Eventos de recolher / expandir

```js
mind.bus.addListener('operation', op => {
  if (op.name === 'expandNode' || op.name === 'collapseNode') {
    console.log('node: ', op.target)
    console.log('silent: ', op.silent)
  }
})
```

Recolher é uma alteração no documento e chega em `operation`. `target` é o `NodeObj` recolhido; `silent` é `true` para expansões internas silenciosas e chamadas `{ silent: true }`, que não criam entrada no histórico. `expandNode` e `expandNodeAll` aceitam `{ silent: true }`.

## Recursos da v6

- **Texto da direita para a esquerda.** Passe `rtl: true` em `Options` para trocar tópicos, editor, rótulos e menu de contexto para RTL (árabe, hebraico, persa, urdu). O eixo de layout dos ramos não é afetado. O locale `ar` está disponível em `mind-elixir/i18n`.
- **Outliner como ponto de entrada próprio.** `import { Outliner } from 'mind-elixir/outliner'` mais `mind-elixir/outliner/style.css`. O ponto de entrada principal ainda o reexporta. Consulte [Outliner](../advanced-guides/outliner.md).
- **Atualização incremental.** `mind.diffRefresh(data)` aplica apenas a diferença, mantendo elementos, listeners e estado de foco dos nós inalterados. Consulte [Importação e exportação de dados](../guides/data-export.md).
- **Recolhimento desfazível.** `Ctrl + Z` restaura o estado de recolhimento anterior; o mapa e o outliner compartilham uma única linha do tempo de desfazer. `expandNode` / `expandNodeAll` aceitam `{ silent: true }` para pular a entrada no histórico.
- **Navegação entre ramos.** `ArrowDown` a partir do último filho e `ArrowUp` a partir do primeiro saltam para o ramo irmão mais próximo. Consulte [Atalhos de teclado](../guides/shortcuts.md).
- **Renderizador Markdown em todos os lugares.** A opção `markdown` renderiza tópicos tanto no mapa quanto no outliner. Consulte [Markdown e LaTeX](../advanced-guides/markdown-latex.md).
- **Tema e foco.** Chame `changeTheme(data.theme)` explicitamente para trocar de tema; `refresh(data)` sai do modo de foco e emite um evento `refresh`; `focusNode` / `cancelFocus` limpam a pilha de desfazer/refazer.
