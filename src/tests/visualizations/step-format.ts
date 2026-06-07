// ABOUTME: Formatting helpers for Step values used by TestsViz: describeStep produces a dense one-liner for compact list rows, bubbleLabel extracts a short label for storyboard bubbles (which display kind separately), and stepIcon maps each step kind to a glyph.

import type { Step } from '../types'

// ABOUTME: Format a Step as a dense one-liner including its kind — used by the compact list and live step rows in TestsViz.
/** One-line description that includes the kind context. Used in dense step rows. */
export function describeStep(step: Step): string {
  switch (step.kind) {
    case 'click': return `click ${step.selector}`
    case 'type': return `type "${step.text}" → ${step.selector}`
    case 'press': return `press ${step.key}${step.modifiers ? ` (+${step.modifiers.join('+')})` : ''}`
    case 'waitFor': return `wait for ${step.selector}`
    case 'assertVisible': return `assert visible ${step.selector}`
    case 'assertText': return `assert text "${step.text}" in ${step.selector}`
    case 'assertCount': return `assert ${step.count} of ${step.selector}`
    case 'assertGone': return `assert gone ${step.selector}`
  }
}

// ABOUTME: Short label for a storyboard bubble — the bubble already shows the kind separately.
/** Short label for a storyboard bubble — the bubble already shows the kind separately. */
export function bubbleLabel(step: Step): string {
  switch (step.kind) {
    case 'click': return step.selector
    case 'type': return `"${step.text}"`
    case 'press': return step.key
    case 'waitFor': return step.selector
    case 'assertVisible': return step.selector
    case 'assertText': return `"${step.text}"`
    case 'assertCount': return `${step.count}× ${step.selector}`
    case 'assertGone': return step.selector
  }
}

// ABOUTME: Map each step kind to a single glyph used in storyboard bubbles in TestsViz (e.g. ▶ for click, ⌨ for type, ⏎ for press).
export function stepIcon(step: Step): string {
  switch (step.kind) {
    case 'click': return '▶'
    case 'type': return '⌨'
    case 'press': return '⏎'
    case 'waitFor': return '⏱'
    case 'assertVisible': return '👁'
    case 'assertText': return '✎'
    case 'assertCount': return '#'
    case 'assertGone': return '∅'
  }
}
