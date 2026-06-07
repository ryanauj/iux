// ABOUTME: Slim breadcrumb nav bar used at the top of every sports detail page to show the path back to parent sections.

import { Fragment, type ReactNode } from 'react'
import { Link } from '../../Link'

// ABOUTME: A single breadcrumb entry: a label (any ReactNode) and an optional `to` route; when `to` is omitted the crumb renders as plain text (current page).
export interface Crumb {
  label: ReactNode
  to?: string
}

// ABOUTME: Renders a slash-separated breadcrumb trail; each entry with a `to` becomes a Link, the last entry (no `to`) renders as a plain span marking the current page.
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
