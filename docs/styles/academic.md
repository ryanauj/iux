# Academic

> LaTeX journal-article register on the flat engine — Computer Modern serif on every typography role (no sans face anywhere), a `0.8125rem` small-caps label channel for figure markers, and `space.*` widened at the high end for figure-gutter generosity.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Academic is the Editorial register tuned for the typeset-PDF journal-article aesthetic. `family.ui` and `family.display` both resolve to `"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, Georgia, "Times New Roman", serif` — there is no sans face in the palette, the way a journal PDF has no sans face. `body` runs at `1.0625rem / lineHeight 1.7` for long-form reading proportions; `subheading` stays on `display` (serif) at weight 600 because LaTeX section headings are the same family as body, just larger and bolder. `space.*` widens at the high end (`6: '64px'`, `7: '88px'`, `8: '120px'`) for figure-gutter breathing room, and the single restrained accent is academic blue `#3a4f87` — `hyperref`'s default.

## Origin

Donald Knuth's Computer Modern family (1977–) and the LaTeX typesetting tradition that grew around it — mathematical journals, doctoral theses, and physics preprints. The "hyperref" LaTeX package's default link colour and figure / theorem / proof environments codified the visual conventions this palette quotes.

## Signatures

- **Computer Modern serif on every typography role** — `typography.family.ui`, `family.display`, `family.pixel`, and `family.hand` all resolve to `"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, Georgia, "Times New Roman", serif`. There is no sans, no humanist, no display contrast face — the entire palette is one serif family, the way a typeset PDF is.
- **`subheading` stays on `display` (serif) at weight 600** — `typography.role.subheading.family` is `'display'` — i.e. serif — not `'ui'`. LaTeX section headings are the same family as body text, just larger and bolder. Editorial routes `subheading` through `ui` (sans); Academic refuses that split because typeset journals don't.
- **Small-caps surrogate `label` for figure / theorem markers** — `role.label` is `0.8125rem / 600 / tracking 0.06em / textTransform: 'uppercase'` — the small-caps surrogate used for "Figure 1", "Table 3", "Theorem 2.1", "Proof" markers. `caption` is the matching footnote slot at `0.8125rem / 400`.
- **Wide `space.*` at the high end for figure-gutter generosity** — `space.6: '64px'`, `space.7: '88px'`, `space.8: '120px'` — wider than Editorial's `44 / 64 / 88` at every step. The lower end (`1: '6px'`, `2: '12px'`) stays compact so in-paragraph rhythm doesn't drift. The asymmetry mirrors a journal page's outer margin and figure gutter.
- **Single restrained academic-blue accent (`#3a4f87`)** — `color.content.link`, `intent.primary.bg`, and `border.focus` all share `#3a4f87` — `hyperref`'s default link colour. Every other intent stays earth-toned (`success` `#2d5530`, `warning` `#7d5208`, `danger` `#762020`, `info` `#2d4670`) so the blue stays the only attention colour.

## Anti-signatures

