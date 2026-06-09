// ABOUTME: Page that renders the UX doctrine articles: manages chrome palette, selected doctrine page, motion scale, and nav layout in URL state; wraps DOCTRINE_PAGES in a PaletteRoot so switching the chrome palette makes all live demos update in real time, with a DocModeToggle to switch between plain-English and technical voices.

import { useEffect, useMemo, useRef, useState } from 'react'
import { PaletteRoot } from '../theme/PaletteRoot'
import {
  DraggableControls,
  OpenControlsHelp,
  OpenControlsHint,
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
  navControlsFor,
  useNavLayout,
  type NavLayoutId,
} from '../components/AppShell/navLayouts'
import { buildPaletteField, isStyleId, readSelectedStyle, useSelectedStyle } from '../lib/persistedStyle'
import { resolveStyle, type StyleId } from '../lib/customPatterns'
import { useDocMode } from '../lib/useDocMode'
import { DocModeToggle } from '../components/DocModeToggle/DocModeToggle'
import { DOCTRINE_PAGES, isDoctrineId, type DoctrineId } from './pages'
import '../showcase/showcase.css'
import './doctrine.css'

// ABOUTME: Canonical URL search-parameter names for DoctrinePage's three URL-driven state values: the chrome palette, the active doctrine article, and the motion scale.
const URL_PARAM = {
  chrome: 'chrome',
  doc: 'doc',
  motion: 'motion',
} as const

// ABOUTME: Shape of the URL-derived settings parsed on load and on popstate: the chrome style id, the active doctrine article id, and the motion scale multiplier.
type UrlSettings = {
  chrome: StyleId
  doc: DoctrineId
  motion: MotionScale
}

// ABOUTME: Root component for the Doctrine surface: reads chrome/doc/motion URL params, syncs the persisted style store, renders the active DOCTRINE_PAGES entry inside a nested PaletteRoot so live demos respond to palette changes, and provides a DraggableControls panel for switching doc, chrome, nav layout, and motion scale.
export function DoctrinePage() {
  // Site-wide selected style is the fallback chrome on a fresh visit,
  // so navigating in from Stories / Apps / Quiz / Engine guides keeps
  // the look. A URL `chrome=` param still wins (pasted permalink).
  const persistedStyle = readSelectedStyle()
  const DEFAULTS = {
    chrome: persistedStyle,
    doc: 'layout' as DoctrineId,
    motion: DEFAULT_MOTION_SCALE,
  }

  const readUrlSettings = (): UrlSettings => {
    if (typeof window === 'undefined') return { ...DEFAULTS }
    const p = new URL(window.location.href).searchParams
    const chromeRaw = p.get(URL_PARAM.chrome) ?? ''
    const chrome: StyleId = isStyleId(chromeRaw) ? chromeRaw : DEFAULTS.chrome
    const docRaw = p.get(URL_PARAM.doc) ?? ''
    const doc: DoctrineId = isDoctrineId(docRaw) ? docRaw : DEFAULTS.doc
    const motion = resolveMotionScale(p.get(URL_PARAM.motion))
    return { chrome, doc, motion }
  }

  const initial = useMemo(readUrlSettings, [])
  const [chromePaletteId, setChromePaletteId] = useState<StyleId>(initial.chrome)
  const [doc, setDoc] = useState<DoctrineId>(initial.doc)
  const [motionScale, setMotionScale] = useState<MotionScale>(initial.motion)
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [infoOpen, setInfoOpen] = useState(false)
  const [navLayout, setNavLayout] = useNavLayout()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()
  const [docMode, setDocMode] = useDocMode()

  useEffect(() => {
    const url = new URL(window.location.href)
    const sync = (key: string, value: string, fallback: string) => {
      if (value === fallback) url.searchParams.delete(key)
      else url.searchParams.set(key, value)
    }
    sync(URL_PARAM.chrome, chromePaletteId, DEFAULTS.chrome)
    sync(URL_PARAM.doc, doc, DEFAULTS.doc)
    sync(URL_PARAM.motion, String(motionScale), String(DEFAULTS.motion))
    const next = url.toString()
    if (next !== window.location.href) {
      window.history.replaceState(window.history.state, '', next)
    }
  }, [chromePaletteId, doc, motionScale])

  useEffect(() => {
    const onPop = () => {
      const s = readUrlSettings()
      setChromePaletteId(s.chrome)
      setDoc(s.doc)
      setMotionScale(s.motion)
      setSelectedStyle(s.chrome)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Seed the persisted style from the URL-derived chrome on first
  // mount so a pasted `?chrome=...` wins over the user's previous
  // selection, and the cross-surface sync effect below doesn't race
  // against the URL on load.
  const didSeedFromUrl = useRef(false)
  if (!didSeedFromUrl.current) {
    didSeedFromUrl.current = true
    if (selectedStyle !== chromePaletteId) setSelectedStyle(chromePaletteId)
  }

  // Cross-surface sync: when another surface updates the persisted
  // style, follow it here so the doctrine chrome stays in lockstep.
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

  const docField: Field = {
    key: 'doc',
    label: 'Doc',
    short: 'D',
    value: doc,
    options: DOCTRINE_PAGES.map(p => ({ value: p.id, label: p.label })),
    onChange: v => setDoc(v as DoctrineId),
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

  const fields: Field[] = [docField, chromeField, navLayoutField, motionField]

  const activePage = DOCTRINE_PAGES.find(p => p.id === doc) ?? DOCTRINE_PAGES[0]

  const brand = (
    <>
      <h1 className="stories__title">
        iux — doctrine
        <button
          ref={infoBtnRef}
          type="button"
          className="stories__info-btn"
          aria-label="About this page"
          aria-expanded={infoOpen}
          aria-controls="doctrine-info-popover"
          onClick={() => setInfoOpen(o => !o)}
        >
          i
        </button>
        <OpenControlsHint />
        <DocModeToggle
          className="stories__doc-mode"
          value={docMode}
          onChange={setDocMode}
        />
      </h1>
      {infoOpen && (
        <div
          ref={infoPopRef}
          id="doctrine-info-popover"
          role="region"
          aria-label="About this page"
          className="stories__info-popover"
        >
          UX guidance docs from <code>doctrine/</code> rendered with
          live demos. Each page pairs the rules from its source
          markdown with real components; switch the Chrome palette
          to watch the rules apply (or fail) under different engines.
          Use Doc to switch pages. Toggle the voice between plain
          English and the technical original with the control next
          to the title.
          <OpenControlsHelp />
        </div>
      )}
    </>
  )

  return (
    <PaletteRoot palette={resolveStyle(chromePaletteId)} as="section" motionScale={motionScale}>
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="doctrine"
      >
        <div className="stories">
          <DraggableControls
            style={controlsStyle}
            onStyleChange={setControlsStyle}
            fields={fields}
            nav={navControlsFor(navLayout, 'doctrine')}
          />

          <PaletteRoot
            palette={resolveStyle(chromePaletteId)}
            as="section"
            className="stories__palette"
            motionScale={motionScale}
          >
            {activePage.render(setDoc, docMode)}
          </PaletteRoot>
        </div>
      </AppShell>
    </PaletteRoot>
  )
}
