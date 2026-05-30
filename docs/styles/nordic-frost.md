# Nordic Frost

> Cool Scandinavian / arctic register on the Flat engine — pale glacier-ice field, deep arctic-navy primary, brushed-copper warning, single-family Inter throughout.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Nordic Frost is the cool-arctic register on the modern-light Flat-engine grid. `surface.base` is glacier ice (`#eef4f7`) — a near-white with a 2-3% cyan tint that grounds the rest of the palette as cooler than paper. `intent.primary.bg` is arctic navy (`#1f3a5c`), deeper than Scandinavian Royal's navy. `intent.success` is pine forest (`#2d6a4f`); `intent.warning` is brushed copper (`#b87333`); `intent.danger` is winter berry (`#a23039`) — a lower-saturation rose-red that fits the cool register. `family.display` and `family.ui` both route to Inter; the arctic-modern register reads correctly only with clean geometric type.

## Origin

The 2010s–2020s Scandinavian-modern interface-design lane — Spotify-by-way-of-Stockholm, Bang & Olufsen web presence, Arket / Cos / Acne digital branding, Nordic government and transit identity systems. The colour vocabulary is literal glacier ice, polished steel, and pine-forest accents; the typography mirrors the Inter / geometric-grotesque commitment shared across modern Nordic design systems.

## Signatures

- **Pale glacier-ice field with cyan tint (`#eef4f7`)** — `surface.base` carries a 2-3% cyan tint that grounds the rest of the palette as cooler than paper. Without the tint the palette collapses onto Flat / Classic; the cyan cast is the load-bearing colour move.
- **Arctic-navy `intent.primary` (`#1f3a5c`)** — `intent.primary.bg` is `#1f3a5c` — deeper and slightly more saturated than Scandinavian Royal's navy (`#1a2c4e`). Clears ≈ 11.7:1 against `#fafcfd` inverse content.
- **Brushed-copper warning + winter-berry danger (cool-register warm accents)** — `intent.warning.bg` is `#b87333` (brushed copper) and `intent.danger.bg` is `#a23039` (winter berry) — both lower-saturation warm tones tuned to read against the cyan field. A bright safety-orange or signal-red would crack the cool register.
- **Single-family Inter on every typography slot** — `typography.family.ui` and `family.display` both resolve to `"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif`. The arctic-modern register reads correctly only with clean geometric type; serifs would warm the register too much.
- **Navy-tinted soft drop shadows on `elevation.*`** — `elevation.low` is `0 1px 2px rgba(31, 58, 92, 0.08)` — shadow alpha tints toward the primary navy so cards lift as polished steel above pale ice, not as neutral panels. Scales through `medium` / `high` / `overlay` with the same navy cast.

## Anti-signatures

- Warm-paper or pure-white field — the cyan tint is what reads as "arctic"
- Serif `display` family — the single-Inter rule is structural to the cool-modern register
- High-saturation safety-orange or signal-red intents — the cool register requires lower-saturation warm accents
- Neutral or warm-tinted shadow alpha — the navy cast is what reads as "polished steel"

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#eef4f7` | Glacier ice `#eef4f7` — 2-3% cyan tint, the load-bearing cool ground. |
| `color.intent.primary.bg` | `#1f3a5c` | Arctic navy `#1f3a5c` — deeper than Scandinavian Royal's navy. |
| `color.intent.warning.bg` | `#b87333` | Brushed copper `#b87333` — low-saturation warm against the cool field. |
| `color.intent.danger.bg` | `#a23039` | Winter berry `#a23039` — rose-red tuned to the cool register. |
| `typography.family.ui` | `"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif` | Inter — single-family grotesque, no serif. |
| `typography.family.display` | `"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif` | Identical Inter stack — display matches UI exactly. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(31, 58, 92, 0.08)` | `0 1px 2px rgba(31, 58, 92, 0.08)` — navy-tinted shadow alpha. |

## Often confused with

### vs [Scandinavian Royal Modern](./scandinavian-royal-modern.md)

Same Nordic restraint and similar navy primary — the field temperature splits them. Nordic Frost commits to glacier ice (`#eef4f7`, cyan-tinted) with arctic-navy primary and Inter throughout. Scandinavian Royal Modern commits to bleached oak / warm paper with a slightly warmer navy and a gold or warmer secondary accent. Nordic Frost is glacial; Scandi Royal is regal.

