import type { ReactNode } from 'react'
import { CirclePack, type CirclePackVariant, type CirclePackNode } from './CirclePack'

export const VARIANTS: CirclePackVariant[] = ['flat', 'nested', 'labeled']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '24rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const PORTFOLIO: CirclePackNode = {
  id: 'p', label: 'Portfolio',
  children: [
    { id: 'eq', label: 'Equities', children: [
      { id: 'aapl', label: 'AAPL', value: 18 },
      { id: 'msft', label: 'MSFT', value: 16 },
      { id: 'nvda', label: 'NVDA', value: 14 },
      { id: 'goog', label: 'GOOG', value: 10 },
      { id: 'tsla', label: 'TSLA', value: 6 },
    ] },
    { id: 'bond', label: 'Bonds', children: [
      { id: 't10', label: '10y', value: 14 },
      { id: 't2', label: '2y', value: 9 },
      { id: 'cb', label: 'Corp', value: 6 },
    ] },
    { id: 'alts', label: 'Alts', children: [
      { id: 're', label: 'REIT', value: 8 },
      { id: 'cm', label: 'Commodities', value: 5 },
    ] },
    { id: 'cash', label: 'Cash', value: 6 },
  ],
}

const PKGS: CirclePackNode = {
  id: 'pkg', label: 'Packages',
  children: [
    { id: 'react', label: 'react', children: [
      { id: 'r1', label: 'core', value: 80 },
      { id: 'r2', label: 'dom', value: 60 },
      { id: 'r3', label: 'router', value: 30 },
    ] },
    { id: 'css', label: 'css', children: [
      { id: 'tw', label: 'tw', value: 50 },
      { id: 'em', label: 'emotion', value: 22 },
    ] },
    { id: 'build', label: 'build', children: [
      { id: 'vite', label: 'vite', value: 70 },
      { id: 'ts', label: 'tsc', value: 28 },
      { id: 'es', label: 'esbuild', value: 18 },
    ] },
    { id: 'misc', label: 'misc', children: [
      { id: 'rt', label: 'tsx', value: 8 },
      { id: 'rl', label: 'lodash', value: 6 },
    ] },
  ],
}

export function CirclePackStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'flat' && (
              <Cell label="leaves only — group rings visible as outlines">
                <CirclePack variant="flat" root={PORTFOLIO} width={340} height={340} />
              </Cell>
            )}
            {variant === 'nested' && (
              <Cell label="every level filled, descendants tint lighter">
                <CirclePack variant="nested" root={PORTFOLIO} width={360} height={360} />
              </Cell>
            )}
            {variant === 'labeled' && (
              <Cell label="package sizes, with leaf labels">
                <CirclePack variant="labeled" root={PKGS} width={400} height={400} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
