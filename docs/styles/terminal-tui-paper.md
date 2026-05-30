# Terminal / Paper

> Daylight inversion of `terminal-tui` — same character-grid engine (`gridUnitX/Y = 1ch/1lh`, `borderStyle = character`, mono everywhere) flipped onto warm paper, reading as a terminal session printed out or a man-page rendered to a light theme.

**Engine:** `terminal-tui` · **A11y:** `experimental`

## Summary

Terminal / Paper is the Daybreak twin of `terminal-tui` on the same `terminal-tui` engine. The load-bearing engine slots are identical — `effect.borderStyle = 'character'`, `effect.gridUnitX = '1ch'`, `effect.gridUnitY = '1lh'`, every `radius.*` is `0`, every `elevation.*` is `boxShadow: none`, every `typography.family.*` aliases to the Iosevka Term / JetBrains Mono / IBM Plex Mono stack, and motion is linear (`0/40/80/140ms`). Only the colour layer flips: soft near-black `#0c0e10` → warm paper `#f7f4ec`; warm near-white `#e8e6e3` → warm near-black ink `#1f1d18`. The TUI semantic colours collapse from the bright `#ff6b6b / #ffd23f / #51cf66 / #74c0fc` tints to their DARKENED 700-level variants (`#b91c1c / #a16207 / #15803d / #1d4ed8`) so they still clear ≥ 4.5:1 against paper.

## Origin

The same text-mode terminal lineage as `terminal-tui` — VT100, ncurses, dialog(1), htop, gitui, k9s — but in its print form: a TUI session pasted into documentation, a man-page rendered to a light theme, the `script(1)` log replayed on paper. Character cells and box-drawing glyphs survive the medium change; the colour vocabulary darkens to clear AA against paper instead of black.

## Signatures

- **`effect.borderStyle = 'character'` (box-drawing glyphs as borders, carried verbatim from dark twin)** — The load-bearing engine signal is identical to the dark twin. Card, Modal, and Table ship four hidden corner-glyph spans (`┌` `┐` `└` `┘`); under the `@container palette style(--border-style: character)` query the spans become visible and the CSS border-color drops to transparent. Every other palette returns `'css'`.
- **Layout pinned to character cells (`gridUnitX: 1ch`, `gridUnitY: 1lh`, carried from dark twin)** — `effect.gridUnitX = '1ch'` and `effect.gridUnitY = '1lh'`. `space.*` is itself expressed in `ch` (`space.2 = 1ch`, `space.4 = 2ch`, `space.6 = 4ch`) so components composing through the spacing scale land on the cell grid by construction. Every other palette returns `'0'`.
- **Warm paper field (`#f7f4ec`) with warm near-black ink (`#1f1d18`)** — The Daybreak inversion. `surface.base` and `surface.raised` are both `#f7f4ec` (warm paper); `surface.sunken` is `#efe9dc`; `surface.overlay` lifts to `#fbf9f3`. `content.primary` is warm near-black `#1f1d18` — the dark twin's `#0c0e10` field colour promoted to the foreground. Just as in the dark twin, surfaces read by their box-drawing borders, not by fill differentiation.
- **Darkened 700-level semantic colours (red `#b91c1c`, amber `#a16207`, green `#15803d`, blue `#1d4ed8`)** — The dark twin's bright tints (`#ff6b6b / #ffd23f / #51cf66 / #74c0fc`) would fail AA on paper. The paper twin substitutes the darkened 700-level variants so semantic-color text clears ≥ 4.5:1 against `#f7f4ec`. The TUI rule still holds: `intent.*.bg` collapses to a faint tint, the BORDER carries the semantic colour, `intent.*.content` carries the darkened semantic ink.
- **Iosevka Term / JetBrains Mono / IBM Plex Mono at every family slot (carried verbatim)** — Identical stack to the dark twin. `typography.family.ui` / `display` / `mono` / `pixel` / `hand` all resolve to `"Iosevka Term", "JetBrains Mono", "IBM Plex Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace`.
- **Zero radius, zero elevation, linear snap motion (all carried from dark twin)** — `radius.*` all `0`. `elevation.*` all `boxShadow: none` — depth comes from box-drawing borders, not from cast shadow. `motion.duration` is `0/40/80/140ms`; every easing slot is `linear`. The functional-terminal rules survive the inversion verbatim — paper terminals snap just like tube terminals.

## Anti-signatures

