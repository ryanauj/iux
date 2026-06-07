// ABOUTME: Money formatting helpers shared across the Cap School pages.

/**
 * Money formatting helpers shared across the Cap School pages. The app
 * deals almost entirely in salary figures, so a compact "$154.6M" reading
 * is the default; the long form is available for tables where precision
 * matters.
 */

/** Compact millions form: 154_647_000 → "$154.6M". */
// ABOUTME: money — a helper function.
export function money(n: number): string {
  const millions = n / 1_000_000
  // Always one decimal so every figure reads at the same precision
  // ($30.0M alongside $154.6M) and columns line up.
  return `$${millions.toFixed(1)}M`
}

// ABOUTME: moneyFull — a helper function.
/** Full grouped form: 154_647_000 → "$154,647,000". */
export function moneyFull(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`
}

// ABOUTME: moneySigned — a helper function.
/** Signed compact form for deltas: 14_059_000 → "+$14.1M". */
export function moneySigned(n: number): string {
  const sign = n >= 0 ? '+' : '−'
  return `${sign}${money(Math.abs(n))}`
}

// ABOUTME: pct — a helper function.
/** 0.25 → "25%". */
export function pct(fraction: number, digits = 0): string {
  return `${(fraction * 100).toFixed(digits)}%`
}

// ABOUTME: rate — a helper function.
/** Dollar-per-dollar tax rate: 1.5 → "$1.50". */
export function rate(n: number): string {
  return `$${n.toFixed(2)}`
}
