import { useRef, useState, type ReactNode } from 'react'
import { Spotlight, type SpotlightStep, type SpotlightVariant } from './Spotlight'

export const VARIANTS: SpotlightVariant[] = ['single', 'sequence', 'anchor-aware', 'adaptive']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function Targets() {
  return (
    <div style={{
      display: 'flex',
      gap: 'var(--space-3)',
      padding: 'var(--space-3)',
      background: 'var(--color-surface-sunken)',
      borderRadius: 'var(--radius-md)',
    }}>
      <button id="sp-target-1" type="button" style={btn()}>Save</button>
      <button id="sp-target-2" type="button" style={btn()}>Share</button>
      <button id="sp-target-3" type="button" style={btn()}>Settings</button>
    </div>
  )
}

function btn(): React.CSSProperties {
  return {
    font: 'inherit',
    padding: 'var(--space-2) var(--space-3)',
    borderWidth: 'var(--border-width-thin)',
    borderStyle: 'solid',
    borderColor: 'var(--color-border-default)',
    background: 'var(--color-surface-raised)',
    color: 'var(--color-content-primary)',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
  }
}

function SingleDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={btn()}>Show me Save</button>
      <Targets />
      <Spotlight
        variant="single"
        open={open}
        onOpenChange={setOpen}
        steps={[{ id: '1', title: 'Save', body: <>Use this to persist changes.</>, target: '#sp-target-1' }]}
      />
    </>
  )
}

function SequenceDemo() {
  const [open, setOpen] = useState(false)
  const steps: SpotlightStep[] = [
    { id: '1', title: 'Save', body: 'Step 1 — Save your work.', target: '#sp-target-1' },
    { id: '2', title: 'Share', body: 'Step 2 — Share with the team.', target: '#sp-target-2' },
    { id: '3', title: 'Settings', body: 'Step 3 — Tune your workspace.', target: '#sp-target-3' },
  ]
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={btn()}>Start tour</button>
      <Targets />
      <Spotlight variant="sequence" open={open} onOpenChange={setOpen} steps={steps} />
    </>
  )
}

function AnchorAwareDemo() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const steps: SpotlightStep[] = [
    { id: 'persist', title: 'Save (persistent)', body: 'This step\'s target stays visible.', target: '#sp-target-1' },
    { id: 'vanish', title: 'About to vanish', body: 'When you click "Remove target", this step\'s target unmounts and the tour advances.', target: '#sp-target-vanish' },
    { id: 'continued', title: 'Tour continued', body: 'You reached this because the previous target vanished.', target: '#sp-target-3' },
  ]
  return (
    <>
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <button type="button" onClick={() => { setHidden(false); setOpen(true) }} style={btn()}>Start tour</button>
        <button type="button" onClick={() => setHidden(true)} style={btn()}>Remove target</button>
      </div>
      <div ref={containerRef} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--color-surface-sunken)', borderRadius: 'var(--radius-md)' }}>
        <button id="sp-target-1" type="button" style={btn()}>Save</button>
        {!hidden && <button id="sp-target-vanish" type="button" style={btn()}>Vanishing</button>}
        <button id="sp-target-3" type="button" style={btn()}>Settings</button>
      </div>
      <Spotlight variant="anchor-aware" open={open} onOpenChange={setOpen} steps={steps} />
    </>
  )
}

function AdaptiveDemo() {
  const [used] = useState(() => new Set(['save']))
  const [open, setOpen] = useState(false)
  const steps: SpotlightStep[] = [
    { id: 's1', title: 'Save', body: 'You already use Save — this step is skipped.', target: '#sp-target-1', feature: 'save' },
    { id: 's2', title: 'Share', body: 'New: try sharing.', target: '#sp-target-2', feature: 'share' },
    { id: 's3', title: 'Settings', body: 'And the settings panel.', target: '#sp-target-3', feature: 'settings' },
  ]
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} style={btn()}>Show "unseen" tour</button>
      <Targets />
      <Spotlight variant="adaptive" open={open} onOpenChange={setOpen} steps={steps} usedFeatures={used} />
    </>
  )
}

export function SpotlightStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            <Cell label={variant}>
              {variant === 'single' && <SingleDemo />}
              {variant === 'sequence' && <SequenceDemo />}
              {variant === 'anchor-aware' && <AnchorAwareDemo />}
              {variant === 'adaptive' && <AdaptiveDemo />}
            </Cell>
          </div>
        </section>
      ))}
    </div>
  )
}
