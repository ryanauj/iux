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
import { description as modernRoyal } from './modern-royal.description'
import { description as scandinavianRoyalModern } from './scandinavian-royal-modern.description'
import { description as marbleRoyalFlat } from './marble-royal-flat.description'
import { description as tokyoDay } from './tokyo-day.description'
import { description as bulletTrainDay } from './bullet-train-day.description'
import { description as metroLight } from './metro-light.description'
import { description as industrialLight } from './industrial-light.description'
import { description as graffitiMarble } from './graffiti-marble.description'
import { description as risograph } from './risograph.description'
import { description as letterpress } from './letterpress.description'
import { description as blueprint } from './blueprint.description'
import { description as dieterRams } from './dieter-rams.description'
import { description as artDeco } from './art-deco.description'
import { description as stainedGlass } from './stained-glass.description'
import { description as desertModernism } from './desert-modernism.description'
import { description as solarpunk } from './solarpunk.description'
import { description as heritageMaritime } from './heritage-maritime.description'
import { description as zenSumie } from './zen-sumie.description'

export const descriptions: Partial<Record<PaletteId, StyleDescription>> = {
  'flat-classic': flatClassic,
  glassmorphism,
  'aero-glass': aeroGlass,
  'pixel-art-nes': pixelArtNes,
  'modern-royal': modernRoyal,
  'scandinavian-royal-modern': scandinavianRoyalModern,
  'marble-royal-flat': marbleRoyalFlat,
  'tokyo-day': tokyoDay,
  'bullet-train-day': bulletTrainDay,
  'metro-light': metroLight,
  'industrial-light': industrialLight,
  'graffiti-marble': graffitiMarble,
  risograph,
  letterpress,
  blueprint,
  'dieter-rams': dieterRams,
  'art-deco': artDeco,
  'stained-glass': stainedGlass,
  'desert-modernism': desertModernism,
  solarpunk,
  'heritage-maritime': heritageMaritime,
  'zen-sumie': zenSumie,
}

export type DescribedPaletteId = keyof typeof descriptions
