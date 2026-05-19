// Storage lint clean fixture — mentions the contract surface but never
// reaches around it. The `LocalStorageStore` name and the
// `isLocalStorageAvailable` identifier are deliberate: they're part of the
// contract API and must not trip the rule.
import {
  LocalStorageStore,
  MemoryStore,
  SwitchableStore,
  isLocalStorageAvailable,
} from '../../storage/store.contract'

export function init(): SwitchableStore {
  const inner = isLocalStorageAvailable() ? new LocalStorageStore() : new MemoryStore()
  return new SwitchableStore(inner)
}

// A doc-comment reference to "localStorage" in prose is also allowed —
// the lint only catches actual access patterns, not identifier names.
