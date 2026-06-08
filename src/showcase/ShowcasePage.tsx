// ABOUTME: Generic showcase page used by both the component stories surface and the visualization stories surface: supports per-component mode (one entry across all palettes) and per-palette mode (all entries in one palette with feed/deck/grid layout), with full URL-driven state and cross-surface persisted style sync.

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import type { Component, StoryEntry } from './components'
import { PaletteShowcase, type ShowcaseLayout } from './PaletteShowcase'
import './showcase.css'
import { DraggableControls, OpenControlsHelp, OpenControlsHint, useControlsStyle, type Field } from '../components/DraggableControls/DraggableControls'
import { MOTION_SCALES } from '../theme/motionScales'
import { ENGINE_GUIDE_IDS } from '../guides/engines/registry'
import { AppShell } from '../components/AppShell/AppShell'
import { APP_SHELL_NAV, type AppShellNavId } from '../components/AppShell/navLinks'
import {
  NAV_LAYOUT_OPTIONS,
  navControlsFor,
  useNavLayout,
  type NavLayoutId,
} from '../components/AppShell/navLayouts'
import { buildPaletteField, isStyleId, readSelectedStyle, useSelectedStyle } from '../lib/persistedStyle'
import { baseOf, resolveStyle, type StyleId } from '../lib/customPatterns'

// ABOUTME: All built-in palette ids in insertion order; used to iterate palettes in per-component mode and validate the palette= URL param.
const PALETTE_IDS = Object.keys(palettes) as PaletteId[]

// ABOUTME: The two top-level display modes: per-component shows one story across all palettes as stacked rows; per-palette feeds all stories through a single palette in feed/deck/grid layout.
type ViewMode = 'per-component' | 'per-palette'
// ABOUTME: The palette filter value for per-component mode: either a specific built-in palette id or 'all' to show every palette row.
type PaletteChoice = 'all' | PaletteId
// ABOUTME: The variant filter for per-component mode: either a specific variant name from the active entry or 'all' to render every variant.
type VariantChoice = 'all' | string

// ABOUTME: The three available per-palette layout options surfaced in the DraggableControls Layout field, passed as options to the layout Field and used to select the PaletteShowcase layout prop.
const LAYOUTS: { value: ShowcaseLayout; label: string }[] = [
  { value: 'feed', label: 'Feed — stacked masonry' },
  { value: 'deck', label: 'Deck — swipeable variants' },
  { value: 'grid', label: 'Grid — tap-to-expand tiles' },
]

// ABOUTME: Canonical URL search-parameter names for all of ShowcasePage's URL-driven state: view mode, selected component, variant filter, palette filter, chrome palette, showcase palette, layout, and motion scale.
const URL_PARAM = {
  view: 'view',
  component: 'component',
  variant: 'variant',
  palette: 'palette',
  chrome: 'chrome',
  showcasePalette: 'showcase',
  layout: 'layout',
  motion: 'motion',
} as const

// ABOUTME: Configuration props for ShowcasePage: the story entries to display, singular/plural noun labels, page title, default selected entry id, the nav link to mark active, and the info popover body text.
export interface ShowcasePageProps {
  /** Stories rendered by this showcase. */
  entries: StoryEntry[]
  /** Singular noun used in the dropdown label, e.g. "Component" or "Visualization". */
  itemLabel: string
  /** Plural noun used in the per-palette meta line, e.g. "components" or "visualizations". */
  kindLabel: string
  /** Page title shown in the header. */
  title: string
  /** Default selected story id when the URL has no `component=` param. */
  defaultComponent: Component
  /** Which cross-page nav entry should be marked current. */
  activeNavId: AppShellNavId
  /** Info popover body. */
  infoText: ReactNode
}

