# FINALIZED-COMPONENTS

Three tiers. Tier 1 is the trusted baseline every design system ships.
Tier 2 is what modern product apps actually reach for. Tier 3 is the
reason this repo is interesting — it shows that the same token contract
also drives the interactions you usually have to hand-build.

Each component lists:

- **Purpose** — one line, what it solves.
- **Variant ladder** — 3-4 rungs from classic to cutting-edge. The
  ladder is a *functional / interactional* axis (what the component can
  do), not a visual axis. Visual variation across palettes is the
  orthogonal dimension — see `FINALIZED-PALETTES.md`. Every rung must
  render in every palette using only the contract tokens.

---

## Tier 1 — standard (the trusted baseline)

### Button
Purpose: trigger a single action.
1. Solid label-only button (`primary` / `neutral` / `danger` intents, disabled state).
2. Icon + label, loading spinner replaces icon on async, hover/active/focus states.
3. Split button: primary action on the left, dropdown of related actions on the right.
4. Async-confirm with progress fill and inline error recovery, no modal needed.

### Text input
Purpose: capture a single line of text.
1. Bare input, placeholder, focus ring.
2. Labeled input with hint text and inline error message, required indicator.
3. Affixes (prefix icon, suffix unit, clear button), masked input (phone, currency).
4. Inline validation + autocomplete suggestion that previews as ghost text and accepts on Tab.

### Select / Combobox
Purpose: pick one value from a list.
1. Native `<select>` styled to match.
2. Custom dropdown with keyboard nav, grouped options, single selection.
3. Searchable combobox with fuzzy filter and "no results" empty state.
4. Async-loading combobox with server-side search, debounce, and a creatable "+ add new" tail option.

### Toggle / Switch
Purpose: flip a binary setting that takes effect immediately.
1. Plain on/off switch with track + thumb.
2. Switch with on/off labels and explicit "saving…" microstate during async commit.
3. Switch group (two or three exclusive options) rendered as a segmented switch.
4. Three-state switch (on / off / inherit) with a visual mid-detent for the inherit position.

### Checkbox
Purpose: select zero or more items.
1. Single checkbox with label.
2. Checkbox with description text, error state, disabled state.
3. Parent/child tree with indeterminate parent state that toggles all descendants.
4. Animated draw-in check with reduced-motion fallback; multi-select keyboard range (Shift+click).

### Slider
Purpose: pick a value from a continuous range.
1. Single thumb, 0-100, value label on hover.
2. Labeled with min/max/step, tick marks, snap.
3. Range slider (dual thumb) with a connecting fill bar.
4. Curve slider: a slider whose track *is* a tiny chart of values it produces (e.g., volume curve, gamma).

### Modal / Dialog
Purpose: interrupt with a focused task that must complete before continuing.
1. Centered dialog with title, body, primary + secondary action, ESC + scrim dismiss.
2. Sectioned dialog with header / scrollable body / sticky footer actions.
3. Multi-step modal (wizard inside a dialog) with progress indicator and back/next.
4. Route-bound dialog: opening it pushes a URL, sharing the URL re-opens it, back closes it.

### Card
Purpose: group related content into a tappable unit.
1. Static info card: title, body, optional footer.
2. Media card: image / video header with overlayed metadata, hover lift.
3. Action card: card-as-button with primary action area + secondary action menu.
4. Draggable card: drag handle, drop zones, ghost preview during drag.

### Table
Purpose: present rows of structured data.
1. Static rows, header, zebra striping.
2. Sortable columns, selectable rows, row hover/active.
3. Resizable columns, sticky header + first column, column visibility menu.
4. Virtualized + editable: inline edit any cell, async save with per-cell dirty indicator, fixed memory at any row count.

### Tabs
Purpose: switch between sibling views in the same context.
1. Horizontal tab strip, active underline, keyboard arrow nav.
2. Icon + label tabs, badge counts, disabled tabs.
3. Overflowing tabs with auto-scroll + "more" menu.
4. Closable, reorderable tabs with a `+ new tab` affordance; state persists per tab.

### Toast
Purpose: ephemeral, non-blocking feedback.
1. Single toast in a corner, auto-dismiss timer, manual close.
2. Toast with leading icon and one inline action ("Undo").
3. Toast variants for `info / success / warning / danger`, severity-driven order.
4. Toast with a progress bar tied to a real async operation (upload %, queue countdown).

