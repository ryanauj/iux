// ABOUTME: Card ladder rungs: static, expandable, bento (accent stripe), spatial (mouse- tilt parallax).

// Card ladder rungs: static, expandable, bento (accent stripe), spatial (mouse-
// tilt parallax). Rung 4 only asserts the variant class — the tilt effect is
// driven by mousemove and the test runner has no pointer-move step.
import { useState } from 'react'
import { Card } from '../../components/Card/Card'
import type { IntegrationTest } from '../types'

function StaticComposition() {
  return (
    <Card variant="static" title="Hello" subtitle="card subtitle" footer={<span data-testid="footer">F</span>}>
      <p data-testid="body">Body copy</p>
    </Card>
  )
}

function ExpandableComposition() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Card
        variant="expandable"
        title="Release"
        expandedContent={<p data-testid="extra">hidden details</p>}
        onExpandedChange={() => setCount(c => c + 1)}
      >
        summary
      </Card>
      <span data-testid="toggled">{count}</span>
    </div>
  )
}

function BentoComposition() {
  return (
    <Card variant="bento" accent="danger" title="Bento" subtitle="dashboard tile">
      A tile.
    </Card>
  )
}

function SpatialComposition() {
  return (
    <Card variant="spatial" title="Spatial" subtitle="hover to tilt">
      Move the mouse across.
    </Card>
  )
}

// ABOUTME: cardTests — an exported value.
export const cardTests: IntegrationTest[] = [
  {
    id: 'card-rung-1-static',
    name: 'Card — static renders title, body, footer (rung 1)',
    description: 'Static variant lays out the title, body content, and footer slot.',
    components: ['card'],
    tags: ['card', 'rung-1'],
    render: () => <StaticComposition />,
    steps: [
      { kind: 'assertText', selector: '.iux-card__title', text: 'Hello', label: 'Title renders' },
      { kind: 'assertText', selector: '.iux-card__subtitle', text: 'card subtitle', label: 'Subtitle renders' },
      { kind: 'assertText', selector: '[data-testid="body"]', text: 'Body copy', label: 'Body renders' },
      { kind: 'assertText', selector: '.iux-card__footer [data-testid="footer"]', text: 'F', label: 'Footer renders' },
    ],
  },
  {
    id: 'card-rung-2-expandable',
    name: 'Card — expandable reveals hidden content on click (rung 2)',
    description: 'Clicking the expander toggles aria-expanded and exposes the expanded inner content.',
    components: ['card'],
    tags: ['card', 'rung-2', 'expandable'],
    render: () => <ExpandableComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-card__expander[aria-expanded="false"]', label: 'Collapsed initially' },
      { kind: 'assertVisible', selector: '.iux-card__expanded-wrap[data-expanded="false"]', label: 'Wrap collapsed' },
      { kind: 'click', selector: '.iux-card__expander', label: 'Click expander' },
      { kind: 'assertVisible', selector: '.iux-card__expander[aria-expanded="true"]', label: 'Expanded after click' },
      { kind: 'assertVisible', selector: '.iux-card__expanded-wrap[data-expanded="true"]', label: 'Wrap expanded' },
      { kind: 'assertText', selector: '[data-testid="toggled"]', text: '1', label: 'Callback fired' },
    ],
  },
  {
    id: 'card-rung-3-bento',
    name: 'Card — bento variant carries an accent stripe (rung 3)',
    description: 'Bento variant exposes data-accent and renders the dedicated accent stripe element.',
    components: ['card'],
    tags: ['card', 'rung-3', 'bento'],
    render: () => <BentoComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-card--bento[data-accent="danger"]', label: 'Bento variant + accent attr' },
      { kind: 'assertVisible', selector: '.iux-card__accent-stripe', label: 'Accent stripe element' },
    ],
  },
  {
    id: 'card-rung-4-spatial',
    name: 'Card — spatial variant renders (rung 4)',
    description: 'Spatial variant tags the card with data-variant=spatial; tilt itself is driven by mousemove and not asserted here.',
    components: ['card'],
    tags: ['card', 'rung-4', 'spatial'],
    render: () => <SpatialComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-card--spatial[data-variant="spatial"]', label: 'Spatial variant class' },
      { kind: 'assertText', selector: '.iux-card__title', text: 'Spatial', label: 'Title renders' },
    ],
  },
]
