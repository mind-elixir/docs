// One-off content pass: rebrand the library to "Mind Elixir Core" and add
// hand-written title/description/keywords frontmatter for SEO.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

const LOCALES = {
  en: 'docs',
  zh: path.join('i18n', 'zh-Hans', 'docusaurus-plugin-content-docs', 'current'),
  ja: path.join('i18n', 'ja', 'docusaurus-plugin-content-docs', 'current'),
  de: path.join('i18n', 'de', 'docusaurus-plugin-content-docs', 'current'),
  es: path.join('i18n', 'es', 'docusaurus-plugin-content-docs', 'current'),
  'pt-BR': path.join('i18n', 'pt-BR', 'docusaurus-plugin-content-docs', 'current'),
  ko: path.join('i18n', 'ko', 'docusaurus-plugin-content-docs', 'current'),
}

const BRAND_GENERIC = {
  en: 'JavaScript mind map',
  zh: 'JavaScript 思维导图',
  ja: 'JavaScript マインドマップ',
  de: 'JavaScript-Mindmap',
  es: 'mapa mental JavaScript',
  'pt-BR': 'mapa mental JavaScript',
  ko: 'JavaScript 마인드맵',
}

const META = {
  'getting-started/intro.md': {
    en: {
      description:
        'Mind Elixir Core is an open-source JavaScript mind map core: zero dependencies, 33 kB gzipped, framework agnostic, with plugins, SVG/PNG export and undo/redo.',
      keywords: ['mind map library', 'open source', 'zero dependencies'],
    },
    zh: {
      description:
        'Mind Elixir Core 是开源的 JavaScript 思维导图内核：零依赖、gzip 后仅 33 kB、不绑定前端框架，支持插件、SVG/PNG 导出与撤销重做。',
      keywords: ['思维导图内核', '开源', '零依赖'],
    },
    ja: {
      description:
        'Mind Elixir Core はオープンソースの JavaScript マインドマップコアです。依存ゼロ、gzip 後 33 kB、フレームワーク非依存で、プラグインや SVG/PNG 書き出し、元に戻す/やり直しに対応します。',
      keywords: ['マインドマップ ライブラリ', 'オープンソース', '依存なし'],
    },
    de: {
      description:
        'Mind Elixir Core ist ein Open-Source-JavaScript-Mindmap-Kern ohne Abhängigkeiten, 33 kB gzip-komprimiert, framework-unabhängig, mit Plugins, SVG/PNG-Export und Undo/Redo.',
      keywords: ['Mindmap-Bibliothek', 'Open Source', 'ohne Abhängigkeiten'],
    },
    es: {
      description:
        'Mind Elixir Core es un núcleo JavaScript de código abierto para mapas mentales: sin dependencias, 33 kB comprimidos con gzip, independiente de frameworks, con plugins, exportación SVG/PNG y deshacer/rehacer.',
      keywords: ['biblioteca de mapas mentales', 'código abierto', 'sin dependencias'],
    },
    'pt-BR': {
      description:
        'Mind Elixir Core é um núcleo JavaScript open source para mapas mentais: zero dependências, 33 kB após gzip, independente de frameworks, com plugins, exportação SVG/PNG e desfazer/refazer.',
      keywords: ['biblioteca de mapas mentais', 'open source', 'zero dependências'],
    },
    ko: {
      description:
        'Mind Elixir Core는 의존성 없는 오픈 소스 JavaScript 마인드맵 코어입니다. gzip 후 33 kB, 프레임워크 비종속, 플러그인·SVG/PNG 내보내기·실행 취소/다시 실행 지원.',
      keywords: ['마인드맵 라이브러리', '오픈 소스', '의존성 없음'],
    },
  },
  'getting-started/quick-start.mdx': {
    en: {
      description:
        'Install the mind-elixir package and render your first interactive mind map in under five minutes with Mind Elixir Core.',
      keywords: ['npm install', 'quick start', 'installation'],
    },
    zh: {
      description:
        '安装 mind-elixir 包，五分钟内用 Mind Elixir Core 渲染出第一张可交互的思维导图。',
      keywords: ['npm 安装', '快速开始', '入门'],
    },
    ja: {
      description:
        'mind-elixir パッケージをインストールし、5 分以内に Mind Elixir Core で最初のインタラクティブなマインドマップを描画します。',
      keywords: ['npm install', 'クイックスタート', '導入'],
    },
    de: {
      description:
        'Installiere das Paket mind-elixir und rendere in unter fünf Minuten deine erste interaktive Mindmap mit Mind Elixir Core.',
      keywords: ['npm install', 'Schnellstart', 'Installation'],
    },
    es: {
      description:
        'Instala el paquete mind-elixir y renderiza tu primer mapa mental interactivo en menos de cinco minutos con Mind Elixir Core.',
      keywords: ['npm install', 'inicio rápido', 'instalación'],
    },
    'pt-BR': {
      description:
        'Instale o pacote mind-elixir e renderize seu primeiro mapa mental interativo em menos de cinco minutos com o Mind Elixir Core.',
      keywords: ['npm install', 'início rápido', 'instalação'],
    },
    ko: {
      description:
        'mind-elixir 패키지를 설치하고 Mind Elixir Core로 5분 안에 첫 번째 인터랙티브 마인드맵을 그려 보세요.',
      keywords: ['npm install', '빠른 시작', '설치'],
    },
  },
  'getting-started/typescript-support.md': {
    en: {
      description:
        'Mind Elixir Core ships its own TypeScript types. No extra @types package needed — typed options, node data and instance methods out of the box.',
      keywords: ['TypeScript', 'types', 'type definitions'],
    },
    zh: {
      description:
        'Mind Elixir Core 自带 TypeScript 类型声明，无需安装额外的 @types 包，选项、节点数据与实例方法均有类型提示。',
      keywords: ['TypeScript', '类型声明', '类型提示'],
    },
    ja: {
      description:
        'Mind Elixir Core は TypeScript の型定義を同梱しており、追加の @types パッケージなしでオプションやノードデータ、インスタンスメソッドが型付けされます。',
      keywords: ['TypeScript', '型定義', '型'],
    },
    de: {
      description:
        'Mind Elixir Core liefert eigene TypeScript-Typen mit. Kein zusätzliches @types-Paket nötig – typisierte Optionen, Knotendaten und Instanzmethoden direkt einsatzbereit.',
      keywords: ['TypeScript', 'Typen', 'Typdefinitionen'],
    },
    es: {
      description:
        'Mind Elixir Core incluye sus propios tipos de TypeScript. No hace falta ningún paquete @types adicional: opciones, datos de nodos y métodos de instancia tipados desde el principio.',
      keywords: ['TypeScript', 'tipos', 'definiciones de tipos'],
    },
    'pt-BR': {
      description:
        'O Mind Elixir Core já traz seus próprios tipos TypeScript. Não é necessário nenhum pacote @types extra: opções, dados de nós e métodos de instância tipados de imediato.',
      keywords: ['TypeScript', 'tipos', 'definições de tipos'],
    },
    ko: {
      description:
        'Mind Elixir Core는 자체 TypeScript 타입을 제공합니다. 추가 @types 패키지 없이 옵션, 노드 데이터, 인스턴스 메서드에 타입이 적용됩니다.',
      keywords: ['TypeScript', '타입', '타입 정의'],
    },
  },
  'getting-started/playground.md': {
    en: {
      description:
        'Try Mind Elixir Core live in CodePen, CodeSandbox and StackBlitz, with vanilla JavaScript, React and Vue 3 starter templates.',
      keywords: ['CodePen', 'CodeSandbox', 'StackBlitz', 'examples'],
    },
    zh: {
      description:
        '在 CodePen、CodeSandbox 和 StackBlitz 中在线体验 Mind Elixir Core，提供原生 JavaScript、React 与 Vue 3 模板。',
      keywords: ['CodePen', 'CodeSandbox', 'StackBlitz', '在线示例'],
    },
    ja: {
      description:
        'CodePen、CodeSandbox、StackBlitz で Mind Elixir Core を試せます。Vanilla JavaScript、React、Vue 3 のテンプレートを用意しています。',
      keywords: ['CodePen', 'CodeSandbox', 'StackBlitz', 'サンプル'],
    },
    de: {
      description:
        'Probiere Mind Elixir Core live in CodePen, CodeSandbox und StackBlitz aus – mit Vorlagen für Vanilla JavaScript, React und Vue 3.',
      keywords: ['CodePen', 'CodeSandbox', 'StackBlitz', 'Beispiele'],
    },
    es: {
      description:
        'Prueba Mind Elixir Core en vivo en CodePen, CodeSandbox y StackBlitz, con plantillas para JavaScript puro, React y Vue 3.',
      keywords: ['CodePen', 'CodeSandbox', 'StackBlitz', 'ejemplos'],
    },
    'pt-BR': {
      description:
        'Experimente o Mind Elixir Core ao vivo no CodePen, CodeSandbox e StackBlitz, com modelos para JavaScript puro, React e Vue 3.',
      keywords: ['CodePen', 'CodeSandbox', 'StackBlitz', 'exemplos'],
    },
    ko: {
      description:
        'CodePen, CodeSandbox, StackBlitz에서 Mind Elixir Core를 바로 체험해 보세요. 순수 JavaScript, React, Vue 3 시작 템플릿 제공.',
      keywords: ['CodePen', 'CodeSandbox', 'StackBlitz', '예제'],
    },
  },
  'guides/data-export.md': {
    en: {
      description:
        'Import data on init or with refresh, and export mind maps as JavaScript objects, JSON strings or Markdown with Mind Elixir Core.',
      keywords: ['data export', 'JSON', 'Markdown', 'getData'],
    },
    zh: {
      description:
        'Mind Elixir Core 支持在初始化或调用 refresh 时导入数据，并可将思维导图导出为 JavaScript 对象、JSON 字符串或 Markdown。',
      keywords: ['数据导出', 'JSON', 'Markdown', 'getData'],
    },
    ja: {
      description:
        'Mind Elixir Core は初期化時または refresh 時にデータを読み込み、マインドマップを JavaScript オブジェクト、JSON 文字列、Markdown として書き出せます。',
      keywords: ['データ書き出し', 'JSON', 'Markdown', 'getData'],
    },
    de: {
      description:
        'Daten beim Initialisieren oder mit refresh importieren und Mindmaps mit Mind Elixir Core als JavaScript-Objekt oder JSON-Zeichenkette exportieren.',
      keywords: ['Datenexport', 'JSON', 'getDataString', 'getData'],
    },
    es: {
      description:
        'Importa datos al inicializar o con refresh, y exporta mapas mentales como objetos JavaScript o cadenas JSON con Mind Elixir Core.',
      keywords: ['exportación de datos', 'JSON', 'getDataString', 'getData'],
    },
    'pt-BR': {
      description:
        'Importe dados na inicialização ou com refresh e exporte mapas mentais como objetos JavaScript ou strings JSON com o Mind Elixir Core.',
      keywords: ['exportação de dados', 'JSON', 'getDataString', 'getData'],
    },
    ko: {
      description:
        '초기화 시점이나 refresh로 데이터를 가져오고, Mind Elixir Core 마인드맵을 JavaScript 객체 또는 JSON 문자열로 내보내세요.',
      keywords: ['데이터 내보내기', 'JSON', 'getDataString', 'getData'],
    },
  },
  'guides/node-data.md': {
    en: {
      description:
        'Reference for the NodeObj type in Mind Elixir Core: topic, id, style, tags, icons, hyperlinks, images, branch colours and more.',
      keywords: ['NodeObj', 'node data', 'type reference'],
    },
    zh: {
      description:
        'Mind Elixir Core 的 NodeObj 类型参考：topic、id、style、标签、图标、超链接、图片与分支颜色等字段说明。',
      keywords: ['NodeObj', '节点数据', '类型参考'],
    },
    ja: {
      description:
        'Mind Elixir Core の NodeObj 型リファレンス。topic、id、style、タグ、アイコン、ハイパーリンク、画像、ブランチカラーなどのフィールドを解説します。',
      keywords: ['NodeObj', 'ノードデータ', '型リファレンス'],
    },
    de: {
      description:
        'Referenz für den Typ NodeObj in Mind Elixir Core: topic, id, style, tags, Icons, Hyperlinks, Bilder, Zweigfarben und mehr.',
      keywords: ['NodeObj', 'Knotendaten', 'Typreferenz'],
    },
    es: {
      description:
        'Referencia del tipo NodeObj en Mind Elixir Core: topic, id, style, tags, iconos, hipervínculos, imágenes, colores de rama y más.',
      keywords: ['NodeObj', 'datos de nodos', 'referencia de tipos'],
    },
    'pt-BR': {
      description:
        'Referência do tipo NodeObj no Mind Elixir Core: topic, id, style, tags, ícones, hiperlinks, imagens, cores de ramo e mais.',
      keywords: ['NodeObj', 'dados dos nós', 'referência de tipos'],
    },
    ko: {
      description:
        'Mind Elixir Core의 NodeObj 타입 레퍼런스: topic, id, style, tags, 아이콘, 하이퍼링크, 이미지, 가지 색상 등.',
      keywords: ['NodeObj', '노드 데이터', '타입 레퍼런스'],
    },
  },
  'guides/node-operation.md': {
    en: {
      description:
        'Listen to and intercept node operations in Mind Elixir Core, or manipulate nodes programmatically with the built-in node APIs.',
      keywords: ['node operations', 'events', 'bus', 'API'],
    },
    zh: {
      description:
        '在 Mind Elixir Core 中监听与拦截节点操作，或通过内置节点 API 以编程方式操作节点。',
      keywords: ['节点操作', '事件', 'bus', 'API'],
    },
    ja: {
      description:
        'Mind Elixir Core でノード操作を購読・インターセプトする方法と、組み込み API によるプログラム的なノード操作を解説します。',
      keywords: ['ノード操作', 'イベント', 'bus', 'API'],
    },
    de: {
      description:
        'Knotenoperationen in Mind Elixir Core beobachten und abfangen oder Knoten programmatisch über die integrierten APIs bearbeiten.',
      keywords: ['Knotenoperationen', 'Ereignisse', 'Bus', 'API'],
    },
    es: {
      description:
        'Escucha e intercepta las operaciones con nodos en Mind Elixir Core, o manipula nodos mediante código con las APIs integradas.',
      keywords: ['operaciones con nodos', 'eventos', 'bus', 'API'],
    },
    'pt-BR': {
      description:
        'Escute e intercepte operações com nós no Mind Elixir Core, ou manipule nós programaticamente com as APIs integradas.',
      keywords: ['operações com nós', 'eventos', 'bus', 'API'],
    },
    ko: {
      description:
        'Mind Elixir Core에서 노드 연산을 구독하고 가로채거나, 기본 제공 노드 API로 코드에서 노드를 조작하세요.',
      keywords: ['노드 연산', '이벤트', 'bus', 'API'],
    },
  },
  'guides/arrow-data.mdx': {
    en: {
      description:
        'Add directional arrows between nodes in a Mind Elixir Core mind map, with configurable endpoints, labels and styles.',
      keywords: ['arrows', 'connections', 'node links'],
    },
    zh: {
      description:
        '在 Mind Elixir Core 思维导图中为节点之间添加带方向的箭头，可配置端点、标签与样式。',
      keywords: ['箭头', '连线', '节点关联'],
    },
    ja: {
      description:
        'Mind Elixir Core のマインドマップでノード間に方向付きの矢印を追加します。端点、ラベル、スタイルを設定できます。',
      keywords: ['矢印', 'コネクション', 'ノードリンク'],
    },
    de: {
      description:
        'Gerichtete Pfeile zwischen Knoten in einer Mind Elixir Core-Mindmap hinzufügen – mit konfigurierbaren Endpunkten, Beschriftungen und Stilen.',
      keywords: ['Pfeile', 'Verbindungen', 'Knotenverknüpfungen'],
    },
    es: {
      description:
        'Añade flechas direccionales entre nodos en un mapa mental de Mind Elixir Core, con extremos, etiquetas y estilos configurables.',
      keywords: ['flechas', 'conexiones', 'enlaces entre nodos'],
    },
    'pt-BR': {
      description:
        'Adicione setas direcionais entre nós em um mapa mental do Mind Elixir Core, com extremidades, rótulos e estilos configuráveis.',
      keywords: ['setas', 'conexões', 'ligações entre nós'],
    },
    ko: {
      description:
        'Mind Elixir Core 마인드맵의 노드 사이에 방향 화살표를 추가하고 시작점·끝점, 라벨, 스타일을 설정하세요.',
      keywords: ['화살표', '연결', '노드 링크'],
    },
  },
  'guides/summary-data.mdx': {
    en: {
      description:
        'Add summaries that group sibling nodes in a Mind Elixir Core mind map, with custom text and start/end anchors.',
      keywords: ['summary', 'summaries', 'grouping nodes'],
    },
    zh: {
      description:
        '在 Mind Elixir Core 思维导图中为同级节点添加摘要，支持自定义文本与起止锚点。',
      keywords: ['摘要', '归纳', '节点分组'],
    },
    ja: {
      description:
        'Mind Elixir Core のマインドマップで兄弟ノードをまとめるサマリーを追加します。テキストと開始/終了アンカーを指定できます。',
      keywords: ['サマリー', '要約', 'ノードのグループ化'],
    },
    de: {
      description:
        'Zusammenfassungen hinzufügen, die Geschwisterknoten in einer Mind Elixir Core-Mindmap gruppieren – mit eigenem Text und Start-/Endankern.',
      keywords: ['Zusammenfassung', 'Summaries', 'Knoten gruppieren'],
    },
    es: {
      description:
        'Añade resúmenes que agrupan nodos hermanos en un mapa mental de Mind Elixir Core, con texto propio y anclajes de inicio y fin.',
      keywords: ['resumen', 'summaries', 'agrupar nodos'],
    },
    'pt-BR': {
      description:
        'Adicione resumos que agrupam nós irmãos em um mapa mental do Mind Elixir Core, com texto próprio e âncoras de início e fim.',
      keywords: ['resumo', 'summaries', 'agrupar nós'],
    },
    ko: {
      description:
        'Mind Elixir Core 마인드맵에서 형제 노드를 묶는 요약을 추가하고 텍스트와 시작/끝 기준을 지정하세요.',
      keywords: ['요약', 'summaries', '노드 그룹화'],
    },
  },
  'guides/image-export.md': {
    en: {
      description:
        'Export a Mind Elixir Core mind map to SVG or PNG with the exportSvg and exportPng APIs, including optional CSS injection.',
      keywords: ['SVG export', 'PNG export', 'exportPng', 'exportSvg'],
    },
    zh: {
      description:
        '使用 exportSvg 与 exportPng API 将 Mind Elixir Core 思维导图导出为 SVG 或 PNG，并支持注入自定义 CSS。',
      keywords: ['SVG 导出', 'PNG 导出', 'exportPng', 'exportSvg'],
    },
    ja: {
      description:
        'exportSvg と exportPng API を使って Mind Elixir Core のマインドマップを SVG / PNG に書き出します。CSS の注入にも対応します。',
      keywords: ['SVG 書き出し', 'PNG 書き出し', 'exportPng', 'exportSvg'],
    },
    de: {
      description:
        'Eine Mind Elixir Core-Mindmap mit den APIs exportSvg und exportPng als SVG oder PNG ausgeben, optional mit eingefügtem CSS.',
      keywords: ['SVG-Export', 'PNG-Export', 'exportPng', 'exportSvg'],
    },
    es: {
      description:
        'Exporta un mapa mental de Mind Elixir Core a SVG o PNG con las APIs exportSvg y exportPng, incluida la inyección opcional de CSS.',
      keywords: ['exportación SVG', 'exportación PNG', 'exportPng', 'exportSvg'],
    },
    'pt-BR': {
      description:
        'Exporte um mapa mental do Mind Elixir Core como SVG ou PNG com as APIs exportSvg e exportPng, incluindo injeção opcional de CSS.',
      keywords: ['exportação SVG', 'exportação PNG', 'exportPng', 'exportSvg'],
    },
    ko: {
      description:
        'exportSvg와 exportPng API로 Mind Elixir Core 마인드맵을 SVG 또는 PNG로 내보내세요. CSS 주입도 지원합니다.',
      keywords: ['SVG 내보내기', 'PNG 내보내기', 'exportPng', 'exportSvg'],
    },
  },
  'guides/use-theme.md': {
    en: {
      description:
        'Create and apply custom themes in Mind Elixir Core: palette colours, CSS variables, built-in light and dark themes, and runtime theme switching.',
      keywords: ['themes', 'palette', 'dark mode', 'cssVar'],
    },
    zh: {
      description:
        '为 Mind Elixir Core 创建并应用自定义主题：调色板、CSS 变量、内置明暗主题以及运行时主题切换。',
      keywords: ['主题', '调色板', '深色模式', 'cssVar'],
    },
    ja: {
      description:
        'Mind Elixir Core でカスタムテーマを作成・適用します。パレット、CSS 変数、組み込みのライト/ダークテーマ、実行時のテーマ切り替えを解説します。',
      keywords: ['テーマ', 'パレット', 'ダークモード', 'cssVar'],
    },
    de: {
      description:
        'Eigene Themes in Mind Elixir Core erstellen und anwenden: Farbpalette, CSS-Variablen, eingebaute helle und dunkle Themes sowie Themewechsel zur Laufzeit.',
      keywords: ['Themes', 'Farbpalette', 'Dark Mode', 'cssVar'],
    },
    es: {
      description:
        'Crea y aplica temas personalizados en Mind Elixir Core: colores de la paleta, variables CSS, temas claro y oscuro integrados y cambio de tema en tiempo de ejecución.',
      keywords: ['temas', 'paleta', 'modo oscuro', 'cssVar'],
    },
    'pt-BR': {
      description:
        'Crie e aplique temas personalizados no Mind Elixir Core: cores da paleta, variáveis CSS, temas claro e escuro embutidos e troca de tema em tempo de execução.',
      keywords: ['temas', 'paleta', 'modo escuro', 'cssVar'],
    },
    ko: {
      description:
        'Mind Elixir Core에서 팔레트 색상, CSS 변수, 기본 밝은/어두운 테마, 런타임 테마 전환까지 사용자 정의 테마를 만들고 적용하세요.',
      keywords: ['테마', '팔레트', '다크 모드', 'cssVar'],
    },
  },
  'guides/shortcuts.md': {
    en: {
      description:
        'Complete keyboard shortcut reference for Mind Elixir Core: add, edit and navigate nodes, collapse branches, zoom and undo.',
      keywords: ['keyboard shortcuts', 'hotkeys', 'productivity'],
    },
    zh: {
      description:
        'Mind Elixir Core 完整快捷键速查：新增、编辑与导航节点，折叠分支，缩放以及撤销。',
      keywords: ['快捷键', '热键', '效率'],
    },
    ja: {
      description:
        'Mind Elixir Core のキーボードショートカット一覧。ノードの追加・編集・移動、ブランチの折りたたみ、ズーム、元に戻すを網羅します。',
      keywords: ['キーボードショートカット', 'ホットキー', '効率化'],
    },
    de: {
      description:
        'Vollständige Referenz der Tastenkürzel von Mind Elixir Core: Knoten hinzufügen, bearbeiten und navigieren, Zweige einklappen, zoomen und rückgängig machen.',
      keywords: ['Tastenkürzel', 'Hotkeys', 'Produktivität'],
    },
    es: {
      description:
        'Referencia completa de los atajos de teclado de Mind Elixir Core: añadir, editar y navegar por nodos, plegar ramas, zoom y deshacer.',
      keywords: ['atajos de teclado', 'teclas rápidas', 'productividad'],
    },
    'pt-BR': {
      description:
        'Referência completa dos atalhos de teclado do Mind Elixir Core: adicionar, editar e navegar por nós, recolher ramos, zoom e desfazer.',
      keywords: ['atalhos de teclado', 'teclas de atalho', 'produtividade'],
    },
    ko: {
      description:
        'Mind Elixir Core 단축키 전체 레퍼런스: 노드 추가·편집·이동, 가지 접기, 확대/축소, 실행 취소.',
      keywords: ['단축키', '핫키', '생산성'],
    },
  },
  'advanced-guides/customize-branch-style.md': {
    en: {
      description:
        'Customise main and sub branch lines in Mind Elixir Core with the generateMainBranch and generateSubBranch options.',
      keywords: ['branch style', 'generateMainBranch', 'generateSubBranch', 'SVG paths'],
    },
    zh: {
      description:
        '通过 generateMainBranch 与 generateSubBranch 选项自定义 Mind Elixir Core 的主分支与子分支线条样式。',
      keywords: ['分支样式', 'generateMainBranch', 'generateSubBranch', 'SVG 路径'],
    },
    ja: {
      description:
        'generateMainBranch と generateSubBranch オプションで Mind Elixir Core のメインブランチとサブブランチの線をカスタマイズします。',
      keywords: ['ブランチスタイル', 'generateMainBranch', 'generateSubBranch', 'SVG パス'],
    },
    de: {
      description:
        'Haupt- und Unterzweige in Mind Elixir Core mit den Optionen generateMainBranch und generateSubBranch anpassen.',
      keywords: ['Zweigstil', 'generateMainBranch', 'generateSubBranch', 'SVG-Pfade'],
    },
    es: {
      description:
        'Personaliza las líneas de las ramas principales y secundarias en Mind Elixir Core con las opciones generateMainBranch y generateSubBranch.',
      keywords: ['estilo de rama', 'generateMainBranch', 'generateSubBranch', 'rutas SVG'],
    },
    'pt-BR': {
      description:
        'Personalize as linhas dos ramos principais e secundários no Mind Elixir Core com as opções generateMainBranch e generateSubBranch.',
      keywords: ['estilo de ramo', 'generateMainBranch', 'generateSubBranch', 'caminhos SVG'],
    },
    ko: {
      description:
        'generateMainBranch와 generateSubBranch 옵션으로 Mind Elixir Core의 주 가지와 하위 가지 선을 원하는 대로 바꾸세요.',
      keywords: ['가지 스타일', 'generateMainBranch', 'generateSubBranch', 'SVG 경로'],
    },
  },
  'advanced-guides/plugins.md': {
    en: {
      description:
        'Extend Mind Elixir Core with plugins: node menus, XMind and HTML export, and custom methods on the MindElixir instance.',
      keywords: ['plugins', 'extensions', 'XMind export', 'node menu'],
    },
    zh: {
      description:
        '通过插件扩展 Mind Elixir Core：节点菜单、XMind 与 HTML 导出，以及为 MindElixir 实例添加自定义方法。',
      keywords: ['插件', '扩展', 'XMind 导出', '节点菜单'],
    },
    ja: {
      description:
        'プラグインで Mind Elixir Core を拡張します。ノードメニュー、XMind / HTML 書き出し、MindElixir インスタンスへのカスタムメソッド追加を解説します。',
      keywords: ['プラグイン', '拡張', 'XMind 書き出し', 'ノードメニュー'],
    },
    de: {
      description:
        'Mind Elixir Core mit Plugins erweitern: Knotenmenüs, XMind- und HTML-Export sowie eigene Methoden auf der MindElixir-Instanz.',
      keywords: ['Plugins', 'Erweiterungen', 'XMind-Export', 'Knotenmenü'],
    },
    es: {
      description:
        'Amplía Mind Elixir Core con plugins: menús de nodos, exportación a XMind y HTML, y métodos personalizados en la instancia de MindElixir.',
      keywords: ['plugins', 'extensiones', 'exportación XMind', 'menú de nodos'],
    },
    'pt-BR': {
      description:
        'Estenda o Mind Elixir Core com plugins: menus de nós, exportação XMind e HTML, e métodos personalizados na instância MindElixir.',
      keywords: ['plugins', 'extensões', 'exportação XMind', 'menu de nós'],
    },
    ko: {
      description:
        '노드 메뉴, XMind·HTML 내보내기, MindElixir 인스턴스에 메서드 추가 등 플러그인으로 Mind Elixir Core를 확장하세요.',
      keywords: ['플러그인', '확장', 'XMind 내보내기', '노드 메뉴'],
    },
  },
  'advanced-guides/markdown-latex.md': {
    en: {
      description:
        'Render Markdown and LaTeX inside Mind Elixir Core nodes by passing a custom markdown function such as marked or katex to the constructor.',
      keywords: ['Markdown', 'LaTeX', 'KaTeX', 'marked'],
    },
    zh: {
      description:
        '向构造函数传入自定义 markdown 函数（如 marked、katex），即可在 Mind Elixir Core 节点中渲染 Markdown 与 LaTeX。',
      keywords: ['Markdown', 'LaTeX', 'KaTeX', 'marked'],
    },
    ja: {
      description:
        'コンストラクタに marked や katex などの markdown 関数を渡すことで、Mind Elixir Core のノード内に Markdown と LaTeX を描画します。',
      keywords: ['Markdown', 'LaTeX', 'KaTeX', 'marked'],
    },
    de: {
      description:
        'Markdown und LaTeX innerhalb von Mind Elixir Core-Knoten rendern, indem du eine eigene markdown-Funktion wie marked oder katex an den Konstruktor übergibst.',
      keywords: ['Markdown', 'LaTeX', 'KaTeX', 'marked'],
    },
    es: {
      description:
        'Renderiza Markdown y LaTeX dentro de los nodos de Mind Elixir Core pasando una función markdown personalizada como marked o katex al constructor.',
      keywords: ['Markdown', 'LaTeX', 'KaTeX', 'marked'],
    },
    'pt-BR': {
      description:
        'Renderize Markdown e LaTeX dentro dos nós do Mind Elixir Core passando uma função markdown personalizada como marked ou katex ao construtor.',
      keywords: ['Markdown', 'LaTeX', 'KaTeX', 'marked'],
    },
    ko: {
      description:
        'marked나 katex 같은 사용자 정의 markdown 함수를 생성자에 전달해 Mind Elixir Core 노드 안에서 Markdown과 LaTeX를 렌더링하세요.',
      keywords: ['Markdown', 'LaTeX', 'KaTeX', 'marked'],
    },
  },
  'advanced-guides/dangerouslySetInnerHTML.md': {
    en: {
      description:
        'Render KaTeX, highlighted code and custom HTML inside Mind Elixir Core nodes with the dangerouslySetInnerHTML node property.',
      keywords: ['dangerouslySetInnerHTML', 'custom HTML', 'rich content'],
    },
    zh: {
      description:
        '使用 dangerouslySetInnerHTML 节点属性在 Mind Elixir Core 节点中渲染 KaTeX、高亮代码与自定义 HTML。',
      keywords: ['dangerouslySetInnerHTML', '自定义 HTML', '富文本'],
    },
    ja: {
      description:
        'dangerouslySetInnerHTML ノードプロパティを使って、Mind Elixir Core のノード内に KaTeX やハイライトされたコード、独自 HTML を描画します。',
      keywords: ['dangerouslySetInnerHTML', 'カスタム HTML', 'リッチコンテンツ'],
    },
    de: {
      description:
        'KaTeX, hervorgehobenen Code und eigenes HTML innerhalb von Mind Elixir Core-Knoten mit der Knoteneigenschaft dangerouslySetInnerHTML darstellen.',
      keywords: ['dangerouslySetInnerHTML', 'eigenes HTML', 'Rich Content'],
    },
    es: {
      description:
        'Renderiza KaTeX, código resaltado y HTML personalizado dentro de los nodos de Mind Elixir Core con la propiedad dangerouslySetInnerHTML.',
      keywords: ['dangerouslySetInnerHTML', 'HTML personalizado', 'contenido enriquecido'],
    },
    'pt-BR': {
      description:
        'Renderize KaTeX, código destacado e HTML personalizado dentro dos nós do Mind Elixir Core com a propriedade dangerouslySetInnerHTML.',
      keywords: ['dangerouslySetInnerHTML', 'HTML personalizado', 'conteúdo rico'],
    },
    ko: {
      description:
        'dangerouslySetInnerHTML 노드 속성으로 Mind Elixir Core 노드 안에 KaTeX, 구문 강조 코드, 사용자 정의 HTML을 렌더링하세요.',
      keywords: ['dangerouslySetInnerHTML', '사용자 정의 HTML', '리치 콘텐츠'],
    },
  },
  'advanced-guides/outliner.md': {
    en: {
      description:
        'Use the Outliner entry point to render a Mind Elixir document as an editable outline that shares data and undo history with the map.',
      keywords: ['outliner', 'outline', 'mind-elixir/outliner', 'undo'],
    },
    zh: {
      description:
        '使用 Outliner 独立入口，把 Mind Elixir 文档渲染成可编辑大纲，并与导图共享数据和撤销历史。',
      keywords: ['大纲', 'outliner', 'mind-elixir/outliner', '撤销'],
    },
    ja: {
      description:
        'Outliner 専用エントリーポイントを使い、Mind Elixir のドキュメントを編集可能なアウトラインとして表示し、データとアンドゥ履歴をマップと共有します。',
      keywords: ['アウトライナー', 'アウトライン', 'mind-elixir/outliner', 'アンドゥ'],
    },
    de: {
      description:
        'Mit dem Outliner-Einstiegspunkt ein Mind Elixir-Dokument als editierbare Gliederung darstellen, die Daten und Undo-Historie mit der Mindmap teilt.',
      keywords: ['Outliner', 'Gliederung', 'mind-elixir/outliner', 'Undo'],
    },
    es: {
      description:
        'Usa el punto de entrada Outliner para mostrar un documento de Mind Elixir como un esquema editable que comparte datos e historial de deshacer con el mapa.',
      keywords: ['outliner', 'esquema', 'mind-elixir/outliner', 'deshacer'],
    },
    'pt-BR': {
      description:
        'Use o ponto de entrada Outliner para exibir um documento do Mind Elixir como um esquema editável que compartilha dados e histórico de desfazer com o mapa.',
      keywords: ['outliner', 'esquema', 'mind-elixir/outliner', 'desfazer'],
    },
    ko: {
      description:
        'Outliner 진입점으로 Mind Elixir 문서를 편집 가능한 아웃라인으로 표시하고, 데이터와 실행 취소 기록을 마인드맵과 공유하세요.',
      keywords: ['아웃라이너', '아웃라인', 'mind-elixir/outliner', '실행 취소'],
    },
  },
  'getting-started/migration-v6.md': {
    en: {
      description:
        'The Mind Elixir Core 6.0 API: DOM selectors, node operations, operation payloads, TypeScript generics and bus events.',
      keywords: ['migration', 'v6', 'API', 'upgrade'],
    },
    zh: {
      description:
        'Mind Elixir Core 6.0 当前 API：DOM 选择器、节点操作、事件载荷、TypeScript 泛型与事件表。',
      keywords: ['迁移', 'v6', 'API', '升级'],
    },
    ja: {
      description:
        'Mind Elixir Core 6.0 の現在の API：DOM セレクター、ノード操作、イベントペイロード、TypeScript ジェネリクス、イベントマップ。',
      keywords: ['移行', 'v6', 'API', 'アップグレード'],
    },
    de: {
      description:
        'Die API von Mind Elixir Core 6.0: DOM-Selektoren, Knotenoperationen, Operations-Payloads, TypeScript-Generics und Bus-Ereignisse.',
      keywords: ['Migration', 'v6', 'API', 'Upgrade'],
    },
    es: {
      description:
        'La API de Mind Elixir Core 6.0: selectores del DOM, operaciones con nodos, payloads de operación, genéricos de TypeScript y eventos del bus.',
      keywords: ['migración', 'v6', 'API', 'actualización'],
    },
    'pt-BR': {
      description:
        'A API do Mind Elixir Core 6.0: seletores DOM, operações com nós, payloads de operação, generics TypeScript e eventos do bus.',
      keywords: ['migração', 'v6', 'API', 'atualização'],
    },
    ko: {
      description:
        'Mind Elixir Core 6.0 API: DOM 셀렉터, 노드 연산, 연산 페이로드, TypeScript 제네릭, 버스 이벤트.',
      keywords: ['마이그레이션', 'v6', 'API', '업그레이드'],
    },
  },
}

