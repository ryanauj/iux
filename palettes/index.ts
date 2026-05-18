import { palette as flatClassic } from './flat-classic'
import { palette as neubrutalism } from './neubrutalism'
import { palette as aaa } from './aaa'

export const palettes = {
  'flat-classic': flatClassic,
  neubrutalism,
  aaa,
} as const

export type PaletteId = keyof typeof palettes
