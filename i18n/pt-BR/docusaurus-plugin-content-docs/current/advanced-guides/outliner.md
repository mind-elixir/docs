---
title: "Outliner"
description: "Use o ponto de entrada Outliner para exibir um documento do Mind Elixir como um esquema editável que compartilha dados e histórico de desfazer com o mapa."
keywords:
  - "outliner"
  - "esquema"
  - "mind-elixir/outliner"
  - "desfazer"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Outliner

O outliner é distribuído como ponto de entrada próprio e é uma visão pura de uma instância de `MindElixir`. Ele renderiza `mei.nodeData`, envia cada edição de volta ao mapa pelas operações de nós do mapa e compartilha o histórico de desfazer/refazer dele. Um documento, duas visões.

## Importações

```ts
import MindElixir from 'mind-elixir'
import { Outliner } from 'mind-elixir/outliner'
import 'mind-elixir/outliner/style.css'
```

Quando o mapa e o esquema vivem no mesmo app, você pode usar o ponto de entrada principal — sua folha de estilos já contém as regras do esquema:

```ts
import MindElixir, { Outliner } from 'mind-elixir'
import 'mind-elixir/style.css'
```

Escolha apenas um caminho de importação por aplicação. Importar dos dois dá duas cópias da classe; isso é inofensivo, mas não há motivo para fazê-lo.

## Vincular um esquema a um mapa

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

`mei` fornece tanto os dados quanto o histórico, então nada mais precisa ser ligado. `allowUndo: true` é obrigatório e `init()` precisa ter sido resolvido. O esquema escuta tanto o histórico compartilhado (edições estruturais, desfazer/refazer, recolher/expandir) quanto o evento `operation` do mapa (operações internas silenciosas), combinando tudo em uma única renderização por tick.

## Markdown e KaTeX

A opção `markdown` recebe o mesmo renderizador de `Options.markdown`. Os tópicos são renderizados como HTML enquanto não estão em edição e voltam ao código Markdown bruto ao receber foco, para que a fonte continue editável. Use o mesmo renderizador no mapa e no esquema para manter as duas visões visualmente alinhadas. Veja [Markdown e LaTeX](./markdown-latex.md).

## Desfazer, recolhimento e foco

Como as duas visões compartilham `mei.historyStack`, `Ctrl + Z` desfaz edições feitas em qualquer uma delas, inclusive recolhimentos. Recolher um nó sem filhos ou reaplicar o estado de recolhimento existente não altera nem o DOM nem o histórico. `focusNode` e `cancelFocus` limpam a pilha de desfazer/refazer, tornando o limite de foco um limite de histórico nos dois sentidos.

## Modelo de documento

O outliner é uma visão sobre uma instância de `MindElixir`: passe sempre `mei` nas opções. Os dados ficam em `mei.nodeData` e toda edição passa pelas operações de nós do mapa, de modo que o mapa continua sendo a única fonte de verdade. As edições disponíveis estão em [Operações com nós](../guides/node-operation.md).
