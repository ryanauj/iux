// ABOUTME: Team browser page showing all 10 teams as Card tiles with a gradient banner, record, and streak, filterable by conference (All / East / West) via a Segmented pill control; each card links to TeamDetail.

import { useState } from 'react'
import { Card } from '../../../components/Card/Card'
import { Segmented } from '../../../components/Segmented/Segmented'
import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { Link } from '../../Link'
import { TEAMS } from '../data'
import { sportsRoutes } from '../routes'
import { winPct } from '../format'
import type { Conference } from '../types'

// ABOUTME: Union of the three conference filter options on the Teams page: show all teams, or narrow to Eastern or Western Conference only.
type ConfFilter = 'all' | Conference

// ABOUTME: Filters TEAMS by the chosen conference, renders each as a gradient-banner Card with city, division, W-L record, and current streak; shows an EmptyState when no teams match.
export function Teams() {
  const [filter, setFilter] = useState<ConfFilter>('all')
  const teams = filter === 'all' ? TEAMS : TEAMS.filter(t => t.conference === filter)

  return (
    <>
      <h1 className="sports-page__title">Teams</h1>
      <p className="sports-page__subtitle">All 10 teams, with the current season record.</p>

      <div className="sports-page__filters">
        <Segmented
          ariaLabel="Filter teams by conference"
          variant="pill"
          value={filter}
          onValueChange={v => setFilter(v as ConfFilter)}
          items={[
            { value: 'all', label: 'All' },
            { value: 'East', label: 'East' },
            { value: 'West', label: 'West' },
          ]}
        />
      </div>

      {teams.length === 0 ? (
        <EmptyState
          variant="minimal"
          title="No teams match"
          description="Adjust the conference filter to see more."
        />
      ) : (
        <div className="teams-grid">
          {teams.map(t => (
            <Card key={t.id} variant="static">
              <Link
                to={sportsRoutes.teamDetail(t.slug)}
                className="team-card"
                aria-label={`${t.city} ${t.name}`}
              >
                <div
                  className="team-card__banner"
                  style={{
                    background: `linear-gradient(90deg, ${t.primaryColor} 0%, ${t.secondaryColor} 100%)`,
                  }}
                  aria-hidden="true"
                />
                <div className="team-card__city">{t.city} · {t.conference} · {t.division}</div>
                <div className="team-card__name">{t.name}</div>
                <div className="team-card__record">
                  <span>Record</span>
                  <span className="team-card__record-value">
                    {t.wins}-{t.losses} ({winPct(t.wins, t.losses)})
                  </span>
                </div>
                <div className="team-card__record">
                  <span>Streak</span>
                  <span className="team-card__record-value">{t.streak}</span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
