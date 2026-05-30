# Cel-shaded (Mecha)

> Cool technical register on the cel-shaded engine — steel-white field, dark steel-blue primary that inverts to light text, hazard-orange focus ring, and a squared technical Chakra Petch display face.

**Engine:** `cel-shaded` · **A11y:** `pass`

## Summary

Cel-shaded (Mecha) is the cockpit / HUD register of the `cel-shaded` engine. The engine machinery is identical to the rest of the family — every surface carries a 3px ink outline (`effect.outline.color = #0a0f16`), `elevation.*` paints two-tone block shadows (`effect.shadowStyle = hard`). What changes: `surface.base` is a cool steel-white `#f3f7fa`, `intent.primary.bg` is dark steel-blue `#2563eb` (the one cel-shaded primary deep enough to carry light `#f3f7fa` inverse content), `effect.focusRing` is hazard-orange `#ff7a18`, radius tightens to `sm/md/lg = 3/6/10`, and display switches to a squared technical face: Chakra Petch / Rajdhani / Saira, uppercased.

## Origin

The mecha / cockpit-HUD branch of anime — Gundam, Evangelion, Macross, Patlabor — where ink-line cel animation was tuned for hardware: cool steel surfaces, hazard accents, and squared technical display lettering for callout overlays. This palette ports that grammar onto the shared cel-shaded engine, distinguishing itself from the warm shonen / sakura / kawaii siblings by inverting the temperature.

## Signatures

- **Dark steel-blue primary `#2563eb` that inverts to light content (`#f3f7fa`)** — `intent.primary` is the only cel-shaded primary across the entire family that is dark enough to carry light text: `bg: #2563eb`, `content: #f3f7fa`, `border: #0a0f16`. Every other cel-shaded sibling (shonen orange, shojo pink, kawaii bubblegum, sakura blossom, citrus tangerine) keeps a bright fill with ink content. The inversion is the load-bearing mecha cue — buttons read as cockpit panels rather than poster fills.
- **Cool steel-white field (`#f3f7fa`) and cool-ink outline (`#0a0f16`)** — `surface.base` is `#f3f7fa` (warmer than pure white, cooler than every other cel-shaded base), and `surface.sunken` drops to `#e6edf3`. Even the ink line shifts cooler — `effect.outline.color = #0a0f16` rather than the family-standard `#0a0a0a`. The cool temperature carries through scrim, secondary content, and the offset shadow color.
- **Hazard-orange focus ring (`#ff7a18`) against the steel-blue palette** — `effect.focusRing` is `{ width: 3px, offset: 2px, color: #ff7a18, style: solid }`. Hazard orange is the complement to the steel-blue primary — the focus indicator reads like a cockpit warning light against the cool chrome. The same orange also carries `intent.warning.bg = #ff8c1a` for the cockpit-alert callout.
- **Squared technical display: Chakra Petch / Rajdhani / Saira at weight 700, uppercased** — `typography.family.display` is `"Chakra Petch", "Rajdhani", "Saira", "Helvetica Neue", Arial, sans-serif` at weight 700 with `textTransform: uppercase` on `display` / `title` / `label`. Compared to shonen Archivo Black (condensed grotesque) or shojo Poppins (round humanist), Chakra Petch is squared-technical — the lettering reads as HUD callout labels rather than character names.
- **Tightest radius scale in the cel-shaded family (`sm: 3px`, `md: 6px`, `lg: 10px`)** — Shonen runs `4/8/12`, shojo `6/10/16`, kawaii `8/14/20`. Mecha drops to `3/6/10` — the corners are nearly rectilinear because cockpit panels are stamped, not poured. The ink outline is still on, the shadow is still hard, but the corners are the most hardware-correct in the family.

## Anti-signatures

