// ABOUTME: Generic 404 page for the sports app, shown when a route or id is unresolvable; displays a breadcrumb trail, an EmptyState with an optional custom message, and a link back to Home.

import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { Link } from '../../Link'
import { sportsRoutes } from '../routes'
import { Breadcrumbs } from '../components/Breadcrumbs'

interface NotFoundProps {
  message?: string
}

// ABOUTME: Renders a "Page not found" EmptyState with an optional caller-supplied message (used by GameDetail, TeamDetail, PlayerDetail to explain the missing entity) and a Home breadcrumb link.
export function NotFound({ message }: NotFoundProps) {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: 'Home', to: sportsRoutes.home() }, { label: 'Not found' }]} />
      <EmptyState
        variant="minimal"
        title="Page not found"
        description={message ?? "That route doesn't map to anything in the app."}
      />
      <div className="sports-page__inline-actions" style={{ justifyContent: 'center', marginTop: 'var(--space-3)' }}>
        <Link to={sportsRoutes.home()} className="sports-app__nav-link is-active">
          Back to Home
        </Link>
      </div>
    </>
  )
}
