import { CATALOG } from '../catalog'
import LayoutPreview from '../preview/LayoutPreview'
import CopySnippet from '../preview/CopySnippet'

export default function LayoutsTab() {
  return (
    <section className='sg-grid'>
      {CATALOG.layouts.map((entry) => (
        <article key={entry.id} className='sg-card'>
          <header className='sg-card__header'>
            <h3>{entry.name}</h3>
            <code className='sg-id'>{entry.config.container} · {entry.id}</code>
          </header>
          <p className='sg-notes'>{entry.usage_notes}</p>
          <div className='sg-preview'>
            <LayoutPreview entry={entry} />
          </div>
          <CopySnippet snippet={entry.snippet} />
        </article>
      ))}
    </section>
  )
}
