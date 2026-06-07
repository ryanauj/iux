// ABOUTME: Standings — a React component (apps).

import { Table, type TableColumn } from '../../../components/Table/Table'
import { getStandings } from '../data'
import { gamesBehind, winPct } from '../format'
import type { Team } from '../types'
import { TeamChip } from '../components/TeamChip'

// ABOUTME: Standings — a React component.
export function Standings() {
  return (
    <>
      <h1 className="sports-page__title">Standings</h1>
      <p className="sports-page__subtitle">
        Conference standings sorted by winning percentage.
      </p>

      {(['East', 'West'] as const).map(conf => {
        const teams = getStandings(conf)
        const leader = teams[0]

        const columns: TableColumn<Team>[] = [
          {
            key: 'rank',
            header: '#',
            accessor: t => teams.indexOf(t) + 1,
            align: 'end',
          },
          {
            key: 'team',
            header: 'Team',
            accessor: t => <TeamChip team={t} />,
            sortBy: (a, b) => a.name.localeCompare(b.name),
          },
          { key: 'w', header: 'W', accessor: t => t.wins, sortBy: (a, b) => a.wins - b.wins, align: 'end' },
          { key: 'l', header: 'L', accessor: t => t.losses, sortBy: (a, b) => a.losses - b.losses, align: 'end' },
          { key: 'pct', header: 'PCT', accessor: t => winPct(t.wins, t.losses), sortBy: (a, b) => (a.wins / Math.max(1, a.wins + a.losses)) - (b.wins / Math.max(1, b.wins + b.losses)), align: 'end' },
          {
            key: 'gb',
            header: 'GB',
            accessor: t =>
              leader
                ? gamesBehind(leader.wins, leader.losses, t.wins, t.losses)
                : '—',
            align: 'end',
          },
          { key: 'pf', header: 'PF', accessor: t => t.pointsFor.toFixed(1), sortBy: (a, b) => a.pointsFor - b.pointsFor, align: 'end' },
          { key: 'pa', header: 'PA', accessor: t => t.pointsAgainst.toFixed(1), sortBy: (a, b) => a.pointsAgainst - b.pointsAgainst, align: 'end' },
          { key: 'l10', header: 'L10', accessor: t => t.last10 },
          { key: 'strk', header: 'STRK', accessor: t => t.streak },
        ]

        return (
          <section key={conf} className="sports-page__section">
            <h2 className="sports-page__section-title">{conf}ern Conference</h2>
            <Table
              variant="sortable"
              data={teams}
              columns={columns}
              getRowId={t => t.id}
              caption={`${conf}ern Conference standings`}
            />
          </section>
        )
      })}
    </>
  )
}