// ABOUTME: Root component of the showcase surface: reads and writes view/component/variant/palette/chrome/layout/motion URL params, syncs with the persisted style store, renders DraggableControls with context-appropriate fields, and delegates to per-component PaletteRoot rows or a full PaletteShowcase depending on the active view mode.
export function ShowcasePage({
  entries,
  itemLabel,
  kindLabel,
  title,
  defaultComponent,
  activeNavId,
  infoText,
}: ShowcasePageProps) {
  // The chrome / showcase / palette-filter defaults follow the user's
  // site-wide selected style so navigating between surfaces keeps the
  // chosen look. URL params still override on a fresh visit.
  const persistedStyle = readSelectedStyle()
  const DEFAULTS = {
    view: 'per-palette' as ViewMode,
    component: defaultComponent,
    variant: 'all' as VariantChoice,
    palette: baseOf(persistedStyle) as PaletteChoice,
    chrome: persistedStyle,
    showcasePalette: persistedStyle,
    layout: 'feed' as ShowcaseLayout,
    motion: 2,
  }

  const isComponentId = (v: string): v is Component =>
    entries.some(c => c.id === v)
  const isPaletteId = (v: string): v is PaletteId =>
    (PALETTE_IDS as string[]).includes(v)
  const isLayoutId = (v: string): v is ShowcaseLayout =>
    LAYOUTS.some(l => l.value === v)

  type UrlSettings = {
    view: ViewMode
    component: Component
    variant: VariantChoice
    palette: PaletteChoice
    chrome: StyleId
    showcasePalette: StyleId
    layout: ShowcaseLayout
    motion: number
  }

  const readUrlSettings = (): UrlSettings => {
    if (typeof window === 'undefined') return { ...DEFAULTS }
    const p = new URL(window.location.href).searchParams
    const viewRaw = p.get(URL_PARAM.view) ?? ''
    const view: ViewMode =
      viewRaw === 'per-palette' || viewRaw === 'per-component' ? viewRaw : DEFAULTS.view
    const componentRaw = p.get(URL_PARAM.component) ?? ''
    const component = isComponentId(componentRaw) ? componentRaw : DEFAULTS.component
    const entry = entries.find(c => c.id === component)
    const variantRaw = p.get(URL_PARAM.variant) ?? ''
    const variant: VariantChoice =
      variantRaw && entry?.variants.includes(variantRaw) ? variantRaw : DEFAULTS.variant
    const paletteRaw = p.get(URL_PARAM.palette) ?? ''
    const palette: PaletteChoice =
      paletteRaw === 'all' ? 'all' : isPaletteId(paletteRaw) ? paletteRaw : DEFAULTS.palette
    const chromeRaw = p.get(URL_PARAM.chrome) ?? ''
    const chrome: StyleId = isStyleId(chromeRaw) ? chromeRaw : DEFAULTS.chrome
    const showcaseRaw = p.get(URL_PARAM.showcasePalette) ?? ''
    const showcasePalette: StyleId = isStyleId(showcaseRaw) ? showcaseRaw : DEFAULTS.showcasePalette
    const layoutRaw = p.get(URL_PARAM.layout) ?? ''
    const layout: ShowcaseLayout = isLayoutId(layoutRaw) ? layoutRaw : DEFAULTS.layout
    const motionRaw = Number(p.get(URL_PARAM.motion))
    const motion: number = MOTION_SCALES.some(s => s.value === motionRaw) ? motionRaw : DEFAULTS.motion
    return { view, component, variant, palette, chrome, showcasePalette, layout, motion }
  }

  const initial = useMemo(readUrlSettings, [])
  const [viewMode, setViewMode] = useState<ViewMode>(initial.view)
  const [component, setComponent] = useState<Component>(initial.component)
  const [paletteChoice, setPaletteChoice] = useState<PaletteChoice>(initial.palette)
  const [showcasePaletteId, setShowcasePaletteId] = useState<StyleId>(initial.showcasePalette)
  const [layout, setLayout] = useState<ShowcaseLayout>(initial.layout)
  const [chromePaletteId, setChromePaletteId] = useState<StyleId>(initial.chrome)
  const [motionScale, setMotionScale] = useState<number>(initial.motion)
  const [variantChoice, setVariantChoice] = useState<VariantChoice>(initial.variant)
  const [infoOpen, setInfoOpen] = useState<boolean>(false)
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [navLayout, setNavLayout] = useNavLayout()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()

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
      setSelectedStyle(s.chrome)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const active = entries.find(c => c.id === component)
  const visiblePaletteIds: PaletteId[] =
    paletteChoice === 'all' ? PALETTE_IDS : [paletteChoice]
  const chromePalette = resolveStyle(chromePaletteId)
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
    if (next !== 'all') {
      setChromePaletteId(next)
      setSelectedStyle(next)
    }
  }

  const handleShowcasePaletteChange = (next: StyleId) => {
    setShowcasePaletteId(next)
    setChromePaletteId(next)
    setSelectedStyle(next)
  }

  // Seed the persisted style from the URL-derived chrome on first mount.
  // A pasted permalink (`?chrome=vaporwave`) should win over the user's
  // previous selection, and writing it through here keeps the cross-
  // surface sync effect below from racing against the URL on load.
  const didSeedFromUrl = useRef(false)
  if (!didSeedFromUrl.current) {
    didSeedFromUrl.current = true
    if (selectedStyle !== chromePaletteId) setSelectedStyle(chromePaletteId)
  }

  // Cross-surface sync: when another surface (Apps, Quiz, Engine guides)
  // updates the persisted style, propagate it into the chrome/showcase
  // ids here so the user sees the new style immediately on this surface
  // too. Skip when the local chrome already matches to avoid an extra
  // render loop.
  useEffect(() => {
    if (selectedStyle === chromePaletteId) return
    setChromePaletteId(selectedStyle)
    setShowcasePaletteId(selectedStyle)
    if (paletteChoice !== 'all') setPaletteChoice(baseOf(selectedStyle))
    // `paletteChoice` is intentionally excluded — we only react to
    // external style changes, not to the user re-picking 'all' locally.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStyle])

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
      { value: 'per-component', label: `Per-${itemLabel.toLowerCase()} (one × all palettes)` },
      { value: 'per-palette', label: `Per-palette (all ${kindLabel} × one)` },
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

  const navLayoutField: Field = {
    key: 'navLayout',
    label: 'Nav',
    short: 'N',
    value: navLayout,
    options: NAV_LAYOUT_OPTIONS.map(o => ({ value: o.value, label: o.label })),
    onChange: v => setNavLayout(v as NavLayoutId),
  }

  const fields: Field[] = viewMode === 'per-component'
    ? [
        viewField,
        {
          key: 'component',
          label: itemLabel,
          short: itemLabel.charAt(0).toUpperCase(),
          value: component,
          options: entries.map(c => ({ value: c.id, label: c.label })),
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
        navLayoutField,
        motionField,
      ]
    : [
        viewField,
        buildPaletteField(showcasePaletteId, handleShowcasePaletteChange),
        {
          key: 'layout',
          label: 'Layout',
          short: 'L',
          value: layout,
          options: LAYOUTS.map(l => ({ value: l.value, label: l.label })),
          onChange: v => setLayout(v as ShowcaseLayout),
        },
        navLayoutField,
        motionField,
      ]

  const brand = (
    <>
      <h1 className="stories__title">
        {title}
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
        <OpenControlsHint />
      </h1>
      {infoOpen && (
        <div
          ref={infoPopRef}
          id="stories-info-popover"
          role="region"
          aria-label="About this page"
          className="stories__info-popover"
        >
          {infoText}
          <OpenControlsHelp />
        </div>
      )}
    </>
  )

  return (
    <PaletteRoot palette={chromePalette} as="section" motionScale={motionScale}>
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId={activeNavId}
      >
        <div className="stories">
          <DraggableControls
            style={controlsStyle}
            onStyleChange={setControlsStyle}
            fields={fields}
            nav={navControlsFor(navLayout, activeNavId)}
          />

          {viewMode === 'per-component' &&
            visiblePaletteIds.map(id => {
              const palette = palettes[id]
              const engineGuideAvailable = (ENGINE_GUIDE_IDS as readonly string[]).includes(palette.engine)
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
                    {engineGuideAvailable && (
                      <Link to={`/engines/${palette.engine}`} className="stories__engine-link">
                        How does {palette.engine} work? →
                      </Link>
                    )}
                  </h2>
                  {active?.render(activeVariant)}
                </PaletteRoot>
              )
            })}

          {viewMode === 'per-palette' && (
            <PaletteShowcase
              palette={resolveStyle(showcasePaletteId)}
              layout={layout}
              motionScale={motionScale}
              entries={entries}
              kindLabel={kindLabel}
            />
          )}
        </div>
      </AppShell>
    </PaletteRoot>
  )
}
