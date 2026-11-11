import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import type { ReactNode } from 'react'

import styles from './index.module.css'
import MindElixirShowcase from '../components/MindElixirShowcase'

type Card = { title: string; body: string }
type Product = { name: string; body: string; href: string; cta: string }
type Guide = { title: string; body: string; href: string }

type Content = {
  title: string
  description: string
  eyebrow: string
  h1: string
  lede: string
  ctaStart: string
  ctaApi: string
  ctaGithub: string
  chips: string[]
  demoCaption: string
  installTitle: string
  installBody: string
  featuresTitle: string
  featuresSubtitle: string
  features: Card[]
  productsTitle: string
  productsSubtitle: string
  products: Product[]
  guidesTitle: string
  guidesSubtitle: string
  guides: Guide[]
}

const INSTALL_CODE = 'npm i mind-elixir -S'

const CONTENT: Record<string, Content> = {
  en: {
    title: 'Open-source JavaScript Mind Map Core',
    description:
      'Mind Elixir Core is a zero-dependency, framework-agnostic JavaScript mind map core. Build, edit and export interactive mind maps in React, Vue, Svelte or vanilla JS.',
    eyebrow: 'MIT licensed · Zero dependencies',
    h1: 'Mind Elixir Core',
    lede: 'A JavaScript mind map core for the web. Render, edit and export interactive mind maps in any frontend framework — with plugins, keyboard shortcuts, undo/redo and SVG or PNG export built in.',
    ctaStart: 'Quick start - 5 min',
    ctaApi: 'API reference',
    ctaGithub: 'Star on GitHub',
    chips: ['33 kB gzipped', 'Framework agnostic', 'TypeScript', 'Touch friendly'],
    demoCaption:
      'A live mind map rendered with Mind Elixir Core. Drag the canvas, double-click to edit, or open the context menu.',
    installTitle: 'Install in seconds',
    installBody:
      'Mind Elixir Core is published as the mind-elixir package on npm. It has no runtime dependencies and ships its own TypeScript types.',
    featuresTitle: 'Why developers choose Mind Elixir Core',
    featuresSubtitle:
      'A focused library for embedding mind mapping in your own product — not a hosted app, and not tied to a framework.',
    features: [
      {
        title: 'Zero dependencies',
        body: 'The entire core ships as a single bundle around 33 kB gzipped, with no transitive runtime dependencies to audit or patch.',
      },
      {
        title: 'Framework agnostic',
        body: 'Mount into any DOM element. First-class TypeScript types with ready-made examples for React, Vue 3 and vanilla JavaScript.',
      },
      {
        title: 'Built for large maps',
        body: 'Efficient node lookups and batched DOM updates keep interaction smooth even when a map grows into thousands of nodes.',
      },
      {
        title: 'Rich node content',
        body: 'Images, tags, icons, hyperlinks, Markdown, LaTeX and custom HTML can all live inside a node.',
      },
      {
        title: 'Export anywhere',
        body: 'Produce SVG or PNG directly, and add XMind or HTML output through the official export plugins.',
      },
      {
        title: 'Extensible by design',
        body: 'Listen to the event bus, add context-menu items, inject your own styles or publish a plugin.',
      },
    ],
    productsTitle: 'One brand, three products',
    productsSubtitle:
      'Mind Elixir is the product family. Mind Elixir Core is the open-source library documented on this site.',
    products: [
      {
        name: 'Mind Elixir App',
        body: 'The ready-to-use Mind Elixir app, available everywhere: in the browser, on desktop and on mobile. Open a blank map and start thinking.',
        href: 'https://app.mind-elixir.com',
        cta: 'Open the app',
      },
      {
        name: 'Mind Elixir Cloud',
        body: 'Hosted mind maps with sync and sharing for teams that want their maps available everywhere.',
        href: 'https://cloud.mind-elixir.com',
        cta: 'Try the cloud',
      },
      {
        name: 'Mind Elixir Core',
        body: 'The open-source library this documentation covers. Embed mind mapping in your own product under the MIT license.',
        href: '/docs/getting-started/intro',
        cta: 'Read the docs',
      },
    ],
    guidesTitle: 'Popular guides',
    guidesSubtitle: 'Jump straight to the task you are working on.',
    guides: [
      {
        title: 'Installation and usage',
        body: 'Install the package and render your first mind map in under five minutes.',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: 'Data import and export',
        body: 'Load maps from JavaScript objects or JSON and export them again.',
        href: '/docs/guides/data-export',
      },
      {
        title: 'Image export',
        body: 'Render the current map to SVG or PNG with exportSvg and exportPng.',
        href: '/docs/guides/image-export',
      },
      {
        title: 'Keyboard shortcuts',
        body: 'Every shortcut for editing, navigating and folding branches.',
        href: '/docs/guides/shortcuts',
      },
    ],
  },
  'zh-Hans': {
    title: '开源的 JavaScript 思维导图内核',
    description:
      'Mind Elixir Core 是零依赖、不绑定框架的 JavaScript 思维导图内核，可在 React、Vue、Svelte 或原生 JavaScript 中创建、编辑与导出可交互的思维导图。',
    eyebrow: 'MIT 协议 · 零依赖',
    h1: 'Mind Elixir Core',
    lede: '面向 Web 的 JavaScript 思维导图内核。在任意前端框架中渲染、编辑与导出可交互的思维导图，内置插件机制、快捷键、撤销重做以及 SVG / PNG 导出。',
    ctaStart: '快速开始 - 5 分钟',
    ctaApi: 'API 参考',
    ctaGithub: 'GitHub 加星',
    chips: ['gzip 后 33 kB', '不绑定框架', 'TypeScript', '支持触屏'],
    demoCaption:
      '这张思维导图由 Mind Elixir Core 实时渲染。可拖动画布、双击编辑节点，或打开右键菜单。',
    installTitle: '几秒钟完成安装',
    installBody:
      'Mind Elixir Core 以 mind-elixir 为名发布在 npm 上，没有任何运行时依赖，并自带 TypeScript 类型声明。',
    featuresTitle: '开发者选择 Mind Elixir Core 的原因',
    featuresSubtitle:
      '一个专注于把思维导图嵌入你自己产品的库——不是托管应用，也不绑定任何框架。',
    features: [
      {
        title: '零依赖',
        body: '整个内核打包后 gzip 仅约 33 kB，没有需要审计或修补的传递依赖。',
      },
      {
        title: '不绑定框架',
        body: '挂载到任意 DOM 元素即可使用，自带完整 TypeScript 类型，并提供 React、Vue 3 与原生 JavaScript 示例。',
      },
      {
        title: '为大图而生',
        body: '高效的节点查找与批量 DOM 更新，让思维导图扩展到数千个节点时依然流畅。',
      },
      {
        title: '丰富的节点内容',
        body: '图片、标签、图标、超链接、Markdown、LaTeX 与自定义 HTML 都可以放进节点里。',
      },
      {
        title: '随处导出',
        body: '直接产出 SVG 或 PNG，并可通过官方导出插件支持 XMind 与 HTML 格式。',
      },
      {
        title: '天然可扩展',
        body: '可监听事件总线、添加右键菜单项、注入自定义样式，或发布自己的插件。',
      },
    ],
    productsTitle: '一个品牌，三款产品',
    productsSubtitle:
      'Mind Elixir 是产品家族名，Mind Elixir Core 则是本站所记录的开源内核。',
    products: [
      {
        name: 'Mind Elixir App',
        body: '开箱即用的 Mind Elixir 应用，浏览器、桌面端与移动端都能使用。打开一张空白导图就能开始思考。',
        href: 'https://app.mind-elixir.com',
        cta: '打开应用',
      },
      {
        name: 'Mind Elixir Cloud',
        body: '托管式思维导图，支持同步与分享，让团队随时访问自己的导图。',
        href: 'https://cloud.mind-elixir.com',
        cta: '试用云端版',
      },
      {
        name: 'Mind Elixir Core',
        body: '本站所记录的开源内核。以 MIT 协议把思维导图能力嵌入你自己的产品。',
        href: '/docs/getting-started/intro',
        cta: '阅读文档',
      },
    ],
    guidesTitle: '热门指南',
    guidesSubtitle: '直接跳到你正在处理的任务。',
    guides: [
      {
        title: '安装与使用',
        body: '安装依赖，并在五分钟内渲染出第一张思维导图。',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: '数据导入与导出',
        body: '从 JavaScript 对象或 JSON 加载数据，并再次导出。',
        href: '/docs/guides/data-export',
      },
      {
        title: '图片导出',
        body: '通过 exportSvg 与 exportPng 把当前导图渲染为 SVG 或 PNG。',
        href: '/docs/guides/image-export',
      },
      {
        title: '快捷键',
        body: '编辑、导航与折叠分支所需的全部快捷键。',
        href: '/docs/guides/shortcuts',
      },
    ],
  },
  ja: {
    title: 'オープンソース JavaScript マインドマップコア',
    description:
      'Mind Elixir Core は依存パッケージ不要でフレームワークに縛られない JavaScript マインドマップコアです。React、Vue、Svelte、Vanilla JS でインタラクティブなマインドマップを作成・編集・書き出しできます。',
    eyebrow: 'MIT ライセンス · 依存パッケージなし',
    h1: 'Mind Elixir Core',
    lede: 'Web のための JavaScript マインドマップコア。任意のフロントエンドフレームワークで、インタラクティブなマインドマップを描画・編集・書き出しできます。プラグイン、キーボードショートカット、元に戻す/やり直し、SVG / PNG 書き出しを標準搭載しています。',
    ctaStart: 'クイックスタート - 5 分',
    ctaApi: 'API リファレンス',
    ctaGithub: 'GitHub でスター',
    chips: ['gzip 後 33 kB', 'フレームワーク非依存', 'TypeScript', 'タッチ対応'],
    demoCaption:
      'Mind Elixir Core で描画されたライブマインドマップです。キャンバスをドラッグし、ダブルクリックで編集、右クリックでメニューを開けます。',
    installTitle: '数秒でインストール',
    installBody:
      'Mind Elixir Core は npm の mind-elixir パッケージとして公開されています。実行時の依存はなく、TypeScript の型定義を同梱しています。',
    featuresTitle: 'Mind Elixir Core が選ばれる理由',
    featuresSubtitle:
      'プロダクトにマインドマップを組み込むためのライブラリです。ホスト型アプリではなく、特定のフレームワークにも縛られません。',
    features: [
      {
        title: '依存パッケージなし',
        body: 'コア全体が gzip 後およそ 33 kB の単一バンドル。監査や修正が必要な推移的依存はありません。',
      },
      {
        title: 'フレームワーク非依存',
        body: '任意の DOM 要素にマウントできます。充実した TypeScript 型と、React・Vue 3・Vanilla JS のサンプルを用意しています。',
      },
      {
        title: '大規模マップ向け',
        body: '効率的なノード検索とバッチ化された DOM 更新により、数千ノードのマップでも操作が滑らかです。',
      },
      {
        title: 'リッチなノード表現',
        body: '画像、タグ、アイコン、ハイパーリンク、Markdown、LaTeX、独自 HTML をノード内に配置できます。',
      },
      {
        title: 'どこへでも書き出し',
        body: 'SVG や PNG を直接出力でき、公式プラグインで XMind や HTML 形式にも対応します。',
      },
      {
        title: '拡張しやすい設計',
        body: 'イベントバスの購読、コンテキストメニューの追加、独自スタイルの注入、プラグインの公開が可能です。',
      },
    ],
    productsTitle: '1 つのブランド、3 つのプロダクト',
    productsSubtitle:
      'Mind Elixir はプロダクトファミリー名です。Mind Elixir Core はこのサイトで解説しているオープンソースのコアです。',
    products: [
      {
        name: 'Mind Elixir App',
        body: 'すぐに使える Mind Elixir アプリ。ブラウザ・デスクトップ・モバイルのすべてで利用できます。空白のマップを開けば、すぐに思考を始められます。',
        href: 'https://app.mind-elixir.com',
        cta: 'アプリを開く',
      },
      {
        name: 'Mind Elixir Cloud',
        body: '同期と共有に対応したホスト型マインドマップ。チームのマップをどこからでも利用できます。',
        href: 'https://cloud.mind-elixir.com',
        cta: 'クラウドを試す',
      },
      {
        name: 'Mind Elixir Core',
        body: 'このドキュメントが扱うオープンソースのコア。MIT ライセンスで自社プロダクトに組み込めます。',
        href: '/docs/getting-started/intro',
        cta: 'ドキュメントを読む',
      },
    ],
    guidesTitle: '人気のガイド',
    guidesSubtitle: '取り組みたい作業へすぐに移動できます。',
    guides: [
      {
        title: 'インストールと使用',
        body: 'パッケージを導入し、5 分以内に最初のマインドマップを描画します。',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: 'データのインポートとエクスポート',
        body: 'JavaScript オブジェクトや JSON からマップを読み込み、再び書き出します。',
        href: '/docs/guides/data-export',
      },
      {
        title: '画像のエクスポート',
        body: 'exportSvg と exportPng で現在のマップを SVG / PNG に出力します。',
        href: '/docs/guides/image-export',
      },
      {
        title: 'キーボードショートカット',
        body: '編集・移動・ブランチの折りたたみに使うすべてのショートカット。',
        href: '/docs/guides/shortcuts',
      },
    ],
  },
  de: {
    title: 'Open-Source-JavaScript-Mindmap-Kern',
    description:
      'Mind Elixir Core ist ein JavaScript-Mindmap-Kern ohne Abhängigkeiten und ohne Framework-Bindung. Erstellen, bearbeiten und exportieren Sie interaktive Mindmaps in React, Vue, Svelte oder mit Vanilla JS.',
    eyebrow: 'MIT-Lizenz · Keine Abhängigkeiten',
    h1: 'Mind Elixir Core',
    lede: 'Ein JavaScript-Mindmap-Kern für das Web. Rendern, bearbeiten und exportieren Sie interaktive Mindmaps in jedem Frontend-Framework – mit Plugins, Tastenkürzeln, Rückgängig/Wiederholen sowie SVG- und PNG-Export von Haus aus.',
    ctaStart: 'Schnellstart - 5 Min.',
    ctaApi: 'API-Referenz',
    ctaGithub: 'Auf GitHub einen Stern geben',
    chips: ['33 kB gzip-komprimiert', 'Framework-unabhängig', 'TypeScript', 'Touch-Bedienung'],
    demoCaption:
      'Eine live mit Mind Elixir Core gerenderte Mindmap. Ziehen Sie die Zeichenfläche, doppelklicken Sie zum Bearbeiten oder öffnen Sie das Kontextmenü.',
    installTitle: 'In Sekunden installiert',
    installBody:
      'Mind Elixir Core wird als Paket mind-elixir auf npm veröffentlicht. Es hat keine Laufzeitabhängigkeiten und liefert eigene TypeScript-Typen mit.',
    featuresTitle: 'Warum Entwickler Mind Elixir Core wählen',
    featuresSubtitle:
      'Eine fokussierte Bibliothek, um Mind Mapping in das eigene Produkt einzubetten – keine gehostete App und an kein Framework gebunden.',
    features: [
      {
        title: 'Keine Abhängigkeiten',
        body: 'Der gesamte Kern wird als einziges Bundle von rund 33 kB (gzip) ausgeliefert – ohne transitive Laufzeitabhängigkeiten, die geprüft oder gepatcht werden müssten.',
      },
      {
        title: 'Framework-unabhängig',
        body: 'Lässt sich in jedes DOM-Element einhängen. Erstklassige TypeScript-Typen mit fertigen Beispielen für React, Vue 3 und Vanilla JavaScript.',
      },
      {
        title: 'Für große Mindmaps gebaut',
        body: 'Effiziente Knotensuche und gebündelte DOM-Updates halten die Interaktion auch bei Tausenden von Knoten flüssig.',
      },
      {
        title: 'Vielfältige Knoteninhalte',
        body: 'Bilder, Tags, Icons, Hyperlinks, Markdown, LaTeX und eigenes HTML können direkt in einem Knoten liegen.',
      },
      {
        title: 'Überall exportieren',
        body: 'Erzeugt SVG oder PNG direkt und unterstützt XMind oder HTML über die offiziellen Export-Plugins.',
      },
      {
        title: 'Von Grund auf erweiterbar',
        body: 'Den Event-Bus abonnieren, Kontextmenü-Einträge ergänzen, eigene Styles einbringen oder ein Plugin veröffentlichen.',
      },
    ],
    productsTitle: 'Eine Marke, drei Produkte',
    productsSubtitle:
      'Mind Elixir ist die Produktfamilie. Mind Elixir Core ist die Open-Source-Bibliothek, die auf dieser Seite dokumentiert wird.',
    products: [
      {
        name: 'Mind Elixir App',
        body: 'Die sofort einsatzbereite Mind Elixir App – im Browser, auf dem Desktop und auf Mobilgeräten. Öffnen Sie eine leere Map und beginnen Sie zu denken.',
        href: 'https://app.mind-elixir.com',
        cta: 'App öffnen',
      },
      {
        name: 'Mind Elixir Cloud',
        body: 'Gehostete Mindmaps mit Synchronisierung und Freigabe für Teams, die von überall auf ihre Maps zugreifen wollen.',
        href: 'https://cloud.mind-elixir.com',
        cta: 'Cloud ausprobieren',
      },
      {
        name: 'Mind Elixir Core',
        body: 'Die Open-Source-Bibliothek, die diese Dokumentation beschreibt. Betten Sie Mind Mapping unter der MIT-Lizenz in Ihr eigenes Produkt ein.',
        href: '/docs/getting-started/intro',
        cta: 'Dokumentation lesen',
      },
    ],
    guidesTitle: 'Beliebte Anleitungen',
    guidesSubtitle: 'Springen Sie direkt zu der Aufgabe, an der Sie gerade arbeiten.',
    guides: [
      {
        title: 'Installation und Verwendung',
        body: 'Installieren Sie das Paket und rendern Sie in unter fünf Minuten Ihre erste Mindmap.',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: 'Datenimport und -export',
        body: 'Laden Sie Maps aus JavaScript-Objekten oder JSON und schreiben Sie sie wieder zurück.',
        href: '/docs/guides/data-export',
      },
      {
        title: 'Bildexport',
        body: 'Geben Sie die aktuelle Map mit exportSvg und exportPng als SVG oder PNG aus.',
        href: '/docs/guides/image-export',
      },
      {
        title: 'Tastenkürzel',
        body: 'Alle Kürzel zum Bearbeiten, Navigieren und Einklappen von Zweigen.',
        href: '/docs/guides/shortcuts',
      },
    ],
  },
  es: {
    title: 'Núcleo de mapas mentales JavaScript de código abierto',
    description:
      'Mind Elixir Core es un núcleo de mapas mentales en JavaScript sin dependencias e independiente del framework. Cree, edite y exporte mapas mentales interactivos en React, Vue, Svelte o JavaScript puro.',
    eyebrow: 'Licencia MIT · Sin dependencias',
    h1: 'Mind Elixir Core',
    lede: 'Un núcleo de mapas mentales JavaScript para la web. Renderice, edite y exporte mapas mentales interactivos en cualquier framework frontend, con plugins, atajos de teclado, deshacer/rehacer y exportación SVG o PNG integrados.',
    ctaStart: 'Inicio rápido - 5 min',
    ctaApi: 'Referencia de la API',
    ctaGithub: 'Dar una estrella en GitHub',
    chips: ['33 kB comprimidos con gzip', 'Independiente del framework', 'TypeScript', 'Compatible con táctil'],
    demoCaption:
      'Un mapa mental en vivo renderizado con Mind Elixir Core. Arrastre el lienzo, haga doble clic para editar o abra el menú contextual.',
    installTitle: 'Instalación en segundos',
    installBody:
      'Mind Elixir Core se publica en npm como el paquete mind-elixir. No tiene dependencias en tiempo de ejecución e incluye sus propios tipos de TypeScript.',
    featuresTitle: 'Por qué los desarrolladores eligen Mind Elixir Core',
    featuresSubtitle:
      'Una biblioteca centrada en integrar mapas mentales en su propio producto: no es una aplicación alojada ni está atada a un framework.',
    features: [
      {
        title: 'Sin dependencias',
        body: 'Todo el núcleo se distribuye como un único paquete de unos 33 kB comprimidos con gzip, sin dependencias transitivas que auditar o parchear.',
      },
      {
        title: 'Independiente del framework',
        body: 'Se monta en cualquier elemento del DOM. Tipos de TypeScript de primera clase con ejemplos listos para React, Vue 3 y JavaScript puro.',
      },
      {
        title: 'Preparado para mapas grandes',
        body: 'La búsqueda eficiente de nodos y las actualizaciones por lotes del DOM mantienen la interacción fluida incluso con miles de nodos.',
      },
      {
        title: 'Contenido enriquecido en los nodos',
        body: 'Imágenes, etiquetas, iconos, hipervínculos, Markdown, LaTeX y HTML personalizado pueden convivir dentro de un nodo.',
      },
      {
        title: 'Exporte a cualquier formato',
        body: 'Genere SVG o PNG directamente y añada salida XMind o HTML mediante los plugins oficiales de exportación.',
      },
      {
        title: 'Ampliable por diseño',
        body: 'Suscríbase al bus de eventos, añada entradas al menú contextual, inyecte sus propios estilos o publique un plugin.',
      },
    ],
    productsTitle: 'Una marca, tres productos',
    productsSubtitle:
      'Mind Elixir es la familia de productos. Mind Elixir Core es la biblioteca de código abierto que documenta este sitio.',
    products: [
      {
        name: 'Mind Elixir App',
        body: 'La aplicación Mind Elixir lista para usar, disponible en el navegador, el escritorio y el móvil. Abra un mapa en blanco y empiece a pensar.',
        href: 'https://app.mind-elixir.com',
        cta: 'Abrir la app',
      },
      {
        name: 'Mind Elixir Cloud',
        body: 'Mapas mentales alojados con sincronización y uso compartido para equipos que quieren acceder a sus mapas desde cualquier lugar.',
        href: 'https://cloud.mind-elixir.com',
        cta: 'Probar la nube',
      },
      {
        name: 'Mind Elixir Core',
        body: 'La biblioteca de código abierto que cubre esta documentación. Integre mapas mentales en su propio producto bajo la licencia MIT.',
        href: '/docs/getting-started/intro',
        cta: 'Leer la documentación',
      },
    ],
    guidesTitle: 'Guías populares',
    guidesSubtitle: 'Vaya directo a la tarea que tiene entre manos.',
    guides: [
      {
        title: 'Instalación y uso',
        body: 'Instale el paquete y renderice su primer mapa mental en menos de cinco minutos.',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: 'Importación y exportación de datos',
        body: 'Cargue mapas desde objetos JavaScript o JSON y vuelva a exportarlos.',
        href: '/docs/guides/data-export',
      },
      {
        title: 'Exportación de imágenes',
        body: 'Convierta el mapa actual a SVG o PNG con exportSvg y exportPng.',
        href: '/docs/guides/image-export',
      },
      {
        title: 'Atajos de teclado',
        body: 'Todos los atajos para editar, navegar y plegar ramas.',
        href: '/docs/guides/shortcuts',
      },
    ],
  },
  'pt-BR': {
    title: 'Núcleo de mapas mentais JavaScript de código aberto',
    description:
      'O Mind Elixir Core é um núcleo de mapas mentais em JavaScript sem dependências e independente de framework. Crie, edite e exporte mapas mentais interativos em React, Vue, Svelte ou JavaScript puro.',
    eyebrow: 'Licença MIT · Sem dependências',
    h1: 'Mind Elixir Core',
    lede: 'Um núcleo de mapas mentais JavaScript para a web. Renderize, edite e exporte mapas mentais interativos em qualquer framework frontend, com plugins, atalhos de teclado, desfazer/refazer e exportação SVG ou PNG integrados.',
    ctaStart: 'Início rápido - 5 min',
    ctaApi: 'Referência da API',
    ctaGithub: 'Dar uma estrela no GitHub',
    chips: ['33 kB após gzip', 'Independente de framework', 'TypeScript', 'Compatível com toque'],
    demoCaption:
      'Um mapa mental ao vivo renderizado com o Mind Elixir Core. Arraste a tela, clique duas vezes para editar ou abra o menu de contexto.',
    installTitle: 'Instale em segundos',
    installBody:
      'O Mind Elixir Core é publicado no npm como o pacote mind-elixir. Não tem dependências em tempo de execução e já inclui seus próprios tipos TypeScript.',
    featuresTitle: 'Por que desenvolvedores escolhem o Mind Elixir Core',
    featuresSubtitle:
      'Uma biblioteca focada em incorporar mapas mentais ao seu próprio produto — não é um app hospedado e não está presa a um framework.',
    features: [
      {
        title: 'Sem dependências',
        body: 'Todo o núcleo é distribuído como um único bundle de cerca de 33 kB após gzip, sem dependências transitivas para auditar ou corrigir.',
      },
      {
        title: 'Independente de framework',
        body: 'Monte em qualquer elemento do DOM. Tipos TypeScript de primeira classe com exemplos prontos para React, Vue 3 e JavaScript puro.',
      },
      {
        title: 'Feito para mapas grandes',
        body: 'Buscas eficientes de nós e atualizações em lote do DOM mantêm a interação fluida mesmo com milhares de nós.',
      },
      {
        title: 'Conteúdo rico nos nós',
        body: 'Imagens, tags, ícones, hiperlinks, Markdown, LaTeX e HTML personalizado podem coexistir dentro de um nó.',
      },
      {
        title: 'Exporte para onde quiser',
        body: 'Gere SVG ou PNG diretamente e adicione saída XMind ou HTML com os plugins oficiais de exportação.',
      },
      {
        title: 'Extensível por design',
        body: 'Ouça o barramento de eventos, adicione itens ao menu de contexto, injete seus próprios estilos ou publique um plugin.',
      },
    ],
    productsTitle: 'Uma marca, três produtos',
    productsSubtitle:
      'Mind Elixir é a família de produtos. O Mind Elixir Core é a biblioteca de código aberto documentada neste site.',
    products: [
      {
        name: 'Mind Elixir App',
        body: 'O app Mind Elixir pronto para usar, disponível no navegador, no desktop e no celular. Abra um mapa em branco e comece a pensar.',
        href: 'https://app.mind-elixir.com',
        cta: 'Abrir o app',
      },
      {
        name: 'Mind Elixir Cloud',
        body: 'Mapas mentais hospedados com sincronização e compartilhamento para equipes que querem seus mapas disponíveis em qualquer lugar.',
        href: 'https://cloud.mind-elixir.com',
        cta: 'Testar a nuvem',
      },
      {
        name: 'Mind Elixir Core',
        body: 'A biblioteca de código aberto que esta documentação cobre. Incorpore mapas mentais ao seu produto sob a licença MIT.',
        href: '/docs/getting-started/intro',
        cta: 'Ler a documentação',
      },
    ],
    guidesTitle: 'Guias populares',
    guidesSubtitle: 'Vá direto para a tarefa que você está fazendo.',
    guides: [
      {
        title: 'Instalação e uso',
        body: 'Instale o pacote e renderize seu primeiro mapa mental em menos de cinco minutos.',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: 'Importação e exportação de dados',
        body: 'Carregue mapas de objetos JavaScript ou JSON e exporte-os novamente.',
        href: '/docs/guides/data-export',
      },
      {
        title: 'Exportação de imagens',
        body: 'Renderize o mapa atual como SVG ou PNG com exportSvg e exportPng.',
        href: '/docs/guides/image-export',
      },
      {
        title: 'Atalhos de teclado',
        body: 'Todos os atalhos para editar, navegar e recolher ramificações.',
        href: '/docs/guides/shortcuts',
      },
    ],
  },
  ko: {
    title: '오픈 소스 JavaScript 마인드맵 코어',
    description:
      'Mind Elixir Core는 의존성이 없고 특정 프레임워크에 종속되지 않는 JavaScript 마인드맵 코어입니다. React, Vue, Svelte, Vanilla JS에서 대화형 마인드맵을 만들고 편집하고 내보낼 수 있습니다.',
    eyebrow: 'MIT 라이선스 · 의존성 없음',
    h1: 'Mind Elixir Core',
    lede: '웹을 위한 JavaScript 마인드맵 코어입니다. 어떤 프론트엔드 프레임워크에서든 대화형 마인드맵을 렌더링·편집·내보낼 수 있으며, 플러그인, 단축키, 실행 취소/다시 실행, SVG/PNG 내보내기를 기본으로 제공합니다.',
    ctaStart: '빠른 시작 - 5분',
    ctaApi: 'API 레퍼런스',
    ctaGithub: 'GitHub에서 별 주기',
    chips: ['gzip 후 33 kB', '프레임워크 비종속', 'TypeScript', '터치 지원'],
    demoCaption:
      'Mind Elixir Core로 실시간 렌더링한 마인드맵입니다. 캔버스를 드래그하거나 더블 클릭해 편집하고, 컨텍스트 메뉴를 열어 보세요.',
    installTitle: '몇 초 만에 설치',
    installBody:
      'Mind Elixir Core는 npm에 mind-elixir 패키지로 공개되어 있습니다. 런타임 의존성이 없으며 TypeScript 타입을 자체 제공합니다.',
    featuresTitle: '개발자가 Mind Elixir Core를 선택하는 이유',
    featuresSubtitle:
      '자신의 제품에 마인드맵을 넣기 위한 라이브러리입니다. 호스팅 서비스도 아니고 특정 프레임워크에 묶이지도 않습니다.',
    features: [
      {
        title: '의존성 없음',
        body: '코어 전체가 gzip 후 약 33 kB의 단일 번들로 제공되며, 검토하거나 패치해야 할 전이적 런타임 의존성이 없습니다.',
      },
      {
        title: '프레임워크 비종속',
        body: '모든 DOM 요소에 마운트할 수 있습니다. React, Vue 3, Vanilla JavaScript용 예제와 함께 완성도 높은 TypeScript 타입을 제공합니다.',
      },
      {
        title: '큰 맵에 최적화',
        body: '효율적인 노드 조회와 배치 DOM 업데이트로 노드가 수천 개로 늘어나도 상호작용이 매끄럽습니다.',
      },
      {
        title: '풍부한 노드 콘텐츠',
        body: '이미지, 태그, 아이콘, 하이퍼링크, Markdown, LaTeX, 사용자 정의 HTML을 노드 안에 넣을 수 있습니다.',
      },
      {
        title: '어디로든 내보내기',
        body: 'SVG나 PNG를 바로 생성하고, 공식 내보내기 플러그인으로 XMind 또는 HTML 출력도 추가할 수 있습니다.',
      },
      {
        title: '확장을 고려한 설계',
        body: '이벤트 버스를 구독하고, 컨텍스트 메뉴 항목을 추가하고, 직접 만든 스타일을 주입하거나 플러그인을 배포할 수 있습니다.',
      },
    ],
    productsTitle: '하나의 브랜드, 세 가지 제품',
    productsSubtitle:
      'Mind Elixir는 제품군 이름입니다. Mind Elixir Core는 이 사이트에서 설명하는 오픈 소스 라이브러리입니다.',
    products: [
      {
        name: 'Mind Elixir App',
        body: '바로 사용할 수 있는 Mind Elixir 앱으로, 브라우저·데스크톱·모바일에서 모두 이용할 수 있습니다. 빈 맵을 열고 바로 생각을 정리해 보세요.',
        href: 'https://app.mind-elixir.com',
        cta: '앱 열기',
      },
      {
        name: 'Mind Elixir Cloud',
        body: '동기화와 공유를 지원하는 호스팅 마인드맵입니다. 어디서든 맵에 접근해야 하는 팀에 적합합니다.',
        href: 'https://cloud.mind-elixir.com',
        cta: '클라우드 체험',
      },
      {
        name: 'Mind Elixir Core',
        body: '이 문서에서 다루는 오픈 소스 라이브러리입니다. MIT 라이선스로 자사 제품에 마인드맵 기능을 넣을 수 있습니다.',
        href: '/docs/getting-started/intro',
        cta: '문서 읽기',
      },
    ],
    guidesTitle: '인기 가이드',
    guidesSubtitle: '지금 작업 중인 내용으로 바로 이동하세요.',
    guides: [
      {
        title: '설치와 사용',
        body: '패키지를 설치하고 5분 안에 첫 마인드맵을 렌더링하세요.',
        href: '/docs/getting-started/quick-start',
      },
      {
        title: '데이터 가져오기와 내보내기',
        body: 'JavaScript 객체나 JSON에서 맵을 불러오고 다시 내보냅니다.',
        href: '/docs/guides/data-export',
      },
      {
        title: '이미지 내보내기',
        body: 'exportSvg와 exportPng로 현재 맵을 SVG 또는 PNG로 만듭니다.',
        href: '/docs/guides/image-export',
      },
      {
        title: '키보드 단축키',
        body: '편집, 이동, 가지 접기에 사용하는 모든 단축키입니다.',
        href: '/docs/guides/shortcuts',
      },
    ],
  },
}

