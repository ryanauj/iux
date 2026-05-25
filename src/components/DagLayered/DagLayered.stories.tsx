import type { ReactNode } from 'react'
import { DagLayered, type DagLayeredVariant, type DagNode, type DagEdge } from './DagLayered'

export const VARIANTS: DagLayeredVariant[] = ['vertical', 'horizontal', 'highlighted']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '36rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const BUILD_NODES: DagNode[] = [
  { id: 'fetch',   label: 'fetch' },
  { id: 'lint',    label: 'lint' },
  { id: 'tsc',     label: 'typecheck' },
  { id: 'compile', label: 'compile' },
  { id: 'utest',   label: 'unit tests' },
  { id: 'itest',   label: 'integration' },
  { id: 'bundle',  label: 'bundle' },
  { id: 'docker',  label: 'docker' },
  { id: 'push',    label: 'push' },
  { id: 'deploy',  label: 'deploy' },
]

const BUILD_EDGES: DagEdge[] = [
  { from: 'fetch', to: 'lint' },
  { from: 'fetch', to: 'tsc' },
  { from: 'tsc',   to: 'compile' },
  { from: 'compile', to: 'utest' },
  { from: 'compile', to: 'bundle' },
  { from: 'utest', to: 'itest' },
  { from: 'bundle', to: 'docker' },
  { from: 'itest', to: 'push', highlight: true },
  { from: 'docker', to: 'push', highlight: true },
  { from: 'push', to: 'deploy', highlight: true },
  { from: 'fetch', to: 'tsc' /* dup ok */ },
  { from: 'tsc', to: 'utest', highlight: true },
  { from: 'compile', to: 'utest', highlight: true },
  { from: 'utest', to: 'itest', highlight: true },
  { from: 'fetch', to: 'tsc', highlight: true },
]

const ETL_NODES: DagNode[] = [
  { id: 'src1', label: 'orders.csv' },
  { id: 'src2', label: 'users.json' },
  { id: 'src3', label: 'events' },
  { id: 'norm1', label: 'normalize' },
  { id: 'norm2', label: 'enrich' },
  { id: 'join', label: 'join', intent: 'primary' },
  { id: 'agg', label: 'aggregate', intent: 'primary' },
  { id: 'qa', label: 'qa checks', intent: 'warning' },
  { id: 'mart', label: 'warehouse', intent: 'success' },
  { id: 'bi',   label: 'dashboard', intent: 'success' },
]

const ETL_EDGES: DagEdge[] = [
  { from: 'src1', to: 'norm1' },
  { from: 'src2', to: 'norm1' },
  { from: 'src3', to: 'norm2' },
  { from: 'norm1', to: 'join' },
  { from: 'norm2', to: 'join' },
  { from: 'join', to: 'agg' },
  { from: 'agg', to: 'qa' },
  { from: 'qa', to: 'mart' },
  { from: 'mart', to: 'bi' },
]

export function DagLayeredStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'vertical' && (
              <Cell label="CI pipeline, top → down">
                <DagLayered variant="vertical" nodes={BUILD_NODES} edges={BUILD_EDGES} width={600} height={420} />
              </Cell>
            )}
            {variant === 'horizontal' && (
              <Cell label="ETL flow, left → right">
                <DagLayered variant="horizontal" nodes={ETL_NODES} edges={ETL_EDGES} width={620} height={340} />
              </Cell>
            )}
            {variant === 'highlighted' && (
              <Cell label="critical path lit">
                <DagLayered variant="highlighted" nodes={BUILD_NODES} edges={BUILD_EDGES} width={600} height={420} />
              </Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
