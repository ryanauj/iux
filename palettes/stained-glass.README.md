# Cathedral / Stained Glass

Gothic-window register on the Flat engine. Lead-black field, saturated
jewel-tone intents (cobalt, ruby, emerald, amber, amethyst), heavy
lead borders on every raised surface. The first palette in the set
whose `border.*` carries as much visual load as `intent.*` — the lead
came is the geometry, the colour is the light coming through.

`surface.base` is lead-black (`#0d0a14`) — the colour of oxidised lead
came viewed against a dim narthex. `surface.raised` lifts one notch to
`#16131e`; `surface.sunken` darkens to `#0a0810`. The lightness ladder
between surfaces is tight (just enough to read as "panes within panes")
because the actual lift comes from the visible lead borders.

`border.default` is `#2a2436` (visible lead at 2 px); `border.strong` is
`#3e364e` (heavy lead at cardinal joins). `borderWidth.thick` is `'3px'`
so the lead reads as structural, not decorative — every Card and Modal
gets a real leaded outline rather than a hairline rule.

Every intent is a saturated medieval-glass jewel tone with high-contrast
inverse content:

- `intent.primary` is amethyst (`#6a2ea0`) — the rose-window centre piece
- `intent.info` is cobalt (`#1f4ec8`) — the most common jewel in a Chartres
  west-window
- `intent.success` is emerald (`#1f7a4a`) — the herald-of-spring leading
- `intent.warning` is amber (`#c4801a`) — the rare gold-leaded panel
- `intent.danger` is ruby (`#a8221a`) — the passion / martyrdom red

The five-colour set evokes a Chartres rose window; the desaturated
`neutral` keeps the lead in the foreground when no intent is active.
`content.link` is the amber jewel, demoted from primary so links read
as "highlighted in the window" rather than "a competing royal accent."

`typography.family.display` is Cinzel (carved-stone caps as the
gothic-feel surrogate — UnifrakturMaguntia would crush at digital
reading sizes). `family.body` is Cormorant; `family.ui` is Inter.
Display runs at `uppercase` with `0.05em` tracking — the cathedral-
inscription register.

`radius.*` collapses to `'0' / '0' / '2px'` — leaded-glass joinery is
straight cuts, never curves. `pill` stays at `'999px'` for tags that
need it.

`elevation.*` is mostly hairline-rule based: `low` is `0 0 0 1px #2a2436`
(the visible lead, painted via shadow), `medium` and `high` add soft
ink-tinted drops. The shadow tint matches the field so cards layer as
panes within a single composition.

**A11y:** `experimental`. The cobalt + ruby intents pass 3:1 against
white inverse content at standard sizes but sit close to the floor;
`intent.primary` (amethyst) is the most fragile at ≈ 6.8:1 with white
inverse (passes), but darker contexts on `surface.base` reduce
perceived contrast. The palette is the teaching example for "jewel tones
look great in isolation and contrast-fail quietly under realistic
on-page composition." Long-form body should sit on `raised` (≈ 12.5:1)
where contrast holds clearly above the AA floor.

## Engine cost

Zero new tokens. Pure Flat-engine configuration. The lead-came visual
is delivered by `border.*` + `borderWidth.*` at heavier weights than
most palettes use — both slots are already in the contract.
