// ABOUTME: Core types for the in-app integration test framework: Step (discriminated union of every action/assertion the runner can execute), StepResult (per-step outcome with timing), RunResult (full test outcome), and IntegrationTest (the definition shape registered in registry.ts).

import type { ReactNode } from 'react'

// ABOUTME: Discriminated union of every action and assertion the runner can execute against the sandbox DOM: click, type, press, waitFor, assertVisible, assertText, assertCount, and assertGone.
export type Step =
  | { kind: 'click'; selector: string; label?: string }
  | { kind: 'type'; selector: string; text: string; label?: string }
  | { kind: 'press'; key: string; modifiers?: Array<'ctrl' | 'meta' | 'shift' | 'alt'>; selector?: string; label?: string }
  | { kind: 'waitFor'; selector: string; timeoutMs?: number; label?: string }
  | { kind: 'assertVisible'; selector: string; label?: string }
  | { kind: 'assertText'; selector: string; text: string; label?: string }
  | { kind: 'assertCount'; selector: string; count: number; label?: string }
  | { kind: 'assertGone'; selector: string; label?: string }

// ABOUTME: The four lifecycle states a step moves through during a run: pending (not yet started), running (currently executing), passed (assertion met), or failed (threw or timed out).
export type StepStatus = 'pending' | 'running' | 'passed' | 'failed'

// ABOUTME: Per-step outcome returned by the runner: holds the original step definition, its final status, an optional error message, and optional wall-clock duration in milliseconds.
export interface StepResult {
  step: Step
  status: StepStatus
  error?: string
  ms?: number
}

// ABOUTME: Full outcome of a single test run: aggregated pass/fail, ordered per-step results, total wall-clock milliseconds, and the timestamp the run started — consumed by TestsViz and CoverageViz.
export interface RunResult {
  testId: string
  passed: boolean
  steps: StepResult[]
  totalMs: number
  startedAt: number
}

// ABOUTME: Definition shape for a single integration test: id, name, description, the component ids it exercises (used by CoverageViz), a render factory that mounts the composition, and the ordered steps the runner executes.
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
