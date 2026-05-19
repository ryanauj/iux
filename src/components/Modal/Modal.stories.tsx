import { useState, type ReactNode } from 'react'
import { Modal, type ModalVariant, type WizardStep } from './Modal'

export const VARIANTS: ModalVariant[] = ['centered', 'sectioned', 'wizard', 'routed']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell">
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
    >
      {label}
    </button>
  )
}

function CenteredDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Trigger label="Open centered" onClick={() => setOpen(true)} />
      <Modal
        variant="centered"
        open={open}
        onOpenChange={setOpen}
        title="Delete this project?"
        description="This action cannot be undone. All workspace data will be lost."
        primaryAction={{ label: 'Delete', intent: 'danger', onClick: () => {} }}
        secondaryAction={{ label: 'Cancel' }}
      />
    </>
  )
}

function SectionedDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Trigger label="Open sectioned" onClick={() => setOpen(true)} />
      <Modal
        variant="sectioned"
        open={open}
        onOpenChange={setOpen}
        title="Edit profile"
        size="lg"
        primaryAction={{ label: 'Save', onClick: () => {} }}
        secondaryAction={{ label: 'Cancel' }}
      >
        <p>
          Long body content that demonstrates how the body scrolls inside a fixed
          dialog frame while the header and footer remain pinned in place.
        </p>
        {Array.from({ length: 18 }).map((_, i) => (
          <p key={i}>
            Item {i + 1}. The dialog has a max height of 100vh − some breathing
            room; once the body content exceeds that envelope it scrolls.
          </p>
        ))}
      </Modal>
    </>
  )
}

const WIZARD_STEPS: WizardStep[] = [
  { id: 'name',  title: 'Name your project',  content: <p>What should we call it?</p> },
  { id: 'team',  title: 'Pick your team',     content: <p>Who's invited?</p> },
  { id: 'plan',  title: 'Choose a plan',      content: <p>Free / Pro / Team.</p> },
  { id: 'done',  title: 'Review',             content: <p>Everything good?</p> },
]

function WizardDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Trigger label="Open wizard" onClick={() => setOpen(true)} />
      <Modal
        variant="wizard"
        open={open}
        onOpenChange={setOpen}
        title="New project"
        size="md"
        steps={WIZARD_STEPS}
        onComplete={() => {}}
      />
    </>
  )
}

function RoutedDemo() {
  return (
    <>
      <Trigger label="Open routed (?modal=story)" onClick={() => {
        const u = new URL(window.location.href)
        u.searchParams.set('modal', 'story')
        window.history.pushState({}, '', u.toString())
        window.dispatchEvent(new PopStateEvent('popstate'))
      }} />
      <Modal
        variant="routed"
        routeKey="modal"
        routeValue="story"
        title="Routed dialog"
        description="The URL above carries ?modal=story while this is open. Browser back closes it; refreshing reopens it."
        primaryAction={{ label: 'OK' }}
      />
    </>
  )
}

export function ModalStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'centered' && (
              <>
                <Cell label="interactive"><CenteredDemo /></Cell>
                <Cell label="open (inline)">
                  <div style={{ position: 'relative', minHeight: '12rem' }}>
                    <Modal
                      variant="centered"
                      open
                      onOpenChange={() => {}}
                      title="Inline preview"
                      description="Rendered inline so the story shows the dialog body without a portal."
                      primaryAction={{ label: 'OK' }}
                      secondaryAction={{ label: 'Cancel' }}
                      inlineRender
                    />
                  </div>
                </Cell>
              </>
            )}
            {variant === 'sectioned' && (
              <>
                <Cell label="interactive"><SectionedDemo /></Cell>
                <Cell label="open (inline)">
                  <div style={{ position: 'relative', minHeight: '20rem' }}>
                    <Modal
                      variant="sectioned"
                      open
                      onOpenChange={() => {}}
                      title="Edit profile"
                      size="md"
                      primaryAction={{ label: 'Save' }}
                      secondaryAction={{ label: 'Cancel' }}
                      inlineRender
                    >
                      <p>Sticky footer; header stays pinned; body scrolls.</p>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <p key={i}>Filler row {i + 1}</p>
                      ))}
                    </Modal>
                  </div>
                </Cell>
              </>
            )}
            {variant === 'wizard' && (
              <>
                <Cell label="interactive"><WizardDemo /></Cell>
                <Cell label="step 2 (inline)">
                  <div style={{ position: 'relative', minHeight: '20rem' }}>
                    <Modal
                      variant="wizard"
                      open
                      onOpenChange={() => {}}
                      title="New project"
                      steps={WIZARD_STEPS}
                      defaultStepIndex={1}
                      inlineRender
                    />
                  </div>
                </Cell>
              </>
            )}
            {variant === 'routed' && (
              <>
                <Cell label="interactive"><RoutedDemo /></Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
