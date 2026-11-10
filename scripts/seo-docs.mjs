// One-off content pass: rebrand the library to "Mind Elixir Core" and add
// hand-written title/description/keywords frontmatter for SEO.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

const LOCALES = {
  en: 'docs',
  zh: path.join('i18n', 'zh-Hans', 'docusaurus-plugin-content-docs', 'current'),
  ja: path.join('i18n', 'ja', 'docusaurus-plugin-content-docs', 'current'),
}

const BRAND_GENERIC = {
  en: 'JavaScript mind map',
  zh: 'JavaScript 思维导图',
  ja: 'JavaScript マインドマップ',
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
  if (!raw.startsWith('---')) return { frontMatter: '', body: raw }
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return { frontMatter: '', body: raw }
  return {
    frontMatter: raw.slice(3, end).replace(/^\n/, ''),
    body: raw.slice(end + 4).replace(/^\n/, ''),
  }
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

    fs.writeFileSync(file, next)
    docsChanged++
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
