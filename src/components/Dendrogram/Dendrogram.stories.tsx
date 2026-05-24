import type { ReactNode } from 'react'
import { Dendrogram, type DendrogramVariant, type DendrogramNode } from './Dendrogram'

export const VARIANTS: DendrogramVariant[] = ['cluster', 'radial', 'weighted']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '34rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const CLUSTER: DendrogramNode = {
  id: 'r', label: 'all', distance: 1.0,
  children: [
    { id: 'a', label: 'A', distance: 0.7, children: [
      { id: 'a1', label: 'paris', distance: 0.3, children: [
        { id: 'a1a', label: 'paris-7' },
        { id: 'a1b', label: 'paris-3' },
      ] },
      { id: 'a2', label: 'london', distance: 0.45, children: [
        { id: 'a2a', label: 'london-w' },
        { id: 'a2b', label: 'london-e' },
      ] },
    ] },
    { id: 'b', label: 'B', distance: 0.85, children: [
      { id: 'b1', label: 'tokyo', distance: 0.4, children: [
        { id: 'b1a', label: 'shibuya' },
        { id: 'b1b', label: 'shinjuku' },
      ] },
      { id: 'b2', label: 'singapore' },
    ] },
    { id: 'c', label: 'C', distance: 0.6, children: [
      { id: 'c1', label: 'sf' },
      { id: 'c2', label: 'nyc' },
      { id: 'c3', label: 'sea' },
    ] },
  ],
}

const SIMPLE: DendrogramNode = {
  id: 'root', label: 'root',
  children: [
    { id: 'g1', label: 'g1', children: [{ id: 'l1', label: 'l1' }, { id: 'l2', label: 'l2' }] },
    { id: 'g2', label: 'g2', children: [
      { id: 'l3', label: 'l3' }, { id: 'l4', label: 'l4' },
      { id: 'l5', label: 'l5' }, { id: 'l6', label: 'l6' },
    ] },
    { id: 'g3', label: 'g3', children: [{ id: 'l7', label: 'l7' }, { id: 'l8', label: 'l8' }, { id: 'l9', label: 'l9' }] },
  ],
}

export function DendrogramStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'cluster' && (
              <Cell label="hierarchical clustering — leaves on the right">
                <Dendrogram variant="cluster" root={SIMPLE} width={560} height={340} />
              </Cell>
            )}
            {variant === 'radial' && (
              <Cell label="radial layout — root at center">
                <Dendrogram variant="radial" root={CLUSTER} width={420} height={420} />
              </Cell>
            )}
            {variant === 'weighted' && (
              <Cell label="bracket height = merge distance">
                <Dendrogram variant="weighted" root={CLUSTER} width={560} height={340} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
