import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  DEFAULT_THEME,
  GLOBAL_THEME_KEY,
  type ThemeId,
  isThemeId,
  readGlobalTheme,
} from './themes'

interface ThemeContextValue {
  globalTheme: ThemeId
  setGlobalTheme: (id: ThemeId) => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  globalTheme: DEFAULT_THEME,
  setGlobalTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [globalTheme, setGlobalThemeState] = useState<ThemeId>(() => readGlobalTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = globalTheme
    try {
      localStorage.setItem(GLOBAL_THEME_KEY, globalTheme)
    } catch {
      // ignore
    }
  }, [globalTheme])

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === GLOBAL_THEME_KEY && isThemeId(e.newValue)) {
        setGlobalThemeState(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setGlobalTheme = useCallback((id: ThemeId) => {
    setGlobalThemeState(id)
  }, [])

  const value = useMemo(
    () => ({ globalTheme, setGlobalTheme }),
    [globalTheme, setGlobalTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
