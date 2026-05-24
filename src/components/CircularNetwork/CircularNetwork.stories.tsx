import type { ReactNode } from 'react'
import { CircularNetwork, type CircularNetworkVariant, type CircularNode, type CircularEdge } from './CircularNetwork'

export const VARIANTS: CircularNetworkVariant[] = ['simple', 'weighted', 'directed']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const SVC_NODES: CircularNode[] = [
  { id: 'web', label: 'web', group: 'fe', weight: 8 },
  { id: 'mob', label: 'mobile', group: 'fe', weight: 6 },
  { id: 'gw', label: 'gateway', group: 'edge', weight: 9 },
  { id: 'auth', label: 'auth', group: 'svc', weight: 5 },
  { id: 'orders', label: 'orders', group: 'svc', weight: 7 },
  { id: 'pay', label: 'payments', group: 'svc', weight: 6 },
  { id: 'rec', label: 'reco', group: 'svc', weight: 4 },
  { id: 'db', label: 'db', group: 'data', weight: 10 },
  { id: 'cache', label: 'cache', group: 'data', weight: 5 },
]

const SVC_EDGES: CircularEdge[] = [
  { from: 'web', to: 'gw', value: 8 },
  { from: 'mob', to: 'gw', value: 5 },
  { from: 'gw', to: 'auth', value: 6 },
  { from: 'gw', to: 'orders', value: 7 },
  { from: 'gw', to: 'rec', value: 3 },
  { from: 'orders', to: 'pay', value: 6 },
  { from: 'orders', to: 'db', value: 8 },
  { from: 'pay', to: 'db', value: 4 },
  { from: 'auth', to: 'db', value: 3 },
  { from: 'rec', to: 'cache', value: 6 },
  { from: 'cache', to: 'db', value: 3 },
]

const PEOPLE: CircularNode[] = [
  { id: 'a', label: 'Alex', group: 'eng' },
  { id: 'b', label: 'Bren', group: 'eng' },
  { id: 'c', label: 'Cira', group: 'eng' },
  { id: 'd', label: 'Dani', group: 'design' },
  { id: 'e', label: 'Evan', group: 'design' },
  { id: 'f', label: 'Fern', group: 'pm' },
  { id: 'g', label: 'Gus', group: 'pm' },
  { id: 'h', label: 'Hana', group: 'data' },
]

const PEOPLE_EDGES: CircularEdge[] = [
  { from: 'a', to: 'b' }, { from: 'a', to: 'c' }, { from: 'b', to: 'c' },
  { from: 'd', to: 'e' }, { from: 'd', to: 'a' }, { from: 'e', to: 'b' },
  { from: 'f', to: 'a' }, { from: 'f', to: 'd' }, { from: 'g', to: 'f' },
  { from: 'g', to: 'e' }, { from: 'h', to: 'c' }, { from: 'h', to: 'g' },
]

export function CircularNetworkStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <Cell label="team chatter">
                <CircularNetwork variant="simple" nodes={PEOPLE} edges={PEOPLE_EDGES} width={420} height={420} />
              </Cell>
            )}
            {variant === 'weighted' && (
              <Cell label="service topology, stroke = req/s">
                <CircularNetwork variant="weighted" nodes={SVC_NODES} edges={SVC_EDGES} width={440} height={440} />
              </Cell>
            )}
            {variant === 'directed' && (
              <Cell label="directed service calls">
                <CircularNetwork variant="directed" nodes={SVC_NODES} edges={SVC_EDGES} width={440} height={440} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
