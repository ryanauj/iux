import { describe, it, expect } from 'vitest'
import { isPickableColor, toPickerHex, applyPickedHex } from './color'

describe('isPickableColor', () => {
  it('accepts hex colors', () => {
    expect(isPickableColor('#fff')).toBe(true)
    expect(isPickableColor('#ffffff')).toBe(true)
    expect(isPickableColor('#ffffff80')).toBe(true)
    expect(isPickableColor('#abcd')).toBe(true)
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
    expect(toPickerHex('#1a2b3c')).toBe('#1a2b3c')
  })

  it('expands shorthand hex', () => {
    expect(toPickerHex('#abc')).toBe('#aabbcc')
  })

  it('drops the alpha channel from hex', () => {
    expect(toPickerHex('#11223344')).toBe('#112233')
  })

  it('converts rgb to hex', () => {
    expect(toPickerHex('rgb(255, 0, 128)')).toBe('#ff0080')
  })

  it('converts rgba to hex, ignoring alpha', () => {
    expect(toPickerHex('rgba(255, 0, 128, 0.5)')).toBe('#ff0080')
  })

  it('returns null for unsupported values', () => {
    expect(toPickerHex('hsl(0, 0%, 0%)')).toBeNull()
  })
})

describe('applyPickedHex', () => {
  it('keeps a plain hex value as hex', () => {
    expect(applyPickedHex('#000000', '#ff8800')).toBe('#ff8800')
  })

  it('preserves an rgb format', () => {
    expect(applyPickedHex('rgb(0, 0, 0)', '#ff8800')).toBe('rgb(255, 136, 0)')
  })

  it('preserves rgba format and its alpha channel', () => {
    expect(applyPickedHex('rgba(0, 0, 0, 0.25)', '#ff8800')).toBe('rgba(255, 136, 0, 0.25)')
  })

  it('defaults rgba alpha to 1 when the original alpha is missing', () => {
    expect(applyPickedHex('rgba(0, 0, 0)', '#ff8800')).toBe('rgba(255, 136, 0, 1)')
  })

  it('preserves an alpha channel on hex values', () => {
    expect(applyPickedHex('#00000080', '#ff8800')).toBe('#ff880080')
  })
})
