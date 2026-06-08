import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'arcane-vanguard',
  tagline:
    'The futuristic-fantasy register on the glassmorphism engine — luminous lilac field, translucent violet-glass panels, an arcane-violet primary, and a rune-gold warning where tech meets magic.',
  summary:
    'Arcane Vanguard is a "tech-meets-magic" ability HUD rendered as bright daylight ceremony. `surface.base` is ' +
    'a pale lilac `#f8f6fd`, `surface.raised` is translucent violet glass, and `intent.primary` is arcane-violet ' +
    '`#8b5cf6` with a glow focus ring. `intent.warning` is rune-gold `#d9a014` and `intent.success` is rune-green ' +
    '`#10b981` — spell-glyph state colours. The display role is a Cinzel serif over an Exo 2 sci-fi UI stack, ' +
    'so energy shields and arcane glyphs share one HUD.',
  origin:
    'The light-magic and ability HUDs of sci-fantasy shooters (Destiny, Warframe) where energy weapons and ' +
    'spell glyphs share a screen. This register lights that vocabulary for day and makes it ceremonial — a ' +
    'glowing violet rite rather than a dark cosmos.',
  signatures: [
    {
      label: 'Luminous lilac field with violet glass',
      detail:
        '`surface.base` is `#f8f6fd` and `surface.raised` is `rgba(167,139,250,0.12)` — a pale violet-tinted ground with frosted violet panels.',
    },
    {
      label: 'Arcane-violet primary with a glow focus',
      detail:
        '`intent.primary.bg` and `border.focus` are arcane-violet `#8b5cf6` with a glow focus ring — the spell-energy accent.',
    },
    {
      label: 'Rune-gold warning, rune-green success',
      detail:
        '`intent.warning.bg` is rune-gold `#d9a014` and `intent.success.bg` is rune-green `#10b981` — glyph state colours rather than plain alert hues.',
    },
    {
      label: 'Ceremonial serif display over a sci-fi UI stack',
      detail:
        '`typography.family.display` is Cinzel (a fantasy serif) while `family.ui` is Exo 2 — the tech-meets-magic pairing that defines the register.',
    },
  ],
  antiSignatures: [
    'A dark cosmic background — this register is bright daylight ceremony',
    'A purely technical sans throughout — the fantasy serif display is load-bearing',
    'A warm orange or cyan primary — the arcane accent is violet',
  ],
  tokenEvidence: [
    { path: 'color.surface.raised', note: 'Translucent violet glass `rgba(167,139,250,0.12)`.' },
    { path: 'color.intent.primary.bg', note: 'Arcane-violet primary — the spell-energy accent.' },
    { path: 'color.intent.warning.bg', note: 'Rune-gold `#d9a014` — a glyph state colour.' },
    { path: 'typography.family.display', note: 'Cinzel fantasy serif over an Exo 2 UI stack — tech meets magic.' },
  ],
  lookalikes: [
    {
      against: 'aegis-halo',
      differentiator:
        'Both are light sci-fi glass HUDs. Aegis Halo is a cool cyan military visor with Orbitron type; Arcane Vanguard is a sci-fantasy ability HUD — a violet primary, rune-gold/green glyph states, and a ceremonial Cinzel serif display.',
    },
    {
      against: 'cel-glass-orchid',
      differentiator:
        'Both are light violet glass palettes. Cel-Glass Orchid is an anime cel-shaded × glass register with ink outlines; Arcane Vanguard is a sci-fantasy shooter HUD — a glow focus ring, rune-gold/green state colours, and a tech-meets-magic serif/sans type pairing.',
    },
  ],
  recallAliases: ['arcane vanguard', 'destiny', 'warframe', 'sci-fantasy', 'magic fps', 'arcane', 'futuristic fantasy'],
}
