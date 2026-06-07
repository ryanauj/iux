// ABOUTME: Zero-data placeholder supporting four formats — minimal text+icon, illustrated with primary/secondary CTAs, an onboarding checklist with progress, and a generative seed-field form that lets the user create their first record.

import { useState, type ReactNode } from 'react'
import './EmptyState.css'

// ABOUTME: Presentation mode: 'minimal' shows only a title and optional description, 'illustrated' adds an illustration node and action buttons, 'checklist' lists onboarding steps with done markers and inline action buttons, 'generative' renders editable seed fields and a create button.
export type EmptyStateVariant = 'minimal' | 'illustrated' | 'checklist' | 'generative'

// ABOUTME: One onboarding step for the 'checklist' variant: an id, label, optional description, a done boolean for the checkmark, and an optional action button label/handler.
export interface ChecklistStep {
  id: string
  label: ReactNode
  description?: ReactNode
  done?: boolean
  onAction?: () => void
  actionLabel?: string
}

// ABOUTME: An editable seed field for the 'generative' variant; the user can change its default value before calling onGenerate to create their first record.
export interface GenerativeField {
  key: string
  label: string
  placeholder?: string
  defaultValue?: string
}

// ABOUTME: Props for EmptyState — variant selects the layout, title and description are always shown, illustration feeds the illustrated/generative modes, steps feeds the checklist, and fields/onGenerate feed the generative form.
export interface EmptyStateProps {
  /** Functional axis. The same prop, never a forked component. */
  variant?: EmptyStateVariant
  title: ReactNode
  description?: ReactNode
  /** illustrated: illustration node or icon block. */
  illustration?: ReactNode
  /** illustrated: primary CTA. */
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  /** checklist: onboarding steps. */
  steps?: ChecklistStep[]
  /** generative: seed fields the user can edit in place. */
  fields?: GenerativeField[]
  onGenerate?: (values: Record<string, string>) => void
  generateLabel?: string
  className?: string
}

// ABOUTME: Renders a centred empty-state block with role="status"; shows a title/description block in all modes, then conditionally renders the illustration, CTA buttons, checklist with step counter, or generative seed-field form depending on variant.
/**
 * The 'checklist' variant computes done/total counts and marks each step with a
 * ✓ or ○ glyph. The 'generative' variant initialises local state from field
 * defaultValues and calls `onGenerate(values)` when the create button is clicked.
 * CTA buttons ('illustrated' only) are rendered as primary and ghost variants.
 */
export function EmptyState({
  variant = 'minimal',
  title,
  description,
  illustration,
  primaryAction,
  secondaryAction,
  steps,
  fields,
  onGenerate,
  generateLabel = 'Create my first record',
  className,
}: EmptyStateProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const out: Record<string, string> = {}
    for (const f of fields ?? []) out[f.key] = f.defaultValue ?? ''
    return out
  })

  const classes = ['iux-empty', `iux-empty--${variant}`, className].filter(Boolean).join(' ')
  const totalSteps = steps?.length ?? 0
  const doneCount = steps?.filter(s => s.done).length ?? 0

  return (
    <div className={classes} role="status">
      {(variant === 'illustrated' || variant === 'generative') && illustration && (
        <div className="iux-empty__illustration" aria-hidden="true">{illustration}</div>
      )}

      <div className="iux-empty__heading">
        <h3 className="iux-empty__title">{title}</h3>
        {description && <p className="iux-empty__description">{description}</p>}
      </div>

      {variant === 'checklist' && steps && (
        <>
          <p className="iux-empty__progress">
            {doneCount} of {totalSteps} complete
          </p>
          <ol className="iux-empty__steps" aria-label="Onboarding steps">
            {steps.map(s => (
              <li
                key={s.id}
                className={['iux-empty__step', s.done && 'is-done'].filter(Boolean).join(' ')}
              >
                <span className="iux-empty__step-marker" aria-hidden="true">
                  {s.done ? '✓' : '○'}
                </span>
                <div className="iux-empty__step-body">
                  <div className="iux-empty__step-label">{s.label}</div>
                  {s.description && <div className="iux-empty__step-description">{s.description}</div>}
                </div>
                {s.actionLabel && (
                  <button
                    type="button"
                    className="iux-empty__btn iux-empty__btn--ghost"
                    onClick={s.onAction}
                  >
                    {s.actionLabel}
                  </button>
                )}
              </li>
            ))}
          </ol>
        </>
      )}

      {variant === 'generative' && fields && (
        <div className="iux-empty__generative">
          <p className="iux-empty__caption">
            Edit the seed fields to make this your first real record.
          </p>
          <div className="iux-empty__fields">
            {fields.map(f => (
              <label key={f.key} className="iux-empty__field">
                <span className="iux-empty__field-label">{f.label}</span>
                <input
                  className="iux-empty__field-input"
                  type="text"
                  placeholder={f.placeholder}
                  value={values[f.key] ?? ''}
                  onChange={e => setValues(prev => ({ ...prev, [f.key]: e.target.value }))}
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            className="iux-empty__btn iux-empty__btn--primary"
            onClick={() => onGenerate?.(values)}
          >
            {generateLabel}
          </button>
        </div>
      )}

      {(variant === 'illustrated') && (primaryAction || secondaryAction) && (
        <div className="iux-empty__actions">
          {secondaryAction && (
            <button type="button" className="iux-empty__btn iux-empty__btn--ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button type="button" className="iux-empty__btn iux-empty__btn--primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
