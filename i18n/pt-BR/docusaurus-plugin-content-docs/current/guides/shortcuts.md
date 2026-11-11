---
title: "Atalhos de teclado"
description: "Referência completa dos atalhos de teclado do Mind Elixir Core: adicionar, editar e navegar por nós, recolher ramos, zoom e desfazer."
keywords:
  - "atalhos de teclado"
  - "teclas de atalho"
  - "produtividade"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Atalhos de teclado

Fazer operações nos nós pelo menu de contexto pode ser inconveniente e reduz bastante a eficiência no trabalho e no aprendizado. O Mind Elixir Core oferece atalhos de teclado mais eficientes, para você criar diagramas e navegar pelos seus mapas mentais com fluidez! Esses atalhos tornam a exploração de mapas mentais complexos muito mais cômoda e intuitiva.

| Atalho | Função |
| ------------------ | ------------------------- |
| Enter | Inserir nó irmão |
| Shift + Enter | Inserir nó irmão antes |
| Tab | Inserir nó filho |
| Ctrl + Enter | Inserir nó pai |
| F1 | Centralizar o mapa mental |
| F2 | Editar o nó atual |
| ↑ | Selecionar o nó anterior |
| ↓ | Selecionar o próximo nó |
| ← / → | Selecionar nós à esquerda/direita |
| PageUp / Alt + ↑ | Mover para cima |
| PageDown / Alt + ↓ | Mover para baixo |
| Ctrl + ↑ | Usar layout dos dois lados |
| Ctrl + ← | Usar layout à esquerda |
| Ctrl + → | Usar layout à direita |
| Ctrl + C | Copiar |
| Ctrl + X | Recortar |
| Ctrl + V | Colar |
| Delete / Backspace | Remover nó/seta/resumo |
| Ctrl + "+" | Aproximar o mapa mental |
| Ctrl + "-" | Afastar o mapa mental |
| Ctrl + 0 | Redefinir o zoom |
| Ctrl + K, Ctrl + 0 | Recolher todos os nós |
| Ctrl + K, Ctrl + = | Expandir todos os nós |
| Ctrl + K, Ctrl + 1-9 | Expandir até o nível N |

`↑` / `↓` cruzam os limites entre ramos: `ArrowDown` a partir do último filho e `ArrowUp` a partir do primeiro saltam para o ramo irmão mais próximo, chegando ao seu primeiro/último filho — ou ao próprio nó do ramo quando ele está recolhido.

Recolher e expandir podem ser desfeitos, então `Ctrl + Z` restaura o estado de recolhimento anterior. Os recolhimentos feitos no outliner e no mapa compartilham uma única linha do tempo de desfazer. Uma expansão silenciosa (`expandNode(node, { silent: true })`) pula a entrada no histórico. `refresh(data)` sai do modo de foco e emite um evento `refresh` quando os dados estão no lugar.