// ABOUTME: Inches to "6'7\"" — basketball convention.

/** Inches to "6'7\"" — basketball convention. */
// ABOUTME: formatHeight — a helper function.
export function formatHeight(inches: number): string {
  const feet = Math.floor(inches / 12)
  const remaining = inches % 12
  return `${feet}'${remaining}"`
}

// ABOUTME: formatPct — a helper function.
/** Decimal share like 0.512 → ".512" — basketball convention drops the leading 0. */
export function formatPct(pct: number): string {
  const fixed = pct.toFixed(3)
  return fixed.startsWith('0') ? fixed.slice(1) : fixed
}

// ABOUTME: formatStat — a helper function.
/** Decimal like 24.7 → "24.7" with exactly one trailing digit. */
export function formatStat(value: number): string {
  return value.toFixed(1)
}

// ABOUTME: winPct — a helper function.
/** Win percentage like .823 from a (W, L) pair. */
export function winPct(wins: number, losses: number): string {
  if (wins + losses === 0) return '.000'
  return formatPct(wins / (wins + losses))
}

// ABOUTME: gamesBehind — a helper function.
/** Games behind leader, given the leader's record and the team's record. */
export function gamesBehind(
  leaderWins: number,
  leaderLosses: number,
  teamWins: number,
  teamLosses: number,
): string {
  const gb = (leaderWins - teamWins + (teamLosses - leaderLosses)) / 2
  if (gb <= 0) return '—'
  return gb.toFixed(1)
}

// ABOUTME: formatDate — a helper function.
/**
 * "Wed, May 23" — short month and weekday. Parses ISO date strings as
 * local dates (not UTC, which would shift early dates by a day in
 * western timezones).
 */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

// ABOUTME: formatLongDate — a helper function.
/** "May 23, 2026". */
export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
