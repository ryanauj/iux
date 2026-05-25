import type { ReactNode } from 'react'
import { ScatterMatrix, type ScatterMatrixVariant, type ScatterMatrixField } from './ScatterMatrix'

export const VARIANTS: ScatterMatrixVariant[] = ['pairs', 'lower', 'diagonal']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '32rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
}

const FIELDS: ScatterMatrixField[] = [
  { key: 'rooms',  label: 'rooms' },
  { key: 'lotsz',  label: 'lot' },
  { key: 'age',    label: 'age' },
  { key: 'school', label: 'school' },
]

function makeRows(n: number): Record<string, number>[] {
  const r = rng(101)
  return Array.from({ length: n }, () => {
    const rooms = 3 + r() * 6
    const lotsz = 20 + rooms * 4 + r() * 30
    const age = r() * 80
    const school = 5 + (10 - age * 0.04) * 0.4 + r() * 2
    return { rooms, lotsz, age, school }
  })
}

const ROWS = makeRows(180)

export function ScatterMatrixStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'pairs' && (
              <Cell label="full matrix — scatter + correlation + marginal hist">
                <ScatterMatrix variant="pairs" fields={FIELDS} rows={ROWS} cellSize={120} intent="primary" />
              </Cell>
            )}
            {variant === 'lower' && (
              <Cell label="lower triangle only — half the ink, same info">
                <ScatterMatrix variant="lower" fields={FIELDS} rows={ROWS} cellSize={120} intent="info" />
              </Cell>
            )}
            {variant === 'diagonal' && (
              <Cell label="diagonal — marginal distributions only">
                <ScatterMatrix variant="diagonal" fields={FIELDS} rows={ROWS} cellSize={120} intent="success" />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
