// ABOUTME: Create/edit prompt form: doubles as a new-prompt page (optionally seeded from a strategy template) and an edit page; collects title, body, category, models, tags, linked strategies, and notes, then calls store.add or store.update.

import { useMemo, useState } from 'react'
import { TextInput } from '../../../components/TextInput/TextInput'
import { Select } from '../../../components/Select/Select'
import { Button } from '../../../components/Button/Button'
import { TokenField, type Token } from '../../../components/TokenField/TokenField'
import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { Link } from '../../Link'
import { navigate } from '../../router'
import { Badge } from '../components/Badge'
import { useToast } from '../components/feedback'
import { usePromptStore, type NewPromptInput } from '../store'
import { STRATEGIES, getStrategy } from '../data/strategies'
import { promptRoutes } from '../routes'
import { extractVariables, strategyCategoryLabel } from '../format'
import { PROMPT_CATEGORIES, type PromptCategory } from '../types'

// ABOUTME: Preset options for the "Target models" TokenField in PromptForm, covering the six most common LLMs plus an "any model" fallback.
const MODEL_OPTIONS = ['Claude', 'GPT-4', 'Gemini', 'Llama', 'Mistral', 'any model'].map(m => ({
  value: m,
  label: m,
}))

// ABOUTME: Props for PromptForm; either editId (load an existing prompt for editing) or prefillStrategyId (seed a new prompt from a strategy template) may be present, but not both.
interface PromptFormProps {
  /** Present when editing an existing prompt. */
  editId?: string
  /** Strategy id to seed a fresh prompt from (the "start from strategy" flow). */
  prefillStrategyId?: string
}

// ABOUTME: Dual-mode form used by both the "New prompt" and "Edit prompt" routes: when given `editId` it loads the existing prompt from the store; when given `prefillStrategyId` it seeds body and tags from the strategy template. Validates title + body, detects `{{variable}}` slots live, and calls `store.add` or `store.update` on save.
/**
 * Create / edit form for a `Prompt`. In edit mode (`editId` present) it
 * pre-fills from the store; in new mode it optionally seeds `body` and `tags`
 * from a strategy template (`prefillStrategyId`). Fields: title, prompt body
 * (textarea with live `{{variable}}` detection via `extractVariables`),
 * category Select, target-models TokenField, tags TokenField, strategy
 * multi-toggle picker, and optional notes. On save calls `store.add` or
 * `store.update`, fires a success toast, and navigates to the detail page.
 */
