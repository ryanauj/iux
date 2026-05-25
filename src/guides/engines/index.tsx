import { Link } from 'react-router-dom'
import { palettes } from '../../../palettes'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { useSelectedStyle } from '../../lib/persistedStyle'
import { ENGINE_GUIDES, ENGINE_GUIDE_IDS } from './registry'
import { AppShell } from '../../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../../components/AppShell/navLinks'
import { useNavLayout } from '../../components/AppShell/navLayouts'
import './guides.css'

const ALL_ENGINES: { id: string; name: string; available: boolean }[] = [
  { id: 'flat',         name: 'Flat',         available: true },
  { id: 'material',     name: 'Material',     available: true },
  { id: 'neubrutalism', name: 'Neubrutalism', available: true },
  { id: 'glassmorphism',name: 'Glassmorphism',available: true },
  { id: 'neumorphism',  name: 'Neumorphism',  available: false },
  { id: 'claymorphism', name: 'Claymorphism', available: false },
  { id: 'skeuomorphism',name: 'Skeuomorphism',available: false },
  { id: 'crt-phosphor', name: 'CRT / Phosphor', available: false },
  { id: 'pixel-art',    name: 'Pixel-art',    available: false },
  { id: 'sketch',       name: 'Sketch',       available: false },
  { id: 'cardstock',    name: 'Cardstock',    available: false },
  { id: 'cel-shaded',   name: 'Cel-shaded',   available: false },
  { id: 'aurora',       name: 'Aurora',       available: false },
  { id: 'terminal-tui', name: 'Terminal / TUI', available: false },
]

export function EnginesIndex() {
  const [navLayout] = useNavLayout()
  const [selectedStyle] = useSelectedStyle()
  const brand = (
    <h1 className="iux-engine-guide__brand-title">iux — engines</h1>
  )
  return (
    <PaletteRoot palette={palettes[selectedStyle]} as="section" className="iux-engine-guide-shell">
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="engines"
      >
        <main className="iux-engines-index">
          <nav className="iux-engine-guide__crumbs" aria-label="Breadcrumb">
            <Link to="/" className="iux-engine-guide__crumb">Stories</Link>
            <span className="iux-engine-guide__crumb-sep" aria-hidden="true">/</span>
            <span className="iux-engine-guide__crumb iux-engine-guide__crumb--current" aria-current="page">
              Engines
            </span>
          </nav>

          <header className="iux-engines-index__header">
            <p className="iux-engine-guide__eyebrow">Rendering engines</p>
            <h1 className="iux-engine-guide__title">How the engines work</h1>
            <p className="iux-engine-guide__summary">
              Engines are <em>philosophies</em> — rules for how each palette's
              tokens get interpreted into a visual style. Every palette in the
              showcase declares which engine it plugs into. Pick one below to walk
              through its rules step by step, with live demos against a real
              palette.
            </p>
          </header>

          <ul className="iux-engines-index__list">
            {ALL_ENGINES.map(e => {
              const enabled =
                e.available && (ENGINE_GUIDE_IDS as string[]).includes(e.id) &&
                Boolean(ENGINE_GUIDES[e.id as keyof typeof ENGINE_GUIDES])
              if (enabled) {
                const guide = ENGINE_GUIDES[e.id as keyof typeof ENGINE_GUIDES]
                return (
                  <li key={e.id} className="iux-engines-index__item is-available">
                    <Link to={`/engines/${e.id}`} className="iux-engines-index__link">
                      <span className="iux-engines-index__name">{e.name}</span>
                      <span className="iux-engines-index__teaser">{guide.summary}</span>
                      <span className="iux-engines-index__cta" aria-hidden="true">Start walkthrough →</span>
                    </Link>
                  </li>
                )
              }
              return (
                <li key={e.id} className="iux-engines-index__item is-pending" aria-disabled="true">
                  <span className="iux-engines-index__name">{e.name}</span>
                  <span className="iux-engines-index__teaser">Coming soon.</span>
                </li>
              )
            })}
          </ul>
        </main>
      </AppShell>
    </PaletteRoot>
  )
}
