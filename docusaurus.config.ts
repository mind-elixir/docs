import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  future: {
    v4: true,
    experimental_faster: true,
  },
  title: 'Mind Elixir',
  tagline: 'A Open Source JavaScript Mind Map Library',
  favicon: 'img/mind-elixir-logo.png',

  // Set the production url of your site here
  url: 'https://docs.mind-elixir.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  markdown: {
    format: 'detect',
  },
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans', 'ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/mind-elixir/docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: 'keywords',
        content: 'mindmap, JavaScript, framework, library, mind-elixir, mindmap, mindmap editor, mindmap viewer, mindmap visualization',
      },
    ],
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Mind Elixir',
      logo: {
        alt: 'Mind Elixir Logo',
        src: 'img/mind-elixir-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        { to: '/docs/api/mind-elixir', label: 'APIs', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },

        {
          href: 'https://cloud.mind-elixir.com',
          label: 'Cloud',
          position: 'right',
        },
        {
          href: 'https://desktop.mind-elixir.com',
          label: 'Mind Elixir Desktop',
          position: 'right',
        },
        {
          type: 'html',
          position: 'right',
          value:
            '<a href="https://github.com/ssshooter/mind-elixir-core" target="_blank" rel="noopener noreferrer" class="navbar-github-link" aria-label="GitHub repository"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>',
        },
        {
          type: 'html',
          position: 'right',
          value:
            '<a href="https://atomgit.com/SSShooter/mind-elixir-core" target="_blank" rel="noopener noreferrer" class="navbar-atomgit-link" aria-label="AtomGit repository"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5,5c.1,0,.3-.2.5-.3,0,.1,0,.2,0,.3,0,.1,0,.3,0,.4,0,1,.6,1.8,1.4,2,1.1.3,2.1-.2,2.7-1.1.7-1.1.4-2.4-.8-3.3C16.2.8,12.8.2,9.1,1.2,1.1,3.6-1.6,13.4,4,19.4c2.4,2.6,5.5,3.7,9,3.6,4.5-.1,7.7-2.3,9.7-6.2,1.5-2.7-.1-5.7-3.2-6.4-1.7-.3-3.5-.5-5.3-.3-.6,0-1.2.2-1.7.5-.6.3-.7.9-.7,1.5,0,.6.5.9,1,1,1,.2,2.1.3,3.1.3.3,0,.6,0,.9,0,.4,0,.9,0,1.3,0,1.2.2,1.6,1.2,1,2.3-.2.3-.3.5-.5.7-.8.9-1.9,1.5-3.1,1.8-2.2.5-4.3.6-6.5-.1-2.5-.8-3.9-2.6-4-5,0-1.5.4-3,1.1-4.3.3-.6.5-1.2.5-1.9,0-.3,0-.6,0-.9,0-.2,0-.3,0-.5.2,0,.5.1.7.2.9.4,1.9.5,2.9.3.6-.1,1.2-.2,1.8-.1,1,0,1.9-.2,2.7-.7.2-.1.4-.2.6-.4Z"/></svg></a>',
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
            {
              label: 'Tutorial',
              to: '/',
            },
          ],
        },
        {
          title: 'Products',
          items: [
            {
              label: 'Mind Elixir Cloud',
              href: 'https://cloud.mind-elixir.com',
            },
            {
              label: 'Mind Elixir Desktop',
              href: 'https://desktop.mind-elixir.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ssshooter/mind-elixir-core',
            },
            {
              label: 'SS ToolBox',
              href: 'https://tools.mind-elixir.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mind Elixir`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'JUPDK6RJX0',

      // Public API key: it is safe to commit it
      apiKey: '6a7a638ec93d941cc8103950fdf23188',

      indexName: 'mind-elixir',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      // externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: '/docs/', // or as RegExp: /\/docs\//
      //   to: '/',
      // },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-Z1C98YX0V0',
        anonymizeIP: true,
      },
    ],
  ],
}

export default config
