import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'studio-confetti',
  tagline:
    'Playful design-studio register on the Flat engine — warm off-white field sprinkled with saturated rose / amber / grass / sky / violet across the full intent set, soft shadows, generous round corners, and Poppins display.',
  summary:
    'Studio Confetti is the multi-hue playful configuration of the Flat engine. Where Paper Pop commits to one cobalt ' +
    'accent, Confetti leans into a full saturated intent set: rose primary (`#e11d48`), grass success (`#16a34a`), amber ' +
    'warning (`#d97706`), red danger (`#dc2626`), cobalt info (`#2563eb`). The field stays quiet — warm off-white ' +
    '`#fdfcf9` with stone neutrals (`#1c1917 / #44403c / #78716c / #a8a29e`) — so the brights register as accents, not as ' +
    'chrome. Saturated fills carry white text; the neutral fill carries dark ink. Poppins (geometric humanist) handles ' +
    'display; Inter handles body. Radii are generous (`sm 8px / md 14px / lg 22px`) and elevations stay soft.',
  origin:
    'The post-2020 "design-studio website" register — small product teams and creative-studio portfolios that pair a ' +
    'warm cream ground with a confetti palette of bright accents (Mailchimp\'s rebrand, design-agency landing pages, ' +
    'kids\' education products). The lineage runs through Memphis-80s playfulness but trades the geometric pattern ' +
    'overlays for restrained chrome with a saturated intent set.',
  signatures: [
    {
      label: 'Full saturated multi-hue intent set (rose / grass / amber / red / cobalt)',
      detail:
        '`intent.primary.bg` is rose `#e11d48`; `success` is grass `#16a34a`; `warning` is amber `#d97706`; `danger` is red ' +
        '`#dc2626`; `info` is cobalt `#2563eb`. Every accent is full saturation — the confetti vocabulary is the move. ' +
        'Paper Pop runs the secondaries at desaturated 700; Confetti runs them at full strength.',
    },
    {
      label: 'Warm off-white `surface.base` (`#fdfcf9`) with stone neutrals',
      detail:
        '`surface.base` is warm off-white `#fdfcf9` (not pure white, not cream-pink); `surface.raised` lifts to pure ' +
        '`#ffffff`; `surface.sunken` drops to warm `#f4f2ec`. Neutrals are the stone family (`#1c1917 / #44403c / #78716c / ' +
        '#a8a29e`) — warm grey, not cool. The warm field keeps the confetti accents from clashing.',
    },
    {
      label: 'Generous round radius (`sm 8px / md 14px / lg 22px`)',
      detail:
        '`radius.lg = 22px` is the most generous of the playful-light cohort — Paper Pop stops at `12px`, Soft Pastel at ' +
        '`20px`. The round corners read as "design studio" rather than as "enterprise app". Sharp Confetti would read as ' +
        'a flag-day data viz; round Confetti reads as deliberate playfulness.',
    },
    {
      label: 'Poppins geometric humanist on `display` (not Inter, not a serif)',
      detail:
        '`typography.family.display` is `"Poppins", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. Poppins ' +
        'is the slightly-rounded geometric humanist that the design-studio register favours — friendlier than Inter, less ' +
        'fussy than a serif. `family.ui` stays Inter for control legibility.',
    },
    {
      label: 'Rose-pink focus ring (`#e11d48`) doubles as `content.link`',
      detail:
        '`effect.focusRing.color` is `#e11d48` — the rose primary reused at focus and `content.link`. The link colour ' +
        'commits to rose rather than to a separate blue, reinforcing the brand voice. Hover and active states cascade through ' +
        'the same rose family.',
    },
  ],
  antiSignatures: [
    'A single-accent restraint — that\'s Paper Pop; Confetti commits to the full saturated intent set',
    'A serif `display` family — Poppins geometric humanist is the register-defining face',
    'A cream-pink or pastel ground — Confetti uses warm off-white, not warm-pink',
    'Desaturated secondary intents (deep green / deep amber) — Confetti runs them at full strength',
    'Sharp corners (`radius.lg ≤ 12px`) — generous radii are load-bearing for the studio register',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#fdfcf9` — warm off-white. Paper Pop runs pure `#ffffff`; Soft Pastel runs cream-pink `#fcf7f6`.',
    },
    {
      path: 'color.intent.primary.bg',
      note: '`#e11d48` — rose primary at full saturation. Reused at `content.link` and `effect.focusRing.color`.',
    },
    {
      path: 'color.intent.success.bg',
      note: '`#16a34a` — grass at full saturation; Paper Pop runs the desaturated `#15803d` 700 variant.',
    },
    {
      path: 'color.intent.warning.bg',
      note: '`#d97706` — amber at full saturation; Paper Pop runs the desaturated `#b45309`.',
    },
    {
      path: 'color.intent.info.bg',
      note: '`#2563eb` — cobalt at the info slot (not primary). Confetti reserves rose for primary and routes cobalt to info.',
    },
    {
      path: 'color.content.muted',
      note: '`#78716c` — stone-500 (warm grey), not neutral-500. Keeps the warm field cohesive.',
    },
    {
      path: 'typography.family.display',
      note: '`"Poppins", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` — Poppins geometric humanist on display.',
    },
    {
      path: 'radius.lg',
      note: '`22px` — generous corners; most generous of the playful-light cohort.',
    },
    {
      path: 'effect.focusRing.color',
      note: '`#e11d48` — the rose primary reused at focus.',
    },
  ],
  lookalikes: [
    {
      against: 'paper-pop',
      differentiator:
        'Paper Pop and Studio Confetti share the playful-light Flat-engine vocabulary, but Paper Pop runs a single cobalt ' +
        'accent on pure-white with desaturated secondary intents and Inter at every role. Confetti runs the full ' +
        'saturated intent set (rose / grass / amber / red / cobalt) on warm off-white with Poppins on display. One-accent ' +
        'restraint vs many-accent confetti — the load-bearing distinction.',
    },
    {
      against: 'soft-pastel',
      differentiator:
        'Soft Pastel runs the desaturated pastel cohort (rose `#c25e8e`, peach `#f3c074`, mint `#3d8c5e`) on cream-pink with ' +
        'Fraunces serif. Studio Confetti runs full-saturation accents (rose `#e11d48`, amber `#d97706`, grass `#16a34a`) on ' +
        'warm off-white with Poppins geometric humanist. Pastel-saturated friendly vs full-saturation playful.',
    },
    {
      against: 'memphis-80s',
      differentiator:
        'Memphis-80s commits to geometric pattern overlays (squiggles, grids, confetti shapes) painted via ' +
        '`effect.overlay.image` plus a saturated intent set. Studio Confetti has no overlay — `effect.overlay.image: none` ' +
        '— and gets its playfulness purely from the saturated intent set on a quiet warm field. Restrained chrome, ' +
        'load-bearing intents.',
    },
    {
      against: 'material',
      differentiator:
        'Material is the Roboto-friendly Flat configuration with a single accent and the Material 24-step elevation model. ' +
        'Studio Confetti commits to the multi-hue confetti palette and the design-studio Poppins/Inter pairing rather ' +
        'than the productivity-app single-accent register.',
    },
  ],
  thrivesWith: [
    'Design-studio portfolio sites and small-product landing pages — the confetti intent set reads as creative',
    'Education and kids products — friendly Poppins display + round corners + saturated accents',
    'Dashboards with co-equal status colours — Confetti hands every intent the same saturation weight',
  ],
  degradesWith: [
    'Editorial long-form — Poppins display fights long reading sessions',
    'Brands committed to enterprise voice — confetti accents read as casual',
    'Dense data tables — generous radii and saturated intents fight density legibility',
  ],
  recallAliases: ['studio confetti', 'confetti', 'design studio', 'studio playful', 'mailchimp-style', 'playful flat'],
}