### Tooltip
Purpose: reveal a label or short hint on hover/focus.
1. Plain text tooltip with arrow, configurable side, hover + focus triggers, delay.
2. Tooltip with keyboard shortcut chip on the trailing edge.
3. Rich tooltip: heading, body, optional thumbnail; click-to-pin.
4. Coachmark variant: same primitive, but bound to a tour sequence (see Tier 3 Spotlight).

### Pagination
Purpose: walk through a long ordered list.
1. Numbered pages with prev/next, current highlighted, ellipsis for skipped pages.
2. Numbered with first/last jump, page size selector.
3. Cursor-based "Load more" button with item count.
4. Infinite scroll with scroll-position memory across navigation; "back to top" jump.

### Date picker
Purpose: pick one or more dates.
1. Text input that accepts a typed date.
2. Calendar popover, keyboard arrow nav, month/year jump.
3. Range picker with hover preview and presets ("Last 7 days", "This month").
4. Time-zone aware range with natural-language input ("tomorrow at 9am PT", "next Tue").

### Sidebar nav
Purpose: primary navigation surface for an app shell.
1. Static link list with active indicator.
2. Collapsible groups, icons, badge counts.
3. Resizable, collapsible-to-rail with pinned/favorite items.
4. Search-first sidebar: top input opens command-palette-style filter across all nav items + actions.

### Empty state
Purpose: communicate "there's nothing here yet" without feeling broken.
1. Centered text and subtitle.
2. With illustration and a primary CTA.
3. With a checklist of onboarding steps and links into each.
4. Generative empty state: example/preview data the user can edit in place to start their real first record.

### Loading / Skeleton
Purpose: occupy space while async content loads.
1. Centered spinner.
2. Shimmering rectangles in roughly the content's shape.
3. Per-component skeletons (table-row skeleton, card skeleton) that match the real layout exactly.
4. Optimistic placeholder: render the just-submitted record immediately in its final shape, with a subtle "syncing" microstate until the server confirms.

---

## Tier 2 — evolved (common in modern apps)

### Multi-select token field
Purpose: pick many values, displayed as removable chips.
1. Comma-separated input that converts to chips on Enter/blur.
2. Typeahead suggestions with keyboard nav, paste of comma/newline-separated lists auto-parses.
3. Grouped suggestions, max-count cap, validation per chip (invalid chips styled distinctly).
4. Token field with structured tokens (each chip can hold metadata, expand on click into a popover editor).

### Drawer / Sheet
Purpose: secondary surface that slides in from an edge.
1. Right-side drawer with backdrop, ESC and scrim dismiss.
2. Drawer with header / scrollable body / sticky footer actions; size variants (sm/md/lg).
3. Drawer with internal nav: back stack, breadcrumb, multi-step flows that don't leave the drawer.
4. Resizable bottom sheet with snap points and drag-to-dismiss physics (with reduced-motion fallback).

### Segmented control
Purpose: pick one of a small fixed set of mutually exclusive options.
1. Pill-shaped two/three-option toggle.
2. Icon + label segments, badge counts.
3. Animated indicator that slides between segments.
4. Overflowing segmented control: visible segments + "more" menu for the rest, selection from menu promotes that segment into the visible row.

### Inline-edit cell
Purpose: edit a value in place without a separate form.
1. Click to enter edit mode, Enter to commit, ESC to cancel.
2. With per-field validation and inline error.
3. Autosave with debounced commit, dirty / saving / saved microstates.
4. With revision history: hover surface a small "history" affordance that opens a diff of prior values.

### Stacked toasts
Purpose: handle many concurrent ephemeral messages without burying the user.
1. Bottom stack, newest on top, max visible cap.
2. Identical toasts collapse with a "+N" counter.
3. Severity-grouped stack: errors pin to top, info fades fastest.
4. Toast queue with action history: collapse all into a small tray that can be re-expanded.

