// ABOUTME: Library — a React component (apps).

import { useMemo, useState } from 'react'
import { Segmented } from '../../../components/Segmented/Segmented'
import { Select } from '../../../components/Select/Select'
import { TextInput } from '../../../components/TextInput/TextInput'
import { Button } from '../../../components/Button/Button'
import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { Link } from '../../Link'
import { navigate } from '../../router'
import { PromptCard } from '../components/PromptCard'
import { usePromptStore } from '../store'
import { promptRoutes } from '../routes'
import { PROMPT_CATEGORIES, type PromptCategory } from '../types'

type CatFilter = 'all' | PromptCategory
type SortKey = 'updated' | 'title' | 'favorites'

const SORT_OPTIONS = [
  { value: 'updated', label: 'Recently updated' },
  { value: 'title', label: 'Title (A–Z)' },
  { value: 'favorites', label: 'Favorites first' },
]

// ABOUTME: Library — a React component.
export function Library() {
  const { prompts } = usePromptStore()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<CatFilter>('all')
  const [favOnly, setFavOnly] = useState(false)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [sort, setSort] = useState<SortKey>('updated')

  // Tag cloud across the whole library, most common first.
  const allTags = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of prompts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t)
  }, [prompts])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = prompts.filter(p => {
      if (cat !== 'all' && p.category !== cat) return false
      if (favOnly && !p.favorite) return false
      if (activeTag && !p.tags.includes(activeTag)) return false
      if (q) {
        const hay = `${p.title} ${p.body} ${p.tags.join(' ')} ${p.models.join(' ')}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
    list = [...list].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'favorites') {
        if (a.favorite !== b.favorite) return a.favorite ? -1 : 1
        return b.updatedAt.localeCompare(a.updatedAt)
      }
      return b.updatedAt.localeCompare(a.updatedAt)
    })
    return list
  }, [prompts, query, cat, favOnly, activeTag, sort])

  const hasFilters = query !== '' || cat !== 'all' || favOnly || activeTag !== null
  const clearFilters = () => {
    setQuery('')
    setCat('all')
    setFavOnly(false)
    setActiveTag(null)
  }

  const catItems = [
    { value: 'all', label: 'All' },
    ...PROMPT_CATEGORIES.map(c => ({ value: c.value, label: c.label })),
  ]

  return (
    <div className="pb-page">
      <header className="pb-page__header">
        <div>
          <h1 className="pb-page__title">Prompt library</h1>
          <p className="pb-page__subtitle">
            {prompts.length} saved prompt{prompts.length === 1 ? '' : 's'}. Search, filter, copy,
            or open one to fill its variables.
          </p>
        </div>
        <Button intent="primary" onClick={() => navigate(promptRoutes.newPrompt())} leadingIcon={<PlusGlyph />}>
          New prompt
        </Button>
      </header>

      <div className="pb-toolbar">
        <div className="pb-toolbar__search">
          <TextInput
            variant="bordered"
            value={query}
            onChange={v => setQuery(v)}
            placeholder="Search prompts, tags, models…"
            aria-label="Search prompts"
            leadingIcon={<SearchGlyph />}
          />
        </div>
        <div className="pb-toolbar__sort">
          <Select
            variant="native"
            value={sort}
            onChange={v => setSort(v as SortKey)}
            options={SORT_OPTIONS}
            aria-label="Sort prompts"
          />
        </div>
        <Button
          variant="solid"
          intent={favOnly ? 'primary' : 'neutral'}
          onClick={() => setFavOnly(f => !f)}
          aria-pressed={favOnly}
        >
          ★ Favorites
        </Button>
      </div>

      <div className="pb-filters">
        <Segmented
          ariaLabel="Filter by category"
          variant="pill"
          value={cat}
          onValueChange={v => setCat(v as CatFilter)}
          items={catItems}
        />
      </div>

      {allTags.length > 0 && (
        <div className="pb-tagcloud" role="group" aria-label="Filter by tag">
          {allTags.map(t => (
            <button
              key={t}
              type="button"
              className={['pb-tag-chip', activeTag === t && 'pb-tag-chip--on'].filter(Boolean).join(' ')}
              aria-pressed={activeTag === t}
              onClick={() => setActiveTag(prev => (prev === t ? null : t))}
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          variant="illustrated"
          title="No prompts match"
          description={
            hasFilters
              ? 'Nothing fits the current search and filters.'
              : 'Your library is empty. Save your first prompt to get started.'
          }
          illustration={<span className="pb-empty-glyph" aria-hidden="true">⌘</span>}
          primaryAction={
            hasFilters
              ? { label: 'Clear filters', onClick: clearFilters }
              : { label: 'New prompt', onClick: () => navigate(promptRoutes.newPrompt()) }
          }
          secondaryAction={{ label: 'Browse strategies', onClick: () => navigate(promptRoutes.strategies()) }}
        />
      ) : (
        <>
          <div className="pb-result-meta">
            Showing {filtered.length} of {prompts.length}
            {hasFilters && (
              <button type="button" className="pb-textbtn" onClick={clearFilters}>Clear filters</button>
            )}
          </div>
          <div className="pb-grid">
            {filtered.map(p => (
              <PromptCard key={p.id} prompt={p} />
            ))}
          </div>
        </>
      )}

      <p className="pb-page__hint">
        Looking for techniques rather than saved prompts?{' '}
        <Link to={promptRoutes.strategies()} className="pb-link-cta">Browse prompting strategies →</Link>
      </p>
    </div>
  )
}

function PlusGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M8 3v10M3 8h10" />
    </svg>
  )
}

function SearchGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  )
}
