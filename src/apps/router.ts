// ABOUTME: Hash-based client-side router: parses window.location.hash into a HashLocation, and provides navigate/replaceParams to update it while preserving sticky user-preference params.

import { useEffect, useState } from 'react'

// ABOUTME: Parsed representation of a hash URL: the path component and a URLSearchParams for the query string following `?`.
export interface HashLocation {
  /** The path portion of the hash, always leading with `/` (e.g. `/apps/sports/teams`). Empty string when no hash. */
  path: string
  /** Parsed query string that follows `?` inside the hash. */
  params: URLSearchParams
}

// ABOUTME: Parses a raw hash string (e.g. `#/apps/sports?palette=bold`) into a HashLocation with a normalised path and a URLSearchParams; returns an empty location for a blank or bare `#`.
function parseHash(raw: string): HashLocation {
  if (!raw || raw === '#') return { path: '', params: new URLSearchParams() }
  const stripped = raw.startsWith('#') ? raw.slice(1) : raw
  const qIdx = stripped.indexOf('?')
  const path = qIdx === -1 ? stripped : stripped.slice(0, qIdx)
  const query = qIdx === -1 ? '' : stripped.slice(qIdx + 1)
  const normalized = path && !path.startsWith('/') ? `/${path}` : path
  return { path: normalized, params: new URLSearchParams(query) }
}

// ABOUTME: Reads and parses window.location.hash into a HashLocation; returns an empty path in non-browser environments.
export function readHash(): HashLocation {
  if (typeof window === 'undefined') return { path: '', params: new URLSearchParams() }
  return parseHash(window.location.hash)
}

// ABOUTME: React hook that returns the current HashLocation and re-renders on every hashchange event.
export function useHashLocation(): HashLocation {
  const [loc, setLoc] = useState<HashLocation>(() => readHash())
  useEffect(() => {
    const onHashChange = () => setLoc(readHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return loc
}

// ABOUTME: Builds a `#/path?key=value` string from a path and optional params map, omitting any undefined or empty values.
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
// ABOUTME: The set of URL query-param keys that survive every navigate() and replaceParams() call so user-preference settings (palette, layout, motion, etc.) are not lost when a Link updates the path.
const STICKY_PARAMS = ['layout', 'palette', 'motion', 'tabs', 'tri', 'bento', 'deck', 'graph'] as const

// ABOUTME: Read the current values of any sticky params from the URL hash.
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

// ABOUTME: Navigates to a new hash path, merging caller-supplied params over the current sticky params so palette/layout/motion survive navigation.
export function navigate(path: string, params?: Record<string, string | undefined>): void {
  if (typeof window === 'undefined') return
  // Caller-supplied params win; sticky params backfill the rest.
  const merged: Record<string, string | undefined> = { ...getStickyParams(), ...params }
  const next = buildHash(path, merged)
  if (window.location.hash !== next) {
    window.location.hash = next
  }
}

// ABOUTME: Replace just the query params on the current hash without touching the path.
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

// ABOUTME: Split a path into segments, dropping empties.
/** Split a path into segments, dropping empties. `/apps/sports/teams` → `['apps','sports','teams']`. */
export function pathSegments(path: string): string[] {
  return path.split('/').filter(Boolean)
}
