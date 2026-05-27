import type { ReactNode } from 'react'
import type { Engine, Palette } from '../../../tokens/semantic.contract'

export interface EngineStep {
  id: string
  title: string
  description?: string
  /** Plain-English title shown when the reader has the doc mode set to `plain`. */
  plainTitle?: string
  /** Technical prose for the step. Lives outside the palette boundary. */
  body: ReactNode
  /**
   * Everyday-English prose for the step — no CSS jargon. Shown when doc mode
   * is `plain`. Optional: engines without plain copy fall back to the
   * technical `body`.
   */
  plainBody?: ReactNode
  /** Interactive demo. Rendered inside a PaletteRoot bound to `EngineGuideMeta.demoPalette`. */
  demo: ReactNode
}

export interface EngineGuideMeta {
  engine: Engine
  /** Display name (e.g. "Flat"). */
  name: string
  /** Technical one-paragraph summary shown in the EnginesIndex and the guide header. */
  summary: string
  /**
   * Everyday-English one-paragraph summary. The default voice — talks about
   * how the engine feels, what it looks like to a reader, not which tokens
   * it sets. Optional: engines without plain copy fall back to `summary`.
   */
  plainSummary?: string
  /**
   * Optional one-line "if you compared two palettes, here's how this one
   * differs" line. Used in the engines index for at-a-glance scanning.
   */
  plainTeaser?: string
  /** The palette the walkthrough uses to show every step's demo. */
  demoPalette: Palette
  steps: EngineStep[]
}
