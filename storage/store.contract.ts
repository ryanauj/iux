/**
 * Persistence contract — the single seam between apps and storage.
 *
 * Apps import the `Store` interface only. Three implementations satisfy
 * it; apps never name an implementation directly. A `SwitchableStore`
 * lets a global UI toggle swap Memory ↔ LocalStorage at runtime without
 * any app code change.
 *
 *   - MemoryStore        — default; works in every environment incl.
 *                          sandboxed artifacts where `localStorage` is
 *                          unavailable.
 *   - LocalStorageStore  — opt-in; real browsers only; feature-detected.
 *   - RemoteStore        — stub; future self-hosted backend on the user's
 *                          own infra. Same interface, no impl yet.
 *
 * See `PERSISTENCE-CONTRACT.md` for the rules and rationale.
 */

// -----------------------------------------------------------------------------
// Interface
// -----------------------------------------------------------------------------

export type Unsubscribe = () => void

/** Subscription callback. Receives the new value, or `null` if the key was deleted. */
export type Listener<T = unknown> = (value: T | null) => void

/**
 * The single interface every app uses for state.
 *
 * Keys are opaque strings. Values are anything JSON-serializable; the
 * contract does not constrain the value shape because per-app schemas
 * live in app code, not in storage. Implementations must JSON-serialize
 * on `set` and parse on `get` (and the round-trip is the only thing
 * guaranteed to survive an implementation swap).
 */
export interface Store {
  /** Read a value by key. Resolves to `null` if absent. */
  get<T = unknown>(key: string): Promise<T | null>
  /** Write a value at key. Replaces any prior value, notifies subscribers. */
  set<T = unknown>(key: string, value: T): Promise<void>
  /** Remove a value at key. No-op if absent. Notifies subscribers with `null`. */
  delete(key: string): Promise<void>
  /** Enumerate keys, optionally filtered by prefix. Order is unspecified. */
  list(prefix?: string): Promise<string[]>
  /**
   * Subscribe to changes at a key. The callback fires on every `set` /
   * `delete` for that exact key. Returns an `Unsubscribe` handle.
   * Implementations may but need not fire an initial value on subscribe;
   * callers that want one should `get` it themselves.
   */
  subscribe<T = unknown>(key: string, cb: Listener<T>): Unsubscribe
}

/**
 * The names the runtime resolver understands. A palette-style switcher
 * persists this value as `iux:store:mode` and the bootstrap uses it to
 * pick the active implementation.
 */
export type StoreMode = 'memory' | 'local' | 'remote'

// -----------------------------------------------------------------------------
// Feature detection
// -----------------------------------------------------------------------------

/**
 * True iff a usable `window.localStorage` is reachable. False in SSR,
 * in sandboxed iframes that disallow storage, and in privacy modes that
 * throw on `setItem`. Probe with a write/read/delete round trip so the
 * answer reflects actual usability, not just the presence of the global.
 */
export function isLocalStorageAvailable(): boolean {
  try {
    if (typeof globalThis === 'undefined') return false
    const w = (globalThis as { window?: { localStorage?: unknown } }).window
    const ls = w?.localStorage as
      | { setItem: (k: string, v: string) => void; getItem: (k: string) => string | null; removeItem: (k: string) => void }
      | undefined
    if (!ls) return false
    const probe = '__iux_probe__'
    ls.setItem(probe, '1')
    const got = ls.getItem(probe)
    ls.removeItem(probe)
    return got === '1'
  } catch {
    return false
  }
}

// -----------------------------------------------------------------------------
// Shared listener bookkeeping
// -----------------------------------------------------------------------------

/**
 * Per-key listener set with a tiny ergonomic API. Shared by every
 * implementation so subscribe / unsubscribe semantics are identical
 * across stores — that's part of the contract, not an implementation
 * detail.
 */
class ListenerTable {
  private map = new Map<string, Set<Listener>>()

  add(key: string, cb: Listener): Unsubscribe {
    let set = this.map.get(key)
    if (!set) {
      set = new Set()
      this.map.set(key, set)
    }
    set.add(cb)
    return () => {
      const s = this.map.get(key)
      if (!s) return
      s.delete(cb)
      if (s.size === 0) this.map.delete(key)
    }
  }

  emit<T>(key: string, value: T | null): void {
    const set = this.map.get(key)
    if (!set) return
    for (const cb of set) cb(value)
  }

  keys(): string[] {
    return Array.from(this.map.keys())
  }
}

