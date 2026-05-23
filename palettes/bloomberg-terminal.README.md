# Bloomberg Terminal

Flat engine collapsed to a pure-black field and a single phosphor amber.
The "information density as aesthetic" register: every decorative slot
is starved so the data has nowhere to hide.

`surface.*` is uniform `#000000` at every slot — `base`, `raised`,
`sunken`, and `overlay` all paint pure black. Surfaces are
differentiated by hairline amber frames inside `elevation.*`, never by
a depth simulation or by a tonal shift. `radius.*` is `0` across the
board including `pill` and `full` — a terminal doesn't round anything.
`space.*` tightens by one notch at every step (`1 → 2px`, `4 → 8px`,
`8 → 32px`) so dense tables and grids carry as much information per row
as the layout allows. `typography.family.*` aliases every slot to
`IBM Plex Mono` — there is no proportional face anywhere in the palette;
display roles are uppercase, body roles are not, both stay on mono.
`motion.*` collapses to linear easing with `fast / base / slow` held to
`0ms / 60ms / 120ms` — terminals snap, they don't ease.

The accent set is deliberately starved. `content.primary` is the
signature Bloomberg amber (`#ffa028`); `secondary` and `muted` are
alpha-graded amber. `intent.primary`, `intent.neutral`, `intent.warning`,
and `intent.info` all collapse to the same amber, distinguished only by
border weight and `bg` opacity. `intent.success` (`#00c850`) and
`intent.danger` (`#ff5454`) are the **only** two non-amber colors and
they exist strictly to read as DATA — positive and negative deltas in a
P&L column — not as decoration. There is no sixth or seventh "brand"
color anywhere.

**Data-app fit.** Tested against `Expense log` and `Habit / streak
tracker` — the two data-heavy apps in the showcase — and it carries
both. The expense ledger is the palette's native shape: a long
`Table` of mono numbers in amber on black with green / red deltas in
the rightmost column, every row separated by `border.subtle`. The habit
heat-map carries through the contract by graduating
`rgba(255, 160, 40, …)` across six alpha steps, so "six shades of the
accent" — the rule AAA breaks — works here on alpha rather than hue.
If either app didn't read in this palette, the palette would be wrong;
they do, so it isn't.

**A11y:** `experimental`. `content.primary` `#ffa028` on `#000000`
sits at ≈ 10.8:1 — AAA at every size. Green `#00c850` on black ≈ 7.6:1
and red `#ff5454` on black ≈ 5.4:1 — both AA at body, the green AAA.
`content.muted` (`rgba(255, 160, 40, 0.46)` on black) lands at ≈ 2.6:1,
under AA — `muted` is reserved for placeholders and decorative dividers
in the contract, but reviewers should not promote it to body. Single-
phosphor amber on black is also vulnerable to severe afterimage and
eye fatigue during long sessions, hence the `experimental` tag — the
intended use is short-lived dense reads, not all-day editorial.

**Most likely to fail: `Loading / Skeleton` (variant 2 — shimmering
rectangles).** A skeleton shimmer is a luminance gradient swept across
a rectangle; the component derives the swept stops from
`color.surface.raised` and `color.content.muted`. Bloomberg paints
`surface.raised` at the same `#000000` as `surface.base`, and `muted`
is the lowest-alpha amber in the palette — the gradient has nothing to
sweep between, so the shimmer reads as an immobile rectangle. The fix
isn't at the palette level — single phosphor on black is the contract
the palette is exporting. The fix is at the **component** level: a
Bloomberg-shaped skeleton is a blinking amber block-cursor (`█`) at the
field position, advancing on `motion.duration.base`, which is closer to
a real terminal's loading UX anyway. Decorative chrome that depends on
tonal variance across surfaces — shimmer, hover-lift on `Card`, media
overlays, illustrated `EmptyState` — degrades here for the same root
reason. That's the teaching note: this palette eats decoration, on
purpose.
