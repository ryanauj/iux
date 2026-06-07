// ABOUTME: usePersistedPref — a React hook (lib).

import { useEffect, useState } from 'react'
import { notify, subscribe } from './_persistedShared'

// ABOUTME: usePersistedPref — a React hook.
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
    const unsubscribe = subscribe(key, raw => {
      if (validate(raw)) setValue(raw)
    })
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null && validate(e.newValue)) {
        setValue(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => {
      unsubscribe()
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
