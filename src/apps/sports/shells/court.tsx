// ABOUTME: CourtShell — a React component (apps).

import { Link } from '../../Link'
import { navigate } from '../../router'
import { sportsRoutes } from '../routes'
import type { ShellProps, NavItem } from '../layouts'

interface Hotspot {
  cx: number
  cy: number
  label: string
  hint: string
  to: string
}

const HOTSPOTS: Hotspot[] = [
  { cx: 250, cy: 460, label: 'Top scorers', hint: 'PPG leaders', to: sportsRoutes.players() },
  { cx: 250, cy: 380, label: 'Bigs', hint: 'Centers & PFs', to: sportsRoutes.players() },
  { cx: 110, cy: 330, label: 'East', hint: 'Conference standings', to: sportsRoutes.standings() },
  { cx: 390, cy: 330, label: 'West', hint: 'Conference standings', to: sportsRoutes.standings() },
  { cx: 250, cy: 200, label: 'Shooters', hint: '3-pt + mid-range', to: sportsRoutes.players() },
  { cx: 250, cy: 50, label: 'Tip-off', hint: "Today's games", to: sportsRoutes.games() },
]

function CourtMap() {
  return (
    <div className="sports-court">
      <svg
        viewBox="0 0 500 500"
        className="sports-court__svg"
        role="img"
        aria-label="Basketball court navigation"
      >
        {/* Floor */}
        <rect x="0" y="0" width="500" height="500" className="sports-court__floor" />

        {/* Midcourt half-circle (top) */}
        <line x1="0" y1="0" x2="500" y2="0" className="sports-court__line" />
        <path d="M 200 0 A 50 50 0 0 0 300 0" className="sports-court__line" fill="none" />

        {/* Paint (key) */}
        <rect
          x="170"
          y="280"
          width="160"
          height="210"
          className="sports-court__line sports-court__paint"
        />

        {/* Free throw circle */}
        <circle cx="250" cy="280" r="60" className="sports-court__line" fill="none" />

        {/* 3-pt arc + corner straights */}
        <path
          d="M 30 490 L 30 350 A 235 235 0 0 1 470 350 L 470 490"
          className="sports-court__line"
          fill="none"
        />

        {/* Backboard + hoop */}
        <line x1="220" y1="480" x2="280" y2="480" className="sports-court__line" />
        <circle cx="250" cy="460" r="9" className="sports-court__hoop" />

        {/* Hotspots */}
        {HOTSPOTS.map(h => (
          <g
            key={h.label}
            className="sports-court__hotspot"
            role="link"
            tabIndex={0}
            aria-label={`${h.label} — ${h.hint}`}
            onClick={() => navigate(h.to)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                navigate(h.to)
              }
            }}
          >
            <circle cx={h.cx} cy={h.cy} r="34" className="sports-court__puck" />
            <text x={h.cx} y={h.cy - 2} className="sports-court__puck-label">
              {h.label}
            </text>
            <text x={h.cx} y={h.cy + 14} className="sports-court__puck-hint">
              {h.hint}
            </text>
          </g>
        ))}
      </svg>
      <p className="sports-court__caption">
        Tap a spot on the court to jump to a view. Press any other link to
        leave the court and read in a standard layout.
      </p>
    </div>
  )
}

function CourtNav({ nav, route }: { nav: NavItem[]; route: ShellProps['route'] }) {
  return (
    <nav className="sports-app__court-nav" aria-label="Primary">
      {nav.map(item => {
        const active = item.isActive(route)
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`sports-app__court-nav-link${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

// ABOUTME: CourtShell — a React component.
export function CourtShell(props: ShellProps) {
  const isHome = props.route.kind === 'home'
  return (
    <div className="sports-app sports-app--court">
      <header className="sports-app__header sports-app__header--court">
        {props.brand}
        <CourtNav nav={props.nav} route={props.route} />
        <span className="sports-app__spacer" />
        {props.exit}
      </header>
      <main className="sports-app__main">
        {isHome ? <CourtMap /> : props.children}
      </main>
    </div>
  )
}
