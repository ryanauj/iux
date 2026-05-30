import { afterEach, describe, expect, it } from 'vitest'
import { createRoot, type Root } from 'react-dom/client'
import { INTEGRATION_TESTS } from './registry'
import { runTest } from './runner'

/**
 * Headless run of every integration test.
 *
 * Each test owns a self-contained composition (`test.render()`) and a list of
 * steps. We mount the composition into a fresh container, hand the container
 * to the same `runTest` driver the in-app Coverage page uses, and assert the
 * run passed. If a step fails, its recorded error becomes the assertion
 * message so the report points straight at the broken step.
 */

let host: HTMLDivElement
let root: Root

afterEach(() => {
  root?.unmount()
  host?.remove()
})

// Let React commit the initial render before the first step queries the DOM.
const flush = () =>
  new Promise<void>(resolve =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  )

describe('integration tests', () => {
  for (const test of INTEGRATION_TESTS) {
    it(test.id, async () => {
      host = document.createElement('div')
      document.body.appendChild(host)
      root = createRoot(host)
      root.render(test.render())
      await flush()

      const result = await runTest(test, host)

      const failed = result.steps.find(s => s.status === 'failed')
      expect(failed?.error ?? (result.passed ? null : 'unknown failure')).toBeNull()
      expect(result.passed).toBe(true)
    })
  }
})
