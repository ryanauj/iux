import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'dieter-rams',
  tagline:
    '"Less but better" on the Flat engine — cool warm-grey field, single Braun-orange `intent.primary`, single-family Helvetica throughout, generous whitespace.',
  summary:
    'Dieter Rams / Braun is the Ulm Hochschule + Braun industrial-design register on the Flat engine. Cool ' +
    'warm-grey (`#e9e8e5`) fills `surface.base`; off-white (`#f7f6f3`) carries `surface.raised`; a single saturated ' +
    'Braun-orange (`#e25822`) holds `intent.primary` and `border.focus`. Helvetica fills `family.ui` / `body` / ' +
    '`display` — there is no display↔body family contrast, only weight and size. `space.*` widens at the high end ' +
    '(`6: 36px`, `7: 52px`, `8: 72px`) so the generous-whitespace Ulm composition is built into the scale.',
  origin:
    'The Ulm Hochschule für Gestaltung (1953–1968) and the Braun industrial-design group under Dieter Rams (1955–1995). ' +
    'The visual vocabulary maps to specific Braun products: ET66 calculator orange `=` key, SK4 record-player rim, ' +
    'T1000 radio knurled controls. Rams\'s "Ten Principles for Good Design" (formalised 1980s) include "as little design ' +
    'as possible" — the palette enforces that by collapsing the typography family count to one and the chromatic ' +
    'intent count to one.',
  signatures: [
    {
      label: 'Single saturated Braun-orange `intent.primary`',
      detail:
        '`intent.primary.bg` is `#e25822` — the exact orange on a Braun ET66 calculator `=` key. `border.focus` reuses the same orange. Every other intent stays desaturated; `intent.warning` shifts to a more amber tone (`#cc6f1a`) so it doesn\'t read identical when stacked, but the warmth register is consistent.',
    },
    {
      label: 'Single-family Helvetica on every typography slot',
      detail:
        '`family.ui`, `family.body`, and `family.display` are all Helvetica. There is no serif display, no mono UI, no humanist body — one face, weight and size carry the entire hierarchy. The single-family rule is the load-bearing typography move.',
    },
    {
      label: 'Generous whitespace in `space.*`',
      detail:
        '`space.6: \'36px\'`, `space.7: \'52px\'`, `space.8: \'72px\'` — wider than Flat / Classic by ~12% at the high end. Ulm layouts rely on whitespace as the primary organising tool rather than chromatic accents or borders.',
    },
    {
      label: 'Hairline-rule `elevation.low`',
      detail:
        '`elevation.low` is `0 0 0 1px #cfccc4` — a 1 px outline instead of a drop shadow. `medium` and `high` add very-low-alpha drops. Cards barely lift; the field organises itself by the type and the grid.',
    },
  ],
  antiSignatures: [
    'A second saturated chromatic intent competing with the Braun-orange',
    'A serif `display` family — the single-Helvetica rule is structural',
    'Heavy drop shadows on `elevation.low` — the hairline rule is the lift signal',
    'Tight `space.*` scale — Ulm composition cannot survive without the breathing room',
  ],
  tokenEvidence: [
    { path: 'color.intent.primary.bg', note: 'Braun orange `#e25822` — the exact ET66 `=` key colour.' },
    { path: 'typography.family.ui', note: 'Helvetica — the only typography family routed for any role.' },
    { path: 'typography.family.display', note: 'Helvetica — identical to `family.ui`, no display contrast.' },
    { path: 'space.7', note: '`\'52px\'` — generous whitespace at the high end vs Flat / Classic\'s `\'48px\'`.' },
    { path: 'elevation.low.boxShadow', note: '`0 0 0 1px #cfccc4` — hairline rule instead of drop shadow.' },
  ],
  lookalikes: [
    {
      against: 'swiss-international',
      differentiator:
        'The structural rules are identical (single accent, zero radius, Helvetica throughout, generous whitespace). The register difference is exactly the warmth shift: Swiss uses signal red as the single accent and pure white / pure black neutrals (Zurich-cold); Dieter Rams uses Braun orange and warm-grey / off-white neutrals (Frankfurt-warm). The two palettes are siblings on the same engine, declaring the same principles at different colour temperatures.',
    },
    {
      against: 'bauhaus',
      differentiator:
        'Bauhaus uses the primary triad (red + yellow + blue) on cream with geometric sans display — primary shapes only. Dieter Rams uses Braun orange as the single accent on warm-grey with Helvetica throughout — single colour, single typography. Bauhaus declares chromatic vocabulary as a teaching set; Dieter Rams declares chromatic restraint as a teaching set.',
    },
    {
      against: 'flat-classic',
      differentiator:
        'Flat / Classic is the control palette: blue accent on white, system fonts, standard radius scale. Dieter Rams replaces the blue accent with Braun orange, the system font with Helvetica throughout, the standard radius scale with a near-zero scale, and the soft drop-shadow `elevation.low` with a hairline rule. Same engine, doctrinaire restraint.',
    },
  ],
  thrivesWith: [
    'Industrial-design portfolios, consumer-electronics product pages',
    'Settings panels and form-heavy interfaces where restraint reads as quality',
    'Long-form Helvetica running text on `surface.raised`',
  ],
  degradesWith: [
    'Dense data dashboards (the single-colour intent vocabulary fights chart category colour)',
    'Maximalist marketing pages — the palette refuses decoration',
  ],
  recallAliases: ['dieter rams', 'braun', 'rams', 'ulm', 'less but better'],
}
