export class DemoStore<T> {
  private state: T
  private persisted: boolean

  constructor(
    private id: string,
    private initial: T,
  ) {
    this.persisted = this.readPersistFlag()
    this.state = this.persisted
      ? this.readData() ?? structuredClone(this.initial)
      : structuredClone(this.initial)
  }

  get(): T {
    return this.state
  }

  set(updater: (prev: T) => T): T {
    this.state = updater(this.state)
    if (this.persisted) this.writeData()
    return this.state
  }

  reset(): void {
    this.state = structuredClone(this.initial)
    if (this.persisted) this.writeData()
    else localStorage.removeItem(this.dataKey)
  }

  isPersisted(): boolean {
    return this.persisted
  }

  setPersisted(value: boolean): void {
    this.persisted = value
    localStorage.setItem(this.persistKey, value ? '1' : '0')
    if (value) this.writeData()
    else localStorage.removeItem(this.dataKey)
  }

  private get persistKey() {
    return `iux.demo.${this.id}.persist`
  }
  private get dataKey() {
    return `iux.demo.${this.id}.state`
  }

  private readPersistFlag(): boolean {
    try {
      return localStorage.getItem(this.persistKey) === '1'
    } catch {
      return false
    }
  }

  private readData(): T | null {
    try {
      const raw = localStorage.getItem(this.dataKey)
      return raw ? (JSON.parse(raw) as T) : null
    } catch {
      return null
    }
  }

  private writeData(): void {
    try {
      localStorage.setItem(this.dataKey, JSON.stringify(this.state))
    } catch {
      // quota or disabled storage — silently ignore
    }
  }
}
