import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'cel-shaded-sakura',
  tagline:
    'Spring-blossom register on the cel-shaded engine — petal-white field, blossom-pink primary against matcha-green focus, the same 3px ink outline and hard-offset block shadows as the rest of the family.',
  summary:
    'Cel-shaded (Sakura) is the spring register of the `cel-shaded` engine — a pink/green complementary pair on a ' +
    'warm petal-white field, rather than the shojo pink/lavender dream set. Engine machinery is identical to the ' +
    'rest of the family: every surface carries a 3px ink outline (`effect.outline.color = #0a0a0a`), `elevation.*` ' +
    'paints two-tone block shadows (`effect.shadowStyle = hard`), and `color.border.*` collapses to ink. The ' +
    'distinguishing move is the seasonal complementary pair — blossom-pink `#f9a8d4` primary against matcha-green ' +
    '`#65a30d` focus ring (sakura petals over new leaves), on a warm petal-white `#fff7f8` field.',
  origin:
    'The hanami / spring-arc visual register of cel-animated shojo — the cherry-blossom episodes of Cardcaptor ' +
    'Sakura, the spring chapters of Fruits Basket, the petal-shower transitions used across the genre. Same ink-' +
    'line + two-tone-shading recipe as the shojo and shonen siblings, swapped to the seasonal pink/green pair that ' +
    'reads as petals-and-leaves rather than pink/lavender dream-aura.',
  signatures: [
    {
      label: 'Blossom-pink primary `#f9a8d4` against matcha-green focus `#65a30d` (the load-bearing seasonal pair)',
      detail:
        '`intent.primary.bg = #f9a8d4` (softer than shojo `#ec4899` magenta — closer to actual cherry-blossom petal) ' +
        'and `effect.focusRing.color = #65a30d` (matcha green — sakura petals fall against new spring leaves). The ' +
        'complementary pair is the seasonal-arc signal; replacing the focus with lavender turns this into shojo.',
    },
    {
      label: 'Warm petal-white `surface.base` (`#fff7f8`) with a plum scrim',
      detail:
        'The cel field is `#fff7f8` — slightly warmer and pinker than the shojo blush `#fff5f9`; `surface.sunken` is ' +
        '`#fdeaef` for input wells. The modal scrim is `rgba(74, 30, 45, 0.5)` — a deep plum tint that locks the sakura ' +
        'story even in dimmed states.',
    },
    {
      label: 'Same 3px ink outline and hard-offset shadows as the rest of the cel-shaded family',
      detail:
        '`effect.outline.color = #0a0a0a`, `effect.outline.width = 3px`, `effect.shadowStyle = hard`. `elevation.low` is ' +
        '`3px 3px 0 #0a0a0a` scaling to `8px 8px 0 #0a0a0a, 0 24px 48px rgba(74, 30, 45, 0.28)` at `overlay`. The plum ' +
        'secondary drop at `overlay` matches the scrim — sibling-uniform engine, sibling-specific tint.',
    },
    {
      label: 'Round-humanist Poppins display at weight 700, sentence-case',
      detail:
        '`typography.family.display` is `"Poppins", "Quicksand", "Comfortaa", "Helvetica Neue", Arial, sans-serif` at ' +
        'weight 700 (one step lighter than shojo\'s 800). Body weight drops to 400 — the lightest body weight in the ' +
        'cel-shaded family. The combination reads as a print-magazine spring issue rather than a TV chapter card.',
    },
    {
      label: 'Lavender info `#a5b4fc` as the third seasonal note, not a primary',
      detail:
        '`intent.info.bg = #a5b4fc` — a pale lavender that gives sakura a third spring color without competing with the ' +
        'pink/green pair. Compare to shojo where lavender carries info AND is half the primary story; in sakura, ' +
        'lavender is supporting, the green is the second lead.',
    },
  ],
  antiSignatures: [
    'Lavender `#a78bfa` carrying half the palette (that is the shojo sister; sakura uses green as the second lead)',
    'Saturated magenta `#ec4899` primary (also shojo; sakura softens to blossom-pink `#f9a8d4`)',
    'Soft gaussian drop shadows — every cel-shaded palette uses `shadowStyle: hard`',
    'A transparent or zero-width outline (defeats the cel-frame affordance)',
    'Condensed grotesque display like Archivo Black uppercased (that is the shonen sister)',
  ],
  tokenEvidence: [
    {
      path: 'effect.outline.color',
      note: '`#0a0a0a` ink — identical to every cel-shaded sibling.',
    },
    {
      path: 'effect.outline.width',
      note: '`3px` — the shared cel outline weight.',
    },
    {
      path: 'effect.shadowStyle',
      note: '`hard` — the engine recipe; two-tone offset block shadows.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#f9a8d4` blossom-pink — the softer petal-tone that distinguishes sakura from shojo magenta `#ec4899`.',
    },
    {
      path: 'effect.focusRing.color',
      note: '`#65a30d` matcha-green — the complementary spring leaf that pairs with the blossom-pink primary.',
    },
    {
      path: 'color.surface.base',
      note: '`#fff7f8` warm petal-white — distinguishes sakura from shojo blush `#fff5f9` (warmer / slightly pinker).',
    },
    {
      path: 'color.intent.info.bg',
      note: '`#a5b4fc` pale lavender — supporting third color, not the second lead the way it is in shojo.',
    },
    {
      path: 'typography.family.display',
      note: 'Poppins / Quicksand / Comfortaa stack at weight 700 — one step lighter than shojo, sentence-case.',
    },
  ],
  lookalikes: [
    {
      against: 'cel-shaded-shojo',
      differentiator:
        'Shojo runs pink + lavender on blush `#fff5f9` (the dream-sequence pair) with magenta `#ec4899` primary at weight 800 Poppins. Sakura (this palette) runs softer blossom-pink `#f9a8d4` + matcha green `#65a30d` (the seasonal complementary pair) on warm petal-white `#fff7f8` with weight-700 Poppins. Engine identical; color story is romance-pair vs. seasonal-pair.',
    },
    {
      against: 'cel-shaded-kawaii',
      differentiator:
        'Kawaii is the broad candy-pastel set — pink, mint, sky, AND lemon on mint-white. Sakura (this palette) is the narrow seasonal pair — blossom-pink and matcha-green on petal-white. Kawaii is sticker-book; sakura is hanami.',
    },
    {
      against: 'soft-pastel',
      differentiator:
        'Soft Pastel is a flat-engine pastel — soft drop shadows, no ink outline, gentle borders. Sakura (this palette) is the cel-shaded engine — 3px ink outline plus offset block shadow on every surface. Same color softness, opposite engine grammar.',
    },
    {
      against: 'risograph',
      differentiator:
        'Risograph shares the pastel-on-cream feel but paints misregistration offsets, paper-grain texture, and limited-ink overprints via its own engine signals. Sakura (this palette) paints a single crisp ink outline and a single hard offset shadow per surface — no grain, no misregistration.',
    },
  ],
  thrivesWith: [
    'Cards, Modals, Drawers, Toasts — the canonical cel-shaded surfaces in the spring register',
    'Buttons, Toggles, Checkboxes — pink fill + ink outline + matcha focus ring reads as a friendly seasonal control',
    'EmptyState / Onboarding — weight-700 Poppins at display size reads as a spring-issue magazine title',
    'Tabs / Pagination — the pink/green pair gives selected vs. unselected a clean seasonal split',
  ],
  degradesWith: [
    'Tables with dense rows — same per-row outline-density problem as the rest of the family',
    'DiffView with character-level highlight — outlines overlap chunk highlights and read busy',
    'Financial dashboards / serious data screens — the petal palette reads as not-clinical by construction',
  ],
  recallAliases: ['cel-shaded sakura', 'cel shaded sakura', 'sakura', 'cherry blossom', 'hanami', 'spring anime', 'cel-shaded', 'cel shaded', 'anime'],
}
