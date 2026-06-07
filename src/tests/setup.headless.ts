// ABOUTME: jsdom polyfills for the headless integration harness.

/**
 * jsdom polyfills for the headless integration harness.
 *
 * jsdom renders the DOM tree but skips layout and a couple of observer APIs.
 * None of our step assertions care about geometry (they check existence,
 * text, and presence/absence), so no-op stubs are enough to let the involved
 * components mount without throwing:
 *
 *   - ResizeObserver       — Pagination measures button widths for overflow.
 *   - IntersectionObserver — Tabs tracks which tab is in view.
 *
 * requestAnimationFrame exists under jsdom's "pretend to be visual" mode, but
 * we shim it defensively since runner.ts leans on it to flush React updates.
 */

class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

const g = globalThis as Record<string, unknown>

if (!g.ResizeObserver) g.ResizeObserver = NoopObserver
if (!g.IntersectionObserver) g.IntersectionObserver = NoopObserver

if (typeof g.requestAnimationFrame !== 'function') {
  g.requestAnimationFrame = (cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 0) as unknown as number
  g.cancelAnimationFrame = (id: number) => clearTimeout(id)
}

// jsdom doesn't implement scrollIntoView; a couple of components call it.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}
