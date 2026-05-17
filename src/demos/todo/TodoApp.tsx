import { useCallback, useEffect, useMemo, useState } from 'react'
import SuggestionInput from './SuggestionInput'
import { todoApi } from './api'
import type { Todo } from './store'

type Filter = 'all' | 'active' | 'completed'

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')

  const refresh = useCallback(async () => {
    const data = await todoApi.list()
    setTodos(data.todos)
    setLoaded(true)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  async function onAdd(text: string) {
    const optimistic: Todo = {
      id: `tmp-${Math.random().toString(36).slice(2, 8)}`,
      text,
      done: false,
      createdAt: Date.now(),
    }
    setTodos((current) => [optimistic, ...current])
    try {
      const { todo } = await todoApi.add(text)
      setTodos((current) => current.map((t) => (t.id === optimistic.id ? todo : t)))
    } catch {
      setTodos((current) => current.filter((t) => t.id !== optimistic.id))
    }
  }

  async function onToggle(id: string) {
    const target = todos.find((t) => t.id === id)
    if (!target) return
    const nextDone = !target.done
    setTodos((current) => current.map((t) => (t.id === id ? { ...t, done: nextDone } : t)))
    try {
      await todoApi.patch(id, { done: nextDone })
    } catch {
      setTodos((current) => current.map((t) => (t.id === id ? { ...t, done: !nextDone } : t)))
    }
  }

  async function onDelete(id: string) {
    const snapshot = todos
    setTodos((current) => current.filter((t) => t.id !== id))
    try {
      await todoApi.remove(id)
    } catch {
      setTodos(snapshot)
    }
  }

  async function onClearCompleted() {
    const snapshot = todos
    setTodos((current) => current.filter((t) => !t.done))
    try {
      await todoApi.clearCompleted()
    } catch {
      setTodos(snapshot)
    }
  }

  const counts = useMemo(() => {
    const active = todos.filter((t) => !t.done).length
    return { all: todos.length, active, completed: todos.length - active }
  }, [todos])

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done)
    if (filter === 'completed') return todos.filter((t) => t.done)
    return todos
  }, [todos, filter])

  return (
    <div className='todo'>
      <SuggestionInput onSubmit={onAdd} disabled={!loaded} />

      <nav className='todo-filters' role='tablist'>
        {(['all', 'active', 'completed'] as Filter[]).map((f) => (
          <button
            key={f}
            type='button'
            role='tab'
            aria-selected={filter === f}
            className={`todo-filters__btn ${filter === f ? 'todo-filters__btn--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f} <span className='todo-filters__count'>{counts[f]}</span>
          </button>
        ))}
        <button
          type='button'
          className='todo-filters__clear'
          onClick={onClearCompleted}
          disabled={counts.completed === 0}
        >
          clear completed
        </button>
      </nav>

      <ul className='todo-list'>
        {!loaded && <li className='todo-empty'>loading…</li>}
        {loaded && visible.length === 0 && (
          <li className='todo-empty'>
            {filter === 'all' && 'no todos yet — try a suggestion above.'}
            {filter === 'active' && 'nothing active. take a breath.'}
            {filter === 'completed' && 'nothing completed yet.'}
          </li>
        )}
        {visible.map((t) => (
          <li key={t.id} className={`todo-item ${t.done ? 'todo-item--done' : ''}`}>
            <label className='todo-item__check'>
              <input
                type='checkbox'
                checked={t.done}
                onChange={() => onToggle(t.id)}
              />
              <span>{t.text}</span>
            </label>
            <button
              type='button'
              className='todo-item__remove'
              aria-label={`Delete "${t.text}"`}
              onClick={() => onDelete(t.id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
