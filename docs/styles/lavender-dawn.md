# Lavender Dawn

> Calm modern purple register on the Flat engine — pale lavender-tinted field, deep plum-violet primary, warm-amber warning, single-family Manrope throughout.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Lavender Dawn is the cool-violet sibling of Sage Studio on the modern-light Flat-engine grid. `surface.base` is pale lavender (`#f3eff7`) — a 3-4% violet tint over near-white; `surface.raised` lifts to barely-tinted near-white (`#fbf9fd`). A single deep plum-violet `#5c3d8a` carries `intent.primary`, `content.link`, and `border.focus`. `intent.warning` shifts to warm amber (`#c97d2a`) so the warm/cool pairing reads as intentional rather than as a colour clash. The whole composition is the meditation-app / journaling-tool / post-2020 "calm SaaS" lane.

## Origin

The post-2020 calm-SaaS / meditation-app / journaling-tool lane — Calm, Headspace, Notion-with-a-purple-skin, Linear-but-softer. The aesthetic answers the productivity-SaaS register (Linear / Vercel) by trading the cool indigo for a deeper plum and the geometric Inter for a softer humanist Manrope.

## Signatures

- **Pale lavender-tinted field (`#f3eff7`)** — `surface.base` carries a 3-4% violet tint over near-white. Without the tint the palette collapses onto Flat / Classic; with it the rest of the chromatic set reads as "calm app" rather than as "blank screen."
- **Deep plum-violet `intent.primary` (`#5c3d8a`)** — `intent.primary.bg` is `#5c3d8a` — a Princely purple that clears ≈ 9:1 against `#fbf9fd` inverse. The depth of the plum is load-bearing: at lighter saturations the palette collapses into Soft Pastel; at deeper saturations it reads as Mall-goth.
- **Warm-amber warning paired with cool-violet primary** — `intent.warning` is warm amber (`#c97d2a`) — the warm/cool pairing (amber vs plum) is the second load-bearing colour move and the reason the palette feels "intentional" rather than monochromatic.
- **Single-family Manrope on every typography slot** — `typography.family.ui` and `family.display` both resolve to `"Manrope", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif`. Manrope's softer humanist terminals are what differentiate this from Linear Workspace's Inter and Stone Modern's Söhne.
- **Plum-tinted soft drop shadows on `elevation.*`** — `elevation.low` is `0 1px 2px rgba(44, 31, 58, 0.08)` — the shadow alpha tints toward plum rather than toward neutral black, so cards lift as pressed-paper above lavender mist. Scales through `medium` / `high` / `overlay` with the same plum cast.
- **Generous `radius.*` (`sm = 6px / md = 12px / lg = 18px`)** — Modern calm apps favour soft, never sharp corners. The widened scale separates this register from Linear / Vercel's `sm = 4px / md = 6px / lg = 8px` productivity-tool tightness.

## Anti-signatures

- A second saturated cool chromatic intent competing with the plum primary
- Geometric Inter or Geist on `family.display` — the Manrope-humanist softness is structural
- Tight `radius.*` (`sm = 2-4px`) — the calm-app register depends on the widened scale
- Neutral or black-tinted shadow alpha — the plum tint is what reads as "lavender mist"

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f3eff7` | Pale lavender `#f3eff7` — the 3-4% violet tint that grounds the register. |
| `color.intent.primary.bg` | `#5c3d8a` | Deep plum-violet `#5c3d8a` — Princely purple, ≈ 9:1 against cream inverse. |
| `color.intent.warning.bg` | `#c97d2a` | Warm amber `#c97d2a` — the warm/cool pairing against the cool primary. |
| `typography.family.ui` | `"Manrope", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif` | Manrope-first stack — softer humanist than Inter or Geist. |
| `typography.family.display` | `"Manrope", "Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif` | Identical Manrope stack — the palette commits to one family throughout. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(44, 31, 58, 0.08)` | `0 1px 2px rgba(44, 31, 58, 0.08)` — plum-tinted shadow alpha, not neutral. |
| `effect.focusRing.color` | `#5c3d8a` | Plum `#5c3d8a` — focus ring reuses the brand colour, no second saturated accent. |

## Often confused with

### vs [Sage Studio](./sage-studio.md)

Same modern-light Flat-engine recipe (pale tinted field, single deep tonal primary, warm-paired warning, generous radii) — the difference is the entire colour story. Sage Studio lands on botanical-warm (bone field, sage primary, terracotta warning, Fraunces serif display); Lavender Dawn lands on meditation-cool (lavender field, plum primary, amber warning, Manrope sans throughout).

