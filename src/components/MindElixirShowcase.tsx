import { useEffect } from 'react'
import example from 'mind-elixir/example'

export default function MindElixirShowcase({
  height,
}: {
  height?: string
}): JSX.Element {
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
    <div
      id="map"
      className="me-showcase"
      style={{
        height: height || '800px',
        width: '100%',
      }}
    ></div>
  )
}
