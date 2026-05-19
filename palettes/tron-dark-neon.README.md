# Tron / Dark-Neon

Glassmorphism engine, single-color tuning. Near-black `surface.base`
(`#04060c`), translucent cyan raised/sunken/overlay surfaces (`rgba(8,
145, 178, …)`), and a saturated cyan focus ring rendered as a
*glow* (`effect.focusRing.style = 'glow'`) rather than a solid stroke.

`elevation.*` stacks an inset 1px cyan inner stroke with an outer cyan
glow at increasing radii — the "HUD chrome" look. Typography reaches for
`Orbitron` / `Eurostile` style geometric sans on UI text and an uppercase
mono on `code` (`textTransform: 'uppercase'`) so readouts read as HUD
output rather than prose. Motion is tight (80-280ms) to feel
arcade-cabinet responsive.

**A11y:** `experimental`. Because Tron reuses the Glassmorphism engine
the same caveat applies: translucent `raised` surfaces inherit whatever
sits behind them, so per-token contrast is a guideline, not a guarantee.
On the documented near-black `base` the contract values clear AA
(`#67e8f9` content ≈ 9.7:1), but as soon as the panel is mounted over an
unknown host its contrast becomes whatever shows through. The
aggressive `scrim` (`rgba(4, 6, 12, 0.78)`) is mandatory for overlays.
`effect.focusRing.style = 'glow'` requires the engine to render the ring
as a `box-shadow` halo (not an outline) — components that want it to
work everywhere should fall back to outline plus an additional glow.
