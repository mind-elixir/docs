import React from 'react'
import Head from '@docusaurus/Head'
import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { PageMetadata } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import DocItemMetadata from '@theme-original/DocItem/Metadata'
import { useApiSeoEntry } from '@site/src/apiSeo'

const ORIGIN = 'https://docs.mind-elixir.com'
const LOCALE_PREFIXES = ['/zh-Hans', '/ja']

function localeRootOf(pathname: string) {
  for (const prefix of LOCALE_PREFIXES) {
    if (pathname === prefix) return prefix
    if (pathname.startsWith(`${prefix}/`)) return prefix
  }
  return ''
}

export default function DocItemMetadataWrapper() {
  const { i18n } = useDocusaurusContext()
  const { pathname } = useLocation()
  const { metadata, frontMatter, assets } = useDoc()
  const apiEntry = useApiSeoEntry()

  const title = apiEntry?.title ?? metadata.title
  const description = apiEntry?.description ?? metadata.description
  const keywords = apiEntry?.keywords ?? frontMatter.keywords

  const localeRoot = localeRootOf(pathname)
  const pageUrl = `${ORIGIN}${localeRoot}${metadata.permalink.replace(
    /^(?:\/zh-Hans|\/ja)(?=\/)/,
    '',
  )}`

  const graph = [
    {
      '@type': 'TechArticle',
      '@id': `${pageUrl}#article`,
      headline: title,
      description,
      url: pageUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      inLanguage: i18n.currentLocale,
      isPartOf: { '@id': `${ORIGIN}/#website` },
      author: { '@id': `${ORIGIN}/#organization` },
      publisher: { '@id': `${ORIGIN}/#organization` },
      about: {
        '@type': 'SoftwareApplication',
        name: 'Mind Elixir Core',
        applicationCategory: 'DeveloperApplication',
        url: `${ORIGIN}/`,
      },
    },
  ]

  const json = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c')

  return (
    <>
      {apiEntry ? (
        <PageMetadata
          title={title}
          description={description}
          keywords={keywords}
          image={assets.image ?? frontMatter.image}
        />
      ) : (
        <DocItemMetadata />
      )}
      <Head>
        <script type="application/ld+json">{json}</script>
      </Head>
    </>
  )
}
