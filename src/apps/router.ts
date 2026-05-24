import { useEffect, useState } from 'react'

export interface HashLocation {
  /** The path portion of the hash, always leading with `/` (e.g. `/apps/sports/teams`). Empty string when no hash. */
  path: string
  /** Parsed query string that follows `?` inside the hash. */
  params: URLSearchParams
}

function parseHash(raw: string): HashLocation {
  if (!raw || raw === '#') return { path: '', params: new URLSearchParams() }
  const stripped = raw.startsWith('#') ? raw.slice(1) : raw
  const qIdx = stripped.indexOf('?')
  const path = qIdx === -1 ? stripped : stripped.slice(0, qIdx)
  const query = qIdx === -1 ? '' : stripped.slice(qIdx + 1)
  const normalized = path && !path.startsWith('/') ? `/${path}` : path
  return { path: normalized, params: new URLSearchParams(query) }
}

export function readHash(): HashLocation {
  if (typeof window === 'undefined') return { path: '', params: new URLSearchParams() }
  return parseHash(window.location.hash)
}

export function useHashLocation(): HashLocation {
  const [loc, setLoc] = useState<HashLocation>(() => readHash())
  useEffect(() => {
    const onHashChange = () => setLoc(readHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return loc
}

export function buildHash(path: string, params?: Record<string, string | undefined>): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (!params) return `#${normalized}`
  const qp = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') qp.set(key, value)
  }
  const qs = qp.toString()
  return qs ? `#${normalized}?${qs}` : `#${normalized}`
}

/**
 * Hash query params whose value should survive navigation through
 * `Link`/`navigate()`. These represent user preferences (chosen layout,
 * palette, motion scale) that would otherwise be dropped every time a
 * Link rebuilds the hash with only its own params. Callers can still
 * clear a sticky key by passing it explicitly as `undefined`.
 */
const STICKY_PARAMS = ['layout', 'palette', 'motion'] as const

/** Read the current values of any sticky params from the URL hash. */
export function getStickyParams(): Record<string, string> {
  const current = readHash()
  const out: Record<string, string> = {}
  for (const key of STICKY_PARAMS) {
    const v = current.params.get(key)
    if (v) out[key] = v
  }
  return out
}

export function navigate(path: string, params?: Record<string, string | undefined>): void {
  if (typeof window === 'undefined') return
  // Caller-supplied params win; sticky params backfill the rest.
  const merged: Record<string, string | undefined> = { ...getStickyParams(), ...params }
  const next = buildHash(path, merged)
  if (window.location.hash !== next) {
    window.location.hash = next
  }
}

/**
 * Replace just the query params on the current hash without touching the
 * path. Used by in-app pickers (e.g. the palette picker) that want to
 * reflect a setting in the URL without pushing a new history entry.
 */
export function replaceParams(params: Record<string, string | undefined>): void {
  if (typeof window === 'undefined') return
  const current = readHash()
  // Caller-supplied params win; sticky params backfill the rest so updating
  // one picker (palette/layout/motion) doesn't strip its siblings.
  const merged: Record<string, string | undefined> = { ...getStickyParams(), ...params }
  const next = buildHash(current.path || '/', merged)
  if (window.location.hash !== next) {
    const url = `${window.location.pathname}${window.location.search}${next}`
    window.history.replaceState(window.history.state, '', url)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }
}

/** Split a path into segments, dropping empties. `/apps/sports/teams` → `['apps','sports','teams']`. */
export function pathSegments(path: string): string[] {
  return path.split('/').filter(Boolean)
}
