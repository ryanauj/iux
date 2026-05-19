import { useRef, useState, type ReactNode } from 'react'
import { Pagination, type PaginationVariant } from './Pagination'

export const VARIANTS: PaginationVariant[] = ['numbered', 'rich', 'load-more', 'infinite']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function NumberedStateful() {
  const [page, setPage] = useState(7)
  return <Pagination variant="numbered" page={page} pageCount={42} onPageChange={setPage} />
}

function RichStateful() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(25)
  return (
    <Pagination
      variant="rich"
      page={page}
      pageCount={Math.ceil(1000 / size)}
      onPageChange={setPage}
      pageSize={size}
      pageSizeOptions={[10, 25, 50, 100]}
      onPageSizeChange={s => { setSize(s); setPage(1) }}
    />
  )
}

function LoadMoreStateful() {
  const [count, setCount] = useState(40)
  const total = 200
  const [loading, setLoading] = useState(false)
  return (
    <Pagination
      variant="load-more"
      itemCount={count}
      totalCount={total}
      hasMore={count < total}
      loading={loading}
      onLoadMore={() => {
        setLoading(true)
        setTimeout(() => {
          setCount(c => Math.min(total, c + 20))
          setLoading(false)
        }, 400)
      }}
    />
  )
}

function InfiniteStateful() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(20)
  const [loading, setLoading] = useState(false)
  const total = 300
  return (
    <div
      ref={scrollRef}
      style={{
        height: '14rem',
        overflow: 'auto',
        background: 'var(--color-surface-sunken)',
        borderWidth: 'var(--border-width-thin)',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-default)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-2)',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <p key={i} style={{ margin: 'var(--space-1) 0' }}>
          Item {i + 1} of {total}
        </p>
      ))}
      <Pagination
        variant="infinite"
        itemCount={count}
        totalCount={total}
        hasMore={count < total}
        loading={loading}
        onLoadMore={() => {
          if (loading) return
          setLoading(true)
          setTimeout(() => {
            setCount(c => Math.min(total, c + 20))
            setLoading(false)
          }, 400)
        }}
        scrollContainerRef={scrollRef}
      />
    </div>
  )
}

export function PaginationStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'numbered' && (
              <>
                <Cell label="middle"><NumberedStateful /></Cell>
                <Cell label="first page"><Pagination variant="numbered" page={1} pageCount={12} onPageChange={() => {}} /></Cell>
                <Cell label="last page"><Pagination variant="numbered" page={12} pageCount={12} onPageChange={() => {}} /></Cell>
              </>
            )}
            {variant === 'rich' && (
              <Cell label="first/last + size"><RichStateful /></Cell>
            )}
            {variant === 'load-more' && (
              <Cell label="cursor + count"><LoadMoreStateful /></Cell>
            )}
            {variant === 'infinite' && (
              <Cell label="scrollable container with back-to-top"><InfiniteStateful /></Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
