# Mid-century modern

> Cream-paper Eames-era register: walnut ink on warm cream, mustard and teal accents, a sparse atomic-age dot overlay tiled at 480×480 as quiet wallpaper rhythm.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Mid-century modern is the flat engine tuned for the warm-restrained 1950s/60s catalogue look — Herman Miller, Knoll, the early Eames Lounge ads. No stark white sits anywhere in the palette: `surface.base` is warm cream (`#f0e6d2`), `raised` lifts to a paler eggshell (`#f7eed9`), `sunken` drops to a slightly darker cream. `content.primary` is walnut ink (`#2a1d12`) — a warm dark brown, not pure black — so the page reads as printed on cream rather than backlit. The intents are the period's exact swatch language: mustard (`#c98a16`), teal (`#2d6f7c`), avocado (`#5a7a3b`), persimmon (`#b14a1d`), each one or two steps off vivid so panels never shout.

## Origin

The American mid-century modern catalogue aesthetic of the 1950s and 1960s — Herman Miller, Knoll, Saarinen, the Eameses, Heller — codified in Eames Lounge and Tulip Chair print advertising. The palette is a restrained, period-correct revival on the flat engine.

## Signatures

- **Warm cream `surface.base` (`#f0e6d2`) with no white anywhere** — `surface.base` is `#f0e6d2`, `raised` is `#f7eed9` eggshell, `sunken` is `#e7dcc4`. There is no `#ffffff` in the palette — the page reads as printed on cream paper, not as a screen. Compare to Flat/Classic where `raised` is solid `#ffffff`.
- **Walnut-ink `content.primary` (`#2a1d12`), not black** — Body text is a warm dark brown rather than pure black, sitting at ≈ 13.6:1 on the cream field — AAA but tuned warm to match the host. The combination "warm dark brown ink on cream" is the period-print cue, not "black on white."
- **Period swatch intents: mustard, teal, avocado, persimmon** — `intent.primary`/`warning` is Herman Miller mustard `#c98a16`; `intent.info` is the Eames Lounge upholstery teal `#2d6f7c` (also reused as `content.link`); `intent.success` is avocado `#5a7a3b`; `intent.danger` is the Saarinen Tulip-pad persimmon `#b14a1d`. Every one is one or two steps off vivid — the restraint that period catalogues made into a virtue.
- **Single humanist sans for both UI and display** — `typography.family.ui` and `family.display` both resolve to `"Karla", "Avenir Next", "Avenir", "Futura", "Century Gothic", "Helvetica Neue", system-ui, sans-serif`. Mid-century print rarely mixed faces; it mixed weights and sizes within one family. `role.display` runs at 2.75rem / weight 600 with `-0.015em` tracking.
- **Sparse three-point starburst-dot overlay tiled at 480×480** — `effect.overlay.image` is a three-stop radial-gradient (mustard, teal, persimmon dots at 4–5% alpha) tiled at `480px 480px`. The pattern paints once at the palette root, so the atomic-age decoration reads as quiet wallpaper rhythm under the content — never as foreground pattern.
- **Settled-drawer motion (`base = 220ms`, gentle ease-out)** — `motion.duration.base` is 220ms — slower than the Flat default — and the standard easing is `cubic-bezier(0.25, 0.1, 0.25, 1)`. Transitions settle the way a heavy plywood drawer does rather than snap.

## Anti-signatures

- Pure white `surface.raised` (`#ffffff`) — breaks the "printed on cream" cue
- Pure black `content.primary` (`#000000`) instead of walnut brown
- Saturated, vivid intent fills — the mid-century register is one or two steps off vivid
- Mixing a serif `display` family with a sans `ui` — period print stayed in one family
- Hard-offset block shadows or inset rim highlights (those are Neubrutalism / Aero)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#f0e6d2` | Warm cream `#f0e6d2` — the period paper field, no white anywhere in the palette. |
| `color.content.primary` | `#2a1d12` | Walnut ink `#2a1d12` — warm dark brown rather than black, the "printed on cream" cue. |
| `color.intent.primary.bg` | `#c98a16` | Herman Miller mustard `#c98a16` — the period catalogue accent, also `intent.warning` and `border.focus`. |
| `color.intent.info.bg` | `#2d6f7c` | Eames Lounge upholstery teal `#2d6f7c` — reused as `content.link` for one identity across links and info. |
| `effect.overlay.image` | `radial-gradient(circle at 14% 18%, rgba(201, 138, 22, 0.06) 0 1.4px, transparent 1.4px), radial-gradient(circle at 78% 36%, rgba(45, 111, 124, 0.05) 0 1.4px, transparent 1.4px), radial-gradient(circle at 42% 82%, rgba(177, 74, 29, 0.045) 0 1.6px, transparent 1.6px)` | Three-point radial-gradient dot field (mustard / teal / persimmon at 4–5% alpha) — the atomic-age decoration tiled at 480×480. |
| `typography.family.display` | `"Karla", "Avenir Next", "Avenir", "Futura", "Century Gothic", "Helvetica Neue", system-ui, sans-serif` | Same humanist-sans stack as `family.ui` — mid-century print mixed weights, not families. |
| `motion.duration.base` | `220ms` | 220ms — the "plywood drawer settles" cadence, slower than Flat default. |

## Often confused with

### vs [Editorial](./editorial.md)

Editorial is a typographic-newspaper register with a serif/sans split and high-contrast display type. Mid-century modern (this palette) runs a single humanist sans for both UI and display, sits on cream rather than white, and paints a quiet atomic-age dot overlay at the root.

### vs [Desert Modernism](./desert-modernism.md)

