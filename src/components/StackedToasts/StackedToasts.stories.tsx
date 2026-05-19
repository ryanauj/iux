import { useState, type ReactNode } from 'react'
import { type ToastItem } from '../Toast/Toast'
import { StackedToasts, type StackedToastsVariant } from './StackedToasts'

export const VARIANTS: StackedToastsVariant[] = ['cap', 'dedupe', 'severity', 'tray']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '22rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function makeId() { return Math.random().toString(36).slice(2, 8) }

function Trigger({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        font: 'inherit',
        padding: 'var(--space-1) var(--space-3)',
        borderWidth: 'var(--border-width-thin)',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-default)',
        background: 'var(--color-surface-raised)',
        color: 'var(--color-content-primary)',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
      }}
    >{label}</button>
  )
}

function PerVariant({ variant }: { variant: StackedToastsVariant }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const push = (t: Omit<ToastItem, 'id'>) => setToasts(prev => [...prev, { ...t, id: makeId() }])
  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
        <Trigger label="+ info" onClick={() => push({ variant: 'severity', intent: 'info', title: 'New mention', body: 'You were @-mentioned.' })} />
        <Trigger label="+ success" onClick={() => push({ variant: 'severity', intent: 'success', title: 'Sync complete' })} />
        <Trigger label="+ warning" onClick={() => push({ variant: 'severity', intent: 'warning', title: 'Quota near limit', body: '92% used.' })} />
        <Trigger label="+ danger" onClick={() => push({ variant: 'severity', intent: 'danger', title: 'Upload failed', body: 'Check connectivity.' })} />
        <Trigger label="+ dupe info" onClick={() => push({ variant: 'severity', intent: 'info', title: 'New mention', body: 'You were @-mentioned.' })} />
        <Trigger label="× clear" onClick={() => setToasts([])} />
      </div>
      <div style={{
        position: 'relative',
        minHeight: '8rem',
        border: 'var(--border-width-thin) solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-2)',
      }}>
        <StackedToasts
          variant={variant}
          toasts={toasts}
          onDismiss={dismiss}
          position="bottom-right"
          inlineRender
          max={4}
        />
      </div>
    </>
  )
}

export function StackedToastsStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
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
