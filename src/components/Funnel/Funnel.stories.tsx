import type { ReactNode } from 'react'
import { Funnel, type FunnelVariant, type FunnelStage } from './Funnel'

export const VARIANTS: FunnelVariant[] = ['stages', 'dropoff', 'mirrored']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '28rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

const SIGNUP: FunnelStage[] = [
  { key: 'visit', label: 'Visit', value: 12400 },
  { key: 'view', label: 'View pricing', value: 5240 },
  { key: 'signup', label: 'Sign up', value: 2080 },
  { key: 'trial', label: 'Start trial', value: 1230 },
  { key: 'paid', label: 'Pay', value: 410 },
]

const DEPLOY: FunnelStage[] = [
  { key: 'commit', label: 'Commit', value: 820, intent: 'info' },
  { key: 'build', label: 'Build', value: 760, intent: 'info' },
  { key: 'test', label: 'Test', value: 690, intent: 'success' },
  { key: 'review', label: 'Review', value: 540, intent: 'warning' },
  { key: 'deploy', label: 'Deploy', value: 480, intent: 'primary' },
]

export function FunnelStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'stages' && (
              <>
                <Cell label="signup funnel">
                  <Funnel variant="stages" stages={SIGNUP} width={500} height={300} />
                </Cell>
                <Cell label="deploy pipeline">
                  <Funnel variant="stages" stages={DEPLOY} width={500} height={300} />
                </Cell>
              </>
            )}
            {variant === 'dropoff' && (
              <>
                <Cell label="signup funnel with drop-off">
                  <Funnel variant="dropoff" stages={SIGNUP} width={500} height={320} />
                </Cell>
                <Cell label="pipeline with drop-off">
                  <Funnel variant="dropoff" stages={DEPLOY} width={500} height={320} />
                </Cell>
              </>
            )}
            {variant === 'mirrored' && (
              <>
                <Cell label="classic centred silhouette">
                  <Funnel variant="mirrored" stages={SIGNUP} width={500} height={300} />
                </Cell>
              </>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
