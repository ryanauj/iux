import { useState, type ReactNode } from 'react'
import { Stepper, type StepperStep, type StepperVariant } from './Stepper'

export const VARIANTS: StepperVariant[] = ['linear', 'validated', 'branching', 'resumable']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function LinearDemo() {
  const steps: StepperStep[] = [
    { id: 'name', title: 'Name', description: 'What should we call it?', content: <p>Project name input here.</p> },
    { id: 'team', title: 'Team', description: 'Pick collaborators', content: <p>Team picker here.</p> },
    { id: 'plan', title: 'Plan', description: 'Choose a tier', content: <p>Plan selection here.</p> },
    { id: 'review', title: 'Review', content: <p>Review and submit.</p> },
  ]
  return <Stepper variant="linear" steps={steps} />
}

function ValidatedDemo() {
  const [name, setName] = useState('')
  const steps: StepperStep[] = [
    {
      id: 'name', title: 'Name', content: (
        <input
          autoFocus
          placeholder="Project name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            font: 'inherit',
            padding: 'var(--space-2)',
            border: 'var(--border-width-thin) solid var(--color-border-default)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-surface-sunken)',
            color: 'var(--color-content-primary)',
            width: '100%',
          }}
        />
      ),
      validate: () => name.trim().length >= 3 || 'Name must be at least 3 characters',
    },
    { id: 'plan', title: 'Plan', content: <p>Plan picker.</p> },
  ]
  return <Stepper variant="validated" steps={steps} />
}

function BranchingDemo() {
  const [path, setPath] = useState<'pro' | 'free'>('free')
  const steps: StepperStep[] = [
    {
      id: 'tier', title: 'Tier', content: (
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button type="button" onClick={() => setPath('free')} aria-pressed={path === 'free'} style={btn(path === 'free')}>Free</button>
          <button type="button" onClick={() => setPath('pro')} aria-pressed={path === 'pro'} style={btn(path === 'pro')}>Pro</button>
        </div>
      ),
      next: () => path === 'pro' ? 'billing' : 'done',
    },
    { id: 'billing', title: 'Billing (Pro)', content: <p>Card details.</p>, next: () => 'done' },
    { id: 'done', title: 'Done', content: <p>Welcome!</p> },
  ]
  return <Stepper variant="branching" steps={steps} />
}

function btn(active: boolean): React.CSSProperties {
  return {
    font: 'inherit',
    padding: 'var(--space-1) var(--space-3)',
    border: `var(--border-width-thin) solid var(${active ? '--color-intent-primary-border' : '--color-border-default'})`,
    background: active ? 'var(--color-intent-primary-bg)' : 'var(--color-surface-raised)',
    color: active ? 'var(--color-intent-primary-content)' : 'var(--color-content-primary)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
  }
}

function ResumableDemo() {
  const steps: StepperStep[] = [
    { id: 'intro', title: 'Intro', content: <p>Step state persists to localStorage + URL hash.</p> },
    { id: 'config', title: 'Configure', content: <p>Adjust settings.</p> },
    { id: 'review', title: 'Review', content: <p>Check it.</p> },
    { id: 'ship', title: 'Ship', content: <p>Launch 🚀</p> },
  ]
  return <Stepper variant="resumable" steps={steps} storageKey="demo" />
}

export function StepperStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'linear' && <Cell label="basic"><LinearDemo /></Cell>}
            {variant === 'validated' && <Cell label="next blocks until valid"><ValidatedDemo /></Cell>}
            {variant === 'branching' && <Cell label="branch on choice"><BranchingDemo /></Cell>}
            {variant === 'resumable' && <Cell label="persists to URL + storage"><ResumableDemo /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
