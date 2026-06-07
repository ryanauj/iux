// ABOUTME: SportsApp — a React component (apps).

import { useMemo, useRef } from 'react'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { buildPaletteField, isStyleId, useSelectedStyle } from '../../lib/persistedStyle'
import { resolveStyle, type StyleId } from '../../lib/customPatterns'
import { Link } from '../Link'
import { pathSegments, replaceParams, type HashLocation } from '../router'
import { matchSportsRoute, sportsRoutes, type SportsRoute } from './routes'
import {
  DEFAULT_LAYOUT,
  LAYOUT_OPTIONS,
  Shell,
  resolveLayoutId,
  type NavItem,
} from './layouts'
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
import { Home } from './pages/Home'
import { Teams } from './pages/Teams'
import { TeamDetail } from './pages/TeamDetail'
import { Players } from './pages/Players'
import { PlayerDetail } from './pages/PlayerDetail'
import { Games } from './pages/Games'
import { GameDetail } from './pages/GameDetail'
import { Standings } from './pages/Standings'
import { Matchup } from './pages/Matchup'
import { NotFound } from './pages/NotFound'
import './sports-app.css'

interface SportsAppProps {
  location: HashLocation
}

const NAV: NavItem[] = [
  { to: sportsRoutes.home(), label: 'Home', isActive: r => r.kind === 'home' },
  { to: sportsRoutes.teams(), label: 'Teams', isActive: r => r.kind === 'teams' || r.kind === 'teamDetail' },
  { to: sportsRoutes.players(), label: 'Players', isActive: r => r.kind === 'players' || r.kind === 'playerDetail' },
  { to: sportsRoutes.games(), label: 'Games', isActive: r => r.kind === 'games' || r.kind === 'gameDetail' },
  { to: sportsRoutes.standings(), label: 'Standings', isActive: r => r.kind === 'standings' },
  { to: sportsRoutes.matchup(), label: 'Matchup', isActive: r => r.kind === 'matchup' },
]

// ABOUTME: SportsApp — a React component.
export function SportsApp({ location }: SportsAppProps) {
  const [controlsStyle, setControlsStyle] = useControlsStyle()
  const [selectedStyle, setSelectedStyle] = useSelectedStyle()

  // Drop the `apps/sports` prefix and pass the remainder to the route matcher.
  const route = useMemo(() => {
    const segs = pathSegments(location.path)
    return matchSportsRoute(segs.slice(2))
  }, [location.path])

  // URL wins on a fresh visit (pasted permalink); the site-wide
  // persisted style is the fallback so navigating in from anywhere
  // else on the site keeps the chosen look.
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

  // Layout lives entirely in the URL hash query as `?layout=<id>`. The
  // router treats `layout` as a sticky param, so every `Link` carries it
  // forward across navigation; the dropdown writes to the URL with
  // `replaceParams` (omit when the default is chosen so URLs stay clean).
  const layoutId = resolveLayoutId(location.params.get('layout'))

  const handleLayoutChange = (next: string) => {
    const id = resolveLayoutId(next)
    replaceParams({ layout: id === DEFAULT_LAYOUT ? undefined : id })
  }

  const handleMotionChange = (next: string) => {
    replaceParams({
      motion: Number(next) === DEFAULT_MOTION_SCALE ? undefined : next,
    })
  }

  const floatingFields: Field[] = [
    buildPaletteField(styleId, handlePaletteChange),
    {
      key: 'layout',
      label: 'Layout',
      short: 'L',
      value: layoutId,
      options: LAYOUT_OPTIONS.map(o => ({ value: o.value, label: o.label })),
      onChange: handleLayoutChange,
    },
    {
      key: 'motion',
      label: 'Motion',
      short: 'M',
      value: String(motionScale),
      options: MOTION_FIELD_OPTIONS.map(o => ({ ...o })),
      onChange: handleMotionChange,
    },
  ]

  const brand = (
    <Link to={sportsRoutes.home()} className="sports-app__brand">
      <span className="sports-app__brand-mark" aria-hidden="true">NBA</span>
      <span className="sports-app__brand-name">Hoops Hub</span>
    </Link>
  )

  const exit = (
    <Link to="/apps" className="sports-app__exit">← Apps</Link>
  )

  return (
    <PaletteRoot palette={palette} as="section" motionScale={motionScale}>
      <Shell
        layoutId={layoutId}
        brand={brand}
        nav={NAV}
        route={route}
        exit={exit}
      >
        <RouteContent route={route} />
      </Shell>
      <DraggableControls
        style={controlsStyle}
        onStyleChange={setControlsStyle}
        fields={floatingFields}
      />
    </PaletteRoot>
  )
}

function RouteContent({ route }: { route: SportsRoute }) {
  switch (route.kind) {
    case 'home': return <Home />
    case 'teams': return <Teams />
    case 'teamDetail': return <TeamDetail slug={route.slug} />
    case 'players': return <Players />
    case 'playerDetail': return <PlayerDetail slug={route.slug} />
    case 'games': return <Games />
    case 'gameDetail': return <GameDetail id={route.id} />
    case 'standings': return <Standings />
    case 'matchup': return <Matchup aSlug={route.aSlug} bSlug={route.bSlug} />
    case 'notFound': return <NotFound />
  }
}
