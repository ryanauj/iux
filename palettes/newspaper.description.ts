import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'newspaper',
  tagline:
    'Broadsheet register on the flat engine — serif body in a dense `0.9375rem / 1.4` column rhythm, heavy `900`-weight Playfair / Bodoni headlines, newsprint cream-grey paper, a single stop-the-presses red accent.',
  summary:
    'Newspaper / Broadsheet is the Editorial register tuned for classifieds-and-front-page density. ' +
    '`typography.family.ui` is `Georgia, "Charter", "Times New Roman", "Liberation Serif", serif` — body and ' +
    'chrome share the same family as the headlines, so a single column reads as one continuous voice. `display` ' +
    'keeps Playfair Display / Bodoni Moda at `weight 900 / tracking -0.03em` for stacked-deck front-page ' +
    'headlines, while `body` drops to `0.9375rem / lineHeight 1.4` — narrow-column rhythm, not magazine setting. ' +
    '`space.*` tightens one notch below Flat / Classic at the small end (`1: 3px`, `2: 6px`, `3: 10px`) so dense ' +
    'lists, classifieds, and stock tables pack the way print does. The single saturated accent is a stop-the-' +
    'presses red `#a01818`, with a cool link blue `#1c3e7a` as the only second saturated colour.',
  origin:
    'The American and British broadsheet tradition (NYT, WSJ, FT, The Times, The Telegraph) — the stacked-deck ' +
    'front-page headline, the narrow body column with hard column rules, and the small-caps section labels of mid-' +
    'century daily newspapers. Bodoni and Didone display faces paired with transitional serif body (Charter, ' +
    'Times) define the typographic voice the palette quotes.',
  signatures: [
    {
      label: 'Serif body — `family.ui` is Georgia / Charter, not sans',
      detail:
        '`typography.family.ui` resolves to `Georgia, "Charter", "Times New Roman", "Liberation Serif", serif`. Body, label, caption — every UI role wears serif. The choice puts running copy in the same family as the headlines so a column reads as a single voice, the way a broadsheet does.',
    },
    {
      label: 'Heavy `900`-weight display with negative tracking',
      detail:
        '`role.display` is `4rem / weight 900 / tracking -0.03em / lineHeight 1.0`. `role.title` is `weight 800 / tracking -0.02em`. Playfair Display / Bodoni Moda at black weight with tight tracking is the front-page stacked-deck headline cue — heavier than Editorial\'s `700` display weight.',
    },
    {
      label: 'Dense `body` setting (`0.9375rem / lineHeight 1.4`)',
      detail:
        'Body sits at `0.9375rem` with `lineHeight 1.4` — narrow-column rhythm. Editorial sits at `1.0625rem / 1.65` (magazine breathing room) and Academic at `1.0625rem / 1.7` (journal long-form). Newspaper packs tighter than both.',
    },
    {
      label: 'Cream-grey newsprint surface (`#e8e3d6`) with stop-the-presses red',
      detail:
        '`surface.base` is `#e8e3d6` — newsprint cream-grey, dirtier than Editorial\'s `#f7f1e3` paper cream. The single saturated accent is `#a01818` (a deep, slightly-brick red, not pillarbox) carrying `intent.primary` and `border.focus`. Link blue `#1c3e7a` stays cool so the red remains unique on the page.',
    },
    {
      label: 'Tight low-end `space.*` for classifieds density',
      detail:
        '`space.1: \'3px\'`, `space.2: \'6px\'`, `space.3: \'10px\'` — one notch tighter than Flat / Classic at every step. Dense lists, financial tables, and small-print classifieds pack the way print does. The high end (`8: \'64px\'`) stays normal so masthead and section breaks still have room.',
    },
    {
      label: 'Hard `0 0 0 1px` `overlay` stroke, zero shadow elsewhere',
      detail:
        '`elevation.flat` / `low` / `medium` / `high` are all `boxShadow: \'none\'`. Only `overlay` carries `0 0 0 1px rgba(14, 13, 9, 0.45)` — a printed-frame stroke, the way a boxed callout in a newspaper is framed. No soft drop shadows anywhere.',
    },
  ],
  antiSignatures: [
    'A sans-serif `family.ui` — broadsheet body is structurally serif',
    'A `display` weight lighter than `800` — the heavy stacked-deck headline is the front-page cue',
    'A loose `body.lineHeight` above ~1.5 — defeats the narrow-column rhythm',
    'A second saturated red or warm-hue accent competing with the stop-the-presses red',
    'Soft drop shadows on any elevation slot',
  ],
  tokenEvidence: [
    {
      path: 'typography.family.ui',
      note: '`Georgia, "Charter", "Times New Roman", ...` — serif on the UI family slot. The structural move.',
    },
    {
      path: 'typography.role.display.weight',
      note: '`900` — heavier than Editorial\'s `700` and Wikipedia\'s `400`. The stacked-deck headline.',
    },
    {
      path: 'typography.role.body.size',
      note: '`0.9375rem` — denser than Editorial\'s `1.0625rem`.',
    },
    {
      path: 'typography.role.body.lineHeight',
      note: '`1.4` — narrow-column rhythm. Editorial sits at `1.65`, Academic at `1.7`.',
    },
    {
      path: 'color.surface.base',
      note: '`#e8e3d6` — newsprint cream-grey, dirtier than Editorial\'s paper-cream `#f7f1e3`.',
    },
    {
      path: 'color.intent.primary.bg',
      note: 'Stop-the-presses red `#a01818` — the only fully-saturated colour. Reused at `border.focus`.',
    },
    {
      path: 'space.1',
      note: '`3px` — one notch tighter than Flat / Classic\'s `4px` for classifieds density.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: '`0 0 0 1px rgba(14, 13, 9, 0.45)` — a printed-frame stroke, not a soft drop shadow.',
    },
  ],
  lookalikes: [
    {
      against: 'editorial',
      differentiator:
        'Editorial is the magazine-spread sibling — sans body in `Inter`, wider `space.*`, lighter `700`-weight display, warm paper-cream `#f7f1e3` with a terracotta accent. Newspaper is the broadsheet sibling — serif body in `Georgia`, tighter low-end `space.*`, heavier `900`-weight display, dirtier newsprint cream-grey with a stop-the-presses red.',
    },
    {
      against: 'academic',
      differentiator:
        'Academic is the LaTeX-journal sibling — Computer Modern serif on every role, body at `1.0625rem / 1.7` for long-form reading, wide `space.*` at the high end for figure gutters, restrained academic-blue accent on warm off-white. Newspaper packs body to `0.9375rem / 1.4` and shouts with a `900`-weight headline and a saturated red.',
    },
    {
      against: 'letterpress',
      differentiator:
        'Letterpress engages the print engine for ink-bleed and paper-texture effects. Newspaper stays on the pure flat engine — the cream-grey is a colour value, not a texture, and there is no `paperEdge*` or overlay imagery. The print-feel comes from typography and density, not from simulated print artefacts.',
    },
    {
      against: 'wikipedia',
      differentiator:
        'Wikipedia is the institutional-reference sibling — sans body, white surfaces, MediaWiki link-blue `#3366cc`, `400`-weight serif display. Newspaper is the chromatic-and-typographic-shout sibling — serif body, newsprint cream-grey, stop-the-presses red, `900`-weight Bodoni display.',
    },
  ],
  thrivesWith: [
    'News article pages with stacked-deck headlines, byline / dateline cards, and pull-quotes',
    'Classifieds, financial tables, and listings where the tight `space.*` packs density',
    'Long opinion essays — the serif body and narrow-column rhythm are the form',
  ],
  degradesWith: [
    'Marketing CTAs needing a soft, premium hover — the palette refuses drop shadows and rounded radii',
    'Modern brand systems wanting more than one saturated accent',
    'Mobile reading at small widths — body at `0.9375rem / 1.4` wants a narrow column, not a phone-screen full width',
  ],
  recallAliases: ['newspaper', 'broadsheet', 'newsprint', 'front page', 'classifieds', 'nyt'],
}
