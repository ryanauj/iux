// ABOUTME: patternCodec — part of the lib area.

import type { PaletteId } from '../../palettes'
import {
  isBuiltInPaletteId,
  isPlainObject,
  type CustomPattern,
  type TokenOverrides,
} from './customPatterns'

// ABOUTME: SharedPattern — an interface.
/**
 * URL encoding for shareable styles.
 *
 * A built-in palette encodes to its bare id (so existing `?palette=material`
 * links keep working). A custom pattern encodes to URL-safe base64 of the
 * `{ base, name, overrides }` payload — compact because overrides are sparse,
 * and self-describing so a recipient can reconstruct the pattern with no
 * server. No compression dependency: `btoa` over UTF-8-escaped JSON.
 */

/** The decoded payload of a shared custom pattern (everything but its id). */
export interface SharedPattern {
  base: PaletteId
  name: string
  overrides: TokenOverrides
}

// ABOUTME: DecodeResult — a type alias.
export type DecodeResult =
  | { kind: 'builtin'; id: PaletteId }
  | { kind: 'custom'; share: SharedPattern }
  | null

function base64UrlEncode(input: string): string {
  const b64 = btoa(unescape(encodeURIComponent(input)))
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64UrlDecode(token: string): string {
  const b64 = token.replace(/-/g, '+').replace(/_/g, '/')
  return decodeURIComponent(escape(atob(b64)))
}

// ABOUTME: encodePattern — a helper function.
/** Encode a built-in id (bare) or a custom pattern (base64url payload). */
export function encodePattern(
  pattern: PaletteId | CustomPattern | SharedPattern,
): string {
  if (typeof pattern === 'string') return pattern
  const payload = JSON.stringify({
    base: pattern.base,
    name: pattern.name,
    overrides: pattern.overrides,
  })
  return base64UrlEncode(payload)
}

// ABOUTME: decodePattern — a helper function.
/**
 * Decode a `?palette=` token into a built-in id or a shared custom pattern.
 * Returns `null` for anything malformed — never throws.
 */
export function decodePattern(token: string): DecodeResult {
  if (!token) return null
  if (isBuiltInPaletteId(token)) return { kind: 'builtin', id: token }
  try {
    const parsed = JSON.parse(base64UrlDecode(token))
    if (!isPlainObject(parsed)) return null
    const { base, name, overrides } = parsed
    if (
      typeof base === 'string' &&
      isBuiltInPaletteId(base) &&
      typeof name === 'string' &&
      isPlainObject(overrides)
    ) {
      return { kind: 'custom', share: { base, name, overrides: overrides as TokenOverrides } }
    }
  } catch {
    /* ignore */
  }
  return null
}
