import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'art-deco',
  tagline:
    '1920s poster register — deep teal-black field, champagne-gold accent, Poiret One / Limelight display serif at uppercase tracking.',
  summary:
    'Art Deco / Gatsby is the 1920s ornament-and-symmetry register on the Flat engine. Deep teal-black (`#0e2027`) ' +
    'fills `surface.base`; champagne gold (`#c8a96a`) carries `intent.primary` and `border.focus`; cream (`#e8dcc0`) ' +
    'carries content. Poiret One / Limelight at `uppercase` with `0.04em` tracking does the display work — Deco type ' +
    'ran widely-spaced caps almost exclusively. A three-family typography rule (serif display + serif body + sans UI) ' +
    'is the load-bearing move.',
  origin:
    'The 1925 Exposition Internationale des Arts Décoratifs in Paris (which gave the movement its name), through ' +
    'the 1930s — A.M. Cassandre travel posters, Erté fashion plates, Chrysler Building lobby murals. The display ' +
    'typeface vocabulary (Poiret One, Limelight, geometric Deco serifs) is post-war revivalist but matches the ' +
    'period\'s actual show-card lettering. Champagne + teal-black is the period\'s most-replicated colour pairing ' +
    'on theatre lobbies, jazz-club posters, and 1925 Vogue covers.',
  signatures: [
    {
      label: 'Deep teal-black field with champagne-gold accent',
      detail:
        '`surface.base` `#0e2027` (deep teal-black, not pure black — the colour of a lacquered 1920s theatre lobby); `intent.primary.bg` `#c8a96a` (champagne, not antique gold). The pairing is unmistakably Deco — neither Mall-goth\'s near-black + blood-red nor Modern Royal\'s aubergine + warm-gold lands in the same register.',
    },
    {
      label: 'Geometric Deco serif on `display` at uppercase tracking',
      detail:
        '`typography.family.display` is Poiret One / Limelight (or Bodoni 72 fallback). The display, title, and heading roles all run `uppercase` with `0.04em` tracking — Deco type ran widely-spaced caps as a near-universal rule.',
    },
    {
      label: 'Three-family typography (serif display + serif body + sans UI)',
      detail:
        '`family.display` is Poiret One; `family.body` is Cormorant; `family.ui` is Inter. The split routes display through the Deco serif (period costume), body through Cormorant (long-form reading), and UI controls through Inter (small-size legibility). Three families is rare on the Flat engine — most palettes pick two.',
    },
    {
      label: '3 px champagne focus ring',
      detail:
        '`effect.focusRing` is `{ width: 3px, offset: 2px, color: #c8a96a, style: solid }`. The extra pixel of width compensates for reduced contrast on the dark teal-black field — same compensation Modern Royal makes against aubergine.',
    },
  ],
  antiSignatures: [
    'Pure-black `surface.base` (teal-black is the period-specific field colour)',
    'A sans-serif `display` family — that breaks the Deco poster vocabulary',
    'Sentence-case headings — Deco type ran caps almost exclusively',
    'A second saturated chromatic intent competing with the champagne (burgundy `danger` is restrained, not competing)',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Deep teal-black `#0e2027` — period-specific lacquered-theatre field colour.' },
    { path: 'color.intent.primary.bg', note: 'Champagne gold `#c8a96a` — the Deco accent (not antique gold, which is Modern Royal\'s register).' },
    { path: 'typography.family.display', note: 'Poiret One — the geometric Deco serif.' },
    { path: 'typography.role.display.textTransform', note: '`\'uppercase\'` — Deco display was caps-only by convention.' },
    { path: 'effect.focusRing.width', note: '`\'3px\'` — heavier ring to compensate for the dark field, same as Modern Royal.' },
  ],
  lookalikes: [
    {
      against: 'modern-royal',
      differentiator:
        'Both palettes are dark-field Flat configurations with a single warm-metallic accent. Modern Royal: aubergine field, antique-gold accent, Cormorant Garamond display (regalia register). Art Deco: teal-black field, champagne-gold accent, Poiret One / Limelight display at uppercase tracking (1920s poster register). The accent saturation is similar; the display vocabulary is what differentiates the periods.',
    },
    {
      against: 'mall-goth',
      differentiator:
        'Both are dark-field Flat palettes. Mall-goth: near-black field, blood-red accent, condensed serif display (crepuscular register). Art Deco: teal-black field, champagne-gold accent, geometric Deco display serif (1920s poster). Different field colour, different accent hue family, different period — opposite tonal warmth.',
    },
    {
      against: 'stained-glass',
      differentiator:
        'Both use dark fields with luxe accents, but Cathedral / Stained Glass spreads five jewel-tone intents across the palette and uses heavy lead `border.*` as load-bearing geometry. Art Deco picks one warm-metallic accent (champagne) and uses serif display tracking as the load-bearing move. Stained Glass is medieval; Art Deco is jazz-age.',
    },
  ],
  thrivesWith: [
    'Hero panels, marketing headers, theatre / hospitality landing pages',
    'Long-form Cormorant body paired with caps-tracked Poiret display',
    'Buttons and tag badges in the champagne intent fill',
  ],
  degradesWith: [
    'Dense data tables (caps-tracked display + dark field both reduce density legibility)',
    'Photographic content (the teal-black field clashes with most colour photography)',
  ],
  recallAliases: ['art deco', 'deco', 'gatsby', '1920s', 'jazz age'],
}
