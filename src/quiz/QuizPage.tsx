import { useEffect, useMemo, useRef, useState } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import {
  DraggableControls,
  type ControlsStyle,
  type Field,
} from '../components/DraggableControls/DraggableControls'
import { readSelectedStyle, useSelectedStyle } from '../lib/persistedStyle'
import '../showcase/showcase.css'
import { QuizView } from './QuizView'
import { AppShell } from '../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../components/AppShell/navLinks'
import {
  NAV_LAYOUT_OPTIONS,
  useNavLayout,
  type NavLayoutId,
} from '../components/AppShell/navLayouts'

const PALETTE_IDS = Object.keys(palettes) as PaletteId[]

const URL_PARAM = {
  chrome: 'chrome',
  controls: 'controls',
} as const

const DEFAULT_CONTROLS: ControlsStyle = 'button'

const isPaletteId = (v: string): v is PaletteId =>
  (PALETTE_IDS as string[]).includes(v)

type UrlSettings = {
  chrome: PaletteId
  controls: ControlsStyle
}

function readUrlSettings(persistedChrome: PaletteId): UrlSettings {
  if (typeof window === 'undefined') {
    return { chrome: persistedChrome, controls: DEFAULT_CONTROLS }
  }
  const p = new URL(window.location.href).searchParams
  const chromeRaw = p.get(URL_PARAM.chrome) ?? ''
  const chrome: PaletteId = isPaletteId(chromeRaw) ? chromeRaw : persistedChrome
  const controlsRaw = p.get(URL_PARAM.controls) ?? ''
  const controls: ControlsStyle =
    controlsRaw === 'strip' || controlsRaw === 'button'
      ? controlsRaw
      : DEFAULT_CONTROLS
  return { chrome, controls }
}

export function QuizPage() {
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()
  const initial = useMemo(() => readUrlSettings(readSelectedStyle()), [])
  const [chromePaletteId, setChromePaletteId] = useState<PaletteId>(initial.chrome)
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

  const chromeField: Field = {
    key: 'chrome',
    label: 'Chrome',
    short: 'P',
    value: chromePaletteId,
    options: PALETTE_IDS.map(id => ({
      value: id,
      label: `${palettes[id].name} (${palettes[id].engine})`,
    })),
    onChange: v => {
      const next = v as PaletteId
      setChromePaletteId(next)
      setSelectedStyle(next)
    },
  }

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
        </div>
      )}
    </>
  )

  return (
    <PaletteRoot palette={palettes[chromePaletteId]} as="section">
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
          />
          <QuizView seed={seed} />
        </div>
      </AppShell>
    </PaletteRoot>
  )
}
