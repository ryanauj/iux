import { useEffect, useState, type ReactNode } from 'react'
import { SettingsPlayground } from '../apps/SettingsPlayground'
import { Stories } from '../stories'
import { ThemeProvider } from './ThemeProvider'
import './Shell.css'

type AppId = 'settings' | 'gallery'

interface AppDef {
  id: AppId
  label: string
  /** True if the app brings its own palette switcher (Stories renders many palettes). */
  ownsPalette: boolean
  render: () => ReactNode
}

const APPS: AppDef[] = [
  { id: 'settings', label: 'Settings playground', ownsPalette: false, render: () => <SettingsPlayground /> },
  { id: 'gallery', label: 'Component gallery', ownsPalette: true, render: () => <Stories /> },
]

function readAppQuery(): AppId | null {
  if (typeof window === 'undefined') return null
  const v = new URL(window.location.href).searchParams.get('app')
  return v === 'settings' || v === 'gallery' ? v : null
}

function writeAppQuery(id: AppId) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set('app', id)
  window.history.replaceState({}, '', url.toString())
}

export function Shell() {
  const [appId, setAppId] = useState<AppId>(() => readAppQuery() ?? 'settings')

  useEffect(() => {
    writeAppQuery(appId)
  }, [appId])

  const app = APPS.find(a => a.id === appId) ?? APPS[0]

  return (
    <div className="iux-shell">
      <header className="iux-shell__header">
        <h1 className="iux-shell__brand">iux</h1>
        <nav className="iux-shell__nav" aria-label="Apps">
          {APPS.map(a => (
            <button
              key={a.id}
              type="button"
              className={[
                'iux-shell__nav-btn',
                a.id === appId && 'is-active',
              ].filter(Boolean).join(' ')}
              aria-current={a.id === appId ? 'page' : undefined}
              onClick={() => setAppId(a.id)}
            >
              {a.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="iux-shell__stage" key={app.id}>
        {/* The Settings playground (and future apps) live under a single
            PaletteRoot wrapping section driven by `theme:active`. The
            component gallery owns its own palette switcher, so we pass
            `bare` to skip the outer wrap. */}
        <ThemeProvider bare={app.ownsPalette}>
          {app.render()}
        </ThemeProvider>
      </main>
    </div>
  )
}
