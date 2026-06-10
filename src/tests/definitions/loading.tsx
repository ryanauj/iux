// Loading ladder rungs: spinner, shimmer (N bars), skeleton (shape preset),
// optimistic (placeholder with syncing/synced/failed microstate).
import { useState } from 'react'
import { Loading } from '../../components/Loading/Loading'
import type { IntegrationTest } from '../types'

function SpinnerComposition() {
  return <Loading variant="spinner" label="Loading" />
}

function ShimmerComposition() {
  return <Loading variant="shimmer" bars={5} />
}

function SkeletonComposition() {
  return <Loading variant="skeleton" shape="card" rows={2} />
}

function OptimisticComposition() {
  const [status, setStatus] = useState<'syncing' | 'synced' | 'failed'>('syncing')
  return (
    <div>
      <Loading variant="optimistic" status={status}>
        <span data-testid="placeholder">Just submitted</span>
      </Loading>
      <button data-testid="confirm" onClick={() => setStatus('synced')}>confirm</button>
    </div>
  )
}

export const loadingTests: IntegrationTest[] = [
  {
    id: 'loading-rung-1-spinner',
    name: 'Loading — spinner renders with label (rung 1)',
    description: 'Spinner variant draws a spinning indicator alongside its label text.',
    components: ['loading'],
    tags: ['loading', 'rung-1'],
    render: () => <SpinnerComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-loading--spinner', label: 'Spinner variant class' },
      { kind: 'assertVisible', selector: '.iux-loading__spinner', label: 'Spinner element' },
      { kind: 'assertText', selector: '.iux-loading__label', text: 'Loading', label: 'Label renders' },
    ],
  },
  {
    id: 'loading-rung-2-shimmer',
    name: 'Loading — shimmer draws N bars (rung 2)',
    description: 'Shimmer variant renders the configured number of placeholder bars.',
    components: ['loading'],
    tags: ['loading', 'rung-2'],
    render: () => <ShimmerComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-loading--shimmer', label: 'Shimmer variant class' },
      { kind: 'assertCount', selector: '.iux-loading__bar', count: 5, label: 'Five bars' },
    ],
  },
  {
    id: 'loading-rung-3-skeleton',
    name: 'Loading — skeleton card shape repeats rows (rung 3)',
    description: 'Skeleton variant draws the configured shape preset, repeated by rows.',
    components: ['loading'],
    tags: ['loading', 'rung-3'],
    render: () => <SkeletonComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-loading--skeleton', label: 'Skeleton variant class' },
      { kind: 'assertCount', selector: '.iux-loading__skel-card', count: 2, label: 'Two card skeletons' },
    ],
  },
  {
    id: 'loading-rung-4-optimistic',
    name: 'Loading — optimistic shows children + syncing microstate, then synced (rung 4)',
    description: 'Optimistic variant renders the just-submitted placeholder with a Syncing… tag, then transitions to Saved.',
    components: ['loading'],
    tags: ['loading', 'rung-4'],
    render: () => <OptimisticComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-loading--optimistic', label: 'Optimistic variant class' },
      { kind: 'assertVisible', selector: '.iux-loading--status-syncing', label: 'Syncing status class' },
      { kind: 'assertVisible', selector: '.iux-loading__dot', label: 'Syncing dot' },
      { kind: 'assertText', selector: '.iux-loading__optimistic-body [data-testid="placeholder"]', text: 'Just submitted', label: 'Placeholder children render' },
      { kind: 'click', selector: '[data-testid="confirm"]', label: 'Confirm sync' },
      { kind: 'assertVisible', selector: '.iux-loading--status-synced', label: 'Synced status class' },
      { kind: 'assertText', selector: '.iux-loading__optimistic-tag', text: 'Saved', label: 'Saved tag' },
    ],
  },
]
