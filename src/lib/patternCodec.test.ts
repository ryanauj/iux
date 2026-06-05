import { describe, it, expect } from 'vitest'
import { encodePattern, decodePattern } from './patternCodec'
import type { SharedPattern } from './patternCodec'

describe('encodePattern / decodePattern', () => {
  it('encodes a built-in id as its bare id', () => {
    expect(encodePattern('material')).toBe('material')
  })

  it('decodes a bare built-in id', () => {
    expect(decodePattern('material')).toEqual({ kind: 'builtin', id: 'material' })
  })

  it('round-trips a custom pattern', () => {
    const share: SharedPattern = {
      base: 'material',
      name: 'Midnight',
      overrides: { color: { surface: { base: 'rgb(0,0,0)' } }, radius: { md: '12px' } },
    }
    const token = encodePattern(share)
    expect(token).not.toContain('+')
    expect(token).not.toContain('/')
    expect(token).not.toContain('=')

    const decoded = decodePattern(token)
    expect(decoded).toEqual({ kind: 'custom', share })
  })

  it('round-trips non-ASCII names', () => {
    const share: SharedPattern = {
      base: 'vaporwave',
      name: 'Café — 夜 🌙',
      overrides: {},
    }
    const decoded = decodePattern(encodePattern(share))
    expect(decoded?.kind).toBe('custom')
    if (decoded?.kind === 'custom') expect(decoded.share.name).toBe('Café — 夜 🌙')
  })

  it('returns null for malformed tokens without throwing', () => {
    expect(decodePattern('')).toBeNull()
    expect(decodePattern('!!!not-base64!!!')).toBeNull()
    // valid base64 of JSON that is not a pattern shape
    expect(decodePattern(btoa('{"hello":"world"}'))).toBeNull()
  })

  it('rejects a custom payload whose base is not a real palette', () => {
    const token = encodePattern({
      base: 'not-a-palette' as SharedPattern['base'],
      name: 'X',
      overrides: {},
    })
    expect(decodePattern(token)).toBeNull()
  })
})
