# Financial Terminal

Flat engine in a generic trading-workstation register: amber phosphor
on a dark field, mono-typed labels, P&L green/red as data. Reads as a
financial terminal without copying any single vendor's house style.

`surface.*` tiers across a near-black field so cards, sunken wells, and
dialogs separate from the page without breaking the dark-terminal
aesthetic. `surface.base` stays pure black; `raised` warms one notch
toward amber (`#0a0805`); `overlay` warms two notches (`#18120a`) so
menus and modals pop clearly above the field. `radius.*` is `0` across
the board including `pill` and `full` — a terminal doesn't round
anything. `space.*` runs one notch tighter than the Flat default at the
mid steps (`5 → 16px`, `6 → 24px`) so dense tables still carry more
rows per page than an editorial layout, but the lower steps are no
longer crushed (`1 → 4px`, not `2px`) so component internals can
breathe. `typography.family.ui` is a sans face (`Inter` + system) so
body prose and form fields stay readable; `display`, `mono`, and `code`
remain on `IBM Plex Mono` so headings, labels, and numeric columns keep
the terminal register.

The intent set is deliberately split. `intent.primary` and
`intent.neutral` stay on amber so the primary affordance reads as "the
terminal". `intent.warning` splits to yellow (`#ffd84a`) and
`intent.info` to cool cyan (`#5ec8ff`) so the four intents stop
collapsing into one hue — the legibility regression the all-amber
register caused for `Alert`, `Toast`, `Badge`, and `Tag`.
`intent.success` (`#00c850`) and `intent.danger` (`#ff5454`) still
anchor the P&L axis: positive and negative deltas in the right-most
column of a ledger.

**Data-app fit.** Tested against `Expense log` and `Habit / streak
tracker` — the two data-heavy apps in the showcase — and it carries
both. The expense ledger is the palette's native shape: a long `Table`
of mono numbers in amber on black with green / red deltas in the
rightmost column, every row separated by `border.subtle`. The habit
heat-map carries through the contract by graduating
`rgba(255, 160, 40, …)` across six alpha steps, so "six shades of the
accent" — the rule AAA breaks — works here on alpha rather than hue.
If either app didn't read in this palette, the palette would be wrong;
they do, so it isn't.

**A11y:** `experimental`. `content.primary` `#ffa028` on `#000000` sits
at ≈ 10.8:1 — AAA at every size. Green `#00c850` on black ≈ 7.6:1, red
`#ff5454` on black ≈ 5.4:1, yellow `#ffd84a` on black ≈ 12:1, and cyan
`#5ec8ff` on black ≈ 8.2:1 — every intent passes AA at body, most pass
AAA. `content.muted` (`rgba(255, 160, 40, 0.66)` on black) lands at
≈ 4.7:1 — AA at body — so secondary text and dividers read instead of
disappearing the way they did at the previous 0.46 alpha. The
`experimental` tag stays because amber phosphor on black is still
vulnerable to severe afterimage and eye fatigue during long sessions;
the intended use is short-lived dense reads, not all-day editorial.

**Most likely to fail: `Loading / Skeleton` (variant 2 — shimmering
rectangles).** A skeleton shimmer is a luminance gradient swept across
a rectangle; the component derives the swept stops from
`color.surface.raised` and `color.content.muted`. Even with the new
amber-warm `surface.raised` (`#0a0805`), the spread between `raised`
and `muted` is narrow, so the shimmer reads as a slow pulse rather than
a clear sweep. The fix isn't at the palette level — single phosphor on
a dark field is the contract the palette is exporting. The fix is at
the **component** level: a terminal-shaped skeleton is a blinking amber
block-cursor (`█`) at the field position, advancing on
`motion.duration.base`, which is closer to a real terminal's loading UX
anyway. Decorative chrome that depends on tonal variance across
surfaces — shimmer, hover-lift on `Card`, media overlays, illustrated
`EmptyState` — degrades here for the same root reason. That's the
teaching note: this palette eats decoration, on purpose.