const RENAMES = [
  // "Mind Elixir 内核" / "Mind Elixirコア" reads as a duplicate once rebranded
  [/Mind [Ee]lixir\s*(?:内核|コア)/g, 'Mind Elixir Core'],
  // Keep the App / Desktop / Cloud product names untouched
  [/\bMind [Ee]lixir\b(?! (?:Desktop|Cloud|App|Core))/g, 'Mind Elixir Core'],
]

function rebrand(text) {
  return RENAMES.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), text)
}

function splitFrontMatter(raw) {
  // Docs may be checked out with CRLF (core.autocrlf=true). Normalise so the
  // frontmatter/body boundary is detected consistently on every platform.
  const text = raw.replace(/\r\n/g, '\n')
  if (!text.startsWith('---')) return { frontMatter: '', body: text }
  const end = text.indexOf('\n---', 3)
  if (end === -1) return { frontMatter: '', body: text }
  return {
    frontMatter: text.slice(3, end).replace(/^\n/, ''),
    body: text.slice(end + 4).replace(/^\n/, ''),
  }
}

function restoreEol(text, eol) {
  return eol === '\n' ? text : text.replace(/\n/g, eol)
}

function firstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : ''
}

function sidebarPosition(frontMatter) {
  const match = frontMatter.match(/^sidebar_position:\s*(.+)$/m)
  return match ? match[1].trim() : null
}

