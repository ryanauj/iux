import type { ReactNode } from 'react'
import { AdjacencyMatrix, type AdjacencyMatrixVariant, type AdjacencyNode, type AdjacencyEdge } from './AdjacencyMatrix'

export const VARIANTS: AdjacencyMatrixVariant[] = ['binary', 'weighted', 'clustered']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '34rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const ORG_NODES: AdjacencyNode[] = [
  { id: 'a', label: 'Alex', group: 'eng' },
  { id: 'b', label: 'Bren', group: 'eng' },
  { id: 'c', label: 'Cira', group: 'eng' },
  { id: 'd', label: 'Dani', group: 'design' },
  { id: 'e', label: 'Evan', group: 'design' },
  { id: 'f', label: 'Fern', group: 'pm' },
  { id: 'g', label: 'Gus', group: 'pm' },
  { id: 'h', label: 'Hana', group: 'data' },
  { id: 'i', label: 'Iris', group: 'data' },
]

const ORG_EDGES: AdjacencyEdge[] = [
  { from: 'a', to: 'b', value: 6 }, { from: 'a', to: 'c', value: 4 }, { from: 'b', to: 'c', value: 5 },
  { from: 'd', to: 'e', value: 7 }, { from: 'd', to: 'a', value: 3 }, { from: 'e', to: 'b', value: 2 },
  { from: 'f', to: 'a', value: 5 }, { from: 'f', to: 'd', value: 4 }, { from: 'g', to: 'f', value: 6 },
  { from: 'g', to: 'e', value: 3 }, { from: 'h', to: 'c', value: 4 }, { from: 'h', to: 'i', value: 5 },
  { from: 'i', to: 'a', value: 2 }, { from: 'i', to: 'g', value: 3 }, { from: 'g', to: 'h', value: 4 },
]

const SVC_NODES: AdjacencyNode[] = [
  { id: 'web', label: 'web' },
  { id: 'mob', label: 'mobile' },
  { id: 'gw', label: 'gateway' },
  { id: 'auth', label: 'auth' },
  { id: 'orders', label: 'orders' },
  { id: 'pay', label: 'payments' },
  { id: 'db', label: 'db' },
]

const SVC_EDGES: AdjacencyEdge[] = [
  { from: 'web', to: 'gw' }, { from: 'mob', to: 'gw' },
  { from: 'gw', to: 'auth' }, { from: 'gw', to: 'orders' },
  { from: 'orders', to: 'pay' }, { from: 'orders', to: 'db' },
  { from: 'pay', to: 'db' }, { from: 'auth', to: 'db' },
]

export function AdjacencyMatrixStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'binary' && (
              <Cell label="service dependency map">
                <AdjacencyMatrix variant="binary" nodes={SVC_NODES} edges={SVC_EDGES} cellSize={28} />
              </Cell>
            )}
            {variant === 'weighted' && (
              <Cell label="messages exchanged this sprint">
                <AdjacencyMatrix variant="weighted" nodes={ORG_NODES} edges={ORG_EDGES} cellSize={26} />
              </Cell>
            )}
            {variant === 'clustered' && (
              <Cell label="re-ordered by team — intra-team cells take group color">
                <AdjacencyMatrix variant="clustered" nodes={ORG_NODES} edges={ORG_EDGES} cellSize={26} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
