# Linear Workspace

> Modern productivity-SaaS register on the Flat engine — cool off-white field, Linear-iris `#5e6ad2` primary, 14-px Inter body density, hairline-ring elevations, tight `radius`.

**Engine:** `flat` · **A11y:** `pass`

## Summary

Linear Workspace is the calm-productivity-tool register on the modern-light Flat-engine grid — the lane Linear.app / Height / Notion-app / Vercel-dashboard defined. `surface.base` is `#fbfbfc` (cool off-white); `surface.raised` is pure white. `intent.primary.bg` is Linear's signature "Iris" indigo (`#5e6ad2`), which also carries `content.link` and `border.focus`. Body type sits at 14 px (`0.875rem`) so the productivity-tool density reads correctly. `family.*` is single-family Inter; `elevation.low` is a near-invisible 1-px hairline ring `0 0 0 1px rgba(17, 20, 27, 0.06)`.

## Origin

The 2018–2024 modern-productivity-SaaS lane the Linear.app / Height / Notion-app / Vercel-dashboard generation defined. Linear in particular codified the visual vocabulary: cool off-white app shell, the "Iris" indigo, 14-px body density, hairline-ring elevations, Inter throughout, snappy 160 ms motion.

## Signatures

- **Cool off-white field (`#fbfbfc`) with pure-white raised** — `surface.base` is `#fbfbfc` — a 1-2% cool tint that differentiates this from Flat / Classic's pure white. `surface.raised` lifts to pure white (`#ffffff`); `surface.sunken` drops to `#f4f4f6`. The cool app-shell tint is the load-bearing surface move.
- **Linear-iris indigo `intent.primary` (`#5e6ad2`)** — `intent.primary.bg` is Linear's signature "Iris" purple-blue. The colour clears 4.6:1 against white inverse — just past AA for body text and well past AA for UI controls. `border.focus` and `content.link` reuse the same iris.
- **14-px body density (`0.875rem`)** — `typography.role.body.size` is `0.875rem` (14 px) so the productivity-tool density reads correctly. This is the load-bearing typography move: the moment body type goes to 16 px the register collapses into Flat / Classic.
- **Single-family Inter throughout** — `typography.family.ui` and `family.display` both resolve to `"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif`. Display climbs to weight 700 for headings; the rest of the hierarchy rides on weight + size alone.
- **Near-invisible hairline-ring `elevation.low`** — `elevation.low` is `0 0 0 1px rgba(17, 20, 27, 0.06)` — a near-invisible cool-tinted hairline. `medium` adds a subtle drop shadow over the same hairline. The "popover that sits 4 px above the canvas" register, not the "card that lifts a paper-thickness" register.
- **Tight `space.*` density (`5: 20px / 6: 28px / 7: 40px`)** — The `space` scale collapses slightly at the high end vs Flat / Classic — modern productivity tools pack more onto the canvas than Sage Studio or Lavender Dawn.

## Anti-signatures

- Pure-white `surface.base` — the cool off-white tint is what differentiates this from Flat / Classic
- 16-px body type — the 14-px density is structural to the productivity-tool register
- Soft gaussian drop shadows on `elevation.low` — the hairline ring is the lift signal
- Widened `radius.*` (`sm = 6-8px`) — Linear Workspace commits to tight `sm = 4px / md = 6px / lg = 8px`
- A second saturated chromatic accent competing with the iris primary

## Token evidence

| Path | Value | Note |
|---|---|---|
| `color.surface.base` | `#fbfbfc` | Cool off-white `#fbfbfc` — 1-2% cool tint vs Flat / Classic's pure white. |
| `color.intent.primary.bg` | `#5e6ad2` | Linear-iris `#5e6ad2` — the signature purple-blue, ≈ 4.6:1 against white. |
| `color.content.link` | `#5e6ad2` | Iris `#5e6ad2` — links share the primary, no second saturated accent. |
| `color.border.focus` | `#5e6ad2` | Iris `#5e6ad2` — focus ring reuses the primary. |
| `typography.family.ui` | `"Inter", "Söhne", "Helvetica Neue", system-ui, sans-serif` | Inter — single-family stack throughout. |
| `typography.role.body.size` | `0.875rem` | `0.875rem` (14 px) — the productivity-tool density anchor. |
| `elevation.low.boxShadow` | `0 0 0 1px rgba(17, 20, 27, 0.06)` | `0 0 0 1px rgba(17, 20, 27, 0.06)` — near-invisible cool-tinted hairline. |
| `space.5` | `20px` | `'20px'` — collapsed from Flat / Classic's `'24px'` for tighter density. |

## Often confused with

### vs [Vercel Geist](./vercel-geist.md)

