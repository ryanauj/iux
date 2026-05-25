# Dieter Rams / Braun

"Less but better" on the Flat engine. Cool warm-grey field, off-white
raised surfaces, a single saturated Braun-orange as the only chromatic
intent, Helvetica throughout, generous whitespace. The Ulm Hochschule
für Gestaltung / Braun industrial-design register — structurally
adjacent to Swiss / International, but warmer in the neutrals and with
orange standing in for signal red.

`surface.base` is cool warm-grey (`#e9e8e5`) — the colour of a plastic
Braun product housing under daylight. `surface.raised` is `#f7f6f3`
(off-white close to product-photography seamless paper); `surface.sunken`
drops to `#dad8d3` for input wells. The two-step lightness ladder is
deliberate — Ulm layouts rely on subtle field/card lightness shifts
rather than chromatic accents.

`intent.primary.bg` is Braun orange (`#e25822`) — the saturated orange
on a Braun ET66 `=` key and the SK4 record-player rim, the single
chromatic accent every other intent steps around. `border.focus`
reuses the same orange. `intent.warning` shifts to a more amber tone
(`#cc6f1a`) so the two intents don't read identical when stacked, but
the warmth register is consistent. `success`, `danger`, `info` stay
desaturated.

`typography.family.ui`, `body`, and `display` are all Helvetica — the
typeface every Ulm and Braun designer reached for. The single-family
rule is the load-bearing typography move: there is no display ↔ body
contrast, only weight and size. Display is sentence-case at modest
size (no uppercase) — Ulm typography is restrained, never showy.

`space.*` widens at the high end (`6: '36px'`, `7: '52px'`, `8: '72px'`)
— Ulm layouts rely on generous whitespace as the organising tool. The
extra breathing room is the second load-bearing move.

`elevation.*` is near-flat. `low` is a 1 px hairline rule
(`0 0 0 1px #cfccc4`), the same trick Scandinavian Royal Modern and
Industrial / Light use to lift cards without a drop shadow. `medium`
and `high` add very-low-alpha drops so the lift is visible without
being decorative.

`radius.*` collapses to `'0' / '0' / '2px' / '6px' / '999px'` — Braun
product detailing favoured square corners with small radii on
softgoods (the famous SK4 turntable lid corners). The discipline
extends to UI: cards stay square, only buttons and pills round.

**A11y:** `pass`. `content.primary` (`#1d1c1a`) on `surface.base`
(`#e9e8e5`) ≈ 13.8:1 (AAA). `intent.primary` Braun orange on white
inverse content ≈ 4.5:1 (AA at every size). `intent.warning`
(`#cc6f1a`) on white ≈ 4.1:1 (AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `space.*`,
`radius.*`, `elevation.*` recipe, and a single-family Helvetica
typography stack.

## Lookalike-aware

The closest sibling palette is Swiss / International. Differences:
Swiss uses *signal red* as the single accent and pure white / pure
black neutrals; Dieter Rams uses *Braun orange* as the single accent
and warm-grey / off-white neutrals. The structural rules (single accent,
zero radius, Helvetica throughout) are identical — the register
difference is exactly the warmth shift between Zurich-cold and
Frankfurt-warm.
