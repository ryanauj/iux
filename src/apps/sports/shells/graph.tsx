// ABOUTME: GraphShell — force-directed network shell that replaces the Home page with an SVG graph of teams (inner ring), players (outer fan), and games (between team pairs); hover highlights connected nodes, click navigates to the entity page, and filter chips show/hide node kinds; layout is computed once and cached.

import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { Link } from '../../Link'
import { navigate, replaceParams, useHashLocation } from '../../router'
import { GAMES, PLAYERS, TEAMS, getTeamById } from '../data'
import { formatDate, formatStat } from '../format'
import { sportsRoutes } from '../routes'
import type { ShellProps, NavItem } from '../layouts'

type NodeKind = 'team' | 'player' | 'game'

interface GraphNode {
  id: string
  kind: NodeKind
  label: string
  sublabel: string
  color: string
  to: string
  radius: number
  x: number
  y: number
}

interface GraphEdge { a: string; b: string }

const W = 800
const H = 560
const CX = W / 2
const CY = H / 2

const NODE_RADIUS: Record<NodeKind, number> = { team: 22, player: 11, game: 13 }

function buildGraph(): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  // Teams in an inner ring — primary anchors of the layout.
  TEAMS.forEach((t, i) => {
    const angle = (i / TEAMS.length) * Math.PI * 2 - Math.PI / 2
    const r = 110
    nodes.push({
      id: `team:${t.id}`,
      kind: 'team',
      label: t.abbreviation,
      sublabel: `${t.city} ${t.name}`,
      color: t.primaryColor,
      to: sportsRoutes.teamDetail(t.slug),
      radius: NODE_RADIUS.team,
      x: CX + r * Math.cos(angle),
      y: CY + r * Math.sin(angle),
    })
  })

  // Players seeded near their team so the force step has a head start.
  PLAYERS.forEach(p => {
    const team = getTeamById(p.teamId)
    if (!team) return
    const teamIdx = TEAMS.findIndex(t => t.id === team.id)
    const teamAngle = (teamIdx / TEAMS.length) * Math.PI * 2 - Math.PI / 2
    const fan = ((p.jersey % 5) - 2) * 0.16
    const r = 230 + (p.jersey % 3) * 14
    nodes.push({
      id: `player:${p.id}`,
      kind: 'player',
      label: `${p.firstName[0]}. ${p.lastName}`,
      sublabel: `${p.position} · ${formatStat(p.stats.ppg)} PPG`,
      color: team.primaryColor,
      to: sportsRoutes.playerDetail(p.slug),
      radius: NODE_RADIUS.player,
      x: CX + r * Math.cos(teamAngle + fan),
      y: CY + r * Math.sin(teamAngle + fan),
    })
    edges.push({ a: `player:${p.id}`, b: `team:${team.id}` })
  })

  // Games slot between the two teams that played, then forces pull them tight.
  GAMES.forEach((g, i) => {
    const home = getTeamById(g.homeTeamId)
    const away = getTeamById(g.awayTeamId)
    if (!home || !away) return
    const homeIdx = TEAMS.findIndex(t => t.id === home.id)
    const awayIdx = TEAMS.findIndex(t => t.id === away.id)
    const ha = (homeIdx / TEAMS.length) * Math.PI * 2 - Math.PI / 2
    const aa = (awayIdx / TEAMS.length) * Math.PI * 2 - Math.PI / 2
    const mx = (Math.cos(ha) + Math.cos(aa)) / 2
    const my = (Math.sin(ha) + Math.sin(aa)) / 2
    const len = Math.hypot(mx, my) || 1
    const r = 40 + (i % 3) * 18
    nodes.push({
      id: `game:${g.id}`,
      kind: 'game',
      label: `${away.abbreviation}@${home.abbreviation}`,
      sublabel: g.status === 'live'
        ? `LIVE · Q${g.quarter ?? '?'}`
        : g.status === 'final'
          ? `Final · ${formatDate(g.date)}`
          : `Tip · ${formatDate(g.date)}`,
      color: g.status === 'live' ? home.primaryColor : home.primaryColor,
      to: sportsRoutes.gameDetail(g.id),
      radius: NODE_RADIUS.game,
      x: CX + r * (mx / len),
      y: CY + r * (my / len),
    })
    edges.push({ a: `game:${g.id}`, b: `team:${home.id}` })
    edges.push({ a: `game:${g.id}`, b: `team:${away.id}` })
  })

  return { nodes, edges }
}

