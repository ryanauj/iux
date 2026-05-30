import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'crt-phosphor-greenbar',
  tagline:
    'Daylight inversion of `crt-phosphor-green` — the same `crt-phosphor` engine, but the scanlines repaint as continuous-form greenbar printer stripes and the bright P1 phosphor dims to dark green ink on cream paper.',
  summary:
    'CRT / Greenbar is the Daybreak twin of `crt-phosphor-green` on the same `crt-phosphor` engine. The engine slots ' +
    'survive verbatim and only flip register: `effect.overlay.image` no longer paints a two-layer scanline gradient — ' +
    'it paints the horizontal stripe bands of continuous-form "greenbar" printer paper (one faint green band every ' +
    '~28px, `blend: multiply` so the band darkens the cream paper underneath). `effect.glow` dims from bright phosphor ' +
    'bloom to a soft green focus halo. `motion.decay` drops from `80ms` to `0ms` — printout doesn\'t linger the way a ' +
    'tube does. VT323 mono and the green-monochrome intent logic carry over; the field flips from `#020604` near-black ' +
    'to `#eef3e6` warm cream-green.',
  origin:
    'Continuous-form computer paper — the alternating pale-green and white stripes line-printers produced from the 1960s ' +
    'through the 1990s for the same workloads green-screen terminals displayed live. The stripes existed to help the eye ' +
    'track across a single row of densely-printed numeric output; the colour reads as institutional computing as much as ' +
    'the green phosphor it accompanies. This palette is the engine-level paper inversion of the tube.',
  signatures: [
    {
      label: 'Greenbar stripe `effect.overlay.image` (faint green bands at `multiply` blend)',
      detail:
        '`repeating-linear-gradient(to bottom, rgba(31,61,26,0) 0, rgba(31,61,26,0) 28px, rgba(31,61,26,0.06) 28px, ' +
        'rgba(31,61,26,0.06) 56px)` with `blend: multiply` so each band darkens the cream paper underneath rather than ' +
        'adding light. Same engine slot as the dark twin\'s scanline gradient — the recipe flips from "tube" to "paper".',
    },
    {
      label: 'Cream-green paper field (`#eef3e6`) with dark green ink (`#1f3d1a`)',
      detail:
        '`surface.base` is pale greenbar paper `#eef3e6`; `content.primary` is dark green ink `#1f3d1a` at ~7.5:1 against ' +
        'the paper. The dark twin runs `#7dff8a` phosphor on `#020604` near-black — same monochrome green logic, opposite ' +
        'luminance.',
    },
    {
      label: 'Soft green focus halo (not phosphor bloom)',
      detail:
        '`effect.glow` is `radius: 3px, color: rgba(21,128,61,0.45), intensity: 0.4` — dialed down from the dark twin\'s ' +
        '`radius: 6px` phosphor bloom at `intensity: 0.7`. The CRT focus-pulse keyframe (scoped to `data-palette^=\'crt-phosphor\'`) ' +
        'animates this — on paper it reads as a gentle ink pulse rather than a glowing tube.',
    },
    {
      label: '`motion.decay: 0ms` — printout doesn\'t linger',
      detail:
        'The dark twin\'s phosphor-decay tail (`80ms`) drops to `0ms`. Printed paper has no decay regime — once the ink is ' +
        'down, the row is done. State transitions snap rather than fading out.',
    },
    {
      label: 'Green-monochrome intents carried over (state via border, not hue)',
      detail:
        'Every `intent.*.bg` collapses to a low-alpha green tint of `rgba(21,128,61,...)`; `intent.*.content` is dark green ' +
        'ink `#1f3d1a` (or near-black `#14331a` for the saturated intents); warning / danger / info encode state through ' +
        'BORDER alpha (`rgba(31,61,26,0.40 → 0.85)`) rather than through hue. The single-phosphor accessibility caveat survives ' +
        'the inversion.',
    },
    {
      label: 'VT323 mono everywhere, uppercased labels with 0.10em tracking',
      detail:
        '`typography.family.*` all resolve to `"VT323", "IBM Plex Mono", "Share Tech Mono", "JetBrains Mono", ui-monospace, monospace` ' +
        '— identical stack to the dark twin. No serif. `label` and `caption` are `textTransform: uppercase` with `0.08–0.10em` tracking.',
    },
  ],
  antiSignatures: [
    'A scanline overlay — that\'s the dark `crt-phosphor-green` twin; greenbar paints horizontal stripe bands at `multiply` blend',
    'Bright `#7dff8a` phosphor as `content.primary` — the daylight register dims to dark green ink',
    'A `motion.decay` other than `0ms` — paper doesn\'t carry a phosphor-decay regime',
    'Colour-coded intents (red danger, blue info) — green monochrome logic survives the inversion; state encodes through border alpha',
    'A proportional sans on body — VT323 mono is shared with the dark twin',
  ],
  tokenEvidence: [
    {
      path: 'effect.overlay.image',
      note: 'Greenbar stripe band gradient — `repeating-linear-gradient` at 28px-on / 28px-off. Same engine slot as the dark twin\'s scanlines, repainted as paper stripes.',
    },
    {
      path: 'effect.overlay.blend',
      note: '`multiply` — each band darkens the cream paper rather than adding light (dark twin uses `screen`).',
    },
    {
      path: 'color.surface.base',
      note: '`#eef3e6` — pale greenbar paper. Inverts the dark twin\'s `#020604` near-black.',
    },
    {
      path: 'color.content.primary',
      note: '`#1f3d1a` — dark green ink. The dark twin runs `#7dff8a` bright phosphor.',
    },
    {
      path: 'effect.glow.color',
      note: '`rgba(21, 128, 61, 0.45)` — soft green focus halo, dimmed from the dark twin\'s `rgba(125, 255, 138, 0.65)` phosphor bloom.',
    },
    {
      path: 'motion.decay',
      note: '`0ms` — paper has no phosphor-decay regime. The dark twin ships `80ms`.',
    },
    {
      path: 'typography.family.mono',
      note: 'VT323 stack — identical to the dark twin; aliased into every family slot.',
    },
  ],
  lookalikes: [
    {
      against: 'crt-phosphor-green',
      differentiator:
        'The dark twin. Same `crt-phosphor` engine, same VT323 mono, same green-monochrome intent logic. Inverts the colour story: ' +
        'near-black field → cream-green paper field; bright `#7dff8a` phosphor → dark `#1f3d1a` ink; scanline `effect.overlay.image` ' +
        'at `blend: screen` → greenbar stripe bands at `blend: multiply`; `motion.decay: 80ms` → `0ms`. Same engine slots, paper register.',
    },
    {
      against: 'crt-phosphor-amber',
      differentiator:
        'The amber sister of the dark twin — same `crt-phosphor` engine with amber phosphor instead of green. Greenbar inverts the ' +
        'green sister specifically onto continuous-form printer paper; the amber tube has no canonical paper analogue, so the daylight ' +
        'twin lives on the green side.',
    },
    {
      against: 'terminal-tui-paper',
      differentiator:
        'Both are light-field monospace palettes that read as terminal output on paper. Terminal / Paper runs the `terminal-tui` engine ' +
        '— character-grid layout (`gridUnitX/Y = 1ch/1lh`), box-drawing borders (`borderStyle = character`), no overlay, no glow. ' +
        'Greenbar runs `crt-phosphor` — engine-level greenbar stripe overlay, soft green focus glow, single-phosphor monochrome ' +
        'collapse. Different engines, different load-bearing tokens.',
    },
    {
      against: 'financial-terminal',
      differentiator:
        'Financial Terminal is a dense Bloomberg-style multicolor terminal palette on a dark field. Greenbar is the paper inversion ' +
        'of a single-phosphor green CRT — monochrome green, light cream paper, engine-level stripe overlay. Opposite tonal direction ' +
        'and a single-hue collapse.',
    },
  ],
  thrivesWith: [
    'Numeric reports and ledger views — the stripe bands match the row-tracking purpose of real greenbar paper',
    'Code blocks and readouts — VT323 on cream reads as line-printer output',
    'Print preview / export styling — the palette is itself a print register',
  ],
  degradesWith: [
    'Photographic content — the `multiply` stripe overlay destroys photo fidelity',
    'Forms relying on color-coded intent — danger / primary / info differ only by border alpha (same caveat as the dark twin)',
    'Dense muted-text passages — the stripe overlay drops effective contrast on `content.muted` lines that fall on a stripe',
  ],
  recallAliases: ['greenbar', 'green bar', 'crt greenbar', 'phosphor greenbar', 'computer paper', 'continuous form', 'line printer', 'greenbar paper'],
}
