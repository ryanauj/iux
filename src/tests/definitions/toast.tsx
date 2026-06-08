// ABOUTME: Integration tests for the Toast component covering four ladder rungs: plain toast pushed and manually closed (rung 1), action variant with inline Undo button (rung 2), severity-ordered stack puts danger at the top regardless of insertion order (rung 3), and progress variant renders a progress bar that persists after update (rung 4); inline rendering keeps portals inside the sandbox.

// Toast ladder rungs: plain (auto-dismiss + manual close), action (inline
// undo), severity (severity-ordered stack), progress (progress bar tied to a
// real number). Inline rendering keeps the portal inside the sandbox so the
// runner can find toast DOM with normal selectors.
import { useState } from 'react'
import { Toast, Toaster, useToastQueue, type ToastItem } from '../../components/Toast/Toast'
import type { IntegrationTest } from '../types'

// ABOUTME: Sandbox composition for the plain-toast test: a push button wired to useToastQueue and an inline Toaster, used to assert manual close.
function PlainComposition() {
  const { toasts, push, dismiss } = useToastQueue()
  return (
    <div style={{ position: 'relative', minHeight: 160 }}>
      <button data-testid="push" onClick={() => push({ title: 'Saved', intent: 'success', durationMs: 0 })}>
        push
      </button>
      <Toaster toasts={toasts} onDismiss={dismiss} inlineRender position="top-right" />
    </div>
  )
}

// ABOUTME: Sandbox composition for the action-toast test: a single Toast rendered with action variant and an Undo button that increments an undo counter.
function ActionComposition() {
  const [undid, setUndid] = useState(0)
  const item: ToastItem = {
    id: 'a1',
    variant: 'action',
    intent: 'info',
    title: 'Deleted item',
    durationMs: 0,
    action: { label: 'Undo', onClick: () => setUndid(c => c + 1) },
  }
  return (
    <div style={{ position: 'relative', minHeight: 120 }}>
      <Toast {...item} inlineRender />
      <span data-testid="undid">{undid}</span>
    </div>
  )
}

// ABOUTME: Sandbox composition for the severity-ordering test: a Toaster with three severity toasts (success, danger, warning) and severityOrder enabled.
function SeverityComposition() {
  const initial: ToastItem[] = [
    { id: '1', variant: 'severity', intent: 'success', title: 'Success message', durationMs: 0 },
    { id: '2', variant: 'severity', intent: 'danger', title: 'Critical error', durationMs: 0 },
    { id: '3', variant: 'severity', intent: 'warning', title: 'Heads up', durationMs: 0 },
  ]
  const [toasts, setToasts] = useState<ToastItem[]>(initial)
  return (
    <div style={{ position: 'relative', minHeight: 240 }}>
      <Toaster
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
        inlineRender
        severityOrder
        position="top-right"
      />
    </div>
  )
}

// ABOUTME: Sandbox composition for the progress-bar toast test: a single progress Toast at 0.25 with a bump button that advances the progress value.
function ProgressComposition() {
  const [progress, setProgress] = useState(0.25)
  const item: ToastItem = {
    id: 'p1',
    variant: 'progress',
    intent: 'info',
    title: 'Uploading…',
    durationMs: 0,
    progress,
  }
  return (
    <div style={{ position: 'relative', minHeight: 120 }}>
      <Toast {...item} inlineRender />
      <button data-testid="bump" onClick={() => setProgress(p => Math.min(1, p + 0.5))}>bump</button>
    </div>
  )
}

// ABOUTME: Array of four IntegrationTest definitions for Toast: plain push and close, action Undo button, severity-ordered stack, and progress bar.
export const toastTests: IntegrationTest[] = [
  {
    id: 'toast-rung-1-manual-close',
    name: 'Toast — manual close dismisses (rung 1)',
    description: 'Pushing a plain toast renders it; clicking × removes it from the stack.',
    components: ['toast'],
    tags: ['toast', 'rung-1', 'overlay'],
    render: () => <PlainComposition />,
    steps: [
      { kind: 'click', selector: '[data-testid="push"]', label: 'Push toast' },
      { kind: 'waitFor', selector: '.iux-toast__title', label: 'Wait for toast' },
      { kind: 'assertText', selector: '.iux-toast__title', text: 'Saved', label: 'Title visible' },
      { kind: 'click', selector: '.iux-toast__close', label: 'Click close' },
      { kind: 'assertGone', selector: '.iux-toast__title', label: 'Toast gone' },
    ],
  },
  {
    id: 'toast-rung-2-action',
    name: 'Toast — inline action fires and dismisses (rung 2)',
    description: 'Action variant renders an inline button; clicking it invokes the handler and removes the toast.',
    components: ['toast'],
    tags: ['toast', 'rung-2', 'overlay'],
    render: () => <ActionComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-toast--action', label: 'Action variant class' },
      { kind: 'assertText', selector: '.iux-toast__action', text: 'Undo', label: 'Undo button' },
      { kind: 'click', selector: '.iux-toast__action', label: 'Click Undo' },
      { kind: 'assertText', selector: '[data-testid="undid"]', text: '1', label: 'Undo fired' },
    ],
  },
  {
    id: 'toast-rung-3-severity',
    name: 'Toast — severity stack orders danger before info (rung 3)',
    description: 'Severity-ordered stack puts danger toasts at the top regardless of insertion order.',
    components: ['toast'],
    tags: ['toast', 'rung-3', 'overlay'],
    render: () => <SeverityComposition />,
    steps: [
      { kind: 'assertCount', selector: '.iux-toast--severity', count: 3, label: 'Three severity toasts' },
      { kind: 'assertText', selector: '.iux-toast-stack .iux-toast:first-child .iux-toast__title', text: 'Critical error', label: 'Danger pinned to top' },
      { kind: 'assertVisible', selector: '.iux-toast--intent-danger[role="alert"]', label: 'Danger uses role=alert' },
      { kind: 'assertVisible', selector: '.iux-toast--intent-success[role="status"]', label: 'Success uses role=status' },
    ],
  },
  {
    id: 'toast-rung-4-progress',
    name: 'Toast — progress bar reflects real number (rung 4)',
    description: 'Progress variant renders a progress bar element whose width tracks the progress prop.',
    components: ['toast'],
    tags: ['toast', 'rung-4', 'overlay'],
    render: () => <ProgressComposition />,
    steps: [
      { kind: 'assertVisible', selector: '.iux-toast--progress', label: 'Progress variant class' },
      { kind: 'assertVisible', selector: '.iux-toast__progress', label: 'Progress bar element' },
      { kind: 'click', selector: '[data-testid="bump"]', label: 'Bump progress' },
      { kind: 'assertVisible', selector: '.iux-toast__progress', label: 'Progress bar persists' },
    ],
  },
]
