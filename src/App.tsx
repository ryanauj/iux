import { useEffect, useState } from 'react'
import { findDemo } from './demos'
import Hub from './shell/Hub'
import DemoShell from './shell/DemoShell'
import ThemeSelector from './lib/theme/ThemeSelector'

function parseHash(): string {
  return window.location.hash.replace(/^#\/?/, '')
}

export default function App() {
  const [route, setRoute] = useState<string>(parseHash)

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const demo = route ? findDemo(route) : undefined

  return (
    <div className='app'>
      <header className='app__header'>
        <a className='app__logo' href='#/'>iux</a>
        <span className='app__tagline'>
          example sites against an in-browser fake server.
        </span>
        <div className='app__header-controls'>
          <ThemeSelector scope='global' />
        </div>
      </header>
      <main className='app__main'>
        {route === '' && <Hub />}
        {route !== '' && demo && <DemoShell demo={demo} />}
        {route !== '' && !demo && (
          <div className='not-found'>
            <p>
              No demo at <code>#/{route}</code>.{' '}
              <a href='#/'>back to demos</a>
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