Both palettes are modern-dev-tool registers on the Flat engine with single-family sans, tight `radius`, and hairline-ring elevations. Linear Workspace tints the field cool (`#fbfbfc`) and uses Linear-iris `#5e6ad2` as primary with Inter body at 14 px. Vercel Geist commits to pure-white flat-on-flat surfaces with pure-black `#000000` primary, the `#0070f3` blue on info/link/focus, and Geist Sans at display weight 600.

### vs [Flat / Classic](./flat-classic.md)

Flat / Classic is the unornamented baseline: pure-white raised on grey-white base, saturated blue `#1d4ed8` as primary, system stack typography, 16-px body, soft gaussian drop shadows. Linear Workspace sharpens every move for productivity: cool-tinted base, Linear-iris `#5e6ad2` primary, Inter at 14 px body, hairline-ring elevations, tighter `space` scale.

### vs [Lavender Dawn](./lavender-dawn.md)

Both palettes lean cool-purple on near-white. Linear Workspace is the productivity-tool register: cool grey-white field, Linear-iris `#5e6ad2` primary, 14 px Inter at high density, hairline-ring elevations, tight `radius`. Lavender Dawn is the calm-app register: violet-tinted field, deeper plum `#5c3d8a` primary, 16 px Manrope, soft plum-tinted drop shadows, widened `radius`.

## Where it thrives

- Issue trackers, project-management surfaces, kanban / list views — density wins
- Settings panels and command-palette UIs — the hairline-ring elevation keeps modals quiet
- Long-form Inter running text on `surface.raised` — the 14-px scale stays comfortable

## Where it degrades

- Brand-marketing pages that want warmth — the cool off-white reads as utilitarian
- Touch-first / mobile-only registers where 14-px body becomes too small

## Recall aliases

`linear`, `linear workspace`, `iris`, `productivity saas`, `linear.app`, `height`

## Long-form notes

<details>
<summary>From <code>palettes/linear-workspace.README.md</code></summary>

# Linear Workspace

Modern productivity-SaaS register on the Flat engine. Near-white field
with a cool grey tint, Linear-indigo primary, tight UI density, Inter
throughout, soft 1 px hairline elevations. The "calm productivity tool"
aesthetic — no decoration, every pixel load-bearing.

The register the Linear.app / Height / Vercel-dashboard / Notion-app
generation defined: the app shell sits on a barely-tinted off-white,
raised surfaces lift via hairline rings rather than soft drop shadows,
body type sits at 14 px so information density reads correctly, and one
indigo accent carries the brand without committing the palette to
multiple saturated colours.

`surface.base` is `#fbfbfc` — the cool off-white Linear uses for the
app shell. The 1-2% cool tint is what differentiates this from
Flat / Classic's pure white. `surface.raised` is pure white (`#ffffff`);
`surface.sunken` drops to `#f4f4f6` for input wells.

`intent.primary.bg` is Linear's signature indigo (`#5e6ad2`) — the
"Iris" purple-blue. The colour clears 4.6:1 against white inverse,
just past AA for body text and well past AA for UI controls.

- `intent.info` is the canonical product blue (`#2563eb`); routed to
  `border.focus` only via the primary indigo — the two blues stay
  visually distinct
- `intent.success` is mid-emerald (`#2d8a5f`); deliberately darker
  than Vercel's `#0a874a` to compensate for the slightly cooler field
- `intent.warning` is amber (`#c5710d`)
- `intent.danger` is desaturated rose-red (`#d63a3a`)

`typography.family.*` is Inter throughout — display, body, ui all route
to the same stack. Display weights climb to 700 for headings; body sits
at 14 px (`0.875rem`) so the productivity-tool density reads correctly.
This is the load-bearing typography move: the moment body type goes to
16 px the register collapses into Flat / Classic.

`space.*` collapses slightly at the high end (`5: '20px'`, `6: '28px'`,
`7: '40px'`, `8: '56px'`) — modern productivity tools pack more onto
the canvas than Sage Studio or Lavender Dawn.

`radius.*` follows modern SaaS norms (`sm = 4px / md = 6px / lg = 8px`)
— softer than Swiss, tighter than Sage Studio.

`elevation.low` is a near-invisible 1 px hairline ring
(`0 0 0 1px rgba(17, 20, 27, 0.06)`); `medium` adds a subtle cool-tinted
drop shadow over the same hairline. The "popover that sits 4 px above
the canvas" register, not the "card that lifts a paper-thickness"
register.

**A11y:** `pass`. `content.primary` (`#11141b`) on `surface.base`
(`#fbfbfc`) ≈ 17:1 (AAA). `intent.primary` indigo with white inverse
≈ 4.6:1 (AA body, AA UI). `intent.info` product blue with white
≈ 5.2:1 (AA body). `intent.success` mid-emerald with white ≈ 4.0:1
(AA UI; passes 3:1 button threshold). `intent.warning` amber with
white ≈ 4.7:1 (AA body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
`space.*` density, hairline-ring elevations, and a single-family Inter
typography stack.

</details>

---

_Generated from `palettes/linear-workspace.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
