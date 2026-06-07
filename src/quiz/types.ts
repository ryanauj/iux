// ABOUTME: types — part of the quiz area.

import type { PaletteId } from '../../palettes'

// ABOUTME: StimulusKind — a type alias.
export type StimulusKind = 'components' | 'visualizations' | 'app'

// ABOUTME: IdentifyQuestion — an interface.
export interface IdentifyQuestion {
  target: PaletteId
  stimulus: StimulusKind
  /** Four palette IDs, one of which is the target. */
  options: PaletteId[]
  correctIndex: number
}
