import { describe, expect, it } from 'vitest'
import { CATALOG } from '../src/catalog'

const COMPONENT_KINDS = new Set(['button', 'card', 'input', 'chip', 'row'])

describe('catalog', () => {
  it('every section is non-empty', () => {
    expect(CATALOG.themes.length).toBeGreaterThan(0)
    expect(CATALOG.components.length).toBeGreaterThan(0)
    expect(CATALOG.layouts.length).toBeGreaterThan(0)
  })

  it('ids are unique within their section', () => {
    for (const section of ['themes', 'components', 'layouts'] as const) {
      const ids = CATALOG[section].map((e) => e.id)
      expect(new Set(ids).size, `${section} duplicate ids`).toBe(ids.length)
    }
  })

  it('every usage_notes is real prose', () => {
    const all = [
      ...CATALOG.themes,
      ...CATALOG.components,
      ...CATALOG.layouts,
    ]
    for (const entry of all) {
      expect(entry.usage_notes, `${entry.id} usage_notes`).toBeTruthy()
      expect(
        entry.usage_notes.trim().length,
        `${entry.id} usage_notes too short`,
      ).toBeGreaterThanOrEqual(20)
    }
  })

  it('every component and layout has a non-empty snippet', () => {
    for (const entry of CATALOG.components) {
      expect(entry.snippet.trim(), `${entry.id} snippet`).toBeTruthy()
    }
    for (const entry of CATALOG.layouts) {
      expect(entry.snippet.trim(), `${entry.id} snippet`).toBeTruthy()
    }
  })

  it('every theme has at least one variable', () => {
    for (const theme of CATALOG.themes) {
      expect(
        Object.keys(theme.variables).length,
        `${theme.id} variables`,
      ).toBeGreaterThan(0)
    }
  })

  it('every component kind is in the allowed set', () => {
    for (const entry of CATALOG.components) {
      expect(
        COMPONENT_KINDS.has(entry.kind),
        `${entry.id} kind=${entry.kind}`,
      ).toBe(true)
    }
  })
})
