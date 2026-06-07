// ABOUTME: App-scoped toast system: ToastProvider owns a single queue rendered by Toaster, and useToast exposes the push function to any component in the Promptbook subtree.

import { createContext, useContext, type ReactNode } from 'react'
import { Toaster, useToastQueue, type ToastItem } from '../../../components/Toast/Toast'

/**
 * App-scoped toast feedback. A single queue renders through the shared
 * `Toaster`; any page or component pushes via `useToast()`.
 */
type PushToast = (item: Omit<ToastItem, 'id'> & { id?: string }) => string

const ToastContext = createContext<PushToast | null>(null)

// ABOUTME: Context provider that creates the toast queue, mounts a bottom-right Toaster, and exposes the push function via ToastContext so any descendant can fire a toast with useToast().
export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, push, dismiss } = useToastQueue()
  return (
    <ToastContext.Provider value={push}>
      {children}
      <Toaster toasts={toasts} onDismiss={dismiss} position="bottom-right" />
    </ToastContext.Provider>
  )
}

// ABOUTME: Returns the push function from ToastContext; must be called inside ToastProvider. Used by CopyButton, PromptDetail, PromptForm, and StrategyDetail to fire success/error toasts.
export function useToast(): PushToast {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
