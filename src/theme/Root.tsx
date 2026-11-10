import React, { type ReactNode } from 'react'
import Head from '@docusaurus/Head'
import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const ORIGIN = 'https://docs.mind-elixir.com'
const HOME_URL = 'https://mind-elixir.com/'
const APP_URL = 'https://app.mind-elixir.com/'
const DESKTOP_URL = 'https://desktop.mind-elixir.com/'
const CLOUD_URL = 'https://cloud.mind-elixir.com/'
const REPO_URL = 'https://github.com/SSShooter/mind-elixir-core'
const NPM_URL = 'https://www.npmjs.com/package/mind-elixir'

const SHORT_DESCRIPTION =
  'Mind Elixir Core is a zero-dependency, framework-agnostic JavaScript mind map core for building, editing and exporting interactive mind maps.'

const organization = {
  '@type': 'Organization',
  '@id': `${ORIGIN}/#organization`,
  name: 'Mind Elixir',
  url: HOME_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${ORIGIN}/img/apple-touch-icon.png`,
    width: 180,
    height: 180,
  },
  sameAs: [REPO_URL],
}

const software = {
  '@type': ['SoftwareApplication', 'SoftwareSourceCode'],
  '@id': `${ORIGIN}/#software`,
  name: 'Mind Elixir Core',
  alternateName: ['mind-elixir', 'MindElixir'],
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Mind Mapping',
  operatingSystem: 'Any',
  programmingLanguage: 'TypeScript',
  runtimePlatform: 'Web browser, Node.js',
  description: SHORT_DESCRIPTION,
  url: `${ORIGIN}/`,
  downloadUrl: NPM_URL,
  installUrl: NPM_URL,
  codeRepository: REPO_URL,
  license: 'https://github.com/SSShooter/mind-elixir-core/blob/master/LICENSE',
  image: `${ORIGIN}/img/og-image.png`,
  screenshot: `${ORIGIN}/img/screenshot.png`,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: { '@id': `${ORIGIN}/#organization` },
  publisher: { '@id': `${ORIGIN}/#organization` },
}

const LOCALE_PREFIXES = ['/zh-Hans', '/ja']

function stripLocale(pathname: string) {
  for (const prefix of LOCALE_PREFIXES) {
    if (pathname === prefix) return '/'
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length)
  }
  return pathname
}

export default function Root({ children }: { children: ReactNode }) {
  const { siteConfig, i18n } = useDocusaurusContext()
  const { pathname } = useLocation()
  const path = stripLocale(pathname)
  const isHome = path === '/' || path === ''

  const graph: Record<string, unknown>[] = [
    organization,
    {
      '@type': 'WebSite',
      '@id': `${ORIGIN}/#website`,
      url: `${ORIGIN}/`,
      name: siteConfig.title,
      description: SHORT_DESCRIPTION,
      inLanguage: i18n.currentLocale,
      publisher: { '@id': `${ORIGIN}/#organization` },
    },
  ]

  if (isHome) {
    graph.push(software)
    graph.push({
      '@type': 'ItemList',
      name: 'Mind Elixir products',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Mind Elixir App',
          url: APP_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Mind Elixir Desktop',
          url: DESKTOP_URL,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Mind Elixir Cloud',
          url: CLOUD_URL,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Mind Elixir Core',
          url: `${ORIGIN}/`,
        },
      ],
    })
  }

  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c')

  return (
    <>
      <Head>
        <script type="application/ld+json">{json}</script>
      </Head>
      {children}
    </>
  )
}