// -----------------------------------------------------------------------------
// MemoryStore — default
// -----------------------------------------------------------------------------

/**
 * In-process store. Works in every environment, including sandboxed
 * artifacts where `localStorage` is unavailable. State lives in a `Map`
 * and is lost on reload — that is the deliberate behavior. The runtime
 * resolver returns a MemoryStore whenever LocalStorage is not feature-
 * detected, so apps never have to fork on the environment.
 */
export class MemoryStore implements Store {
  private data = new Map<string, unknown>()
  private listeners = new ListenerTable()

  async get<T = unknown>(key: string): Promise<T | null> {
    return this.data.has(key) ? (this.data.get(key) as T) : null
  }

  async set<T = unknown>(key: string, value: T): Promise<void> {
    this.data.set(key, value)
    this.listeners.emit(key, value)
  }

  async delete(key: string): Promise<void> {
    if (!this.data.has(key)) return
    this.data.delete(key)
    this.listeners.emit(key, null)
  }

  async list(prefix?: string): Promise<string[]> {
    const keys = Array.from(this.data.keys())
    return prefix ? keys.filter(k => k.startsWith(prefix)) : keys
  }

  subscribe<T = unknown>(key: string, cb: Listener<T>): Unsubscribe {
    return this.listeners.add(key, cb as Listener)
  }

  /** Test / migration helper — not part of the `Store` interface. */
  entries(): IterableIterator<[string, unknown]> {
    return this.data.entries()
  }
}

// -----------------------------------------------------------------------------
// LocalStorageStore — opt-in, browser only
// -----------------------------------------------------------------------------

/**
 * Persists to `window.localStorage`, keyed under a configurable prefix
 * (defaults to `iux:`). Values are JSON-serialized.
 *
 * Construction throws if `localStorage` is not reachable — call
 * `isLocalStorageAvailable()` first, or use `createStore('local')`
 * which falls back to Memory in unsupported environments.
 *
 * Cross-tab updates: `subscribe` listens to the browser's `storage`
 * event so changes made in another tab fire local listeners. Same-tab
 * changes are emitted synchronously from `set` / `delete`.
 *
 * This is the only file in the repo allowed to touch `window.localStorage`
 * directly — see `PERSISTENCE-CONTRACT.md` § "Lint enforcement".
 */
interface LocalStorageLike {
  readonly length: number
  key(index: number): string | null
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export class LocalStorageStore implements Store {
  private listeners = new ListenerTable()
  private prefix: string
  private storage: LocalStorageLike

  constructor(prefix: string = 'iux:') {
    if (!isLocalStorageAvailable()) {
      throw new Error('LocalStorageStore: window.localStorage is not available; use MemoryStore')
    }
    this.prefix = prefix
    this.storage = (globalThis as { window: { localStorage: LocalStorageLike } }).window.localStorage
    const w = (globalThis as { window?: { addEventListener?: (e: string, cb: (ev: StorageEvent) => void) => void } }).window
    w?.addEventListener?.('storage', (ev: StorageEvent) => {
      if (!ev.key || !ev.key.startsWith(this.prefix)) return
      const bare = ev.key.slice(this.prefix.length)
      const next = ev.newValue == null ? null : safeParse(ev.newValue)
      this.listeners.emit(bare, next)
    })
  }

  private k(key: string): string {
    return this.prefix + key
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    const raw = this.storage.getItem(this.k(key))
    if (raw == null) return null
    return safeParse<T>(raw)
  }

  async set<T = unknown>(key: string, value: T): Promise<void> {
    this.storage.setItem(this.k(key), JSON.stringify(value))
    this.listeners.emit(key, value)
  }

  async delete(key: string): Promise<void> {
    const had = this.storage.getItem(this.k(key)) != null
    this.storage.removeItem(this.k(key))
    if (had) this.listeners.emit(key, null)
  }

  async list(prefix?: string): Promise<string[]> {
    const out: string[] = []
    const fullPrefix = prefix ? this.prefix + prefix : this.prefix
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i)
      if (key && key.startsWith(fullPrefix)) out.push(key.slice(this.prefix.length))
    }
    return out
  }

  subscribe<T = unknown>(key: string, cb: Listener<T>): Unsubscribe {
    return this.listeners.add(key, cb as Listener)
  }
}

function safeParse<T = unknown>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

// -----------------------------------------------------------------------------
// RemoteStore — stub, future self-hosted backend
// -----------------------------------------------------------------------------

