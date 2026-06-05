import { describe, it, expect } from 'vitest'
import { palettes } from '../../palettes'
import { getAtPath } from '../lib/customPatterns'
import { KNOBS, KNOB_GROUPS, LENGTH_UNITS, FONT_FAMILY_OPTIONS } from './knobRegistry'

describe('knob registry', () => {
  it('every knob path resolves to a real token leaf', () => {
    for (const knob of KNOBS) {
      const value = getAtPath(palettes.material.tokens, knob.path)
      expect(value, knob.path).toBeDefined()
      expect(typeof value, knob.path).toBe('string')
    }
  })

  it('every knob group is a declared section', () => {
    for (const knob of KNOBS) {
      expect(KNOB_GROUPS).toContain(knob.group)
    }
  })

  it('select knobs ship options; font knobs target a family slot', () => {
    for (const knob of KNOBS) {
      if (knob.kind === 'select') expect(knob.options?.length).toBeGreaterThan(0)
      if (knob.kind === 'font') expect(knob.path.startsWith('typography.family.')).toBe(true)
    }
  })
})

describe('length units', () => {
  it('have a coherent range and a positive step', () => {
    for (const u of LENGTH_UNITS) {
      expect(u.min).toBeLessThanOrEqual(u.max)
      expect(u.step).toBeGreaterThan(0)
    }
  })

  it('includes a unitless option', () => {
    expect(LENGTH_UNITS.some(u => u.value === '')).toBe(true)
  })
})

describe('font family options', () => {
  it('are unique and non-empty', () => {
    const values = FONT_FAMILY_OPTIONS.map(o => o.value)
    expect(values.every(v => v.length > 0)).toBe(true)
    expect(new Set(values).size).toBe(values.length)
  })
})
