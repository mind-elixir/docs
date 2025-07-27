import { useEffect } from 'react'
import example from 'mind-elixir/example'
import { MindElixirData } from 'mind-elixir'
import 'mind-elixir/style.css'

export default function MindElixirShowcase({
  height,
  data,
}: {
  height?: string
  data?: MindElixirData
}): JSX.Element {
  useEffect(() => {
    import('mind-elixir').then((MindElixir) => {
      let options = {
        el: '#map', // or HTMLDivElement
      }
      let mind = new MindElixir.default(options)
      mind.init(data || example)
    })
  })
  return (
    <div
      id="map"
      className="me-showcase"
      style={{ height: height || '500px', width: '100%' }}
    ></div>
  )
}
