// ABOUTME: Page shell for the AST explorer: chrome, motion, and nav controls around the graph.

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
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
import astGraph from './generated/ast-graph.json'
import '../showcase/showcase.css'
import './howitworks.css'

// React Flow is heavy; load the graph only on this route to keep the rest
// of the site lean on mobile.
// ABOUTME: The AST explorer, lazily imported so React Flow only loads on this route.
const AstGraph = lazy(() => import('./AstGraph').then(m => ({ default: m.AstGraph })))

// ABOUTME: Query-param keys that persist the page's chrome palette and motion scale in the URL.
const URL_PARAM = {
  chrome: 'chrome',
  motion: 'motion',
} as const

// ABOUTME: The page's URL-backed settings: which chrome palette and motion scale are active.
type UrlSettings = {
  chrome: StyleId
  motion: MotionScale
}

// ABOUTME: Renders the "how it works" page and its palette-aware chrome around the AST graph.
export function HowItWorksPage() {
  // Mirror the Doctrine chrome contract: the site-wide selected style is the
  // fallback on a fresh visit so navigating in keeps the look, while a URL
  // `chrome=` param still wins (pasted permalink).
  const persistedStyle = readSelectedStyle()
  const DEFAULTS = {
    chrome: persistedStyle,
    motion: DEFAULT_MOTION_SCALE,
  }

  const readUrlSettings = (): UrlSettings => {
    if (typeof window === 'undefined') return { ...DEFAULTS }
    const p = new URL(window.location.href).searchParams
    const chromeRaw = p.get(URL_PARAM.chrome) ?? ''
    const chrome: StyleId = isStyleId(chromeRaw) ? chromeRaw : DEFAULTS.chrome
    const motion = resolveMotionScale(p.get(URL_PARAM.motion))
    return { chrome, motion }
  }

  const initial = useMemo(readUrlSettings, [])
  const [chromePaletteId, setChromePaletteId] = useState<StyleId>(initial.chrome)
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
    sync(URL_PARAM.motion, String(motionScale), String(DEFAULTS.motion))
    const next = url.toString()
    if (next !== window.location.href) {
      window.history.replaceState(window.history.state, '', next)
    }
  }, [chromePaletteId, motionScale])

  useEffect(() => {
    const onPop = () => {
      const s = readUrlSettings()
      setChromePaletteId(s.chrome)
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

  const fields: Field[] = [chromeField, navLayoutField, motionField]

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
        <OpenControlsHint />
      </h1>
      {infoOpen && (
        <div
          ref={infoPopRef}
          id="howitworks-info-popover"
          role="region"
          aria-label="About this page"
          className="stories__info-popover"
        >
          A deterministic map of the codebase itself. At build time the
          source under <code>src/</code> is parsed and emitted as a graph —
          directories, files, and every top-level member (components,
          functions, classes, consts, types) — with file-to-file import
          links between them. Each file and exported member also carries a
          plain-English summary, lifted from its <code>ABOUTME:</code>{' '}
          comment and shown beside the name. It opens in <em>Focus</em> on the
          app entry point: walk outward through <em>Depends on</em> /{' '}
          <em>Used by</em> cards — drilling into the exact method, class, or type
          imported via its chip — and your path builds up as breadcrumbs you can
          save as a reusable <em>flow</em>, replayed end-to-end under the{' '}
          <em>Flows</em> tab. The <em>Graph</em>, <em>Outline</em>, and{' '}
          <em>Matrix</em> tabs show the same data as a whole map. It
          paints with the active palette&apos;s tokens, so switch the Palette
          to watch it re-theme.
          <OpenControlsHelp />
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
            nav={navControlsFor(navLayout, 'howitworks')}
          />

          <PaletteRoot
            palette={resolveStyle(chromePaletteId)}
            as="section"
            className="stories__palette"
            motionScale={motionScale}
          >
            <article className="howitworks">
              <header className="howitworks__head">
                <p className="howitworks__eyebrow">How it works · AST graph</p>
                <h2 className="howitworks__title">The codebase as a navigable graph</h2>
                <p className="howitworks__blurb">
                  Every file under <code>src/</code> parsed at build into a
                  deterministic graph: {astGraph.stats.areas} directories,{' '}
                  {astGraph.stats.files} files, and {astGraph.stats.members}{' '}
                  members, joined by {astGraph.stats.imports} import links that
                  resolve to {astGraph.stats.memberEdges} member-level
                  dependencies. Every file and {astGraph.stats.documentedMembers}{' '}
                  exported members carry a plain-English summary beside the name.
                  Start in Focus at the entry point, walk the imports one hop at
                  a time — drilling into the exact methods, classes, and types
                  each file depends on — and save the trails you care about as
                  flows.
                </p>
              </header>

              <figure className="howitworks__figure howitworks__figure--graph">
                <Suspense fallback={<div className="howitworks__loading">Building graph…</div>}>
                  <AstGraph />
                </Suspense>
              </figure>

              <p className="howitworks__note">
                Generated at build by <code>scripts/generate-ast-graph.ts</code>,
                which also lifts each <code>ABOUTME:</code> comment into the
                graph as its English summary. Re-runs on every{' '}
                <code>pnpm run build</code>, so the map always matches the
                source it ships with.
              </p>
            </article>
          </PaletteRoot>
        </div>
      </AppShell>
    </PaletteRoot>
  )
}