export function PromptForm({ editId, prefillStrategyId }: PromptFormProps) {
  const { get, add, update } = usePromptStore()
  const push = useToast()
  const existing = editId ? get(editId) : undefined
  const seedStrategy = prefillStrategyId ? getStrategy(prefillStrategyId) : undefined

  const [title, setTitle] = useState(existing?.title ?? '')
  const [body, setBody] = useState(existing?.body ?? seedStrategy?.template ?? '')
  const [category, setCategory] = useState<PromptCategory>(existing?.category ?? 'writing')
  const [notes, setNotes] = useState(existing?.notes ?? '')
  const [tags, setTags] = useState<Token[]>(
    (existing?.tags ?? seedStrategy?.tags ?? []).map(t => ({ value: t, label: t })),
  )
  const [models, setModels] = useState<Token[]>(
    (existing?.models ?? ['Claude']).map(m => ({ value: m, label: m })),
  )
  const [strategyIds, setStrategyIds] = useState<string[]>(
    existing?.strategyIds ?? (prefillStrategyId ? [prefillStrategyId] : []),
  )
  const [touched, setTouched] = useState(false)

  const tagOptions = useMemo(
    () => [...new Set(STRATEGIES.flatMap(s => s.tags))].sort().map(t => ({ value: t, label: t })),
    [],
  )
  const bodyVars = useMemo(() => extractVariables(body), [body])

  if (editId && !existing) {
    return (
      <div className="pb-page">
        <EmptyState
          variant="minimal"
          title="Prompt not found"
          description="Can't edit a prompt that no longer exists."
          primaryAction={{ label: 'Back to library', onClick: () => navigate(promptRoutes.library()) }}
        />
      </div>
    )
  }

  const titleError = touched && title.trim() === '' ? 'Give the prompt a title.' : undefined
  const bodyError = touched && body.trim() === '' ? 'A prompt needs some text.' : undefined
  const valid = title.trim() !== '' && body.trim() !== ''

  const toggleStrategy = (sid: string) => {
    setStrategyIds(prev => (prev.includes(sid) ? prev.filter(x => x !== sid) : [...prev, sid]))
  }

  const handleSave = () => {
    setTouched(true)
    if (!valid) return
    const input: NewPromptInput = {
      title: title.trim(),
      body,
      category,
      models: models.map(m => m.label),
      tags: tags.map(t => t.label),
      strategyIds,
      notes: notes.trim() || undefined,
    }
    if (existing) {
      update(existing.id, input)
      push({ intent: 'success', title: 'Changes saved' })
      navigate(promptRoutes.prompt(existing.id))
    } else {
      const created = add(input)
      push({ intent: 'success', title: 'Prompt saved to your library' })
      navigate(promptRoutes.prompt(created.id))
    }
  }

  const cancelTo = existing ? promptRoutes.prompt(existing.id) : promptRoutes.library()

  return (
    <div className="pb-page pb-form-page">
      <nav className="pb-breadcrumb" aria-label="Breadcrumb">
        <Link to={promptRoutes.library()}>Library</Link>
        <span aria-hidden="true">/</span>
        <span className="pb-breadcrumb__current">{existing ? 'Edit prompt' : 'New prompt'}</span>
      </nav>

      <h1 className="pb-page__title">{existing ? 'Edit prompt' : 'New prompt'}</h1>
      {seedStrategy && !existing && (
        <p className="pb-page__subtitle">
          Seeded from the <strong>{seedStrategy.name}</strong> strategy template. Tweak it and save.
        </p>
      )}

      <div className="pb-form">
        <div className="pb-field">
          <TextInput
            variant="bordered"
            label="Title"
            required
            value={title}
            onChange={setTitle}
            error={titleError}
            placeholder="e.g. Summarize a meeting transcript"
          />
        </div>

        <div className="pb-field">
          <label className="pb-label" htmlFor="pb-body">
            Prompt text <span className="pb-req">*</span>
          </label>
          <textarea
            id="pb-body"
            className={['pb-textarea', bodyError && 'pb-textarea--error'].filter(Boolean).join(' ')}
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={12}
            placeholder="Write the prompt. Use {{double_braces}} for variables you'll fill in later."
          />
          <div className="pb-field__foot">
            <span className={bodyError ? 'pb-field__error' : 'pb-field__hint'}>
              {bodyError ?? 'Wrap fill-in slots in {{double_braces}}.'}
            </span>
            {bodyVars.length > 0 && (
              <span className="pb-field__hint">
                Detected: {bodyVars.map(v => <code key={v} className="pb-inline-var">{`{{${v}}}`}</code>)}
              </span>
            )}
          </div>
        </div>

        <div className="pb-form__row">
          <div className="pb-field">
            <Select
              variant="native"
              label="Category"
              value={category}
              onChange={v => setCategory(v as PromptCategory)}
              options={PROMPT_CATEGORIES.map(c => ({ value: c.value, label: c.label }))}
            />
          </div>
          <div className="pb-field">
            <TokenField
              variant="typeahead"
              label="Target models"
              value={models}
              onChange={setModels}
              options={MODEL_OPTIONS}
              placeholder="Add a model…"
              hint="Type and press Enter. Suggestions appear as you type."
            />
          </div>
        </div>

        <div className="pb-field">
          <TokenField
            variant="typeahead"
            label="Tags"
            value={tags}
            onChange={setTags}
            options={tagOptions}
            placeholder="Add tags…"
            hint="Free-form. Enter or comma to add."
          />
        </div>

        <div className="pb-field">
          <span className="pb-label">Strategies demonstrated</span>
          <p className="pb-field__hint">Link the techniques this prompt uses — they cross-link on the detail page.</p>
          <div className="pb-strategy-picker" role="group" aria-label="Strategies demonstrated">
            {STRATEGIES.map(s => {
              const on = strategyIds.includes(s.id)
              return (
                <button
                  key={s.id}
                  type="button"
                  className={['pb-strategy-toggle', on && 'pb-strategy-toggle--on'].filter(Boolean).join(' ')}
                  aria-pressed={on}
                  onClick={() => toggleStrategy(s.id)}
                >
                  <span className="pb-strategy-toggle__name">{s.name}</span>
                  <Badge tone="info" outline>{strategyCategoryLabel(s.category)}</Badge>
                </button>
              )
            })}
          </div>
        </div>

        <div className="pb-field">
          <label className="pb-label" htmlFor="pb-notes">Notes <span className="pb-muted">(optional)</span></label>
          <textarea
            id="pb-notes"
            className="pb-textarea pb-textarea--short"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="When to reach for this, variants worth trying, gotchas…"
          />
        </div>

        <div className="pb-form__actions">
          <Button intent="primary" onClick={handleSave} disabled={touched && !valid}>
            {existing ? 'Save changes' : 'Save prompt'}
          </Button>
          <Link to={cancelTo} className="pb-textbtn">Cancel</Link>
        </div>
      </div>
    </div>
  )
}
