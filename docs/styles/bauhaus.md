# Bauhaus

> The three-primary teaching palette on the flat engine — Bauhaus red, yellow, and blue on cream, with `radius.*` forced to either `0` or `9999px`, geometric sans (Futura) display, and uppercase headings.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Bauhaus restricts the flat engine to the school's three-primary palette: Bauhaus red `#e2241a`, yellow `#f7c100`, blue `#1c4eba`, on cream `surface.base` `#f5f1e8` with ink-black `#0a0a0a` borders. The contract's six intent slots collapse onto those three primaries — `primary`/`info`/`success` map to blue, `warning` to yellow, `danger` to red. `radius.*` is forced to either `0` (every named slot, including `pill`) or `9999px` (`full`) — no curve in between, enforcing the movement's "primary geometric shapes only" rule. `typography.family.display` is Futura / Avenir Next, the geometric letterforms that match the geometric shapes, and every heading role carries `textTransform: 'uppercase'`.

## Origin

The Staatliches Bauhaus (Weimar 1919, Dessau 1925, Berlin 1932 — closed 1933) and its form-language consequences: Itten's colour wheel reduced to red/yellow/blue primaries, Kandinsky's circle/square/triangle mapping, Bayer's lowercase Universal typeface and Tschichold's asymmetric typography. The palette quotes the 1923 Bauhaus exhibition poster pairing of primaries on cream with geometric sans.

## Signatures

- **Three-primary intent palette: blue, yellow, red** — `intent.primary` / `intent.info` / `intent.success` all carry `#1c4eba` (Bauhaus blue). `intent.warning` is `#f7c100` (yellow). `intent.danger` is `#e2241a` (red). Six contract slots, three colours — the collapse is intentional and is the teaching set the movement defined.
- **Cream `surface.base` (`#f5f1e8`) with ink-black borders** — `surface.base` is `#f5f1e8` — a warm cream, not white. Every `border.subtle` / `default` / `strong` is `#0a0a0a` (ink-black). The cream-and-black field is the canvas the three primaries colour-block against.
- **`radius.*` forced to `0` or `9999px` only** — `radius.none`, `sm`, `md`, `lg` are all `0`. `radius.pill` is `9999px` (rounded to `full`, not the usual `999px` stadium). Only the "primary shapes" — square (`0`) and circle / stadium (`9999px`) — are allowed; the rounded-rectangle middle is the form the palette refuses.
- **Geometric sans display with uppercase headings** — `typography.family.display` is `"Futura", "Avenir Next", "Avenir", "Century Gothic", "Helvetica Neue", sans-serif`. `role.display`, `title`, `heading`, `subheading`, and `label` all carry `textTransform: 'uppercase'`. Geometric letterforms (the perfect-circle `o`, the upward-pointing `M` apex) match the geometric shapes of the form language.
- **Linear motion easings** — `motion.easing.standard`, `in`, `out`, `inOut`, `spring` are all `linear`. Bauhaus's machine-aesthetic doesn't ease — there is no humanistic acceleration curve. Movement is mechanical or it isn't there.

## Anti-signatures

- A serif or humanist `display` family — the geometric-sans rule is structural
- A non-zero, non-`9999px` `radius.md` / `radius.lg` (the rounded-rectangle middle is forbidden)
- Mixed-case headings (Bauhaus headings are uppercase or all-lowercase, not title-case)
- A fourth saturated colour outside the red/yellow/blue triad
- Soft drop shadows on `elevation.*` (depth comes from colour-block and shape, never from a fake light source)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.intent.primary.bg` | `#1c4eba` | Bauhaus blue `#1c4eba` — also carries `info` and `success` (the six-slot contract collapses onto three primaries). |
| `color.intent.warning.bg` | `#f7c100` | Bauhaus yellow `#f7c100` — the only yellow in the palette, reserved for the warning channel. |
| `color.intent.danger.bg` | `#e2241a` | Bauhaus red `#e2241a` — also carries `border.focus`. |
| `color.surface.base` | `#f5f1e8` | Cream `#f5f1e8` — not white. The colour the 1923 exhibition poster colour-blocked against. |
| `typography.family.display` | `"Futura", "Avenir Next", "Avenir", "Century Gothic", "Helvetica Neue", sans-serif` | `"Futura", "Avenir Next", ...` — geometric sans that matches the geometric form language. |
| `typography.role.heading.textTransform` | `uppercase` | `'uppercase'` — every heading role is uppercased. |
| `radius.md` | `0` | `0` — the rounded-rectangle middle is forbidden; only `0` (square) or `9999px` (circle) are allowed. |
| `motion.easing.standard` | `linear` | `linear` — the machine aesthetic doesn't ease. |

