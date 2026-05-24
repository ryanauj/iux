import { useState } from 'react'
import { Segmented } from '../../../components/Segmented/Segmented'
import { Table, type TableColumn } from '../../../components/Table/Table'
import { EmptyState } from '../../../components/EmptyState/EmptyState'
import { Link } from '../../Link'
import { PLAYERS, getTeamById } from '../data'
import { sportsRoutes } from '../routes'
import { formatStat, formatPct } from '../format'
import type { Player, Position } from '../types'
import { TeamChip } from '../components/TeamChip'

type PosFilter = 'all' | Position

const POS_FILTERS: { value: PosFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'PG', label: 'PG' },
  { value: 'SG', label: 'SG' },
  { value: 'SF', label: 'SF' },
  { value: 'PF', label: 'PF' },
  { value: 'C', label: 'C' },
]

export function Players() {
  const [filter, setFilter] = useState<PosFilter>('all')
  const players = filter === 'all' ? PLAYERS : PLAYERS.filter(p => p.position === filter)

  const columns: TableColumn<Player>[] = [
    {
      key: 'name',
      header: 'Player',
      accessor: p => (
        <Link to={sportsRoutes.playerDetail(p.slug)}>{p.firstName} {p.lastName}</Link>
      ),
      sortBy: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      key: 'team',
      header: 'Team',
      accessor: p => {
        const team = getTeamById(p.teamId)
        return team ? <TeamChip team={team} /> : null
      },
      sortBy: (a, b) => (getTeamById(a.teamId)?.name ?? '').localeCompare(getTeamById(b.teamId)?.name ?? ''),
    },
    { key: 'pos', header: 'Pos', accessor: p => p.position, sortBy: (a, b) => a.position.localeCompare(b.position) },
    { key: 'gp', header: 'GP', accessor: p => p.stats.gamesPlayed, sortBy: (a, b) => a.stats.gamesPlayed - b.stats.gamesPlayed, align: 'end' },
    { key: 'mpg', header: 'MPG', accessor: p => formatStat(p.stats.minutesPerGame), sortBy: (a, b) => a.stats.minutesPerGame - b.stats.minutesPerGame, align: 'end' },
    { key: 'ppg', header: 'PPG', accessor: p => formatStat(p.stats.ppg), sortBy: (a, b) => a.stats.ppg - b.stats.ppg, align: 'end' },
    { key: 'rpg', header: 'RPG', accessor: p => formatStat(p.stats.rpg), sortBy: (a, b) => a.stats.rpg - b.stats.rpg, align: 'end' },
    { key: 'apg', header: 'APG', accessor: p => formatStat(p.stats.apg), sortBy: (a, b) => a.stats.apg - b.stats.apg, align: 'end' },
    { key: 'fg', header: 'FG%', accessor: p => formatPct(p.stats.fgPct), sortBy: (a, b) => a.stats.fgPct - b.stats.fgPct, align: 'end' },
    { key: 'fg3', header: '3P%', accessor: p => formatPct(p.stats.fg3Pct), sortBy: (a, b) => a.stats.fg3Pct - b.stats.fg3Pct, align: 'end' },
  ]

  return (
    <>
      <h1 className="sports-page__title">Players</h1>
      <p className="sports-page__subtitle">All players, sortable. Click any header to sort.</p>

      <div className="sports-page__filters">
        <Segmented
          ariaLabel="Filter by position"
          variant="pill"
          value={filter}
          onValueChange={v => setFilter(v as PosFilter)}
          items={POS_FILTERS.map(o => ({ value: o.value, label: o.label }))}
        />
      </div>

      {players.length === 0 ? (
        <EmptyState
          variant="minimal"
          title="No players match"
          description="Try a different position filter."
        />
      ) : (
        <Table
          variant="sortable"
          data={players}
          columns={columns}
          getRowId={p => p.id}
          defaultSort={{ key: 'ppg', dir: 'desc' }}
          caption="All players"
        />
      )}
    </>
  )
}
