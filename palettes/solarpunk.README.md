# Solarpunk

Eco-utopian register on the Flat engine. Soft sun-bleached cream field,
leaf-green primary, solar-amber warning, sky-cyan info — a saturated
organic palette pulled from chlorophyll, daylight, and clean water
rather than from a brand guideline.

`surface.base` is soft sun-bleached cream (`#f6f1de`); `surface.raised`
is `#fdfaee` (a fresh page in afternoon shade); `surface.sunken` drops
to `#e8e0c2` for input wells. The cream is warmer than Editorial /
Newspaper but cooler than Desert Modernism — a sunlit-but-not-baked
register.

The four organic intents:

- `intent.primary` is leaf green (`#2f7a32`) — the saturated mid-canopy
  green of a hardwood in May
- `intent.warning` is deep solar amber (`#a07210`) — pulled two shades
  down from the un-printable `#c48a14` so cream inverse content clears
  the 3:1 floor on the saturated fill. The original brighter amber was
  the brief; the gate caught it.
- `intent.info` is sky cyan (`#1f7a9c`) — a saturated mid-cyan that
  reads as "clear sky," distinct from pool turquoise (Desert Modernism)
  and Riso blue (Risograph)
- `intent.danger` is pomegranate (`#9c1f2e`) — the only red on the
  palette, so it reads as urgent without competing with the warmth
  register

`intent.success` reuses `intent.primary`'s leaf green — the palette
treats "go ahead" and "growing thing" as the same affordance, the same
way Tokyo / Day treats "go" and "primary" as the same JR-East green.

`typography.family.display` is Quicksand (Comfortaa fallback) — a
humanist-rounded sans with chunky rounded counters that cue "organic,
not industrial." `family.body` is Inter for long-form reading. The two-
family rule pairs rounded display + clean sans body.

`radius.*` widens compared to Flat / Classic — `sm: '6px'`, `md: '10px'`,
`lg: '16px'`. Rounded corners are part of the organic-shapes-not-
engineering-grids cue. The widened radii are the second load-bearing
move (after the leaf-green primary).

`elevation.*` uses a green-tinted shadow (`rgba(40, 70, 30, 0.10)`) so
cards lift as canopy leaves on dappled-light cream paper, not as
neutral panels against grey. The shadow recipe matches Flat / Classic;
only the tint shifts.

`motion.easing.spring` is a softer overshoot (`cubic-bezier(0.34, 1.5,
0.64, 1)`) — the organic register reads as "settling like a leaf"
rather than "snapping to grid." Durations also stretch one tier
(`base: '240ms'`, `slow: '400ms'`).

**A11y:** `pass`. `content.primary` (`#1d2818`) on `surface.base`
(`#f6f1de`) ≈ 13:1 (AAA). `intent.primary` leaf green on cream inverse
≈ 6.8:1 (AAA at large sizes, AA at body). `intent.warning` solar amber
on cream inverse ≈ 4.4:1 (AA body). `intent.info` sky cyan on cream
inverse ≈ 5.5:1 (AAA at large sizes, AA at body).

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, `radius.*`,
elevation tint, motion easing, and a humanist-rounded typography stack.
