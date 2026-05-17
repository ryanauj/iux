import { CATALOG } from '../catalog'
import ComponentPreview from '../preview/ComponentPreview'
import CopySnippet from '../preview/CopySnippet'

export default function ComponentsTab() {
  return (
    <section className='sg-grid'>
      {CATALOG.components.map((entry) => (
        <article key={entry.id} className='sg-card'>
          <header className='sg-card__header'>
            <h3>{entry.name}</h3>
            <code className='sg-id'>{entry.kind} · {entry.id}</code>
          </header>
          <p className='sg-notes'>{entry.usage_notes}</p>
          <div className='sg-preview'>
            <ComponentPreview entry={entry} />
          </div>
          <CopySnippet snippet={entry.snippet} />
        </article>
      ))}
    </section>
  )
}
