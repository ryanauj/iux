import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'arcane-vanguard',
  tagline:
    'The futuristic-fantasy register on the glassmorphism engine — near-white field, neutral white-glass panels with violet borders, an arcane-violet primary, and a rune-gold accent on links, strong borders, and the warning.',
  summary:
    'Arcane Vanguard is a "tech-meets-magic" ability HUD built on a violet-and-gold pairing. `surface.base` is a ' +
    'near-neutral off-white `#faf9fc`, `surface.raised` is neutral white glass with violet borders, and `intent.primary` is arcane-violet ' +
    '`#8b5cf6` with a glow focus ring. The counter-accent is rune-gold `#d9a014` on `content.link`, ' +
    '`border.strong`, and `intent.warning`; rune-green success and indigo info make the glyph states read as real ' +
    'spell colours. The display role is a Cinzel serif over an Exo 2 sci-fi UI stack.',
  origin:
    'The light-magic and ability HUDs of sci-fantasy shooters (Destiny, Warframe) where energy weapons and spell ' +
    'glyphs share a screen. This register lights that vocabulary for day as a ceremonial violet-and-gold rite ' +
    'rather than a dark cosmos.',
  signatures: [
    {
      label: 'Arcane-violet primary against a rune-gold accent',
      detail:
        '`intent.primary.bg`/`border.focus` are violet `#8b5cf6`, while `content.link`, `border.strong`, and `intent.warning` carry rune-gold `#d9a014` — a violet/gold pairing, not one hue.',
    },
    {
      label: 'Near-white field with neutral white-glass panels',
      detail:
        '`surface.base` is a near-neutral off-white `#faf9fc` and `surface.raised` is neutral white glass — the violet lives in `border.*` and the elevation glow, not a tinted page.',
    },
    {
      label: 'Rune-coloured glyph states',
      detail:
        '`intent.success` is rune-green `#10b981` and `intent.info` is indigo `#4f46e5` — spell-glyph state colours that keep the HUD from collapsing into a single violet.',
    },
    {
      label: 'Ceremonial serif display over a sci-fi UI stack',
      detail:
        '`typography.family.display` is Cinzel (a fantasy serif) while `family.ui` is Exo 2 — the tech-meets-magic pairing that defines the register.',
    },
  ],
  antiSignatures: [
    'A single all-violet scheme with no warm accent — the gold pairing is load-bearing',
    'A dark cosmic background — this register is bright daylight ceremony',
    'A purely technical sans throughout — the fantasy serif display is part of the identity',
  ],
  tokenEvidence: [
    { path: 'color.surface.raised', note: 'Neutral white glass — colour lives in the violet borders and glow, not the fill.' },
    { path: 'color.intent.primary.bg', note: 'Arcane-violet primary — the spell-energy action.' },
    { path: 'color.intent.warning.bg', note: 'Rune-gold `#d9a014` — the warm counter-accent.' },
    { path: 'typography.family.display', note: 'Cinzel fantasy serif over an Exo 2 UI stack — tech meets magic.' },
  ],
  lookalikes: [
    {
      against: 'aegis-halo',
      differentiator:
        'Both are light sci-fi glass HUDs built on a warm/cool pairing. Aegis Halo is a cyan-and-gold military visor with Orbitron type; Arcane Vanguard is a violet-and-gold sci-fantasy ability HUD with a ceremonial Cinzel serif display.',
    },
    {
      against: 'cel-glass-orchid',
      differentiator:
        'Both are light violet glass palettes. Cel-Glass Orchid is an anime cel-shaded × glass register with ink outlines; Arcane Vanguard is a sci-fantasy shooter HUD — a glow focus ring, a rune-gold accent, rune-coloured glyph states, and a tech-meets-magic serif/sans type pairing.',
    },
  ],
  recallAliases: ['arcane vanguard', 'destiny', 'warframe', 'sci-fantasy', 'magic fps', 'arcane', 'futuristic fantasy'],
}
