# Desert Modernism

> Palm Springs mid-century register — sun-baked cream field, desert-terracotta `intent.primary`, pool-turquoise `intent.info`, palm-shade-green `intent.success`, Futura PT display.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Desert Modernism is the Palm-Springs-resort register on the Flat engine — the same chassis as Mid-century modern, tuned to the Coachella-Valley outdoor palette instead of the Eames indoor-textile palette. Sun-baked cream (`#f5e9d4`) fills `surface.base`; desert terracotta (`#9c3d1f`) carries `intent.primary`; pool turquoise (`#1f7d8a`) carries `intent.info`; palm-shade green (`#356a3a`) carries `intent.success`. Futura PT on display and Inter on body keep the typography geometric + humanist.

## Origin

The Palm Springs mid-century-modern architecture scene, c.1946–1965 — Albert Frey, John Lautner, Donald Wexler, William Krisel residential and resort buildings. The colour vocabulary is pulled directly from the landscape: baked-clay roof tiles, unheated swimming-pool turquoise, palm-shadow shade, mustard dry-grass, rust-red rock. Futura PT is the typeface era-correct for the period's real-estate brochures and resort signage.

## Signatures

- **Sun-baked cream field with desert-terracotta `intent.primary`** — `surface.base` `#f5e9d4` (a stucco wall in the shade at 3 p.m.); `intent.primary.bg` `#9c3d1f` (the baked-clay roof tile of a Frey residence). The cream is warmer than Editorial / Mid-century-modern; the terracotta is the saturated outdoor primary that distinguishes Desert from indoor mid-century.
- **Pool turquoise as `intent.info`** — `intent.info.bg` `#1f7d8a` — the saturated cyan of an unheated Coachella pool at midday. Distinct from Riso blue (`#1755bf`) and Bullet Train sky blue — this is specifically the chlorinated-pool turquoise.
- **Palm-shade green `intent.success` + desert-mustard `intent.warning`** — The four desert intents tie together via climate: `success` `#356a3a` (palm-shade green), `warning` `#9c6a14` (desert mustard), the warmth register is consistent across the palette so the four-colour set reads as "Palm Springs at noon" rather than as a brand colour vocabulary.
- **Futura PT display + Inter body** — `typography.family.display` is Futura PT (Avenir Next fallback) — the humanist-geometric sans tied to the era. `family.body` is Inter for long-form reading. The geometric counters cue mid-century without committing the body to a costume typeface.

## Anti-signatures

