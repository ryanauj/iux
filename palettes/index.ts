import { palette as flatClassic } from './flat-classic'
import { palette as material } from './material'
import { palette as neubrutalism } from './neubrutalism'
import { palette as glassmorphism } from './glassmorphism'
import { palette as neumorphism } from './neumorphism'
import { palette as claymorphism } from './claymorphism'
import { palette as skeuomorphism } from './skeuomorphism'
import { palette as tronDarkNeon } from './tron-dark-neon'
import { palette as editorial } from './editorial'
import { palette as aaa } from './aaa'
import { palette as liquidGlassLight } from './liquid-glass-light'
import { palette as liquidGlassDark } from './liquid-glass-dark'
import { palette as aeroGlass } from './aero-glass'
import { palette as frutigerAero } from './frutiger-aero'
import { palette as cyberpunkNeonNoir } from './cyberpunk-neon-noir'
import { palette as vaporwave } from './vaporwave'
import { palette as memphis80s } from './memphis-80s'
import { palette as swissInternational } from './swiss-international'
import { palette as bauhaus } from './bauhaus'
import { palette as mallGoth } from './mall-goth'
import { palette as newspaper } from './newspaper'
import { palette as academic } from './academic'
import { palette as crtPhosphorGreen } from './crt-phosphor-green'
import { palette as crtPhosphorAmber } from './crt-phosphor-amber'
import { palette as pixelArtNes } from './pixel-art-nes'
import { palette as pixelArtGameboy } from './pixel-art-gameboy'
import { palette as pixelArtCottagecore } from './pixel-art-cottagecore'
import { palette as pixelArtPico8 } from './pixel-art-pico8'
import { palette as pixelArtSnes } from './pixel-art-snes'
import { palette as pixelArtHyperlight } from './pixel-art-hyperlight'
import { palette as sketchMarker } from './sketch-marker'
import { palette as wikipedia } from './wikipedia'
import { palette as brutalistElegant } from './brutalist-elegant'
import { palette as bloombergTerminal } from './bloomberg-terminal'
import { palette as midCenturyModern } from './mid-century-modern'
import { palette as dataDenseLight } from './data-dense-light'

export const palettes = {
  'flat-classic': flatClassic,
  material,
  neubrutalism,
  glassmorphism,
  neumorphism,
  claymorphism,
  skeuomorphism,
  'tron-dark-neon': tronDarkNeon,
  editorial,
  aaa,
  'liquid-glass-light': liquidGlassLight,
  'liquid-glass-dark': liquidGlassDark,
  'aero-glass': aeroGlass,
  'frutiger-aero': frutigerAero,
  'cyberpunk-neon-noir': cyberpunkNeonNoir,
  vaporwave,
  'memphis-80s': memphis80s,
  'swiss-international': swissInternational,
  bauhaus,
  'mall-goth': mallGoth,
  newspaper,
  academic,
  'crt-phosphor-green': crtPhosphorGreen,
  'crt-phosphor-amber': crtPhosphorAmber,
  'pixel-art-nes': pixelArtNes,
  'pixel-art-gameboy': pixelArtGameboy,
  'pixel-art-cottagecore': pixelArtCottagecore,
  'pixel-art-pico8': pixelArtPico8,
  'pixel-art-snes': pixelArtSnes,
  'pixel-art-hyperlight': pixelArtHyperlight,
  'sketch-marker': sketchMarker,
  wikipedia,
  'brutalist-elegant': brutalistElegant,
  'bloomberg-terminal': bloombergTerminal,
  'mid-century-modern': midCenturyModern,
  'data-dense-light': dataDenseLight,
} as const

export type PaletteId = keyof typeof palettes
