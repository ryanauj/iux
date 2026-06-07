// ABOUTME: Types for the palette-identification quiz: StimulusKind (which display is shown to the user) and IdentifyQuestion (the full question object holding the target palette, stimulus kind, four shuffled option ids, and the index of the correct answer).

import type { PaletteId } from '../../palettes'

// ABOUTME: Discriminates what the quiz renders as the stimulus: a component grid from PaletteShowcase, a visualization grid from PaletteShowcase, or the full sports sample app.
export type StimulusKind = 'components' | 'visualizations' | 'app'

// ABOUTME: One quiz question: the target palette id, the stimulus kind shown, four shuffled candidate palette ids, and the index into options that is correct — produced by nextQuestion in generators.ts.
export interface IdentifyQuestion {
  target: PaletteId
  stimulus: StimulusKind
  /** Four palette IDs, one of which is the target. */
  options: PaletteId[]
  correctIndex: number
}
