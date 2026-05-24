# Metro / Light

Transit-map information-graphic on the Flat engine. Near-white field,
hairline "track-rule" borders carrying every raised surface, NYC subway
line-colour palette as the `intent.*` vocabulary, Helvetica throughout.
The MTA Standards Manual (Unimark / Vignelli, 1970) translated into
Flat tokens — the load-bearing visual is the 1 px hairline rule that
lifts cards via box-shadow stroke rather than a soft drop shadow.

`surface.base` is `#fcfcfc` — a half-step off pure white so the
hairline rules read against the field. Pure white would make the 1 px
stroke visually disappear at small zoom levels. `surface.raised` is
`#ffffff`; `surface.sunken` is `#f4f4f4` for input wells. The "track-
rule" border colour is `#e6e6e6` (1 px), the same neutral grey transit
maps use to separate map regions.

Intents take their colours from the NYC subway line palette:
`intent.primary.bg` is `#ee352e` (1/2/3 line red, the canonical
"primary" line in the MTA's signage hierarchy); `intent.info.bg` is
`#0039a6` (A/C/E line blue, also carrying `content.link` and
`border.focus`); `intent.success.bg` is `#00933c` (4/5/6 line green);
`intent.warning.bg` is `#ff6319` (B/D/F/M line orange);
`intent.danger.bg` reuses the 1/2/3 red one step darker (`#c8201a`) so
danger and primary don't read identical when stacked.

The line-colour palette is the load-bearing semantic move. Metro / Light
is the only palette in the set that ships a public-domain transit-map
colour system as `intent.*` — the alternative would be a `color.category.*`
namespace (as the concept doc flagged), but the current Flat-register set
doesn't yet have a second palette that would also need it, so the
contract addition is deferred.

`typography.family.ui` and `family.display` both resolve to
`"Helvetica Neue", "Helvetica", "Arial", system-ui, sans-serif`. The
single-family stack is the canonical transit-map type — Vignelli's
1970 manual specifies Helvetica throughout. No serif, no condensed,
no second face: Helvetica does every job at different sizes and
weights. Display roles run at `700` (bold); transit-map type is sized
AND weighted, not regular at large sizes.

`elevation.low` is `0 0 0 1px #e6e6e6` — a 1 px box-shadow stroke,
no soft penumbra. Cards / panels / inputs lift via the rule alone.
`elevation.medium` and `elevation.high` add soft drop shadows on top
of the rule for emphasis. `elevation.overlay` (modals) drops the rule
and uses a strong soft shadow alone so floating panels lift clearly
above the map plane — the only slot where the register breaks its
hairline-first convention.

`radius.*` matches Flat / Classic verbatim: `radius.lg` is `10px` for
cards, `radius.full` is `9999px` for circles, `radius.pill` is `999px`
for station-tag chips. The pill chip is the transit-map vocabulary's
canonical UI element and the standard `radius.full` slot exercises it.

**A11y:** `pass`. `content.primary` `#0a0a0a` on `surface.base`
`#fcfcfc` ≈ 19:1 — AAA. `intent.primary` 1/2/3 red + white inverse ≈
5:1 (AA body, AAA large) — the threshold the MTA's signage ships at.
`intent.info` A/C/E blue + white inverse ≈ 10:1 (AAA). `intent.success`
4/5/6 green + white inverse ≈ 4.7:1 (AA body). `intent.warning`
B/D/F/M orange + white inverse ≈ 3.6:1 (AA large only) — the
public-domain orange sits at this contrast; the palette commits to
the period-correct value rather than darkening it. `border.focus` A/C/E
blue on near-white ≈ 10:1, well past the 3:1 focus threshold.

The B/D/F/M orange at the AA-large threshold is the palette's
tightest contrast. Components that route through `intent.warning`
should use the colour for backgrounds with large white inverse text
(badges, status pills, alert headlines), not for small body text
overlaid on the orange fill.
