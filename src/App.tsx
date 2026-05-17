import { useEffect, useState } from 'react'
import ThemesTab from './tabs/ThemesTab'
import ComponentsTab from './tabs/ComponentsTab'
import LayoutsTab from './tabs/LayoutsTab'

type TabId = 'themes' | 'components' | 'layouts'

const TAB_IDS: TabId[] = ['themes', 'components', 'layouts']

function parseHash(): TabId {
  const raw = window.location.hash.replace(/^#/, '')
  return (TAB_IDS as string[]).includes(raw) ? (raw as TabId) : 'themes'
}

export default function App() {
  const [tab, setTab] = useState<TabId>(parseHash)

  useEffect(() => {
    const onHashChange = () => setTab(parseHash())
    window.addEventListener('hashchange', onHashChange)
    if (!window.location.hash) window.location.hash = 'themes'
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div className='sg-app'>
      <header className='sg-header'>
        <h1>Style Gallery — curated themes, components, and layouts.</h1>
      </header>
      <nav className='sg-tabs' role='tablist'>
        {TAB_IDS.map((id) => (
          <button
            key={id}
            type='button'
            role='tab'
            aria-selected={tab === id}
            className={`sg-tab ${tab === id ? 'sg-tab--active' : ''}`}
            onClick={() => {
              window.location.hash = id
            }}
          >
            {id}
          </button>
        ))}
      </nav>
      <main className='sg-main'>
        {tab === 'themes' && <ThemesTab />}
        {tab === 'components' && <ComponentsTab />}
        {tab === 'layouts' && <LayoutsTab />}
      </main>
    </div>
  )
}
