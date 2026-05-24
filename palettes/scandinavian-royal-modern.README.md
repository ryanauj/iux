# Scandinavian Royal Modern

Nordic restraint applied to royal colour. Chalk-white field,
bleached-oak raised surfaces, a deep regal navy as the only saturated
chromatic intent, gold demoted to a 1 px hairline rule on raised
surfaces. The pale-field sibling to Modern Royal in the same register
set: both palettes share the gold / regal vocabulary, but Modern Royal
promotes gold to `intent.primary` on a dark field, and Scandinavian
Royal Modern demotes gold to `border.subtle` on a pale field while
promoting navy to the chromatic role.

`surface.base` is chalk-white (`#f6f3ee`) with a warm undertone;
`surface.raised` lifts to bleached-oak (`#fbf9f4`). The brighter raised
colour reads as a piece of light wood against a pale plaster wall —
the standard Scandinavian-interior reference. `surface.sunken` drops
to `#ece8e0` so input wells read recessed without a shadow.

`intent.primary.bg` is deep regal navy (`#1a2c4e`) — the only
saturated chromatic intent. `intent.info.bg` shares the same navy
(the palette doesn't need a second blue), and `content.link` and
`border.focus` reuse the same value. `intent.success`, `intent.warning`,
`intent.danger` remain solid but desaturate one or two steps from
Flat / Classic so they read as functional, not decorative.

Gold (`#9c7a2b`) is **not** an `intent.*` here. It appears only as
`border.subtle` at low alpha (`rgba(156, 122, 43, 0.20)`) on raised
surfaces — a 1 px hairline that picks up the regal vocabulary without
committing the palette to a second saturated colour. The same gold
appears in `border.strong` at full saturation for emphasis borders
when a component needs heavier separation.

`typography.family.display` is Cormorant Garamond at weight `400`
(regular, not bold) — Nordic editorial design rarely bolds its serif
headings; it sizes them. The lighter weight at larger sizes is what
distinguishes this palette from Modern Royal's `500`. `family.ui` and
`family.body` are Inter / Söhne for clean body type.

`space.*` scales 1.25× from Flat / Classic at the high end: `space.4`
is `20px` (vs `16px`), `space.5` is `30px` (vs `24px`), `space.7` is
`60px` (vs `48px`), `space.8` is `80px` (vs `64px`). The wider scale
is the load-bearing Nordic breathing-room cue — committed at the
token level so every component picks it up without per-component work.

`elevation.low` is `0 0 0 1px rgba(156, 122, 43, 0.20)` — a 1 px
gold-tinted hairline ring, not a soft drop shadow. Cards lift via the
rule rather than via a penumbra; the same trick Wikipedia uses to
keep the page reading as a printed document. `medium` and `high`
add very-low-alpha soft shadows (`rgba(26, 44, 78, 0.04 → 0.06)`) on
top of the rule for emphasis.

**A11y:** `pass`. `content.primary` (`#1a1c24`) on `surface.base`
(`#f6f3ee`) ≈ 16:1 — AAA at every size. `intent.primary.bg` `#1a2c4e`
with cream inverse `#fbf9f4` ≈ 13.5:1 (AAA). `intent.success` `#2f5b3a`
+ cream inverse ≈ 7.2:1 (AAA). `intent.danger` `#7d2230` + cream
inverse ≈ 8.5:1 (AAA). `intent.warning` `#9c7a2b` + cream inverse ≈
4.6:1 (AA body, AA large). `border.focus` navy on chalk-white ≈
13.5:1, well past the 3:1 focus-contrast threshold even at the 2 px
stroke width. `content.muted` `#7d8090` on base ≈ 4.7:1 — AA at
default body size, OK as decorative meta text.
