import type { Palette } from '../../tokens/semantic.contract'
import { palette as base } from './palette-valid'

/**
 * Fixture: a deliberately-incomplete palette. Cloned from the valid fixture
 * then mutated to remove two required slots and empty out a third. The static
 * TS gate would catch this normally — we cast through `unknown` to mimic the
 * worst case (an `as any` smuggling a bad palette past type-checking) so the
 * runtime validator gets to do its job.
 */
const broken = JSON.parse(JSON.stringify(base.tokens))
delete broken.color.surface.scrim
delete broken.motion.duration.slow
broken.elevation.overlay.boxShadow = ''

export const palette = {
  ...base,
  id: 'fixture-invalid',
  name: 'Fixture (invalid)',
  tokens: broken,
} as unknown as Palette
