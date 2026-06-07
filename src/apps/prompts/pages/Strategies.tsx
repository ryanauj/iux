// ABOUTME: Strategies — a React component (apps).

import { useState } from 'react'
import { Card } from '../../../components/Card/Card'
import { Segmented } from '../../../components/Segmented/Segmented'
import { Link } from '../../Link'
import { Badge } from '../components/Badge'
import { STRATEGIES } from '../data/strategies'
import { promptRoutes } from '../routes'
import { strategyCategoryLabel } from '../format'
import { STRATEGY_CATEGORIES, type StrategyCategory } from '../types'

type CatFilter = 'all' | StrategyCategory

// ABOUTME: Strategies — a React component.
export function Strategies() {
  const [cat, setCat] = useState<CatFilter>('all')
  const list = cat === 'all' ? STRATEGIES : STRATEGIES.filter(s => s.category === cat)

  const items = [
    { value: 'all', label: 'All' },
    ...STRATEGY_CATEGORIES.map(c => ({ value: c.value, label: c.label })),
  ]

  return (
    <div className="pb-page">
      <header className="pb-page__header">
        <div>
          <h1 className="pb-page__title">Prompting strategies</h1>
          <p className="pb-page__subtitle">
            A reference deck of techniques. Each has a copy-paste template and a worked example —
            and you can spin up a saved prompt from any of them.
          </p>
        </div>
      </header>

      <div className="pb-filters">
        <Segmented
          ariaLabel="Filter strategies by category"
          variant="pill"
          value={cat}
          onValueChange={v => setCat(v as CatFilter)}
          items={items}
        />
      </div>

      <div className="pb-grid pb-grid--strategies">
        {list.map(s => (
          <Card key={s.id} variant="static" className="pb-strategy-card">
            <div className="pb-prompt-card__head">
              <Badge tone="info" outline>{strategyCategoryLabel(s.category)}</Badge>
            </div>
            <h3 className="pb-prompt-card__title">
              <Link to={promptRoutes.strategy(s.id)}>{s.name}</Link>
            </h3>
            <p className="pb-strategy-card__tagline">{s.tagline}</p>
            <p className="pb-strategy-card__summary">{s.summary}</p>
            <div className="pb-tag-row">
              {s.tags.map(t => <span key={t} className="pb-tag">#{t}</span>)}
            </div>
            <div className="pb-prompt-card__foot">
              <span />
              <Link to={promptRoutes.strategy(s.id)} className="pb-link-cta">Open →</Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
