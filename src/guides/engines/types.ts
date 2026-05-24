import type { ReactNode } from 'react'
import type { Engine, Palette } from '../../../tokens/semantic.contract'

export interface EngineStep {
  id: string
  title: string
  description?: string
  /** Prose for the step. Lives outside the palette boundary. */
  body: ReactNode
  /** Interactive demo. Rendered inside a PaletteRoot bound to `EngineGuideMeta.demoPalette`. */
  demo: ReactNode
}

export interface EngineGuideMeta {
  engine: Engine
  /** Display name (e.g. "Flat"). */
  name: string
  /** One-paragraph summary shown in the EnginesIndex and the guide header. */
  summary: string
  /** The palette the walkthrough uses to show every step's demo. */
  demoPalette: Palette
  steps: EngineStep[]
}
