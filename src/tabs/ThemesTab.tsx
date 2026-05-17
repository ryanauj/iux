import { CATALOG } from '../catalog'

export default function ThemesTab() {
  return (
    <section className='sg-grid'>
      {CATALOG.themes.map((theme) => (
        <article key={theme.id} className='sg-card'>
          <header className='sg-card__header'>
            <h3>{theme.name}</h3>
            <code className='sg-id'>{theme.id}</code>
          </header>
          <p className='sg-notes'>{theme.usage_notes}</p>
          <div className='sg-swatch-row'>
            {Object.entries(theme.variables).map(([name, value]) => (
              <div key={name} className='sg-swatch' title={`${name}: ${value}`}>
                <span className='sg-swatch__color' style={{ background: value }} />
                <span className='sg-swatch__name'>{name}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  )
}
