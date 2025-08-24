import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'
import {translate} from '@docusaurus/Translate'

import styles from './index.module.css'
import MindElixirShowcase from '../components/MindElixirShowcase'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/intro"
          >
            Quick Start - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: `${siteConfig.title} - Professional JavaScript Mind Mapping Core`,
        description: 'The title of the homepage'
      })}
      description={translate({
        id: 'homepage.description',
        message: 'A powerful JavaScript mind mapping library for creating interactive mind maps',
        description: 'The description of the homepage'
      })}
    >
      <MindElixirShowcase height={'500px'} />
      <HomepageHeader />
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  )
}
