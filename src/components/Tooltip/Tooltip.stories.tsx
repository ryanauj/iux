import { useState, type ReactNode } from 'react'
import { Tooltip, type TooltipVariant } from './Tooltip'

export const VARIANTS: TooltipVariant[] = ['plain', 'shortcut', 'rich', 'coach']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '14rem', height: '4rem', justifyContent: 'center' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function TriggerBtn({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
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
      {children}
    </button>
  )
}

function CoachStateful() {
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(true)
  return (
    <Tooltip
      variant="coach"
      side="bottom"
      open={open}
      onOpenChange={setOpen}
      title={`Step ${step}`}
      content={
        step === 1 ? 'Welcome — this is the trigger.'
        : step === 2 ? 'You can read content over here.'
        : 'You can dismiss this tour any time.'
      }
      step={{
        current: step,
        total: 3,
        onNext: () => {
          if (step >= 3) setOpen(false)
          else setStep(s => s + 1)
        },
        onSkip: () => setOpen(false),
      }}
    >
      <TriggerBtn>Hover or focus me</TriggerBtn>
    </Tooltip>
  )
}

export function TooltipStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'plain' && (
              <>
                <Cell label="top">
                  <Tooltip variant="plain" side="top" content="Saves your work" delayMs={100}>
                    <TriggerBtn>Save</TriggerBtn>
                  </Tooltip>
                </Cell>
                <Cell label="right">
                  <Tooltip variant="plain" side="right" content="Right side label" delayMs={100}>
                    <TriggerBtn>Right</TriggerBtn>
                  </Tooltip>
                </Cell>
                <Cell label="bottom">
                  <Tooltip variant="plain" side="bottom" content="Bottom side label" delayMs={100}>
                    <TriggerBtn>Bottom</TriggerBtn>
                  </Tooltip>
                </Cell>
                <Cell label="left">
                  <Tooltip variant="plain" side="left" content="Left side label" delayMs={100}>
                    <TriggerBtn>Left</TriggerBtn>
                  </Tooltip>
                </Cell>
              </>
            )}
            {variant === 'shortcut' && (
              <Cell label="trailing kbd chip">
                <Tooltip variant="shortcut" content="Open command palette" shortcut="⌘K" side="top">
                  <TriggerBtn>Cmd+K</TriggerBtn>
                </Tooltip>
              </Cell>
            )}
            {variant === 'rich' && (
              <Cell label="title + thumb + pin">
                <Tooltip
                  variant="rich"
                  pinnable
                  side="bottom"
                  title="Layer panel"
                  content="Group, hide, and reorder objects on the canvas. Click pins this tooltip."
                  thumbnail={<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 3v18" /></svg>}
                >
                  <TriggerBtn>Layers</TriggerBtn>
                </Tooltip>
              </Cell>
            )}
            {variant === 'coach' && (
              <Cell label="3-step tour">
                <CoachStateful />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
