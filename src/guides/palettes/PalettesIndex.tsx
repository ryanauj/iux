// ABOUTME: Landing page at /palettes — lists every registered palette grouped by engine, linking each to its /palettes/:id/design page with a one-line tagline teaser, and shows how many of the total have structured descriptions so far.

/**
 * Landing page at `/palettes`. Lists every palette grouped by engine
 * with a link to its per-palette design page. Mirrors `EnginesIndex`.
 */
import { Link } from 'react-router-dom'
import { palettes, type PaletteId } from '../../../palettes'
import { descriptions } from '../../../palettes/descriptions'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { useSelectedStyle } from '../../lib/persistedStyle'
import { resolveStyle } from '../../lib/customPatterns'
import { AppShell } from '../../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../../components/AppShell/navLinks'
import { useNavLayout } from '../../components/AppShell/navLayouts'
import type { Engine } from '../../../tokens/semantic.contract'
import './palettes.css'

interface Group {
  engine: Engine
  ids: PaletteId[]
}

function groupByEngine(): Group[] {
  const groups = new Map<Engine, PaletteId[]>()
  for (const id of Object.keys(palettes) as PaletteId[]) {
    const engine = palettes[id].engine
    if (!groups.has(engine)) groups.set(engine, [])
    groups.get(engine)!.push(id)
  }
  return Array.from(groups.entries())
    .map(([engine, ids]) => ({ engine, ids: ids.sort((a, b) => palettes[a].name.localeCompare(palettes[b].name)) }))
    .sort((a, b) => a.engine.localeCompare(b.engine))
}

// ABOUTME: PalettesIndex — the /palettes index page: groups all palettes by engine using the palettes registry, renders each group as a section with engine-keyed headings, and links each entry to its design doc, falling back to "Description pending" for palettes without a structured descriptions entry.
export function PalettesIndex() {
  const [navLayout] = useNavLayout()
  const [selectedStyle] = useSelectedStyle()
  const groups = groupByEngine()
  const total = Object.keys(palettes).length
  const populated = Object.keys(descriptions).length

  const brand = <h1 className="iux-palette-page__brand-title">iux — palettes</h1>

  return (
    <PaletteRoot palette={resolveStyle(selectedStyle)} as="section" className="iux-palette-page-shell">
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="palettes"
      >
        <main className="iux-palettes-index">
          <nav className="iux-palette-page__crumbs" aria-label="Breadcrumb">
            <Link to="/" className="iux-palette-page__crumb">Stories</Link>
            <span className="iux-palette-page__crumb-sep" aria-hidden="true">/</span>
            <span className="iux-palette-page__crumb iux-palette-page__crumb--current" aria-current="page">
              Palettes
            </span>
          </nav>

          <header className="iux-palette-page__header">
            <p className="iux-palette-page__eyebrow">Design docs · all palettes</p>
            <h1 className="iux-palette-page__title">Palette design docs</h1>
            <p className="iux-palette-page__summary">
              One page per palette: structured prose (signatures, anti-signatures,
              token evidence, lookalikes), a copy-pasteable CSS custom-properties
              block external projects can drop into their stylesheet, and a
              "Copy as markdown" button that emits the same text as the
              <code>docs/styles/</code> tree. {populated} of {total} palettes
              have structured descriptions today.
            </p>
          </header>

          {groups.map(g => (
            <section key={g.engine} className="iux-palettes-index__group">
              <h2 className="iux-palettes-index__group-title">
                <code>{g.engine}</code>
                <span className="iux-palettes-index__group-count">
                  {g.ids.length} palette{g.ids.length === 1 ? '' : 's'}
                </span>
              </h2>
              <ul className="iux-palettes-index__list">
                {g.ids.map(id => {
                  const desc = descriptions[id]
                  return (
                    <li key={id} className="iux-palettes-index__item">
                      <Link to={`/palettes/${id}/design`} className="iux-palettes-index__link">
                        <span className="iux-palettes-index__name">{palettes[id].name}</span>
                        <span className="iux-palettes-index__teaser">
                          {desc?.tagline ?? 'Description pending. CSS variables are available.'}
                        </span>
                        <span className="iux-palettes-index__cta" aria-hidden="true">
                          View design doc →
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </main>
      </AppShell>
    </PaletteRoot>
  )
}
