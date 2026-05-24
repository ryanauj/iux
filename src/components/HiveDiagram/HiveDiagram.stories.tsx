import type { ReactNode } from 'react'
import { HiveDiagram, type HiveDiagramVariant, type HiveNode, type HiveEdge } from './HiveDiagram'

export const VARIANTS: HiveDiagramVariant[] = ['simple', 'weighted', 'directed']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const TEAM_NODES: HiveNode[] = [
  // axis = role; position = tenure normalised.
  { id: 'a', label: 'Alex', axis: 'eng', position: 0.85 },
  { id: 'b', label: 'Bren', axis: 'eng', position: 0.6 },
  { id: 'c', label: 'Cira', axis: 'eng', position: 0.35 },
  { id: 'd', label: 'Dani', axis: 'eng', position: 0.15 },
  { id: 'e', label: 'Evan', axis: 'design', position: 0.7 },
  { id: 'f', label: 'Fern', axis: 'design', position: 0.45 },
  { id: 'g', label: 'Gus', axis: 'design', position: 0.2 },
  { id: 'h', label: 'Hana', axis: 'pm', position: 0.9 },
  { id: 'i', label: 'Iris', axis: 'pm', position: 0.55 },
  { id: 'j', label: 'Jad', axis: 'pm', position: 0.3 },
]

const TEAM_EDGES: HiveEdge[] = [
  { from: 'a', to: 'e', value: 6 }, { from: 'a', to: 'h', value: 7 },
  { from: 'b', to: 'f', value: 4 }, { from: 'b', to: 'i', value: 3 },
  { from: 'c', to: 'g', value: 5 }, { from: 'c', to: 'j', value: 4 },
  { from: 'd', to: 'g', value: 3 }, { from: 'd', to: 'j', value: 2 },
  { from: 'e', to: 'h', value: 6 }, { from: 'f', to: 'i', value: 5 },
  { from: 'g', to: 'j', value: 4 }, { from: 'a', to: 'f', value: 3 },
  { from: 'b', to: 'h', value: 4 },
]

const SVC_NODES: HiveNode[] = [
  // axis = tier (edge / svc / data); position = traffic share.
  { id: 'web', label: 'web', axis: 'edge', position: 0.9 },
  { id: 'mob', label: 'mobile', axis: 'edge', position: 0.55 },
  { id: 'gw', label: 'gateway', axis: 'edge', position: 0.2 },
  { id: 'auth', label: 'auth', axis: 'svc', position: 0.3 },
  { id: 'orders', label: 'orders', axis: 'svc', position: 0.6 },
  { id: 'pay', label: 'pay', axis: 'svc', position: 0.45 },
  { id: 'rec', label: 'reco', axis: 'svc', position: 0.85 },
  { id: 'db', label: 'db', axis: 'data', position: 0.85 },
  { id: 'cache', label: 'cache', axis: 'data', position: 0.45 },
  { id: 'log', label: 'log', axis: 'data', position: 0.2 },
]

const SVC_EDGES: HiveEdge[] = [
  { from: 'web', to: 'gw', value: 9 }, { from: 'mob', to: 'gw', value: 6 },
  { from: 'gw', to: 'auth', value: 5 }, { from: 'gw', to: 'orders', value: 7 },
  { from: 'gw', to: 'rec', value: 4 }, { from: 'orders', to: 'pay', value: 6 },
  { from: 'orders', to: 'db', value: 8 }, { from: 'auth', to: 'db', value: 3 },
  { from: 'rec', to: 'cache', value: 5 }, { from: 'cache', to: 'db', value: 3 },
  { from: 'gw', to: 'log', value: 2 },
]

export function HiveDiagramStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'simple' && (
              <Cell label="team — axis = role, distance = tenure">
                <HiveDiagram variant="simple" nodes={TEAM_NODES} edges={TEAM_EDGES} width={420} height={420} />
              </Cell>
            )}
            {variant === 'weighted' && (
              <Cell label="service tiers, stroke = req/s">
                <HiveDiagram variant="weighted" nodes={SVC_NODES} edges={SVC_EDGES} width={420} height={420} />
              </Cell>
            )}
            {variant === 'directed' && (
              <Cell label="directed service calls">
                <HiveDiagram variant="directed" nodes={SVC_NODES} edges={SVC_EDGES} width={420} height={420} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
