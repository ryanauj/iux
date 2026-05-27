import type { StyleDescription } from '../tokens/style-description.contract'

export const description: StyleDescription = {
  paletteId: 'terminal-tui',
  tagline:
    "The character grid IS the layout system — layout snaps to `1ch` × `1lh` cells, raised surfaces render their borders as box-drawing glyphs (`┌─┐│└─┘`), everything is monospace, and `effect.borderStyle = 'character'` is the load-bearing engine signal.",
  summary:
    'Terminal / TUI is the only palette on the `terminal-tui` engine. The contract addition is three slots — ' +
    "`effect.gridUnitX = '1ch'`, `effect.gridUnitY = '1lh'`, and `effect.borderStyle = 'character'`. Components " +
    'with character rendering (Card, Modal, Table) ship hidden corner-glyph spans (`┌` `┐` `└` `┘`) and reveal ' +
    "them under a `@container palette style(--border-style: character)` query while CSS line strokes carry " +
    "the four edges. `surface.*` is monochrome near-black; `content.primary` is warm near-white `#e8e6e3`. " +
    "Semantic-color content (red `#ff6b6b`, amber `#ffd23f`, green `#51cf66`, blue `#74c0fc`) is reserved for " +
    'text that carries meaning; every other slot stays monochrome. Every typography family slot aliases to the ' +
    'same Iosevka Term / JetBrains Mono / IBM Plex Mono stack. `radius.*` is all `0` and motion is linear ' +
    '(`0`/`40`/`80`/`140ms`) — terminals snap, they don\'t ease.',
  origin:
    'Text-mode terminal applications — the VT100 (1978) lineage, ncurses, dialog(1), htop, taskwarrior-tui, gitui, ' +
    'k9s. Character-cell layouts where box-drawing glyphs are the chrome and color encodes status. The Unicode ' +
    'box-drawing block (U+2500–U+257F) is the visual vocabulary. This palette is the engine-level revival ' +
    'rendered in a browser — character cells expressed as `1ch` × `1lh` and corner glyphs as real spans.',
  signatures: [
    {
      label: "`effect.borderStyle = 'character'` (box-drawing glyphs as borders)",
      detail:
        'The load-bearing engine signal. Card, Modal, and Table ship four hidden corner-glyph spans (`┌` `┐` `└` `┘`); under ' +
        "the `@container palette style(--border-style: character)` query the spans become visible and the CSS border-color " +
        "drops to transparent. Horizontal `─` and vertical `│` glyphs render as 1px lines in any modern monospace, so the " +
        'four CSS edges align pixel-for-pixel with the four corner characters. Every other palette returns `\'css\'`.',
    },
    {
      label: "Layout pinned to character cells (`gridUnitX: 1ch`, `gridUnitY: 1lh`)",
      detail:
        '`effect.gridUnitX = \'1ch\'` and `effect.gridUnitY = \'1lh\'`. The engine block reads these to align padding and ' +
        'corner-glyph positions. `space.*` is itself expressed in `ch` (`space.2 = 1ch`, `space.4 = 2ch`, `space.6 = 4ch`) ' +
        'so components composing through the spacing scale land on the cell grid by construction. Every other palette ' +
        "returns `'0'`, collapsing any engine multiply-by-grid rule to a no-op.",
    },
    {
      label: 'Monospace at every family slot (Iosevka Term / IBM Plex Mono / JetBrains Mono)',
      detail:
        '`typography.family.ui` / `display` / `mono` / `pixel` / `hand` all resolve to the same stack: `"Iosevka Term", ' +
        '"JetBrains Mono", "IBM Plex Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace`. ' +
        'The font choice is load-bearing — every character-grid alignment claim depends on the active family being a ' +
        'monospace.',
    },
    {
      label: 'Monochrome fills + semantic-color text (color encodes state, fill stays neutral)',
      detail:
        "Every `intent.*.bg` collapses to a low-alpha tint of the semantic color (`rgba(116,192,252,0.10)` for primary, " +
        '`rgba(81,207,102,0.10)` for success). The `intent.*.border` and `intent.*.content` carry the semantic color (red ' +
        '`#ff6b6b`, amber `#ffd23f`, green `#51cf66`, blue `#74c0fc`). This is the TUI rule from htop / dialog(1): color ' +
        'encodes status, the panel itself stays monochrome.',
    },
    {
      label: 'Zero radius and zero elevation across the board',
      detail:
        "`radius.*` is all `'0'` (terminal applications don't round corners). `elevation.*` is `boxShadow: none` at every " +
        'rung — depth comes from box-drawing borders, not from cast shadow. Compare to every other engine: at minimum ' +
        '`elevation.low` carries some kind of stroke or shadow recipe.',
    },
    {
      label: 'Linear snap motion (`0/40/80/140ms`, every easing `linear`)',
      detail:
        '`motion.duration` is `0/40/80/140ms`; `motion.easing.standard` / `in` / `out` / `inOut` / `spring` all resolve to ' +
        '`linear`. No spring overshoot, no eased curve — terminals snap. Every other palette ships at least one cubic-bezier ' +
        'easing slot.',
    },
  ],
  antiSignatures: [
    "CSS borders that anti-alias their corners — TUI corners are real `┌┐└┘` glyphs",
    "A proportional sans (Inter, Segoe UI, Roboto) on body — monospace is load-bearing",
    "Any non-zero `radius.*` — terminal applications don't round corners",
    "Drop shadows on `elevation.*` — every elevation slot is `boxShadow: none`",
    "Spring or eased motion curves — TUI motion is linear, snap-fast",
    "Full saturated fills on intents — every intent fill collapses to a 10% alpha tint of its semantic color",
  ],
  tokenEvidence: [
    {
      path: 'effect.borderStyle',
      note: "`'character'` — the most load-bearing contract addition since Aurora's `effect.surfaceBy`. Every other palette returns `'css'`.",
    },
    {
      path: 'effect.gridUnitX',
      note: "`'1ch'` — pins horizontal layout to one character cell. Every other palette returns `'0'`.",
    },
    {
      path: 'effect.gridUnitY',
      note: "`'1lh'` — pins vertical layout to one line-height cell. Every other palette returns `'0'`.",
    },
    {
      path: 'typography.family.mono',
      note: 'Iosevka Term / JetBrains Mono / IBM Plex Mono stack — also aliased into `ui`, `display`, `pixel`, `hand`.',
    },
    {
      path: 'space.2',
      note: "`'1ch'` — the spacing scale is expressed in character cells, not pixels.",
    },
    {
      path: 'radius.lg',
      note: "`'0'` — every radius slot is zero. Terminal applications don't round corners.",
    },
    {
      path: 'elevation.low.boxShadow',
      note: "`'none'` — depth comes from box-drawing borders, not from cast shadow. Every elevation rung is `'none'`.",
    },
    {
      path: 'motion.easing.standard',
      note: "`'linear'` — every easing slot is `'linear'`. Terminals snap, they don't ease.",
    },
  ],
  lookalikes: [
    {
      against: 'crt-phosphor-green',
      differentiator:
        'CRT/Phosphor (Green) is the engine-level tube SIMULATION — scanline overlay (`effect.overlay.image`), phosphor ' +
        "bloom (`effect.glow`), and a `motion.decay = 80ms` regime, with every slot collapsed to one P1-green phosphor " +
        'color. Terminal-TUI does no decoration at all — no scanline, no glow, no decay, no monochrome collapse. The ' +
        "load-bearing TUI signals are `effect.borderStyle = 'character'` and `gridUnitX/Y = '1ch'/'1lh'`, which CRT does " +
        'not declare.',
    },
    {
      against: 'crt-phosphor-amber',
      differentiator:
        'Same separation as the green sister: amber CRT paints scanlines, glow, and decay on the `crt-phosphor` engine. ' +
        'Terminal-TUI is the functional terminal — no scanline, no glow, character-grid layout, and a four-color ' +
        'semantic palette (red / amber / green / blue) instead of a single phosphor.',
    },
    {
      against: 'pixel-art-nes',
      differentiator:
        "Pixel-art-NES pins layout to `effect.pixelGrid` (an 8-bit pixel multiple) and runs bitmap fonts. Terminal-TUI " +
        "pins layout to `effect.gridUnitX/Y` ('1ch' / '1lh' — character cells, not pixels) and runs scalable monospaces. " +
        "Pixel-art is the 8-bit console aesthetic; TUI is the text-mode terminal aesthetic.",
    },
  ],
  thrivesWith: [
    'Card, Modal, Table — the three components that received character rendering this session; cards read as ASCII boxes',
    'Note outliner — indentation is character-grid-native (`1ch` per level) and bullets land on cell boundaries',
    'Task board — kanban cards rendered as ASCII boxes match how `taskwarrior-tui` / `gitui` draw their column panels',
    'Button, Toggle, Checkbox — `[ Save ]`, `[x]` / `[ ]`, bracketed-label conventions read as TUI-native',
  ],
  degradesWith: [
    'Diagram / flow canvas — fractional-pixel positions and curved bezier edges fight the character grid; the engine paints a graceful "TUI is not supported" message instead of force-rendering broken ASCII art',
    'Bezier editor — same reason: sub-pixel control points and anti-aliased curves are pixel-medium affordances',
    'Settings playground — token names crowd at the narrow space scale; workable, not delightful',
    'Habit / streak heat-maps — intensity gradient collapses to "filled vs not" because the monochrome rule reserves color for meaning',
  ],
  recallAliases: ['terminal', 'tui', 'terminal-tui', 'terminal / tui', 'ncurses', 'box-drawing', 'character grid', 'ascii ui'],
}
