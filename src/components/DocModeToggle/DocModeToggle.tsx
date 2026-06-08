// ABOUTME: Two-button radio group that switches documentation voice between 'plain' (everyday English) and 'technical' (token names and code references); reads and writes a DocMode value via a controlled value/onChange pair.

import type { DocMode } from '../../lib/useDocMode'
import './DocModeToggle.css'

// ABOUTME: Props for DocModeToggle — a controlled value/onChange pair for the DocMode selection plus an optional className.
interface DocModeToggleProps {
  value: DocMode
  onChange: (next: DocMode) => void
  className?: string
}

// ABOUTME: The two toggle options (plain and technical), each with a display label and a tooltip title string.
const OPTIONS: { value: DocMode; label: string; title: string }[] = [
  {
    value: 'plain',
    label: 'Plain English',
    title: 'Everyday-language explanations — no CSS or token jargon.',
  },
  {
    value: 'technical',
    label: 'Technical',
    title: 'Original prose with token names, CSS variables and code references.',
  },
]

// ABOUTME: Renders a radiogroup of two buttons ('Plain English' and 'Technical') that calls onChange with the selected DocMode; the active button receives the is-active CSS modifier.
export function DocModeToggle({ value, onChange, className }: DocModeToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Documentation voice"
      className={['iux-doc-mode-toggle', className].filter(Boolean).join(' ')}
    >
      {OPTIONS.map(opt => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            title={opt.title}
            className={['iux-doc-mode-toggle__option', active && 'is-active'].filter(Boolean).join(' ')}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