- Walnut or teal accents (those are indoor Mid-century-modern's textile register)
- A cool-grey `surface.base` — the cream needs the desert warmth
- A serif display family — the geometric sans is the era cue
- A red `danger` saturated enough to compete with the terracotta `primary`

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f5e9d4` | Sun-baked cream `#f5e9d4` — stucco-wall colour in shade. |
| `color.intent.primary.bg` | `#9c3d1f` | Desert terracotta `#9c3d1f` — baked-clay roof tile colour. |
| `color.intent.info.bg` | `#1f7d8a` | Pool turquoise `#1f7d8a` — unheated Coachella pool at midday. |
| `color.intent.warning.bg` | `#9c6a14` | Desert mustard `#9c6a14` — dry-grass colour tying the warmth register together. |
| `typography.family.display` | `"Futura PT", "Futura", "Avenir Next", "Avenir", "Inter", system-ui, sans-serif` | Futura PT — humanist-geometric sans tied to the era. |

## Often confused with

### vs [Mid-century modern](./mid-century-modern.md)

Same Flat engine, same era. Mid-century modern is the Eames indoor-textile register: cream + walnut + mustard + teal, with an atomic-dot field overlay via `effect.overlay.image`. Desert Modernism is the Palm-Springs outdoor register: cream + terracotta + pool turquoise + palm green, no overlay. Indoor textile palette vs outdoor landscape palette — siblings, not duplicates.

### vs [Heritage Maritime](./heritage-maritime.md)

Both palettes use a cream field with multiple period-correct accents. Heritage Maritime: navy `primary` + brass `warning` + signal-red `danger` (nautical / chandlery register). Desert Modernism: terracotta `primary` + pool turquoise `info` + palm green `success` (Palm Springs register). Different `surface.base` warmth (Heritage cooler, Desert warmer) and entirely different intent vocabularies.

### vs [Industrial / Light](./industrial-light.md)

Industrial / Light is the warm-paper workshop register: steel-grey neutrals + safety-orange primary + IBM Plex Mono on `family.ui`. Desert Modernism is the warm-paper resort register: terracotta + pool turquoise + Futura PT display. Same warm-paper field family; opposite typography vocabulary and opposite intent register.

## Where it thrives

- Hospitality / travel landing pages, resort booking flows
- Architecture and real-estate portfolios, photography-heavy editorial
- Long-form Inter body on `surface.raised` paired with Futura PT display headings

## Where it degrades

- Dense data tables (the warm cream + saturated terracotta read as decoration on dense surfaces)
- Corporate finance / enterprise contexts where the resort register reads as off-brand

## Recall aliases

`desert modernism`, `palm springs`, `mid-century desert`, `desert`, `coachella`

## Long-form notes

<details>
<summary>From <code>palettes/desert-modernism.README.md</code></summary>

# Desert Modernism

Palm Springs mid-century register on the Flat engine. Sun-baked cream
field, terracotta-clay primary, pool-turquoise info, palm-shade green
success — the saturated Coachella-Valley colour vocabulary on the same
Flat engine that carries Mid-century modern.

Mid-century modern is the Eames living-room register (Connecticut walnut,
cream paper, mustard-and-teal restraint); Desert Modernism is the
Frey / Lautner Palm-Springs-resort register on the same chassis — same
typography era, same flat-surface elevation discipline, opposite hue
register. Where Mid-century pulls from the indoor-textile palette,
Desert Modernism pulls from the outdoor-landscape palette: clay-tile
roofs, pool water, palm-shadow, late-afternoon sun.

`surface.base` is sun-baked cream (`#f5e9d4`) — a stucco wall in the
shade at 3 p.m. `surface.raised` is `#fbf2e0` (fresh stucco still in
shadow); `surface.sunken` is `#ead9be` for input wells. The two-step
cream ladder is warmer than Editorial / Mid-century — the desert sun
takes the cool out of even the white wall paint.

The five desert intents:

- `intent.primary` is desert terracotta (`#9c3d1f`) — the baked-clay
  roof tile of a Frey residence
- `intent.info` is pool turquoise (`#1f7d8a`) — the saturated cyan of
  an unheated Coachella pool at midday
- `intent.warning` is desert mustard (`#9c6a14`) — the dry-grass colour
  that ties the warmth register together
- `intent.success` is palm-shade green (`#356a3a`)
- `intent.danger` is rust red (`#9c1f1f`) — close enough to terracotta
  that the warning hierarchy stays consistent

`typography.family.display` is Futura PT (or Avenir fallback) — the
humanist-geometric sans tied to the era. `family.body` is Inter for
long-form reading. The two-family rule keeps display tight (geometric
counters) and body loose (humanist proportion).

`radius.*` keeps the default Flat scale (`sm: '4px'`, `md: '8px'`,
`lg: '12px'`) — Palm Springs architecture mixed straight masonry with
the occasional rounded poolside cabana, so the palette doesn't force
a single corner discipline. (Compare to Heritage Maritime, which tightens
`lg` to `6px` because varnished yacht trim curves are smaller.)

`elevation.*` keeps the Flat / Classic recipe with a warm-tinted shadow
(`rgba(120, 60, 30, 0.10)` at `low`) so cards sit on the cream like
awnings on a sun-baked wall, not as pure neutral panels.

**A11y:** `pass`. `content.primary` (`#2a1f14`) on `surface.base`
(`#f5e9d4`) ≈ 12.5:1 (AAA). `intent.primary` terracotta on cream inverse
content ≈ 7.2:1 (AAA). `intent.warning` mustard on cream inverse
≈ 4.8:1 (AA body). `intent.info` pool turquoise on cream inverse
≈ 5.8:1 (AAA at large sizes, AA at body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, elevation
tint, and a humanist-geometric typography stack.

</details>

---

_Generated from `palettes/desert-modernism.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
