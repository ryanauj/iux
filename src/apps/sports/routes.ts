/**
 * Centralised route helpers for the sports app. Every page builds links
 * through these functions so the route shape can change in one place.
 */

export const SPORTS_BASE = '/apps/sports'

export const sportsRoutes = {
  home: () => SPORTS_BASE,
  teams: () => `${SPORTS_BASE}/teams`,
  teamDetail: (slug: string) => `${SPORTS_BASE}/teams/${slug}`,
  players: () => `${SPORTS_BASE}/players`,
  playerDetail: (slug: string) => `${SPORTS_BASE}/players/${slug}`,
  games: () => `${SPORTS_BASE}/games`,
  gameDetail: (id: string) => `${SPORTS_BASE}/games/${id}`,
  standings: () => `${SPORTS_BASE}/standings`,
} as const

export type SportsRoute =
  | { kind: 'home' }
  | { kind: 'teams' }
  | { kind: 'teamDetail'; slug: string }
  | { kind: 'players' }
  | { kind: 'playerDetail'; slug: string }
  | { kind: 'games' }
  | { kind: 'gameDetail'; id: string }
  | { kind: 'standings' }
  | { kind: 'notFound' }

/** Parses the segments AFTER `apps/sports` and returns a discriminated route. */
export function matchSportsRoute(segments: string[]): SportsRoute {
  if (segments.length === 0) return { kind: 'home' }
  const [section, slug] = segments
  switch (section) {
    case 'teams':
      if (!slug) return { kind: 'teams' }
      return { kind: 'teamDetail', slug }
    case 'players':
      if (!slug) return { kind: 'players' }
      return { kind: 'playerDetail', slug }
    case 'games':
      if (!slug) return { kind: 'games' }
      return { kind: 'gameDetail', id: slug }
    case 'standings':
      return { kind: 'standings' }
    default:
      return { kind: 'notFound' }
  }
}
