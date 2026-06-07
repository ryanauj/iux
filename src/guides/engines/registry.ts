// ABOUTME: Central registry that collects all fifteen per-engine EngineGuideMeta objects into ENGINE_GUIDES and derives the ENGINE_GUIDE_IDS tuple used by the router and EnginesIndex.

import { flatGuide } from './flat'
import { materialGuide } from './material'
import { neubrutalismGuide } from './neubrutalism'
import { glassmorphismGuide } from './glassmorphism'
import { neumorphismGuide } from './neumorphism'
import { claymorphismGuide } from './claymorphism'
import { skeuomorphismGuide } from './skeuomorphism'
import { crtPhosphorGuide } from './crt-phosphor'
import { pixelArtGuide } from './pixel-art'
import { sketchGuide } from './sketch'
import { cardstockGuide } from './cardstock'
import { celShadedGuide } from './cel-shaded'
import { celGlassGuide } from './cel-glass'
import { auroraGuide } from './aurora'
import { terminalTuiGuide } from './terminal-tui'
import type { EngineGuideMeta } from './types'

// ABOUTME: ENGINE_GUIDES — a keyed record mapping every engine id (e.g. 'flat', 'glassmorphism') to its EngineGuideMeta, consumed by EnginesIndex for the listing and by the per-engine route to pick the correct guide.
export const ENGINE_GUIDES = {
  flat: flatGuide,
  material: materialGuide,
  neubrutalism: neubrutalismGuide,
  glassmorphism: glassmorphismGuide,
  neumorphism: neumorphismGuide,
  claymorphism: claymorphismGuide,
  skeuomorphism: skeuomorphismGuide,
  'crt-phosphor': crtPhosphorGuide,
  'pixel-art': pixelArtGuide,
  sketch: sketchGuide,
  cardstock: cardstockGuide,
  'cel-shaded': celShadedGuide,
  'cel-glass': celGlassGuide,
  aurora: auroraGuide,
  'terminal-tui': terminalTuiGuide,
} satisfies Record<string, EngineGuideMeta>

// ABOUTME: EngineGuideId — a union of every valid engine guide key (e.g. 'flat' | 'material' | 'glassmorphism' | …), derived from ENGINE_GUIDES so the type automatically stays in sync with the registry.
export type EngineGuideId = keyof typeof ENGINE_GUIDES

// ABOUTME: ENGINE_GUIDE_IDS — the ordered array of every registered engine guide key, used by EnginesIndex to drive the full engine listing including availability checks.
export const ENGINE_GUIDE_IDS = Object.keys(ENGINE_GUIDES) as EngineGuideId[]
