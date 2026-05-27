import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'bauhaus',
  tagline:
    'The three-primary teaching palette on the flat engine — Bauhaus red, yellow, and blue on cream, with `radius.*` forced to either `0` or `9999px`, geometric sans (Futura) display, and uppercase headings.',
  summary:
    'Bauhaus restricts the flat engine to the school\'s three-primary palette: Bauhaus red `#e2241a`, yellow ' +
    '`#f7c100`, blue `#1c4eba`, on cream `surface.base` `#f5f1e8` with ink-black `#0a0a0a` borders. The contract\'s ' +
    'six intent slots collapse onto those three primaries — `primary`/`info`/`success` map to blue, `warning` to ' +
    'yellow, `danger` to red. `radius.*` is forced to either `0` (every named slot, including `pill`) or `9999px` ' +
    '(`full`) — no curve in between, enforcing the movement\'s "primary geometric shapes only" rule. ' +
    '`typography.family.display` is Futura / Avenir Next, the geometric letterforms that match the geometric ' +
    'shapes, and every heading role carries `textTransform: \'uppercase\'`.',
  origin:
    'The Staatliches Bauhaus (Weimar 1919, Dessau 1925, Berlin 1932 — closed 1933) and its form-language ' +
    'consequences: Itten\'s colour wheel reduced to red/yellow/blue primaries, Kandinsky\'s circle/square/triangle ' +
    'mapping, Bayer\'s lowercase Universal typeface and Tschichold\'s asymmetric typography. The palette quotes the ' +
    '1923 Bauhaus exhibition poster pairing of primaries on cream with geometric sans.',
  signatures: [
    {
      label: 'Three-primary intent palette: blue, yellow, red',
      detail:
        '`intent.primary` / `intent.info` / `intent.success` all carry `#1c4eba` (Bauhaus blue). `intent.warning` is `#f7c100` (yellow). `intent.danger` is `#e2241a` (red). Six contract slots, three colours — the collapse is intentional and is the teaching set the movement defined.',
    },
    {
      label: 'Cream `surface.base` (`#f5f1e8`) with ink-black borders',
      detail:
        '`surface.base` is `#f5f1e8` — a warm cream, not white. Every `border.subtle` / `default` / `strong` is `#0a0a0a` (ink-black). The cream-and-black field is the canvas the three primaries colour-block against.',
    },
    {
      label: '`radius.*` forced to `0` or `9999px` only',
      detail:
        '`radius.none`, `sm`, `md`, `lg` are all `0`. `radius.pill` is `9999px` (rounded to `full`, not the usual `999px` stadium). Only the "primary shapes" — square (`0`) and circle / stadium (`9999px`) — are allowed; the rounded-rectangle middle is the form the palette refuses.',
    },
    {
      label: 'Geometric sans display with uppercase headings',
      detail:
        '`typography.family.display` is `"Futura", "Avenir Next", "Avenir", "Century Gothic", "Helvetica Neue", sans-serif`. `role.display`, `title`, `heading`, `subheading`, and `label` all carry `textTransform: \'uppercase\'`. Geometric letterforms (the perfect-circle `o`, the upward-pointing `M` apex) match the geometric shapes of the form language.',
    },
    {
      label: 'Linear motion easings',
      detail:
        '`motion.easing.standard`, `in`, `out`, `inOut`, `spring` are all `linear`. Bauhaus\'s machine-aesthetic doesn\'t ease — there is no humanistic acceleration curve. Movement is mechanical or it isn\'t there.',
    },
  ],
  antiSignatures: [
    'A serif or humanist `display` family — the geometric-sans rule is structural',
    'A non-zero, non-`9999px` `radius.md` / `radius.lg` (the rounded-rectangle middle is forbidden)',
    'Mixed-case headings (Bauhaus headings are uppercase or all-lowercase, not title-case)',
    'A fourth saturated colour outside the red/yellow/blue triad',
    'Soft drop shadows on `elevation.*` (depth comes from colour-block and shape, never from a fake light source)',
  ],
  tokenEvidence: [
    {
      path: 'color.intent.primary.bg',
      note: 'Bauhaus blue `#1c4eba` — also carries `info` and `success` (the six-slot contract collapses onto three primaries).',
    },
    {
      path: 'color.intent.warning.bg',
      note: 'Bauhaus yellow `#f7c100` — the only yellow in the palette, reserved for the warning channel.',
    },
    {
      path: 'color.intent.danger.bg',
      note: 'Bauhaus red `#e2241a` — also carries `border.focus`.',
    },
    {
      path: 'color.surface.base',
      note: 'Cream `#f5f1e8` — not white. The colour the 1923 exhibition poster colour-blocked against.',
    },
    {
      path: 'typography.family.display',
      note: '`"Futura", "Avenir Next", ...` — geometric sans that matches the geometric form language.',
    },
    {
      path: 'typography.role.heading.textTransform',
      note: '`\'uppercase\'` — every heading role is uppercased.',
    },
    {
      path: 'radius.md',
      note: '`0` — the rounded-rectangle middle is forbidden; only `0` (square) or `9999px` (circle) are allowed.',
    },
    {
      path: 'motion.easing.standard',
      note: '`linear` — the machine aesthetic doesn\'t ease.',
    },
  ],
  lookalikes: [
    {
      against: 'swiss-international',
      differentiator:
        'Swiss collapses to a single accent (signal red), uses Helvetica (a grotesque), and rejects uppercase headings. Bauhaus uses the three primaries as a chromatic teaching set, uses Futura (a geometric, not a grotesque), and commits every heading to uppercase. Same engine, two different teaching doctrines.',
    },
    {
      against: 'dieter-rams',
      differentiator:
        'Dieter Rams uses Braun-orange as the single accent on warm-grey with Helvetica throughout — "less but better," restraint as the teaching set. Bauhaus uses three primaries on cream with Futura uppercase — chromatic vocabulary as the teaching set. Bauhaus declares; Dieter Rams restrains.',
    },
    {
      against: 'mid-century-modern',
      differentiator:
        'Mid-Century Modern shares warm cream and geometric sans references but uses a softer mustard/teal/coral chord, allows non-zero rounded-rectangle radii, and stays mixed-case. Bauhaus pins the three-primary triad, forbids the rounded-rectangle middle, and uppercases every heading.',
    },
    {
      against: 'memphis-80s',
      differentiator:
        'Memphis 80s also colour-blocks primaries against cream, but adds pattern fills (squiggles, dots, terrazzo) and breaks the geometric-shape rule with confetti decoration. Bauhaus permits only the unornamented primary shapes — pattern fills are forbidden.',
    },
  ],
  thrivesWith: [
    'Posters, mastheads, and large-shape compositions where colour-block geometry organises the page',
    'Children\'s-education and museum-pedagogy interfaces where the three-primary teaching mode is the brief',
    'Branding for design schools, type foundries, and modernist art institutions',
  ],
  degradesWith: [
    'Toggles and rounded-rectangle form controls — the palette refuses the in-between radius and the thumb-vs-track geometry collapses (README flags Toggle as most-likely-to-fail)',
    'Dashboards needing six distinguishable intents — the six-slot contract collapses to three colours',
    'Photographic content — the cream / primary / black field fights any photo treatment',
  ],
  recallAliases: ['bauhaus', 'staatliches bauhaus', 'kandinsky', 'itten', 'three primaries', 'red yellow blue'],
}
