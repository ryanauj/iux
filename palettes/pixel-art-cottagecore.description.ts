import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'pixel-art-cottagecore',
  tagline:
    'The warm-pastoral register on the pixel-art engine — parchment field, wood-frame shadows, harvest-gold focus, and earthy intents that read like a notice-board pinned in a kitchen rather than a console menu.',
  summary:
    'Pixel Art (Cottagecore) is the warm-earth, art-direction register on the same `pixel-art` engine as NES, Game Boy, and SNES — square corners, ' +
    'bitmap glyphs, hard offsets, `steps(1, end)` everywhere. What sets it apart is colour temperature: `surface.base` is parchment `#fef0d4`, ' +
    '`content.primary` is warm dark brown `#3b2615` (never pure black), and intents fill from a pastoral set — forest green `#3d6b2c` for primary, ' +
    'harvest gold `#dca830` for warning, berry red `#c84830` for danger, water blue `#4878b8` for info. Hard offsets are warm wood-brown ' +
    '(`2px 2px 0 #7a4a1b` at `low`) so panels read as carved frames, not block sprites.',
  origin:
    'Not a hardware-locked palette — an art-direction register. The cozy-indie pixel idiom that emerged across the late-2010s and 2020s ' +
    '(farm sims, life sims, illustrated storybooks, the broader "cottagecore" social media aesthetic) — sharing a single warm-earth palette without ' +
    'belonging to any one title. No console gates the colours; the aesthetic does.',
  signatures: [
    {
      label: 'Parchment `surface.base` (`#fef0d4`) with warm-brown ink (`#3b2615`)',
      detail:
        'The host is a warm cream — `color.surface.base` is `#fef0d4` and `color.content.primary` is `#3b2615` (warm dark brown, deliberately not pure black). The pair measures ~11.4:1, the highest contrast in the non-hardware-locked pixel-art registers. The "cottagecore" temperature is set entirely by these two anchors.',
    },
    {
      label: 'Pastoral intent palette — forest, harvest gold, berry, water',
      detail:
        '`intent.primary.bg` is forest `#3d6b2c`, `intent.warning.bg` is harvest gold `#dca830`, `intent.danger.bg` is berry red `#c84830`, `intent.info.bg` is water blue `#4878b8`. Earthy, not saturated. Compare NES (sky `#0000fc` / brick `#d82800`) — same intent slots, swapped for naturalistic hues.',
    },
    {
      label: 'Wood-brown hard offsets, not black',
      detail:
        '`elevation.low.boxShadow` is `2px 2px 0 #7a4a1b` — the warm wood frame, not the NES `#000000` block. At `high`, the second offset steps to mid-brown `#a87838` (`4px 4px 0 #7a4a1b, 8px 8px 0 #a87838`). The brown-on-parchment cast reads as a carved sign, which is exactly how cottagecore pixel UIs paint their bevels.',
    },
    {
      label: 'Harvest-gold focus ring (`#dca830`) at 4px',
      detail:
        '`effect.focusRing` is `{ width: "4px", color: "#dca830", style: "solid" }`. The lowest-contrast focus indicator in the pixel-art set (~4.2:1 against parchment) but legibly wide. Compare NES yellow `#fcfc00` — same role, warmer hue.',
    },
    {
      label: 'Press Start 2P routed through every typography role',
      detail:
        '`typography.family.{ui,display,mono,pixel,hand}` all resolve to `"Press Start 2P", "VT323", ui-monospace`. The bitmap register is shared with the rest of the pixel-art family — the cottagecore differentiator is colour, not glyph.',
    },
    {
      label: '`effect.pixelGrid` at `8px`, every `radius.*` is `0`',
      detail:
        'The engine reads `pixelGrid` at the palette root and snaps rendering. Even `radius.pill` and `radius.full` collapse to `0`, so circular components render as squares. The warm temperature does not soften the geometry.',
    },
  ],
  antiSignatures: [
    'Pure black text or shadows — the register forbids `#000000`; everything dark is warm brown',
    'Saturated console primaries like sky-blue `#0000fc` or brick `#d82800` (that is the NES register)',
    'Rounded corners, soft shadows, or anti-aliased curves',
    'System UI / sans-serif body — every role is Press Start 2P bitmap',
    'Cool-temperature surfaces (mint, ice, slate) — the host is parchment-warm by definition',
  ],
  tokenEvidence: [
    {
      path: 'effect.pixelGrid',
      note: '`8px` — the engine snap step. The load-bearing slot the engine reads to disable smoothing and anchor `space.*`.',
    },
    {
      path: 'color.surface.base',
      note: '`#fef0d4` — parchment. The warmth bias starts here.',
    },
    {
      path: 'color.content.primary',
      note: '`#3b2615` — warm dark brown, deliberately not pure black. The "no pure black anywhere" rule is the register.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#3d6b2c` — forest green, not a console primary. Pastoral intent palette in slot one.',
    },
    {
      path: 'elevation.low.boxShadow',
      note: '`2px 2px 0 #7a4a1b` — wood-brown hard offset, not the NES black block.',
    },
    {
      path: 'effect.focusRing.color',
      note: '`#dca830` — harvest gold, 4px wide. Warmest focus colour in the pixel-art set.',
    },
    {
      path: 'typography.family.pixel',
      note: 'Press Start 2P stack — routed through every `role.*`, same as the NES sister palette.',
    },
    {
      path: 'radius.lg',
      note: '`0` — every radius collapses to zero, including `pill` and `full`.',
    },
  ],
  lookalikes: [
    {
      against: 'pixel-art-nes',
      differentiator:
        'NES is the hardware-locked NTSC 2C02 register — saturated console primaries (`#0000fc` / `#d82800` / `#fcfc00`), black hard offsets, yellow focus ring. Cottagecore (this palette) is an art-direction register, not hardware: warm parchment field, earthy pastoral intents, wood-brown offsets, gold focus. Same engine, opposite temperature.',
    },
    {
      against: 'pixel-art-gameboy',
      differentiator:
        'Game Boy is the 4-shade green-monochrome DMG register; intents collapse onto luminance steps. Cottagecore has the full earthy intent set with distinct hues per slot and a multi-tone shadow stack.',
    },
    {
      against: 'sketch-marker',
      differentiator:
        'Sketch-marker is the warm-paper register on the *non*-pixel engine — `effect.pixelGrid` is `0`, glyphs are hand-drawn, edges have stroke variance. Cottagecore commits to the bitmap engine: `pixelGrid` at `8px`, every role on Press Start 2P, zero `strokeVariance`.',
    },
  ],
  thrivesWith: [
    'Kanban / card grids — the wood-brown offset on parchment reads as cards pinned to a corkboard',
    'Toast, Modal, Drawer — the carved-frame elevation feels like a notice-board callout',
    'Stepper, Tabs, Pagination — the warm temperature softens the bitmap density',
  ],
  degradesWith: [
    'Spatial canvas / Bezier editor — same engine-level off-grid jitter as the other pixel-art registers',
    'Long muted-text passages — `content.muted` `#7a5638` on parchment falls into the borderline-AA band',
    'Calendar grids that depend on subtle intent tint — the earthy intents are visually closer than NES primaries',
  ],
  recallAliases: ['cottagecore', 'pixel art cottagecore', 'pixel-art-cottagecore', 'pastoral pixel', 'farm sim', 'cozy pixel'],
}
