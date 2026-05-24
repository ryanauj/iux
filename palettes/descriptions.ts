/**
 * Style-description registry. Mirrors `palettes/index.ts` but as a
 * `Partial<Record<PaletteId, StyleDescription>>` — unpopulated palettes
 * are simply absent. The quiz UI and doc generator treat absence as
 * "skip this one." Populate by adding a `<id>.description.ts` file
 * and an entry below.
 */
import type { StyleDescription } from '../tokens/style-description.contract'
import type { PaletteId } from './index'

import { description as flatClassic } from './flat-classic.description'
import { description as glassmorphism } from './glassmorphism.description'
import { description as aeroGlass } from './aero-glass.description'
import { description as pixelArtNes } from './pixel-art-nes.description'

export const descriptions: Partial<Record<PaletteId, StyleDescription>> = {
  'flat-classic': flatClassic,
  glassmorphism,
  'aero-glass': aeroGlass,
  'pixel-art-nes': pixelArtNes,
}

export type DescribedPaletteId = keyof typeof descriptions
