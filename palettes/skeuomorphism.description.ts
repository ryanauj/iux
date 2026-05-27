import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'skeuomorphism',
  tagline:
    'Material mimicry — warm parchment surfaces lit like real paper and leather, Optima serif on display, and a per-slot inset highlight + inset shade + outer drop recipe that bevels every panel.',
  summary:
    'Skeuomorphism mimics real materials. `surface.base` is warm parchment `#e8dfcf`; `raised` (`#f3ead8`) ' +
    'reads lighter and `sunken` (`#d8cdb8`) reads darker so the surface ladder is lit like paged paper. ' +
    "`elevation.*` packs the tactile recipe per slot: a warm-white inset top highlight, a warm-black inset " +
    "bottom shade, and a soft outer drop shadow — a bevel-and-shadow look without any CSS gradient, since the " +
    'contract only exposes flat colours. Display family is Optima / Lucida Bright / Georgia serif (humanist ' +
    'letter shapes for the real-material register); UI stays Lucida Grande sans for density. Intents are ' +
    'saturated solids (`#2f6e4a` primary green, `#a83232` danger red) paired with cream `inverse` content ' +
    '`#fdf6e3`.',
  origin:
    'The pre-2013 design paradigm — Apple Aqua (Mac OS X), iOS 1-6 (2007-2012), and Windows desktop chrome ' +
    'where every control was drawn to look like a physical object: brushed-metal title bars, leather-stitched ' +
    'Calendar, felted Game Center, paper-bound iBooks. Killed by the iOS 7 (2013) flat reset and the broader ' +
    'flat-design movement that followed; this palette is the period-correct revival within the contract\'s ' +
    'gradient-free constraints.',
  signatures: [
    {
      label: 'Per-slot inset highlight + inset shade + outer drop',
      detail:
        '`elevation.low` is `inset 0 1px 0 rgba(255,246,227,0.55), inset 0 -1px 0 rgba(58,39,19,0.30), 0 2px 3px rgba(58,39,19,0.30)` — three layers per slot: warm-white top highlight, warm-black bottom shade, soft outer drop. The recipe scales: `overlay` runs `inset 0 2px 0 / inset 0 -3px 0 / 0 16px 32px rgba(58,39,19,0.45)`. The inset highlight + inset shade reads as a bevel; the outer drop lifts it off the page.',
    },
    {
      label: 'Warm parchment surface ladder (`#e8dfcf` base, `#f3ead8` raised, `#d8cdb8` sunken)',
      detail:
        '`surface.base` is `#e8dfcf` (warm parchment), `raised` is lighter (`#f3ead8`), `sunken` is darker (`#d8cdb8`), and `overlay` is lightest (`#f8f1df`). The four-step warm ladder mimics aged-paper lighting; nothing is neutral grey or pure white.',
    },
    {
      label: 'Ink-on-paper content with brown link',
      detail:
        '`content.primary` is `#3a2713` (warm-black ink), `secondary` is `#5b4423`, `muted` is `#8a7350`, and `content.link` is `#6b4226` — a saddle-brown that reads as letterpress ink rather than web indigo. The whole text stack reads as printed-on-paper, not screen-on-display.',
    },
    {
      label: 'Optima serif on display, Lucida Grande sans on UI',
      detail:
        '`typography.family.display` is `"Optima", "Lucida Bright", Georgia, serif` — humanist serif/sans-serif hybrid letter shapes that complement the real-material register. `family.ui` is `"Lucida Grande", "Helvetica Neue", Helvetica, Arial, sans-serif` — the period-correct Mac OS X system font. `family.mono` is Courier New for the typewriter register.',
    },
    {
      label: 'Saturated solid intents with cream `inverse` content',
      detail:
        "`intent.primary.bg` is `#2f6e4a` (deep forest green), `danger.bg` is `#a83232` (oxblood red), `warning.bg` is `#c87f0a` (mustard amber) — saturated jewel-tone solids paired with cream `inverse` `#fdf6e3` (not white). The cream content is what keeps the intents reading as inked paper rather than digital fills.",
    },
    {
      label: 'Brown 2px focus ring on saddle ink (`#6b4226`)',
      detail:
        "`effect.focusRing` is `{ width: 2px, offset: 2px, color: #6b4226, style: solid }` — the same saddle brown as `content.link`, not a neon. Focus reads as the same ink that text and links use.",
    },
  ],
  antiSignatures: [
    'Neutral grey or pure white surfaces (Skeuomorphism is warm parchment, not paper-and-ink Material)',
    'A sans-only typography stack (the Optima serif on display is load-bearing)',
    'Saturated neon focus rings (Skeuomorphism uses saddle-brown ink, not pink/blue)',
    'Single-shadow outer drop with no inset highlight (the bevel pair is the engine signal)',
    'Pastel candy intents (Skeuomorphism uses saturated jewel-tone solids with cream inverse)',
  ],
  tokenEvidence: [
    {
      path: 'elevation.low.boxShadow',
      note: 'Per-slot recipe — `inset 0 1px 0 rgba(255,246,227,0.55), inset 0 -1px 0 rgba(58,39,19,0.30), 0 2px 3px rgba(58,39,19,0.30)`. The inset highlight + inset shade + outer drop trio is the tactile-material signature.',
    },
    {
      path: 'elevation.flat.boxShadow',
      note: 'Even `flat` carries a bevel — `inset 0 1px 0 rgba(255,246,227,0.50), inset 0 -1px 0 rgba(58,39,19,0.20)`. No surface is truly unembellished; every panel reads as a printed object.',
    },
    {
      path: 'color.surface.base',
      note: 'Warm parchment `#e8dfcf` — the aged-paper host colour. Compare to Flat/Classic\'s neutral `#f4f5f7`.',
    },
    {
      path: 'color.surface.raised',
      note: '`#f3ead8` — lighter than base. The four-step warm ladder mimics paged-paper lighting.',
    },
    {
      path: 'color.content.primary',
      note: 'Warm-black ink `#3a2713` — not neutral black. Reads as printed letterpress.',
    },
    {
      path: 'typography.family.display',
      note: 'Optima/Lucida Bright/Georgia serif stack — humanist letter shapes for the real-material register.',
    },
    {
      path: 'typography.family.ui',
      note: 'Lucida Grande sans — the period-correct Mac OS X / iOS 6 system font.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Forest green `#2f6e4a` with cream `inverse` content `#fdf6e3` — saturated jewel-tone fill with paper-cream ink, not white.',
    },
  ],
  lookalikes: [
    {
      against: 'claymorphism',
      differentiator:
        "Both stack inset highlight + inset shade + outer drop, but Claymorphism uses pastel violet surfaces, Quicksand sans, 16-32px radii, and pastel candy intents to read as cartoon-inflated. Skeuomorphism uses warm parchment, Optima serif, 6-16px radii, and jewel-tone intents to read as real-material — Skeuomorphism wants to be paper; Claymorphism wants to be plasticine.",
    },
    {
      against: 'neumorphism',
      differentiator:
        "Neumorphism collapses to one cool grey-blue tonal value across every surface and uses a diagonal top-left/bottom-right shadow pair to carve controls from a single foam. Skeuomorphism uses a four-step warm parchment ladder (`base` ≠ `raised` ≠ `sunken` ≠ `overlay`), a vertical inset top + inset bottom + outer drop, visible borders, and serif display.",
    },
    {
      against: 'editorial',
      differentiator:
        "Editorial also leans on serifs and a warm paper-leaning palette, but it is flat-typographic — no inset bevels, no outer drop shadow stack, no tactile elevation. Skeuomorphism commits to the bevel-and-shadow recipe on every slot; Editorial keeps the page flat.",
    },
    {
      against: 'aero-glass',
      differentiator:
        "Aero-glass also pairs an inset top highlight with an inset bottom shade, but on a translucent blue-tinted glass panel over a saturated Vista-blue host, with Segoe UI typography. Skeuomorphism is opaque warm-parchment with serif display — same bevel grammar, completely different material register.",
    },
    {
      against: 'flat-classic',
      differentiator:
        "Flat/Classic strips all material mimicry — opaque white over neutral grey, single soft drop shadow, system sans throughout. Skeuomorphism is the pre-flat-design ancestor: warm parchment, serif display, bevel-and-shadow on every elevation slot.",
    },
  ],
  thrivesWith: [
    'Notebook and journal apps — the parchment + serif + bevel grammar was built for them',
    'Calendar, contacts, and address-book UI — the original iOS 6 register',
    'Reading apps and library shelves — `surface.base` + Optima reads as printed pages',
    'Form controls where the bevel makes inputs feel physically pressable',
  ],
  degradesWith: [
    'Dense data tables — per-row bevels become visual noise',
    'Small icon glyphs — README flags reduced scan-ability when silhouettes overlap inset shadow edges',
    'Modern dashboards and analytics — the warm parchment reads as out-of-period',
    'Long-form prose at small sizes — `content.muted` `#8a7350` on `#f3ead8` is borderline AA at body sizes',
  ],
  recallAliases: ['skeuomorphism', 'skeuomorphic', 'skeumorphism', 'aqua', 'mac os x aqua', 'ios 6'],
}
