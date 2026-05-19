import { useEffect, useState } from 'react'
import { useStore } from './StoreContext'

/**
 * Subscribe to a single `Store` key. The state is `null` until the first
 * `get` resolves, then updates on every `set`/`delete` for that key.
 *
 * Returns a `[value, setValue]` pair where `setValue` writes through the
 * store and resolves once the backend confirms.
 */
export function useStoreValue<T>(key: string, fallback: T | null = null) {
  const store = useStore()
  const [value, setValue] = useState<T | null>(fallback)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    let cancelled = false
    void store.get<T>(key).then(v => {
      if (cancelled) return
      setValue(v ?? fallback)
      setLoaded(true)
    })
    const unsubscribe = store.subscribe<T>(key, next => {
      if (cancelled) return
      setValue(next ?? fallback)
    })
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [store, key, fallback])

  const write = (next: T): Promise<void> => store.set<T>(key, next)
  const remove = (): Promise<void> => store.delete(key)

  return { value, setValue: write, remove, loaded } as const
}
