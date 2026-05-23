import { useMemo } from 'react'
import { palettes, type PaletteId } from '../../../palettes'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { Select, type SelectOption } from '../../components/Select/Select'
import { Link } from '../Link'
import { pathSegments, replaceParams, type HashLocation } from '../router'
import { matchSportsRoute, sportsRoutes, type SportsRoute } from './routes'
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

interface NavItem {
  to: string
  label: string
  /** Predicate against the current `SportsRoute` to decide active state. */
  isActive: (route: SportsRoute) => boolean
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

  return (
    <PaletteRoot palette={palette} as="section">
      <div className="sports-app">
        <header className="sports-app__header">
          <Link to={sportsRoutes.home()} className="sports-app__brand">
            <span className="sports-app__brand-mark" aria-hidden="true">NBA</span>
            <span className="sports-app__brand-name">Hoops Hub</span>
          </Link>
          <nav className="sports-app__nav" aria-label="Primary">
            {NAV.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  item.isActive(route)
                    ? 'sports-app__nav-link is-active'
                    : 'sports-app__nav-link'
                }
                aria-current={item.isActive(route) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <span className="sports-app__spacer" />
          <div className="sports-app__picker">
            <Select
              variant="dropdown"
              label="Palette"
              value={paletteId}
              options={paletteOptions}
              onChange={handlePaletteChange}
            />
          </div>
          <Link to="/apps" className="sports-app__exit">← Apps</Link>
        </header>

        <main className="sports-app__main">
          <RouteContent route={route} />
        </main>
      </div>
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
