/**
 * Built-in palette groups bootstrapped into the picker on first load.
 *
 * Two flavours:
 *  - Engine groups: auto-derived one-per-engine, every palette lands in
 *    exactly one. Cover the full registry.
 *  - Mood groups: hand-authored cross-engine sets ("Glass", "Retro", …)
 *    so a single palette can appear in several.
 *
 * Plus an empty `Favorites` group as the star-button target.
 *
 * Users can add / remove members from any of these and their edits live
 * in localStorage; "Reset to defaults" wipes only the entries whose
 * names match the built-ins, leaving user-named groups untouched.
 */
import { palettes, type PaletteId } from './index'

export const FAVORITES_GROUP = 'Favorites'

const ENGINE_LABELS: Record<string, string> = {
  flat: 'Flat',
  material: 'Material',
  neubrutalism: 'Neubrutalism',
  glassmorphism: 'Glassmorphism',
  neumorphism: 'Neumorphism',
  claymorphism: 'Claymorphism',
  skeuomorphism: 'Skeuomorphism',
  'crt-phosphor': 'CRT Phosphor',
  'pixel-art': 'Pixel Art',
  sketch: 'Sketch',
  cardstock: 'Cardstock',
  'cel-shaded': 'Cel-Shaded',
  aurora: 'Aurora',
  'terminal-tui': 'Terminal',
}

/* Mood groups — curated, overlapping. Keep each list short enough to
 * scan but long enough to give the user a few palettes to cycle through
 * with the inline arrows. Only references real palette ids; filtered
 * against the registry in `buildDefaultGroups` so a typo doesn't poison
 * the dropdown silently. */
const MOOD_GROUPS: Record<string, PaletteId[]> = {
  Glass: [
    'glassmorphism',
    'aero-glass',
    'frutiger-aero',
    'liquid-glass-light',
    'liquid-glass-dark',
    'cyberpunk-neon-noir',
    'tron-dark-neon',
    'stained-glass',
  ],
  Retro: [
    'vaporwave',
    'memphis-80s',
    'mall-goth',
    'crt-phosphor-green',
    'crt-phosphor-amber',
    'pixel-art-nes',
    'pixel-art-snes',
    'pixel-art-gameboy',
    'aero-glass',
    'frutiger-aero',
    'art-deco',
  ],
  Editorial: [
    'newspaper',
    'academic',
    'wikipedia',
    'editorial',
    'brutalist-elegant',
    'dieter-rams',
    'data-dense-light',
    'mid-century-modern',
  ],
  Dark: [
    'tron-dark-neon',
    'cyberpunk-neon-noir',
    'mall-goth',
    'aurora',
    'crt-phosphor-green',
    'crt-phosphor-amber',
    'financial-terminal',
    'modern-royal',
    'liquid-glass-dark',
  ],
  Minimal: [
    'flat-classic',
    'swiss-international',
    'wikipedia',
    'dieter-rams',
    'scandinavian-royal-modern',
    'brutalist-elegant',
    'zen-sumie',
    'linear-workspace',
    'vercel-geist',
    'stone-modern',
  ],
  'Modern Light': [
    'nordic-frost',
    'sage-studio',
    'linear-workspace',
    'vercel-geist',
    'soft-pastel',
    'lavender-dawn',
    'stone-modern',
    'coastal-modern',
    'citrus-spark',
    'mocha-latte',
    'paper-pop',
    'studio-confetti',
  ],
  Anime: [
    'cel-shaded-shonen',
    'cel-shaded-shojo',
    'cel-shaded-kawaii',
    'cel-shaded-mecha',
    'cel-shaded-sakura',
    'cel-shaded-citrus',
  ],
  Neobrutalist: [
    'neubrutalism',
    'neo-citrus',
    'neo-bubblegum',
    'neo-grape',
    'neo-tangerine',
    'brutalist-elegant',
  ],
  Terminal: [
    'crt-phosphor-green',
    'crt-phosphor-amber',
    'terminal-tui',
    'financial-terminal',
  ],
  Print: ['risograph', 'letterpress', 'blueprint', 'newspaper', 'academic'],
  Royal: ['modern-royal', 'scandinavian-royal-modern', 'marble-royal-flat'],
}

function buildEngineGroups(): Record<string, PaletteId[]> {
  const out: Record<string, PaletteId[]> = {}
  for (const id of Object.keys(palettes) as PaletteId[]) {
    const engine = palettes[id].engine
    const label = ENGINE_LABELS[engine] ?? engine
    ;(out[label] ??= []).push(id)
  }
  return out
}

function buildDefaultGroups(): Record<string, PaletteId[]> {
  const moodGroups: Record<string, PaletteId[]> = {}
  for (const [name, ids] of Object.entries(MOOD_GROUPS)) {
    moodGroups[name] = ids.filter(id => id in palettes)
  }
  return {
    [FAVORITES_GROUP]: [],
    ...moodGroups,
    ...buildEngineGroups(),
  }
}

export const DEFAULT_GROUPS: Readonly<Record<string, PaletteId[]>> = buildDefaultGroups()
export const DEFAULT_GROUP_NAMES: ReadonlySet<string> = new Set(Object.keys(DEFAULT_GROUPS))
