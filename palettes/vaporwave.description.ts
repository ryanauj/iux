import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'vaporwave',
  tagline:
    'Flat engine, magenta/cyan dusk register — deep night-purple `#1a0b2e` base with magenta-pink raised panels, paired magenta + cyan halos on `elevation.*` standing in for a grid horizon, and a Playfair display serif + uppercase mono pairing.',
  summary:
    'Vaporwave is the magenta/cyan dusk register of the flat engine. `surface.base` is night-purple `#1a0b2e`, `surface.raised` ' +
    'is a richer `#2a1452`, and `surface.sunken` is near-black `#0d0719` — all opaque, no glass. The "grid-horizon" cue the ' +
    'aesthetic relies on is not a literal grid token but the way `elevation.*` stacks paired magenta + cyan glows so panel ' +
    'edges read as the horizon glow rather than drop shadows. Typography mixes Playfair Display serif at very large sizes ' +
    '(`display 4.5rem`, `title 3rem`) with uppercase IBM Plex Mono on `subheading` / `label` / `caption` — the magazine-cover ' +
    '+ VHS-credits pairing. Motion is dialed slow (`fast 180ms / base 320ms / slow 480ms`) for the dream-pop tempo.',
  origin:
    'The Vaporwave microgenre crystallized on Bandcamp and Tumblr around 2010-2013 (Macintosh Plus\'s *Floral Shoppe*, 2011) ' +
    'as a remix of 1980s/1990s consumer-tech imagery — mall food courts, classical busts, Windows 95 chrome, Japanese ' +
    'city-pop, sunset grids over wireframe oceans. The visual rules are tight: deep night-purple ground, saturated ' +
    'magenta + cyan, oversized serif display, VHS-tape mono credits. This palette is the period-correct revival on the flat engine.',
  signatures: [
    {
      label: 'Paired magenta + cyan glows on `elevation.*` standing in for a grid horizon',
      detail:
        '`elevation.low` is `0 0 12px rgba(244,114,182,0.20)`, `medium` is `0 0 24px rgba(244,114,182,0.30), 0 0 12px rgba(34,211,238,0.20)`, scaling to `overlay: 0 24px 60px rgba(8,4,20,0.72), 0 0 80px rgba(244,114,182,0.32), 0 0 40px rgba(34,211,238,0.22)`. No inset rim — pure outer halos in the dual-accent pair. The horizon-glow effect comes from the elevation stack, not a separate grid token.',
    },
    {
      label: 'Playfair Display serif at outsized display sizes (`display 4.5rem`, `title 3rem`)',
      detail:
        '`typography.family.display` is `"Playfair Display", "Times New Roman", Georgia, serif` — a high-contrast didone-style serif at weight 700, tracking `-0.02em`. The magazine-cover half of the pairing; Tron and Cyberpunk Neon-Noir reach for Orbitron / Rajdhani instead.',
    },
    {
      label: 'Uppercase IBM Plex Mono on `subheading` / `label` / `caption`',
      detail:
        '`typography.role.subheading.family = mono` with `tracking: 0.12em, textTransform: uppercase`; `label` and `caption` likewise on mono. The VHS-credits half of the pairing — uppercase wide-tracked mono next to oversize serif is the load-bearing typographic signature.',
    },
    {
      label: 'Deep night-purple `surface.base` `#1a0b2e` with magenta-pink `surface.raised` `#2a1452`',
      detail:
        'Not near-black, not neutral indigo — a specific saturated night-purple that reads as dusk. Cards lift to `#2a1452`, a richer purple that pulls toward magenta. Cyberpunk Neon-Noir uses near-black `#08070d` with a translucent magenta wash instead; Vaporwave commits to opaque purple.',
    },
    {
      label: 'Dual magenta/cyan border pattern — magenta on subtle/default/focus, cyan on strong',
      detail:
        '`border.subtle`/`default` are magenta rgba (`rgba(244,114,182,0.18 → 0.42)`), `border.focus` is magenta `#f472b6`, but `border.strong` flips to cyan `rgba(34,211,238,0.70)`. The same dual-accent border pattern Cyberpunk Neon-Noir uses, but on the flat engine with opaque surfaces.',
    },
    {
      label: 'Slow motion (`fast 180ms / base 320ms / slow 480ms`)',
      detail:
        'Almost double the engine default. The dream-pop tempo — every transition lingers. Tron at `fast 80ms / base 160ms / slow 280ms` is the snappy opposite end of the dark-neon spectrum.',
    },
  ],
  antiSignatures: [
    'Translucent or glass `surface.raised` — Vaporwave is the flat-engine cousin; opacity is load-bearing',
    'A geometric uppercase HUD sans like Orbitron or Rajdhani — would defeat the magazine-cover serif pairing',
    'A single accent color — Vaporwave requires magenta + cyan as a pair',
    'Inset rim or stroke on `elevation.*` — Vaporwave elevations are pure outer halos, no inset',
    'Fast snap motion (≤200ms `base`) — the slow dream-pop tempo is part of the look',
  ],
  tokenEvidence: [
    {
      path: 'color.surface.base',
      note: '`#1a0b2e` — saturated night-purple dusk ground. Cyberpunk Neon-Noir uses near-black `#08070d` with a magenta wash; Vaporwave commits to opaque purple.',
    },
    {
      path: 'color.surface.raised',
      note: '`#2a1452` — opaque magenta-pink panel, not translucent.',
    },
    {
      path: 'elevation.medium.boxShadow',
      note: '`0 0 24px rgba(244,114,182,0.30), 0 0 12px rgba(34,211,238,0.20)` — paired magenta + cyan outer halos, no inset rim. The horizon-glow signature.',
    },
    {
      path: 'elevation.overlay.boxShadow',
      note: '`0 24px 60px rgba(8,4,20,0.72), 0 0 80px rgba(244,114,182,0.32), 0 0 40px rgba(34,211,238,0.22)` — the strongest paired neon glow, plus a soft drop shadow for modal lift.',
    },
    {
      path: 'typography.family.display',
      note: 'Playfair Display serif — the magazine-cover half of the pairing. Tron and Cyberpunk Neon-Noir use geometric sans instead.',
    },
    {
      path: 'typography.role.label.family',
      note: '`mono` — uppercase IBM Plex Mono at `0.10em` tracking. The VHS-credits half of the pairing.',
    },
    {
      path: 'color.content.link',
      note: '`#22d3ee` — saturated cyan link, the second accent showing up on inline text.',
    },
    {
      path: 'motion.duration.base',
      note: '`320ms` — the dream-pop tempo. Almost double the engine default; Tron sits at `160ms` for the opposite extreme.',
    },
  ],
  lookalikes: [
    {
      against: 'cyberpunk-neon-noir',
      differentiator:
        'Cyberpunk Neon-Noir is the glassmorphism-engine cousin: near-black field, translucent magenta-cast glass `raised`, inset cyan/magenta rims on every elevation slot, glow-style focus, geometric uppercase HUD typography, tight motion. Vaporwave is the flat-engine sibling: opaque deep-purple surfaces, pure outer halos (no inset), Playfair serif display, solid-stroke focus ring, slow motion. Same magenta + cyan accent pair on different engines.',
    },
    {
      against: 'mall-goth',
      differentiator:
        'Mall Goth shares the dark + magenta palette and the millennial-mall cultural register, but flattens to satin/velvet with desaturated rose accents and no cyan counter-accent. Vaporwave requires the cyan/magenta pair and the Playfair + uppercase-mono pairing.',
    },
    {
      against: 'memphis-80s',
      differentiator:
        'Memphis-80s is the 1980s graphic-design movement — squiggle patterns, primary + pastel multicolor on near-white, geometric shapes, irreverent layout. Vaporwave is the 2010s nostalgia remix — saturated magenta + cyan on night-purple, serif display, dream-pop tempo. Era overlap, opposite ground tones and accent counts.',
    },
    {
      against: 'tron-dark-neon',
      differentiator:
        'Tron commits to a single cyan accent on the glassmorphism engine — cyan-cast glass, inset cyan stroke + outer cyan glow elevation, Orbitron HUD type, tight 80-280ms motion. Vaporwave runs paired magenta + cyan on the flat engine, with Playfair serif display and slow 180-480ms motion. Opposite engine, opposite accent count, opposite tempo.',
    },
  ],
  thrivesWith: [
    'Hero panels and marketing headers — Playfair at `display 4.5rem` over paired neon halos is what the aesthetic is for',
    'Cards floating in a sea of `surface.base` — paired magenta/cyan elevation reads as horizon glow rather than depth shadow',
    'Quotes and pull-quotes — display serif at outsized weight 700 was designed for this',
  ],
  degradesWith: [
    'Tables — `caption`-sized `content.muted` at 48% alpha against `surface.sunken #0d0719` washes below WCAG threshold, and the magenta glow on surrounding elevation draws the eye away from row content (README flags as "most likely to fail")',
    'Long muted-text passages — `content.muted` at 48% alpha drops to ~4.0:1 on `surface.base` and worse on `raised`',
    'Tight, snap-fast interactions — `motion.duration.base = 320ms` makes every transition feel deliberate; fast lists feel sluggish',
  ],
  recallAliases: ['vaporwave', 'vapor wave', 'aesthetic', 'a e s t h e t i c', 'macintosh plus', 'mall aesthetic', 'sunset grid', 'floral shoppe'],
}
