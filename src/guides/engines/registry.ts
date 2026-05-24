import { flatGuide } from './flat'
import type { EngineGuideMeta } from './types'

export const ENGINE_GUIDES = {
  flat: flatGuide,
} satisfies Record<string, EngineGuideMeta>

export type EngineGuideId = keyof typeof ENGINE_GUIDES

export const ENGINE_GUIDE_IDS = Object.keys(ENGINE_GUIDES) as EngineGuideId[]