function quote(value) {
  return JSON.stringify(value)
}

function buildFrontMatter({ title, position, description, keywords }) {
  const lines = ['---', `title: ${quote(title)}`]
  if (position) lines.push(`sidebar_position: ${position}`)
  lines.push(`description: ${quote(description)}`)
  lines.push(`keywords:`)
  for (const keyword of keywords) lines.push(`  - ${quote(keyword)}`)
  lines.push('---', '')
  return lines.join('\n')
}

let docsChanged = 0

for (const [locale, dir] of Object.entries(LOCALES)) {
  for (const [relPath, byLocale] of Object.entries(META)) {
    const file = path.join(ROOT, dir, relPath)
    if (!fs.existsSync(file)) {
      console.warn('missing', file)
      continue
    }
    const raw = fs.readFileSync(file, 'utf8')
    const { frontMatter, body } = splitFrontMatter(raw)
    const rebrandedBody = rebrand(body)
    const title = firstHeading(rebrandedBody)
    const meta = byLocale[locale]
    if (!meta) continue

    const keywords = [
      ...meta.keywords,
      BRAND_GENERIC[locale],
      'Mind Elixir Core',
      'mind-elixir',
    ]

    const next =
      buildFrontMatter({
        title,
        position: sidebarPosition(rebrand(frontMatter)),
        description: meta.description,
        keywords: [...new Set(keywords)],
      }) + rebrandedBody

    // Compare on normalised newlines: a file that already matches META must
    // not be rewritten (and therefore must not have its line endings churned).
    if (next !== raw.replace(/\r\n/g, '\n')) {
      fs.writeFileSync(file, restoreEol(next, raw.includes('\r\n') ? '\r\n' : '\n'))
      docsChanged++
    }
  }
}

