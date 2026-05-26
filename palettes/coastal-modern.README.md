# Coastal Modern

Contemporary coastal / beach-house register on the Flat engine. Pale
sea-foam field, deep-teal primary, sunset-rust warning, modern humanist
rounded sans throughout. Cooler than Sage Studio (which leans warm-bone),
warmer than Nordic Frost (which leans arctic-blue). The Hamptons / Cape
Cod / Tulum-modern aesthetic — sea-foam ground, polished wood trim,
accent warmth from a sunset.

`surface.base` is pale sea-foam (`#edf5f4`) — a 2-3% cyan-green tint
that grounds the rest of the palette as "shallow tropical water" rather
than as "neutral pale." `surface.raised` lifts to barely-tinted near-
white (`#fafdfd`); `surface.sunken` drops to `#d8e8e6` for input wells.

`intent.primary.bg` is deep teal (`#1e5460`) — the colour of deep
coastal water at dusk. `intent.info` reuses the same teal because
coastal-modern signage commits to one blue-green; introducing a second
saturated blue would break the register.

- `intent.warning` is sunset rust (`#b8631c`) — the warm complement to
  the cool primary; the warm/cool pairing is the load-bearing colour
  move
- `intent.danger` is coral red (`#c2403a`) — sits in the same warm hue
  family as warning so the two warm intents read as a coherent sunset
  set rather than as a clash
- `intent.success` is sea green (`#2d7a5a`) — visibly distinct from
  primary teal (more green, less blue)

`typography.family.display` is Nunito (Quicksand / Inter fallback) —
humanist rounded sans for a softer modern feel. `family.body` and
`family.ui` route to Inter for clean prose. The display + body split
(rounded for headings, geometric for body) is the typography move that
reads as "coastal modern" rather than as "modern productivity SaaS."

`radius.*` widens to `sm = 6px / md = 12px / lg = 18px` — coastal
modern architecture and product design favour softer curves than urban
modernism (Stone Modern uses `sm = 2px / md = 4px` for the contrast).

`elevation.*` shadow recipes tint toward teal (`rgba(20, 53, 64, 0.10)`
at `low`) so cards lift as polished driftwood above sea-foam, not as
neutral panels.

**A11y:** `pass`. `content.primary` (`#143540`) on `surface.base`
(`#edf5f4`) ≈ 13.5:1 (AAA). `intent.primary` deep teal with `#fafdfd`
inverse ≈ 8.6:1 (AAA). `intent.warning` sunset rust with cream inverse
≈ 4.4:1 (AA body). `intent.success` sea green with cream inverse
≈ 5.1:1 (AA body). `intent.danger` coral red with cream inverse
≈ 5.6:1 (AA body, AAA large).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, widened
`radius.*`, teal-tinted elevations, and a humanist-rounded + geometric
sans typography pairing.
