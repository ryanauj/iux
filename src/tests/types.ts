// ABOUTME: types — part of the tests area.

import type { ReactNode } from 'react'

// ABOUTME: Step — a type alias.
export type Step =
  | { kind: 'click'; selector: string; label?: string }
  | { kind: 'type'; selector: string; text: string; label?: string }
  | { kind: 'press'; key: string; modifiers?: Array<'ctrl' | 'meta' | 'shift' | 'alt'>; selector?: string; label?: string }
  | { kind: 'waitFor'; selector: string; timeoutMs?: number; label?: string }
  | { kind: 'assertVisible'; selector: string; label?: string }
  | { kind: 'assertText'; selector: string; text: string; label?: string }
  | { kind: 'assertCount'; selector: string; count: number; label?: string }
  | { kind: 'assertGone'; selector: string; label?: string }

// ABOUTME: StepStatus — a type alias.
export type StepStatus = 'pending' | 'running' | 'passed' | 'failed'

// ABOUTME: StepResult — an interface.
export interface StepResult {
  step: Step
  status: StepStatus
  error?: string
  ms?: number
}

// ABOUTME: RunResult — an interface.
export interface RunResult {
  testId: string
  passed: boolean
  steps: StepResult[]
  totalMs: number
  startedAt: number
}

// ABOUTME: IntegrationTest — an interface.
export interface IntegrationTest {
  id: string
  name: string
  description: string
  /** Component ids from src/showcase/components.tsx that this test exercises. */
  components: string[]
  tags?: string[]
  /** Mount a composition of components for this test. */
  render: () => ReactNode
  steps: Step[]
}
