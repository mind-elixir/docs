import React, { type ReactNode } from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import Heading from '@theme/Heading'
import MDXContent from '@theme/MDXContent'
import { useApiSeoEntry } from '@site/src/apiSeo'

export default function DocItemContent({ children }: { children: ReactNode }) {
  const { metadata, frontMatter, contentTitle } = useDoc()
  const apiEntry = useApiSeoEntry()
  const shouldRenderTitle =
    !frontMatter.hide_title && typeof contentTitle === 'undefined'

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {shouldRenderTitle && (
        <header>
          <Heading as="h1">{apiEntry?.title ?? metadata.title}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  )
}
