// Storage lint dirty fixture — trips all three rules outside `storage/`.

export function save(value: string): void {
  // window-storage: window.localStorage
  window.localStorage.setItem('iux:demo', value)
}

export function load(): string | null {
  // global-storage: globalThis.sessionStorage
  return globalThis.sessionStorage.getItem('iux:demo')
}

export function probeIdb(): unknown {
  // bare-storage: indexedDB.open
  return indexedDB.open('iux-db')
}
