import { Link } from 'react-router-dom'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { buildPaletteField, useSelectedStyle } from '../../lib/persistedStyle'
import { resolveStyle } from '../../lib/customPatterns'
import { useDocMode } from '../../lib/useDocMode'
import { DocModeToggle } from '../../components/DocModeToggle/DocModeToggle'
import { ENGINE_GUIDES, ENGINE_GUIDE_IDS } from './registry'
import { AppShell } from '../../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../../components/AppShell/navLinks'
import {
  NAV_LAYOUT_OPTIONS,
  useNavLayout,
  type NavLayoutId,
} from '../../components/AppShell/navLayouts'
import {
  DraggableControls,
  useControlsStyle,
  type Field,
} from '../../components/DraggableControls/DraggableControls'
import './guides.css'

const ALL_ENGINES: { id: string; name: string; available: boolean }[] = [
  { id: 'flat',         name: 'Flat',         available: true },
  { id: 'material',     name: 'Material',     available: true },
  { id: 'neubrutalism', name: 'Neubrutalism', available: true },
  { id: 'glassmorphism',name: 'Glassmorphism',available: true },
  { id: 'neumorphism',  name: 'Neumorphism',  available: true },
  { id: 'claymorphism', name: 'Claymorphism', available: true },
  { id: 'skeuomorphism',name: 'Skeuomorphism',available: true },
  { id: 'crt-phosphor', name: 'CRT / Phosphor', available: true },
  { id: 'pixel-art',    name: 'Pixel-art',    available: true },
  { id: 'sketch',       name: 'Sketch',       available: true },
  { id: 'cardstock',    name: 'Cardstock',    available: true },
  { id: 'cel-shaded',   name: 'Cel-shaded',   available: true },
  { id: 'cel-glass',    name: 'Cel-Glass',    available: true },
  { id: 'aurora',       name: 'Aurora',       available: true },
  { id: 'terminal-tui', name: 'Terminal / TUI', available: true },
]

export function EnginesIndex() {
  const [navLayout, setNavLayout] = useNavLayout()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()
  const [docMode, setDocMode] = useDocMode()
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const brand = (
    <h1 className="iux-engine-guide__brand-title">iux — engines</h1>
  )

  const chromeField: Field = buildPaletteField(selectedStyle, setSelectedStyle)
  const navLayoutField: Field = {
    key: 'navLayout',
    label: 'Nav',
    short: 'N',
    value: navLayout,
    options: NAV_LAYOUT_OPTIONS.map(o => ({ value: o.value, label: o.label })),
    onChange: v => setNavLayout(v as NavLayoutId),
  }
  const fields: Field[] = [chromeField, navLayoutField]
  return (
    <PaletteRoot palette={resolveStyle(selectedStyle)} as="section" className="iux-engine-guide-shell">
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="engines"
      >
        <main className="iux-engines-index">
          <DraggableControls
            style={controlsStyle}
            onStyleChange={setControlsStyle}
            fields={fields}
          />
          <nav className="iux-engine-guide__crumbs" aria-label="Breadcrumb">
            <Link to="/" className="iux-engine-guide__crumb">Stories</Link>
            <span className="iux-engine-guide__crumb-sep" aria-hidden="true">/</span>
            <span className="iux-engine-guide__crumb iux-engine-guide__crumb--current" aria-current="page">
              Engines
            </span>
          </nav>

          <header className="iux-engines-index__header">
            <div className="iux-engine-guide__header-top">
              <p className="iux-engine-guide__eyebrow">Rendering engines</p>
              <DocModeToggle value={docMode} onChange={setDocMode} />
            </div>
            <h1 className="iux-engine-guide__title">How the engines work</h1>
            <p className="iux-engine-guide__summary">
              {docMode === 'plain' ? (
                <>
                  An "engine" is the visual personality of a palette — the rules
                  that decide whether a card has shadows, whether buttons have
                  rounded corners, whether panels are see-through. Each palette
                  in this library belongs to one engine; pick one below to see
                  what makes it look the way it does, in everyday terms.
                </>
              ) : (
                <>
                  Engines are <em>philosophies</em> — rules for how each palette's
                  tokens get interpreted into a visual style. Every palette in the
                  showcase declares which engine it plugs into. Pick one below to walk
                  through its rules step by step, with live demos against a real
                  palette.
                </>
              )}
            </p>
          </header>

          <ul className="iux-engines-index__list">
            {ALL_ENGINES.map(e => {
              const enabled =
                e.available && (ENGINE_GUIDE_IDS as string[]).includes(e.id) &&
                Boolean(ENGINE_GUIDES[e.id as keyof typeof ENGINE_GUIDES])
              if (enabled) {
                const guide = ENGINE_GUIDES[e.id as keyof typeof ENGINE_GUIDES]
                const teaser =
                  docMode === 'plain'
                    ? (guide.plainTeaser ?? guide.plainSummary ?? guide.summary)
                    : guide.summary
                return (
                  <li key={e.id} className="iux-engines-index__item is-available">
                    <Link to={`/engines/${e.id}`} className="iux-engines-index__link">
                      <span className="iux-engines-index__name">{e.name}</span>
                      <span className="iux-engines-index__teaser">{teaser}</span>
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
