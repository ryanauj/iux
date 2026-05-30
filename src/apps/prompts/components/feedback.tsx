import { createContext, useContext, type ReactNode } from 'react'
import { Toaster, useToastQueue, type ToastItem } from '../../../components/Toast/Toast'

/**
 * App-scoped toast feedback. A single queue renders through the shared
 * `Toaster`; any page or component pushes via `useToast()`.
 */
type PushToast = (item: Omit<ToastItem, 'id'> & { id?: string }) => string

const ToastContext = createContext<PushToast | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, push, dismiss } = useToastQueue()
  return (
    <ToastContext.Provider value={push}>
      {children}
      <Toaster toasts={toasts} onDismiss={dismiss} position="bottom-right" />
    </ToastContext.Provider>
  )
}

export function useToast(): PushToast {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
