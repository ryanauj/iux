import { useEffect, useMemo, useRef, useState } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { COMPONENTS, type Component } from '../showcase/components'
import { PaletteShowcase, type ShowcaseLayout } from '../showcase/PaletteShowcase'
import '../showcase/showcase.css'
import { DraggableControls, type ControlsStyle, type Field } from '../components/DraggableControls/DraggableControls'

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

const URL_PARAM = {
  view: 'view',
  component: 'component',
  variant: 'variant',
  palette: 'palette',
  chrome: 'chrome',
  showcasePalette: 'showcase',
  layout: 'layout',
  motion: 'motion',
  controls: 'controls',
} as const

const DEFAULTS = {
  view: 'per-component' as ViewMode,
  component: 'button' as Component,
  variant: 'all' as VariantChoice,
  palette: 'flat-classic' as PaletteChoice,
  chrome: 'flat-classic' as PaletteId,
  showcasePalette: 'flat-classic' as PaletteId,
  layout: 'feed' as ShowcaseLayout,
  motion: 2,
  controls: 'button' as ControlsStyle,
}

const isComponentId = (v: string): v is Component =>
  COMPONENTS.some(c => c.id === v)
const isPaletteId = (v: string): v is PaletteId =>
  (PALETTE_IDS as string[]).includes(v)
const isLayoutId = (v: string): v is ShowcaseLayout =>
  LAYOUTS.some(l => l.value === v)

type UrlSettings = {
  view: ViewMode
  component: Component
  variant: VariantChoice
  palette: PaletteChoice
  chrome: PaletteId
  showcasePalette: PaletteId
  layout: ShowcaseLayout
  motion: number
  controls: ControlsStyle
}

function readUrlSettings(): UrlSettings {
  if (typeof window === 'undefined') return { ...DEFAULTS }
  const p = new URL(window.location.href).searchParams
  const viewRaw = p.get(URL_PARAM.view) ?? ''
  const view: ViewMode = viewRaw === 'per-palette' ? 'per-palette' : DEFAULTS.view
  const componentRaw = p.get(URL_PARAM.component) ?? ''
  const component = isComponentId(componentRaw) ? componentRaw : DEFAULTS.component
  const entry = COMPONENTS.find(c => c.id === component)
  const variantRaw = p.get(URL_PARAM.variant) ?? ''
  const variant: VariantChoice =
    variantRaw && entry?.variants.includes(variantRaw) ? variantRaw : DEFAULTS.variant
  const paletteRaw = p.get(URL_PARAM.palette) ?? ''
  const palette: PaletteChoice =
    paletteRaw === 'all' ? 'all' : isPaletteId(paletteRaw) ? paletteRaw : DEFAULTS.palette
  const chromeRaw = p.get(URL_PARAM.chrome) ?? ''
  const chrome: PaletteId = isPaletteId(chromeRaw) ? chromeRaw : DEFAULTS.chrome
  const showcaseRaw = p.get(URL_PARAM.showcasePalette) ?? ''
  const showcasePalette: PaletteId = isPaletteId(showcaseRaw) ? showcaseRaw : DEFAULTS.showcasePalette
  const layoutRaw = p.get(URL_PARAM.layout) ?? ''
  const layout: ShowcaseLayout = isLayoutId(layoutRaw) ? layoutRaw : DEFAULTS.layout
  const motionRaw = Number(p.get(URL_PARAM.motion))
  const motion: number = MOTION_SCALES.some(s => s.value === motionRaw) ? motionRaw : DEFAULTS.motion
  const controlsRaw = p.get(URL_PARAM.controls) ?? ''
  const controls: ControlsStyle =
    controlsRaw === 'strip' || controlsRaw === 'button' ? controlsRaw : DEFAULTS.controls
  return { view, component, variant, palette, chrome, showcasePalette, layout, motion, controls }
}

