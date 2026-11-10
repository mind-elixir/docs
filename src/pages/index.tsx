import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import Heading from '@theme/Heading'
import type { ReactNode } from 'react'
import { useMemo } from 'react'

import styles from './index.module.css'
import MindElixirShowcase from '../components/MindElixirShowcase'
import { createHomepageMindMap } from '../components/homepageMindMap'

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
    productsTitle: 'One brand, four products',
    productsSubtitle:
      'Mind Elixir is the product family. Mind Elixir Core is the open-source library documented on this site.',
    products: [
      {
        name: 'Mind Elixir App',
        body: 'The ready-to-use web app. Open a blank map in your browser and start thinking — nothing to install.',
        href: 'https://app.mind-elixir.com',
        cta: 'Open the app',
      },
      {
        name: 'Mind Elixir Desktop',
        body: 'A desktop build of the app for macOS, Windows and Linux, with local files and the same mind mapping engine.',
        href: 'https://desktop.mind-elixir.com',
        cta: 'Get the desktop app',
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
    productsTitle: '一个品牌，四款产品',
    productsSubtitle:
      'Mind Elixir 是产品家族名，Mind Elixir Core 则是本站所记录的开源内核。',
    products: [
      {
        name: 'Mind Elixir App',
        body: '开箱即用的网页应用。在浏览器中打开一张空白导图就能开始思考，无需安装。',
        href: 'https://app.mind-elixir.com',
        cta: '打开应用',
      },
      {
        name: 'Mind Elixir Desktop',
        body: '适用于 macOS、Windows 与 Linux 的桌面版应用，支持本地文件，使用同样的思维导图内核。',
        href: 'https://desktop.mind-elixir.com',
        cta: '下载桌面版',
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
    productsTitle: '1 つのブランド、4 つのプロダクト',
    productsSubtitle:
      'Mind Elixir はプロダクトファミリー名です。Mind Elixir Core はこのサイトで解説しているオープンソースのコアです。',
    products: [
      {
        name: 'Mind Elixir App',
        body: 'すぐに使える Web アプリ。ブラウザで空白のマップを開けば、インストール不要で思考を始められます。',
        href: 'https://app.mind-elixir.com',
        cta: 'アプリを開く',
      },
      {
        name: 'Mind Elixir Desktop',
        body: 'macOS・Windows・Linux 向けのデスクトップ版。ローカルファイルに対応し、同じマインドマップエンジンを使用します。',
        href: 'https://desktop.mind-elixir.com',
        cta: 'デスクトップ版を入手',
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
  const demoMap = useMemo(() => createHomepageMindMap(locale), [locale])

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
            <MindElixirShowcase height="520px" data={demoMap} />
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
