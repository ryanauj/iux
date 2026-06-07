// ABOUTME: Card component for a single saved prompt in the Library grid: shows category badge, favorite toggle, title link, body snippet, tags, model badges, variable count, updated date, a copy button, and an "Open" link.

import { Card } from '../../../components/Card/Card'
import { Link } from '../../Link'
import { Badge } from './Badge'
import { CopyButton } from './CopyButton'
import { FavoriteButton } from './FavoriteButton'
import { promptRoutes } from '../routes'
import { promptCategoryLabel, snippet, formatDate, extractVariables } from '../format'
import { usePromptStore } from '../store'
import type { Prompt } from '../types'

interface PromptCardProps {
  prompt: Prompt
}

// ABOUTME: Renders a prompt summary card used in the Library grid; reads toggleFavorite from the store, computes variable count via extractVariables, and links to the prompt detail page.
/**
 * Renders a summary card for one `Prompt` in the Library grid. Shows the
 * category badge, star favorite toggle (backed by `usePromptStore`), title
 * linked to the detail page, a 140-char body snippet, hashtag row, target
 * model badges, template variable count, last-updated date, a quick-copy
 * button, and an "Open" link.
 */
export function PromptCard({ prompt }: PromptCardProps) {
  const { toggleFavorite } = usePromptStore()
  const vars = extractVariables(prompt.body)

  return (
    <Card variant="static" className="pb-prompt-card">
      <div className="pb-prompt-card__head">
        <Badge tone="primary" outline>{promptCategoryLabel(prompt.category)}</Badge>
        <FavoriteButton
          active={prompt.favorite}
          onToggle={() => toggleFavorite(prompt.id)}
          label={prompt.title}
        />
      </div>

      <h3 className="pb-prompt-card__title">
        <Link to={promptRoutes.prompt(prompt.id)}>{prompt.title}</Link>
      </h3>

      <p className="pb-prompt-card__snippet">{snippet(prompt.body)}</p>

      {prompt.tags.length > 0 && (
        <div className="pb-tag-row">
          {prompt.tags.map(t => (
            <span key={t} className="pb-tag">#{t}</span>
          ))}
        </div>
      )}

      <div className="pb-prompt-card__meta">
        {prompt.models.map(m => (
          <Badge key={m} tone="neutral">{m}</Badge>
        ))}
        {vars.length > 0 && (
          <span className="pb-prompt-card__vars" title={`${vars.length} template variable(s)`}>
            {vars.length} var{vars.length === 1 ? '' : 's'}
          </span>
        )}
      </div>

      <div className="pb-prompt-card__foot">
        <span className="pb-prompt-card__date">Updated {formatDate(prompt.updatedAt)}</span>
        <span className="pb-prompt-card__actions">
          <CopyButton text={prompt.body} what="Prompt" />
          <Link to={promptRoutes.prompt(prompt.id)} className="pb-link-cta">Open →</Link>
        </span>
      </div>
    </Card>
  )
}
