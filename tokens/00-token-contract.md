# Token contract

The single seam between components and palettes.

## Hard rules

1. **Components consume only contract tokens.** No component file imports
   a color literal, a pixel value, a font-family string, a CSS shadow, or
   a duration. If a component needs a value, that value gets a slot in
   `SemanticTokens` first.
2. **Palettes redefine only contract tokens.** A palette file produces a
   single `SemanticTokens` object. It does not export helper utilities,
   per-component overrides, or escape-hatch CSS. If a palette can't
   express itself through the contract, the contract changes — not the
   palette.
3. **No raw values downstream.** No `#ffffff`, no `8px`, no
   `cubic-bezier(...)`, no `Inter, sans-serif` anywhere outside
   palettes. Lint should enforce this against `src/components/` and
   `src/demos/`. (Lint to be added when components land.)
4. **The contract is the API.** Adding a token is a breaking change for
   palettes. Every palette in `FINALIZED-PALETTES.md` must implement
   every token. There are no optional tokens; there are only tokens
   whose value some palettes set to a no-op (`'none'`, `'0'`, an empty
   shadow string).

The TypeScript source of truth is `tokens/semantic.contract.ts`. This
document explains the *why* and the value-type conventions; the `.ts`
file is the enforceable shape.

## Token groups

### `color.surface.*`
The painted backgrounds of the app shell and its layered surfaces. Five
slots:

- `base` — the page background.
- `raised` — cards, panels, the default "above the page" surface.
- `sunken` — input fields, inset wells, anything that reads as recessed.
- `overlay` — modal / popover / drawer panels (above everything,
  paired with `scrim`).
- `scrim` — the dimmed full-screen tint behind an overlay.

Glass and Tron palettes use rgba + `effect.backdropBlur.*` to make
`raised` translucent. Flat palettes use opaque solids. Neumorphism keeps
`base` and `raised` identical and relies entirely on `elevation.*` to
distinguish them — which is the failure mode the palette demonstrates.

### `color.content.*`
Foreground colors that go *on* surfaces.

- `primary` — body text on `surface.base`/`raised`.
- `secondary` — supporting text, meta, captions.
- `muted` — placeholder, disabled, decorative dividers.
- `inverse` — text on `intent.*.bg` (often white on a colored button).
- `link` — hyperlink color (focus / hover variants live on `border.focus`
  and component-local conventions, not here).

### `color.border.*`
Stroke colors on surfaces and components.

- `subtle` — barely-there separators (table rows, list rows).
- `default` — input borders, card outlines.
- `strong` — emphasis borders, neubrutalism's defining black 3px line.
- `focus` — keyboard focus ring color (paired with `effect.focusRing`).

### `color.intent.*`
Composite slots. Each intent (`primary`, `neutral`, `success`, `warning`,
`danger`, `info`) defines five sub-tokens: `bg`, `content`, `border`,
`bgHover`, `bgActive`. This is what buttons, badges, alerts, and toasts
consume. Six intents; no others. If a component needs "violet" because
the palette is purple, that's `intent.primary`, not a seventh intent.

### `space.*`
A linear scale `0` through `8`. Components only use these. Values map
roughly to a 4px base step (`0 → 0px`, `1 → 4px`, … `8 → 64px`) but
palettes may rescale (Editorial widens, AAA tightens for keyboard
density). The *names* are the contract; the *pixels* are not.

### `radius.*`
`none`, `sm`, `md`, `lg`, `pill`, `full`. Neubrutalism sets all to `0`.
Claymorphism sets `sm` ≈ `md` ≈ `lg` to large values. Pill produces
horizontal-pill shapes on rectangular elements; `full` is for circles
and circular crops.

### `borderWidth.*`
`0`, `hairline`, `thin`, `thick`, `heavy`. AAA uses `thick` for focus
rings. Neubrutalism uses `heavy` for the defining outline. Most palettes
leave `thick` and `heavy` reachable but unused.

### `elevation.*`
`flat`, `low`, `medium`, `high`, `overlay`. Each value is a single
`Shadow` record containing a CSS `boxShadow` string. The string may
stack multiple shadows including inset shadows — that's how Neumorphism
puts a paired inner+outer shadow into one slot, how Claymorphism gets
its inflated look, and how Neubrutalism puts a `4px 4px 0 #000` hard
offset into `low`. Material's `medium` is a soft drop shadow.
Glassmorphism's `low` may be a near-invisible 1px inset and rely on
`backdropBlur` for the depth cue.

