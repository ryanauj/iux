import { describe, it, expect } from 'vitest'
import { palettes } from '../../palettes'
import { validateTokens } from '../../scripts/validate-palettes'
import {
  baseOf,
  buildWorkingPalette,
  deepMerge,
  deleteAtPath,
  getAtPath,
  isCustomPatternId,
  resolveStyle,
  setAtPath,
  slugify,
  uniqueCustomId,
  type CustomPattern,
  type CustomPatternMap,
  type TokenOverrides,
} from './customPatterns'

describe('isCustomPatternId', () => {
  it('recognizes the custom namespace', () => {
    expect(isCustomPatternId('custom:my-thing')).toBe(true)
    expect(isCustomPatternId('material')).toBe(false)
    expect(isCustomPatternId('custom:')).toBe(false)
  })
})

describe('deepMerge', () => {
  it('overrides a single leaf and leaves siblings intact', () => {
    const merged = deepMerge(palettes.material.tokens, {
      color: { surface: { base: 'rgb(0,0,0)' } },
    })
    expect(merged.color.surface.base).toBe('rgb(0,0,0)')
    expect(merged.color.surface.raised).toBe(palettes.material.tokens.color.surface.raised)
    expect(merged.radius.md).toBe(palettes.material.tokens.radius.md)
  })

  it('merges a nested intent without dropping its other fields', () => {
    const merged = deepMerge(palettes.material.tokens, {
      color: { intent: { primary: { bg: 'rgb(18,52,86)' } } },
    })
    expect(merged.color.intent.primary.bg).toBe('rgb(18,52,86)')
    expect(merged.color.intent.primary.content).toBe(
      palettes.material.tokens.color.intent.primary.content,
    )
    expect(merged.color.intent.success.bg).toBe(
      palettes.material.tokens.color.intent.success.bg,
    )
  })

  it('does not mutate the base', () => {
    const before = palettes.material.tokens.color.surface.base
    deepMerge(palettes.material.tokens, { color: { surface: { base: 'rgba(255,255,255,0)' } } })
    expect(palettes.material.tokens.color.surface.base).toBe(before)
  })

  it('reconstructs tokens that still satisfy the contract', () => {
    const merged = deepMerge(palettes.material.tokens, {
      color: { surface: { base: 'rgb(1,2,3)' } },
      radius: { md: '12px' },
    })
    expect(validateTokens(merged)).toEqual([])
  })
})

describe('path helpers', () => {
  it('reads a dotted path', () => {
    expect(getAtPath(palettes.material.tokens, 'color.surface.base')).toBe(
      palettes.material.tokens.color.surface.base,
    )
    expect(getAtPath(palettes.material.tokens, 'no.such.path')).toBeUndefined()
  })

  it('sets a dotted path immutably, creating intermediates', () => {
    const src: TokenOverrides = {}
    const out = setAtPath(src, 'color.surface.base', 'black')
    expect(out).toEqual({ color: { surface: { base: 'black' } } })
    expect(src).toEqual({})
  })

  it('deletes a dotted path and prunes emptied parents', () => {
    const out = deleteAtPath(
      { color: { surface: { base: 'black' } } } as TokenOverrides,
      'color.surface.base',
    )
    expect(out).toEqual({})
  })

  it('keeps siblings when deleting one leaf', () => {
    const out = deleteAtPath(
      { color: { surface: { base: 'black', raised: 'white' } } } as TokenOverrides,
      'color.surface.base',
    )
    expect(out).toEqual({ color: { surface: { raised: 'white' } } })
  })
})

describe('resolveStyle', () => {
  const custom: CustomPattern = {
    id: 'custom:midnight',
    name: 'Midnight',
    base: 'material',
    overrides: { color: { surface: { base: 'rgb(0,0,0)' } } },
  }
  const map: CustomPatternMap = { [custom.id]: custom }

  it('returns the exact built-in palette object for a built-in id', () => {
    expect(resolveStyle('material', map)).toBe(palettes.material)
  })

  it('reconstructs a custom pattern by merging overrides onto the base', () => {
    const resolved = resolveStyle('custom:midnight', map)
    expect(resolved.name).toBe('Midnight')
    expect(resolved.tokens.color.surface.base).toBe('rgb(0,0,0)')
    expect(resolved.tokens.color.surface.raised).toBe(
      palettes.material.tokens.color.surface.raised,
    )
  })

  it('keeps the base id as a prefix so engine CSS still matches', () => {
    const resolved = resolveStyle('custom:midnight', map)
    expect(resolved.id.startsWith('material')).toBe(true)
    expect(resolved.engine).toBe('material')
  })

  it('falls back to a real palette for an unknown id', () => {
    const resolved = resolveStyle('custom:does-not-exist', map)
    expect(resolved).toBeDefined()
    expect(resolved.tokens).toBeDefined()
  })
})

describe('baseOf', () => {
  const map: CustomPatternMap = {
    'custom:x': { id: 'custom:x', name: 'X', base: 'vaporwave', overrides: {} },
  }
  it('returns built-in ids unchanged', () => {
    expect(baseOf('material', map)).toBe('material')
  })
  it('returns the clone base for a custom id', () => {
    expect(baseOf('custom:x', map)).toBe('vaporwave')
  })
})

describe('id generation', () => {
  it('slugifies names', () => {
    expect(slugify('My Cool Pattern!')).toBe('my-cool-pattern')
    expect(slugify('   ')).toBe('pattern')
  })

  it('suffixes to stay unique', () => {
    const existing: CustomPatternMap = {
      'custom:dusk': { id: 'custom:dusk', name: 'Dusk', base: 'material', overrides: {} },
    }
    expect(uniqueCustomId('Dusk', existing)).toBe('custom:dusk-2')
    expect(uniqueCustomId('Fresh', existing)).toBe('custom:fresh')
  })
})

describe('buildWorkingPalette', () => {
  it('falls back to the base name when name is blank', () => {
    const p = buildWorkingPalette('material', 'Material', {})
    expect(p.name).toBe('Material')
    expect(p.tokens).toEqual(palettes.material.tokens)
  })
})
