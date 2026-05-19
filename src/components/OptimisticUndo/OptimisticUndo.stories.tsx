import { useState, type ReactNode } from 'react'
import { OptimisticUndo, useOptimisticUndo, type OptimisticUndoVariant } from './OptimisticUndo'

const VARIANTS: OptimisticUndoVariant[] = ['toast', 'countdown', 'queue', 'log']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function Trigger({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={{
      font: 'inherit',
      padding: 'var(--space-1) var(--space-3)',
      borderWidth: 'var(--border-width-thin)',
      borderStyle: 'solid',
      borderColor: 'var(--color-border-default)',
      background: 'var(--color-surface-raised)',
      color: 'var(--color-content-primary)',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
    }}>{label}</button>
  )
}

function PerVariant({ variant }: { variant: OptimisticUndoVariant }) {
  const { actions, history, push, commit, undo } = useOptimisticUndo(5000)
  const [items, setItems] = useState<string[]>(['Email A', 'Email B', 'Email C', 'Email D', 'Email E'])
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', marginBottom: 'var(--space-3)' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {items.map(email => (
            <li key={email} style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              padding: 'var(--space-1) var(--space-3)',
              background: 'var(--color-surface-sunken)',
              border: 'var(--border-width-thin) solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <span>{email}</span>
              <Trigger label="Delete" onClick={() => {
                setItems(prev => prev.filter(e => e !== email))
                push(`Deleted "${email}"`, () => {
                  setItems(prev => prev.includes(email) ? prev : [...prev, email])
                }, { ttlMs: 5000 })
              }} />
            </li>
          ))}
        </ul>
      </div>
      <div style={{
        position: 'relative',
        minHeight: '6rem',
        border: 'var(--border-width-thin) solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-2)',
      }}>
        <OptimisticUndo
          variant={variant}
          actions={actions}
          onCommit={commit}
          onUndo={undo}
          history={history}
          inlineRender
        />
      </div>
    </>
  )
}

export function OptimisticUndoStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            <Cell label={variant}>
              <PerVariant variant={variant} />
            </Cell>
          </div>
        </section>
      ))}
    </div>
  )
}
