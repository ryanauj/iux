import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { Link } from '../../Link'
import { sportsRoutes } from '../routes'
import { Breadcrumbs } from '../components/Breadcrumbs'

interface NotFoundProps {
  message?: string
}

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