### vs [Linear Workspace](./linear-workspace.md)

Linear Workspace and Lavender Dawn both lean cool-purple on near-white. Linear is the productivity-tool register: cool grey-white field, Linear-iris `#5e6ad2` primary, 14 px Inter at high density, hairline-ring elevations, tight `radius` scale. Lavender Dawn is the calm-app register: violet-tinted field, deeper plum `#5c3d8a` primary, 16 px Manrope, soft plum-tinted drop shadows, widened `radius` scale.

### vs [Soft Pastel](./soft-pastel.md)

Soft Pastel saturates the field higher and uses pastel intents across the board — the chromatic strength sits in the surfaces. Lavender Dawn keeps the field whisper-tinted and stacks all the chromatic strength into the deep plum primary, the way modern calm-SaaS apps do.

## Where it thrives

- Journaling, meditation, and habit-tracker surfaces where the violet tint reads as "calm"
- Marketing pages for wellness / mindfulness SaaS — the humanist Manrope softens technical copy
- Long-form prose on `surface.raised` — the lavender tint stays out of the reader's way

## Where it degrades

- Dense data dashboards (the single-primary vocabulary fights chart category colour)
- Sharp brand registers that want a saturated field — the lavender tint reads as too soft

## Recall aliases

`lavender`, `lavender dawn`, `plum`, `calm saas`, `meditation`, `journaling`

## Long-form notes

<details>
<summary>From <code>palettes/lavender-dawn.README.md</code></summary>

# Lavender Dawn

Calm modern purple register on the Flat engine. Pale lavender-tinted
field, deep-plum primary, a warm-amber warning that pairs with the
cool-violet primary, modern humanist sans throughout. The meditation-app
/ journaling-tool / post-2020 "calm SaaS" aesthetic — low-saturation
purple ground, one deep tonal accent, generous radii.

The cool-violet sibling of Sage Studio in the modern-light register
set: both palettes share warm body type, generous radii, and one deep
tonal primary against a barely-tinted pale field. Sage Studio lands on
botanical-warm; Lavender Dawn lands on meditation-cool.

`surface.base` is pale lavender (`#f3eff7`) — a 3-4% violet tint over
near-white. `surface.raised` lifts to barely-tinted near-white
(`#fbf9fd`); `surface.sunken` drops to `#e6dff0` for input wells. The
violet tint is what reads as "calm app" rather than "blank screen."

`intent.primary.bg` is deep plum-violet (`#5c3d8a`) — a Princely purple
that clears ≈ 9:1 against `#fbf9fd` inverse content. The depth of the
plum is the load-bearing colour move: at lighter saturations the palette
collapses into Soft Pastel; at deeper saturations it reads as Mall-goth.

- `intent.warning` is warm amber (`#c97d2a`) — the warm/cool pairing
  (warm amber against cool plum) is the second load-bearing move
- `intent.success` is forest (`#4d7942`)
- `intent.danger` is signal red (`#a8261e`)
- `intent.info` is slate teal (`#2d6a8c`)

`typography.family.display` is Manrope (Inter / Söhne fallback) — a
modern humanist sans with softer terminals than Inter. The palette
commits to one family throughout, the way Linear Workspace commits to
Inter and Stone Modern commits to Söhne. The softer humanist feel of
Manrope is what differentiates this from Linear Workspace's Inter.

`radius.*` widens (`sm = 6px / md = 12px / lg = 18px`) — modern calm
apps favour soft, never sharp corners.

`elevation.*` shadow recipes tint toward plum (`rgba(44, 31, 58, 0.10)`
at `low`) so cards lift as pressed-paper above lavender mist.

`border.focus` reuses the deep plum primary — the focus ring carries
the brand colour rather than introducing a second saturated accent.

**A11y:** `pass`. `content.primary` (`#2c1f3a`) on `surface.base`
(`#f3eff7`) ≈ 13:1 (AAA). `intent.primary` plum-violet with `#fbf9fd`
inverse ≈ 9.1:1 (AAA). `intent.warning` warm amber with cream inverse
≈ 3.7:1 (AA UI, AA large). `intent.success` forest with cream inverse
≈ 5.6:1 (AA body). `intent.danger` signal red with cream inverse
≈ 6.8:1 (AAA large, AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, widened
`radius.*`, plum-tinted elevations, and a single-family Manrope
typography stack.

</details>

---

_Generated from `palettes/lavender-dawn.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
