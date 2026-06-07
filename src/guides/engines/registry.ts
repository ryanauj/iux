// ABOUTME: registry — part of the guides area.

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

// ABOUTME: ENGINE_GUIDES — an exported value.
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

// ABOUTME: EngineGuideId — a type alias.
export type EngineGuideId = keyof typeof ENGINE_GUIDES

// ABOUTME: ENGINE_GUIDE_IDS — an exported value.
export const ENGINE_GUIDE_IDS = Object.keys(ENGINE_GUIDES) as EngineGuideId[]
