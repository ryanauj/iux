export const THEMES = [
  { id: 'default', name: 'Default dark' },
  { id: 'light', name: 'Light' },
  { id: 'terminal', name: 'Terminal' },
] as const

export type ThemeId = (typeof THEMES)[number]['id']

export const DEFAULT_THEME: ThemeId = 'default'

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && THEMES.some((t) => t.id === value)
}

export const GLOBAL_THEME_KEY = 'iux.theme'

export function demoThemeKey(demoId: string): string {
  return `iux.demo.${demoId}.theme`
}

export function readGlobalTheme(): ThemeId {
  try {
    const raw = localStorage.getItem(GLOBAL_THEME_KEY)
    if (isThemeId(raw)) return raw
  } catch {
    // ignore (SSR, disabled storage)
  }
  return DEFAULT_THEME
}

export function readDemoTheme(demoId: string): ThemeId | null {
  try {
    const raw = localStorage.getItem(demoThemeKey(demoId))
    if (isThemeId(raw)) return raw
  } catch {
    // ignore
  }
  return null
}
