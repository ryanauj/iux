# Newspaper / Broadsheet

Editorial register on the flat engine, tuned for classified-ad density.
Serif body (`family.ui` = Georgia / Charter / Times) puts long-form
reading copy into the same family that headlines use, so a single column
reads as one continuous voice. `display` keeps Playfair / Bodoni Moda at
`900 / -0.03em` for stacked-deck front-page headlines; `body` drops to
`0.9375rem` with `lineHeight 1.4` — the narrow-column rhythm of a
broadsheet, not the airy magazine setting Editorial uses (`1.0625rem / 1.65`).

`space.*` tightens one notch below Flat / Classic at the small end
(`1 → 3px`, `2 → 6px`, `3 → 10px`) so dense lists, classifieds, and
stock tables pack the way print does. `radius.*` collapses to `0`
through `lg` — newspaper columns are rules, not pills. `elevation.*` is
`'none'` at every slot except `overlay`, which carries a hard
`0 0 0 1px` printed-frame stroke rather than a soft drop shadow.

Color is newsprint cream-grey (`#e8e3d6`) with ink-black body
(`#0e0d09`) and a single "stop-the-presses" red accent (`#a01818`)
that drives `intent.primary` and the focus ring. Link blue
(`#1c3e7a`) is the only second saturated color and stays cool to keep
the red unique on the page.

**A11y:** `pass`. `content.primary` on `surface.base` ≈ 15:1 (AAA).
`intent.primary` (`#a01818` + inverse `#f4eee0`) ≈ 7.4:1 — AAA at body
text. `info` `#1c3e7a` + inverse ≈ 9.5:1, `success` `#2c4a1f` + inverse
≈ 10.3:1, `danger` `#7a1414` + inverse ≈ 8.6:1, `warning` `#8a5500` +
inverse ≈ 6.0:1 (AA body, AAA large). `content.muted` (`#6e6451`) on
`base` ≈ 4.7:1, OK as decorative meta text.
