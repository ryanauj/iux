import type { PaletteId } from '../../palettes'

export type StimulusKind = 'components' | 'visualizations' | 'app'

export interface IdentifyQuestion {
  target: PaletteId
  stimulus: StimulusKind
  /** Four palette IDs, one of which is the target. */
  options: PaletteId[]
  correctIndex: number
}
