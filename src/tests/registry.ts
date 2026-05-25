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
import type { IntegrationTest } from './types'

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
]

export function findTest(id: string): IntegrationTest | undefined {
  return INTEGRATION_TESTS.find(t => t.id === id)
}

/** All component ids referenced by at least one test, in stable order. */
export function involvedComponentIds(): string[] {
  const seen = new Set<string>()
  for (const t of INTEGRATION_TESTS) for (const c of t.components) seen.add(c)
  return Array.from(seen)
}
