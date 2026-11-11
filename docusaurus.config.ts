import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const siteUrl = 'https://docs.mind-elixir.com'
const siteImage = 'img/og-image.png'

const config: Config = {
  future: {
    v4: true,
    faster: true,
  },
  // future.v4 enables siteStorageNamespacing, which hashes url + baseUrl.
  // Each i18n locale has its own baseUrl, so pin the namespace to keep the
  // color mode (and other stored state) shared across locales.
  storage: {
    namespace: 'mind-elixir',
  },
  title: 'Mind Elixir Core',
  titleDelimiter: '|',
  tagline:
    'Open-source JavaScript mind map core for building interactive mind maps in any web framework',
  favicon: 'img/favicon-64.png',

  url: siteUrl,
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'SSShooter',
  projectName: 'mind-elixir-core',

  onBrokenLinks: 'warn',
  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'ja', 'de', 'es', 'pt-BR', 'ko'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/mind-elixir/docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Mind Elixir Core Blog',
          blogDescription:
            'Release notes, tutorials and implementation guides for the Mind Elixir Core JavaScript mind map library.',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params
            const items = await defaultCreateSitemapItems(rest)

            const localePrefixes = [
              '/zh-Hans',
              '/ja',
              '/de',
              '/es',
              '/pt-BR',
              '/ko',
            ]

            const pathOf = (url: string) => {
              const pathname = new URL(url).pathname.replace(/\/$/, '') || '/'
              for (const prefix of localePrefixes) {
                if (pathname === prefix) return '/'
                if (pathname.startsWith(`${prefix}/`)) {
                  return pathname.slice(prefix.length)
                }
              }
              return pathname
            }

            const priorityFor = (path: string) => {
              if (path === '/') return 1
              if (path.startsWith('/docs/getting-started')) return 0.9
              if (path.startsWith('/docs/guides')) return 0.8
              if (path.startsWith('/docs/advanced-guides')) return 0.7
              // Member-level API stubs: mind-elixir.arrow.from etc.
              if (/^\/docs\/api\/[^/]+\.[^/]+\.[^/]+$/.test(path)) return 0.3
              if (path.startsWith('/docs/api')) return 0.5
              if (path === '/blog') return 0.6
              if (path.startsWith('/blog/')) return 0.6
              return 0.4
            }

            return items
              .filter((item) => {
                const path = pathOf(item.url)
                return (
                  path !== '/search' &&
                  path !== '/blog/authors' &&
                  path !== '/blog/archive'
                )
              })
              .map((item) => ({
                ...item,
                priority: priorityFor(pathOf(item.url)),
              }))
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'description',
        content:
          'Mind Elixir Core is a zero-dependency, framework-agnostic JavaScript mind map core. Build, edit and export interactive mind maps in React, Vue, Svelte or vanilla JS.',
      },
      {
        name: 'keywords',
        content: [
          'Mind Elixir Core',
          'mind elixir core',
          'mind-elixir',
          'javascript mind map',
          'javascript mindmap',
          'mind map library',
          'mind map core',
          'mindmap editor',
          'mindmap visualization',
          'interactive mind map',
          'typescript mind map',
          'framework agnostic mind map',
          'open source mind map',
          'svg mind map',
          'react mind map',
        ].join(', '),
      },
      { name: 'author', content: 'SSShooter' },
      {
        name: 'robots',
        content: 'index, follow, max-image-preview:large, max-snippet:-1',
      },
      { property: 'og:site_name', content: 'Mind Elixir Core' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image:alt', content: 'Mind Elixir Core logo' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:image:alt',
        content: 'Mind Elixir Core logo',
      },
    ],
    image: siteImage,
    navbar: {
      title: 'Mind Elixir Core',
      logo: {
        alt: 'Mind Elixir Core logo',
        src: 'img/mind-elixir-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        { to: '/docs/api/mind-elixir', label: 'API', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://app.mind-elixir.com',
          label: 'Mind Elixir App',
          position: 'right',
        },
        {
          type: 'html',
          position: 'right',
          value:
            '<a href="https://github.com/ssshooter/mind-elixir-core" target="_blank" rel="noopener noreferrer" class="navbar-github-link" aria-label="Mind Elixir Core on GitHub"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>',
        },
        {
          type: 'html',
          position: 'right',
          value:
            '<a href="https://atomgit.com/SSShooter/mind-elixir-core" target="_blank" rel="noopener noreferrer" class="navbar-atomgit-link" aria-label="Mind Elixir Core on AtomGit"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.5,5c.1,0,.3-.2.5-.3,0,.1,0,.2,0,.3,0,.1,0,.3,0,.4,0,1,.6,1.8,1.4,2,1.1.3,2.1-.2,2.7-1.1.7-1.1.4-2.4-.8-3.3C16.2.8,12.8.2,9.1,1.2,1.1,3.6-1.6,13.4,4,19.4c2.4,2.6,5.5,3.7,9,3.6,4.5-.1,7.7-2.3,9.7-6.2,1.5-2.7-.1-5.7-3.2-6.4-1.7-.3-3.5-.5-5.3-.3-.6,0-1.2.2-1.7.5-.6.3-.7.9-.7,1.5,0,.6.5.9,1,1,1,.2,2.1.3,3.1.3.3,0,.6,0,.9,0,.4,0,.9,0,1.3,0,1.2.2,1.6,1.2,1,2.3-.2.3-.3.5-.5.7-.8.9-1.9,1.5-3.1,1.8-2.2.5-4.3.6-6.5-.1-2.5-.8-3.9-2.6-4-5,0-1.5.4-3,1.1-4.3.3-.6.5-1.2.5-1.9,0-.3,0-.6,0-.9,0-.2,0-.3,0-.5.2,0,.5.1.7.2.9.4,1.9.5,2.9.3.6-.1,1.2-.2,1.8-.1,1,0,1.9-.2,2.7-.7.2-.1.4-.2.6-.4Z"/></svg></a>',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started/intro' },
            { label: 'Guides', to: '/docs/guides/data-export' },
            {
              label: 'Advanced Guides',
              to: '/docs/advanced-guides/customize-branch-style',
            },
            { label: 'API Reference', to: '/docs/api/mind-elixir' },
          ],
        },
        {
          title: 'Products',
          items: [
            {
              label: 'Mind Elixir App',
              href: 'https://app.mind-elixir.com',
            },
            {
              label: 'Mind Elixir Cloud',
              href: 'https://cloud.mind-elixir.com',
            },
            {
              label: 'mindmapcn',
              href: 'https://mindmapcn.mind-elixir.com/',
            },
            {
              label: 'mindmapcn-svelte',
              href: 'https://mindmapcn-svelte.mind-elixir.com/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            {
              label: 'GitHub',
              href: 'https://github.com/ssshooter/mind-elixir-core',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/mind-elixir',
            },
            {
              label: 'SS ToolBox',
              href: 'https://tools.mind-elixir.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mind Elixir Core`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: 'JUPDK6RJX0',
      apiKey: '6a7a638ec93d941cc8103950fdf23188',
      indexName: 'mind-elixir',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    './plugins/api-seo',
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-Z1C98YX0V0',
        anonymizeIP: true,
      },
    ],
  ],
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#ffc800',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/apple-touch-icon.png',
      },
    },
  ],
}

export default config
