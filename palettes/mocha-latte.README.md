# Mocha Latte

Warm coffee-shop / third-wave café register on the Flat engine. Oat-
cream field, mocha-brown primary, cinnamon warning, matcha success,
cool-blue info. Warmer than Stone Modern (which leans cool charcoal),
more coffee-table than Sage Studio (which leans botanical-leaf). The
"modern café web presence" aesthetic — warm espresso accents on hand-
pressed paper.

`surface.base` is oat-cream (`#f5eddd`) — a 4-5% yellow-warm undertone
that reads as espresso-stained paper, not as bone or bright cream. The
warmer field is what differentiates Mocha Latte from Sage Studio's
bone (`#f3efe6`) — both palettes use warm cream-paper grounds, but
Mocha Latte commits to a deeper warmth that the entire chromatic set
sits inside. `surface.raised` lifts to latté-foam (`#fcf7ea`);
`surface.sunken` drops to `#e8ddc6` for input wells.

`intent.primary.bg` is mocha brown (`#6f4b2d`) — the espresso-with-cream
colour. With bone-cream inverse content it clears ≈ 7.5:1 (AAA),
deeper than Stone Modern's charcoal-brown primary but less aggressive
than Mall-goth's near-black.

- `intent.warning` is cinnamon (`#c97d2a`) — the second warm note,
  sitting in the same hue family as primary
- `intent.success` is matcha green (`#5a7c3a`) — same green as Sage
  Studio's `intent.success`, intentionally shared across the warm-paper
  register set
- `intent.danger` is signal red (`#a8261e`)
- `intent.info` is cool slate-blue (`#3a5c7c`) — the **only cool colour
  on the palette**, sitting against everything else for state contrast;
  the warm/cool pairing for info is the load-bearing colour discipline

`typography.family.display` is Recoleta (Fraunces fallback) — a warm
modern transitional serif that pairs with the espresso colour register.
The Recoleta + Inter pairing is what differentiates this from Stone
Modern's Söhne-throughout register: Mocha Latte commits to a serif
display, Stone Modern commits to a single-family grotesque.

`radius.*` widens (`sm = 4px / md = 10px / lg = 16px`) — café branding
favours warm, soft corners without going pillow-soft.

`elevation.*` shadow recipes tint toward espresso (`rgba(46, 34, 24, 0.10)`
at `low`) so cards lift as a saucer above the table-paper field.

Display labels use uppercase tracking (`0.08em`) for the small-caps
"menu category" feel modern cafés use on section headers.

**A11y:** `pass`. `content.primary` (`#2e2218`) on `surface.base`
(`#f5eddd`) ≈ 12.4:1 (AAA). `intent.primary` mocha brown with cream
inverse ≈ 7.5:1 (AAA). `intent.warning` cinnamon with cream inverse
≈ 3.7:1 (AA UI, AA large). `intent.success` matcha green with cream
inverse ≈ 5.1:1 (AA body). `intent.info` slate-blue with cream inverse
≈ 6.4:1 (AA body, AAA large).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, widened
`radius.*`, espresso-tinted elevations, and a transitional-serif display
+ geometric-sans body typography pairing. Shares the matcha-green
`intent.success` with Sage Studio as a deliberate cross-palette anchor
in the warm-paper register family.
