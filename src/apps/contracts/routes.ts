// ABOUTME: Centralised route helpers for the Cap School app.

/**
 * Centralised route helpers for the Cap School app. Pages build links
 * through these so the route shape lives in one place — mirrors the
 * pattern the sibling sports app uses.
 */

// ABOUTME: Centralised route helpers for the Cap School app.
export const CONTRACTS_BASE = '/apps/contracts'

// ABOUTME: contractsRoutes — an exported value.
export const contractsRoutes = {
  overview: () => CONTRACTS_BASE,
  ladder: () => `${CONTRACTS_BASE}/ladder`,
  anatomy: () => `${CONTRACTS_BASE}/anatomy`,
  maxDeals: () => `${CONTRACTS_BASE}/max`,
  exceptions: () => `${CONTRACTS_BASE}/exceptions`,
  tax: () => `${CONTRACTS_BASE}/tax`,
  aprons: () => `${CONTRACTS_BASE}/aprons`,
  trades: () => `${CONTRACTS_BASE}/trades`,
  team: () => `${CONTRACTS_BASE}/team`,
} as const

// ABOUTME: ContractsRoute — a type alias.
export type ContractsRoute =
  | { kind: 'overview' }
  | { kind: 'ladder' }
  | { kind: 'anatomy' }
  | { kind: 'maxDeals' }
  | { kind: 'exceptions' }
  | { kind: 'tax' }
  | { kind: 'aprons' }
  | { kind: 'trades' }
  | { kind: 'team' }
  | { kind: 'notFound' }

// ABOUTME: Parses the segments AFTER `apps/contracts` and returns a discriminated route.
/** Parses the segments AFTER `apps/contracts` and returns a discriminated route. */
export function matchContractsRoute(segments: string[]): ContractsRoute {
  if (segments.length === 0) return { kind: 'overview' }
  switch (segments[0]) {
    case 'ladder':
      return { kind: 'ladder' }
    case 'anatomy':
      return { kind: 'anatomy' }
    case 'max':
      return { kind: 'maxDeals' }
    case 'exceptions':
      return { kind: 'exceptions' }
    case 'tax':
      return { kind: 'tax' }
    case 'aprons':
      return { kind: 'aprons' }
    case 'trades':
      return { kind: 'trades' }
    case 'team':
      return { kind: 'team' }
    default:
      return { kind: 'notFound' }
  }
}
