import { http, HttpResponse, delay } from 'msw'
import { pushHistory, todoStore, type Todo } from './store'
import { SUGGESTION_SEEDS } from './seed'
import { suggest } from './suggestions'

function genId(): string {
  return Math.random().toString(36).slice(2, 10)
}

interface AddBody {
  text: string
}
interface PatchBody {
  done?: boolean
  text?: string
}
interface PersistBody {
  enabled: boolean
}

export const todoHandlers = [
  http.get('*/api/todo', async () => {
    await delay(40)
    const state = todoStore.get()
    return HttpResponse.json({
      todos: state.todos,
      persisted: todoStore.isPersisted(),
    })
  }),

  http.post('*/api/todo', async ({ request }) => {
    const body = (await request.json()) as AddBody
    const text = body.text?.trim()
    if (!text) {
      return HttpResponse.json({ error: 'text required' }, { status: 400 })
    }
    await delay(120)
    const todo: Todo = {
      id: genId(),
      text,
      done: false,
      createdAt: Date.now(),
    }
    todoStore.set((s) => ({ ...s, todos: [todo, ...s.todos] }))
    return HttpResponse.json({ todo }, { status: 201 })
  }),

  http.patch('*/api/todo/:id', async ({ params, request }) => {
    const body = (await request.json()) as PatchBody
    await delay(80)
    let updated: Todo | null = null
    todoStore.set((s) => ({
      ...s,
      todos: s.todos.map((t) => {
        if (t.id !== params.id) return t
        updated = {
          ...t,
          done: body.done ?? t.done,
          text: body.text ?? t.text,
        }
        return updated
      }),
    }))
    if (!updated) return HttpResponse.json({ error: 'not found' }, { status: 404 })
    return HttpResponse.json({ todo: updated })
  }),

  http.delete('*/api/todo/:id', async ({ params }) => {
    await delay(80)
    const before = todoStore.get().todos.find((t) => t.id === params.id)
    if (!before) return HttpResponse.json({ error: 'not found' }, { status: 404 })
    todoStore.set((s) => ({
      todos: s.todos.filter((t) => t.id !== params.id),
      history: pushHistory(s.history, before.text),
    }))
    return HttpResponse.json({ ok: true })
  }),

  http.post('*/api/todo/clear-completed', async () => {
    await delay(120)
    let removed = 0
    todoStore.set((s) => {
      const completed = s.todos.filter((t) => t.done)
      removed = completed.length
      let history = s.history
      for (const t of completed) history = pushHistory(history, t.text)
      return {
        todos: s.todos.filter((t) => !t.done),
        history,
      }
    })
    return HttpResponse.json({ removed })
  }),

  http.get('*/api/todo/suggestions', async ({ request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q') ?? ''
    await delay(80)
    const state = todoStore.get()
    const suggestions = suggest({
      seeds: SUGGESTION_SEEDS,
      history: state.history,
      active: state.todos.map((t) => t.text),
      query: q,
      limit: 5,
    })
    return HttpResponse.json({ suggestions })
  }),

  http.post('*/api/todo/persist', async ({ request }) => {
    const body = (await request.json()) as PersistBody
    todoStore.setPersisted(!!body.enabled)
    return HttpResponse.json({ persisted: todoStore.isPersisted() })
  }),

  http.post('*/api/todo/reset', async () => {
    await delay(60)
    todoStore.reset()
    return HttpResponse.json({ ok: true })
  }),
]
