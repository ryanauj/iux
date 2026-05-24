import { useEffect, useState } from 'react'

type Listener = (value: string) => void

/**
 * In-memory subscribers keyed by storage key. Lets multiple React tree
 * instances (e.g. a floating picker mounted on both the showcase and an
 * app shell) stay in sync within the same tab without round-tripping
 * through the storage event, which only fires across tabs.
 */
const listeners = new Map<string, Set<Listener>>()

function notify(key: string, value: string) {
  listeners.get(key)?.forEach(l => l(value))
}

/**
 * localStorage-backed React state with cross-instance sync. Returns the
 * current value and a setter that persists and broadcasts the change.
 * `validate` is used both to filter localStorage reads and to ignore
 * notifications that don't parse — keeps the value strictly typed.
 */
export function usePersistedPref<T extends string>(
  key: string,
  defaultValue: T,
  validate: (raw: string) => raw is T,
): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null && validate(raw)) return raw
    } catch {
      /* ignore */
    }
    return defaultValue
  })

  useEffect(() => {
    const listener: Listener = raw => {
      if (validate(raw)) setValue(raw)
    }
    let bucket = listeners.get(key)
    if (!bucket) {
      bucket = new Set()
      listeners.set(key, bucket)
    }
    bucket.add(listener)
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) listener(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => {
      bucket!.delete(listener)
      window.removeEventListener('storage', onStorage)
    }
    // `validate` is treated as stable; callers should pass a module-level
    // guard rather than redefining it every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const set = (next: T) => {
    setValue(next)
    try {
      localStorage.setItem(key, next)
    } catch {
      /* ignore */
    }
    notify(key, next)
  }

  return [value, set]
}
