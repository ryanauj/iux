import type { Todo } from './store'

const BASE = `${import.meta.env.BASE_URL}api/todo`

async function asJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status}: ${text}`)
  }
  return (await res.json()) as T
}

export const todoApi = {
  async list(): Promise<{ todos: Todo[]; persisted: boolean }> {
    return asJson(await fetch(BASE))
  },

  async add(text: string): Promise<{ todo: Todo }> {
    return asJson(
      await fetch(BASE, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text }),
      }),
    )
  },

  async patch(id: string, patch: { done?: boolean; text?: string }): Promise<{ todo: Todo }> {
    return asJson(
      await fetch(`${BASE}/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(patch),
      }),
    )
  },

  async remove(id: string): Promise<void> {
    await asJson(await fetch(`${BASE}/${id}`, { method: 'DELETE' }))
  },

  async clearCompleted(): Promise<{ removed: number }> {
    return asJson(await fetch(`${BASE}/clear-completed`, { method: 'POST' }))
  },

  async suggestions(q: string, signal?: AbortSignal): Promise<string[]> {
    const url = `${BASE}/suggestions?q=${encodeURIComponent(q)}`
    const data = await asJson<{ suggestions: string[] }>(await fetch(url, { signal }))
    return data.suggestions
  },

  async setPersisted(enabled: boolean): Promise<{ persisted: boolean }> {
    return asJson(
      await fetch(`${BASE}/persist`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ enabled }),
      }),
    )
  },

  async reset(): Promise<void> {
    await asJson(await fetch(`${BASE}/reset`, { method: 'POST' }))
  },
}
