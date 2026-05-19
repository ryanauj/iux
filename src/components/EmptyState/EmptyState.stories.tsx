import { useState, type ReactNode } from 'react'
import { EmptyState, type EmptyStateVariant } from './EmptyState'

const VARIANTS: EmptyStateVariant[] = ['minimal', 'illustrated', 'checklist', 'generative']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function ChecklistStateful() {
  const [done, setDone] = useState<Set<string>>(new Set(['workspace']))
  const toggle = (id: string) => setDone(prev => {
    const next = new Set(prev)
    if (next.has(id)) next.delete(id); else next.add(id)
    return next
  })
  return (
    <EmptyState
      variant="checklist"
      title="Set up your workspace"
      description="Finish onboarding to unlock the dashboard."
      steps={[
        { id: 'workspace', label: 'Name your workspace', done: done.has('workspace'), actionLabel: 'Edit', onAction: () => toggle('workspace') },
        { id: 'invite', label: 'Invite teammates', description: 'Add at least one collaborator.', done: done.has('invite'), actionLabel: 'Invite', onAction: () => toggle('invite') },
        { id: 'integ', label: 'Connect a tool', description: 'Sync with Slack, GitHub, or Notion.', done: done.has('integ'), actionLabel: 'Connect', onAction: () => toggle('integ') },
      ]}
    />
  )
}

function GenerativeStateful() {
  const [out, setOut] = useState<Record<string, string> | null>(null)
  return (
    <>
      <EmptyState
        variant="generative"
        title="Make your first ticket"
        description="Edit the example below; it becomes your first real ticket."
        illustration={<svg viewBox="0 0 16 16" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="10" rx="1.5" /><path d="M4 6h8M4 9h6M4 12h4" /></svg>}
        fields={[
          { key: 'title', label: 'Title', defaultValue: 'Add a dark mode toggle' },
          { key: 'severity', label: 'Severity', defaultValue: 'medium' },
          { key: 'assignee', label: 'Assignee', placeholder: 'who owns this?' },
        ]}
        onGenerate={setOut}
      />
      {out && (
        <pre style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--color-surface-sunken)', borderRadius: 'var(--radius-sm)' }}>
          {JSON.stringify(out, null, 2)}
        </pre>
      )}
    </>
  )
}

export function EmptyStateStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'minimal' && (
              <Cell label="centered text">
                <EmptyState variant="minimal" title="No results" description="Try a different filter." />
              </Cell>
            )}
            {variant === 'illustrated' && (
              <Cell label="illustration + CTA">
                <EmptyState
                  variant="illustrated"
                  title="Your inbox is empty"
                  description="When you receive new messages, they will show up here."
                  illustration={<svg viewBox="0 0 16 16" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h12v10H2z M2 9h4l1 1h2l1-1h4" /></svg>}
                  primaryAction={{ label: 'Compose', onClick: () => {} }}
                  secondaryAction={{ label: 'Import', onClick: () => {} }}
                />
              </Cell>
            )}
            {variant === 'checklist' && (
              <Cell label="onboarding steps">
                <ChecklistStateful />
              </Cell>
            )}
            {variant === 'generative' && (
              <Cell label="editable seed">
                <GenerativeStateful />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
