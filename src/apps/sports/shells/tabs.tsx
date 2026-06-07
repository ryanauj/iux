// ABOUTME: TabsShell — browser-tabs shell that maintains a persistent strip of open pages; every navigation appends the destination to the strip if not already there, tabs are closeable, and the full tab list is serialised into `?tabs=` so the workspace survives a refresh.

import { useEffect, useMemo } from 'react'
import { Link } from '../../Link'
import {
  navigate,
  replaceParams,
  useHashLocation,
} from '../../router'
import { getPlayerBySlug, getTeamBySlug, getGameById, getTeamById } from '../data'
import { matchSportsRoute, sportsRoutes, SPORTS_BASE, type SportsRoute } from '../routes'
import type { ShellProps, NavItem } from '../layouts'

const HOME_KEY = 'home'

/** Convert a full router path to the shorthand we store in `?tabs=`. */
function pathToKey(fullPath: string): string {
  if (!fullPath.startsWith(SPORTS_BASE)) return HOME_KEY
  const rest = fullPath.slice(SPORTS_BASE.length).replace(/^\//, '')
  return rest === '' ? HOME_KEY : rest
}

function keyToPath(key: string): string {
  if (key === HOME_KEY) return sportsRoutes.home()
  return `${SPORTS_BASE}/${key}`
}

function labelForKey(key: string): string {
  if (key === HOME_KEY) return 'Home'
  const route = matchSportsRoute(key.split('/'))
  return labelForRoute(route, key)
}

function labelForRoute(route: SportsRoute, fallback: string): string {
  switch (route.kind) {
    case 'home': return 'Home'
    case 'teams': return 'Teams'
    case 'teamDetail': return getTeamBySlug(route.slug)?.name ?? route.slug
    case 'players': return 'Players'
    case 'playerDetail': {
      const p = getPlayerBySlug(route.slug)
      return p ? `${p.firstName[0]}. ${p.lastName}` : route.slug
    }
    case 'games': return 'Schedule'
    case 'gameDetail': {
      const g = getGameById(route.id)
      if (!g) return route.id
      const a = getTeamById(g.awayTeamId)?.abbreviation ?? '???'
      const h = getTeamById(g.homeTeamId)?.abbreviation ?? '???'
      return `${a} @ ${h}`
    }
    case 'standings': return 'Standings'
    default: return fallback
  }
}

function TabsNavMenu({ nav, route }: { nav: NavItem[]; route: SportsRoute }) {
  return (
    <nav className="sports-app__tabs-nav" aria-label="Open in tab">
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`sports-app__tabs-nav-link${active ? ' is-active' : ''}`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

// ABOUTME: Shell that renders a tab strip above a standard-page main area; opening a new route appends it to the strip, closing a tab focuses the neighbour and removes it from the `?tabs=` param, and the "+" button opens a fresh Home tab.
/**
 * Tab keys are URL path suffixes (the part after SPORTS_BASE), stored as a
 * comma-joined `?tabs=` param. On each render the shell compares the current
 * route to the strip and appends it via replaceParams if missing. Labels are
 * derived from the route kind (e.g. "BOS @ NYK" for a game detail). Closing
 * the last tab navigates Home and clears the param.
 */
export function TabsShell(props: ShellProps) {
  const location = useHashLocation()
  const tabsParam = location.params.get('tabs')
  const currentKey = pathToKey(location.path)

  const tabs = useMemo<string[]>(() => {
    if (!tabsParam) return [currentKey]
    const parsed = tabsParam.split(',').filter(Boolean)
    return parsed.length > 0 ? parsed : [currentKey]
  }, [tabsParam, currentKey])

  // If the user navigated to a path not in the strip yet, append it. The
  // sticky `tabs` param keeps the existing list across Link clicks; we
  // only ever extend it here.
  useEffect(() => {
    if (!tabs.includes(currentKey)) {
      const next = [...tabs, currentKey]
      replaceParams({ tabs: next.join(',') })
    } else if (!tabsParam) {
      // First mount with no param — initialize the URL so a refresh keeps state.
      replaceParams({ tabs: tabs.join(',') })
    }
  }, [tabs, currentKey, tabsParam])

  const closeTab = (key: string) => {
    const next = tabs.filter(t => t !== key)
    const wasActive = key === currentKey
    if (next.length === 0) {
      replaceParams({ tabs: undefined })
      if (key !== HOME_KEY) navigate(sportsRoutes.home())
      return
    }
    if (wasActive) {
      const idx = tabs.indexOf(key)
      const neighbor = next[Math.min(idx, next.length - 1)]
      replaceParams({ tabs: next.join(',') })
      navigate(keyToPath(neighbor))
    } else {
      replaceParams({ tabs: next.join(',') })
    }
  }

  const openHomeTab = () => navigate(sportsRoutes.home())

  return (
    <div className="sports-app sports-app--tabs">
      <header className="sports-app__header sports-app__header--tabs">
        {props.brand}
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      <div className="sports-tabs">
        <div className="sports-tabs__strip" role="tablist" aria-label="Open tabs">
          {tabs.map(key => {
            const active = key === currentKey
            const canClose = tabs.length > 1
            return (
              <div
                key={key}
                className={`sports-tabs__tab${active ? ' is-active' : ''}`}
                role="tab"
                aria-selected={active}
              >
                <Link
                  to={keyToPath(key)}
                  className="sports-tabs__tab-label"
                  aria-current={active ? 'page' : undefined}
                >
                  {labelForKey(key)}
                </Link>
                {canClose && (
                  <button
                    type="button"
                    className="sports-tabs__close"
                    aria-label={`Close ${labelForKey(key)} tab`}
                    onClick={() => closeTab(key)}
                  >
                    ×
                  </button>
                )}
              </div>
            )
          })}
          <button
            type="button"
            className="sports-tabs__new"
            aria-label="Open Home in a new tab"
            onClick={openHomeTab}
          >
            +
          </button>
        </div>
        <TabsNavMenu nav={props.nav} route={props.route} />
      </div>
      <main className="sports-app__main">{props.children}</main>
    </div>
  )
}
