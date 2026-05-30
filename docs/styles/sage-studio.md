# Sage Studio

> Modern botanical / wellness-brand register on the Flat engine — bone-paper field, deep-sage primary, terracotta warning, transitional-serif display over geometric body sans.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Sage Studio is the "modern wellness brand site" register on the modern-light Flat-engine grid — Aesop-feel typography over a herbarium colour set. `surface.base` is bone (`#f3efe6`) with a 2-3% yellow undertone; `intent.primary.bg` is deep sage (`#3e5d3a`), a desaturated forest-leaf sitting between olive and pine. `intent.success` is matcha (`#5a7c3a`) — visibly lighter than primary so the two greens differentiate by hue rather than by luminance. `family.display` is Fraunces (or DM Serif Text fallback), a contemporary transitional serif; `family.body` and `family.ui` route to Inter for clean prose.

## Origin

The 2010s–2020s modern-wellness brand lane — Aesop, Goop, Glossier, modern apothecaries and herbalist studios. The visual vocabulary maps to herbarium prints and unbleached linen: warm bone paper, dried-herb greens, kiln-fired clay accents, a contemporary transitional serif borrowed from independent magazine design.

## Signatures

- **Warm bone-paper field (`#f3efe6`)** — `surface.base` is bone with a 2-3% yellow undertone — warmer than Heritage Maritime's bone, warmer than Stone Modern's warm stone. The yellow undertone is what grounds the sage as "dried herbs against unbleached linen" rather than as "leaves on grey paper."
- **Deep-sage `intent.primary` + matcha `intent.success` (hue-distinct greens)** — `intent.primary.bg` is `#3e5d3a` (olive-leaning leaf-sage); `intent.success.bg` is `#5a7c3a` (lighter, more matcha-leaning). The challenge with sage palettes is keeping the two greens distinct; this palette solves it by hue (primary is the leaf, success is the harvest) rather than by luminance alone.
- **Terracotta warning as the warm complement** — `intent.warning.bg` is `#c25624` — kiln-fired clay orange, the load-bearing second accent. The terracotta + sage pairing is the chromatic signature of the modern-wellness register.
- **Fraunces transitional serif on `display`** — `typography.family.display` is `"Fraunces", "DM Serif Text", "Bodoni Moda", "Georgia", serif` — a contemporary transitional serif with a soft-modern feel; `display` weight is 600. The serif display is what distinguishes this from Solarpunk's Quicksand (rounded sans) and from Linear Workspace's Inter-everywhere register.
- **Sage-tinted soft drop shadows on `elevation.*`** — `elevation.low` is `0 1px 2px rgba(45, 60, 35, 0.08)` — shadow alpha tints toward sage so raised cards lift as pressed-paper above linen, not as neutral panels. The shadow tint pulls toward primary the same way Heritage Maritime's pulls toward navy.
- **Generous `space.*` at the high end (`6: 36px / 7: 52px / 8: 72px`)** — The modern-wellness register depends on breathing room. The widened `space` scale is shared with Dieter Rams and Stone Modern — generous whitespace as a primary organising tool.

## Anti-signatures

- Geometric grotesque on `family.display` — the Fraunces serif is structural
- A primary green and a success green that differ only by luminance — the hue split is the load-bearing move
- Cool grey-white or pure-white field — the warm bone undertone grounds the entire chromatic set
- Saturated chart-style intents that fight the desaturated sage / terracotta vocabulary

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f3efe6` | Bone `#f3efe6` — warm yellow-tinted paper, the herbarium ground. |
| `color.intent.primary.bg` | `#3e5d3a` | Deep sage `#3e5d3a` — olive-leaning forest-leaf, ≈ 7.4:1 against bone inverse. |
| `color.intent.success.bg` | `#5a7c3a` | Matcha `#5a7c3a` — lighter, more chartreuse-leaning so it differs from primary by hue. |
| `color.intent.warning.bg` | `#c25624` | Terracotta `#c25624` — kiln-fired clay, the warm complement to sage. |
| `typography.family.display` | `"Fraunces", "DM Serif Text", "Bodoni Moda", "Georgia", serif` | Fraunces / DM Serif Text — transitional serif on display roles. |
| `typography.family.ui` | `"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif` | Inter — geometric sans for body, labels, and UI. |
| `elevation.low.boxShadow` | `0 1px 2px rgba(45, 60, 35, 0.08)` | `0 1px 2px rgba(45, 60, 35, 0.08)` — sage-tinted shadow alpha. |
| `space.7` | `52px` | `'52px'` — generous whitespace at the high end vs Flat / Classic's `'48px'`. |

## Often confused with

### vs [Lavender Dawn](./lavender-dawn.md)

