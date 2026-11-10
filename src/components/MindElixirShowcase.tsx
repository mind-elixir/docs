import { useEffect, useId, useRef } from 'react'
import { useColorMode, type ColorMode } from '@docusaurus/theme-common'
import example from 'mind-elixir/example'
import type MindElixir from 'mind-elixir'
import type { MindElixirData, Theme } from 'mind-elixir'
import 'mind-elixir/style.css'
import { md2html } from '../utils/md2html'

type ThemePair = { light: Theme; dark: Theme }

// Docusaurus sets data-theme in <head> before hydration, while useColorMode()
// intentionally lags one render. Prefer the attribute for the initial paint so
// a dark-mode visit never flashes a light mind map.
function readColorMode(fallback: ColorMode): ColorMode {
  if (typeof document === 'undefined') return fallback
  const attr = document.documentElement.getAttribute('data-theme')
  return attr === 'dark' || attr === 'light' ? attr : fallback
}

export default function MindElixirShowcase({
  height,
  data,
}: {
  height?: string
  data?: MindElixirData
}) {
  const reactId = useId()
  const mapId = `map-${reactId.replace(/:/g, '')}`
  const { colorMode } = useColorMode()
  const colorModeRef = useRef(colorMode)
  colorModeRef.current = colorMode

  const mindRef = useRef<MindElixir | null>(null)
  const themesRef = useRef<ThemePair | null>(null)
  const appliedModeRef = useRef<ColorMode>(colorMode)
  const readyRef = useRef(false)

  useEffect(() => {
    let cancelled = false
    readyRef.current = false

    import('mind-elixir').then(async ({ default: MindElixirCtor, THEME, DARK_THEME }) => {
      if (cancelled) return
      const el = document.getElementById(mapId)
      if (!el) return
      el.innerHTML = ''

      // init() applies `data.theme` over the constructor's `theme` option, so
      // the chosen theme has to be injected into the data. Keep the data's own
      // light theme (the bundled example ships a "Latte" palette) intact.
      const source: MindElixirData = data || example
      const themes: ThemePair = {
        light: source.theme ?? THEME,
        dark: DARK_THEME,
      }
      const mode = readColorMode(colorModeRef.current)
      appliedModeRef.current = mode
      themesRef.current = themes

      const mind = new MindElixirCtor({
        el,
        // Enable Markdown + LaTeX rendering (same approach as the Mind Elixir App)
        markdown: md2html,
      })
      mindRef.current = mind
      await mind.init({ ...source, theme: mode === 'dark' ? themes.dark : themes.light })
      if (cancelled) return
      readyRef.current = true

      // Apply a mode change that happened while the map was initializing.
      const latest = readColorMode(colorModeRef.current)
      if (latest !== appliedModeRef.current) {
        appliedModeRef.current = latest
        mind.changeTheme(latest === 'dark' ? themes.dark : themes.light)
      }
    })

    return () => {
      cancelled = true
      readyRef.current = false
      const el = document.getElementById(mapId)
      if (el) el.innerHTML = ''
      mindRef.current = null
      themesRef.current = null
    }
  }, [mapId, data])

  useEffect(() => {
    const mind = mindRef.current
    const themes = themesRef.current
    if (appliedModeRef.current === colorMode) return
    // Not initialized yet: the init effect catches up once the map is ready.
    if (!readyRef.current || !mind || !themes) return
    appliedModeRef.current = colorMode
    mind.changeTheme(colorMode === 'dark' ? themes.dark : themes.light)
  }, [colorMode])

  return (
    <div
      id={mapId}
      className="me-showcase"
      style={{ height: height || '500px', width: '100%' }}
    ></div>
  )
}
