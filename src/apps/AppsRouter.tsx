// ABOUTME: Dispatches `#/apps/...` to either the landing page or a registered app's shell.

import { useMemo } from 'react'
import { pathSegments, type HashLocation } from './router'
import { AppsLanding } from './AppsLanding'
import { SportsApp } from './sports/SportsApp'
import { ContractsApp } from './contracts/ContractsApp'
import { PromptsApp } from './prompts/PromptsApp'

// ABOUTME: Props for AppsRouter; carries the full HashLocation so sub-apps can read their own path segments and query params.
interface AppsRouterProps {
  location: HashLocation
}

// ABOUTME: Reads segments[1] from the hash path and renders SportsApp, ContractsApp, PromptsApp, or AppsLanding; each registered app owns its own sub-route matching from that point on.
/**
 * Reads the second path segment (e.g. "contracts") from the hash location
 * and renders the matching app root — SportsApp, ContractsApp, or PromptsApp —
 * or falls back to AppsLanding for an unknown or missing segment.
 * Each app handles its own sub-routes internally.
 */
export function AppsRouter({ location }: AppsRouterProps) {
  const segments = useMemo(() => pathSegments(location.path), [location.path])
  // segments[0] === 'apps'; segments[1] is the app id.
  const appId = segments[1]

  if (!appId) return <AppsLanding location={location} />
  if (appId === 'sports') return <SportsApp location={location} />
  if (appId === 'contracts') return <ContractsApp location={location} />
  if (appId === 'prompts') return <PromptsApp location={location} />

  return <AppsLanding location={location} />
}
