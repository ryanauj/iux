import { useEffect, useRef, useState } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { COMPONENTS, type Component } from '../showcase/components'
import { PaletteShowcase, type ShowcaseLayout } from '../showcase/PaletteShowcase'
import '../showcase/showcase.css'

const PALETTE_IDS = Object.keys(palettes) as PaletteId[]

type ViewMode = 'per-component' | 'per-palette'
type PaletteChoice = 'all' | PaletteId
type VariantChoice = 'all' | string

const MOTION_SCALES = [
  { value: 1, label: '1× (palette default)' },
  { value: 2, label: '2× (slower)' },
  { value: 3, label: '3× (slowest)' },
  { value: 5, label: '5× (debug)' },
] as const

const LAYOUTS: { value: ShowcaseLayout; label: string }[] = [
  { value: 'feed', label: 'Feed — stacked masonry' },
  { value: 'deck', label: 'Deck — swipeable variants' },
  { value: 'grid', label: 'Grid — tap-to-expand tiles' },
]

export function Stories() {
  const [viewMode, setViewMode] = useState<ViewMode>('per-component')
  const [component, setComponent] = useState<Component>('button')
  const [paletteChoice, setPaletteChoice] = useState<PaletteChoice>('all')
  const [showcasePaletteId, setShowcasePaletteId] = useState<PaletteId>('flat-classic')
  const [layout, setLayout] = useState<ShowcaseLayout>('feed')
  const [chromePaletteId, setChromePaletteId] = useState<PaletteId>('flat-classic')
  const [motionScale, setMotionScale] = useState<number>(2)
  const [controlsOpen, setControlsOpen] = useState<boolean>(true)
  const [variantChoice, setVariantChoice] = useState<VariantChoice>('all')
  const [infoOpen, setInfoOpen] = useState<boolean>(false)

  const active = COMPONENTS.find(c => c.id === component)
  const visiblePaletteIds: PaletteId[] =
    paletteChoice === 'all' ? PALETTE_IDS : [paletteChoice]
  const chromePalette = palettes[chromePaletteId]
  const activeVariant =
    variantChoice !== 'all' && active?.variants.includes(variantChoice)
      ? variantChoice
      : undefined

  const handleComponentChange = (next: Component) => {
    setComponent(next)
    setVariantChoice('all')
  }

  const handlePaletteChange = (next: PaletteChoice) => {
    setPaletteChoice(next)
    if (next !== 'all') setChromePaletteId(next)
  }

  const handleShowcasePaletteChange = (next: PaletteId) => {
    setShowcasePaletteId(next)
    setChromePaletteId(next)
  }

  const infoBtnRef = useRef<HTMLButtonElement>(null)
  const infoPopRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!infoOpen) return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        infoBtnRef.current?.contains(target) ||
        infoPopRef.current?.contains(target)
      ) return
      setInfoOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInfoOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [infoOpen])

  return (
    <PaletteRoot palette={chromePalette} as="section" motionScale={motionScale}>
      <main className="stories">
        <header className={`stories__header${controlsOpen ? '' : ' stories__header--collapsed'}`}>
          <div className="stories__header-bar">
            <h1 className="stories__title">
              iux — component stories
              <button
                ref={infoBtnRef}
                type="button"
                className="stories__info-btn"
                aria-label="About this page"
                aria-expanded={infoOpen}
                aria-controls="stories-info-popover"
                onClick={() => setInfoOpen(o => !o)}
              >
                i
              </button>
            </h1>
            <button
              type="button"
              className="stories__toggle"
              aria-expanded={controlsOpen}
              aria-controls="stories-controls"
              onClick={() => setControlsOpen(o => !o)}
            >
              {controlsOpen ? 'Hide controls' : 'Show controls'}
            </button>
          </div>
          {infoOpen && (
            <div
              ref={infoPopRef}
              id="stories-info-popover"
              role="region"
              aria-label="About this page"
              className="stories__info-popover"
            >
              Components implemented against the semantic token contract. The
              <em> per-component </em> view shows one component across every
              palette; the <em> per-palette </em> view shows every component
              inside one palette, with three responsive layouts to choose
              from.
            </div>
          )}
          <div
            id="stories-controls"
            className="stories__header-body"
            hidden={!controlsOpen}
          >
            <div className="stories__controls">
              <label className="stories__control">
                <span className="stories__control-label">View</span>
                <select
                  className="stories__control-select"
                  value={viewMode}
                  onChange={e => setViewMode(e.target.value as ViewMode)}
                >
                  <option value="per-component">Per-component (one × all palettes)</option>
                  <option value="per-palette">Per-palette (all components × one)</option>
                </select>
              </label>

              {viewMode === 'per-component' && (
                <>
                  <label className="stories__control">
                    <span className="stories__control-label">Component</span>
                    <select
                      className="stories__control-select"
                      value={component}
                      onChange={e => handleComponentChange(e.target.value as Component)}
                    >
                      {COMPONENTS.map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </label>
                  <label className="stories__control">
                    <span className="stories__control-label">Variant</span>
                    <select
                      className="stories__control-select"
                      value={variantChoice}
                      onChange={e => setVariantChoice(e.target.value as VariantChoice)}
                    >
                      <option value="all">All variants</option>
                      {active?.variants.map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </label>
                  <label className="stories__control">
                    <span className="stories__control-label">Palette</span>
                    <select
                      className="stories__control-select"
                      value={paletteChoice}
                      onChange={e => handlePaletteChange(e.target.value as PaletteChoice)}
                    >
                      <option value="all">All palettes</option>
                      {PALETTE_IDS.map(id => (
                        <option key={id} value={id}>
                          {palettes[id].name} ({palettes[id].engine})
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              {viewMode === 'per-palette' && (
                <>
                  <label className="stories__control">
                    <span className="stories__control-label">Palette</span>
                    <select
                      className="stories__control-select"
                      value={showcasePaletteId}
                      onChange={e => handleShowcasePaletteChange(e.target.value as PaletteId)}
                    >
                      {PALETTE_IDS.map(id => (
                        <option key={id} value={id}>
                          {palettes[id].name} ({palettes[id].engine})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="stories__control">
                    <span className="stories__control-label">Layout</span>
                    <select
                      className="stories__control-select"
                      value={layout}
                      onChange={e => setLayout(e.target.value as ShowcaseLayout)}
                    >
                      {LAYOUTS.map(l => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                      ))}
                    </select>
                  </label>
                </>
              )}

              <label className="stories__control">
                <span className="stories__control-label">Motion speed</span>
                <select
                  className="stories__control-select"
                  value={motionScale}
                  onChange={e => setMotionScale(Number(e.target.value))}
                >
                  {MOTION_SCALES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </header>

        {viewMode === 'per-component' &&
          visiblePaletteIds.map(id => {
            const palette = palettes[id]
            return (
              <PaletteRoot
                key={id}
                palette={palette}
                as="section"
                className="stories__palette"
                motionScale={motionScale}
              >
                <h2 className="stories__palette-title">
                  {palette.name} <small>({palette.engine})</small>
                </h2>
                {active?.render(activeVariant)}
              </PaletteRoot>
            )
          })}

        {viewMode === 'per-palette' && (
          <PaletteShowcase
            palette={palettes[showcasePaletteId]}
            layout={layout}
            motionScale={motionScale}
          />
        )}
      </main>
    </PaletteRoot>
  )
}
