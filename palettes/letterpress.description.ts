import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'letterpress',
  tagline:
    'Metal type pressed into rag paper — debossed `intent.*.bg` fills via paired inset shadows, five letterpress inks as the intent vocabulary, Caslon serif throughout.',
  summary:
    'Letterpress is the "impression into paper" register on the Flat engine. Cream rag paper fills `surface.base`; ' +
    'raised surfaces sit above the page as fresh sheets, but `intent.*.bg` fills are *debossed* — paired inset + ' +
    'tight drop shadows in `elevation.*` that read as metal type pushing ink into the rag-paper fibers. The five ' +
    'intents pick up the five historical letterpress inks: press-ink black (primary), press-room red (danger), ' +
    'bottle green (success), mustard ochre (warning), and ink-blue (info). Caslon carries display + body so the ' +
    'editorial warmth lives in the serif body.',
  origin:
    'The American letterpress shop, c.1850–1950 — Vandercook proof presses and Heidelberg platens setting metal ' +
    'or wood type into cream rag paper. The "debossed" feel is the actual physical impression of type into damp ' +
    'paper at print pressure. Caslon (William Caslon I, 1722) is the historical workhorse face every shop owned ' +
    'in a chase. The colour vocabulary maps directly to the ink colours a one- to two-pass shop produced.',
  signatures: [
    {
      label: 'Debossed `intent.*.bg` fills via paired inset + drop shadows',
      detail:
        '`elevation.low` is `inset 0 1px 2px rgba(26, 24, 20, 0.16), 0 1px 2px rgba(26, 24, 20, 0.10)`. The inset reads as ink pushed into the page; the drop is the sheet\'s thickness against the desk. `medium` and `high` deepen both halves together so the deboss reads progressively. Inverts the Neumorphism trick (which combines inset + outset for a single soft bump) toward "pressed into paper" instead.',
    },
    {
      label: 'Five letterpress inks as the intent vocabulary',
      detail:
        '`intent.primary` is press ink-black (`#1a1814`), `danger` is press-room red (`#9a1f1f`), `success` is bottle green (`#1f5538`), `warning` is mustard ochre (`#9c6a14`), `info` is ink-blue (`#1f3a6a`). Every intent stays at letterpress saturation — no candy-bright digital versions.',
    },
    {
      label: 'Caslon serif on `display` AND `body`',
      detail:
        '`typography.family.display` and the `body` role both route to Caslon. The single-family editorial warmth contrasts the multi-family typography moves in Modern Royal and Art Deco — Letterpress is one historical face throughout, the way a real shop in 1880 set every page from one cabinet.',
    },
    {
      label: 'Zero-radius card corners',
      detail:
        '`radius.sm` and `radius.md` collapse to `\'0\'`; `lg` is `\'2px\'`. Letterpress type was set in straight metal forme; rounded card corners would betray the historical reference.',
    },
  ],
  antiSignatures: [
    'Outset-only `elevation.*` (the inset is the debossed-ink cue)',
    'Pure-white `surface.base` (cream rag paper is the field colour)',
    'A sans-serif `family.body` — that breaks the single-face editorial discipline',
    'Saturated digital intents (press-room red ≠ `#ff0000`)',
  ],
  tokenEvidence: [
    { path: 'elevation.low.boxShadow', note: '`inset 0 1px 2px rgba(26, 24, 20, 0.16), 0 1px 2px rgba(26, 24, 20, 0.10)` — paired inset + drop reading as deboss.' },
    { path: 'color.intent.primary.bg', note: 'Press ink-black `#1a1814` — the default monochrome ink colour.' },
    { path: 'color.intent.danger.bg', note: 'Press-room red `#9a1f1f` — the second-pass alternate ink colour.' },
    { path: 'typography.family.display', note: 'Caslon — the historical letterpress workhorse face.' },
    { path: 'radius.sm', note: '`\'0\'` — letterpress type was set in straight metal forme.' },
  ],
  lookalikes: [
    {
      against: 'editorial',
      differentiator:
        'Editorial is the warm-paper magazine register: serif display + sans body, restrained terracotta accent, soft drop shadows. Letterpress is the print-shop register: serif throughout (display + body both Caslon), five-ink intent vocabulary, debossed `intent.*.bg` fills. Same Flat engine, opposite elevation philosophy.',
    },
    {
      against: 'newspaper',
      differentiator:
        'Newspaper is the broadsheet-density register: narrow-column serif, stop-the-presses red accent, classified-ad density. Letterpress is the print-shop register: lower density, debossed fills, five-ink intent vocabulary. Both serif, but Newspaper uses condensed body (Crimson at narrow column) and Letterpress uses display-weight Caslon throughout.',
    },
    {
      against: 'neumorphism',
      differentiator:
        'Neumorphism combines inset + outset shadows for the cautionary single-surface "soft bump" register that contrast-fails on purpose. Letterpress also combines inset + outset shadows but at much lower alpha, tinted toward ink-black instead of monochrome grey, and applied to `intent.*.bg` fills (not surface containers) — the deboss is the affordance, not the surface.',
    },
  ],
  thrivesWith: [
    'Editorial long-form prose (Caslon body on cream paper is the historical reading register)',
    'Subdued primary buttons + secondary buttons in the five-ink palette',
    'Book covers, certificate / receipt mockups, and any UI that reads as printed-not-displayed',
  ],
  degradesWith: [
    'Dense data tables (the cream + serif slows scanning vs a mono / sans register)',
    'Saturated photographic imagery (the warm cream + ink palette doesn\'t carry vivid colour cleanly)',
  ],
  recallAliases: ['letterpress', 'metal type', 'press', 'caslon', 'debossed'],
}
