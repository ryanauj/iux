import type { ReactNode } from 'react'
import { Select, type SelectOption, type SelectVariant } from './Select'

const FRUITS: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'pear', label: 'Pear' },
  { value: 'cherry', label: 'Cherry', disabled: true },
  { value: 'fig', label: 'Fig' },
]

const GROUPED: SelectOption[] = [
  { value: 'apple', label: 'Apple', group: 'Pomes' },
  { value: 'pear', label: 'Pear', group: 'Pomes' },
  { value: 'cherry', label: 'Cherry', group: 'Stone fruit' },
  { value: 'peach', label: 'Peach', group: 'Stone fruit' },
  { value: 'fig', label: 'Fig', group: 'Other' },
]

export const VARIANTS: SelectVariant[] = ['native', 'dropdown', 'combobox', 'async']
const STATES = [
  { key: 'default', label: 'default', props: {} },
  { key: 'hover', label: 'hover', props: { stateLock: 'hover' as const } },
  { key: 'focus', label: 'focus', props: { stateLock: 'focus' as const } },
  { key: 'open', label: 'open', props: { stateLock: 'open' as const } },
  { key: 'disabled', label: 'disabled', props: { disabled: true } },
  { key: 'error', label: 'error', props: { error: 'Pick one' } },
]

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell">
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

// Stand-in for a server search — filters the in-memory list with a small
// artificial latency.
const STAR_TREK: SelectOption[] = [
  { value: 'picard', label: 'Jean-Luc Picard', description: 'Captain' },
  { value: 'riker',  label: 'William Riker', description: 'First officer' },
  { value: 'data',   label: 'Data', description: 'Operations' },
  { value: 'worf',   label: 'Worf', description: 'Security' },
  { value: 'crusher',label: 'Beverly Crusher', description: 'Medical' },
  { value: 'troi',   label: 'Deanna Troi', description: 'Counselor' },
  { value: 'laforge',label: 'Geordi La Forge', description: 'Engineering' },
]

async function loadCrew(query: string): Promise<SelectOption[]> {
  await new Promise(r => setTimeout(r, 120))
  const q = query.trim().toLowerCase()
  if (!q) return STAR_TREK
  return STAR_TREK.filter(o => o.label.toLowerCase().includes(q))
}

export function SelectStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>

          <div className="stories__cells">
            {STATES.map(s => (
              <Cell key={s.key} label={s.label}>
                {variant === 'async' ? (
                  <Select
                    variant="async"
                    label="Crew"
                    placeholder="Search crew…"
                    loadOptions={loadCrew}
                    creatable
                    {...s.props}
                  />
                ) : variant === 'combobox' ? (
                  <Select
                    variant="combobox"
                    label="Fruit"
                    placeholder="Type to filter…"
                    options={FRUITS}
                    {...s.props}
                  />
                ) : variant === 'dropdown' ? (
                  <Select
                    variant="dropdown"
                    label="Fruit"
                    placeholder="Choose a fruit"
                    options={GROUPED}
                    {...s.props}
                  />
                ) : (
                  <Select
                    variant="native"
                    label="Fruit"
                    placeholder="Choose a fruit"
                    options={GROUPED}
                    {...s.props}
                  />
                )}
              </Cell>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
