# Component selection

When two primitives look like they solve the same problem, the choice is rarely "preference." This doc names the discriminating axis for each pair and the failure mode of picking wrong.

## Hard rules

1. **The catalog is [`FINALIZED-COMPONENTS.md`](../FINALIZED-COMPONENTS.md). This doc is the index of disambiguations.** Every component named below points back to its entry; read the rung counts there and pick the rung that fits, not the highest one.
2. **Pick the component that names the user's intent, not the one with the most affordances.** A `Drawer` with a `Stepper` inside is not a substitute for a `Modal` — they describe different commitments.
3. **Affordances are not free.** Each primitive on screen is a hypothesis the user must read. Two primitives that say the same thing cost more than one primitive said well.
4. **When in doubt, use the lighter primitive.** Modal is heavier than Drawer; Drawer is heavier than Popover; Popover is heavier than Tooltip. The lightest one that carries the meaning wins.

## Drawer vs Modal vs Popover

- **Modal** (rungs 1–4). Use when the task **must** complete before the user continues. Interruption is the meaning.
- **Drawer** (rungs 1–4). Use when the task is a **side journey** the user can leave halfway. Secondary, dismissable, no commitment.
- **Popover.** Local affordance attached to a trigger. Use when the content is **about the trigger** and doesn't survive the trigger going away.

Failure mode: confirming a destructive delete in a Drawer. The drawer's whole grammar says "you can leave this," which is exactly wrong for "are you sure." Use `Modal` (1) with a `danger` intent button.

## Toast vs Alert vs Banner

- **Toast** (rungs 1–4). Ephemeral; success or recoverable error; pairs with undo. Does not block the user.
- **Alert.** Surface attached to a region; persists until acknowledged or the underlying state changes. Use for **conditional, dismissable** warnings inside a flow.
- **Banner.** App-wide, persistent, top-of-page. Use for system-level state (outage, trial expiring, scheduled maintenance) the user did not cause.

Failure mode: a Toast for "your account has been suspended." Ephemeral grammar contradicts permanent state. Use a Banner.

## Tabs vs Segmented vs Radio group

- **Tabs** (rungs 1–4). Switch between **sibling views** in the same context. Each tab is a destination.
- **Segmented control** (rungs 1–4). Pick one **filter or mode** for the *same* view. The page stays; the lens changes.
- **Radio group.** Pick one option as part of **submittable form state**. The choice doesn't take effect until the form does.

Failure mode: Tabs for sort order. The view isn't a different view — it's the same data re-lensed. Use Segmented.

## Tooltip vs Popover vs Coachmark

- **Tooltip** (rungs 1–4). A label or short hint, hover/focus-triggered, dismisses when the trigger loses focus. Decorative, not load-bearing.
- **Popover.** Interactive content (a small form, a list) anchored to a trigger. Click to open, click outside to close.
- **Coachmark.** Tier 3 (`Spotlight / coachmark overlay`). One-time teaching overlay; dims everything else; explicit dismiss.

Failure mode: putting required instructions in a Tooltip. Hover-only content is invisible to keyboard and touch users. Promote to inline help text or a Coachmark.

## Stepper vs Wizard vs Multi-step Modal

- **Stepper** (rungs 1–2). Visible progress through a known sequence; the user sees all steps at once.
- **Wizard** (Stepper rungs 3–4). Branching paths, validation per step, resumable via URL + storage. Use when the flow is long enough to leave and come back to.
- **Multi-step Modal** (Modal rung 3). Short sequence inside an interruption; the user finishes or cancels in one sitting.

Failure mode: a five-step onboarding inside a Multi-step Modal. Users abandon midway and lose the work. Promote to a resumable Wizard.

## EmptyState vs Coachmark vs Tooltip (onboarding)

- **EmptyState** (rungs 1–4). The container is empty *now* and the user can act to fill it. Rung 4 (generative example data) doubles as onboarding without ceremony.
- **Coachmark.** Explicit teaching overlay, one-time, can sequence into a tour.
- **Tooltip.** Hover hint; not onboarding. Do not lean on tooltips to teach.

Failure mode: shipping a coachmark tour for an empty list when EmptyState rung 4 (generative example data the user can edit) would teach more in less attention.

## Select vs Combobox vs Command palette

- **Select** (rung 1). Short, known list; native or styled native.
- **Combobox** (rungs 2–4). Long list; fuzzy filter; async loading.
- **Command palette** (Tier 3). Pick an **action**, not a value. Verbs, not nouns.

Failure mode: a Combobox for "what do you want to do?" Comboboxes pick values; actions belong in the command palette.

## Sidebar vs Top nav vs Tabs

- **Sidebar** (rungs 1–4). Primary navigation for an app shell with **many destinations**.
- **Top nav.** Primary navigation for a marketing or short-shell site; a handful of destinations.
- **Tabs.** Sibling views inside one destination, not destinations themselves.

Failure mode: a Tabs strip across the top of an app shell with twelve tabs. Tabs are sibling-view furniture; promote to Sidebar.

## Affordance load

Two rules of thumb:

- **Per surface, one heavy primitive at a time.** A Modal containing a Drawer containing a Popover is three interruptions stacked; pick one.
- **Per row, three meaningful affordances max.** A row that ships a primary button, an icon button, a checkbox, a kebab menu, an inline-edit field, *and* a drag handle reads as noise. Cut to three; demote the rest into a kebab menu or a hover-revealed strip.

## Counterexamples from the apps

- **Kanban** (see [`FINALIZED-APPS.md`](../FINALIZED-APPS.md)) replaces a confirmation Modal with Optimistic-undo Toast (Tier 3). The lighter primitive plus a reversal beats the heavier primitive plus a confirmation — this is the discipline the doc enforces.
- **Note outliner** uses Command palette (Cmd+K) instead of a contextual right-click menu. Same actions, but reachable from the keyboard without leaving the writing flow.

## What this doc is not

- Not a re-statement of each component's purpose; that's [`FINALIZED-COMPONENTS.md`](../FINALIZED-COMPONENTS.md).
- Not an exhaustive matrix of every component pair; only the pairs that confuse implementers in practice.
- Not a11y guidance; a11y is enforced through tokens and the palette a11y tags in [`FINALIZED-PALETTES.md`](../FINALIZED-PALETTES.md).
- Not a visual-style guide; visual choices are the palette's business.
