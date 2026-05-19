import { useEffect, useState, type ReactNode } from 'react'
import { Loading, type LoadingVariant } from './Loading'

const VARIANTS: LoadingVariant[] = ['spinner', 'shimmer', 'skeleton', 'optimistic']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '22rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function OptimisticDemo() {
  const [status, setStatus] = useState<'syncing' | 'synced' | 'failed'>('syncing')
  useEffect(() => {
    const id = window.setTimeout(() => setStatus('synced'), 1500)
    return () => window.clearTimeout(id)
  }, [])
  return (
    <Loading variant="optimistic" status={status}>
      <strong>Ship new design</strong>
      <div style={{ color: 'var(--color-content-secondary)' }}>Due Sep 30 · assigned to Avery</div>
    </Loading>
  )
}

export function LoadingStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'spinner' && (
              <Cell label="centered with label">
                <Loading variant="spinner" label="Fetching results" />
              </Cell>
            )}
            {variant === 'shimmer' && (
              <Cell label="3 bars">
                <Loading variant="shimmer" bars={3} label="Loading dashboard" />
              </Cell>
            )}
            {variant === 'skeleton' && (
              <>
                <Cell label="paragraph">
                  <Loading variant="skeleton" shape="paragraph" />
                </Cell>
                <Cell label="card">
                  <Loading variant="skeleton" shape="card" />
                </Cell>
                <Cell label="table rows × 4">
                  <Loading variant="skeleton" shape="table-row" rows={4} />
                </Cell>
                <Cell label="avatar + text">
                  <Loading variant="skeleton" shape="avatar-text" rows={2} />
                </Cell>
              </>
            )}
            {variant === 'optimistic' && (
              <>
                <Cell label="static syncing">
                  <Loading variant="optimistic" status="syncing">
                    <strong>New task</strong>
                    <div style={{ color: 'var(--color-content-secondary)' }}>Just created — server confirmation pending.</div>
                  </Loading>
                </Cell>
                <Cell label="auto syncing → synced"><OptimisticDemo /></Cell>
                <Cell label="failed">
                  <Loading variant="optimistic" status="failed">
                    <strong>Email draft</strong>
                    <div style={{ color: 'var(--color-content-secondary)' }}>Save failed. Retrying…</div>
                  </Loading>
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
