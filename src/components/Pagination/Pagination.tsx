import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import './Pagination.css'

export type PaginationVariant = 'numbered' | 'rich' | 'load-more' | 'infinite'

export interface PaginationProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: PaginationVariant

  /** numbered + rich. 1-based. */
  page?: number
  pageCount?: number
  onPageChange?: (page: number) => void

  /** rich: page size selector. */
  pageSize?: number
  pageSizeOptions?: number[]
  onPageSizeChange?: (size: number) => void

  /** load-more + infinite. */
  hasMore?: boolean
  loading?: boolean
  onLoadMore?: () => void
  itemCount?: number
  totalCount?: number

  /** infinite: scroll container to watch (defaults to window). */
  scrollContainerRef?: React.RefObject<HTMLElement | null>

  className?: string
  ariaLabel?: string
}

function pageList(page: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | 'gap')[] = []
  pages.push(1)
  if (page > 4) pages.push('gap')
  for (let p = Math.max(2, page - 1); p <= Math.min(total - 1, page + 1); p++) pages.push(p)
  if (page < total - 3) pages.push('gap')
  pages.push(total)
  return pages
}

export function Pagination({
  variant = 'numbered',
  page = 1,
  pageCount = 1,
  onPageChange,
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  hasMore,
  loading,
  onLoadMore,
  itemCount,
  totalCount,
  scrollContainerRef,
  className,
  ariaLabel = 'Pagination',
}: PaginationProps) {
  const goto = useCallback(
    (p: number) => {
      const clamped = Math.max(1, Math.min(pageCount, p))
      if (clamped !== page) onPageChange?.(clamped)
    },
    [pageCount, page, onPageChange],
  )

  // ---------- Infinite scroll sentinel ----------
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (variant !== 'infinite') return
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting && hasMore && !loading) onLoadMore?.()
      }
    }, { rootMargin: '120px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [variant, hasMore, loading, onLoadMore])

  useEffect(() => {
    if (variant !== 'infinite') return
    const target = scrollContainerRef?.current
    const onScroll = () => {
      const top = target ? target.scrollTop : window.scrollY
      setScrolled(top > 320)
    }
    if (target) target.addEventListener('scroll', onScroll, { passive: true })
    else window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      if (target) target.removeEventListener('scroll', onScroll)
      else window.removeEventListener('scroll', onScroll)
    }
  }, [variant, scrollContainerRef])

  const scrollToTop = () => {
    const target = scrollContainerRef?.current
    if (target) target.scrollTo({ top: 0, behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const classes = ['iux-pagination', `iux-pagination--${variant}`, className].filter(Boolean).join(' ')

  if (variant === 'load-more' || variant === 'infinite') {
    return (
      <nav className={classes} aria-label={ariaLabel}>
        {(itemCount !== undefined || totalCount !== undefined) && (
          <span className="iux-pagination__count" role="status" aria-live="polite">
            {itemCount !== undefined && totalCount !== undefined
              ? `${itemCount.toLocaleString()} of ${totalCount.toLocaleString()}`
              : itemCount !== undefined ? `${itemCount.toLocaleString()} items`
              : `of ${totalCount?.toLocaleString()}`}
          </span>
        )}
        {variant === 'load-more' && (
          <button
            type="button"
            className="iux-pagination__btn iux-pagination__btn--primary"
            onClick={onLoadMore}
            disabled={!hasMore || loading}
          >
            {loading ? 'Loading…' : hasMore ? 'Load more' : 'All loaded'}
          </button>
        )}
        {variant === 'infinite' && (
          <>
            <div ref={sentinelRef} className="iux-pagination__sentinel" aria-hidden="true" />
            {loading && <span className="iux-pagination__loading" role="status">Loading…</span>}
            {scrolled && (
              <button type="button" className="iux-pagination__top" onClick={scrollToTop} aria-label="Back to top">
                ↑ Back to top
              </button>
            )}
          </>
        )}
      </nav>
    )
  }

  // numbered + rich
  const pages = pageList(page, pageCount)
  return (
    <nav className={classes} aria-label={ariaLabel}>
      {variant === 'rich' && (
        <button
          type="button"
          className="iux-pagination__btn"
          onClick={() => goto(1)}
          disabled={page <= 1}
          aria-label="First page"
        >
          «
        </button>
      )}
      <button
        type="button"
        className="iux-pagination__btn"
        onClick={() => goto(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((p, i) => p === 'gap' ? (
        <span key={`gap-${i}`} className="iux-pagination__gap" aria-hidden="true">…</span>
      ) : (
        <button
          key={p}
          type="button"
          className={['iux-pagination__btn', 'iux-pagination__btn--num', p === page && 'is-current'].filter(Boolean).join(' ')}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`Page ${p}`}
          onClick={() => goto(p)}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className="iux-pagination__btn"
        onClick={() => goto(page + 1)}
        disabled={page >= pageCount}
        aria-label="Next page"
      >
        ›
      </button>
      {variant === 'rich' && (
        <button
          type="button"
          className="iux-pagination__btn"
          onClick={() => goto(pageCount)}
          disabled={page >= pageCount}
          aria-label="Last page"
        >
          »
        </button>
      )}
      {variant === 'rich' && pageSize !== undefined && (
        <label className="iux-pagination__size">
          <span>Per page</span>
          <select
            value={pageSize}
            onChange={e => onPageSizeChange?.(Number(e.target.value))}
            className="iux-pagination__size-select"
          >
            {pageSizeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </label>
      )}
    </nav>
  )
}

