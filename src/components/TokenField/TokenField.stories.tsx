import { useState, type ReactNode } from 'react'
import { TokenField, type Token, type TokenFieldVariant, type TokenOption } from './TokenField'

const VARIANTS: TokenFieldVariant[] = ['split', 'typeahead', 'grouped', 'structured']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const SUGGESTIONS: TokenOption[] = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'svelte', label: 'Svelte', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'deno', label: 'Deno', group: 'Backend' },
  { value: 'bun', label: 'Bun', group: 'Backend' },
  { value: 'postgres', label: 'Postgres', group: 'Database' },
  { value: 'sqlite', label: 'SQLite', group: 'Database' },
]

const STRUCTURED: TokenOption[] = [
  { value: 'avery', label: 'Avery N.', meta: { role: 'Engineer', email: 'avery@iux.dev' } },
  { value: 'blair', label: 'Blair O.', meta: { role: 'Designer', email: 'blair@iux.dev' } },
  { value: 'cameron', label: 'Cameron P.', meta: { role: 'PM', email: 'cameron@iux.dev' } },
]

function StatefulSplit() {
  const [v, setV] = useState<Token[]>([{ value: 'alpha', label: 'alpha' }, { value: 'beta', label: 'beta' }])
  return <TokenField variant="split" label="Tags" value={v} onChange={setV} placeholder="Type, comma to commit" />
}

function StatefulTypeahead() {
  const [v, setV] = useState<Token[]>([{ value: 'react', label: 'React' }])
  return <TokenField variant="typeahead" label="Stack" value={v} onChange={setV} options={SUGGESTIONS} placeholder="Type or paste" />
}

function StatefulGrouped() {
  const [v, setV] = useState<Token[]>([])
  return (
    <TokenField
      variant="grouped"
      label="Pick up to 3"
      value={v}
      onChange={setV}
      options={SUGGESTIONS}
      maxCount={3}
      validate={s => s.length >= 2 || 'too short'}
      placeholder="search…"
    />
  )
}

function StatefulStructured() {
  const [v, setV] = useState<Token[]>([{ value: 'avery', label: 'Avery N.', meta: { role: 'Engineer', email: 'avery@iux.dev' } }])
  return (
    <TokenField
      variant="structured"
      label="Reviewers"
      value={v}
      onChange={setV}
      options={STRUCTURED}
      placeholder="add reviewer…"
      hint="Click a chip to edit its metadata"
    />
  )
}

export function TokenFieldStories() {
  return (
    <div className="stories__component">
      {VARIANTS.map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'split' && <Cell label="comma/enter to commit"><StatefulSplit /></Cell>}
            {variant === 'typeahead' && <Cell label="suggestions + paste"><StatefulTypeahead /></Cell>}
            {variant === 'grouped' && <Cell label="grouped + maxCount + validate"><StatefulGrouped /></Cell>}
            {variant === 'structured' && <Cell label="click chip to edit meta"><StatefulStructured /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