/**
 * Placeholder for a future self-hosted backend on the user's own infra.
 * The shape is fixed so apps can be written against it today; every
 * method rejects with `not-implemented` so a mis-wired switch is loud
 * and immediate.
 *
 * When the backend lands it will implement:
 *
 *   - HTTPS `GET /kv/:key`, `PUT /kv/:key`, `DELETE /kv/:key`, `GET /kv?prefix=`
 *   - Bearer-token auth bound to the operator's instance (no shared cloud).
 *   - Server-sent events for `subscribe`, with reconnect.
 *
 * That work is out of scope for this session.
 */
export class RemoteStore implements Store {
  constructor(public readonly baseUrl: string = '') {}

  async get<T = unknown>(_key: string): Promise<T | null> {
    throw new Error('RemoteStore.get: not-implemented (stub)')
  }
  async set<T = unknown>(_key: string, _value: T): Promise<void> {
    throw new Error('RemoteStore.set: not-implemented (stub)')
  }
  async delete(_key: string): Promise<void> {
    throw new Error('RemoteStore.delete: not-implemented (stub)')
  }
  async list(_prefix?: string): Promise<string[]> {
    throw new Error('RemoteStore.list: not-implemented (stub)')
  }
  subscribe<T = unknown>(_key: string, _cb: Listener<T>): Unsubscribe {
    throw new Error('RemoteStore.subscribe: not-implemented (stub)')
  }
}

// -----------------------------------------------------------------------------
// SwitchableStore — runtime mode swap
// -----------------------------------------------------------------------------

/**
 * A `Store` whose backing implementation can be swapped at runtime
 * without invalidating subscriptions. The "Persist locally: on/off"
 * toggle in the Settings playground swaps `local` ↔ `memory` through
 * this wrapper.
 *
 * On `swap`:
 *   1. The new backend becomes the target for all subsequent calls.
 *   2. If `migrate: true` (default), all keys listed by the old backend
 *      are copied into the new one (the data goes with you when you
 *      turn local persistence on). The reverse direction — turning it
 *      off — also migrates so a refresh after toggling on→off restores
 *      the same session content from memory until the tab closes.
 *   3. Every existing subscriber for any key is re-notified with the
 *      value from the new backend, so live UI reflects the switch
 *      immediately even if the value is identical.
 *
 * The swap is the contract's escape valve: apps depend on the
 * `Store` interface only, not the underlying impl, so the swap is
 * always safe.
 */
export class SwitchableStore implements Store {
  private listeners = new ListenerTable()
  private inner: Store

  constructor(initial: Store) {
    this.inner = initial
  }

  current(): Store {
    return this.inner
  }

  async swap(next: Store, opts: { migrate?: boolean } = {}): Promise<void> {
    const migrate = opts.migrate !== false
    if (migrate) {
      const keys = await this.inner.list()
      for (const key of keys) {
        const value = await this.inner.get(key)
        if (value != null) await next.set(key, value)
      }
    }
    this.inner = next
    for (const key of this.listeners.keys()) {
      const v = await next.get(key)
      this.listeners.emit(key, v)
    }
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    return this.inner.get<T>(key)
  }
  async set<T = unknown>(key: string, value: T): Promise<void> {
    await this.inner.set(key, value)
    this.listeners.emit(key, value)
  }
  async delete(key: string): Promise<void> {
    await this.inner.delete(key)
    this.listeners.emit(key, null)
  }
  async list(prefix?: string): Promise<string[]> {
    return this.inner.list(prefix)
  }
  subscribe<T = unknown>(key: string, cb: Listener<T>): Unsubscribe {
    return this.listeners.add(key, cb as Listener)
  }
}

// -----------------------------------------------------------------------------
// Factory
// -----------------------------------------------------------------------------

/**
 * Resolve a concrete `Store` for the requested mode. Falls back to
 * `MemoryStore` when `'local'` is requested in an environment without
 * a usable `localStorage` — that's the rule that keeps every app
 * working in sandboxed artifact previews.
 *
 * `'remote'` always constructs the stub; calling any method on it
 * throws until the backend lands.
 */
export function createStore(mode: StoreMode, opts: { prefix?: string; remoteBaseUrl?: string } = {}): Store {
  switch (mode) {
    case 'memory':
      return new MemoryStore()
    case 'local':
      return isLocalStorageAvailable() ? new LocalStorageStore(opts.prefix) : new MemoryStore()
    case 'remote':
      return new RemoteStore(opts.remoteBaseUrl)
  }
}
