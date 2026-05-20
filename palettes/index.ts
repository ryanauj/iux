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
} as const

export type PaletteId = keyof typeof palettes
