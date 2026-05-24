import type { IntegrationTest, RunResult, Step, StepResult } from './types'

export interface RunOptions {
  /** Delay between steps in ms, for human-watchable execution. 0 = as fast as possible. */
  stepDelayMs?: number
  /** Called as each step transitions state. */
  onStep?: (index: number, result: StepResult) => void
  /** Abort signal to cancel mid-run. */
  signal?: AbortSignal
}

const DEFAULT_TIMEOUT_MS = 2000

/**
 * Drive a test's steps against a mounted DOM root.
 *
 * Selectors are scoped to `root`, not `document` — every test composition is
 * self-contained, and overlay components (Modal, Toast, CommandPalette) are
 * mounted with `inlineRender` so portals stay inside the sandbox.
 */
export async function runTest(
  test: IntegrationTest,
  root: HTMLElement,
  options: RunOptions = {},
): Promise<RunResult> {
  const { stepDelayMs = 0, onStep, signal } = options
  const startedAt = Date.now()
  const results: StepResult[] = test.steps.map(step => ({ step, status: 'pending' }))

  for (let i = 0; i < test.steps.length; i++) {
    if (signal?.aborted) {
      results[i] = { step: test.steps[i], status: 'failed', error: 'Aborted' }
      onStep?.(i, results[i])
      break
    }

    results[i] = { step: test.steps[i], status: 'running' }
    onStep?.(i, results[i])

    const stepStart = performance.now()
    try {
      await executeStep(test.steps[i], root)
      results[i] = {
        step: test.steps[i],
        status: 'passed',
        ms: performance.now() - stepStart,
      }
    } catch (err) {
      results[i] = {
        step: test.steps[i],
        status: 'failed',
        error: err instanceof Error ? err.message : String(err),
        ms: performance.now() - stepStart,
      }
      onStep?.(i, results[i])
      break
    }
    onStep?.(i, results[i])

    if (stepDelayMs > 0) await sleep(stepDelayMs)
  }

  const passed = results.every(r => r.status === 'passed')
  return {
    testId: test.id,
    passed,
    steps: results,
    totalMs: Date.now() - startedAt,
    startedAt,
  }
}

async function executeStep(step: Step, root: HTMLElement): Promise<void> {
  switch (step.kind) {
    case 'click': {
      const el = mustFind<HTMLElement>(root, step.selector)
      el.click()
      await flush()
      return
    }
    case 'type': {
      const el = mustFind<HTMLInputElement | HTMLTextAreaElement>(root, step.selector)
      setReactInputValue(el, step.text)
      await flush()
      return
    }
    case 'press': {
      const el = step.selector ? mustFind<HTMLElement>(root, step.selector) : root
      const init: KeyboardEventInit = {
        key: step.key,
        bubbles: true,
        cancelable: true,
        ctrlKey: step.modifiers?.includes('ctrl'),
        metaKey: step.modifiers?.includes('meta'),
        shiftKey: step.modifiers?.includes('shift'),
        altKey: step.modifiers?.includes('alt'),
      }
      el.dispatchEvent(new KeyboardEvent('keydown', init))
      el.dispatchEvent(new KeyboardEvent('keyup', init))
      await flush()
      return
    }
    case 'waitFor': {
      await waitForSelector(root, step.selector, step.timeoutMs ?? DEFAULT_TIMEOUT_MS)
      return
    }
    case 'assertVisible': {
      const el = root.querySelector(step.selector)
      if (!el) throw new Error(`Expected visible: ${step.selector}`)
      return
    }
    case 'assertText': {
      const el = mustFind<HTMLElement>(root, step.selector)
      const actual = (el.textContent ?? '').trim()
      if (!actual.includes(step.text)) {
        throw new Error(`Expected text "${step.text}" in ${step.selector}, got "${actual}"`)
      }
      return
    }
    case 'assertCount': {
      const count = root.querySelectorAll(step.selector).length
      if (count !== step.count) {
        throw new Error(`Expected ${step.count} of ${step.selector}, got ${count}`)
      }
      return
    }
    case 'assertGone': {
      const el = root.querySelector(step.selector)
      if (el) throw new Error(`Expected gone: ${step.selector}`)
      return
    }
  }
}

function mustFind<T extends Element>(root: HTMLElement, selector: string): T {
  const el = root.querySelector<T>(selector)
  if (!el) throw new Error(`Element not found: ${selector}`)
  return el
}

/**
 * React tracks controlled input values via a native setter on the prototype.
 * Setting `el.value = x` directly bypasses React's change detection — we have
 * to invoke the prototype setter and dispatch an `input` event manually.
 */
function setReactInputValue(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set
  if (!setter) throw new Error('Could not access native input setter')
  setter.call(el, value)
  el.dispatchEvent(new Event('input', { bubbles: true }))
}

async function waitForSelector(root: HTMLElement, selector: string, timeoutMs: number): Promise<void> {
  const deadline = performance.now() + timeoutMs
  while (performance.now() < deadline) {
    if (root.querySelector(selector)) return
    await sleep(16)
  }
  throw new Error(`Timed out waiting for: ${selector}`)
}

/** Let React commit pending updates before the next step. */
function flush(): Promise<void> {
  return new Promise(resolve => requestAnimationFrame(() => resolve()))
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function summarizeResults(results: RunResult[]): { total: number; passed: number; failed: number } {
  return {
    total: results.length,
    passed: results.filter(r => r.passed).length,
    failed: results.filter(r => !r.passed).length,
  }
}