console.log(`Docs: updated ${docsChanged} files.`)

// Blog: rebrand prose, keep slugs, refresh title/description/keywords only.
const BLOG = [
  path.join(ROOT, 'blog', '2024-02-02-mind-elixir-4.mdx'),
  path.join(ROOT, 'blog', '2025-07-04-how-to-use-mind-elixir.md'),
  path.join(ROOT, 'i18n', 'zh-Hans', 'docusaurus-plugin-content-blog', '2024-02-02-mind-elixir-4.mdx'),
  path.join(ROOT, 'i18n', 'zh-Hans', 'docusaurus-plugin-content-blog', '2025-07-04-how-to-use-mind-elixir.md'),
  path.join(ROOT, 'i18n', 'ja', 'docusaurus-plugin-content-blog', '2024-02-02-mind-elixir-4.mdx'),
  path.join(ROOT, 'i18n', 'ja', 'docusaurus-plugin-content-blog', '2025-07-04-how-to-use-mind-elixir.md'),
  // The long v5 blog post is intentionally not translated into the new locales.
  path.join(ROOT, 'i18n', 'de', 'docusaurus-plugin-content-blog', '2024-02-02-mind-elixir-4.mdx'),
  path.join(ROOT, 'i18n', 'es', 'docusaurus-plugin-content-blog', '2024-02-02-mind-elixir-4.mdx'),
  path.join(ROOT, 'i18n', 'pt-BR', 'docusaurus-plugin-content-blog', '2024-02-02-mind-elixir-4.mdx'),
  path.join(ROOT, 'i18n', 'ko', 'docusaurus-plugin-content-blog', '2024-02-02-mind-elixir-4.mdx'),
]

for (const file of BLOG) {
  if (!fs.existsSync(file)) continue
  const raw = fs.readFileSync(file, 'utf8')
  const next = rebrand(raw.replace(/'Mind Elixir'/g, "'Mind Elixir Core'"))
  if (next !== raw) {
    fs.writeFileSync(file, next)
    console.log('rebranded', path.relative(ROOT, file))
  }
}
