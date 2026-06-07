// ABOUTME: usePersistedJSON — a React hook (lib).

import { useEffect, useState } from 'react'
import { notify, subscribe } from './_persistedShared'

// ABOUTME: usePersistedJSON — a React hook.
/**
 * localStorage-backed React state for JSON-serialisable values. Mirrors
 * `usePersistedPref` but with `JSON.parse` / `JSON.stringify` around the
 * raw string. Shares the same listener bus so JSON and string prefs
 * can sit next to each other and stay in sync the same way.
 *
 * `validate` is called against the *parsed* value so callers can write a
 * structural type guard rather than a JSON-string check.
 */
export function usePersistedJSON<T>(
  key: string,
  defaultValue: T,
  validate: (parsed: unknown) => parsed is T,
): [T, (next: T) => void] {
  const [value, setValue] = useState<T>(() => readValue(key, defaultValue, validate))

  useEffect(() => {
    const unsubscribe = subscribe(key, raw => {
      const parsed = safeParse(raw)
      if (validate(parsed)) setValue(parsed)
    })
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return
      if (e.newValue === null) {
        setValue(defaultValue)
        return
      }
      const parsed = safeParse(e.newValue)
      if (validate(parsed)) setValue(parsed)
    }
    window.addEventListener('storage', onStorage)
    return () => {
      unsubscribe()
      window.removeEventListener('storage', onStorage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const set = (next: T) => {
    setValue(next)
    let raw: string
    try {
      raw = JSON.stringify(next)
    } catch {
      return
    }
    try {
      localStorage.setItem(key, raw)
    } catch {
      /* ignore */
    }
    notify(key, raw)
  }

  return [value, set]
}

function readValue<T>(key: string, defaultValue: T, validate: (parsed: unknown) => parsed is T): T {
  if (typeof window === 'undefined') return defaultValue
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    const parsed = safeParse(raw)
    if (validate(parsed)) return parsed
  } catch {
    /* ignore */
  }
  return defaultValue
}

function safeParse(raw: string): unknown {
  try {
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}
