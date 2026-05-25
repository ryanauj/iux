import { flatGuide } from './flat'
import { materialGuide } from './material'
import { neubrutalismGuide } from './neubrutalism'
import { glassmorphismGuide } from './glassmorphism'
import type { EngineGuideMeta } from './types'

export const ENGINE_GUIDES = {
  flat: flatGuide,
  material: materialGuide,
  neubrutalism: neubrutalismGuide,
  glassmorphism: glassmorphismGuide,
} satisfies Record<string, EngineGuideMeta>

export type EngineGuideId = keyof typeof ENGINE_GUIDES

export const ENGINE_GUIDE_IDS = Object.keys(ENGINE_GUIDES) as EngineGuideId[]
