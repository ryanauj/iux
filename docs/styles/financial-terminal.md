# Financial Terminal

> Trading-workstation register — amber phosphor on near-black, mono-typed uppercase labels, P&L green/red as data, zero radius and zero decoration.

**Engine:** `flat` · **A11y:** `experimental`

## Summary

Financial Terminal is the flat engine in a generic trading-workstation register: amber `content.primary` (`#ffa028`) on a pure-black `surface.base`, with `raised`/`overlay` warmed one and two notches toward amber so cards and modals separate from the field without breaking the dark-terminal aesthetic. Every `radius.*` slot — including `pill` and `full` — is `0`; a terminal does not round anything. `elevation.*` is amber inset hairlines at graduated alpha, not drop shadows. The intent set is deliberately split so the four severities stop collapsing into one hue: amber for `primary`/`neutral`, yellow for `warning`, cyan for `info`, with `success`/`danger` anchoring the P&L axis at green and red.

## Origin

The generic trading-workstation aesthetic descended from 1980s Quotron and Bloomberg terminals — amber phosphor on a dark field, dense mono-typed labels, uppercase numerals, hairline rules — refined through the 1990s/2000s into the dense-data register every financial workstation still defaults to. This palette is the vendor-neutral revival of that register.

## Signatures

- **Amber phosphor `content.primary` on pure-black `surface.base`** — `content.primary` is `#ffa028` on `surface.base` `#000000` — ≈ 10.8:1, AAA at every size. `raised` warms one notch toward amber (`#0a0805`), `overlay` warms two notches (`#18120a`) so menus and modals pop without breaking the dark-terminal aesthetic. The amber is the load-bearing host signal.
- **Every `radius.*` slot is `0` — including `pill` and `full`** — `radius.none`, `sm`, `md`, `lg`, `pill`, and `full` are all `0`. A terminal does not round anything: pills become squared chips, circular avatars become squares. This is one of the load-bearing differentiators against any other dark-amber palette.
- **Amber inset hairline elevation (no drop shadows)** — `elevation.low` through `overlay` are `inset 0 0 0 1px rgba(255, 160, 40, α)` at 0.30 / 0.50 / 0.70 / 0.85 alpha — graduated amber border weight, not blurred drop shadow. Cards and panels separate from the field by ring weight rather than by cast shadow.
- **Split-hue intent set: amber/yellow/cyan + P&L green/red** — `intent.primary` and `intent.neutral` stay on amber; `intent.warning` splits to yellow `#ffd84a` and `intent.info` to cyan `#5ec8ff` so the four intents stop collapsing into one hue. `intent.success` `#00c850` and `intent.danger` `#ff5454` anchor the P&L axis — the right-most column of a ledger.
- **Sans body + IBM Plex Mono display/labels/code, uppercase** — `family.ui` is Inter so long-form body and form fields stay readable; `family.display`, `mono`, and `code` all resolve to `"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono"`. `role.display`, `title`, `heading`, `subheading`, and `label` all carry `textTransform: uppercase`. The mono face is what carries the terminal register; uppercase is what carries the workstation cadence.
- **Linear motion at 60/120/200ms — registers without animating** — `motion.duration.fast`/`base`/`slow` are 60/120/200ms with `linear` easing across every slot. Transitions register without feeling animated — the workstation cadence where data refreshes, it doesn't bloom.

## Anti-signatures

- Any non-zero `radius` slot — `pill: 999px` or `full: 9999px` would defeat the terminal register
- Drop-shadow `elevation.*` instead of inset hairlines (that's Flat/Material)
- A single-hue intent set — collapsing warning/info back into amber is the regression this palette explicitly fixes
- Eased motion or spring overshoot — the terminal does not animate, it refreshes
- Scanlines, glow, or chrome decoration on the root (that's CRT-phosphor / Tron, not this register)

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#000000` | Pure black `#000000` — the dark-terminal host. `raised` `#0a0805` and `overlay` `#18120a` warm toward amber but stay near-black. |
| `color.content.primary` | `#ffa028` | Amber phosphor `#ffa028` — the signature trading-workstation hue, ≈ 10.8:1 on black. |
| `radius.pill` | `0` | `0` — a terminal does not round anything, not even pills or full circles. |
| `elevation.low.boxShadow` | `inset 0 0 0 1px rgba(255, 160, 40, 0.30)` | `inset 0 0 0 1px rgba(255, 160, 40, 0.30)` — amber inset hairline, not drop shadow. Elevation is ring weight, not light. |
| `color.intent.info.bg` | `rgba(94, 200, 255, 0.14)` | Cyan `rgba(94, 200, 255, 0.14)` with `#5ec8ff` content — the split that keeps info from collapsing into amber. |
| `typography.family.display` | `"IBM Plex Mono", "JetBrains Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace` | IBM Plex Mono stack on `display`, `mono`, `code`, and `label`. Only `body`/`caption` use the Inter sans for readability. |
| `motion.duration.base` | `120ms` | 120ms with `linear` easing — refresh cadence, not animation. |

## Often confused with

### vs [CRT / Phosphor (Amber)](./crt-phosphor-amber.md)

CRT-phosphor amber is a CRT-engine register with scanline overlay, phosphor glow, and curved-screen treatment. Financial Terminal (this palette) is flat-engine: zero decoration on the root, inset hairline elevation, no glow, no scanlines. Same amber hue, completely different engine.

### vs [Terminal / TUI](./terminal-tui.md)

Terminal-TUI is a text-UI register that targets ncurses-style box-drawing characters and a monospaced grid. Financial Terminal still expects normal HTML components — Cards, Modals, Tables — just rendered with amber/mono/no-radius. The split-hue intent set (yellow warning, cyan info) is the financial-workstation move, not the TUI move.

### vs [Data-dense light](./data-dense-light.md)

Data-dense light is the Tufte register on a near-white field with desaturated intent ink. Financial Terminal is the same density stance inverted: amber on black, mono-uppercase labels, P&L green/red. They share zero/hairline radius and the dense-table thrives-with but commit to opposite ends of the brightness axis.

## Where it thrives

- Long dense Tables — amber mono numerals on black with green/red deltas in the right-most column is the palette's native shape
- Heat-map and habit-tracker views — README documents graduating `rgba(255, 160, 40, …)` across six alpha steps for "shades of the accent" without re-saturating
- Form fields and CLI-shaped inputs — the inset hairline elevation keeps inputs as wells rather than as lifted chips

## Where it degrades

- Loading skeleton shimmers — README flags this; the spread between `surface.raised` and `content.muted` is too narrow for a sweep to read, so shimmer becomes a slow pulse
- Hover-lift Card decoration, media overlays, illustrated EmptyStates — anything depending on tonal variance across surfaces. "This palette eats decoration, on purpose."
- All-day editorial reading — `a11y: experimental`; amber phosphor on black is still vulnerable to afterimage and eye fatigue during long sessions

## Recall aliases

`financial terminal`, `terminal`, `trading terminal`, `bloomberg`, `amber terminal`

## Long-form notes

<details>
<summary>From <code>palettes/financial-terminal.README.md</code></summary>

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

</details>

---

_Generated from `palettes/financial-terminal.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
