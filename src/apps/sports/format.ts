// ABOUTME: Formatting helpers for the sports app — converts raw numbers (stat values, win/loss records, heights, dates) to display strings in basketball convention.

// ABOUTME: Converts inches to feet-and-inches format, e.g. 79 → "6'7\"".
/** Converts a player height from inches to the "6'7\"" format basketball uses. */
export function formatHeight(inches: number): string {
  const feet = Math.floor(inches / 12)
  const remaining = inches % 12
  return `${feet}'${remaining}"`
}

// ABOUTME: Decimal share like 0.512 → ".512" — basketball convention drops the leading 0.
/** Decimal share like 0.512 → ".512" — basketball convention drops the leading 0. */
export function formatPct(pct: number): string {
  const fixed = pct.toFixed(3)
  return fixed.startsWith('0') ? fixed.slice(1) : fixed
}

// ABOUTME: Decimal like 24.7 → "24.7" with exactly one trailing digit.
/** Decimal like 24.7 → "24.7" with exactly one trailing digit. */
export function formatStat(value: number): string {
  return value.toFixed(1)
}

// ABOUTME: Win percentage like .823 from a (W, L) pair.
/** Win percentage like .823 from a (W, L) pair. */
export function winPct(wins: number, losses: number): string {
  if (wins + losses === 0) return '.000'
  return formatPct(wins / (wins + losses))
}

// ABOUTME: Games behind leader, given the leader's record and the team's record.
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

// ABOUTME: "Wed, May 23" — short month and weekday.
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

// ABOUTME: "May 23, 2026".
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
