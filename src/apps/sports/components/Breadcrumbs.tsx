// ABOUTME: Breadcrumbs — a React component (apps).

import { Fragment, type ReactNode } from 'react'
import { Link } from '../../Link'

// ABOUTME: Crumb — an interface.
export interface Crumb {
  label: ReactNode
  to?: string
}

// ABOUTME: Breadcrumbs — a React component.
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="sports-page__breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((c, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="sports-page__breadcrumbs-sep" aria-hidden="true">/</span>}
          {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
        </Fragment>
      ))}
    </nav>
  )
}