- A near-black `surface.base` — that's the dark `terminal-tui` twin
- Bright `#ff6b6b / #ffd23f / #51cf66 / #74c0fc` semantic colours (those fail AA on paper; the daylight twin uses the 700-level variants)
- CSS borders with anti-aliased corners — TUI corners are real `┌┐└┘` glyphs regardless of medium
- A proportional sans on body — monospace is load-bearing on the engine
- Any non-zero `radius.*` or any non-`none` `elevation.*` — both carry over from the dark twin
- Spring or eased motion curves — terminals snap on paper too

## Token evidence

| Path | Value | Note |
|---|---|---|
| `effect.borderStyle` | `character` | `'character'` — the load-bearing engine signal, identical to the dark twin. |
| `effect.gridUnitX` | `1ch` | `'1ch'` — pins horizontal layout to one character cell, identical to the dark twin. |
| `effect.gridUnitY` | `1lh` | `'1lh'` — pins vertical layout to one line-height cell, identical to the dark twin. |
| `color.surface.base` | `#f7f4ec` | `#f7f4ec` — warm paper field. Inverts the dark twin's `#0c0e10` near-black. |
| `color.content.primary` | `#1f1d18` | `#1f1d18` — warm near-black ink. The dark twin's field colour promoted to the foreground. |
| `color.intent.danger.content` | `#b91c1c` | `#b91c1c` — the 700-level red. Dark twin uses `#ff6b6b`, which would fail AA on paper. |
| `color.intent.success.content` | `#15803d` | `#15803d` — the 700-level green. Dark twin uses `#51cf66`. |
| `typography.family.mono` | `"Iosevka Term", "JetBrains Mono", "IBM Plex Mono", "Fira Code", "SF Mono", Consolas, "Liberation Mono", ui-monospace, monospace` | Iosevka Term / JetBrains Mono / IBM Plex Mono stack — identical to the dark twin; aliased into every family slot. |
| `radius.lg` | `0` | `'0'` — every radius slot is zero, identical to the dark twin. |
| `elevation.low.boxShadow` | `none` | `'none'` — depth comes from box-drawing borders, not cast shadow; identical to the dark twin. |
| `motion.easing.standard` | `linear` | `'linear'` — every easing slot is `'linear'`; identical to the dark twin. |

## Often confused with

### vs [Terminal / TUI](./terminal-tui.md)

The dark twin. Every load-bearing engine slot is identical: `effect.borderStyle = character`, `gridUnitX/Y = 1ch/1lh`, zero radius, zero elevation, mono everywhere, linear motion. Inverts only the colour layer: near-black field → warm paper; warm near-white ink → warm near-black ink; bright semantic tints → 700-level darkened semantic inks for AA on paper.

### vs [CRT / Greenbar](./crt-phosphor-greenbar.md)

Greenbar is the daylight twin of `crt-phosphor-green` on the `crt-phosphor` engine — paints stripe bands, has a soft green focus glow, runs VT323. Terminal / Paper runs the `terminal-tui` engine — character-grid layout, box-drawing borders, no overlay, no glow, four-colour semantic palette (red / amber / green / blue). Different engines.

### vs [Wikipedia / Institutional](./wikipedia.md)

Wikipedia is a light-field reference-encyclopedia palette with serif content and CSS borders on cards. Terminal / Paper commits to the character-grid engine — box-drawing glyphs on corners, monospace on every role, zero radius, layout pinned to `1ch` × `1lh`. Different intent: encyclopedia vs terminal log.

### vs [Letterpress](./letterpress.md)

Letterpress is a paper-stock light palette that simulates pressed type with paper edges and impression depth. Terminal / Paper has no `paperEdgeColor`, no impression depth, and reads as printed terminal output (sharp box-drawing on flat paper) rather than as letterpressed printing.

## Where it thrives

- Documentation pages embedding terminal sessions — the box-drawing corners and `1ch` grid match the source medium
- Card, Modal, Table — the three components that ship corner-glyph spans render their borders as paper ASCII
- Note outliner — indentation lands on character-grid cells (`1ch` per level)
- Button, Toggle, Checkbox — `[ Save ]`, `[x]` / `[ ]` bracketed-label conventions read as TUI-native on paper

## Where it degrades

- Diagram / flow canvas — fractional-pixel positions and curved bezier edges fight the character grid (same caveat as the dark twin)
- Bezier editor — sub-pixel control points and anti-aliased curves are pixel-medium affordances
- Habit / streak heat-maps — intensity gradient collapses to "filled vs not" because the monochrome rule reserves color for meaning

## Recall aliases

`terminal paper`, `tui paper`, `terminal-tui-paper`, `tui light`, `man page`, `man-page`, `printed terminal`, `ascii ui light`

---

_Generated from `palettes/terminal-tui-paper.description.ts` — do not edit by hand. Run `pnpm run gen:style-docs` to regenerate._
