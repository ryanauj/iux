import { flatGuide } from './flat'
import { materialGuide } from './material'
import { neubrutalismGuide } from './neubrutalism'
import { glassmorphismGuide } from './glassmorphism'
import { neumorphismGuide } from './neumorphism'
import { claymorphismGuide } from './claymorphism'
import { skeuomorphismGuide } from './skeuomorphism'
import type { EngineGuideMeta } from './types'

export const ENGINE_GUIDES = {
  flat: flatGuide,
  material: materialGuide,
  neubrutalism: neubrutalismGuide,
  glassmorphism: glassmorphismGuide,
  neumorphism: neumorphismGuide,
  claymorphism: claymorphismGuide,
  skeuomorphism: skeuomorphismGuide,
} satisfies Record<string, EngineGuideMeta>

export type EngineGuideId = keyof typeof ENGINE_GUIDES

export const ENGINE_GUIDE_IDS = Object.keys(ENGINE_GUIDES) as EngineGuideId[]
