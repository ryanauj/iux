// ABOUTME: Root shell for the Promptbook demo app: wraps pages in PaletteRoot and PromptStoreProvider, renders the top nav (Library / Strategies), and dispatches hash routes to Library, PromptDetail, PromptForm, Strategies, StrategyDetail, or NotFound.

import { useMemo, useRef } from 'react'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { buildPaletteField, isStyleId, useSelectedStyle } from '../../lib/persistedStyle'
import { resolveStyle, type StyleId } from '../../lib/customPatterns'
import { Link } from '../Link'
import { pathSegments, replaceParams, type HashLocation } from '../router'
import { matchPromptsRoute, promptRoutes, type PromptsRoute } from './routes'
import {
  DraggableControls,
  useControlsStyle,
  type Field,
} from '../../components/DraggableControls/DraggableControls'
import {
  DEFAULT_MOTION_SCALE,
  MOTION_FIELD_OPTIONS,
  resolveMotionScale,
} from '../../theme/motionScales'
import { PromptStoreProvider } from './store'
import { ToastProvider } from './components/feedback'
import { Library } from './pages/Library'
import { PromptDetail } from './pages/PromptDetail'
import { PromptForm } from './pages/PromptForm'
import { Strategies } from './pages/Strategies'
import { StrategyDetail } from './pages/StrategyDetail'
import { NotFound } from './pages/NotFound'
import './promptbook-app.css'

// ABOUTME: Props for PromptsApp; carries the full HashLocation so the app can match the sub-route and read palette/motion params.
interface PromptsAppProps {
  location: HashLocation
}

// ABOUTME: Shape of one top-level nav entry in the Promptbook header: destination path, display label, and an active-state predicate over the current PromptsRoute.
interface NavItem {
  to: string
  label: string
  isActive: (route: PromptsRoute) => boolean
}

// ABOUTME: Two primary nav entries for the Promptbook app (Library and Strategies), each marking itself active for its own route cluster.
const NAV: NavItem[] = [
  {
    to: promptRoutes.library(),
    label: 'Library',
    isActive: r => r.kind === 'library' || r.kind === 'prompt' || r.kind === 'edit' || r.kind === 'new',
  },
  {
    to: promptRoutes.strategies(),
    label: 'Strategies',
    isActive: r => r.kind === 'strategies' || r.kind === 'strategy',
  },
]

// ABOUTME: Root shell for the Promptbook app: provides PaletteRoot (palette + motion), PromptStoreProvider, and ToastProvider, renders the header with Library/Strategies nav, and delegates page content to RouteContent via matchPromptsRoute.
/**
 * Root shell for the Promptbook app. Wraps the entire subtree in
 * `PaletteRoot` (resolving palette and motion from URL params or persisted
 * style), `PromptStoreProvider`, and `ToastProvider`, then renders the brand
 * header, primary nav, and a floating `DraggableControls` panel. Page routing
 * is handled by `matchPromptsRoute` and delegated to `RouteContent`.
 */
export function PromptsApp({ location }: PromptsAppProps) {
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()

  const route = useMemo(() => {
    const segs = pathSegments(location.path)
    return matchPromptsRoute(segs.slice(2))
  }, [location.path])

  const paletteParam = location.params.get('palette')
  const styleId: StyleId =
    paletteParam && isStyleId(paletteParam) ? paletteParam : selectedStyle
  const palette = resolveStyle(styleId)
  const motionScale = resolveMotionScale(location.params.get('motion'))

  const didSeedFromUrl = useRef(false)
  if (!didSeedFromUrl.current) {
    didSeedFromUrl.current = true
    if (paletteParam && styleId !== selectedStyle) {
      setSelectedStyle(styleId)
    }
  }

  const handlePaletteChange = (next: string) => {
    if (isStyleId(next)) setSelectedStyle(next)
    replaceParams({ palette: next })
  }

  const handleMotionChange = (next: string) => {
    replaceParams({ motion: Number(next) === DEFAULT_MOTION_SCALE ? undefined : next })
  }

  const floatingFields: Field[] = [
    buildPaletteField(styleId, handlePaletteChange),
    {
      key: 'motion',
      label: 'Motion',
      short: 'M',
      value: String(motionScale),
      options: MOTION_FIELD_OPTIONS.map(o => ({ ...o })),
      onChange: handleMotionChange,
    },
  ]

  return (
    <PaletteRoot palette={palette} as="section" motionScale={motionScale}>
      <PromptStoreProvider>
        <ToastProvider>
          <div className="promptbook-app">
            <header className="promptbook-app__header">
              <Link to={promptRoutes.library()} className="promptbook-app__brand">
                <span className="promptbook-app__brand-mark" aria-hidden="true">{'›_'}</span>
                <span className="promptbook-app__brand-name">Promptbook</span>
              </Link>
              <nav className="promptbook-app__nav" aria-label="Primary">
                {NAV.map(item => {
                  const active = item.isActive(route)
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={active ? 'promptbook-app__nav-link is-active' : 'promptbook-app__nav-link'}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
              <span className="promptbook-app__spacer" />
              <Link to="/apps" className="promptbook-app__exit">← Apps</Link>
            </header>
            <main className="promptbook-app__main">
              <RouteContent route={route} location={location} />
            </main>
          </div>
          <DraggableControls
            style={controlsStyle}
            onStyleChange={setControlsStyle}
            fields={floatingFields}
          />
        </ToastProvider>
      </PromptStoreProvider>
    </PaletteRoot>
  )
}

// ABOUTME: Switches on the matched PromptsRoute kind and returns the appropriate page component (Library, PromptDetail, PromptForm, Strategies, StrategyDetail, or NotFound).
function RouteContent({ route, location }: { route: PromptsRoute; location: HashLocation }) {
  switch (route.kind) {
    case 'library': return <Library />
    case 'prompt': return <PromptDetail id={route.id} />
    case 'edit': return <PromptForm editId={route.id} />
    case 'new': return <PromptForm prefillStrategyId={location.params.get('from') ?? undefined} />
    case 'strategies': return <Strategies />
    case 'strategy': return <StrategyDetail id={route.id} />
    case 'notFound': return <NotFound />
  }
}
