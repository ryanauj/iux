# Persistence contract

The single seam between apps and storage. Sibling to the token
contract: where `tokens/semantic.contract.ts` decouples components from
palettes, `storage/store.contract.ts` decouples apps from where their
state lives.

## Hard rules

1. **Apps consume only the `Store` interface.** No app file imports a
   concrete implementation (`MemoryStore`, `LocalStorageStore`,
   `RemoteStore`) or reaches for `window.localStorage`,
   `window.sessionStorage`, `window.indexedDB`, `fetch('/kv/...')`, or
   any other transport. If an app needs persistence, it asks the
   ambient `Store`.
2. **Implementations live behind the contract.** `storage/` is the only
   directory in the repo allowed to name a transport. Add a new backend
   by adding a class that implements `Store`, then a case to
   `createStore`. App code does not change.
3. **The interface is the API.** Adding a method is a breaking change
   for every backend. Every implementation in `storage/store.contract.ts`
   implements every method. There are no optional methods; there are
   only methods whose value some implementations resolve immediately
   (`MemoryStore.list()` over a never-written namespace returns `[]`)
   or reject (`RemoteStore.*` throws `not-implemented`).
4. **Mode is data, not code.** Selecting Memory vs LocalStorage vs
   Remote is a runtime decision read from a single value
   (`iux:store:mode`). A global UI toggle ("Persist locally: on/off")
   swaps Memory ↔ LocalStorage at runtime through `SwitchableStore`
   with no app code change.

The TypeScript source of truth is `storage/store.contract.ts`. This
document explains the *why* and the rules; the `.ts` file is the
enforceable shape.

## The interface

```ts
interface Store {
  get<T>(key: string): Promise<T | null>
  set<T>(key: string, value: T): Promise<void>
  delete(key: string): Promise<void>
  list(prefix?: string): Promise<string[]>
  subscribe<T>(key: string, cb: (value: T | null) => void): Unsubscribe
}
```

### Method-by-method semantics

- **`get`** — resolves to the stored value or `null` if absent. Never
  throws for "not found"; absence is a value. Values are JSON-decoded
  on read, so the round-trip is the only thing guaranteed to survive a
  backend swap. Class instances, `Date`, `Map`, `Set`, etc. survive
  only as their JSON projection.
- **`set`** — replaces any prior value at the key and synchronously
  notifies subscribers in the same tab. Cross-tab notification is the
  responsibility of the implementation (`LocalStorageStore` listens for
  the browser's `storage` event).
- **`delete`** — removes the key. Subscribers receive `null`. No-op if
  the key does not exist (and silent — no `false` return, no `throw`).
- **`list`** — enumerates keys, optionally filtered by prefix. Order is
  unspecified. Implementations must not include any internal bookkeeping
  keys in the result (e.g., the namespace prefix is stripped on the way
  out of `LocalStorageStore`).
- **`subscribe`** — fires the callback on every `set`/`delete` for the
  exact key supplied. Returns an `Unsubscribe`. Implementations may
  but need not fire an initial value on subscribe; callers that want
  one should `get` it themselves. Subscriptions survive a runtime
  backend swap (see `SwitchableStore`).

### What's deliberately not in the interface

- **Transactions / atomic multi-key updates.** Each app's data shape is
  small enough that a single key holding a structured blob is the
  primary persistence unit. Apps that need atomicity store the whole
  document under one key.
- **TTL / expiry.** Out of scope for v1. An app that needs ephemerality
  uses `MemoryStore` for that namespace.
- **Schema / migrations.** Schema lives in app code, not the store.
  Apps reading a stored value must defend against missing fields the
  same way they defend against `null` from `get`.
- **Search / query / indexes.** `list(prefix)` is the only query
  primitive. Apps that need richer indexing build it themselves on top.

## Implementations

Three implementations ship with the contract.

### `MemoryStore` — default

In-process `Map`. State is lost on reload. Works in **every** environment
including sandboxed artifact previews and SSR. The runtime resolver falls
back to `MemoryStore` whenever LocalStorage is requested but not feature-
detected, so apps never have to branch on environment.

### `LocalStorageStore` — opt-in, browsers only

Persists to `window.localStorage`, JSON-serialized, keyed under a
configurable prefix (default `iux:`). Detection is a write/read/delete
probe — the bare presence of the global is not enough; privacy modes
that throw on `setItem` correctly report unavailable. Cross-tab updates
are wired through the browser's `storage` event so two open tabs stay
in sync.

This is the only file in the repo allowed to touch
`window.localStorage` directly (see § Lint enforcement below).

### `RemoteStore` — stub, future self-hosted backend

A placeholder so apps can be written against the future shape today.
Every method throws `not-implemented`. When the backend lands it will
be:

- HTTPS `GET /kv/:key`, `PUT /kv/:key`, `DELETE /kv/:key`,
  `GET /kv?prefix=` against a user-operated instance.
- Bearer-token auth bound to that instance — no shared cloud, no
  cross-user data plane.
- Server-sent events for `subscribe`, with reconnect.

That work is out of scope for this session. The stub exists so the
factory's mode space is complete and so route handlers in apps already
have somewhere to point.

## Runtime mode switch

`SwitchableStore` wraps a concrete `Store` and exposes a `swap(next)`
method that:

1. Optionally migrates every key from the old backend into the new one
   (`migrate: true` is the default — data follows you across the
   toggle in both directions).
2. Re-notifies every existing subscriber with the value from the new
   backend, so live UI updates the moment the toggle flips.

The Settings playground app owns the user-facing toggle ("Persist
locally: on/off") and is the only surface that calls `swap`. Apps see
a single stable `Store` reference for the life of the page.

## App wiring

Apps receive the `Store` via a single ambient resolver, not by importing
implementations:

```ts
// app code
import type { Store } from '../../storage/store.contract'

function useStore(): Store { /* provided by app shell */ }
```

The app shell (landing in a future session) constructs one
`SwitchableStore`, seeds it from the persisted mode value, and hands
that single instance to every app. No app constructs its own store.

## Lint enforcement

A repo-wide lint rule fails the build on any reference to
`window.localStorage`, `window.sessionStorage`, `window.indexedDB`, or
the bare globals `localStorage` / `sessionStorage` / `indexedDB`
**outside `storage/`**. This is the persistence sibling of
`scripts/lint-raw-values.ts`'s ban on raw hex / `Npx` shadows outside
palettes. The rule lands in the same change as the first app that uses
the contract.

Until then, the existing ad-hoc usages — currently
`src/components/PropertyInspector/PropertyInspector.tsx` (collapse
state) and `src/components/Stepper/Stepper.tsx` (step persistence) —
are pre-contract violations. Both will be migrated to call
`useStore()` when the app shell lands. They are listed here so the
violation count is known and bounded.

## What is *not* in this contract

- **Auth or identity.** `RemoteStore`'s bearer token is configured at
  construction time; the store does not log a user in.
- **Sync / merge / CRDT.** `set` is last-write-wins per backend. Apps
  that need conflict resolution layer it themselves; the store is the
  transport.
- **Encryption at rest.** A future opt-in could wrap any `Store` with
  an encrypting decorator that conforms to the same interface — but
  the contract does not promise it.

## Adding an implementation

When a new backend is genuinely needed (IndexedDB, FS Access API,
self-hosted SQLite, etc.):

1. Add a class to `storage/store.contract.ts` that implements `Store`.
2. Add a `StoreMode` variant and a case to `createStore`.
3. If the new backend has a feature-detect, ship the probe alongside
   `isLocalStorageAvailable`.
4. App code does not change. That's the test.

This keeps the contract from drifting into "whichever transport each
app reached for that week."
