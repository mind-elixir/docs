import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'

import styles from './index.module.css'
import { useEffect } from 'react'
import example from 'mind-elixir/example'

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
  useEffect(() => {
    import('mind-elixir').then((MindElixir) => {
      let options = {
        el: '#map', // or HTMLDivElement
      }
      let mind = new MindElixir.default(options)
      mind.init(example)
    })
  })
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      {/* <HomepageHeader /> */}
      <div
        id="map"
        style={{
          height: '800px',
          width: '100%',
        }}
      ></div>
      {/* <main>
        <HomepageFeatures />
      </main> */}
    </Layout>
  )
}
