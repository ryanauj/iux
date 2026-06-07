// ABOUTME: Catch-all 404 page for unrecognised Promptbook routes: shows a minimal EmptyState with a "Back to library" action.

import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { navigate } from '../../router'
import { promptRoutes } from '../routes'

// ABOUTME: Catch-all 404 page rendered by PromptsApp when matchPromptsRoute returns `{ kind: 'notFound' }`; shows a minimal EmptyState with a "Back to library" navigation action.
export function NotFound() {
  return (
    <div className="pb-page">
      <EmptyState
        variant="minimal"
        title="Page not found"
        description="That Promptbook route doesn't exist."
        primaryAction={{ label: 'Back to library', onClick: () => navigate(promptRoutes.library()) }}
      />
    </div>
  )
}
