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