### `typography.*`
- `family.ui` / `family.display` / `family.mono` — three font stacks.
- `role.{display,title,heading,subheading,body,label,caption,code}` —
  composed text styles. Each role names a `TextStyle`:
  `{ family, size, weight, lineHeight, tracking, textTransform? }`.
  Components reference roles, never the underlying atoms.

Editorial sets `display` and `heading` to a serif. AAA bumps `body` size
and weight up. Neubrutalism sets `display` to a heavy condensed face and
`tracking` tight. Tron sets `code` to a monospace with `textTransform:
'uppercase'` for HUD-style readouts.

### `motion.*`
- `duration.{instant, fast, base, slow}` — CSS time strings.
- `easing.{standard, in, out, inOut, spring}` — CSS easing strings.

`instant` is `'0ms'` and is the value AAA returns from every easing
slot when the user prefers reduced motion. Engines are responsible for
honoring `prefers-reduced-motion` at the palette level, not in
component code.

### `effect.*`
Cross-cutting visual effects that some engines need.

- `backdropBlur.{none, sm, md, lg}` — `filter: blur(…)` magnitudes.
  Flat / Material / Editorial / AAA palettes return `'none'` for every
  slot.
- `focusRing.{width, offset, color, style}` — the focus indicator
  recipe. `style: 'solid' | 'glow' | 'double'`. Tron uses `glow`. AAA
  uses `solid` with `width = borderWidth.thick`. Flat uses `solid`
  with `thin`.

## Value-type conventions

- All sizes are CSS strings with units (`'8px'`, `'1rem'`, `'0'`). No
  bare numbers. (Exception: `weight` may be a numeric font-weight.)
- All colors are CSS color strings (`'#0a0a0a'`, `'oklch(...)'`,
  `'rgba(255,255,255,0.4)'`). Palettes are not required to use any
  particular color space.
- All durations and easings are CSS-valid strings (`'200ms'`,
  `'cubic-bezier(0.2, 0, 0, 1)'`).
- `Shadow.boxShadow` is whatever you'd paste into `box-shadow:` — a
  single shadow or a comma-separated stack, optionally with `inset`.
- All `TextStyle` fields are CSS strings except `weight` (number or
  string). `textTransform` is the CSS keyword set.

## Engine ↔ token mapping

Each engine differs in which token slots carry the weight:

| Engine          | Heavy slots                                                | No-op slots                              |
|-----------------|------------------------------------------------------------|------------------------------------------|
| Flat            | `color.*`, `space.*`, `radius.sm/md`                       | `elevation.*` (mostly empty), `effect.backdropBlur` |
| Material        | `elevation.*`, `color.intent.*`, `motion.*` (ripple)       | `effect.backdropBlur`                    |
| Neubrutalism    | `borderWidth.heavy`, `elevation.low` (hard offset), `radius.none` | `effect.backdropBlur`            |
| Glassmorphism   | `color.surface.*` (alpha), `effect.backdropBlur.*`, `color.border.subtle` | (uses all)                |
| Neumorphism     | `elevation.*` (paired inner+outer)                         | `color.border.*` (deliberately invisible)|
| Claymorphism    | `radius.lg`, `elevation.*` (doubled), pastels in `color.surface.*` | `effect.backdropBlur`            |
| Skeuomorphism   | `elevation.*` (real shadows), per-palette texture in `color.surface.*` (via CSS gradients) | `effect.backdropBlur` |

Group B palettes (Tron, Editorial, AAA) inherit the heavy/no-op shape
of their underlying engine and only retune the values.

## What is *not* in the contract

- Per-component sizing (button height, input height). These are
  derived from `space.*` and `typography.role.label` inside the
  component, not slots in the contract.
- Z-index. The stacking order of overlays / drawers / toasts is a
  component-system concern, not a palette concern.
- Animation choreography (which property animates on hover, etc.). The
  engine decides; the contract only supplies the duration and easing.
- Iconography or illustration style. Out of scope for v1.

## Adding a token

When a future component genuinely cannot be expressed with the existing
slots:

1. Propose the slot here and in `semantic.contract.ts` in the same
   change.
2. Provide values for it in *every* palette in the same change. A
   palette without a value is a broken build.
3. Document the engine ↔ token mapping update in the table above.

This keeps the contract from drifting into "whatever each palette
wanted today."
