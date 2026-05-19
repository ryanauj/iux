import { useState, type ReactNode } from 'react'
import { Drawer, type DrawerVariant, type DrawerView } from './Drawer'

export const VARIANTS: DrawerVariant[] = ['side', 'sectioned', 'navigable', 'sheet']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '20rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
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
    >{label}</button>
  )
}

function SideDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Trigger label="Open side drawer" onClick={() => setOpen(true)} />
      <Drawer variant="side" open={open} onOpenChange={setOpen} title="Filter results">
        <p>Body content goes here.</p>
      </Drawer>
    </>
  )
}

function SectionedDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Trigger label="Open sectioned" onClick={() => setOpen(true)} />
      <Drawer
        variant="sectioned"
        open={open}
        onOpenChange={setOpen}
        title="Edit settings"
        size="lg"
        primaryAction={{ label: 'Save' }}
        secondaryAction={{ label: 'Cancel' }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>Long form field {i + 1}</p>
        ))}
      </Drawer>
    </>
  )
}

const VIEWS: DrawerView[] = [
  { id: 'root', title: 'Settings', render: (push) => (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
      <li><button type="button" onClick={() => push('profile')} style={btn()}>Profile →</button></li>
      <li><button type="button" onClick={() => push('billing')} style={btn()}>Billing →</button></li>
      <li><button type="button" onClick={() => push('integrations')} style={btn()}>Integrations →</button></li>
    </ul>
  )},
  { id: 'profile', title: 'Profile', render: () => <p>Edit your profile fields here.</p> },
  { id: 'billing', title: 'Billing', render: (push) => (
    <>
      <p>Plan details and invoices.</p>
      <button type="button" onClick={() => push('invoice')} style={btn()}>View invoice 2024-09 →</button>
    </>
  )},
  { id: 'invoice', title: 'Invoice 2024-09', render: () => <p>$420.00 — paid on Sep 5</p> },
  { id: 'integrations', title: 'Integrations', render: () => <p>Manage connected tools.</p> },
]

function btn(): React.CSSProperties {
  return {
    appearance: 'none',
    background: 'var(--color-surface-sunken)',
    border: 'var(--border-width-thin) solid var(--color-border-default)',
    color: 'var(--color-content-primary)',
    font: 'inherit',
    padding: 'var(--space-2) var(--space-3)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    textAlign: 'start',
    width: '100%',
  }
}

function NavigableDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Trigger label="Open navigable" onClick={() => setOpen(true)} />
      <Drawer
        variant="navigable"
        open={open}
        onOpenChange={setOpen}
        title="Settings"
        size="md"
        views={VIEWS}
      />
    </>
  )
}

function SheetDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Trigger label="Open bottom sheet" onClick={() => setOpen(true)} />
      <Drawer
        variant="sheet"
        open={open}
        onOpenChange={setOpen}
        title="Quick actions"
        snapPoints={[0.3, 0.6, 0.9]}
        defaultSnapIndex={0}
      >
        <p>Drag the handle to a snap point. Drag down past 25% to dismiss.</p>
      </Drawer>
    </>
  )
}

export function DrawerStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'side' && <Cell label="right-side drawer"><SideDemo /></Cell>}
            {variant === 'sectioned' && <Cell label="header + scroll + sticky footer"><SectionedDemo /></Cell>}
            {variant === 'navigable' && <Cell label="internal nav stack"><NavigableDemo /></Cell>}
            {variant === 'sheet' && <Cell label="snap points + drag-to-dismiss"><SheetDemo /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
