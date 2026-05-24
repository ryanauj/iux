import { useEffect, useMemo, useRef, useState } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import {
  DraggableControls,
  type ControlsStyle,
  type Field,
} from '../components/DraggableControls/DraggableControls'
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

const SEED_OPTIONS = [1, 2, 3, 7, 42] as const

const URL_PARAM = {
  chrome: 'chrome',
  seed: 'seed',
  controls: 'controls',
} as const

const DEFAULTS = {
  chrome: 'flat-classic' as PaletteId,
  seed: 1,
  controls: 'button' as ControlsStyle,
}

const isPaletteId = (v: string): v is PaletteId =>
  (PALETTE_IDS as string[]).includes(v)

type UrlSettings = {
  chrome: PaletteId
  seed: number
  controls: ControlsStyle
}

function readUrlSettings(): UrlSettings {
  if (typeof window === 'undefined') return { ...DEFAULTS }
  const p = new URL(window.location.href).searchParams
  const chromeRaw = p.get(URL_PARAM.chrome) ?? ''
  const chrome: PaletteId = isPaletteId(chromeRaw) ? chromeRaw : DEFAULTS.chrome
  const seedRaw = Number(p.get(URL_PARAM.seed))
  const seed =
    Number.isFinite(seedRaw) && seedRaw > 0 ? Math.floor(seedRaw) : DEFAULTS.seed
  const controlsRaw = p.get(URL_PARAM.controls) ?? ''
  const controls: ControlsStyle =
    controlsRaw === 'strip' || controlsRaw === 'button'
      ? controlsRaw
      : DEFAULTS.controls
  return { chrome, seed, controls }
}

export function QuizPage() {
  const initial = useMemo(readUrlSettings, [])
  const [chromePaletteId, setChromePaletteId] = useState<PaletteId>(initial.chrome)
  const [seed, setSeed] = useState<number>(initial.seed)
  const [controlsStyle, setControlsStyle] = useState<ControlsStyle>(initial.controls)
  const [infoOpen, setInfoOpen] = useState(false)
  const [navLayout, setNavLayout] = useNavLayout()

  useEffect(() => {
    const url = new URL(window.location.href)
    const sync = (key: string, value: string, fallback: string) => {
      if (value === fallback) url.searchParams.delete(key)
      else url.searchParams.set(key, value)
    }
    sync(URL_PARAM.chrome, chromePaletteId, DEFAULTS.chrome)
    sync(URL_PARAM.seed, String(seed), String(DEFAULTS.seed))
    sync(URL_PARAM.controls, controlsStyle, DEFAULTS.controls)
    const next = url.toString()
    if (next !== window.location.href) {
      window.history.replaceState(window.history.state, '', next)
    }
  }, [chromePaletteId, seed, controlsStyle])

  useEffect(() => {
    const onPop = () => {
      const s = readUrlSettings()
      setChromePaletteId(s.chrome)
      setSeed(s.seed)
      setControlsStyle(s.controls)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
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
    onChange: v => setChromePaletteId(v as PaletteId),
  }

  const seedField: Field = {
    key: 'seed',
    label: 'Seed',
    short: 'S',
    value: String(seed),
    options: SEED_OPTIONS.map(n => ({ value: String(n), label: `Seed ${n}` })),
    onChange: v => setSeed(Number(v)),
  }

  const navLayoutField: Field = {
    key: 'navLayout',
    label: 'Nav',
    short: 'N',
    value: navLayout,
    options: NAV_LAYOUT_OPTIONS.map(o => ({ value: o.value, label: o.label })),
    onChange: v => setNavLayout(v as NavLayoutId),
  }

  const fields: Field[] = [chromeField, seedField, navLayoutField]

  const brand = (
    <>
      <h1 className="stories__title">
        iux — style quizzes
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
          Quizzes auto-derived from the typed{' '}
          <code>StyleDescription</code> per palette. Four question
          kinds — identify the style, what makes it that style,
          distinguish lookalikes, and free-recall — drawn from the
          described palettes. Use Chrome to re-skin the quiz frame
          and Seed to pick a reproducible deck. See{' '}
          <code>docs/styles/INDEX.md</code> for the source-of-truth
          descriptions.
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
          <QuizView seed={seed} totalPalettes={PALETTE_IDS.length} />
        </div>
      </AppShell>
    </PaletteRoot>
  )
}
