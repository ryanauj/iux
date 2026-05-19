import { useEffect, useState, type ReactNode } from 'react'
import { Toast, Toaster, useToastQueue, type ToastItem, type ToastVariant } from './Toast'

export const VARIANTS: ToastVariant[] = ['plain', 'action', 'severity', 'progress']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function StaticToast(props: ToastItem) {
  return (
    <div style={{ position: 'relative' }}>
      <Toast {...props} durationMs={0} onDismiss={() => {}} inlineRender />
    </div>
  )
}

function LiveStack() {
  const { toasts, push, dismiss } = useToastQueue()
  return (
    <>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        <Trigger label="Plain" onClick={() => push({ variant: 'plain', title: 'Saved', body: 'Your changes were saved.' })} />
        <Trigger label="Action" onClick={() => push({ variant: 'action', title: 'Email moved to Trash', action: { label: 'Undo', onClick: () => push({ variant: 'plain', title: 'Restored' }) } })} />
        <Trigger label="Danger" onClick={() => push({ variant: 'severity', intent: 'danger', title: 'Upload failed', body: 'Check your network and retry.' })} />
        <Trigger label="Success" onClick={() => push({ variant: 'severity', intent: 'success', title: 'Sync complete' })} />
      </div>
      <Toaster toasts={toasts} onDismiss={dismiss} position="top-right" severityOrder />
    </>
  )
}

function ProgressLive() {
  const { toasts, push, dismiss, update } = useToastQueue()
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!busy) return
    const id = push({ variant: 'progress', intent: 'info', title: 'Uploading file.zip', body: '0%', progress: 0, durationMs: 0 })
    let pct = 0
    const handle = window.setInterval(() => {
      pct += 0.07
      if (pct >= 1) {
        update(id, { progress: 1, body: 'Complete', variant: 'plain', intent: 'success', durationMs: 1500 })
        setBusy(false)
        window.clearInterval(handle)
        window.setTimeout(() => dismiss(id), 1500)
      } else {
        update(id, { progress: pct, body: `${Math.round(pct * 100)}%` })
      }
    }, 250)
    return () => window.clearInterval(handle)
  }, [busy, push, update, dismiss])

  return (
    <>
      <Trigger label="Start upload" onClick={() => setBusy(true)} />
      <Toaster toasts={toasts} onDismiss={dismiss} position="bottom-right" />
    </>
  )
}

function Trigger({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        font: 'inherit',
        padding: 'var(--space-2) var(--space-3)',
        borderWidth: 'var(--border-width-thin)',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-default)',
        background: 'var(--color-surface-raised)',
        color: 'var(--color-content-primary)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

export function ToastStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'plain' && (
              <Cell label="static example">
                <StaticToast id="x" variant="plain" intent="neutral" title="Saved" body="Your changes were saved." />
              </Cell>
            )}
            {variant === 'action' && (
              <Cell label="undo">
                <StaticToast id="y" variant="action" intent="neutral" title="Email moved to Trash" body="Will be deleted in 30 days." action={{ label: 'Undo', onClick: () => {} }} />
              </Cell>
            )}
            {variant === 'severity' && (
              <>
                <Cell label="info"><StaticToast id="a" variant="severity" intent="info" title="Heads up" body="Maintenance starts at 22:00 UTC." /></Cell>
                <Cell label="success"><StaticToast id="b" variant="severity" intent="success" title="Saved" body="Synced 12 records." /></Cell>
                <Cell label="warning"><StaticToast id="c" variant="severity" intent="warning" title="Quota near limit" body="You've used 92% of your plan." /></Cell>
                <Cell label="danger"><StaticToast id="d" variant="severity" intent="danger" title="Upload failed" body="Network unreachable." /></Cell>
                <Cell label="live stack (severity-ordered)"><LiveStack /></Cell>
              </>
            )}
            {variant === 'progress' && (
              <>
                <Cell label="static @ 60%"><StaticToast id="p" variant="progress" intent="info" title="Uploading file.zip" body="60%" progress={0.6} /></Cell>
                <Cell label="live"><ProgressLive /></Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