const ICONS: Record<string, ReactNode> = {
  package: (
    <>
      <path d="M21 8.5 12 3 3 8.5v7L12 21l9-5.5v-7Z" />
      <path d="M3.5 8.7 12 13.5l8.5-4.8M12 21v-7.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 21a9 9 0 1 1 9-9" />
      <path d="m12 12 4.5-4.5" />
      <circle cx="12" cy="12" r="1.6" />
    </>
  ),
  text: (
    <>
      <path d="M4 6h16M4 6v12M20 6v12" />
      <path d="M8 10h8M8 14h5" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 20h16" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8Z" />
      <path d="M12 17v4" />
    </>
  ),
}

function Icon({ name }: { name: string }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

export default function Home() {
  const { i18n } = useDocusaurusContext()
  const locale = i18n.currentLocale
  const t = CONTENT[locale] ?? CONTENT.en

  return (
    <Layout
      title={t.title}
      description={t.description}
      wrapperClassName={styles.page}
    >
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>{t.eyebrow}</p>
            <Heading as="h1" className={styles.title}>
              {t.h1}
            </Heading>
            <p className={styles.lede}>{t.lede}</p>
            <div className={styles.ctaRow}>
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started/quick-start"
              >
                {t.ctaStart}
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/docs/api/mind-elixir"
              >
                {t.ctaApi}
              </Link>
              <Link
                className={styles.ghostLink}
                href="https://github.com/ssshooter/mind-elixir-core"
              >
                {t.ctaGithub}
              </Link>
            </div>
            <ul className={styles.chips}>
              {t.chips.map((chip) => (
                <li key={chip} className={styles.chip}>
                  {chip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.demo}>
        <div className="container">
          <div className={styles.demoFrame}>
            <MindElixirShowcase height="520px" />
          </div>
          <p className={styles.caption}>{t.demoCaption}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.install}>
            <div className={styles.installCopy}>
              <Heading as="h2" className={styles.installTitle}>
                {t.installTitle}
              </Heading>
              <p className={styles.installBody}>{t.installBody}</p>
              <Link
                className={styles.installLink}
                to="/docs/getting-started/quick-start"
              >
                {t.ctaStart} →
              </Link>
            </div>
            <pre className={styles.installCode}>
              <code>
                <span className={styles.prompt}>$</span> {INSTALL_CODE}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            {t.featuresTitle}
          </Heading>
          <p className={styles.sectionSubtitle}>{t.featuresSubtitle}</p>
          <div className={styles.featureGrid}>
            {t.features.map((feature, index) => (
              <article key={feature.title} className={styles.card}>
                <div className={styles.iconWrap}>
                  <Icon name={Object.keys(ICONS)[index % Object.keys(ICONS).length]} />
                </div>
                <Heading as="h3" className={styles.cardTitle}>
                  {feature.title}
                </Heading>
                <p className={styles.cardBody}>{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            {t.productsTitle}
          </Heading>
          <p className={styles.sectionSubtitle}>{t.productsSubtitle}</p>
          <div className={styles.productGrid}>
            {t.products.map((product) => (
              <article key={product.name} className={styles.productCard}>
                <Heading as="h3" className={styles.productName}>
                  {product.name}
                </Heading>
                <p className={styles.cardBody}>{product.body}</p>
                <Link className={styles.productLink} to={product.href}>
                  {product.cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            {t.guidesTitle}
          </Heading>
          <p className={styles.sectionSubtitle}>{t.guidesSubtitle}</p>
          <div className={styles.guideGrid}>
            {t.guides.map((guide) => (
              <Link key={guide.title} className={styles.guideCard} to={guide.href}>
                <Heading as="h3" className={styles.guideTitle}>
                  {guide.title}
                </Heading>
                <p className={styles.cardBody}>{guide.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
