// ABOUTME: Schedule page showing all games grouped by date, filterable by status (All / Final / Live / Upcoming) using a Segmented pill control.

import { useState } from 'react'
import { Segmented } from '../../../components/Segmented/Segmented'
import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { GAMES, groupGamesByDate } from '../data'
import { formatLongDate } from '../format'
import { ScoreCard } from '../components/ScoreCard'
import type { GameStatus } from '../types'

type StatusFilter = 'all' | GameStatus

// ABOUTME: Filters GAMES by the chosen status, groups the result by ISO date via `groupGamesByDate`, and renders each date section as a grid of ScoreCard tiles; shows an EmptyState when no games match.
/**
 * The full league schedule. Status filter state is local; filtered games are
 * passed through `groupGamesByDate` so each date gets its own section heading.
 * Each game tile is a `ScoreCard` linking to `GameDetail`.
 */
export function Games() {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const filtered = filter === 'all' ? GAMES : GAMES.filter(g => g.status === filter)
  const groups = groupGamesByDate(filtered)

  return (
    <>
      <h1 className="sports-page__title">Schedule</h1>
      <p className="sports-page__subtitle">All games on the books, grouped by date.</p>

      <div className="sports-page__filters">
        <Segmented
          ariaLabel="Filter games by status"
          variant="pill"
          value={filter}
          onValueChange={v => setFilter(v as StatusFilter)}
          items={[
            { value: 'all', label: 'All' },
            { value: 'final', label: 'Final' },
            { value: 'live', label: 'Live' },
            { value: 'scheduled', label: 'Upcoming' },
          ]}
        />
      </div>

      {groups.length === 0 ? (
        <EmptyState
          variant="minimal"
          title="No games match"
          description="Adjust the status filter to see more."
        />
      ) : (
        groups.map(g => (
          <section key={g.date} className="sports-page__section">
            <h2 className="sports-page__section-title">{formatLongDate(g.date)}</h2>
            <div className="sports-home__grid">
              {g.games.map(game => (
                <ScoreCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  )
}
