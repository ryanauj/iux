import type { ReactNode } from 'react'
import { Link } from '../../Link'
import { contractsRoutes } from '../routes'

/**
 * Small shared presentational bits used across the Cap School pages:
 * a page header, a "key idea" callout, a stat tile, and the prev/next
 * pager that strings the chapters together. Keeping them here avoids
 * re-deriving the same markup on every page.
 */

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string
  title: string
  lede: ReactNode
}) {
  return (
    <header className="cap-page__header">
      <p className="cap-page__kicker">{kicker}</p>
      <h1 className="cap-page__title">{title}</h1>
      <p className="cap-page__lede">{lede}</p>
    </header>
  )
}

export function KeyIdea({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'success' | 'warning' | 'danger'
  title?: ReactNode
  children: ReactNode
}) {
  return (
    <aside className={`cap-keyidea cap-keyidea--${tone}`}>
      {title && <p className="cap-keyidea__title">{title}</p>}
      <div className="cap-keyidea__body">{children}</div>
    </aside>
  )
}

export function StatTile({
  label,
  value,
  sub,
}: {
  label: ReactNode
  value: ReactNode
  sub?: ReactNode
}) {
  return (
    <div className="cap-stat">
      <span className="cap-stat__value">{value}</span>
      <span className="cap-stat__label">{label}</span>
      {sub && <span className="cap-stat__sub">{sub}</span>}
    </div>
  )
}

/** Educational disclaimer reused on data-heavy pages. */
export function Disclaimer() {
  return (
    <p className="cap-disclaimer">
      Figures use the official 2025–26 cap, tax, and apron numbers with
      standard exception amounts. Examples are simplified for teaching — real
      deals carry rounding, incentives, and projection wrinkles this app
      smooths over.
    </p>
  )
}

interface PagerLink {
  label: string
  to: string
}

export function Pager({ prev, next }: { prev?: PagerLink; next?: PagerLink }) {
  return (
    <nav className="cap-pager" aria-label="Chapter navigation">
      {prev ? (
        <Link to={prev.to} className="cap-pager__link cap-pager__link--prev">
          <span className="cap-pager__dir">← Previous</span>
          <span className="cap-pager__label">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={next.to} className="cap-pager__link cap-pager__link--next">
          <span className="cap-pager__dir">Next →</span>
          <span className="cap-pager__label">{next.label}</span>
        </Link>
      ) : (
        <Link to={contractsRoutes.overview()} className="cap-pager__link cap-pager__link--next">
          <span className="cap-pager__dir">Back to start ↺</span>
          <span className="cap-pager__label">Overview</span>
        </Link>
      )}
    </nav>
  )
}