- A sans-serif anywhere in `family.ui` or `family.display` (the no-sans rule is structural)
- A `subheading` routed through a sans family — LaTeX doesn't do that
- A non-zero `radius.md` / `radius.lg` (Computer Modern doesn't round corners)
- Soft drop shadows on `elevation.*` (only the `overlay` hairline rule is permitted, like a boxed theorem environment)
- A second saturated accent competing with the academic blue

## Token evidence

| Path | Value | Note |
|---|---|---|
| `typography.family.ui` | `"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, Georgia, "Times New Roman", serif` | `"Latin Modern Roman", "Computer Modern Serif", ...` — serif on the UI family slot, not sans. The structural move. |
| `typography.family.display` | `"Latin Modern Roman", "Computer Modern Serif", "CMU Serif", Cambria, Georgia, "Times New Roman", serif` | Same Computer Modern serif stack as `family.ui`. There is no display contrast face. |
| `typography.role.subheading.family` | `display` | `'display'` (serif), not `'ui'` — LaTeX section headings are the same family as body. |
| `typography.role.body.lineHeight` | `1.7` | `1.7` — long-form reading proportions. Wider than Editorial's `1.65` and Newspaper's `1.4`. |
| `typography.role.label.textTransform` | `uppercase` | `'uppercase'` — small-caps surrogate for `Figure 1` / `Theorem` markers. |
| `space.8` | `120px` | `120px` — figure-gutter generosity at the high end. Wider than Editorial's `88px` or Flat / Classic's `64px`. |
| `color.intent.primary.bg` | `#3a4f87` | Academic blue `#3a4f87` — `hyperref`'s default link colour. Reused at `content.link` and `border.focus`. |
| `elevation.overlay.boxShadow` | `0 0 0 1px rgba(20, 18, 12, 0.30)` | `0 0 0 1px rgba(20, 18, 12, 0.30)` — a hairline rule, like a boxed theorem environment, not a drop shadow. |

## Often confused with

### vs [Editorial](./editorial.md)

Editorial keeps the magazine convention: serif `display`, sans `body`. Academic collapses both onto the same Computer Modern serif stack — there is no sans face anywhere. Editorial uses a terracotta accent on warm-paper cream; Academic uses an academic-blue accent on a slightly-cooler journal-page off-white, with wider `space.*` at the high end for figure gutters.

### vs [Wikipedia / Institutional](./wikipedia.md)

Wikipedia splits serif `display` against sans `body` (the MediaWiki Vector convention), uses clinical white surfaces, denser `0.875rem` body, and the `#3366cc` MediaWiki link blue. Academic stays serif on every role, uses warmer journal-page off-white, runs body at `1.0625rem / 1.7`, and uses the cooler `#3a4f87` hyperref blue.

### vs [Newspaper / Broadsheet](./newspaper.md)

Newspaper is the dense broadsheet sibling — Georgia / Charter serif body at `0.9375rem / 1.4`, tight `space.*`, heavy display weights, a stop-the-presses red accent on cream-grey newsprint. Academic is the airy journal sibling — Computer Modern body at `1.0625rem / 1.7`, wide `space.*` at the high end, restrained blue accent on warm off-white.

### vs [Letterpress](./letterpress.md)

Letterpress engages the print engine for paper-texture overlays and ink-bleed effects. Academic stays on the pure flat engine — the journal-page off-white is a colour value, not a texture, and there is no `paperEdge*` or overlay imagery.

## Where it thrives

- Long-form articles, theses, and reference reading where serif legibility and generous leading carry the page
- Figure / theorem / proof environments — the small-caps `label` and hung-text `caption` are designed for them
- Mathematical or scientific content where the Computer Modern face is the typographic convention

## Where it degrades

- Dense data dashboards — the wide `space.*` and single-blue intent vocabulary waste room and fight category colour
- Marketing CTAs — the palette refuses chromatic punch beyond the single hyperref blue
- Mobile reading at narrow widths — `1.0625rem / 1.7` body wants column width

## Recall aliases

`academic`, `latex`, `journal`, `computer modern`, `paper`, `thesis`, `hyperref`

## Long-form notes

<details>
<summary>From <code>palettes/academic.README.md</code></summary>

# Academic

Editorial register on the flat engine, tuned for the LaTeX journal-
article aesthetic. `family.ui` and `family.display` collapse onto the
same Computer Modern stack ("Latin Modern Roman", "CMU Serif", Cambria,
Georgia) — there is no sans face anywhere in the palette, the way a
typeset PDF has no sans face. `body` runs at `1.0625rem / lineHeight 1.7`
for the long-form reading proportions a journal page assumes;
`subheading` stays on `display` (serif) at `600` weight rather than
borrowing a sans like Editorial does, because LaTeX section headings
are the same family as body, just larger and bolder.

Footnote-style affordances are signaled through the two small roles.
`label` is the small-caps surrogate — `0.8125rem / 600 / tracking 0.06em
/ uppercase` — used for `Figure 1`, `Table 3`, `Theorem`, `Proof`
markers. `caption` is the footnote slot — `0.8125rem / 400 / lineHeight
1.5 / tracking 0.01em` — sized down from body but kept on the same
family for the hung-text feel a journal footnote has.

`space.*` widens at the upper end (`6 → 64px`, `7 → 88px`, `8 → 120px`)
to give pages the generous outer-margin and figure-gutter feel of an
article PDF; the lower end (`1 → 6px`, `2 → 12px`) stays compact so
in-paragraph rhythm doesn't drift. `radius.*` collapses to `0` through
`lg` — Computer Modern doesn't round corners. `elevation.*` is `'none'`
at every slot except `overlay`, which carries a `0 0 0 1px` hairline
rule the way a journal article boxes a theorem environment.

Color is paper-warm-white (`#fbfaf6`) with ink-black body (`#0a0908`)
and a single restrained academic blue (`#3a4f87`) driving both
`color.content.link` and `intent.primary` — `hyperref`'s default colour
move.

**A11y:** `pass` (AAA on body and most intents). `content.primary` on
`surface.base` ≈ 19:1. `intent.primary` `#3a4f87` with inverse
`#fbfaf6` ≈ 8.4:1. `info` ≈ 9.0:1, `success` ≈ 8.8:1, `danger` ≈ 9.1:1,
`warning` `#7d5208` + inverse ≈ 7.0:1 (AAA body, just). `content.muted`
(`#7a766b`) on `base` ≈ 4.5:1, OK as marginalia.

</details>

---

_Generated from `palettes/academic.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
