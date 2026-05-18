import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Checkbox,
  Combobox,
  IconButton,
  Stack,
  Tabs,
  type TabSpec,
} from '../../lib'
import { todoApi } from './api'
import type { Todo } from './store'

type Filter = 'all' | 'active' | 'completed'

const FILTER_LABEL: Record<Filter, string> = {
  all: 'all',
  active: 'active',
  completed: 'completed',
}

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

  const tabs: TabSpec<Filter>[] = (['all', 'active', 'completed'] as Filter[]).map((f) => ({
    id: f,
    label: FILTER_LABEL[f],
    count: counts[f],
  }))

  return (
    <Stack direction='column' gap='lg' className='todo'>
      <Combobox
        getSuggestions={todoApi.suggestions}
        onSubmit={onAdd}
        placeholder='What needs doing?'
        disabled={!loaded}
        helpText='↑↓ to navigate · enter to add · esc to close'
      />

      <Tabs tabs={tabs} active={filter} onChange={setFilter} ariaLabel='filter todos'>
        <Button
          variant='ghost'
          size='sm'
          disabled={counts.completed === 0}
          onClick={onClearCompleted}
        >
          clear completed
        </Button>
      </Tabs>

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
            <Checkbox
              checked={t.done}
              onChange={() => onToggle(t.id)}
              label={t.text}
              labelClassName='todo-item__check'
            />
            <IconButton
              aria-label={`Delete "${t.text}"`}
              variant='danger'
              className='todo-item__remove'
              onClick={() => onDelete(t.id)}
            >
              ×
            </IconButton>
          </li>
        ))}
      </ul>
    </Stack>
  )
}
