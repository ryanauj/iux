// ABOUTME: Strategy detail page: shows a single prompting strategy's summary, when-to-use checklist, copy-paste template, and worked example via CodeBlock, plus sidebars listing related strategies and saved prompts that use it.

import { useMemo } from 'react'
import { Button } from '../../../components/Button/Button'
import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { Link } from '../../Link'
import { navigate } from '../../router'
import { Badge } from '../components/Badge'
import { CodeBlock } from '../components/CodeBlock'
import { getStrategy } from '../data/strategies'
import { usePromptStore } from '../store'
import { promptRoutes } from '../routes'
import { strategyCategoryLabel } from '../format'

interface StrategyDetailProps {
  id: string
}

// ABOUTME: Full-page view for one prompting strategy: displays category badge + tags, summary prose, when-to-use checklist, template CodeBlock, worked example CodeBlock, and two aside sections — related strategies (from strategy.related) and saved prompts that link this strategy (from the store).
/**
 * Renders the detail view for a single `Strategy`, looked up by `id` via
 * `getStrategy`. Shows a 404 EmptyState when not found. The main column
 * walks through `summary`, `whenToUse`, `template`, and `example` sections
 * using `CodeBlock` for copyable content. The aside has two cards:
 * "Related strategies" (resolved via `getStrategy` from `strategy.related`)
 * and "Prompts using this" (filtered from `usePromptStore().prompts`). A
 * "Start a prompt from this" button navigates to `PromptForm` with
 * `?from=<id>` so the form can seed its body from the strategy template.
 */
export function StrategyDetail({ id }: StrategyDetailProps) {
  const strategy = getStrategy(id)
  const { prompts } = usePromptStore()

  const related = useMemo(
    () => (strategy ? strategy.related.map(getStrategy).filter(Boolean) : []),
    [strategy],
  )
  const usedBy = useMemo(
    () => (strategy ? prompts.filter(p => p.strategyIds.includes(strategy.id)) : []),
    [strategy, prompts],
  )

  if (!strategy) {
    return (
      <div className="pb-page">
        <EmptyState
          variant="minimal"
          title="Strategy not found"
          description="No strategy matches this link."
          primaryAction={{ label: 'All strategies', onClick: () => navigate(promptRoutes.strategies()) }}
        />
      </div>
    )
  }

  return (
    <div className="pb-page pb-detail">
      <nav className="pb-breadcrumb" aria-label="Breadcrumb">
        <Link to={promptRoutes.strategies()}>Strategies</Link>
        <span aria-hidden="true">/</span>
        <span className="pb-breadcrumb__current">{strategy.name}</span>
      </nav>

      <header className="pb-detail__header">
        <div className="pb-detail__heading">
          <div className="pb-detail__badges">
            <Badge tone="info" outline>{strategyCategoryLabel(strategy.category)}</Badge>
            {strategy.tags.map(t => <span key={t} className="pb-tag">#{t}</span>)}
          </div>
          <h1 className="pb-page__title">{strategy.name}</h1>
          <p className="pb-detail__tagline">{strategy.tagline}</p>
        </div>
        <div className="pb-detail__actions">
          <Button
            intent="primary"
            onClick={() => navigate(promptRoutes.newPrompt(), { from: strategy.id })}
          >
            Start a prompt from this
          </Button>
        </div>
      </header>

      <div className="pb-detail__body">
        <main className="pb-detail__main">
          <section className="pb-section">
            <h2 className="pb-section__title">How it works</h2>
            <p className="pb-prose">{strategy.summary}</p>
          </section>

          <section className="pb-section">
            <h2 className="pb-section__title">When to use it</h2>
            <ul className="pb-checklist">
              {strategy.whenToUse.map((w, i) => (
                <li key={i}><span className="pb-checklist__mark" aria-hidden="true">✓</span>{w}</li>
              ))}
            </ul>
          </section>

          <section className="pb-section">
            <h2 className="pb-section__title">Template</h2>
            <CodeBlock text={strategy.template} what="Template" label="Copy-paste skeleton" />
          </section>

          <section className="pb-section">
            <h2 className="pb-section__title">Worked example</h2>
            <CodeBlock text={strategy.example} what="Example" label="Filled-in example" />
          </section>
        </main>

        <aside className="pb-detail__aside">
          <section className="pb-aside-card">
            <h2 className="pb-aside-card__title">Related strategies</h2>
            {related.length === 0 ? (
              <p className="pb-muted">None linked.</p>
            ) : (
              <ul className="pb-strategy-list">
                {related.map(s => (
                  <li key={s!.id}>
                    <Link to={promptRoutes.strategy(s!.id)} className="pb-strategy-list__link">
                      <span className="pb-strategy-list__name">{s!.name}</span>
                      <Badge tone="info" outline>{strategyCategoryLabel(s!.category)}</Badge>
                    </Link>
                    <span className="pb-strategy-list__tagline">{s!.tagline}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="pb-aside-card">
            <h2 className="pb-aside-card__title">
              Prompts using this <span className="pb-count">{usedBy.length}</span>
            </h2>
            {usedBy.length === 0 ? (
              <p className="pb-muted">No saved prompts use this strategy yet.</p>
            ) : (
              <ul className="pb-strategy-list">
                {usedBy.map(p => (
                  <li key={p.id}>
                    <Link to={promptRoutes.prompt(p.id)} className="pb-strategy-list__link">
                      <span className="pb-strategy-list__name">{p.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>
    </div>
  )
}
