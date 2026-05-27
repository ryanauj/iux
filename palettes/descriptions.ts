/**
 * Style-description registry. Mirrors `palettes/index.ts` but as a
 * `Partial<Record<PaletteId, StyleDescription>>` — unpopulated palettes
 * are simply absent. The quiz UI and doc generator treat absence as
 * "skip this one." Populate by adding a `<id>.description.ts` file
 * and an entry below.
 */
import type { StyleDescription } from '../tokens/style-description.contract'
import type { PaletteId } from './index'

import { description as aaa } from './aaa.description'
import { description as academic } from './academic.description'
import { description as aeroGlass } from './aero-glass.description'
import { description as artDeco } from './art-deco.description'
import { description as aurora } from './aurora.description'
import { description as bauhaus } from './bauhaus.description'
import { description as blueprint } from './blueprint.description'
import { description as brutalistElegant } from './brutalist-elegant.description'
import { description as bulletTrainDay } from './bullet-train-day.description'
import { description as cardstockLayered } from './cardstock-layered.description'
import { description as celShadedShojo } from './cel-shaded-shojo.description'
import { description as celShadedShonen } from './cel-shaded-shonen.description'
import { description as claymorphism } from './claymorphism.description'
import { description as crtPhosphorAmber } from './crt-phosphor-amber.description'
import { description as crtPhosphorGreen } from './crt-phosphor-green.description'
import { description as cyberpunkNeonNoir } from './cyberpunk-neon-noir.description'
import { description as dataDenseLight } from './data-dense-light.description'
import { description as desertModernism } from './desert-modernism.description'
import { description as dieterRams } from './dieter-rams.description'
import { description as editorial } from './editorial.description'
import { description as financialTerminal } from './financial-terminal.description'
import { description as flatClassic } from './flat-classic.description'
import { description as frutigerAero } from './frutiger-aero.description'
import { description as glassmorphism } from './glassmorphism.description'
import { description as graffitiMarble } from './graffiti-marble.description'
import { description as heritageMaritime } from './heritage-maritime.description'
import { description as industrialLight } from './industrial-light.description'
import { description as letterpress } from './letterpress.description'
import { description as liquidGlassDark } from './liquid-glass-dark.description'
import { description as liquidGlassLight } from './liquid-glass-light.description'
import { description as mallGoth } from './mall-goth.description'
import { description as marbleRoyalFlat } from './marble-royal-flat.description'
import { description as material } from './material.description'
import { description as memphis80s } from './memphis-80s.description'
import { description as metroLight } from './metro-light.description'
import { description as midCenturyModern } from './mid-century-modern.description'
import { description as modernRoyal } from './modern-royal.description'
import { description as neubrutalism } from './neubrutalism.description'
import { description as neumorphism } from './neumorphism.description'
import { description as newspaper } from './newspaper.description'
import { description as pixelArtCottagecore } from './pixel-art-cottagecore.description'
import { description as pixelArtGameboy } from './pixel-art-gameboy.description'
import { description as pixelArtHyperlight } from './pixel-art-hyperlight.description'
import { description as pixelArtNes } from './pixel-art-nes.description'
import { description as pixelArtPico8 } from './pixel-art-pico8.description'
import { description as pixelArtSnes } from './pixel-art-snes.description'
import { description as risograph } from './risograph.description'
import { description as scandinavianRoyalModern } from './scandinavian-royal-modern.description'
import { description as sketchMarker } from './sketch-marker.description'
import { description as skeuomorphism } from './skeuomorphism.description'
import { description as solarpunk } from './solarpunk.description'
import { description as stainedGlass } from './stained-glass.description'
import { description as swissInternational } from './swiss-international.description'
import { description as terminalTui } from './terminal-tui.description'
import { description as tokyoDay } from './tokyo-day.description'
import { description as tronDarkNeon } from './tron-dark-neon.description'
import { description as vaporwave } from './vaporwave.description'
import { description as wikipedia } from './wikipedia.description'
import { description as zenSumie } from './zen-sumie.description'

export const descriptions: Partial<Record<PaletteId, StyleDescription>> = {
  aaa,
  academic,
  'aero-glass': aeroGlass,
  'art-deco': artDeco,
  aurora,
  bauhaus,
  blueprint,
  'brutalist-elegant': brutalistElegant,
  'bullet-train-day': bulletTrainDay,
  'cardstock-layered': cardstockLayered,
  'cel-shaded-shojo': celShadedShojo,
  'cel-shaded-shonen': celShadedShonen,
  claymorphism,
  'crt-phosphor-amber': crtPhosphorAmber,
  'crt-phosphor-green': crtPhosphorGreen,
  'cyberpunk-neon-noir': cyberpunkNeonNoir,
  'data-dense-light': dataDenseLight,
  'desert-modernism': desertModernism,
  'dieter-rams': dieterRams,
  editorial,
  'financial-terminal': financialTerminal,
  'flat-classic': flatClassic,
  'frutiger-aero': frutigerAero,
  glassmorphism,
  'graffiti-marble': graffitiMarble,
  'heritage-maritime': heritageMaritime,
  'industrial-light': industrialLight,
  letterpress,
  'liquid-glass-dark': liquidGlassDark,
  'liquid-glass-light': liquidGlassLight,
  'mall-goth': mallGoth,
  'marble-royal-flat': marbleRoyalFlat,
  material,
  'memphis-80s': memphis80s,
  'metro-light': metroLight,
  'mid-century-modern': midCenturyModern,
  'modern-royal': modernRoyal,
  neubrutalism,
  neumorphism,
  newspaper,
  'pixel-art-cottagecore': pixelArtCottagecore,
  'pixel-art-gameboy': pixelArtGameboy,
  'pixel-art-hyperlight': pixelArtHyperlight,
  'pixel-art-nes': pixelArtNes,
  'pixel-art-pico8': pixelArtPico8,
  'pixel-art-snes': pixelArtSnes,
  risograph,
  'scandinavian-royal-modern': scandinavianRoyalModern,
  'sketch-marker': sketchMarker,
  skeuomorphism,
  solarpunk,
  'stained-glass': stainedGlass,
  'swiss-international': swissInternational,
  'terminal-tui': terminalTui,
  'tokyo-day': tokyoDay,
  'tron-dark-neon': tronDarkNeon,
  vaporwave,
  wikipedia,
  'zen-sumie': zenSumie,
}

export type DescribedPaletteId = keyof typeof descriptions
