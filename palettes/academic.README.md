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
