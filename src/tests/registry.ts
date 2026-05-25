// ABOUTME: Central registry of all integration tests: assembles the master INTEGRATION_TESTS array from per-component definition files and exposes lookup helpers consumed by the runner and visualizations.

import { commandPaletteFilter } from './definitions/command-palette'
import { formSubmitToast } from './definitions/form-submit-toast'
import { modalWithForm } from './definitions/modal-with-form'
import { buttonTests } from './definitions/button'
import { textInputTests } from './definitions/text-input'
import { toggleTests } from './definitions/toggle'
import { checkboxTests } from './definitions/checkbox'
import { sliderTests } from './definitions/slider'
import { cardTests } from './definitions/card'
import { modalTests } from './definitions/modal'
import { tabsTests } from './definitions/tabs'
import { toastTests } from './definitions/toast'
import { paginationTests } from './definitions/pagination'
import { emptyStateTests } from './definitions/empty-state'
import { selectTests } from './definitions/select'
import { tooltipTests } from './definitions/tooltip'
import { datePickerTests } from './definitions/date-picker'
import { sidebarTests } from './definitions/sidebar'
import { loadingTests } from './definitions/loading'
import { tableTests } from './definitions/table'
import { tokenFieldTests } from './definitions/token-field'
import { drawerTests } from './definitions/drawer'
import type { IntegrationTest } from './types'

// ABOUTME: Ordered master list of all integration tests — composition flows first (form-submit, modal-with-form, command-palette) then per-component ladder-rung suites — read by the runner, TestsViz, and CoverageViz.
export const INTEGRATION_TESTS: readonly IntegrationTest[] = [
  // Composition tests (multi-component flows)
  formSubmitToast,
  modalWithForm,
  commandPaletteFilter,
  // Per-component, per-ladder-rung tests
  ...buttonTests,
  ...textInputTests,
  ...toggleTests,
  ...checkboxTests,
  ...sliderTests,
  ...cardTests,
  ...modalTests,
  ...tabsTests,
  ...toastTests,
  ...paginationTests,
  ...emptyStateTests,
  ...selectTests,
  ...tooltipTests,
  ...datePickerTests,
  ...sidebarTests,
  ...loadingTests,
  ...tableTests,
  ...tokenFieldTests,
  ...drawerTests,
]

// ABOUTME: Look up a single test by its id string, returning undefined when not found; used by CoverageViz and the autorun loop.
export function findTest(id: string): IntegrationTest | undefined {
  return INTEGRATION_TESTS.find(t => t.id === id)
}

// ABOUTME: Return deduplicated component ids that appear in at least one test's `components` array, in insertion order — used by CoverageViz to build its matrix columns and network nodes.
/** Return deduplicated component ids that appear in at least one test's `components` array, in insertion order — used by CoverageViz to build its matrix columns and network nodes. */
export function involvedComponentIds(): string[] {
  const seen = new Set<string>()
  for (const t of INTEGRATION_TESTS) for (const c of t.components) seen.add(c)
  return Array.from(seen)
}
