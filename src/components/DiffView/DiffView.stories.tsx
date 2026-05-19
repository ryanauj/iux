import type { ReactNode } from 'react'
import { DiffView, type DiffViewVariant } from './DiffView'

export const VARIANTS: DiffViewVariant[] = ['side-by-side', 'inline', 'chunked', 'three-way']

const A = `function greet(name) {
  return "Hello " + name
}

greet("world")`

const B = `function greet(name, greeting = "Hi") {
  return greeting + ", " + name + "!"
}

greet("world")`

const BASE = `function add(a, b) {
  return a + b
}`

const OURS = `function add(a, b) {
  return a + b + 0
}`

const THEIRS = `function add(a, b, c) {
  return a + b
}`

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '36rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

export function DiffViewStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            <Cell label={variant}>
              {variant === 'three-way'
                ? <DiffView variant="three-way" base={BASE} ours={OURS} theirs={THEIRS} />
                : <DiffView variant={variant} a={A} b={B} />}
            </Cell>
          </div>
        </section>
      ))}
    </div>
  )
}
