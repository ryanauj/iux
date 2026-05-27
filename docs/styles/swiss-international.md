# Swiss / International Style

> Three colours, one grotesque, zero curves — pure white surfaces, pure black ink, signal red (`#e30613`) as the only attention colour, Helvetica Neue throughout, and every `radius.*` slot collapsed to `0`.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Swiss / International Style is the flat engine collapsed to a three-colour field. `surface.*` is uniformly `#ffffff`, `content.primary` and every border are `#000000`, and signal red `#e30613` carries `intent.primary`, `intent.danger`, `intent.warning`, `color.content.link`, and `border.focus` — the only saturated colour the palette permits. `intent.success`, `intent.info`, and `intent.neutral` collapse to black or white. `radius.*` is `0` at every named slot (`sm`, `md`, `lg`, `pill`) and only `full` is rounded — the modular grid does the visual organising, not curves. `typography.family.display` is Helvetica Neue / Helvetica / Arial, the period-correct grotesque the style is named for.

## Origin

Mid-century Swiss graphic design (Zurich and Basel, 1950s–1960s) — Müller-Brockmann, Hofmann, Ruder, the modular-grid posters and timetables that became the International Typographic Style. Akzidenz-Grotesk and Helvetica (Haas'sche Schriftgiesserei, 1957) carried the typographic voice; signal red on white-black organised the page without semantic colour pretence.

## Signatures

- **Signal red `#e30613` as the only saturated colour** — `intent.primary.bg`, `intent.danger.bg`, `intent.warning.bg`, `color.content.link`, `border.focus`, and `effect.focusRing.color` all share `#e30613`. `intent.success` and `intent.info` collapse to `#000000`. The palette deliberately surrenders multi-intent chromatic distinction in service of typographic hierarchy.
- **Helvetica Neue / Helvetica / Arial on every typography slot** — `typography.family.ui` and `family.display` are both `"Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif`. The grotesque is structural — there is no serif, no humanist, no display contrast face. Hierarchy comes from size and weight, not from family.
- **Every `radius.*` collapsed to `0` except `full`** — `radius.none`, `sm`, `md`, `lg`, and `pill` are all `0`. Only `full` (`9999px`) is rounded — and that's reserved for circles. The modular grid demands hard rectangles; rounded corners would soften the geometry the style is built on.
- **Pure white surfaces with no tonal layering** — `surface.base`, `raised`, `sunken`, and `overlay` are all `#ffffff`. Depth comes from layout position and whitespace, never from a tonal step or a fake light source. `elevation.*` is `none` at every slot except `overlay`, which carries a 1px black hairline (`0 0 0 1px #000000`) — a printed-frame stroke, not a drop shadow.
- **Linear easings, short durations** — Every easing in `motion.easing.*` is `linear`. Durations are short (`fast: 100ms`, `base: 160ms`, `slow: 240ms`). The style is anti-rhetorical — transitions should not editorialise. No springs, no overshoot, no decorative motion curves.

## Anti-signatures

- A second saturated chromatic intent (a blue or green next to the red breaks the three-colour rule)
- Any non-zero `radius.sm` / `radius.md` / `radius.lg` (rounded rectangles are the form the style refuses)
- A serif `display` family — the grotesque rule is structural
- Tonally-layered surfaces (a grey `surface.sunken` against a white `base`)
- Easing curves other than `linear` — Swiss does not editorialise motion

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.intent.primary.bg` | `#e30613` | Signal red `#e30613` — the only saturated colour in the palette. Reused at `intent.danger`, `intent.warning`, `border.focus`, `content.link`. |
| `color.intent.success.bg` | `#000000` | `#000000` — `success` collapses to black; the palette refuses a green channel. |
| `typography.family.display` | `"Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif` | `"Helvetica Neue", "Helvetica", "Arial", "Liberation Sans", sans-serif` — the period-correct grotesque. |
| `radius.md` | `0` | `0` — every named radius collapses except `full`. The modular grid forbids curves. |
| `elevation.overlay.boxShadow` | `0 0 0 1px #000000` | `0 0 0 1px #000000` — a hard hairline stroke, not a soft drop shadow. |
| `motion.easing.standard` | `linear` | `linear` — every easing is linear; motion does not editorialise. |

## Often confused with

### vs [Dieter Rams / Braun](./dieter-rams.md)

Dieter Rams is the warm-grey, Braun-orange sibling of the same doctrine — Helvetica throughout, single saturated accent, near-zero radius. The difference is exactly the temperature: Swiss commits to pure white / pure black / signal red (Zurich-cold); Dieter Rams commits to warm-grey / off-white / Braun-orange (Frankfurt-warm).

### vs [Bauhaus](./bauhaus.md)

Bauhaus uses the three primaries (red + yellow + blue) on cream with geometric sans (Futura) display and uppercase headings — a chromatic teaching set. Swiss collapses to a single accent (red), uses Helvetica (a grotesque, not a geometric), and rejects uppercase as a typographic device. Both refuse curves; only Bauhaus refuses lowercase headings.

### vs [High-Contrast AAA](./aaa.md)

AAA also pins pure black on pure white with a single accent and zero radius, but its accent is CSS link-blue `#0000ee`, its focus ring is `double` 3px, and every `motion.duration.*` is `'0ms'`. Swiss uses signal red, a `solid` 2px focus ring, and short linear-eased durations — the brief is typographic modernism, not contrast-tier compliance.

### vs [Flat / Classic](./flat-classic.md)

Flat / Classic is the unornamented baseline with system fonts, indigo-blue accent, and soft drop shadows. Swiss replaces the system font with Helvetica, the indigo with signal red, the soft shadow with a hairline stroke, and every non-`full` radius with `0` — Flat / Classic with the dial turned all the way toward modular-grid discipline.

## Where it thrives

- Editorial typography, posters, masthead-style headers — the modular grid is the brief
- Wayfinding, schedule and timetable layouts — the style was invented for them
- Single-column reading interfaces with a clear hierarchy of size and weight

## Where it degrades

- Multi-intent toasts and alerts — success / warning / danger / info collapse to two visual states (red or black) and components must encode intent through icon and label instead of fill (README flags Toast as most-likely-to-fail)
- Dashboards with category-coloured charts — the three-colour rule fights category palettes
- Decorative marketing pages — the palette refuses curves, gradients, and a second saturated accent

## Recall aliases

`swiss`, `swiss international`, `international style`, `swiss style`, `international typographic style`, `helvetica`, `müller-brockmann`

## Long-form notes

<details>
<summary>From <code>palettes/swiss-international.README.md</code></summary>

# Swiss / International Style

Flat engine collapsed to a three-color field: pure white `surface.*`,
pure black borders and body, signal red (`#e30613`) as the only accent
and the only attention color. Every intent that isn't `primary`/
`danger`/`warning` resolves to black; the palette deliberately
surrenders semantic-color distinction in service of typographic
hierarchy.

`radius.*` is `0` for everything but `full` (which only circles use) —
the modular grid does the visual organizing, not curves. `elevation.*`
is `none` at every slot except `overlay`, which carries a 1px black
hairline rather than a shadow; depth comes from layout position and
whitespace, never from a fake light source. Motion easings are all
`linear` and durations short — the style is anti-rhetorical, so
animations don't over-express. Display family is Helvetica Neue /
Helvetica / Arial — the period-correct grotesque the style is named
for.

**A11y:** `pass`. Body text (`#000000` on `#ffffff`) is the
contrast-ratio ceiling at 21:1 — AAA at any size. `link` red
(`#e30613`) on white sits at ≈ 5.7:1 — AA at body, AAA at large.
`content.muted` `#737373` on white is ≈ 4.6:1, just over the AA
threshold. Red on white reverses (`#e30613` `content.inverse` `#ffffff`)
clear AA cleanly. Focus ring is signal red, 2px solid — meets AA focus
contrast against every surface.

**Most likely to fail: `Toast`.** A toast is exactly the surface where
intent-color distinction *must* read at a glance — success / warning /
danger / info are the contract — and in this palette they collapse to
two states: red (`primary` / `warning` / `danger`) or black (`success`
/ `info` / `neutral`). A "success" toast is visually identical to an
"info" toast; a "warning" is visually identical to a "danger". The
fix is not at the palette level — it's at the component level, by
distinguishing the four collapsed intents through icon + label, not
fill. Components that need to express more than two intents in this
palette must encode it in the typography or the icon, not in the
intent color.

</details>

---

_Generated from `palettes/swiss-international.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
