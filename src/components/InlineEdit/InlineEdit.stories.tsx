import { useState, type ReactNode } from 'react'
import { InlineEdit, type InlineEditVariant } from './InlineEdit'

export const VARIANTS: InlineEditVariant[] = ['click', 'validated', 'autosave', 'history']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '20rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function ClickStateful() {
  const [v, setV] = useState('Untitled note')
  return <InlineEdit variant="click" label="Note title" value={v} onChange={setV} />
}

function ValidatedStateful() {
  const [v, setV] = useState('hello')
  return (
    <InlineEdit
      variant="validated"
      label="Slug"
      value={v}
      onChange={setV}
      validate={s => /^[a-z0-9-]+$/.test(s) || 'Lowercase, digits, hyphens only'}
    />
  )
}

function AutosaveStateful() {
  const [v, setV] = useState('Half-written paragraph…')
  return (
    <InlineEdit
      variant="autosave"
      label="Draft"
      value={v}
      onChange={setV}
      onSave={async next => {
        await new Promise(r => setTimeout(r, 500))
        setV(next)
      }}
    />
  )
}

function HistoryStateful() {
  const [v, setV] = useState('Latest revision')
  const history = [
    { at: Date.now() - 600_000, value: 'Earlier draft' },
    { at: Date.now() - 1_800_000, value: 'First pass' },
  ]
  return (
    <InlineEdit
      variant="history"
      label="Title"
      value={v}
      onChange={setV}
      onSave={async next => setV(next)}
      history={history}
    />
  )
}

export function InlineEditStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'click' && <Cell label="click to edit"><ClickStateful /></Cell>}
            {variant === 'validated' && <Cell label="slug validator"><ValidatedStateful /></Cell>}
            {variant === 'autosave' && <Cell label="debounced save"><AutosaveStateful /></Cell>}
            {variant === 'history' && <Cell label="revert from history"><HistoryStateful /></Cell>}
          </div>
        </section>
      ))}
    </div>
  )
}
