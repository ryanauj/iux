// ABOUTME: In-tab pub/sub bus shared by usePersistedPref and usePersistedJSON so same-key hooks stay in sync without a storage event.

// ABOUTME: Callback signature for in-tab storage subscribers — receives the raw localStorage string whenever a sibling hook writes to the same key.
type Listener = (raw: string) => void

// ABOUTME: In-memory subscribers keyed by storage key.
/**
 * In-memory subscribers keyed by storage key. Lets multiple React tree
 * instances (e.g. a floating picker mounted on both the showcase and an
 * app shell) stay in sync within the same tab without round-tripping
 * through the storage event, which only fires across tabs.
 *
 * Shared by both `usePersistedPref` (string-typed) and `usePersistedJSON`
 * (JSON-encoded) so a hook on either side picks up changes from the other
 * without each one maintaining its own bus.
 */
export const listeners = new Map<string, Set<Listener>>()

// ABOUTME: Broadcast a raw string value to every in-tab subscriber registered under `key`.
export function notify(key: string, raw: string) {
  listeners.get(key)?.forEach(l => l(raw))
}

// ABOUTME: Register a listener for `key` and return an unsubscribe function; used by both persisted hooks to react to sibling writes within the same tab.
export function subscribe(key: string, listener: Listener) {
  let bucket = listeners.get(key)
  if (!bucket) {
    bucket = new Set()
    listeners.set(key, bucket)
  }
  bucket.add(listener)
  return () => {
    bucket!.delete(listener)
  }
}
