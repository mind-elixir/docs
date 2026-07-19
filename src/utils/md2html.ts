import { marked, Tokens } from 'marked'
import katex from 'katex'
import 'katex/contrib/mhchem'
import 'katex/dist/katex.min.css'

let markedReady = false

function ensureMarked() {
  if (markedReady) return
  const renderer = {
    strong(token: Tokens.Strong) {
      // Color syntax: **%:color:content** or __%:color:content__
      let color = ''
      let content = token.text
      if (token.text.startsWith('%:')) {
        const rest = token.text.slice(2)
        const colonIndex = rest.indexOf(':')
        if (colonIndex > 0) {
          color = rest.slice(0, colonIndex)
          content = rest.slice(colonIndex + 1)
        }
      }
      if (token.raw.startsWith('__')) {
        return `<strong class="underscore" style="background-color: ${color};">${content}</strong>`
      }
      return `<strong class="asterisk" style="color: ${color};">${content}</strong>`
    },
    link(token: Tokens.Link) {
      const href = token.href || ''
      const title = token.title ? ` title="${token.title}"` : ''
      const textContent = token.text || ''
      return `<a href="${href}"${title} target="_blank" rel="noopener noreferrer">${textContent}</a>`
    },
  }
  marked.use({ renderer, gfm: true })
  markedReady = true
}

/**
 * Convert Markdown (with optional KaTeX math) to HTML for Mind Elixir's
 * `markdown` option. Pattern aligned with mind-elixir-desktop.
 */
export function md2html(text: string): string {
  if (!text) return ''
  try {
    ensureMarked()

    // Display math: $$...$$
    let source = text.replace(/\$\$([^$]+)\$\$/g, (_, math: string) => {
      return katex.renderToString(math.trim(), {
        displayMode: true,
        output: 'html',
        throwOnError: false,
      })
    })

    // Inline math: $...$
    source = source.replace(/\$([^$]+)\$/g, (_, math: string) => {
      return katex.renderToString(math.trim(), {
        displayMode: false,
        output: 'html',
        throwOnError: false,
      })
    })

    const html = marked.parse(source) as string
    return html.trim()
  } catch (error) {
    console.error('md2html error', error)
    return text
  }
}
