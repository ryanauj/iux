// ABOUTME: Prompt detail page: shows a single prompt's full body (via CodeBlock), a VariableFiller when template slots are present, notes, linked strategies in an aside, and Edit/Delete/Favorite actions backed by the prompt store.

import { useMemo, useState } from 'react'
import { Button } from '../../../components/Button/Button'
import { Modal } from '../../../components/Modal/Modal'
import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { Link } from '../../Link'
import { navigate } from '../../router'
import { Badge } from '../components/Badge'
import { CodeBlock } from '../components/CodeBlock'
import { FavoriteButton } from '../components/FavoriteButton'
import { VariableFiller } from '../components/VariableFiller'
import { useToast } from '../components/feedback'
import { usePromptStore } from '../store'
import { getStrategy } from '../data/strategies'
import { promptRoutes } from '../routes'
import {
  extractVariables,
  formatDate,
  promptCategoryLabel,
  strategyCategoryLabel,
} from '../format'

interface PromptDetailProps {
  id: string
}

// ABOUTME: Full-page view for a single saved prompt: displays category/model badges, favorite toggle, CodeBlock with copy, an optional VariableFiller when `{{variables}}` are detected, notes, and a sidebar listing linked strategies; delete is confirmed via a Modal and removes the prompt from the store.
/**
 * Renders the detail view for a saved `Prompt`. Reads the prompt by `id`
 * from `usePromptStore`; shows a 404 EmptyState when not found. The main
 * column has the prompt `CodeBlock`, a `VariableFiller` section when
 * `extractVariables` returns results, and optional notes. The aside lists
 * linked `Strategy` entries (resolved via `getStrategy`). Edit navigates to
 * `PromptForm`; delete triggers a confirmation `Modal` then calls
 * `store.remove` and fires a success toast via `useToast`.
 */
export function PromptDetail({ id }: PromptDetailProps) {
  const { get, remove, toggleFavorite } = usePromptStore()
  const prompt = get(id)
  const push = useToast()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const vars = useMemo(() => (prompt ? extractVariables(prompt.body) : []), [prompt])
  const strategies = useMemo(
    () => (prompt ? prompt.strategyIds.map(getStrategy).filter(Boolean) : []),
    [prompt],
  )

  if (!prompt) {
    return (
      <div className="pb-page">
        <EmptyState
          variant="minimal"
          title="Prompt not found"
          description="It may have been deleted this session, or the link is stale."
          primaryAction={{ label: 'Back to library', onClick: () => navigate(promptRoutes.library()) }}
        />
      </div>
    )
  }

  const handleDelete = () => {
    setConfirmOpen(false)
    remove(prompt.id)
    push({ intent: 'success', title: 'Prompt deleted' })
    navigate(promptRoutes.library())
  }

  return (
    <div className="pb-page pb-detail">
      <nav className="pb-breadcrumb" aria-label="Breadcrumb">
        <Link to={promptRoutes.library()}>Library</Link>
        <span aria-hidden="true">/</span>
        <span className="pb-breadcrumb__current">{prompt.title}</span>
      </nav>

      <header className="pb-detail__header">
        <div className="pb-detail__heading">
          <div className="pb-detail__badges">
            <Badge tone="primary" outline>{promptCategoryLabel(prompt.category)}</Badge>
            {prompt.models.map(m => <Badge key={m} tone="neutral">{m}</Badge>)}
          </div>
          <h1 className="pb-page__title">{prompt.title}</h1>
          <p className="pb-detail__dates">
            Created {formatDate(prompt.createdAt)} · Updated {formatDate(prompt.updatedAt)}
          </p>
        </div>
        <div className="pb-detail__actions">
          <FavoriteButton
            active={prompt.favorite}
            onToggle={() => toggleFavorite(prompt.id)}
            label={prompt.title}
          />
          <Button variant="solid" intent="neutral" onClick={() => navigate(promptRoutes.edit(prompt.id))}>
            Edit
          </Button>
          <Button variant="solid" intent="danger" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        </div>
      </header>

      {prompt.tags.length > 0 && (
        <div className="pb-tag-row pb-detail__tags">
          {prompt.tags.map(t => <span key={t} className="pb-tag">#{t}</span>)}
        </div>
      )}

      <div className="pb-detail__body">
        <main className="pb-detail__main">
          <section className="pb-section">
            <h2 className="pb-section__title">Prompt</h2>
            <CodeBlock text={prompt.body} what="Prompt" label="Prompt text" />
          </section>

          {vars.length > 0 && (
            <section className="pb-section">
              <h2 className="pb-section__title">
                Fill the template
                <span className="pb-section__hint">{vars.length} variable{vars.length === 1 ? '' : 's'}</span>
              </h2>
              <VariableFiller body={prompt.body} variables={vars} />
            </section>
          )}

          {prompt.notes && (
            <section className="pb-section">
              <h2 className="pb-section__title">Notes</h2>
              <p className="pb-detail__notes">{prompt.notes}</p>
            </section>
          )}
        </main>

        <aside className="pb-detail__aside">
          <section className="pb-aside-card">
            <h2 className="pb-aside-card__title">Strategies used</h2>
            {strategies.length === 0 ? (
              <p className="pb-muted">No strategies linked.</p>
            ) : (
              <ul className="pb-strategy-list">
                {strategies.map(s => (
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
        </aside>
      </div>

      <Modal
        variant="centered"
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this prompt?"
        description={`"${prompt.title}" will be removed from your library. This can't be undone.`}
        size="sm"
        primaryAction={{ label: 'Delete', intent: 'danger', onClick: handleDelete }}
        secondaryAction={{ label: 'Cancel', onClick: () => setConfirmOpen(false) }}
      />
    </div>
  )
}