Same modern-light Flat-engine recipe (pale tinted field, single deep tonal primary, warm-paired warning, generous radii) — Sage Studio commits to warm botanical (bone field, sage primary, terracotta warning, Fraunces serif display); Lavender Dawn commits to cool meditation (lavender field, plum primary, amber warning, single-family Manrope throughout).

### vs [Solarpunk](./solarpunk.md)

Both palettes commit to a botanical green register. Solarpunk saturates the entire chromatic set for eco-utopian optimism and uses Quicksand (rounded geometric sans). Sage Studio desaturates everything for "quiet wellness brand" and uses Fraunces (transitional serif on display). Solarpunk is the protest poster; Sage Studio is the apothecary site.

### vs [Mocha Latte](./mocha-latte.md)

Both palettes use a warm-paper field and a transitional-serif display. Sage Studio commits to bone (`#f3efe6`, 2-3% yellow) with deep-sage primary; Mocha Latte commits to oat-cream (`#f5eddd`, 4-5% yellow-warm) with mocha-brown primary. The two palettes intentionally share the matcha-green `intent.success` (`#5a7c3a`) as a cross-palette anchor in the warm-paper register family.

## Where it thrives

- Wellness and apothecary brand sites — the Fraunces + sage pairing reads as Aesop-feel
- Long-form editorial on `surface.raised` — the Inter body on warm bone keeps reading comfortable
- Marketing pages with generous whitespace — the widened `space` scale carries the layout

## Where it degrades

- Dense data dashboards (the desaturated chromatic vocabulary fights chart category colour)
- Productivity-tool registers that want tight density — the generous `space` scale reads as too airy

## Recall aliases

`sage`, `sage studio`, `wellness`, `aesop`, `apothecary`, `herbarium`, `modern wellness`

## Long-form notes

<details>
<summary>From <code>palettes/sage-studio.README.md</code></summary>

# Sage Studio

Modern botanical / wellness-brand register on the Flat engine. Bone-paper
field, sage-green primary, terracotta warning, matcha-green success that
differentiates from primary by hue rather than by luminance, a contemporary
transitional serif on display.

Quieter than Solarpunk (which saturates everything for eco-utopian
optimism) and warmer than Scandinavian Royal Modern (which leans cool
and royal). The "modern wellness brand site" aesthetic — Aesop-feel
typography over a herbarium colour set.

`surface.base` is bone (`#f3efe6`) — a warmer cream than Heritage
Maritime's bone, with a 2-3% yellow undertone that grounds the sage as
the colour of dried herbs against unbleached linen. `surface.raised`
lifts to fresh paper (`#faf7ee`); `surface.sunken` drops to `#e5dfd0`
for input wells.

`intent.primary.bg` is deep sage (`#3e5d3a`) — a desaturated forest-leaf
colour, sitting between olive and pine. The challenge with sage palettes
is keeping primary and success visually distinct (both want to be green);
this palette solves it by making primary the darker, more olive-leaning
sage and `intent.success` the lighter, more matcha-leaning `#5a7c3a`.
At default body sizes the two greens read as the same family but distinct
intents — primary is the leaf, success is the harvest.

- `intent.warning` is terracotta (`#c25624`) — kiln-fired clay orange,
  the warm complement to sage and the load-bearing second accent
- `intent.danger` is signal red (`#a8261e`)
- `intent.info` is slate-blue (`#2d5a8c`)

`typography.family.display` is Fraunces (DM Serif Text / Bodoni Moda
fallback) — a contemporary transitional serif with a soft-modern feel.
The serif at weight 600 on `display` and `title` is what distinguishes
this from Solarpunk's Quicksand (rounded sans). `family.body` and
`family.ui` route to Inter for clean body type.

`space.*` widens at the high end (`6: '36px'`, `7: '52px'`, `8: '72px'`)
— the modern wellness register depends on generous breathing room.

`radius.*` widens to `sm = 4px / md = 10px / lg = 16px` — modern wellness
brands favour rounded but not pillow-soft curves.

`elevation.*` shadow recipes tint toward sage (`rgba(45, 60, 35, 0.10)`
at `low`) so cards lift as pressed-paper above linen, not as neutral
panels. The shadow tint pulls toward primary the same way Heritage
Maritime's pulls toward navy.

**A11y:** `pass`. `content.primary` (`#25291f`) on `surface.base`
(`#f3efe6`) ≈ 13.3:1 (AAA). `intent.primary` deep sage with bone inverse
≈ 7.4:1 (AAA). `intent.warning` terracotta with bone inverse ≈ 4.7:1
(AA body). `intent.danger` signal red with bone inverse ≈ 6.8:1 (AAA at
large, AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
`space.*` scaling, elevation tint, and a transitional-serif display
typography stack.

</details>

---

_Generated from `palettes/sage-studio.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
