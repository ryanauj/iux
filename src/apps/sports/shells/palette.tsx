// ABOUTME: PaletteShell — command-palette shell that adds a persistent full-width search bar above every page; the bar searches sections, teams, players, and games simultaneously, is focusable with `/` or ⌘K from anywhere, and navigates on Enter or row click.

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from '../../Link'
import { navigate } from '../../router'
import { PLAYERS, TEAMS, GAMES, getTeamById } from '../data'
import { sportsRoutes } from '../routes'
import type { ShellProps } from '../layouts'

// ABOUTME: Union of the four result categories the palette can return: top-level sections, teams, players, and games.
type Kind = 'section' | 'team' | 'player' | 'game'

// ABOUTME: A single search result row: a stable key, the result category, the primary label, secondary meta text, and the route to navigate on selection.
interface PaletteResult {
  key: string
  kind: Kind
  label: string
  meta: string
  to: string
}

// ABOUTME: Pre-built section results for Home, Teams, Players, Games, and Standings; returned as the full result list when the query is empty.
const SECTIONS: PaletteResult[] = [
  { key: 's-home', kind: 'section', label: 'Home', meta: 'Dashboard', to: sportsRoutes.home() },
  { key: 's-teams', kind: 'section', label: 'Teams', meta: 'All 10 franchises', to: sportsRoutes.teams() },
  { key: 's-players', kind: 'section', label: 'Players', meta: 'Sortable roster', to: sportsRoutes.players() },
  { key: 's-games', kind: 'section', label: 'Games', meta: 'Schedule + scores', to: sportsRoutes.games() },
  { key: 's-standings', kind: 'section', label: 'Standings', meta: 'East / West tables', to: sportsRoutes.standings() },
]

// ABOUTME: Runs a case-insensitive substring search across sections, teams, players, and games, returning up to 20 PaletteResult rows in priority order (sections first, then teams, players, games).
function searchAll(q: string): PaletteResult[] {
  const needle = q.trim().toLowerCase()
  if (!needle) return SECTIONS
  const out: PaletteResult[] = []

  for (const s of SECTIONS) {
    if (s.label.toLowerCase().includes(needle)) out.push(s)
  }
  for (const t of TEAMS) {
    if (`${t.city} ${t.name} ${t.abbreviation}`.toLowerCase().includes(needle)) {
      out.push({
        key: `t-${t.id}`,
        kind: 'team',
        label: `${t.city} ${t.name}`,
        meta: `${t.conference} · ${t.wins}-${t.losses} · ${t.streak}`,
        to: sportsRoutes.teamDetail(t.slug),
      })
    }
  }
  for (const p of PLAYERS) {
    if (`${p.firstName} ${p.lastName}`.toLowerCase().includes(needle)) {
      const team = getTeamById(p.teamId)
      out.push({
        key: `p-${p.id}`,
        kind: 'player',
        label: `${p.firstName} ${p.lastName}`,
        meta: `${p.position} · ${team?.name ?? '—'} · ${p.stats.ppg.toFixed(1)} PPG`,
        to: sportsRoutes.playerDetail(p.slug),
      })
    }
  }
  for (const g of GAMES) {
    const home = getTeamById(g.homeTeamId)
    const away = getTeamById(g.awayTeamId)
    if (!home || !away) continue
    if (`${home.name} ${away.name} ${g.date} ${g.status}`.toLowerCase().includes(needle)) {
      out.push({
        key: `g-${g.id}`,
        kind: 'game',
        label: `${away.name} @ ${home.name}`,
        meta: `${g.date} · ${g.status}`,
        to: sportsRoutes.gameDetail(g.id),
      })
    }
  }
  return out.slice(0, 20)
}

// ABOUTME: Shell that renders a command-palette search box above the main content area on every route; unlike other shells it does not replace the Home page — it augments all pages with the palette affordance.
/**
 * Mounts a single-input search over all entity types (sections, teams,
 * players, games). Arrow keys move the active row; Enter navigates; Escape
 * clears. A global keydown listener captures `/` and ⌘K to focus the input
 * from anywhere, skipping text fields that already own the key. The standard
 * props.children page renders below the palette, so every route remains
 * accessible via direct links.
 */
export function PaletteShell(props: ShellProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useMemo(() => searchAll(query), [query])

  useEffect(() => setActive(0), [query])

  // `/` and ⌘K focus the search anywhere on the page, mirroring command-palette
  // conventions. Skip when the user is already typing into another input.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
      if (typing) return
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        e.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(a => Math.min(a + 1, Math.max(0, results.length - 1)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(a => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      const r = results[active]
      if (r) {
        e.preventDefault()
        setQuery('')
        navigate(r.to)
      }
    } else if (e.key === 'Escape') {
      setQuery('')
      inputRef.current?.blur()
    }
  }

  return (
    <div className="sports-app sports-app--palette">
      <header className="sports-app__header sports-app__header--minimal">
        {props.brand}
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      <div className="sports-palette">
        <input
          ref={inputRef}
          type="search"
          className="sports-palette__input"
          placeholder="Search teams, players, games…   (press /)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          aria-label="Search hoops hub"
          aria-controls="sports-palette-results"
        />
        <ul id="sports-palette-results" className="sports-palette__results" role="listbox">
          {results.map((r, i) => (
            <li
              key={r.key}
              className={`sports-palette__result${i === active ? ' is-active' : ''}`}
              role="option"
              aria-selected={i === active}
            >
              <Link
                to={r.to}
                className="sports-palette__result-link"
                onClick={() => setQuery('')}
                onMouseEnter={() => setActive(i)}
              >
                <span className={`sports-palette__kind sports-palette__kind--${r.kind}`}>{r.kind}</span>
                <span className="sports-palette__label">{r.label}</span>
                <span className="sports-palette__meta">{r.meta}</span>
              </Link>
            </li>
          ))}
          {results.length === 0 && (
            <li className="sports-palette__empty">No matches for &ldquo;{query}&rdquo;</li>
          )}
        </ul>
      </div>
      <main className="sports-app__main">{props.children}</main>
    </div>
  )
}
