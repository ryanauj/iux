import type { ReactNode } from 'react'
import { NodeLink, type NodeLinkVariant, type GraphNode, type GraphEdge } from './NodeLink'

export const VARIANTS: NodeLinkVariant[] = ['simple', 'weighted', 'directed']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '34rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const TEAM_NODES: GraphNode[] = [
  { id: 'web', label: 'web', group: 'fe', weight: 9 },
  { id: 'mobile', label: 'mobile', group: 'fe', weight: 6 },
  { id: 'gateway', label: 'gateway', group: 'edge', weight: 8 },
  { id: 'auth', label: 'auth', group: 'svc', weight: 5 },
  { id: 'orders', label: 'orders', group: 'svc', weight: 7 },
  { id: 'billing', label: 'billing', group: 'svc', weight: 6 },
  { id: 'search', label: 'search', group: 'svc', weight: 4 },
  { id: 'db', label: 'db', group: 'data', weight: 10 },
  { id: 'cache', label: 'cache', group: 'data', weight: 5 },
]

const TEAM_EDGES: GraphEdge[] = [
  { from: 'web', to: 'gateway', value: 8 },
  { from: 'mobile', to: 'gateway', value: 5 },
  { from: 'gateway', to: 'auth', value: 6 },
  { from: 'gateway', to: 'orders', value: 7 },
  { from: 'gateway', to: 'search', value: 4 },
  { from: 'orders', to: 'billing', value: 5 },
  { from: 'orders', to: 'db', value: 8 },
  { from: 'billing', to: 'db', value: 4 },
  { from: 'auth', to: 'db', value: 3 },
  { from: 'search', to: 'cache', value: 6 },
  { from: 'search', to: 'db', value: 2 },
  { from: 'cache', to: 'db', value: 3 },
]

const PEOPLE_NODES: GraphNode[] = [
  { id: 'a', label: 'Alex', group: 'eng' },
  { id: 'b', label: 'Bren', group: 'eng' },
  { id: 'c', label: 'Cira', group: 'eng' },
  { id: 'd', label: 'Dani', group: 'design' },
  { id: 'e', label: 'Evan', group: 'design' },
  { id: 'f', label: 'Fern', group: 'pm' },
  { id: 'g', label: 'Gus', group: 'pm' },
]

const PEOPLE_EDGES: GraphEdge[] = [
  { from: 'a', to: 'b' }, { from: 'a', to: 'c' }, { from: 'b', to: 'c' },
  { from: 'd', to: 'e' }, { from: 'd', to: 'a' }, { from: 'e', to: 'b' },
  { from: 'f', to: 'a' }, { from: 'f', to: 'd' }, { from: 'g', to: 'f' },
  { from: 'g', to: 'e' },
]

export function NodeLinkStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <>
                <Cell label="team collaboration graph">
                  <NodeLink variant="simple" nodes={PEOPLE_NODES} edges={PEOPLE_EDGES} width={560} height={360} />
                </Cell>
              </>
            )}
            {variant === 'weighted' && (
              <>
                <Cell label="service topology, edge = req/s">
                  <NodeLink variant="weighted" nodes={TEAM_NODES} edges={TEAM_EDGES} width={560} height={380} />
                </Cell>
              </>
            )}
            {variant === 'directed' && (
              <>
                <Cell label="directed service calls">
                  <NodeLink variant="directed" nodes={TEAM_NODES} edges={TEAM_EDGES} width={560} height={380} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