Desert modernism is the Palm Springs/Joshua Tree register — sun-bleached terracotta and ochre on a brighter desert field. Mid-century modern (this palette) commits specifically to the Eames/Herman Miller catalogue swatches (mustard, Eames-teal, avocado, persimmon) on warm cream, with the starburst-dot overlay as its load-bearing decoration.

### vs [Dieter Rams / Braun](./dieter-rams.md)

Dieter Rams is the Braun-functionalist register — neutral greys, one orange accent, no decoration of any kind. Mid-century modern is the same era but the American-catalogue counterpoint: cream paper, period swatch language, and a sparse decorative overlay tiled at the root.

### vs [Flat / Classic](./flat-classic.md)

Flat/Classic is the unornamented baseline — white `raised`, single blue accent, system fonts, no overlay. Mid-century modern swaps every white for cream, replaces the blue with the period swatch set, ships a humanist sans, and paints the starburst-dot overlay at the root.

## Where it thrives

- Editorial article layouts — long body copy reads "printed on cream" at AAA contrast
- Marketing and catalogue compositions — the period swatch language and overlay carry the era
- Forms with `intent.neutral` wells — `sunken` cream reads recessed without a shadow

## Where it degrades

- Toast severity stacks — README flags this; four desaturated intents stacked vertically read as four bands of warm earth-tone rather than as distinct severities, because `intent.primary` and `intent.warning` resolve to the same mustard
- Pure-color-coded data dashboards — every intent is one or two steps off vivid, so categorical color alone under-communicates

## Recall aliases

`mid-century`, `mid-century modern`, `midcentury`, `eames`, `herman miller`

## Long-form notes

<details>
<summary>From <code>palettes/mid-century-modern.README.md</code></summary>

# Mid-century modern

Flat engine tuned for the warm-restrained Eames-era register. Cream
paper, walnut ink, mustard and teal as the dominant accents, persimmon
and avocado in the data-semantic slots. Quiet, not loud — the aesthetic
restraint that period catalogues (Herman Miller 1956, Knoll, the early
Eames Lounge ads) made into a virtue.

`surface.base` is a warm cream (`#f0e6d2`); `raised` lifts to a paler
eggshell, `sunken` drops to a slightly darker cream so input wells read
recessed without a shadow. There is no stark white anywhere in the
palette. `content.primary` is walnut ink (`#2a1d12`) — a warm dark brown
rather than pure black, so the page reads as "printed on cream", not
"printed on a screen". The intent set is the period's exact swatch
language: mustard (`#c98a16`, the Herman Miller catalogue accent) as
`intent.primary` *and* `intent.warning`; teal (`#2d6f7c`, the Eames
Lounge upholstery teal) as `intent.info` and `content.link`; avocado
(`#5a7a3b`) as `intent.success`; persimmon (`#b14a1d`, the warm orange
Saarinen used on the Tulip chair seat pad) as `intent.danger`. None of
these are full-saturation — every one is one or two steps off vivid so
panels never shout.

`radius.*` is moderate-but-warm — `sm: '3px'`, `md: '6px'`,
`lg: '14px'`: no hard corners, no inflated gumdrop curves, the bend a
plywood lounge chair has. `typography.family.ui` and `family.display`
share one humanist sans (`Karla` / `Avenir Next` / `Futura`) — mid-
century print rarely mixed faces; it mixed weights and sizes within one
family. Motion is gentle ease-out with `base = '220ms'`, the way a heavy
plywood drawer settles rather than snaps.

The atomic-age accent the brief asks for lives in `effect.overlay.*`,
the decoration token the engine paints once at the palette root. The
overlay is a sparse three-point dot field — mustard, teal, persimmon at
4–6 % alpha — tiled at 480 × 480 so the period decoration reads as
quiet wallpaper rhythm under the content rather than as foreground
pattern. The brief asked for "sparingly"; the engine paints the pattern
once at the shell and never re-applies it per component, so it stays
spatially light.

**A11y:** `pass`. `content.primary` (`#2a1d12`) on `surface.base`
(`#f0e6d2`) ≈ 13.6:1 — AAA at every size. `intent.success` avocado
+ cream inverse ≈ 5.6:1 (AA body, AAA large), `intent.info` teal +
cream inverse ≈ 6.0:1 (AAA large), `intent.danger` persimmon + cream
inverse ≈ 5.5:1 (AA body). The intent.primary / warning mustard fill
uses the dark walnut ink as content rather than cream — mustard + cream
would be ≈ 2.8:1 and fail; mustard + walnut sits at ≈ 8.6:1 and passes
AAA. The same pattern applies to focus indication: focus is mustard on
cream surfaces (≈ 3.2:1) with a 2 px solid ring — AA focus contrast,
just.

**Most likely to fail: `Toast` (variant 3 — severity-driven info /
success / warning / danger variants).** The four intent fills are all
deliberately desaturated for the Eames-feel restraint — avocado and
teal sit close in luminance on the cream field, and `intent.primary` and
`intent.warning` resolve to the same mustard. A row of four toasts
stacked in the bottom-right corner reads as four bands of warm earth-
tone rather than as four severities; the user can't tell at a glance
whether the toast is success or info, primary or warning. The fix is
not at the palette level — the desaturation is the aesthetic. The fix
is at the **component** level: encode severity in the leading icon and
label, not in fill saturation. Components that need to communicate
urgency through color alone in this palette will under-communicate, and
the mid-century register is exactly the wrong moment to re-saturate the
swatches to compensate.

</details>

---

_Generated from `palettes/mid-century-modern.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
