---
title: "Importación y exportación de datos"
sidebar_position: 1
description: "Importa datos al inicializar o con refresh, y exporta mapas mentales como objetos JavaScript o cadenas JSON con Mind Elixir Core."
keywords:
  - "exportación de datos"
  - "JSON"
  - "getDataString"
  - "getData"
  - "mapa mental JavaScript"
  - "Mind Elixir Core"
  - "mind-elixir"
---

# Importación y exportación de datos

## Importación

Mind Elixir Core ofrece dos formas de importar datos: al inicializar y al llamar al método `refresh`.

```js
let mind = new MindElixir(options)

mind.init(data) // initialization
mind.refresh(data) // refresh with new data
```

Si no se pasa `data` a `refresh`, se usará el objeto de datos original para la actualización.

### Actualización incremental

`refresh(data)` reconstruye todo el mapa, sale del modo enfoque y emite un evento `refresh` cuando los nuevos datos están listos. Si solo han cambiado unos pocos nodos, `diffRefresh(data)` suele ser mejor opción: aplica únicamente la diferencia, conserva los elementos del DOM, los listeners y el estado de foco de los nodos sin cambios, y recurre a un `refresh` completo cuando el cambio no se puede expresar de forma incremental.

```js
mind.diffRefresh(data) // patch only what changed
mind.refresh(data) // full rebuild
```

## Exportación

Mind Elixir Core ofrece dos formatos de exportación de datos: un objeto JavaScript y su cadena JSON:

```js
// data export
const data = mind.getData() // JavaScript object, see src/example.js
mind.getDataString() // stringify object
```

Para obtener Markdown, convierte tú mismo el objeto devuelto por `getData()`.

Ejemplo de la salida de `getData`:

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

Las partes clave son:

- Datos de nodos `nodeData`, consulta [Datos de nodos](./node-data.md)
- Datos de conexiones entre nodos `arrows`
- Datos de resúmenes de varios nodos `summaries`
- Datos del tema `theme`, consulta [Uso de temas](./use-theme.md)

:::info

Los datos exportados incluyen el tema actual. `refresh(data)` no aplica `data.theme`: la gestión del tema es independiente de `refresh`. Llama explícitamente a `changeTheme(data.theme)` cuando necesites cambiar de tema y elimina el campo `theme` si quieres renderizar siempre con un único tema.

:::
