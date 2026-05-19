import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react'
import {
  createStore,
  MemoryStore,
  SwitchableStore,
  type Store,
  type StoreMode,
} from '../../storage/store.contract'

/**
 * The contract's "mode is data" key. Apps see this as a regular key; only
 * the Settings playground reads/writes it and triggers a `swap`. Every
 * other consumer sees a stable `Store` reference for the life of the page.
 */
export const STORE_MODE_KEY = 'store:mode'

/**
 * Module-level fallback. Components that read state through `useStore()`
 * but render outside a `<StoreProvider>` (e.g. component-gallery stories)
 * still get a working store; it just lives in process memory.
 *
 * This is *not* the same instance the provider uses — production app code
 * passes through context. The fallback exists so component reuse outside
 * the shell doesn't crash.
 */
let fallback: SwitchableStore | null = null
function getFallbackStore(): SwitchableStore {
  if (!fallback) fallback = new SwitchableStore(new MemoryStore())
  return fallback
}

const StoreContext = createContext<SwitchableStore | null>(null)

interface StoreProviderProps {
  children: ReactNode
  /** Override the initial mode; defaults to "follow persisted state, else memory". */
  initialMode?: StoreMode
}

/**
 * Single `SwitchableStore` for the page. Reads the persisted mode through
 * the contract (no direct `localStorage`) and seeds the backend before
 * children mount.
 */
export function StoreProvider({ children, initialMode }: StoreProviderProps) {
  const store = useMemo(() => new SwitchableStore(new MemoryStore()), [])
  const initRef = useRef<boolean>(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    let cancelled = false
    async function init() {
      const candidate = createStore('local')
      const persisted = await candidate.get<StoreMode>(STORE_MODE_KEY)
      const mode: StoreMode =
        initialMode ?? (persisted === 'local' || persisted === 'memory' ? persisted : 'memory')
      // Only swap if the desired backend differs from the default memory.
      if (mode === 'memory') return
      const next = mode === 'local' ? candidate : createStore(mode)
      if (cancelled) return
      await store.swap(next, { migrate: false })
    }
    void init()
    return () => {
      cancelled = true
    }
  }, [store, initialMode])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

/**
 * Read the ambient `Store`. Returns the provider's store when mounted
 * inside `<StoreProvider>`; otherwise returns a module-singleton memory
 * store so off-shell usage (stories, tests) still works.
 */
export function useStore(): Store {
  const ctx = useContext(StoreContext)
  return ctx ?? getFallbackStore()
}

/**
 * Privileged accessor that returns the underlying `SwitchableStore`.
 * Only the Settings playground should call this — it's the one surface
 * allowed to `swap` the backend (see `PERSISTENCE-CONTRACT.md`).
 */
export function useSwitchableStore(): SwitchableStore {
  const ctx = useContext(StoreContext)
  return ctx ?? getFallbackStore()
}