// Plain iterative spring layout — no D3, no dependencies. The radial
// seeding above does most of the work; this just relaxes the result so
// overlapping clusters spread out and edges shrink toward their rest length.
function relax(nodes: GraphNode[], edges: GraphEdge[]): GraphNode[] {
  const pos = new Map(nodes.map(n => [n.id, { x: n.x, y: n.y }]))
  const ITERATIONS = 120
  const REPULSION = 5200
  const ATTRACTION = 0.025
  const REST = 88
  const GRAVITY = 0.012
  const MAX_STEP_START = 18
  for (let iter = 0; iter < ITERATIONS; iter++) {
    const decay = 1 - iter / ITERATIONS
    const maxStep = Math.max(2, MAX_STEP_START * decay)
    const force = new Map(nodes.map(n => [n.id, { x: 0, y: 0 }]))
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const pa = pos.get(nodes[i].id)!
        const pb = pos.get(nodes[j].id)!
        let dx = pa.x - pb.x
        let dy = pa.y - pb.y
        let d2 = dx * dx + dy * dy
        if (d2 < 1) { dx = (i - j) || 1; dy = 1; d2 = dx * dx + dy * dy }
        const d = Math.sqrt(d2)
        const f = REPULSION / d2
        const fx = (dx / d) * f
        const fy = (dy / d) * f
        const fa = force.get(nodes[i].id)!
        const fb = force.get(nodes[j].id)!
        fa.x += fx; fa.y += fy
        fb.x -= fx; fb.y -= fy
      }
    }
    for (const e of edges) {
      const pa = pos.get(e.a)!
      const pb = pos.get(e.b)!
      const dx = pb.x - pa.x
      const dy = pb.y - pa.y
      const d = Math.max(1, Math.hypot(dx, dy))
      const f = ATTRACTION * (d - REST)
      const fx = (dx / d) * f
      const fy = (dy / d) * f
      const fa = force.get(e.a)!
      const fb = force.get(e.b)!
      fa.x += fx; fa.y += fy
      fb.x -= fx; fb.y -= fy
    }
    for (const n of nodes) {
      const p = pos.get(n.id)!
      const f = force.get(n.id)!
      f.x += (CX - p.x) * GRAVITY
      f.y += (CY - p.y) * GRAVITY
      const m = Math.hypot(f.x, f.y)
      if (m > maxStep) { f.x = (f.x / m) * maxStep; f.y = (f.y / m) * maxStep }
      p.x = Math.max(n.radius + 4, Math.min(W - n.radius - 4, p.x + f.x))
      p.y = Math.max(n.radius + 4, Math.min(H - n.radius - 4, p.y + f.y))
    }
  }
  return nodes.map(n => ({ ...n, ...pos.get(n.id)! }))
}

// Cache the (expensive) layout pass. The dataset is static at module
// load, so we only need to compute positions once per page session — even
// across remounts of the shell (e.g. layout switched away and back).
let LAYOUT_CACHE: { nodes: GraphNode[]; edges: GraphEdge[]; neighbors: Map<string, Set<string>> } | null = null
function getLayout() {
  if (LAYOUT_CACHE) return LAYOUT_CACHE
  const built = buildGraph()
  const nodes = relax(built.nodes, built.edges)
  const neighbors = new Map<string, Set<string>>()
  for (const n of nodes) neighbors.set(n.id, new Set())
  for (const e of built.edges) {
    neighbors.get(e.a)!.add(e.b)
    neighbors.get(e.b)!.add(e.a)
  }
  LAYOUT_CACHE = { nodes, edges: built.edges, neighbors }
  return LAYOUT_CACHE
}

const FILTER_CODES: Record<NodeKind, string> = { team: 't', player: 'p', game: 'g' }
const ALL_KINDS: NodeKind[] = ['team', 'player', 'game']

function parseFilter(raw: string | null): Set<NodeKind> {
  if (!raw) return new Set(ALL_KINDS)
  const codes = raw.split(',').filter(Boolean)
  const out = new Set<NodeKind>()
  for (const k of ALL_KINDS) if (codes.includes(FILTER_CODES[k])) out.add(k)
  if (out.size === 0) return new Set(ALL_KINDS)
  return out
}

function serializeFilter(filter: Set<NodeKind>): string | undefined {
  if (filter.size === ALL_KINDS.length) return undefined
  return ALL_KINDS.filter(k => filter.has(k)).map(k => FILTER_CODES[k]).join(',')
}