export function Stories() {
  const initial = useMemo(readUrlSettings, [])
  const [viewMode, setViewMode] = useState<ViewMode>(initial.view)
  const [component, setComponent] = useState<Component>(initial.component)
  const [paletteChoice, setPaletteChoice] = useState<PaletteChoice>(initial.palette)
  const [showcasePaletteId, setShowcasePaletteId] = useState<PaletteId>(initial.showcasePalette)
  const [layout, setLayout] = useState<ShowcaseLayout>(initial.layout)
  const [chromePaletteId, setChromePaletteId] = useState<PaletteId>(initial.chrome)
  const [motionScale, setMotionScale] = useState<number>(initial.motion)
  const [variantChoice, setVariantChoice] = useState<VariantChoice>(initial.variant)
  const [infoOpen, setInfoOpen] = useState<boolean>(false)
  const [controlsStyle, setControlsStyle] = useState<ControlsStyle>(initial.controls)

  useEffect(() => {
    const url = new URL(window.location.href)
    const sync = (key: string, value: string, fallback: string) => {
      if (value === fallback) url.searchParams.delete(key)
      else url.searchParams.set(key, value)
    }
    sync(URL_PARAM.view, viewMode, DEFAULTS.view)
    sync(URL_PARAM.component, component, DEFAULTS.component)
    sync(URL_PARAM.variant, variantChoice, DEFAULTS.variant)
    sync(URL_PARAM.palette, paletteChoice, DEFAULTS.palette)
    sync(URL_PARAM.chrome, chromePaletteId, DEFAULTS.chrome)
    sync(URL_PARAM.showcasePalette, showcasePaletteId, DEFAULTS.showcasePalette)
    sync(URL_PARAM.layout, layout, DEFAULTS.layout)
    sync(URL_PARAM.motion, String(motionScale), String(DEFAULTS.motion))
    sync(URL_PARAM.controls, controlsStyle, DEFAULTS.controls)
    const next = url.toString()
    if (next !== window.location.href) {
      window.history.replaceState(window.history.state, '', next)
    }
  }, [
    viewMode,
    component,
    variantChoice,
    paletteChoice,
    chromePaletteId,
    showcasePaletteId,
    layout,
    motionScale,
    controlsStyle,
  ])

  useEffect(() => {
    const onPop = () => {
      const s = readUrlSettings()
      setViewMode(s.view)
      setComponent(s.component)
      setVariantChoice(s.variant)
      setPaletteChoice(s.palette)
      setChromePaletteId(s.chrome)
      setShowcasePaletteId(s.showcasePalette)
      setLayout(s.layout)
      setMotionScale(s.motion)
      setControlsStyle(s.controls)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

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

  const viewField: Field = {
    key: 'view',
    label: 'View',
    short: 'W',
    value: viewMode,
    options: [
      { value: 'per-component', label: 'Per-component (one × all palettes)' },
      { value: 'per-palette', label: 'Per-palette (all components × one)' },
    ],
    onChange: v => setViewMode(v as ViewMode),
  }

  const motionField: Field = {
    key: 'motion',
    label: 'Motion',
    short: 'M',
    value: String(motionScale),
    options: MOTION_SCALES.map(s => ({ value: String(s.value), label: s.label })),
    onChange: v => setMotionScale(Number(v)),
  }

  const fields: Field[] = viewMode === 'per-component'
    ? [
        viewField,
        {
          key: 'component',
          label: 'Component',
          short: 'C',
          value: component,
          options: COMPONENTS.map(c => ({ value: c.id, label: c.label })),
          onChange: v => handleComponentChange(v as Component),
        },
        {
          key: 'variant',
          label: 'Variant',
          short: 'V',
          value: variantChoice,
          options: [
            { value: 'all', label: 'All variants' },
            ...(active?.variants.map(v => ({ value: v, label: v })) ?? []),
          ],
          onChange: v => setVariantChoice(v as VariantChoice),
        },
        {
          key: 'palette',
          label: 'Palette',
          short: 'P',
          value: paletteChoice,
          options: [
            { value: 'all', label: 'All palettes' },
            ...PALETTE_IDS.map(id => ({ value: id, label: `${palettes[id].name} (${palettes[id].engine})` })),
          ],
          onChange: v => handlePaletteChange(v as PaletteChoice),
        },
        motionField,
      ]
    : [
        viewField,
        {
          key: 'palette',
          label: 'Palette',
          short: 'P',
          value: showcasePaletteId,
          options: PALETTE_IDS.map(id => ({ value: id, label: `${palettes[id].name} (${palettes[id].engine})` })),
          onChange: v => handleShowcasePaletteChange(v as PaletteId),
        },
        {
          key: 'layout',
          label: 'Layout',
          short: 'L',
          value: layout,
          options: LAYOUTS.map(l => ({ value: l.value, label: l.label })),
          onChange: v => setLayout(v as ShowcaseLayout),
        },
        motionField,
      ]

  return (
    <PaletteRoot palette={chromePalette} as="section" motionScale={motionScale}>
      <main className="stories">
        <header className="stories__header stories__header--static">
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
            <a className="stories__apps-link" href="#/apps">Apps →</a>
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
              from. Use the floating controls (drag to reposition) to switch
              view, component, variant, palette, layout, and motion.
            </div>
          )}
        </header>
        <DraggableControls
          style={controlsStyle}
          onStyleChange={setControlsStyle}
          fields={fields}
        />

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
