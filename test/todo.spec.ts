import { describe, expect, it } from 'vitest'
import { suggest } from '../src/demos/todo/suggestions'
import { pushHistory } from '../src/demos/todo/store'
import { SUGGESTION_SEEDS } from '../src/demos/todo/seed'

describe('suggest()', () => {
  it('returns seeds when query is empty', () => {
    const out = suggest({
      seeds: ['Buy milk', 'Walk the dog'],
      history: [],
      active: [],
      query: '',
    })
    expect(out).toEqual(['Buy milk', 'Walk the dog'])
  })

  it('puts history entries before seeds', () => {
    const out = suggest({
      seeds: ['Buy milk', 'Walk the dog'],
      history: ['Call mom'],
      active: [],
      query: '',
    })
    expect(out[0]).toBe('Call mom')
  })

  it('matches case-insensitively against the query', () => {
    const out = suggest({
      seeds: ['Buy milk', 'Walk the dog', 'Pay bills'],
      history: [],
      active: [],
      query: 'BUY',
    })
    expect(out).toEqual(['Buy milk'])
  })

  it('excludes items already on the active list', () => {
    const out = suggest({
      seeds: ['Buy milk', 'Walk the dog'],
      history: [],
      active: ['buy milk'],
      query: '',
    })
    expect(out).toEqual(['Walk the dog'])
  })

  it('de-duplicates between history and seeds', () => {
    const out = suggest({
      seeds: ['Buy milk'],
      history: ['buy milk'],
      active: [],
      query: '',
    })
    expect(out).toEqual(['buy milk'])
  })

  it('honours the limit', () => {
    const out = suggest({
      seeds: ['a', 'b', 'c', 'd', 'e', 'f'],
      history: [],
      active: [],
      query: '',
      limit: 3,
    })
    expect(out).toHaveLength(3)
  })

  it('uses the real seed catalog for a sane default response', () => {
    const out = suggest({
      seeds: SUGGESTION_SEEDS,
      history: [],
      active: [],
      query: '',
    })
    expect(out.length).toBeGreaterThan(0)
    expect(out.length).toBeLessThanOrEqual(5)
  })
})

describe('pushHistory()', () => {
  it('prepends new entries', () => {
    expect(pushHistory(['a', 'b'], 'c')).toEqual(['c', 'a', 'b'])
  })

  it('moves an existing entry to the front instead of duplicating', () => {
    expect(pushHistory(['a', 'b', 'c'], 'b')).toEqual(['b', 'a', 'c'])
  })

  it('matches case-insensitively when deduping', () => {
    expect(pushHistory(['Buy milk'], 'buy milk')).toEqual(['buy milk'])
  })

  it('caps history at 50 entries', () => {
    const long = Array.from({ length: 60 }, (_, i) => `item-${i}`)
    const next = pushHistory(long, 'new')
    expect(next).toHaveLength(50)
    expect(next[0]).toBe('new')
  })
})

describe('demo registry', () => {
  it('has at least one demo with required metadata', async () => {
    const { DEMOS } = await import('../src/demos')
    expect(DEMOS.length).toBeGreaterThan(0)
    for (const demo of DEMOS) {
      expect(demo.id).toBeTruthy()
      expect(demo.name).toBeTruthy()
      expect(demo.blurb.length).toBeGreaterThanOrEqual(20)
      expect(demo.features.length).toBeGreaterThan(0)
    }
  })

  it('demo ids are unique', async () => {
    const { DEMOS } = await import('../src/demos')
    const ids = DEMOS.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