## Often confused with

### vs [Swiss / International Style](./swiss-international.md)

Swiss collapses to a single accent (signal red), uses Helvetica (a grotesque), and rejects uppercase headings. Bauhaus uses the three primaries as a chromatic teaching set, uses Futura (a geometric, not a grotesque), and commits every heading to uppercase. Same engine, two different teaching doctrines.

### vs [Dieter Rams / Braun](./dieter-rams.md)

Dieter Rams uses Braun-orange as the single accent on warm-grey with Helvetica throughout — "less but better," restraint as the teaching set. Bauhaus uses three primaries on cream with Futura uppercase — chromatic vocabulary as the teaching set. Bauhaus declares; Dieter Rams restrains.

### vs [Mid-century modern](./mid-century-modern.md)

Mid-Century Modern shares warm cream and geometric sans references but uses a softer mustard/teal/coral chord, allows non-zero rounded-rectangle radii, and stays mixed-case. Bauhaus pins the three-primary triad, forbids the rounded-rectangle middle, and uppercases every heading.

### vs [80s Memphis](./memphis-80s.md)

Memphis 80s also colour-blocks primaries against cream, but adds pattern fills (squiggles, dots, terrazzo) and breaks the geometric-shape rule with confetti decoration. Bauhaus permits only the unornamented primary shapes — pattern fills are forbidden.

## Where it thrives

- Posters, mastheads, and large-shape compositions where colour-block geometry organises the page
- Children's-education and museum-pedagogy interfaces where the three-primary teaching mode is the brief
- Branding for design schools, type foundries, and modernist art institutions

## Where it degrades

- Toggles and rounded-rectangle form controls — the palette refuses the in-between radius and the thumb-vs-track geometry collapses (README flags Toggle as most-likely-to-fail)
- Dashboards needing six distinguishable intents — the six-slot contract collapses to three colours
- Photographic content — the cream / primary / black field fights any photo treatment

## Recall aliases

`bauhaus`, `staatliches bauhaus`, `kandinsky`, `itten`, `three primaries`, `red yellow blue`

## Long-form notes

<details>
<summary>From <code>palettes/bauhaus.README.md</code></summary>

# Bauhaus

Flat engine restricted to the school's three-primary palette: Bauhaus
red (`#e2241a`), yellow (`#f7c100`), blue (`#1c4eba`), against cream
`surface.base` (`#f5f1e8`) with ink-black borders. The intent
assignments fold the contract's six slots onto those three primaries —
`primary` / `info` / `success` all map to blue, `warning` to yellow,
`danger` to red. Like the Swiss palette, the collapse is intentional;
unlike Swiss, the survivors *are* a color set, not a single accent.

`radius.*` is forced to either `0` (every named radius, including
`pill`) or `9999px` (`full`) — no curve in between, which is the
form-language rule the movement enforced ("primary geometric shapes
only"). `pill` rounds to `full` is the one exception: a rounded
rectangle that's actually a stadium-shape is still considered a
"primary" shape, but a corner-radius of `8px` is not. `elevation.*` is
`none` at every slot except `overlay` (a 2px black ring); depth comes
from shape and color block, never from a fake light source. Easings
are all `linear` — Bauhaus's machine-aesthetic doesn't ease.

Typography is a geometric sans (Futura / Avenir Next) with uppercase
headings — the geometric letterforms that match the geometric shapes.

**A11y:** `pass`. Body text (`#0a0a0a` on `#f5f1e8`) ≈ 17:1, AAA.
`intent.primary` blue (`#1c4eba`) with white content ≈ 7.5:1 — AAA.
`intent.warning` yellow (`#f7c100`) with dark content ≈ 12:1 — AAA.
`intent.danger` red (`#e2241a`) with white content ≈ 5.5:1 — AA at
body, AAA at large. `content.muted` `#5a5a5a` on `base` ≈ 6.5:1 — AA.

**Most likely to fail: `Toggle`.** A toggle is a radius-pill shape by
convention (the thumb traverses a stadium track), but Bauhaus forbids
all curve except `radius.full`. Setting the track radius to `pill`
gets `9999px` — a full stadium — which works visually, but the *thumb*
inside that track also rounds to `9999px`, so the on/off states differ
only in the thumb's position, not in any chamfered geometry. Worse,
intent fills collapse: a "success" toggle and a "primary" toggle both
render blue. Components that need rounded geometry under Bauhaus
should commit to `radius.full` (circles / stadiums only) or fall back
to a square checkbox affordance; the in-between rounded-rectangle
toggle is the one shape this palette refuses to produce.

</details>

---

_Generated from `palettes/bauhaus.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
