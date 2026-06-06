import { useEffect, useMemo, useRef, useState } from 'react'
import { PaletteRoot } from '../theme/PaletteRoot'
import {
  DraggableControls,
  useControlsStyle,
  type Field,
} from '../components/DraggableControls/DraggableControls'
import {
  MOTION_FIELD_OPTIONS,
  resolveMotionScale,
  DEFAULT_MOTION_SCALE,
  type MotionScale,
} from '../theme/motionScales'
import { AppShell } from '../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../components/AppShell/navLinks'
import {
  NAV_LAYOUT_OPTIONS,
  useNavLayout,
  type NavLayoutId,
} from '../components/AppShell/navLayouts'
import { buildPaletteField, isStyleId, readSelectedStyle, useSelectedStyle } from '../lib/persistedStyle'
import { resolveStyle, type StyleId } from '../lib/customPatterns'
import { HOWITWORKS_PAGES, isHowItWorksId, type HowItWorksId } from './pages'
import '../showcase/showcase.css'
import './howitworks.css'

const URL_PARAM = {
  chrome: 'chrome',
  view: 'view',
  motion: 'motion',
} as const

type UrlSettings = {
  chrome: StyleId
  view: HowItWorksId
  motion: MotionScale
}

export function HowItWorksPage() {
  // Mirror the Doctrine chrome contract: the site-wide selected style is the
  // fallback on a fresh visit so navigating in keeps the look, while a URL
  // `chrome=` param still wins (pasted permalink).
  const persistedStyle = readSelectedStyle()
  const DEFAULTS = {
    chrome: persistedStyle,
    view: 'component-flow' as HowItWorksId,
    motion: DEFAULT_MOTION_SCALE,
  }

  const readUrlSettings = (): UrlSettings => {
    if (typeof window === 'undefined') return { ...DEFAULTS }
    const p = new URL(window.location.href).searchParams
    const chromeRaw = p.get(URL_PARAM.chrome) ?? ''
    const chrome: StyleId = isStyleId(chromeRaw) ? chromeRaw : DEFAULTS.chrome
    const viewRaw = p.get(URL_PARAM.view) ?? ''
    const view: HowItWorksId = isHowItWorksId(viewRaw) ? viewRaw : DEFAULTS.view
    const motion = resolveMotionScale(p.get(URL_PARAM.motion))
    return { chrome, view, motion }
  }

  const initial = useMemo(readUrlSettings, [])
  const [chromePaletteId, setChromePaletteId] = useState<StyleId>(initial.chrome)
  const [view, setView] = useState<HowItWorksId>(initial.view)
  const [motionScale, setMotionScale] = useState<MotionScale>(initial.motion)
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [infoOpen, setInfoOpen] = useState(false)
  const [navLayout, setNavLayout] = useNavLayout()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()

  useEffect(() => {
    const url = new URL(window.location.href)
    const sync = (key: string, value: string, fallback: string) => {
      if (value === fallback) url.searchParams.delete(key)
      else url.searchParams.set(key, value)
    }
    sync(URL_PARAM.chrome, chromePaletteId, DEFAULTS.chrome)
    sync(URL_PARAM.view, view, DEFAULTS.view)
    sync(URL_PARAM.motion, String(motionScale), String(DEFAULTS.motion))
    const next = url.toString()
    if (next !== window.location.href) {
      window.history.replaceState(window.history.state, '', next)
    }
  }, [chromePaletteId, view, motionScale])

  useEffect(() => {
    const onPop = () => {
      const s = readUrlSettings()
      setChromePaletteId(s.chrome)
      setView(s.view)
      setMotionScale(s.motion)
      setSelectedStyle(s.chrome)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Seed the persisted style from the URL-derived chrome on first mount so a
  // pasted `?chrome=...` wins over the user's previous selection.
  const didSeedFromUrl = useRef(false)
  if (!didSeedFromUrl.current) {
    didSeedFromUrl.current = true
    if (selectedStyle !== chromePaletteId) setSelectedStyle(chromePaletteId)
  }

  // Cross-surface sync: follow the persisted style when another surface
  // changes it, so the chrome stays in lockstep.
  useEffect(() => {
    if (selectedStyle === chromePaletteId) return
    setChromePaletteId(selectedStyle)
  }, [selectedStyle, chromePaletteId])

  const infoBtnRef = useRef<HTMLButtonElement>(null)
  const infoPopRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!infoOpen) return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (infoBtnRef.current?.contains(target) || infoPopRef.current?.contains(target)) return
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
    short: 'V',
    value: view,
    options: HOWITWORKS_PAGES.map(p => ({ value: p.id, label: p.label })),
    onChange: v => setView(v as HowItWorksId),
  }

  const chromeField: Field = buildPaletteField(chromePaletteId, next => {
    setChromePaletteId(next)
    setSelectedStyle(next)
  })

  const motionField: Field = {
    key: 'motion',
    label: 'Motion',
    short: 'M',
    value: String(motionScale),
    options: MOTION_FIELD_OPTIONS,
    onChange: v => setMotionScale(resolveMotionScale(v)),
  }

  const navLayoutField: Field = {
    key: 'navLayout',
    label: 'Nav',
    short: 'N',
    value: navLayout,
    options: NAV_LAYOUT_OPTIONS.map(o => ({ value: o.value, label: o.label })),
    onChange: v => setNavLayout(v as NavLayoutId),
  }

  const fields: Field[] = [viewField, chromeField, navLayoutField, motionField]

  const activePage = HOWITWORKS_PAGES.find(p => p.id === view) ?? HOWITWORKS_PAGES[0]

  const brand = (
    <>
      <h1 className="stories__title">
        iux — how it works
        <button
          ref={infoBtnRef}
          type="button"
          className="stories__info-btn"
          aria-label="About this page"
          aria-expanded={infoOpen}
          aria-controls="howitworks-info-popover"
          onClick={() => setInfoOpen(o => !o)}
        >
          i
        </button>
      </h1>
      {infoOpen && (
        <div
          ref={infoPopRef}
          id="howitworks-info-popover"
          role="region"
          aria-label="About this page"
          className="stories__info-popover"
        >
          Visual explanations of how the system itself works, at different
          levels of specificity. The diagrams are hand-authored for now and
          paint with the active palette&apos;s tokens — switch the Palette to
          watch them re-theme. Use View to switch flows. Over time these will
          become deterministic visualizations generated at build.
        </div>
      )}
    </>
  )

  return (
    <PaletteRoot palette={resolveStyle(chromePaletteId)} as="section" motionScale={motionScale}>
      <AppShell layoutId={navLayout} brand={brand} nav={APP_SHELL_NAV} activeId="howitworks">
        <div className="stories">
          <DraggableControls
            style={controlsStyle}
            onStyleChange={setControlsStyle}
            fields={fields}
          />

          <PaletteRoot
            palette={resolveStyle(chromePaletteId)}
            as="section"
            className="stories__palette"
            motionScale={motionScale}
          >
            <article className="howitworks">
              <header className="howitworks__head">
                <p className="howitworks__eyebrow">{activePage.eyebrow}</p>
                <h2 className="howitworks__title">{activePage.title}</h2>
                <p className="howitworks__blurb">{activePage.blurb}</p>
              </header>

              <figure className="howitworks__figure">{activePage.render()}</figure>

              <p className="howitworks__note">
                Hand-authored diagram — a provisional sketch of this flow, not
                yet generated from the source. These will become deterministic
                visualizations produced at build time.
              </p>
            </article>
          </PaletteRoot>
        </div>
      </AppShell>
    </PaletteRoot>
  )
}
