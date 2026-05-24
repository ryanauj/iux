import { commandPaletteFilter } from './definitions/command-palette'
import { formSubmitToast } from './definitions/form-submit-toast'
import { modalWithForm } from './definitions/modal-with-form'
import type { IntegrationTest } from './types'

export const INTEGRATION_TESTS: readonly IntegrationTest[] = [
  formSubmitToast,
  modalWithForm,
  commandPaletteFilter,
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
