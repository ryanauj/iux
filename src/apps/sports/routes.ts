// ABOUTME: Route definitions and URL helpers for the sports app — SPORTS_BASE prefix, sportsRoutes builders, the SportsRoute discriminated union, and the matchSportsRoute parser.

/**
 * Centralised route helpers for the sports app. Every page builds links
 * through these functions so the route shape can change in one place.
 */

// ABOUTME: Root path segment shared by every sports-app URL, e.g. "/apps/sports".
export const SPORTS_BASE = '/apps/sports'

// ABOUTME: Typed URL-builder functions for every sports route; every Link in the app calls one of these so path shapes can change in a single place.
export const sportsRoutes = {
  home: () => SPORTS_BASE,
  teams: () => `${SPORTS_BASE}/teams`,
  teamDetail: (slug: string) => `${SPORTS_BASE}/teams/${slug}`,
  players: () => `${SPORTS_BASE}/players`,
  playerDetail: (slug: string) => `${SPORTS_BASE}/players/${slug}`,
  games: () => `${SPORTS_BASE}/games`,
  gameDetail: (id: string) => `${SPORTS_BASE}/games/${id}`,
  standings: () => `${SPORTS_BASE}/standings`,
  /** Matchup comparison. With no slugs, the page falls back to a default pairing. */
  matchup: (a?: string, b?: string) =>
    a && b ? `${SPORTS_BASE}/matchup/${a}/${b}` : `${SPORTS_BASE}/matchup`,
} as const

// ABOUTME: Discriminated union of every reachable sports route, consumed by pages and shells to render the correct content without string comparisons.
export type SportsRoute =
  | { kind: 'home' }
  | { kind: 'teams' }
  | { kind: 'teamDetail'; slug: string }
  | { kind: 'players' }
  | { kind: 'playerDetail'; slug: string }
  | { kind: 'games' }
  | { kind: 'gameDetail'; id: string }
  | { kind: 'standings' }
  | { kind: 'matchup'; aSlug?: string; bSlug?: string }
  | { kind: 'notFound' }

// ABOUTME: Parses the segments AFTER `apps/sports` and returns a discriminated route.
/** Parses the segments AFTER `apps/sports` and returns a discriminated route. */
export function matchSportsRoute(segments: string[]): SportsRoute {
  if (segments.length === 0) return { kind: 'home' }
  const [section, slug, slug2] = segments
  switch (section) {
    case 'matchup':
      return { kind: 'matchup', aSlug: slug, bSlug: slug2 }
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
