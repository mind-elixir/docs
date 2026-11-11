---
title: "Datenimport und -export"
sidebar_position: 1
description: "Daten beim Initialisieren oder mit refresh importieren und Mindmaps mit Mind Elixir Core als JavaScript-Objekt oder JSON-Zeichenkette exportieren."
keywords:
  - "Datenexport"
  - "JSON"
  - "getDataString"
  - "getData"
  - "JavaScript-Mindmap"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Datenimport und -export

## Import

Mind Elixir Core bietet zwei Möglichkeiten, Daten zu importieren: bei der Initialisierung und beim Aufruf der Methode `refresh`.

```js
let mind = new MindElixir(options)

mind.init(data) // initialization
mind.refresh(data) // refresh with new data
```

Wenn `data` nicht an `refresh` übergeben wird, wird das ursprüngliche Datenobjekt für die Aktualisierung verwendet.

### Inkrementelle Aktualisierung

`refresh(data)` baut die gesamte Mindmap neu auf, verlässt den Fokusmodus und sendet ein `refresh`-Ereignis, sobald die neuen Daten stehen. Haben sich nur wenige Knoten geändert, ist `diffRefresh(data)` meist die bessere Wahl: Es wendet nur die Differenz an, behält DOM-Elemente, Event-Listener und Fokuszustand unveränderter Knoten bei und fällt auf ein vollständiges `refresh` zurück, wenn die Änderung nicht inkrementell darstellbar ist.

```js
mind.diffRefresh(data) // patch only what changed
mind.refresh(data) // full rebuild
```

## Export

Mind Elixir Core bietet zwei Formate für den Datenexport: ein JavaScript-Objekt und dessen JSON-Zeichenkette:

```js
// data export
const data = mind.getData() // JavaScript object, see src/example.js
mind.getDataString() // stringify object
```

Für eine Markdown-Ausgabe wandelst du das von `getData()` zurückgegebene Objekt selbst um.

Beispiel für die Ausgabe von `getData`:

```js
const data = {
  nodeData: {
    id: 'd451a556d866ba7b',
    topic: 'new topic',
    root: true,
    children: [
      {
        topic: 'new node',
        id: 'd451a6f027c33b1f',
        direction: 0,
        children: [
          {
            topic: 'new node',
            id: 'd451a724b7c10970',
          },
          {
            topic: 'new node',
            id: 'd451a77ca7348eae',
          },
          {
            topic: 'new node',
            id: 'd451a78e1ec7181c',
          },
        ],
      },
    ],
  },
  arrows: [
    {
      id: 'd451a9149a1e3a15',
      label: 'Custom Link',
      from: 'd451a77ca7348eae',
      to: 'd451a78e1ec7181c',
      delta1: {
        x: -230,
        y: -9,
      },
      delta2: {
        x: -236,
        y: 14,
      },
    },
  ],
  summaries: [
    {
      id: 'd451a84c2e77cc2f',
      parent: 'd451a6f027c33b1f',
      start: 0,
      end: 0,
      text: 'summary',
    },
  ],
  direction: 2,
  theme: {
    name: 'Latte',
    palette: [
      '#4968a3',
      '#3b88c4',
      '#4fa3d4',
      '#2b5b84',
      '#367fa2',
      '#5e93b7',
      '#4a719c',
      '#28567d',
      '#214e6d',
      '#336699',
    ],
    cssVar: {
      '--main-color': '#444446',
      '--main-bgcolor': '#ffffff',
      '--color': '#777777',
      '--bgcolor': '#f6f6f6',
      '--panel-color': '#444446',
      '--panel-bgcolor': '#ffffff',
      '--panel-border-color': '#eaeaea',
    },
  },
}
```

Die wichtigsten Bestandteile:

- Knotendaten `nodeData`, siehe [Knotendaten](./node-data.md)
- Daten der Knotenverknüpfungen `arrows`
- Daten der Zusammenfassungen mehrerer Knoten `summaries`
- Themedaten `theme`, siehe [Themes verwenden](./use-theme.md)

:::info

Die exportierten Daten enthalten das aktuelle Theme. `refresh(data)` wendet `data.theme` nicht an – die Theme-Behandlung ist getrennt von `refresh`. Rufe `changeTheme(data.theme)` explizit auf, wenn du das Theme wechseln möchtest, und entferne das Feld `theme`, wenn du durchgängig mit einem einzigen Theme rendern willst.

:::
