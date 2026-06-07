// ABOUTME: PromptStoreProvider — a React component (apps).

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Prompt } from './types'
import { SEED_PROMPTS } from './data/prompts'

// ABOUTME: NewPromptInput — an interface.
/**
 * In-session prompt store. Seeded from the static starter library; the
 * user can add, edit, delete, and favorite prompts while the app is open.
 *
 * Per the apps catalog convention (FINALIZED-APPS.md → "No localStorage,
 * no network"), this state is deliberately reload-safe: it lives in React
 * state only and resets on refresh. When the persistence contract's app
 * shell `Store` lands, this provider is the single seam to swap for a
 * persistent backend — every page already goes through these methods.
 */

export interface NewPromptInput {
  title: string
  body: string
  category: Prompt['category']
  models: string[]
  tags: string[]
  strategyIds: string[]
  notes?: string
}

interface PromptStore {
  prompts: Prompt[]
  get: (id: string) => Prompt | undefined
  add: (input: NewPromptInput) => Prompt
  update: (id: string, input: NewPromptInput) => void
  remove: (id: string) => void
  toggleFavorite: (id: string) => void
}

const PromptStoreContext = createContext<PromptStore | null>(null)

let idCounter = 0
function makeId(): string {
  idCounter += 1
  return `pr-user-${Date.now().toString(36)}-${idCounter}`
}

// ABOUTME: PromptStoreProvider — a React component.
export function PromptStoreProvider({ children }: { children: ReactNode }) {
  const [prompts, setPrompts] = useState<Prompt[]>(() =>
    // Newest first; the seed is authored oldest-first.
    [...SEED_PROMPTS].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
  )

  const get = useCallback(
    (id: string) => prompts.find(p => p.id === id),
    [prompts],
  )

  const add = useCallback((input: NewPromptInput) => {
    const now = new Date().toISOString()
    const prompt: Prompt = {
      id: makeId(),
      favorite: false,
      createdAt: now,
      updatedAt: now,
      ...input,
    }
    setPrompts(prev => [prompt, ...prev])
    return prompt
  }, [])

  const update = useCallback((id: string, input: NewPromptInput) => {
    setPrompts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, ...input, updatedAt: new Date().toISOString() } : p,
      ),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id))
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setPrompts(prev =>
      prev.map(p => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
    )
  }, [])

  const value = useMemo<PromptStore>(
    () => ({ prompts, get, add, update, remove, toggleFavorite }),
    [prompts, get, add, update, remove, toggleFavorite],
  )

  return (
    <PromptStoreContext.Provider value={value}>
      {children}
    </PromptStoreContext.Provider>
  )
}

// ABOUTME: usePromptStore — a React hook.
export function usePromptStore(): PromptStore {
  const ctx = useContext(PromptStoreContext)
  if (!ctx) throw new Error('usePromptStore must be used within PromptStoreProvider')
  return ctx
}
