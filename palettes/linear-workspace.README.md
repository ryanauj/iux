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
