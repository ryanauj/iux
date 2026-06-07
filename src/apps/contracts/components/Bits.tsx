// ABOUTME: Shared presentational primitives for Cap School pages: PageHeader, KeyIdea callout, StatTile, Disclaimer, and the chapter Pager nav.

import type { ReactNode } from 'react'
import { Link } from '../../Link'
import { contractsRoutes } from '../routes'

// ABOUTME: Kicker + title + lede header block rendered at the top of every Cap School chapter.
/**
 * Kicker + title + lede header block rendered at the top of every Cap School
 * chapter. The kicker shows the chapter number and slug (e.g. "Chapter 2 · The thresholds").
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

// ABOUTME: Highlighted aside block used to surface the single most important idea in a section; toned with info/success/warning/danger to match urgency.
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

// ABOUTME: Small key-figure tile showing a large value, a label, and an optional sub-label — used in stat rows at the top of data-heavy chapters.
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

// ABOUTME: Educational disclaimer reused on data-heavy pages.
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

// ABOUTME: Prev/next chapter navigation bar; when there is no next link it falls back to a "Back to start" link to the Overview.
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
