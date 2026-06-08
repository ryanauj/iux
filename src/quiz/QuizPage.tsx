// ABOUTME: Shell page for the palette-guessing quiz: generates a stable random seed per page mount, manages chrome palette and controls-style URL state, syncs with the cross-surface persisted style store, and renders QuizView inside an AppShell with a DraggableControls panel.

import { useEffect, useMemo, useRef, useState } from 'react'
import { PaletteRoot } from '../theme/PaletteRoot'
import {
  DraggableControls,
  OpenControlsHelp,
  OpenControlsHint,
  type ControlsStyle,
  type Field,
} from '../components/DraggableControls/DraggableControls'
import { buildPaletteField, isStyleId, readSelectedStyle, useSelectedStyle } from '../lib/persistedStyle'
import { resolveStyle, type StyleId } from '../lib/customPatterns'
import '../showcase/showcase.css'
import { QuizView } from './QuizView'
import { AppShell } from '../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../components/AppShell/navLinks'
import {
  NAV_LAYOUT_OPTIONS,
  navControlsFor,
  useNavLayout,
  type NavLayoutId,
} from '../components/AppShell/navLayouts'

// ABOUTME: Canonical URL search-parameter names for the quiz page's chrome palette and controls-style state.
const URL_PARAM = {
  chrome: 'chrome',
  controls: 'controls',
} as const

// ABOUTME: The controls-style used when the URL has no controls= param: show the floating button rather than the strip.
const DEFAULT_CONTROLS: ControlsStyle = 'button'

// ABOUTME: Shape of URL-derived settings read by readUrlSettings: the chrome palette id and the DraggableControls display mode.
type UrlSettings = {
  chrome: StyleId
  controls: ControlsStyle
}

// ABOUTME: Parses chrome and controls URL search params, falling back to the persisted chrome and the default controls style for any missing or invalid value.
function readUrlSettings(persistedChrome: StyleId): UrlSettings {
  if (typeof window === 'undefined') {
    return { chrome: persistedChrome, controls: DEFAULT_CONTROLS }
  }
  const p = new URL(window.location.href).searchParams
  const chromeRaw = p.get(URL_PARAM.chrome) ?? ''
  const chrome: StyleId = isStyleId(chromeRaw) ? chromeRaw : persistedChrome
  const controlsRaw = p.get(URL_PARAM.controls) ?? ''
  const controls: ControlsStyle =
    controlsRaw === 'hidden' || controlsRaw === 'button'
      ? controlsRaw
      : DEFAULT_CONTROLS
  return { chrome, controls }
}

// ABOUTME: Root component of the quiz page: reads chrome/controls URL params, seeds the persisted style on first mount, follows cross-surface style changes, and passes a stable seed to QuizView so the endless question sequence is reproducible within a session but fresh each reload.
export function QuizPage() {
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()
  const initial = useMemo(() => readUrlSettings(readSelectedStyle()), [])
  const [chromePaletteId, setChromePaletteId] = useState<StyleId>(initial.chrome)
  const [controlsStyle, setControlsStyle] = useState<ControlsStyle>(initial.controls)
  const [infoOpen, setInfoOpen] = useState(false)
  const [navLayout, setNavLayout] = useNavLayout()

  // Mirror the URL-derived chrome into the persisted store on first mount
  // so a pasted permalink (`?chrome=vaporwave`) wins over the user's
  // previous selection without the cross-surface sync effect racing it.
  const didSeedFromUrl = useRef(false)
  if (!didSeedFromUrl.current) {
    didSeedFromUrl.current = true
    if (selectedStyle !== chromePaletteId) setSelectedStyle(chromePaletteId)
  }

  // When another surface updates the persisted style, follow it here too.
  useEffect(() => {
    if (selectedStyle !== chromePaletteId) setChromePaletteId(selectedStyle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStyle])

  // Stable random seed for this page mount. Endless mode, so reproducibility
  // across reloads isn't useful — a fresh seed each load just keeps things lively.
  const seed = useMemo(() => Math.floor(Math.random() * 0xffffffff) || 1, [])

  useEffect(() => {
    const url = new URL(window.location.href)
    const sync = (key: string, value: string, fallback: string) => {
      if (value === fallback) url.searchParams.delete(key)
      else url.searchParams.set(key, value)
    }
    sync(URL_PARAM.chrome, chromePaletteId, selectedStyle)
    sync(URL_PARAM.controls, controlsStyle, DEFAULT_CONTROLS)
    const next = url.toString()
    if (next !== window.location.href) {
      window.history.replaceState(window.history.state, '', next)
    }
  }, [chromePaletteId, controlsStyle, selectedStyle])

  useEffect(() => {
    const onPop = () => {
      const s = readUrlSettings(readSelectedStyle())
      setChromePaletteId(s.chrome)
      setControlsStyle(s.controls)
      setSelectedStyle(s.chrome)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const chromeField: Field = buildPaletteField(chromePaletteId, next => {
    setChromePaletteId(next)
    setSelectedStyle(next)
  })

  const navLayoutField: Field = {
    key: 'navLayout',
    label: 'Nav',
    short: 'N',
    value: navLayout,
    options: NAV_LAYOUT_OPTIONS.map(o => ({ value: o.value, label: o.label })),
    onChange: v => setNavLayout(v as NavLayoutId),
  }

  const fields: Field[] = [chromeField, navLayoutField]

  const brand = (
    <>
      <h1 className="stories__title">
        iux — identify the style
        <button
          ref={infoBtnRef}
          type="button"
          className="stories__info-btn"
          aria-label="About this page"
          aria-expanded={infoOpen}
          aria-controls="quiz-info-popover"
          onClick={() => setInfoOpen(o => !o)}
        >
          i
        </button>
        <OpenControlsHint />
      </h1>
      {infoOpen && (
        <div
          ref={infoPopRef}
          id="quiz-info-popover"
          role="region"
          aria-label="About this page"
          className="stories__info-popover"
        >
          Endless practice: a sample is rendered in one of the palettes,
          and you pick which palette / engine it is. Distractors come
          from the same engine family when possible, so the question
          forces you to discriminate within a family (e.g. <em>which</em>{' '}
          pixel-art palette is this). Stimuli rotate across components,
          visualizations, and a sample app.
          <OpenControlsHelp />
        </div>
      )}
    </>
  )

  return (
    <PaletteRoot palette={resolveStyle(chromePaletteId)} as="section">
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="quiz"
      >
        <div className="stories">
          <DraggableControls
            style={controlsStyle}
            onStyleChange={setControlsStyle}
            fields={fields}
            nav={navControlsFor(navLayout, 'quiz')}
          />
          <QuizView seed={seed} />
        </div>
      </AppShell>
    </PaletteRoot>
  )
}