function GraphSurface({
  filter,
  onFilterChange,
}: {
  filter: Set<NodeKind>
  onFilterChange: (next: Set<NodeKind>) => void
}) {
  const { nodes, edges, neighbors } = useMemo(() => getLayout(), [])
  const [hover, setHover] = useState<string | null>(null)

  const visible = useMemo(() => {
    const vis = new Set<string>()
    for (const n of nodes) if (filter.has(n.kind)) vis.add(n.id)
    return vis
  }, [filter, nodes])

  const focusSet = useMemo(() => {
    if (!hover || !visible.has(hover)) return null
    const set = new Set<string>([hover])
    for (const nb of neighbors.get(hover) ?? []) if (visible.has(nb)) set.add(nb)
    return set
  }, [hover, neighbors, visible])

  const toggleKind = useCallback((kind: NodeKind) => {
    const next = new Set(filter)
    if (next.has(kind)) next.delete(kind)
    else next.add(kind)
    if (next.size === 0) return // never let the user blank the canvas
    onFilterChange(next)
  }, [filter, onFilterChange])

  const hoveredNode = hover ? nodes.find(n => n.id === hover) : null

  return (
    <div className="sports-graph">
      <div className="sports-graph__legend" role="group" aria-label="Show node types">
        {ALL_KINDS.map(k => {
          const on = filter.has(k)
          return (
            <button
              key={k}
              type="button"
              className={`sports-graph__chip sports-graph__chip--${k}${on ? ' is-on' : ''}`}
              aria-pressed={on}
              onClick={() => toggleKind(k)}
            >
              <span className={`sports-graph__chip-dot sports-graph__chip-dot--${k}`} aria-hidden="true" />
              {k === 'team' ? 'Teams' : k === 'player' ? 'Players' : 'Games'}
              <span className="sports-graph__chip-count">
                {nodes.filter(n => n.kind === k).length}
              </span>
            </button>
          )
        })}
      </div>
      <div className="sports-graph__stage">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="sports-graph__svg"
          role="img"
          aria-label="Force-directed network of teams, players, and games"
          preserveAspectRatio="xMidYMid meet"
        >
          <g className="sports-graph__edges">
            {edges.map((e, i) => {
              const a = nodes.find(n => n.id === e.a)
              const b = nodes.find(n => n.id === e.b)
              if (!a || !b) return null
              if (!visible.has(a.id) || !visible.has(b.id)) return null
              const dim = focusSet ? !(focusSet.has(a.id) && focusSet.has(b.id)) : false
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={`sports-graph__edge${dim ? ' is-dim' : ''}`}
                />
              )
            })}
          </g>
          <g className="sports-graph__nodes">
            {nodes.map(n => {
              if (!visible.has(n.id)) return null
              const dim = focusSet ? !focusSet.has(n.id) : false
              const active = hover === n.id
              return (
                <g
                  key={n.id}
                  role="link"
                  tabIndex={0}
                  aria-label={`${n.sublabel} — open ${n.kind} page`}
                  className={`sports-graph__node sports-graph__node--${n.kind}${dim ? ' is-dim' : ''}${active ? ' is-active' : ''}`}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(curr => (curr === n.id ? null : curr))}
                  onFocus={() => setHover(n.id)}
                  onBlur={() => setHover(curr => (curr === n.id ? null : curr))}
                  onClick={() => navigate(n.to)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      navigate(n.to)
                    }
                  }}
                >
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.radius}
                    fill={n.color}
                    className="sports-graph__node-disk"
                  />
                  {n.kind === 'team' && (
                    <text
                      x={n.x}
                      y={n.y}
                      className="sports-graph__node-mark"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {n.label}
                    </text>
                  )}
                </g>
              )
            })}
          </g>
        </svg>
        {hoveredNode && (
          <div className="sports-graph__tooltip" aria-live="polite">
            <span className="sports-graph__tooltip-kind">{hoveredNode.kind}</span>
            <span className="sports-graph__tooltip-label">{hoveredNode.sublabel}</span>
            <Link to={hoveredNode.to} className="sports-graph__tooltip-open">
              Open →
            </Link>
          </div>
        )}
      </div>
      <p className="sports-graph__hint">
        Edges connect players and games to the teams they belong to. Hover a
        node to highlight its connections; click to open its page.
      </p>
    </div>
  )
}

function GraphNav({ nav, route }: { nav: NavItem[]; route: ShellProps['route'] }) {
  return (
    <nav className="sports-app__graph-nav" aria-label="Primary">
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`sports-app__graph-nav-link${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

// ABOUTME: Shell that mounts the force-directed GraphSurface on the Home route and the standard page on all other routes; the visible node-kind set is persisted in `?graph=` as a compact comma-joined code string.
/**
 * On the Home route renders GraphSurface — a 800×560 SVG with team, player,
 * and game nodes laid out by a custom iterative spring algorithm (no D3).
 * The layout is computed once at module level and cached across remounts.
 * Filter chips let the user hide any node kind; the filter is synced to
 * `?graph=` via replaceParams so it survives navigation. On other routes the
 * graph is replaced by props.children.
 */
export function GraphShell(props: ShellProps): ReactNode {
  const location = useHashLocation()
  const filter = useMemo(
    () => parseFilter(location.params.get('graph')),
    [location.params],
  )
  const setFilter = useCallback((next: Set<NodeKind>) => {
    replaceParams({ graph: serializeFilter(next) })
  }, [])

  const isHome = props.route.kind === 'home'

  return (
    <div className="sports-app sports-app--graph">
      <header className="sports-app__header sports-app__header--graph">
        {props.brand}
        <GraphNav nav={props.nav} route={props.route} />
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      <main className="sports-app__main">
        {isHome ? <GraphSurface filter={filter} onFilterChange={setFilter} /> : props.children}
      </main>
    </div>
  )
}
