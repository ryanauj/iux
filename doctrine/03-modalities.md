# Modalities

The same intent reached three ways: by clicking, by typing into the command palette, by talking to the natural-language input bar. The doctrine is *intent parity*: every action exists on all three surfaces, and no surface owns state.

## Hard rules

1. **Intent parity.** Every action reachable through visual click-through is also reachable through `Command palette` and through `Natural-language input bar` (see [`FINALIZED-COMPONENTS.md`](../FINALIZED-COMPONENTS.md)). And vice versa: the palette and the NL bar do not host orphan actions the visual UI cannot reach.
2. **Modalities are projections; state has one source of truth.** A change committed through the NL bar appears immediately in the visual UI and the palette. No modality "owns" the state; all three read the same Store keys (see [`PERSISTENCE-CONTRACT.md`](../PERSISTENCE-CONTRACT.md)).
3. **Every modality previews before destructive commit.** Visual: `Optimistic action with undo` toast (Tier 3). Palette: inline confirmation step (`Command palette` rung 3). NL: structured-chip preview before commit (`Natural-language input bar` rung 2).
4. **The agentic palette (Tier 3 rung 4) executes a sequence only after the user has seen and accepted the sequence.** Auto-execute without preview is the failure mode that defines the rule.
5. **Not every action gets a third modality.** Rare actions and irreversible actions stay visual-first; promotion to palette/NL is justified per action, not blanket.

## The three modalities

### Visual navigation

- Best at: **discoverability**. The user does not need to know the action's name to find it; the interface shows what is possible.
- Best for: first-time users, exploratory tasks, spatial intuition (drag, position, nested structure).
- Failure mode: hiding common actions behind three menus to "keep the UI clean." Visual UIs that need a guide are visual UIs that failed.

### Command palette (Cmd+K)

- Best at: **speed for known-action users**. The cost of exposing one more action is one more row in a fuzzy list; the cost is approximately zero.
- Best for: keyboard-first users, repeated workflows, multi-step actions that compose (`Command palette` rung 3).
- Failure mode: a palette that lists actions the visual UI doesn't surface. Orphan actions in the palette mean the visual UI is incomplete.

### Natural-language input

- Best at: **intent when the user cannot name the action**. "Move my Tuesday meetings to next week" works without the user knowing whether that is one action or many.
- Best for: composition (multiple actions in one intent), disambiguation flows (`Natural-language input bar` rung 4), users who arrive with a goal but not a vocabulary.
- Failure mode: NL that executes without showing the parse. The user must see the structured-chip preview (`Natural-language input bar` rung 2) and be able to edit it before commit.

## State sync between modalities

One Store key, three readers. The agentic palette and the NL bar do not write to a separate "agent state" partition; they write through the same commit pipeline as the visual UI.

Consequence: any modality's commit fires the same notifications, the same undo entry, the same persistence write. The undo timer started by a drag is the same undo timer the user sees if they delete the same card via NL.

## Confirmation patterns per modality

- **Visual destructive.** Optimistic action runs; `Toast` (4) with countdown and Undo. The user can leave the surface — the toast tray (`Optimistic action with undo` rung 3) keeps the reversal reachable.
- **Palette destructive.** Multi-step palette confirm (`Command palette` rung 3): pick action → pick target → confirm → run. The confirm step is inline; do not bounce to a Modal.
- **NL destructive.** Structured-chip preview before commit. Each chip is editable; commit is explicit. The agentic palette (rung 4) previews the *whole sequence* before any step runs.

## When NOT to add a modality

A modality is not free. Each action exposed in the palette or the NL bar must be maintained, named, kept in sync. Skip the third modality when:

- The action is **rare** and the visual path is fine. Adding it to the palette pollutes the fuzzy filter for the actions that matter.
- The action is **destructive without easy reversal** and not common enough to warrant a palette/NL surface. (If common, expose it *with* the confirmation pattern above.)
- The action is **spatially primary** (e.g., drag-to-reorder). Expose it in the palette as "move card X above card Y" only if the user can plausibly want to do it without seeing the board.

## Decision rule — does this action need three modalities?

Promote an action from visual-only to all three modalities when at least two of these hold:

- The action is **frequently repeated** by power users.
- The action is **composable** — it joins other actions naturally in a sequence.
- The action's **target is namable** without spatial reference ("close the modal" — yes; "drag this card here" — no).

## Counterexamples

- **NL bar that hides destructive actions behind a parse.** "Delete all of John's tasks" runs without preview; the user typed an ambiguous "John" and erases the wrong one. The structured-chip preview rule exists to make this impossible.
- **Command palette with orphan actions.** Actions in the palette that the visual UI cannot reach by clicking. Either promote the action into the visual UI or remove it from the palette — orphan actions mean the modalities are out of parity.
- **Agentic palette executing without preview.** The user types "tidy up my board" and the palette runs eight commits before the user sees them. Rung 4 must show the sequence and allow per-step edit before running.
- **Visual UI that needs the palette to be usable.** If common actions live in the palette only, keyboard-first users get the app and everyone else gets a degraded version. Visual-first means visual-complete.
- **State partitioning between modalities.** "Agent mode" tracks a separate copy of the document. The moment the agent and the visual UI diverge, the user has two truths. There is one truth.

## Cross-links

- [`FINALIZED-COMPONENTS.md`](../FINALIZED-COMPONENTS.md) — `Command palette`, `Natural-language input bar`, and `Optimistic action with undo` rung definitions.
- [`PERSISTENCE-CONTRACT.md`](../PERSISTENCE-CONTRACT.md) — Store interface; the single source of truth all three modalities project from.
- [`FINALIZED-APPS.md`](../FINALIZED-APPS.md) — optimistic-undo in a spatial app (Task board).

## What this doc is not

- Not a guide to building an LLM agent. Tool schemas, model selection, and parsing are implementation details that follow the doctrine — they don't define it.
- Not a list of which actions in each app get all three modalities. That belongs in each app's spec.
- Not a polemic for or against agentic UIs. The doctrine is about parity and preview; the modality choice is per-action.
- Not a re-statement of `Command palette` or `Natural-language input bar` rung definitions. Those live in [`FINALIZED-COMPONENTS.md`](../FINALIZED-COMPONENTS.md).
