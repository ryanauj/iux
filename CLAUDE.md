# Working in this repo

## Describe every file and exported member — and keep it current

This codebase documents itself. Every source file under `src/` and every
top-level member (component, function, class, const, type, interface, enum)
carries a plain-English `ABOUTME:` summary. A build step lifts those summaries
into a graph that the **How it works** page renders, so the descriptions are
not dead comments — they are shipped UI, shown verbatim beside each name in the
Graph, Outline, Focus, and Matrix views.

**This is a standing requirement, not a one-off.** When you add, rename, move,
or change the behaviour of a file or an exported member, update its description
in the same change. A summary that no longer matches the code is a bug.

### Where the text lives

There are three layers, in priority order (this is what `apply-aboutme.ts`
picks from for each file/member):

1. **`scripts/aboutme-overrides.ts`** — hand-authored summaries, keyed by
   repo-relative file id and exported member name. This is the durable source
   of truth for load-bearing files. Add or edit entries here when a structural
   guess would read poorly. Keys must be **exported** member names; document
   non-exported internals inline instead.
2. **The declaration's own doc comment / JSDoc** — its first sentence is reused
   when there's no override.
3. **A generic structural stub** — `Name — a React component.` etc., the
   fallback when neither of the above exists. These are placeholders; replace
   them with real prose as you touch each area.

The `// ABOUTME:` line that actually appears in the source (and feeds the
graph) is the one-line summary. For anything non-trivial, also write a fuller
**JSDoc block** beneath it — the in-depth English explanation. Keep the two
consistent: the `ABOUTME:` line is the headline, the JSDoc is the detail.

### Depth bar

- State what the thing *does* and, for the views and their helpers, **how it
  works together with its collaborators** — name the index or sibling it reads
  (e.g. "backs the Outline's Imports chips and Focus's Depends-on cards").
- Follow `PROSE-STYLE.md`: plain, concrete, no expectation-reversal scaffolding.
- One information-dense sentence beats a vague long one.

### The How-it-works feature is the showcase — hold it to the highest bar

`src/howitworks/` is the feature that renders all of this, so its own
descriptions must be exemplary:

- `astGraph.types.ts` — the shared data contract every view reads.
- `astViews.ts` — the build-once indexes (`importsOf`, `importedBy`,
  `AREA_MATRIX`, `fileMatches`, …) that **Outline, Focus, and Matrix all share**.
- `AstOutline.tsx` / `AstFocus.tsx` / `AstMatrix.tsx` — three pan-free
  presentations of the *same* graph data; each description should say which
  index it reads and how it shows files "working together".
- `AstGraph.tsx` — the view-switcher shell plus the React Flow `GraphView`.

When you change any of these, update both the inline `ABOUTME:`/JSDoc and the
matching entry in `aboutme-overrides.ts` so they don't drift apart.

### Gotcha: never write the literal token `ABOUTME:` inside prose

The extractor reads any comment line that *starts* with the marker. Writing the
bare token mid-sentence in a JSDoc would otherwise be captured as the summary.
Refer to it as "the ABOUTME summary" (no colon) or "the `ABOUTME` comment".

### After editing descriptions

```sh
npx tsx scripts/apply-aboutme.ts --dry   # preview: should be 0/0/0 if consistent
pnpm run gen:ast-graph                    # regenerate the graph the page renders
pnpm run typecheck && pnpm test           # astGraph.test.ts gates the graph
```

`pnpm run gen:ast-graph` is wired into `pnpm run build`, so a fresh graph always
ships — but regenerate and commit it whenever descriptions change so the
committed JSON matches the source.

## Other checks

`pnpm run check` runs the full gate suite (typecheck, palette/description
validators, token + contrast lints, test gates, and the Vitest suite). Run it
before considering a change complete.
