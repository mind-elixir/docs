---
title: "Keyboard Shortcuts"
description: "Complete keyboard shortcut reference for Mind Elixir Core: add, edit and navigate nodes, collapse branches, zoom and undo."
keywords:
  - "keyboard shortcuts"
  - "hotkeys"
  - "productivity"
  - "JavaScript mind map"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Keyboard Shortcuts

Performing operations on nodes through the right-click menu can be inconvenient, significantly reducing work and learning efficiency. Mind Elixir Core supports more efficient keyboard shortcuts, allowing you to smoothly create diagrams and navigate through your mind maps with ease! These shortcuts make browsing and exploring complex mind maps much more convenient and intuitive.

| Shortcut           | Function                  |
| ------------------ | ------------------------- |
| Enter              | Insert sibling node       |
| Shift + Enter      | Insert sibling node before|
| Tab                | Insert child node         |
| Ctrl + Enter       | Insert parent node         |
| F1                 | Center mind map            |
| F2                 | Edit current node          |
| ↑                  | Select previous node       |
| ↓                  | Select next node           |
| ← / →              | Select nodes on the left/right|
| PageUp / Alt + ↑   | Move up                   |
| PageDown / Alt + ↓ | Move down                 |
| Ctrl + ↑           | Use two-sided layout      |
| Ctrl + ←           | Use left-sided layout      |
| Ctrl + →           | Use right-sided layout     |
| Ctrl + C           | Copy                      |
| Ctrl + X           | Cut                       |
| Ctrl + V           | Paste                     |
| Delete / Backspace | Remove node/arrow/summary |
| Ctrl + "+"         | Zoom in mind map          |
| Ctrl + "-"         | Zoom out mind map         |
| Ctrl + 0           | Reset zoom                |
| Ctrl + K, Ctrl + 0 | Collapse all nodes        |
| Ctrl + K, Ctrl + = | Expand all nodes          |
| Ctrl + K, Ctrl + 1-9 | Expand to level N       |

`↑` / `↓` cross branch boundaries: `ArrowDown` from the last child and `ArrowUp` from the first child step into the nearest sibling branch, landing on its first/last child — or on the branch node itself when it is collapsed.

Collapse / expand is undoable, so `Ctrl + Z` restores the previous fold state. Folds made in the outliner and on the map share one undo timeline. A silent expand (`expandNode(node, { silent: true })`) skips the history entry. `refresh(data)` leaves focus mode and emits a `refresh` event once the data is in place.