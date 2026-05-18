import { useCallback, useContext, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeProvider'
import {
  demoThemeKey,
  isThemeId,
  readDemoTheme,
  type ThemeId,
} from './themes'

export function useTheme() {
  return useContext(ThemeContext)
}

interface DemoThemeValue {
  override: ThemeId | null
  setOverride: (id: ThemeId | null) => void
  effective: ThemeId
}

export function useDemoTheme(demoId: string): DemoThemeValue {
  const { globalTheme } = useTheme()
  const [override, setOverrideState] = useState<ThemeId | null>(() => readDemoTheme(demoId))

  useEffect(() => {
    setOverrideState(readDemoTheme(demoId))
  }, [demoId])

  useEffect(() => {
    const key = demoThemeKey(demoId)
    function onStorage(e: StorageEvent) {
      if (e.key !== key) return
      if (e.newValue === null) setOverrideState(null)
      else if (isThemeId(e.newValue)) setOverrideState(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [demoId])

  const setOverride = useCallback(
    (id: ThemeId | null) => {
      setOverrideState(id)
      try {
        if (id === null) localStorage.removeItem(demoThemeKey(demoId))
        else localStorage.setItem(demoThemeKey(demoId), id)
      } catch {
        // ignore
      }
    },
    [demoId],
  )

  return {
    override,
    setOverride,
    effective: override ?? globalTheme,
  }
}
