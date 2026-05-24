import { useMemo } from 'react'
import { palettes, type PaletteId } from '../../../palettes'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Select, type SelectOption } from '../../components/Select/Select'
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
import { Home } from './pages/Home'
import { Teams } from './pages/Teams'
import { TeamDetail } from './pages/TeamDetail'
import { Players } from './pages/Players'
import { PlayerDetail } from './pages/PlayerDetail'
import { Games } from './pages/Games'
import { GameDetail } from './pages/GameDetail'
import { Standings } from './pages/Standings'
import { NotFound } from './pages/NotFound'
import './sports-app.css'

const PALETTE_IDS = Object.keys(palettes) as PaletteId[]
const DEFAULT_PALETTE: PaletteId = 'flat-classic'

interface SportsAppProps {
  location: HashLocation
}

const NAV: NavItem[] = [
  { to: sportsRoutes.home(), label: 'Home', isActive: r => r.kind === 'home' },
  { to: sportsRoutes.teams(), label: 'Teams', isActive: r => r.kind === 'teams' || r.kind === 'teamDetail' },
  { to: sportsRoutes.players(), label: 'Players', isActive: r => r.kind === 'players' || r.kind === 'playerDetail' },
  { to: sportsRoutes.games(), label: 'Games', isActive: r => r.kind === 'games' || r.kind === 'gameDetail' },
  { to: sportsRoutes.standings(), label: 'Standings', isActive: r => r.kind === 'standings' },
]

export function SportsApp({ location }: SportsAppProps) {
  // Drop the `apps/sports` prefix and pass the remainder to the route matcher.
  const route = useMemo(() => {
    const segs = pathSegments(location.path)
    return matchSportsRoute(segs.slice(2))
  }, [location.path])

  const paletteParam = location.params.get('palette')
  const paletteId: PaletteId =
    paletteParam && (PALETTE_IDS as string[]).includes(paletteParam)
      ? (paletteParam as PaletteId)
      : DEFAULT_PALETTE
  const palette = palettes[paletteId]

  const paletteOptions: SelectOption[] = PALETTE_IDS.map(id => ({
    value: id,
    label: palettes[id].name,
    group: palettes[id].engine,
  }))

  const handlePaletteChange = (next: string) => {
    replaceParams({ palette: next === DEFAULT_PALETTE ? undefined : next })
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

  const brand = (
    <Link to={sportsRoutes.home()} className="sports-app__brand">
      <span className="sports-app__brand-mark" aria-hidden="true">NBA</span>
      <span className="sports-app__brand-name">Hoops Hub</span>
    </Link>
  )

  const pickers = (
    <div className="sports-app__pickers">
      <Select
        variant="dropdown"
        label="Layout"
        value={layoutId}
        options={LAYOUT_OPTIONS}
        onChange={handleLayoutChange}
      />
      <Select
        variant="dropdown"
        label="Palette"
        value={paletteId}
        options={paletteOptions}
        onChange={handlePaletteChange}
      />
    </div>
  )

  const exit = (
    <Link to="/apps" className="sports-app__exit">← Apps</Link>
  )

  return (
    <PaletteRoot palette={palette} as="section">
      <Shell
        layoutId={layoutId}
        brand={brand}
        nav={NAV}
        route={route}
        pickers={pickers}
        exit={exit}
      >
        <RouteContent route={route} />
      </Shell>
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
    case 'notFound': return <NotFound />
  }
}
