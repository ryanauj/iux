# Soft Pastel

Friendly modern app register on the Flat engine. Cream-pink field,
deep-plum body ink, rose / peach / mint / lavender intents, widened
radii for a soft-edged feel. The Cron-calendar / Notion-pastel /
post-2020 "friendly SaaS launch site" aesthetic — pastel chrome where
no element ever reads as sharp.

Ships `experimental` because the load-bearing pastel intents — rose
primary and peach warning — sit close to but not strictly past the AA
body-text threshold against their inverse content. The palette
compensates by routing inverse content to deep plum (`#2b1e29`) on the
lighter intent surfaces (peach warning) and reserving white inverse for
the deeper rose / mint / blue intents that clear AA. The result reads
correctly visually but the contrast trap is documented as the teaching
example for this register.

`surface.base` is cream-pink (`#fcf7f6`) — a 1-2% pink-warm tint over
near-white. `surface.raised` is pure white (`#ffffff`); `surface.sunken`
drops to `#f4ecea` for input wells.

`intent.primary.bg` is deep rose (`#c25e8e`) — rose-pink saturated
enough to read as a button, with white inverse content clearing ≈ 3.5:1
(AA UI minimum, not AA body). Pushing primary to a darker rose would
break the pastel register; keeping it bright enough to read as pastel
puts the palette on the AA body-text edge.

- `intent.warning` is peach (`#f3c074`) with **deep-plum** inverse
  content (not white) — the lighter peach surface needs dark content
  to clear AA at ≈ 9:1
- `intent.success` is mid-mint (`#3d8c5e`) with white inverse ≈ 4.0:1
  (AA UI)
- `intent.info` is sky lavender (`#7a8ed4`) with white inverse ≈ 3.4:1
  (AA UI)
- `intent.danger` is rose-red (`#d44d63`) with white inverse ≈ 4.4:1
  (just shy of AA body, comfortable AA UI)

`typography.family.display` is Fraunces (Recoleta fallback) — the soft
modern transitional serif this register favours; quirky enough to read
as friendly without breaking the pastel ground.

`radius.*` is generous (`sm = 6px / md = 12px / lg = 20px`) — the
pastel register reads correctly only when corners are soft. Sharp
pastel reads as muddy; round pastel reads as deliberate.

`elevation.*` shadow recipes tint toward plum (`rgba(43, 30, 41, 0.08)`
at `low`) so cards lift as pressed cardstock above pink-cream linen.

**A11y:** `experimental`. The pastel intents document the failure mode
this palette exists to illustrate: at saturation values that read as
"pastel" (not as "muted full-saturation"), white inverse content sits
at the AA UI threshold rather than the AA body threshold. The palette
ships as a teaching example for the trade-off — every brand that has
used this register has shipped with the same caveat.

## Engine cost

Zero new tokens. Pure Flat-engine configuration: `color.*`, widened
`radius.*`, soft elevations, and a Fraunces display serif. The
`experimental` a11y tag is the documentation seam, not an engine
addition.
