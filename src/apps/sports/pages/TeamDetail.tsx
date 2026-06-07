// ABOUTME: TeamDetail — a React component (apps).

import { Tabs } from '../../../components/Tabs/Tabs'
import { Table, type TableColumn } from '../../../components/Table/Table'
import { Link } from '../../Link'
import { sportsRoutes } from '../routes'
import {
  getTeamBySlug,
  getPlayersForTeam,
  getGamesForTeam,
  getTeamById,
} from '../data'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { formatHeight, formatStat, formatDate, winPct } from '../format'
import { NotFound } from './NotFound'
import type { Player, Game } from '../types'

interface TeamDetailProps {
  slug: string
}

// ABOUTME: TeamDetail — a React component.
export function TeamDetail({ slug }: TeamDetailProps) {
  const team = getTeamBySlug(slug)
  if (!team) return <NotFound message={`No team with slug "${slug}".`} />

  const roster = getPlayersForTeam(team.id)
  const games = getGamesForTeam(team.id).slice().sort((a, b) => a.date.localeCompare(b.date))

  const rosterColumns: TableColumn<Player>[] = [
    {
      key: 'name',
      header: 'Player',
      accessor: p => (
        <Link to={sportsRoutes.playerDetail(p.slug)}>{p.firstName} {p.lastName}</Link>
      ),
      sortBy: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    { key: 'jersey', header: '#', accessor: p => p.jersey, sortBy: (a, b) => a.jersey - b.jersey, align: 'end' },
    { key: 'pos', header: 'Pos', accessor: p => p.position, sortBy: (a, b) => a.position.localeCompare(b.position) },
    { key: 'ht', header: 'Ht', accessor: p => formatHeight(p.heightInches), sortBy: (a, b) => a.heightInches - b.heightInches },
    { key: 'wt', header: 'Wt', accessor: p => `${p.weightLbs} lb`, sortBy: (a, b) => a.weightLbs - b.weightLbs, align: 'end' },
    { key: 'age', header: 'Age', accessor: p => p.age, sortBy: (a, b) => a.age - b.age, align: 'end' },
    { key: 'ppg', header: 'PPG', accessor: p => formatStat(p.stats.ppg), sortBy: (a, b) => a.stats.ppg - b.stats.ppg, align: 'end' },
    { key: 'rpg', header: 'RPG', accessor: p => formatStat(p.stats.rpg), sortBy: (a, b) => a.stats.rpg - b.stats.rpg, align: 'end' },
    { key: 'apg', header: 'APG', accessor: p => formatStat(p.stats.apg), sortBy: (a, b) => a.stats.apg - b.stats.apg, align: 'end' },
  ]

  const gameColumns: TableColumn<Game>[] = [
    {
      key: 'date',
      header: 'Date',
      accessor: g => formatDate(g.date),
      sortBy: (a, b) => a.date.localeCompare(b.date),
    },
    {
      key: 'opp',
      header: 'Opponent',
      accessor: g => {
        const isHome = g.homeTeamId === team.id
        const oppId = isHome ? g.awayTeamId : g.homeTeamId
        const opp = getTeamById(oppId)
        if (!opp) return null
        return (
          <span>
            <span style={{ color: 'var(--color-content-secondary)' }}>{isHome ? 'vs' : '@'}</span>
            {' '}
            <Link to={sportsRoutes.teamDetail(opp.slug)}>{opp.name}</Link>
          </span>
        )
      },
    },
    {
      key: 'status',
      header: 'Status',
      accessor: g => g.status === 'live'
        ? `Live · Q${g.quarter ?? 1} ${g.timeRemaining ?? ''}`
        : g.status === 'final' ? 'Final' : 'Upcoming',
    },
    {
      key: 'result',
      header: 'Result',
      accessor: g => {
        if (g.status === 'scheduled') return '—'
        if (typeof g.homeScore !== 'number' || typeof g.awayScore !== 'number') return '—'
        const teamScore = g.homeTeamId === team.id ? g.homeScore : g.awayScore
        const oppScore = g.homeTeamId === team.id ? g.awayScore : g.homeScore
        const tag = g.status === 'final'
          ? (teamScore > oppScore ? 'W' : 'L')
          : ' '
        return (
          <span>
            {g.status === 'final' && <strong>{tag}</strong>}{' '}
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{teamScore}-{oppScore}</span>
          </span>
        )
      },
      align: 'end',
    },
    {
      key: 'link',
      header: '',
      accessor: g => <Link to={sportsRoutes.gameDetail(g.id)}>Box →</Link>,
    },
  ]

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { label: 'Home', to: sportsRoutes.home() },
          { label: 'Teams', to: sportsRoutes.teams() },
          { label: team.name },
        ]}
      />

      <header
        className="team-detail__header"
        style={{
          borderLeft: `6px solid ${team.primaryColor}`,
        }}
      >
        <div className="team-detail__crest" style={{ backgroundColor: team.primaryColor }}>
          {team.abbreviation}
        </div>
        <div className="team-detail__name">
          <span className="team-detail__city">{team.city}</span>
          <h1 className="team-detail__title">{team.name}</h1>
        </div>
        <div className="team-detail__meta">
          <div className="team-detail__meta-item">
            <span className="team-detail__meta-label">Record</span>
            <span className="team-detail__meta-value">
              {team.wins}-{team.losses} ({winPct(team.wins, team.losses)})
            </span>
          </div>
          <div className="team-detail__meta-item">
            <span className="team-detail__meta-label">Conference</span>
            <span className="team-detail__meta-value">{team.conference} · {team.division}</span>
          </div>
          <div className="team-detail__meta-item">
            <span className="team-detail__meta-label">Coach</span>
            <span className="team-detail__meta-value">{team.headCoach}</span>
          </div>
          <div className="team-detail__meta-item">
            <span className="team-detail__meta-label">Arena</span>
            <span className="team-detail__meta-value">{team.arena}</span>
          </div>
        </div>
      </header>

      <Tabs
        variant="basic"
        ariaLabel="Team sections"
        tabs={[
          { id: 'roster', label: `Roster (${roster.length})` },
          { id: 'schedule', label: `Schedule (${games.length})` },
          { id: 'stats', label: 'Team stats' },
        ]}
        renderPanel={id => {
          if (id === 'roster') {
            return (
              <Table
                variant="sortable"
                data={roster}
                columns={rosterColumns}
                getRowId={p => p.id}
                defaultSort={{ key: 'ppg', dir: 'desc' }}
                caption={`${team.city} ${team.name} roster`}
              />
            )
          }
          if (id === 'schedule') {
            return (
              <Table
                variant="sortable"
                data={games}
                columns={gameColumns}
                getRowId={g => g.id}
                defaultSort={{ key: 'date', dir: 'asc' }}
                caption={`${team.city} ${team.name} schedule`}
              />
            )
          }
          return (
            <div className="player-detail__stat-grid">
              <StatCell label="Points / game" value={formatStat(team.pointsFor)} />
              <StatCell label="Allowed / game" value={formatStat(team.pointsAgainst)} />
              <StatCell label="Net" value={formatStat(team.pointsFor - team.pointsAgainst)} />
              <StatCell label="Last 10" value={team.last10} />
              <StatCell label="Streak" value={team.streak} />
              <StatCell label="Win %" value={winPct(team.wins, team.losses)} />
              <StatCell label="Founded" value={String(team.founded)} />
              <StatCell label="" value="" />
            </div>
          )
        }}
      />
    </>
  )
}

function StatCell({ label, value }: { label: string; value: string }) {
  if (!label) return null
  return (
    <div className="player-stat">
      <span className="player-stat__label">{label}</span>
      <span className="player-stat__value">{value}</span>
    </div>
  )
}
