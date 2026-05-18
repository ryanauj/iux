import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  DEFAULT_THEME,
  GLOBAL_THEME_KEY,
  THEMES,
  demoThemeKey,
  isThemeId,
  readDemoTheme,
  readGlobalTheme,
} from '../src/lib/theme/themes'

class MemoryStorage {
  private store = new Map<string, string>()
  getItem(key: string) {
    return this.store.has(key) ? (this.store.get(key) as string) : null
  }
  setItem(key: string, value: string) {
    this.store.set(key, String(value))
  }
  removeItem(key: string) {
    this.store.delete(key)
  }
  clear() {
    this.store.clear()
  }
  key(i: number) {
    return Array.from(this.store.keys())[i] ?? null
  }
  get length() {
    return this.store.size
  }
}

beforeEach(() => {
  ;(globalThis as { localStorage?: Storage }).localStorage = new MemoryStorage()
})

afterEach(() => {
  delete (globalThis as { localStorage?: Storage }).localStorage
})

describe('theme registry', () => {
  it('exposes the three named themes', () => {
    expect(THEMES.map((t) => t.id)).toEqual(['default', 'light', 'terminal'])
  })

  it('isThemeId narrows known ids', () => {
    expect(isThemeId('default')).toBe(true)
    expect(isThemeId('light')).toBe(true)
    expect(isThemeId('terminal')).toBe(true)
    expect(isThemeId('nope')).toBe(false)
    expect(isThemeId(null)).toBe(false)
    expect(isThemeId(undefined)).toBe(false)
  })

  it('demoThemeKey namespaces per demo id', () => {
    expect(demoThemeKey('todo')).toBe('iux.demo.todo.theme')
    expect(demoThemeKey('components')).toBe('iux.demo.components.theme')
  })
})

describe('theme storage helpers', () => {
  it('readGlobalTheme falls back to default when unset', () => {
    expect(readGlobalTheme()).toBe(DEFAULT_THEME)
  })

  it('readGlobalTheme returns the saved theme when valid', () => {
    localStorage.setItem(GLOBAL_THEME_KEY, 'light')
    expect(readGlobalTheme()).toBe('light')
  })

  it('readGlobalTheme ignores garbage values', () => {
    localStorage.setItem(GLOBAL_THEME_KEY, 'not-a-theme')
    expect(readGlobalTheme()).toBe(DEFAULT_THEME)
  })

  it('readDemoTheme returns null when no override stored', () => {
    expect(readDemoTheme('todo')).toBeNull()
  })

  it('readDemoTheme returns the saved override when valid', () => {
    localStorage.setItem(demoThemeKey('todo'), 'terminal')
    expect(readDemoTheme('todo')).toBe('terminal')
  })

  it('readDemoTheme returns null for invalid stored values', () => {
    localStorage.setItem(demoThemeKey('todo'), 'bogus')
    expect(readDemoTheme('todo')).toBeNull()
  })
})

describe('demo registry', () => {
  it('registers components, styles, and todo demos', async () => {
    const { DEMOS } = await import('../src/demos')
    const ids = DEMOS.map((d) => d.id)
    expect(ids).toContain('components')
    expect(ids).toContain('styles')
    expect(ids).toContain('todo')
  })

  it('components and styles demos have no MSW controls', async () => {
    const { DEMOS } = await import('../src/demos')
    const components = DEMOS.find((d) => d.id === 'components')
    const styles = DEMOS.find((d) => d.id === 'styles')
    expect(components?.controls).toBeUndefined()
    expect(styles?.controls).toBeUndefined()
  })

  it('todo demo still has persist/reset controls', async () => {
    const { DEMOS } = await import('../src/demos')
    const todo = DEMOS.find((d) => d.id === 'todo')
    expect(todo?.controls).toBeDefined()
    expect(typeof todo?.controls?.getPersisted).toBe('function')
    expect(typeof todo?.controls?.setPersisted).toBe('function')
    expect(typeof todo?.controls?.reset).toBe('function')
  })
})
