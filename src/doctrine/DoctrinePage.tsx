import { useEffect, useMemo, useRef, useState } from 'react'
import { palettes, type PaletteId } from '../../palettes'
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
import { DOCTRINE_PAGES, isDoctrineId, type DoctrineId } from './pages'
import '../showcase/showcase.css'
import './doctrine.css'

const PALETTE_IDS = Object.keys(palettes) as PaletteId[]

const URL_PARAM = {
  chrome: 'chrome',
  doc: 'doc',
  motion: 'motion',
} as const

const DEFAULTS = {
  chrome: 'flat-classic' as PaletteId,
  doc: 'layout' as DoctrineId,
  motion: DEFAULT_MOTION_SCALE,
}

const isPaletteId = (v: string): v is PaletteId =>
  (PALETTE_IDS as string[]).includes(v)

type UrlSettings = {
  chrome: PaletteId
  doc: DoctrineId
  motion: MotionScale
}

function readUrlSettings(): UrlSettings {
  if (typeof window === 'undefined') return { ...DEFAULTS }
  const p = new URL(window.location.href).searchParams
  const chromeRaw = p.get(URL_PARAM.chrome) ?? ''
  const chrome: PaletteId = isPaletteId(chromeRaw) ? chromeRaw : DEFAULTS.chrome
  const docRaw = p.get(URL_PARAM.doc) ?? ''
  const doc: DoctrineId = isDoctrineId(docRaw) ? docRaw : DEFAULTS.doc
  const motion = resolveMotionScale(p.get(URL_PARAM.motion))
  return { chrome, doc, motion }
}

export function DoctrinePage() {
  const initial = useMemo(readUrlSettings, [])
  const [chromePaletteId, setChromePaletteId] = useState<PaletteId>(initial.chrome)
  const [doc, setDoc] = useState<DoctrineId>(initial.doc)
  const [motionScale, setMotionScale] = useState<MotionScale>(initial.motion)
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [infoOpen, setInfoOpen] = useState(false)
  const [navLayout, setNavLayout] = useNavLayout()

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

  const docField: Field = {
    key: 'doc',
    label: 'Doc',
    short: 'D',
    value: doc,
    options: DOCTRINE_PAGES.map(p => ({ value: p.id, label: p.label })),
    onChange: v => setDoc(v as DoctrineId),
  }

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
          Use Doc to switch pages.
        </div>
      )}
    </>
  )

  return (
    <PaletteRoot palette={palettes[chromePaletteId]} as="section" motionScale={motionScale}>
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
          />

          <PaletteRoot
            palette={palettes[chromePaletteId]}
            as="section"
            className="stories__palette"
            motionScale={motionScale}
          >
            {activePage.render()}
          </PaletteRoot>
        </div>
      </AppShell>
    </PaletteRoot>
  )
}
