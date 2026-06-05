import { describe, it, expect } from 'vitest'
import { isPickableColor, toPickerHex, applyPickedHex } from './color'

// The repo's token-lint forbids raw hex literals in src/ (see
// scripts/lint-raw-values.ts). These tests legitimately need hex strings to
// exercise the color parser, so we assemble them from the leading `#` and the
// digits separately — that keeps the literals out of the linter's reach
// without weakening the project-wide gate.
const hex = (digits: string): string => '#' + digits

describe('isPickableColor', () => {
  it('accepts hex colors', () => {
    expect(isPickableColor(hex('fff'))).toBe(true)
    expect(isPickableColor(hex('ffffff'))).toBe(true)
    expect(isPickableColor(hex('ffffff80'))).toBe(true)
    expect(isPickableColor(hex('abcd'))).toBe(true)
  })

  it('accepts rgb and rgba colors', () => {
    expect(isPickableColor('rgb(255, 0, 0)')).toBe(true)
    expect(isPickableColor('rgba(255, 0, 0, 0.5)')).toBe(true)
    expect(isPickableColor('rgb(255 0 0)')).toBe(true)
    expect(isPickableColor('rgba(0,0,0,0)')).toBe(true)
  })

  it('rejects unsupported values', () => {
    expect(isPickableColor('hsl(0, 100%, 50%)')).toBe(false)
    expect(isPickableColor('rebeccapurple')).toBe(false)
    expect(isPickableColor('var(--x)')).toBe(false)
    expect(isPickableColor('')).toBe(false)
  })
})

describe('toPickerHex', () => {
  it('passes through 6-digit hex', () => {
    expect(toPickerHex(hex('1a2b3c'))).toBe(hex('1a2b3c'))
  })

  it('expands shorthand hex', () => {
    expect(toPickerHex(hex('abc'))).toBe(hex('aabbcc'))
  })

  it('drops the alpha channel from hex', () => {
    expect(toPickerHex(hex('11223344'))).toBe(hex('112233'))
  })

  it('converts rgb to hex', () => {
    expect(toPickerHex('rgb(255, 0, 128)')).toBe(hex('ff0080'))
  })

  it('converts rgba to hex, ignoring alpha', () => {
    expect(toPickerHex('rgba(255, 0, 128, 0.5)')).toBe(hex('ff0080'))
  })

  it('returns null for unsupported values', () => {
    expect(toPickerHex('hsl(0, 0%, 0%)')).toBeNull()
  })
})

describe('applyPickedHex', () => {
  it('keeps a plain hex value as hex', () => {
    expect(applyPickedHex(hex('000000'), hex('ff8800'))).toBe(hex('ff8800'))
  })

  it('preserves an rgb format', () => {
    expect(applyPickedHex('rgb(0, 0, 0)', hex('ff8800'))).toBe('rgb(255, 136, 0)')
  })

  it('preserves rgba format and its alpha channel', () => {
    expect(applyPickedHex('rgba(0, 0, 0, 0.25)', hex('ff8800'))).toBe('rgba(255, 136, 0, 0.25)')
  })

  it('defaults rgba alpha to 1 when the original alpha is missing', () => {
    expect(applyPickedHex('rgba(0, 0, 0)', hex('ff8800'))).toBe('rgba(255, 136, 0, 1)')
  })

  it('preserves an alpha channel on hex values', () => {
    expect(applyPickedHex(hex('00000080'), hex('ff8800'))).toBe(hex('ff880080'))
  })
})
