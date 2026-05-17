export interface SuggestArgs {
  seeds: string[]
  history: string[]
  active: string[]
  query: string
  limit?: number
}

export function suggest({
  seeds,
  history,
  active,
  query,
  limit = 5,
}: SuggestArgs): string[] {
  const q = query.trim().toLowerCase()
  const activeSet = new Set(active.map((t) => t.toLowerCase()))

  const pool: string[] = []
  const seen = new Set<string>()

  // history first (newest entries take precedence over seeds)
  for (const text of history) {
    const k = text.toLowerCase()
    if (seen.has(k) || activeSet.has(k)) continue
    seen.add(k)
    pool.push(text)
  }

  for (const text of seeds) {
    const k = text.toLowerCase()
    if (seen.has(k) || activeSet.has(k)) continue
    seen.add(k)
    pool.push(text)
  }

  const matched = q
    ? pool.filter((text) => text.toLowerCase().includes(q))
    : pool

  return matched.slice(0, limit)
}
