---
title: "Atajos de teclado"
description: "Referencia completa de los atajos de teclado de Mind Elixir Core: añadir, editar y navegar por nodos, plegar ramas, zoom y deshacer."
keywords:
  - "atajos de teclado"
  - "teclas rápidas"
  - "productividad"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Atajos de teclado

Realizar operaciones con los nodos desde el menú contextual puede resultar incómodo y reduce notablemente la eficiencia al trabajar y aprender. Mind Elixir Core admite atajos de teclado más eficientes que te permiten crear diagramas y navegar por tus mapas mentales con fluidez. Estos atajos hacen que explorar mapas mentales complejos sea mucho más cómodo e intuitivo.

| Atajo | Función |
| ------------------ | ------------------------- |
| Enter | Insertar nodo hermano |
| Shift + Enter | Insertar nodo hermano antes |
| Tab | Insertar nodo hijo |
| Ctrl + Enter | Insertar nodo padre |
| F1 | Centrar el mapa mental |
| F2 | Editar el nodo actual |
| ↑ | Seleccionar el nodo anterior |
| ↓ | Seleccionar el nodo siguiente |
| ← / → | Seleccionar nodos a la izquierda/derecha |
| PageUp / Alt + ↑ | Mover hacia arriba |
| PageDown / Alt + ↓ | Mover hacia abajo |
| Ctrl + ↑ | Usar disposición a dos lados |
| Ctrl + ← | Usar disposición a la izquierda |
| Ctrl + → | Usar disposición a la derecha |
| Ctrl + C | Copiar |
| Ctrl + X | Cortar |
| Ctrl + V | Pegar |
| Delete / Backspace | Eliminar nodo/flecha/resumen |
| Ctrl + "+" | Acercar el mapa mental |
| Ctrl + "-" | Alejar el mapa mental |
| Ctrl + 0 | Restablecer el zoom |
| Ctrl + K, Ctrl + 0 | Plegar todos los nodos |
| Ctrl + K, Ctrl + = | Desplegar todos los nodos |
| Ctrl + K, Ctrl + 1-9 | Desplegar hasta el nivel N |

`↑` / `↓` cruzan los límites entre ramas: `ArrowDown` desde el último hijo y `ArrowUp` desde el primero saltan a la rama hermana más cercana y aterrizan en su primer/último hijo, o en el propio nodo de la rama si está plegada.

Plegar y desplegar se puede deshacer, así que `Ctrl + Z` restaura el estado de plegado anterior. Los plegados realizados en el outliner y en el mapa comparten una única línea de tiempo de deshacer. Un desplegado silencioso (`expandNode(node, { silent: true })`) omite la entrada en el historial. `refresh(data)` sale del modo enfoque y emite un evento `refresh` cuando los datos están listos.