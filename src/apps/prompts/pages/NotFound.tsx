// ABOUTME: NotFound — a React component (apps).

import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { navigate } from '../../router'
import { promptRoutes } from '../routes'

// ABOUTME: NotFound — a React component.
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
