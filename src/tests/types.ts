import type { ReactNode } from 'react'

export type Step =
  | { kind: 'click'; selector: string; label?: string }
  | { kind: 'type'; selector: string; text: string; label?: string }
  | { kind: 'press'; key: string; modifiers?: Array<'ctrl' | 'meta' | 'shift' | 'alt'>; selector?: string; label?: string }
  | { kind: 'waitFor'; selector: string; timeoutMs?: number; label?: string }
  | { kind: 'assertVisible'; selector: string; label?: string }
  | { kind: 'assertText'; selector: string; text: string; label?: string }
  | { kind: 'assertCount'; selector: string; count: number; label?: string }
  | { kind: 'assertGone'; selector: string; label?: string }

export type StepStatus = 'pending' | 'running' | 'passed' | 'failed'

export interface StepResult {
  step: Step
  status: StepStatus
  error?: string
  ms?: number
}

export interface RunResult {
  testId: string
  passed: boolean
  steps: StepResult[]
  totalMs: number
  startedAt: number
}

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
