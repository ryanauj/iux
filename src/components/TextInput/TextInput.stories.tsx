import { useState, type ReactNode } from 'react'
import { TextInput, type TextInputVariant, type ValidationResult } from './TextInput'

export const VARIANTS: TextInputVariant[] = ['bordered', 'floating', 'validate', 'command']

const STATES = [
  { key: 'empty', label: 'empty', props: {} },
  { key: 'filled', label: 'filled', props: { defaultValue: 'product launch' } },
  { key: 'hover', label: 'hover', props: { stateLock: 'hover' as const, defaultValue: 'product launch' } },
  { key: 'focus', label: 'focus', props: { stateLock: 'focus' as const, defaultValue: 'product launch' } },
  { key: 'error', label: 'error', props: { defaultValue: 'bad@', error: 'enter a valid email' } },
  { key: 'disabled', label: 'disabled', props: { disabled: true, defaultValue: 'locked' } },
  { key: 'readonly', label: 'readonly', props: { readOnly: true, defaultValue: 'read-only' } },
]

function emailValidate(v: string): ValidationResult | null {
  if (!v) return null
  if (!v.includes('@')) return { status: 'warning', message: 'missing @' }
  if (!/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(v)) return { status: 'danger', message: 'not a valid email' }
  return { status: 'success', message: 'looks good' }
}

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell">
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function MagnifierIcon() {
  return (
    <svg viewBox="0 0 16 16" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="7" r="4" />
      <path d="M10 10l4 4" />
    </svg>
  )
}

function CommandDemo() {
  const [value, setValue] = useState('')
  return (
    <TextInput
      variant="command"
      label="search"
      placeholder="Search files, commands…"
      leadingIcon={<MagnifierIcon />}
      value={value}
      onChange={v => setValue(v)}
      suggestion={value && 'search files'.startsWith(value.toLowerCase()) ? 'search files' : undefined}
      hint="Tab to accept the ghost suggestion"
    />
  )
}

export function TextInputStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>

          <div className="stories__cells">
            {STATES.map(s => (
              <Cell key={s.key} label={s.label}>
                <TextInput
                  variant={variant}
                  label="email"
                  placeholder="name@host"
                  hint={s.key === 'empty' ? 'we never share this' : undefined}
                  required
                  validate={variant === 'validate' ? emailValidate : undefined}
                  {...s.props}
                />
              </Cell>
            ))}
          </div>

          {variant === 'command' && (
            <div className="stories__cells">
              <Cell label="interactive ghost-text (type &lsquo;sea&rsquo; then Tab)">
                <CommandDemo />
              </Cell>
            </div>
          )}
        </section>
      ))}
    </div>
  )
}
