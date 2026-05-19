import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteRoot } from '../theme/PaletteRoot'
import { useStore } from './StoreContext'

export const THEME_ACTIVE_KEY = 'theme:active'

const DEFAULT_PALETTE: PaletteId = 'flat-classic'

interface ThemeContextValue {
  paletteId: PaletteId
  setPaletteId: (next: PaletteId) => Promise<void>
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: ReactNode
  /** Optional className forwarded to the root palette element. */
  className?: string
  /** Disable the outer PaletteRoot wrap (for views that mount many palettes themselves). */
  bare?: boolean
}

export function ThemeProvider({ children, className, bare = false }: ThemeProviderProps) {
  const store = useStore()
  const [paletteId, setPaletteIdState] = useState<PaletteId>(DEFAULT_PALETTE)

  useEffect(() => {
    let cancelled = false
    void store.get<PaletteId>(THEME_ACTIVE_KEY).then(v => {
      if (cancelled) return
      if (v && v in palettes) setPaletteIdState(v)
    })
    const unsubscribe = store.subscribe<PaletteId>(THEME_ACTIVE_KEY, next => {
      if (cancelled) return
      if (next && next in palettes) setPaletteIdState(next)
    })
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [store])

  const setPaletteId = async (next: PaletteId): Promise<void> => {
    await store.set<PaletteId>(THEME_ACTIVE_KEY, next)
  }

  const ctx: ThemeContextValue = { paletteId, setPaletteId }
  const palette = palettes[paletteId]

  const content = bare ? children : (
    <PaletteRoot palette={palette} className={className} as="section">
      {children}
    </PaletteRoot>
  )

  return <ThemeContext.Provider value={ctx}>{content}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    return {
      paletteId: DEFAULT_PALETTE,
      setPaletteId: async () => {
        /* no-op outside provider */
      },
    }
  }
  return ctx
}
