import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'stained-glass',
  tagline:
    'Gothic-window register — lead-black field, five jewel-tone intents (amethyst / cobalt / emerald / amber / ruby), heavy lead `border.*` as load-bearing geometry.',
  summary:
    'Cathedral / Stained Glass is the medieval-rose-window register on the Flat engine. Lead-black (`#0d0a14`) ' +
    'fills `surface.base`; five saturated jewel-tone intents (amethyst `#6a2ea0`, cobalt `#1f4ec8`, emerald `#1f7a4a`, ' +
    'amber `#c4801a`, ruby `#a8221a`) carry primary / info / success / warning / danger. Heavy lead borders (`#2a2436` ' +
    'at 2 px, `#3e364e` at 3 px) make `border.*` the load-bearing geometry — the lead came is the structure, the ' +
    'colour is the light coming through. Cinzel display caps at `0.05em` tracking carry the cathedral-inscription ' +
    'register.',
  origin:
    'The high-Gothic stained-glass window tradition, c.1140–1250 — the great rose windows of Chartres, Notre-Dame, ' +
    'and Sainte-Chapelle. The colour vocabulary maps directly to historical jewel-glass families: cobalt is the most ' +
    'common 12th-century blue, ruby is the high-iron red, emerald is the spring leading, amber is the rare gold-lead ' +
    'panel, amethyst is the rose-window centre. Cinzel display is a digital revival of the carved-stone Roman cap ' +
    'inscription register that paired with Gothic glass on church facades.',
  signatures: [
    {
      label: 'Five saturated jewel-tone intents on a lead-black field',
      detail:
        '`intent.primary` amethyst `#6a2ea0`, `info` cobalt `#1f4ec8`, `success` emerald `#1f7a4a`, `warning` amber `#c4801a`, `danger` ruby `#a8221a`. Every intent stays at jewel-glass saturation. The five-colour set evokes a Chartres rose window directly.',
    },
    {
      label: 'Heavy lead `border.*` as load-bearing geometry',
      detail:
        '`border.default` `#2a2436` at `borderWidth.thin: 2px`; `border.strong` `#3e364e` at `borderWidth.thick: 3px`. The lead came is structural, not decorative — every Card and Modal gets a real leaded outline rather than a hairline rule. The first palette in the set where `border.*` carries visual load comparable to `intent.*`.',
    },
    {
      label: 'Cinzel display caps at uppercase tracking',
      detail:
        '`typography.family.display` is Cinzel (carved-stone Roman caps revival); display / title / heading run `uppercase` with `0.05em` / `0.04em` / `0.03em` tracking. UnifrakturMaguntia would crush at digital reading sizes; Cinzel carries the cathedral-inscription register without the legibility cost.',
    },
    {
      label: 'Zero-radius cards (leaded-glass joinery)',
      detail:
        '`radius.sm` and `radius.md` are `\'0\'`; `lg` is `\'2px\'`. Leaded-glass joinery is straight cuts, never curves. `pill` stays at `\'999px\'` for tags that need it.',
    },
  ],
  antiSignatures: [
    'Pure-black `surface.base` (lead-black with a violet tint is the period-specific field)',
    'Hairline borders or no borders on raised surfaces (the lead came is load-bearing)',
    'A single dominant accent colour — the five-jewel set is the register',
    'Sentence-case headings — Cinzel caps tracking is the inscription cue',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Lead-black `#0d0a14` — violet-tinted near-black, the colour of oxidised lead came.' },
    { path: 'color.intent.primary.bg', note: 'Amethyst `#6a2ea0` — the rose-window centre piece colour.' },
    { path: 'color.intent.info.bg', note: 'Cobalt `#1f4ec8` — the most common high-Gothic blue.' },
    { path: 'borderWidth.thick', note: '`\'3px\'` — heavy lead at cardinal joins, vs the 1-2 px most palettes use.' },
    { path: 'typography.family.display', note: 'Cinzel — carved-stone Roman caps revival.' },
  ],
  lookalikes: [
    {
      against: 'mall-goth',
      differentiator:
        'Both palettes use dark fields with saturated accents, but Mall-goth pins to a single blood-red accent + deep-violet info on near-black (crepuscular register). Cathedral / Stained Glass spreads five jewel-tone intents across the palette and makes `border.*` load-bearing via heavy lead came (cathedral register). One palette is goth-club; the other is high-Gothic.',
    },
    {
      against: 'art-deco',
      differentiator:
        'Both dark-field Flat palettes with luxe accents and uppercase-tracked display. Art Deco picks one warm-metallic accent (champagne) and uses Poiret One / Limelight display (1920s register). Cathedral spreads five jewel-tone intents and uses Cinzel display (medieval register). Different historical period, different intent count, different display vocabulary.',
    },
    {
      against: 'tron-dark-neon',
      differentiator:
        'Tron / Dark-Neon is the Glassmorphism engine: translucent panels with one neon accent and glow-as-focus-ring on near-black. Cathedral / Stained Glass is the Flat engine: opaque surfaces with five jewel-tone intents and heavy opaque lead borders on lead-black. Engine difference is the load-bearing one — no glass, no glow on Cathedral.',
    },
  ],
  thrivesWith: [
    'Hero panels and high-ceremony landing pages (the jewel + lead register reads as ornate)',
    'Cards and dashboards where category colour can occupy the five jewel intents distinctly',
    'Tag and badge compositions in the saturated jewel fills',
  ],
  degradesWith: [
    'Long-form prose (caps-tracked display + lead-black field both reduce reading speed)',
    'Form-heavy interfaces (heavy lead borders on every Input read as cluttered at scale)',
  ],
  recallAliases: ['stained glass', 'cathedral', 'gothic', 'jewel tones', 'rose window'],
}