### Bento grid cell
Purpose: a tile in a non-uniform dashboard / landing grid.
1. Static block with title and content.
2. Reflowable: cells specify min/preferred/max size and the grid arranges around them.
3. Drag-to-rearrange with snap-to-grid.
4. Resizable cells with content-aware constraints (cell declares which sizes it's legible at).

### Virtualized list
Purpose: render long lists with bounded DOM cost.
1. Fixed row height, windowed render.
2. Variable row height with measured cache.
3. Sticky section headers, jump-to-section.
4. Two-axis virtualization (rows × columns) for very wide tables / spreadsheets.

### Stepper / Wizard
Purpose: walk a user through a multi-step task with explicit progress.
1. Linear numbered steps, current highlighted, prev/next.
2. Steps with status (complete / active / error / disabled) and per-step validation.
3. Branching paths: step 3 chooses between two subsequent flows.
4. Resumable wizard: state persists to URL + storage; back/forward works browser-native.

---

## Tier 3 — useful but not commonplace (the showcase differentiators)

### Command palette
Purpose: keyboard-first action and navigation surface (Cmd+K).
1. Cmd+K opens a flat list, type to fuzzy-filter, Enter to run.
2. Grouped commands (Navigate / Create / Settings…), recent items at top, keyboard shortcuts shown trailing.
3. Multi-step actions: pick command → it asks for a target → it asks to confirm, all without leaving the palette.
4. Agentic palette: natural-language intent is interpreted into a sequence of commands previewed before running.

### Infinite / spatial canvas
Purpose: a borderless 2D workspace (Figma / Miro model), no pages.
1. Pan with drag, no zoom, fixed content.
2. Pan + zoom (trackpad pinch, ctrl+scroll), zoom-to-fit, minimap.
3. Place / move / select objects on the canvas with marquee and group selection.
4. Multi-user canvas with shared selection, remote cursors, conflict-free placement.

### Timeline scrubber
Purpose: drag a time handle; content reflects the moment.
1. Horizontal track with a draggable handle and a numeric readout.
2. Snap markers (keyframes, chapters), tick scale that adapts to zoom.
3. Multi-track timeline with per-track mute/solo and stacking.
4. Keyframe interpolation: drag a value at a moment, scrub to another moment and drag again, the curve between is editable.

### Natural-language input bar
Purpose: type intent, get a structured action.
1. Text input that produces a parsed suggestion below ("Create a task titled X due Friday").
2. Suggestion is editable as structured chips before commit.
3. On commit, executes the action and shows it in the app's normal surface (no chat history).
4. Disambiguation: when intent is ambiguous, the bar offers chip-style alternatives ("Did you mean task or event?") inline.

### Bezier / curve editor
Purpose: directly manipulate a curve by dragging control points.
1. Two anchor points + two tangent handles for a single cubic segment.
2. Multi-segment path: add anchors, smooth vs corner anchors, delete with keyboard.
3. Snap-to-grid and snap-to-other-anchor; numeric input for selected anchor.
4. Easing-curve preset library: pick `easeOutQuint` etc., edit it, save as a named curve usable elsewhere (e.g., as a motion token override).

### Property inspector panel
Purpose: non-blocking, context-aware editing of the current selection.
1. Static list of fields for the selected object.
2. Grouped sections (Layout / Type / Color), collapse state remembered.
3. Context-sensitive: fields change based on what's selected (multi-select shows shared fields + "mixed" indicator).
4. Constraint-aware: changing one field can disable or transform another (e.g., setting `auto-width` disables the width input and shows the computed value).

### Presence layer
Purpose: show who else is here and what they're doing, live.
1. Avatar pile of online users in a corner.
2. Live remote cursors with name labels, throttled position broadcast.
3. Cursor + selection: see what each user has selected, color-coded.
4. Cursor chat: press `/` while pointing to drop a transient message at the cursor that others see in place.

### Optimistic action with undo
Purpose: act now, offer reversal — replace blocking confirms.
1. Action runs immediately and a toast appears: "Deleted. Undo".
2. Undo timer is visible (countdown ring); undo restores exact prior state.
3. Action queue: many undoable actions in flight, each independently reversible until its timer expires.
4. Full revision log: every action is reversible from a history panel, not just from the toast — chronological scrub through state.

### Spotlight / coachmark overlay
Purpose: dim the page, focus attention on one element, explain it.
1. Single element highlighted with a cutout, tooltip with text + dismiss.
2. Sequence of coachmarks ("1 of 4 → next"), with skip-all.
3. Anchor-aware: if the target moves or unmounts, the coachmark repositions or advances to the next step gracefully.
4. Adaptive tour: only shows steps for features the user hasn't already used (tracked per-user), surfaces a "show me" trigger after periods of inactivity.

### Diff / merge view
Purpose: present two states of the same content side-by-side, allow accept/reject.
1. Side-by-side text diff with line highlights.
2. Inline diff (single column) with character-level highlights inside changed lines.
3. Per-chunk accept / reject controls; merged result builds incrementally.
4. Three-way merge: base + ours + theirs, with conflict resolution UI per chunk.
