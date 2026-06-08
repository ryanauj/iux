// ABOUTME: localStorage-backed "flows" — saved Focus breadcrumb trails — plus a
// ABOUTME: useSyncExternalStore hook so the Focus view and Flows section share one live list.

/**
 * A flow is a named Focus breadcrumb trail: the ordered list of file ids a
 * reader walked from the entry point outward. Saving one freezes that path so
 * the Flows view can replay it as an end-to-end story, and re-opening it drops
 * the reader back into Focus at the same trail. Everything persists under one
 * localStorage key and is broadcast through a tiny pub/sub so the Focus view's
 * "Save flow" button and the Flows list never drift out of sync within a tab.
 */
import { useSyncExternalStore } from 'react'

// ABOUTME: One saved Focus trail: a stable id, a human name, the ordered file ids walked, and when it was saved.
/** One saved Focus trail: a stable id, a human name, the file-id path, and a save timestamp. */
export interface Flow {
  id: string
  name: string
  trail: string[]
  createdAt: number
}

// ABOUTME: The localStorage key all saved flows live under.
const FLOWS_KEY = 'iux:howitworks:flows'
// ABOUTME: Window event fired after any flow write so same-tab subscribers re-read immediately.
const FLOWS_EVENT = 'iux:howitworks:flows-changed'

// A frozen empty list so the server snapshot is referentially stable across
// renders (useSyncExternalStore requires a constant when nothing has changed).
const EMPTY: Flow[] = []

// ABOUTME: Reads and validates the saved flows from localStorage, tolerating absent/corrupt data.
function read(): Flow[] {
  if (typeof window === 'undefined') return EMPTY
  try {
    const raw = window.localStorage.getItem(FLOWS_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return EMPTY
    return parsed.filter(
      (f): f is Flow =>
        f != null &&
        typeof f.id === 'string' &&
        typeof f.name === 'string' &&
        Array.isArray(f.trail) &&
        f.trail.every((s: unknown) => typeof s === 'string') &&
        typeof f.createdAt === 'number',
    )
  } catch {
    return EMPTY
  }
}

// The cached snapshot useSyncExternalStore hands out; only replaced when a
// write or a cross-tab `storage` event actually changes the data.
let snapshot: Flow[] = read()

// ABOUTME: Persists the flow list, refreshes the cached snapshot, and notifies same-tab subscribers.
function write(flows: Flow[]): void {
  if (typeof window === 'undefined') return
  snapshot = flows
  window.localStorage.setItem(FLOWS_KEY, JSON.stringify(flows))
  window.dispatchEvent(new Event(FLOWS_EVENT))
}

// ABOUTME: Returns the current saved flows, newest first.
/** All saved flows, newest first. */
export function listFlows(): Flow[] {
  return snapshot
}

// ABOUTME: Saves a named breadcrumb trail as a new flow and returns it; ignores trails shorter than two files.
/**
 * Saves `trail` under `name` as a new flow at the top of the list. A single
 * file is not a journey, so trails of fewer than two ids are rejected (returns
 * null). The id is time-based, which is also the natural newest-first sort key.
 */
export function saveFlow(name: string, trail: string[]): Flow | null {
  if (trail.length < 2) return null
  const flow: Flow = {
    id: `flow-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    name: name.trim() || 'Untitled flow',
    trail: [...trail],
    createdAt: Date.now(),
  }
  write([flow, ...snapshot])
  return flow
}

// ABOUTME: Deletes the flow with the given id.
/** Removes the flow with the given id, leaving the rest untouched. */
export function deleteFlow(id: string): void {
  write(snapshot.filter(f => f.id !== id))
}

// ABOUTME: Subscribes to flow changes (same-tab custom event + cross-tab storage event), re-reading the cache on each.
function subscribe(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  const onLocal = () => {
    snapshot = read()
    onChange()
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key !== null && e.key !== FLOWS_KEY) return
    snapshot = read()
    onChange()
  }
  window.addEventListener(FLOWS_EVENT, onLocal)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(FLOWS_EVENT, onLocal)
    window.removeEventListener('storage', onStorage)
  }
}

// ABOUTME: React hook returning the live saved-flow list, re-rendering whenever any surface saves or deletes one.
/**
 * Subscribe a component to the saved flows. Backed by
 * {@link https://react.dev/reference/react/useSyncExternalStore useSyncExternalStore},
 * so both the Focus "Save flow" affordance and the Flows section re-render the
 * moment {@link saveFlow}/{@link deleteFlow} run — and stay correct across tabs
 * via the `storage` event.
 */
export function useFlows(): Flow[] {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => EMPTY,
  )
}