- A bright fill with ink content on `intent.primary` (every other cel-shaded sibling does that; mecha is the inverted one)
- Warm cream `#fef6e4` / blush `#fff5f9` / petal-white `#fff7f8` surface (those are the warm-register siblings)
- Round humanist or rounded-grotesque display like Poppins / Baloo 2 (mecha is squared-technical Chakra Petch)
- Soft gaussian shadows — `shadowStyle` is still `hard` in mecha
- A transparent or zero-width outline — same cel affordance as the rest of the family

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.outline.color` | `#0a0f16` | `#0a0f16` cool-ink — the only cel-shaded sibling that shifts the outline color from the family-standard `#0a0a0a` toward blue. |
| `effect.outline.width` | `3px` | `3px` — the shared cel outline weight. |
| `effect.shadowStyle` | `hard` | `hard` — the engine recipe; `elevation.*` paints two-tone block shadows. |
| `color.intent.primary.bg` | `#2563eb` | `#2563eb` steel-blue — the only cel-shaded primary deep enough to require light inverse content. |
| `color.intent.primary.content` | `#f3f7fa` | `#f3f7fa` light steel — the inverted-content move that distinguishes mecha from every warm-register sibling. |
| `color.surface.base` | `#f3f7fa` | `#f3f7fa` cool steel-white — replaces the warm cream / blush / petal / lemon surfaces of the other cel-shaded palettes. |
| `effect.focusRing.color` | `#ff7a18` | `#ff7a18` hazard-orange — the cockpit-warning complement to the steel-blue primary. |
| `typography.family.display` | `"Chakra Petch", "Rajdhani", "Saira", "Helvetica Neue", Arial, sans-serif` | Chakra Petch / Rajdhani / Saira stack — squared-technical face for the HUD callout register. |
| `radius.lg` | `10px` | `10px` — the tightest radius in the cel-shaded family, hardware-correct for cockpit panel corners. |

## Often confused with

### vs [Cel-shaded (Shonen)](./cel-shaded-shonen.md)

Same engine. Shonen runs warm cream / orange-primary / blue-focus / Archivo Black uppercased. Mecha (this palette) runs cool steel / dark-blue-primary-with-light-content / hazard-orange-focus / Chakra Petch uppercased, and tightens radius to `3/6/10`. Shonen is the tournament poster; mecha is the cockpit panel.

### vs [Cel-shaded (Shojo)](./cel-shaded-shojo.md)

Shojo is the warm romance register — pink/lavender on blush field with round-humanist Poppins. Mecha (this palette) is the cool hardware register — steel-blue on steel-white with squared Chakra Petch. The engine carries identically; the gendered-poster grammar inverts.

### vs [Tron / Light-Grid](./tron-light-grid.md)

Tron Light Grid is the dedicated grid-line / glow engine — radiant `effect.glow.*`, neon strokes, grid-unit tokens. Mecha (this palette) is cel-shaded — no glow, no grid, every surface is a flat fill with an ink outline. Both read as "hardware UI"; one is glow-grammar, the other is ink-grammar.

### vs [Financial Terminal](./financial-terminal.md)

Financial Terminal is a dense-data flat palette with monospace primacy and conservative chrome. Mecha (this palette) is cel-shaded — big offset block shadows, 3px ink outlines, squared-display chrome at 3rem. They share the "technical instrument" feeling but at opposite ornament levels.

## Where it thrives

- Buttons / Toggles / Tabs — the steel-blue inverted primary reads as a cockpit toggle; the ink outline is the precise click target
- Cards, Modals, Drawers — cool steel-white field plus offset block shadow reads as a HUD callout panel
- Stepper / Progress / Status badges — the warning-orange + steel-blue pair is a natural status story
- Code blocks / data callouts — the squared technical display lettering reads as instrument labels

## Where it degrades

- Tables with dense rows — same per-row outline-density problem as the rest of the cel-shaded family
- Long-form prose / marketing pages — the cool technical register reads as not-friendly by construction
- Calendars / DatePickers — the hazard-orange focus ring against per-cell ink outlines becomes visual noise

## Recall aliases

`cel-shaded mecha`, `cel shaded mecha`, `mecha`, `gundam`, `evangelion`, `cockpit`, `hud`, `cel-shaded`, `cel shaded`, `anime`

---

_Generated from `palettes/cel-shaded-mecha.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
