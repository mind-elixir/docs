import { useEffect, useId, useRef } from 'react'
import example from 'mind-elixir/example'
import type { MindElixirData } from 'mind-elixir'
import 'mind-elixir/style.css'
import { md2html } from '../utils/md2html'

export default function MindElixirShowcase({
  height,
  data,
}: {
  height?: string
  data?: MindElixirData
}) {
  const reactId = useId()
  const mapId = `map-${reactId.replace(/:/g, '')}`
  const mindRef = useRef<{ destroy?: () => void } | null>(null)

  useEffect(() => {
    let cancelled = false
    import('mind-elixir').then((MindElixir) => {
      if (cancelled) return
      const el = document.getElementById(mapId)
      if (!el) return
      el.innerHTML = ''
      const mind = new MindElixir.default({
        el,
        // Enable Markdown + LaTeX rendering (same approach as mind-elixir-desktop)
        markdown: md2html,
      })
      mind.init(data || example)
      mindRef.current = mind
    })
    return () => {
      cancelled = true
      const el = document.getElementById(mapId)
      if (el) el.innerHTML = ''
      mindRef.current = null
    }
  }, [mapId, data])

  return (
    <div
      id={mapId}
      className="me-showcase"
      style={{ height: height || '500px', width: '100%' }}
    ></div>
  )
}
