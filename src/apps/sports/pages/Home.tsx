import { Card } from '../../../components/Card/Card'
import { Link } from '../../Link'
import { GAMES, TODAY, getStatLeaders, getStandings } from '../data'
import { formatStat } from '../format'
import { sportsRoutes } from '../routes'
import type { StatKey } from '../data'
import { ScoreCard } from '../components/ScoreCard'
import { TeamChip } from '../components/TeamChip'

const STAT_TILES: { key: StatKey; label: string }[] = [
  { key: 'ppg', label: 'Points per game' },
  { key: 'rpg', label: 'Rebounds per game' },
  { key: 'apg', label: 'Assists per game' },
]

export function Home() {
  const todayGames = GAMES.filter(g => g.date === TODAY)
  const recentFinals = GAMES.filter(g => g.status === 'final').slice(-3).reverse()
  const upcoming = GAMES.filter(g => g.status === 'scheduled').slice(0, 3)

  const featured = [...todayGames, ...upcoming, ...recentFinals].slice(0, 6)

  return (
    <>
      <h1 className="sports-page__title">Hoops Hub</h1>
      <p className="sports-page__subtitle">
        Today's matchups, leaders, and standings across the league.
      </p>

      <section className="sports-page__section">
        <h2 className="sports-page__section-title">
          Featured games
          <Link to={sportsRoutes.games()}>See full schedule →</Link>
        </h2>
        <div className="sports-home__grid">
          {featured.map(g => (
            <ScoreCard key={g.id} game={g} />
          ))}
        </div>
      </section>

      <section className="sports-page__section">
        <h2 className="sports-page__section-title">
          Stat leaders
          <Link to={sportsRoutes.players()}>All players →</Link>
        </h2>
        <div className="sports-home__grid">
          {STAT_TILES.map(tile => {
            const leaders = getStatLeaders(tile.key, 5)
            return (
              <Card key={tile.key} variant="static" title={tile.label}>
                <div className="leader-tile">
                  {leaders.map((p, i) => (
                    <div key={p.id} className="leader-tile__row">
                      <span>
                        <span className="leader-tile__rank">{i + 1}</span>
                        <Link
                          to={sportsRoutes.playerDetail(p.slug)}
                          className="leader-tile__name"
                        >
                          {p.firstName} {p.lastName}
                        </Link>
                      </span>
                      <span className="leader-tile__value">{formatStat(p.stats[tile.key])}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="sports-page__section">
        <h2 className="sports-page__section-title">
          Standings snapshot
          <Link to={sportsRoutes.standings()}>Full standings →</Link>
        </h2>
        <div className="sports-home__grid">
          {(['East', 'West'] as const).map(conf => {
            const top = getStandings(conf).slice(0, 5)
            return (
              <Card key={conf} variant="static" title={`${conf}ern Conference`}>
                <div className="leader-tile">
                  {top.map((t, i) => (
                    <div key={t.id} className="leader-tile__row">
                      <span>
                        <span className="leader-tile__rank">{i + 1}</span>
                        <TeamChip team={t} />
                      </span>
                      <span className="leader-tile__value">{t.wins}-{t.losses}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </section>
    </>
  )
}