### vs [Coastal Modern](./coastal-modern.md)

Both palettes tint the field cool and commit `intent.primary` to a deep blue-green on the modern-light Flat engine. Nordic Frost's field is glacier ice (cyan-only) with arctic-navy primary (`#1f3a5c`) and Inter throughout; Coastal Modern's field has the green note (`#edf5f4`) with deep-teal primary (`#1e5460`) and a Nunito-rounded display + Inter body split. Nordic Frost is arctic; Coastal Modern is tropical.

### vs [Linear Workspace](./linear-workspace.md)

Both palettes commit to Inter throughout and lean cool. Linear Workspace is the productivity-tool register: 1-2% cool-grey tinted field, Linear-iris `#5e6ad2` primary, 14 px body density, hairline-ring elevations, tight `radius`. Nordic Frost is the arctic-aesthetic register: explicit cyan-tinted glacier field, arctic-navy `#1f3a5c` primary, 15 px body, soft navy-tinted drop shadows, slightly widened `radius`.

## Where it thrives

- Nordic-brand sites and transit / wayfinding interfaces — the glacier field reads as arctic-modern
- Long-form Inter running text on `surface.raised` — the cool ground stays out of the way
- Hardware-product brand pages where the navy-tinted shadow reads as polished steel

## Where it degrades

- Warm-brand registers that need warm-paper grounds — the cyan tint reads as too clinical
- Dense data dashboards (the cool-only intent palette fights warm chart category colour)

## Recall aliases

`nordic`, `nordic frost`, `arctic`, `glacier`, `scandinavian`, `frost`

## Long-form notes

<details>
<summary>From <code>palettes/nordic-frost.README.md</code></summary>

# Nordic Frost

Cool Scandinavian / arctic register on the Flat engine. Pale glacier-blue
field, deep arctic-navy primary, frost-grey neutrals, pine-forest success,
brushed-copper warning, winter-berry danger.

`surface.base` is glacier ice (`#eef4f7`) — a near-white with a 2-3% cyan
tint that grounds the rest of the palette as cooler than paper. The
cooler-than-paper register is the load-bearing colour move; without the
cyan tint the palette would collapse onto Flat / Classic. `surface.raised`
lifts to barely-tinted near-white (`#fafcfd`); `sunken` drops to `#dde6ec`
for input wells.

`intent.primary.bg` is arctic navy (`#1f3a5c`) — deeper and slightly more
saturated than Scandinavian Royal's navy (`#1a2c4e`). The two palettes
sit beside each other in the modern-light set: Nordic Frost's field is
cooler (cyan-tinted), Scandi Royal's field is warmer (oak-cream).

- `intent.success` is pine forest (`#2d6a4f`) — the dark conifer-green
  used in chart-symbol legends for safe altitudes
- `intent.warning` is brushed copper (`#b87333`) — warmer than the navy
  + cyan field, so warnings pop against the cool ground
- `intent.danger` is winter berry (`#a23039`) — a lower-saturation rose-red
  that fits the cool register
- `intent.info` is icy mid-blue (`#2563a0`) — distinct from primary navy

`typography.family.display` and `family.ui` both route to Inter — the
palette commits to one grotesque sans throughout, no serif. The
arctic-modern register reads correctly only with clean geometric type;
serifs would warm the register too much.

`radius.*` widens slightly compared to Flat / Classic (`md = 8px`,
`lg = 14px`) — modern Nordic interface design favours softer curves
than mid-century or Swiss.

`elevation.*` shadow recipes tint toward the primary navy
(`rgba(31, 58, 92, 0.10)` at `low`, scaling up through `overlay`) so
cards lift as polished steel above pale ice, not as neutral panels.

**A11y:** `pass`. `content.primary` (`#0e2236`) on `surface.base`
(`#eef4f7`) ≈ 14.5:1 (AAA). `intent.primary` navy with `#fafcfd` inverse
≈ 11.7:1 (AAA). `intent.info` mid-blue with inverse ≈ 5.4:1 (AA body).
`intent.warning` brushed copper with inverse ≈ 4.6:1 (AA body, AAA large).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
elevation tint, and a single-family Inter typography stack.

</details>

---

_Generated from `palettes/nordic-frost.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
