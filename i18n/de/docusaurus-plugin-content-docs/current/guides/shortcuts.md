---
title: "Tastenkürzel"
description: "Vollständige Referenz der Tastenkürzel von Mind Elixir Core: Knoten hinzufügen, bearbeiten und navigieren, Zweige einklappen, zoomen und rückgängig machen."
keywords:
  - "Tastenkürzel"
  - "Hotkeys"
  - "Produktivität"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---
# Tastenkürzel

Operationen über das Kontextmenü der rechten Maustaste sind umständlich und bremsen Arbeit und Lernen deutlich aus. Mind Elixir Core unterstützt effizientere Tastenkürzel, mit denen du Diagramme flüssig erstellen und durch deine Mindmaps navigieren kannst! Sie machen das Durchsuchen und Erkunden komplexer Mindmaps deutlich bequemer und intuitiver.

| Tastenkürzel | Funktion |
| ------------------ | ------------------------- |
| Enter | Geschwisterknoten einfügen |
| Shift + Enter | Geschwisterknoten davor einfügen |
| Tab | Untergeordneten Knoten einfügen |
| Ctrl + Enter | Übergeordneten Knoten einfügen |
| F1 | Mindmap zentrieren |
| F2 | Aktuellen Knoten bearbeiten |
| ↑ | Vorherigen Knoten auswählen |
| ↓ | Nächsten Knoten auswählen |
| ← / → | Knoten links/rechts auswählen |
| PageUp / Alt + ↑ | Nach oben verschieben |
| PageDown / Alt + ↓ | Nach unten verschieben |
| Ctrl + ↑ | Zweiseitiges Layout verwenden |
| Ctrl + ← | Linksseitiges Layout verwenden |
| Ctrl + → | Rechtsseitiges Layout verwenden |
| Ctrl + C | Kopieren |
| Ctrl + X | Ausschneiden |
| Ctrl + V | Einfügen |
| Delete / Backspace | Knoten/Pfeil/Zusammenfassung entfernen |
| Ctrl + "+" | Mindmap vergrößern |
| Ctrl + "-" | Mindmap verkleinern |
| Ctrl + 0 | Zoom zurücksetzen |
| Ctrl + K, Ctrl + 0 | Alle Knoten einklappen |
| Ctrl + K, Ctrl + = | Alle Knoten ausklappen |
| Ctrl + K, Ctrl + 1-9 | Bis Ebene N ausklappen |

`↑` / `↓` überschreiten Zweiggrenzen: `ArrowDown` vom letzten Kind und `ArrowUp` vom ersten Kind springen in den nächstgelegenen Geschwisterzweig und landen auf dessen erstem/letztem Kind – oder auf dem Zweigknoten selbst, wenn er eingeklappt ist.

Ein- und Ausklappen ist rückgängig machbar, `Ctrl + Z` stellt also den vorherigen Faltzustand wieder her. Faltvorgänge im Outliner und in der Mindmap teilen sich eine Undo-Timeline. Ein stilles Ausklappen (`expandNode(node, { silent: true })`) erzeugt keinen Historieneintrag. `refresh(data)` verlässt den Fokusmodus und sendet ein `refresh`-Ereignis, sobald die Daten stehen.