import { useMemo } from 'react'
import { pathSegments, type HashLocation } from './router'
import { AppsLanding } from './AppsLanding'
import { SportsApp } from './sports/SportsApp'
import { ContractsApp } from './contracts/ContractsApp'

interface AppsRouterProps {
  location: HashLocation
}

/**
 * Dispatches `#/apps/...` to either the landing page or a registered
 * app's shell. Each registered app handles its own sub-routes.
 */
export function AppsRouter({ location }: AppsRouterProps) {
  const segments = useMemo(() => pathSegments(location.path), [location.path])
  // segments[0] === 'apps'; segments[1] is the app id.
  const appId = segments[1]

  if (!appId) return <AppsLanding location={location} />
  if (appId === 'sports') return <SportsApp location={location} />
  if (appId === 'contracts') return <ContractsApp location={location} />

  return <AppsLanding location={location} />
}
