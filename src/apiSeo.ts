import useGlobalData from '@docusaurus/useGlobalData'
import { useDoc } from '@docusaurus/plugin-content-docs/client'

export type ApiSeoEntry = {
  title: string
  description: string
  keywords: string[]
}

type ApiSeoGlobalData = {
  'api-seo'?: {
    default?: {
      pages?: Record<string, ApiSeoEntry>
    }
  }
}

export function useApiSeoEntry(): ApiSeoEntry | undefined {
  const { metadata } = useDoc()
  const globalData = useGlobalData() as ApiSeoGlobalData
  const key = metadata.id.split('/').pop()

  if (!key) return undefined
  return globalData['api-seo']?.default?.pages?.[key]
}
