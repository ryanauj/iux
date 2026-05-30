import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'stone-modern',
  tagline:
    'Warm-minimalist modern-retail register on the Flat engine — warm-stone field, charcoal-brown primary, single rust accent, single-family Söhne grotesque with uppercase-tracked labels.',
  summary:
    'Stone Modern is the Aesop / Muji / "premium minimalist brand site" register on the modern-light Flat-engine ' +
    'grid. `surface.base` is warm stone (`#f0ece6`); `surface.raised` is bone (`#faf8f3`). `intent.primary.bg` ' +
    'is charcoal-brown (`#2c2620`) — the same near-black used for body text, promoted to the button slab. The ' +
    'palette has only one chromatic accent: rust (`#c2541f`) on `warning`, which also carries `border.focus` ' +
    'and `content.link`. `family.ui` and `family.display` both route to Söhne; labels use `0.08em` uppercase ' +
    'tracking for the small-caps "section" feel modern retail uses on category headers.',
  origin:
    'The 2010s–2020s modern-retail minimalist lane — Aesop, Muji, COS, Everlane, Acne Studios. The aesthetic ' +
    'distils Dieter Rams\'s "less but better" through a 21st-century retail filter: replace Braun orange with ' +
    'rust, replace Helvetica with Söhne, replace product-photography with editorial type, keep the single-' +
    'saturated-accent and generous-whitespace rules intact.',
  signatures: [
    {
      label: 'Warm-stone field + bone raised (`#f0ece6` / `#faf8f3`)',
      detail:
        '`surface.base` is slightly cooler at the high end than Heritage Maritime\'s bone (`#f4ecd9`), slightly warmer than Dieter Rams\'s warm-grey (`#e9e8e5`). The warm-stone register is what grounds the rust accent as "premium minimalist" rather than as "industrial-safety."',
    },
    {
      label: 'Charcoal-brown `intent.primary` (`#2c2620`) — text colour promoted to button',
      detail:
        '`intent.primary.bg` is `#2c2620` — the same near-black used for body text, promoted to the button slab. The palette has only one chromatic accent: rust on `warning`. The single-saturated-note discipline in a sea of neutrals is the load-bearing colour move.',
    },
    {
      label: 'Single rust accent (`#c2541f`) on warning, focus, and link',
      detail:
        '`intent.warning.bg`, `border.focus`, and `content.link` all share `#c2541f` — kiln-fired clay, the one saturated colour the palette permits. `intent.danger` (`#a8261e`) sits in the same warm hue family so the two warm intents read as intentional.',
    },
    {
      label: 'Single-family Söhne grotesque on every typography slot',
      detail:
        '`typography.family.ui` and `family.display` both resolve to `"Söhne", "Inter", "Helvetica Neue", system-ui, sans-serif`. Söhne (or Inter as fallback) carries display, body, and labels — there is no display↔body family contrast, only weight, size, and tracking.',
    },
    {
      label: 'Uppercase-tracked labels (`0.08em` + uppercase)',
      detail:
        '`typography.role.label` sets `tracking: \'0.08em\'` and `textTransform: \'uppercase\'` — the small-caps "section" feel modern retail uses on category headers. The tracked-uppercase label is the typography signature.',
    },
    {
      label: 'Hairline-ring `elevation.low` (`0 0 0 1px #c5bdaf`)',
      detail:
        'Cards barely lift — `elevation.low` is a 1 px outline; `medium` adds a low-alpha drop tinted toward charcoal-brown. The hairline-ring rule is shared with Dieter Rams and Vercel Geist — flat-on-flat surfaces, bounded by stroke.',
    },
    {
      label: 'Near-square `radius.*` (`sm = 2px / md = 4px / lg = 8px`)',
      detail:
        'Modern retail favours near-square corners. The contrast with Sage Studio\'s `sm = 4px / md = 10px / lg = 16px` is one of the load-bearing distinctions inside the modern-light register set.',
    },
  ],
  antiSignatures: [
    'A second saturated chromatic intent competing with the rust accent',
    'Serif `display` family — the single-Söhne rule is structural',
    'Soft drop-shadow `elevation.low` — the hairline ring is the lift signal',
    'Tight `space.*` scale — the modern-retail register depends on the widened `6: 36px / 7: 52px / 8: 72px`',
    'Widened `radius.*` (`sm = 6-8px`) — Stone Modern commits to near-square corners',
  ],
  tokenEvidence: [
    { path: 'color.surface.base', note: 'Warm stone `#f0ece6` — between Dieter Rams\'s warm-grey and Heritage Maritime\'s bone.' },
    { path: 'color.intent.primary.bg', note: 'Charcoal-brown `#2c2620` — body-text near-black promoted to the button slab.' },
    { path: 'color.intent.warning.bg', note: 'Rust `#c2541f` — the single saturated accent the palette permits.' },
    { path: 'color.border.focus', note: 'Rust `#c2541f` — focus ring reuses the single accent.' },
    { path: 'typography.family.ui', note: 'Söhne-first stack — single-family grotesque throughout.' },
    { path: 'typography.family.display', note: 'Identical Söhne stack — no display↔body family contrast.' },
    { path: 'elevation.low.boxShadow', note: '`0 0 0 1px #c5bdaf` — hairline-ring instead of drop shadow.' },
    { path: 'space.7', note: '`\'52px\'` — generous whitespace at the high end, shared with Dieter Rams.' },
  ],
  lookalikes: [
    {
      against: 'dieter-rams',
      differentiator:
        'Stone Modern is the modern-retail sibling of Dieter Rams on the same minimalist register: identical single-family typography commitment, hairline-ring elevation, generous whitespace, single saturated accent. Dieter Rams uses cool warm-grey + Braun orange + Helvetica; Stone Modern uses warm stone + rust + Söhne and routes `intent.primary` to the charcoal-brown text colour itself rather than to the saturated accent. The two palettes are the industrial-design vs modernist-retail poles of the same doctrine.',
    },
    {
      against: 'sage-studio',
      differentiator:
        'Both palettes commit to warm-paper grounds and Inter-family body type, but the chromatic and typographic registers split. Sage Studio uses Fraunces serif on display with a sage + terracotta colour story and widened `radius` (`sm = 4px / md = 10px / lg = 16px`). Stone Modern uses single-family Söhne grotesque with a charcoal + rust colour story and near-square `radius` (`sm = 2px / md = 4px / lg = 8px`).',
    },
    {
      against: 'mocha-latte',
      differentiator:
        'Both palettes commit to warm-brown registers. Mocha Latte is the café register: oat-cream field (`#f5eddd`, 4-5% yellow), mocha-brown primary, Recoleta serif display, widened radii. Stone Modern is the retail register: warm-stone field (`#f0ece6`, cooler), charcoal-brown primary, single-family Söhne grotesque, near-square radii.',
    },
  ],
  thrivesWith: [
    'Modern-retail product pages — the rust accent on warm stone reads as premium minimalist',
    'Editorial brand sites with tracked-uppercase section headers',
    'Long-form Söhne running text on `surface.raised`',
  ],
  degradesWith: [
    'Dense data dashboards (the single-accent vocabulary fights chart category colour)',
    'Calm-app registers that want soft corners — the near-square `radius` scale reads as too sharp',
  ],
  recallAliases: ['stone', 'stone modern', 'warm stone', 'aesop', 'muji', 'modern retail', 'premium minimalist'],
}
