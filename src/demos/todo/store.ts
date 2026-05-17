import { DemoStore } from '../../server/store'

export interface Todo {
  id: string
  text: string
  done: boolean
  createdAt: number
}

export interface TodoState {
  todos: Todo[]
  history: string[]
}

const HISTORY_LIMIT = 50

export function pushHistory(history: string[], text: string): string[] {
  const next = [text, ...history.filter((h) => h.toLowerCase() !== text.toLowerCase())]
  return next.slice(0, HISTORY_LIMIT)
}

export const todoStore = new DemoStore<TodoState>('todo', {
  todos: [],
  history: [],
})
