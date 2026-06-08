// ABOUTME: URL codec for shareable palette links — encodes built-in ids as bare strings and custom patterns as base64url JSON payloads.

import type { PaletteId } from '../../palettes'
import {
  isBuiltInPaletteId,
  isPlainObject,
  type CustomPattern,
  type TokenOverrides,
} from './customPatterns'

// ABOUTME: The decoded payload of a shared custom pattern (everything but its id).
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

// ABOUTME: The result of decoding a `?palette=` URL token: a built-in id, a shared custom pattern payload, or null for malformed input.
export type DecodeResult =
  | { kind: 'builtin'; id: PaletteId }
  | { kind: 'custom'; share: SharedPattern }
  | null

// ABOUTME: Encodes a UTF-8 string to URL-safe base64 (RFC 4648 §5) by converting + to -, / to _, and stripping trailing = padding; used by encodePattern for custom palette payloads.
function base64UrlEncode(input: string): string {
  const b64 = btoa(unescape(encodeURIComponent(input)))
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

// ABOUTME: Reverses base64UrlEncode: restores standard base64 characters then decodes via atob and decodeURIComponent; used by decodePattern to recover the JSON payload.
function base64UrlDecode(token: string): string {
  const b64 = token.replace(/-/g, '+').replace(/_/g, '/')
  return decodeURIComponent(escape(atob(b64)))
}

// ABOUTME: Encode a built-in id (bare) or a custom pattern (base64url payload).
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

// ABOUTME: Decode a `?palette=` token into a built-in id or a shared custom pattern.
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
