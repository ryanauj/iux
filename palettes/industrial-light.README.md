# Industrial / Light

Workshop-drawing register inverted to a light field. Warm-paper
surfaces, steel-grey + concrete-grey neutrals, safety-orange
`intent.primary`, IBM Plex Mono on `family.ui` so labels and forms
render in mono. The light-mode inversion of the dark-workshop
aesthetic carried by CRT / Phosphor and Bloomberg Terminal — same
colour and type vocabulary, opposite field.

`surface.base` is warm-paper white (`#fbf8f1`); `surface.raised` is
`#ffffff`. The cream undertone is what makes the palette read as
"printed engineering drawing" rather than "white-page UI". Borders
pick up the same warm tone (`#d6d2c8`, 1 px hairline). `surface.sunken`
drops to `#f0ece2` so input wells read recessed against the cream field.

`intent.primary.bg` is safety orange (`#ff6a00`) — the workshop
hi-vis colour, the only saturated chromatic accent in the palette.
`intent.primary.bg`, `border.focus`, and `content.link` all share this
orange. `intent.warning.bg` reuses safety orange one step darker
(`#d45600`) so the two intents don't read identical when stacked.
`intent.success`, `intent.danger`, `intent.info` desaturate (forest
green, oxblood red, steel-blue info) so the register stays workshop-
quiet — no second saturated chromatic.

`typography.family.ui` is `"IBM Plex Mono", "JetBrains Mono",
"Berkeley Mono", "Courier Prime", ui-monospace, monospace` — labels,
captions, input affordances all render in mono. `family.body` falls
through the same chain, but body text at `0.9375rem` and `lineHeight:
1.6` is tuned to stay readable in mono. `family.display` is Inconsolata
(italic-friendly mono) for drawing-label headings. The mono-everything
typography is the load-bearing register cue — Industrial / Light is one
of the only Flat palettes in the showcase that doesn't carry a sans
body family.

`space.*` tightens at the high end: `space.5` is `20px` (vs `24px`),
`space.6` is `28px` (vs `32px`), `space.7` is `40px` (vs `48px`),
`space.8` is `56px` (vs `64px`). The drawing-density compression rather
than magazine breathing room. `radius.*` collapses at the low end:
`sm: 0`, `md: 2px`, `lg: 4px` — the sharp-corner workshop language.
`radius.pill` stays `999px` for tags that need it; `radius.full` stays
`9999px` for circles.

`elevation.low` is `0 0 0 1px #d6d2c8` — a 1 px box-shadow stroke,
the printed-on-paper hairline rule (same trick Metro / Light and
Wikipedia use). `elevation.medium` and `elevation.high` add soft drop
shadows ON TOP of the rule for components that need clearer separation.
`elevation.overlay` (modals) drops the rule and uses a strong soft
shadow alone so floating panels lift clearly above the page plane.

`motion.*` is slightly snappier than Flat / Classic: `duration.base`
is `160ms` (vs `200ms`) and `easing.standard` is the symmetric
in-out curve (`cubic-bezier(0.4, 0, 0.2, 1)`) — workshop UI prefers
crispness over settling, the way a mechanical drafting compass clicks
into place.

**A11y:** `pass`. `content.primary` `#2a2620` on `surface.base`
`#fbf8f1` ≈ 13.2:1 — AAA. On `surface.raised` `#ffffff` ≈ 14.5:1 —
AAA. `intent.primary` safety orange + white inverse ≈ 3.2:1 — AA
large, not AA body. The palette ships safety orange as the
primary intent because the workshop vocabulary commits to it, but the
contrast caveat means primary buttons should use bold body weight or
larger sizes when the white inverse text lives inside the fill;
small-text labels routed through `intent.primary` should be tested
against the actual button size in the consuming UI. `intent.warning`
`#d45600` + white inverse ≈ 4.8:1 (AA body). `intent.success` `#1f7a3a`
+ white inverse ≈ 5.2:1 (AA body). `intent.danger` `#a8201a` + white
inverse ≈ 6.8:1 (AAA). `intent.info` `#3e5a78` + white inverse ≈ 6.2:1
(AAA). `border.focus` safety orange on warm-paper base ≈ 3.2:1 (AA
focus contrast — the 2 px ring at 2 px offset gives perceptual weight
where the colour contrast is at the threshold).

The safety-orange-at-AA-large is the documented constraint. The
workshop vocabulary commits to the hi-vis colour even though it isn't
the strongest AA-body fill — the alternative would be a darker orange
that loses the safety-vest register. The palette ships the period-
correct colour; consumers needing AA-body on small primary text
should override `intent.primary.content` to the darker walnut ink
`content.primary` (`#2a2620`) when the orange fill is small enough
that the visual hi-vis cue isn't carrying the affordance alone.
