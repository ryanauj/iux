// ABOUTME: In-session prompt store: provides PromptStoreProvider (seeds from SEED_PROMPTS, holds add/update/remove/toggleFavorite actions in React state) and usePromptStore hook for any page or component in the Promptbook subtree.

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

// ABOUTME: Input fields required when creating or editing a prompt (title, body, category, models, tags, strategyIds, and optional notes); passed to store.add and store.update by PromptForm.
export interface NewPromptInput {
  title: string
  body: string
  category: Prompt['category']
  models: string[]
  tags: string[]
  strategyIds: string[]
  notes?: string
}

// ABOUTME: Shape of the prompt store value exposed through PromptStoreContext: the live prompts array plus the five CRUD/toggle actions used by Library, PromptDetail, PromptForm, and PromptCard.
interface PromptStore {
  prompts: Prompt[]
  get: (id: string) => Prompt | undefined
  add: (input: NewPromptInput) => Prompt
  update: (id: string, input: NewPromptInput) => void
  remove: (id: string) => void
  toggleFavorite: (id: string) => void
}

// ABOUTME: React context holding the PromptStore; null outside PromptStoreProvider so usePromptStore can detect misuse.
const PromptStoreContext = createContext<PromptStore | null>(null)

// ABOUTME: Module-level counter used by makeId to ensure generated prompt ids are unique within a session even if multiple prompts are created in the same millisecond.
let idCounter = 0
// ABOUTME: Generates a unique prompt id by combining the current timestamp (base-36) with a monotonically incrementing counter.
function makeId(): string {
  idCounter += 1
  return `pr-user-${Date.now().toString(36)}-${idCounter}`
}

// ABOUTME: Context provider that seeds the prompt list from SEED_PROMPTS (newest-first), exposes get/add/update/remove/toggleFavorite via PromptStoreContext, and resets cleanly on page reload — no persistence by design.
/**
 * Context provider that initialises the in-session prompt list from
 * `SEED_PROMPTS`, sorted newest-first, and exposes the full CRUD surface
 * (`get`, `add`, `update`, `remove`, `toggleFavorite`) via
 * `PromptStoreContext`. State lives in `useState` only and resets on reload,
 * matching the apps catalog's no-persistence convention. This provider is the
 * single seam to swap for a persistent backend when needed.
 */
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

// ABOUTME: Returns the PromptStore (prompts list + CRUD actions) from PromptStoreContext; throws if called outside PromptStoreProvider. Used by Library, PromptCard, PromptDetail, PromptForm, and StrategyDetail.
export function usePromptStore(): PromptStore {
  const ctx = useContext(PromptStoreContext)
  if (!ctx) throw new Error('usePromptStore must be used within PromptStoreProvider')
  return ctx
}
