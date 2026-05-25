import type { DocMode } from '../../lib/useDocMode'
import './DocModeToggle.css'

interface DocModeToggleProps {
  value: DocMode
  onChange: (next: DocMode) => void
  className?: string
}

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
