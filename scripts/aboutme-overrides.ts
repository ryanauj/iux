// ABOUTME: Hand-authored ABOUTME summaries for the files and exported members
// ABOUTME: where a structural guess would read poorly; consumed by apply-aboutme.

/**
 * Curated `ABOUTME:` text, keyed by repo-relative file id (forward slashes).
 *
 * `apply-aboutme.ts` prefers these entries over its structural synthesis, so
 * the most load-bearing files get real prose. Anything absent here still
 * gets a concise machine-derived summary — this map only needs to cover the
 * places where that fallback would be unhelpful.
 */
export interface FileOverride {
  /** One-line summary for the file header. */
  file?: string
  /** Per-member summaries, keyed by the exported declaration's name. */
  members?: Record<string, string>
}

export const ABOUTME_OVERRIDES: Record<string, FileOverride> = {
  'src/App.tsx': {
    file: 'Top-level router — maps every hash/route to its page surface.',
    members: {
      App: 'The application root: wires routes to their page components.',
    },
  },
  'src/main.tsx': {
    file: 'Browser entry point — mounts the React app into the DOM.',
  },

  // ── How it works (the AST explorer this feature is built around) ────────
  //
  // The explorer renders the codebase as data: `generate-ast-graph.ts` parses
  // `src/` into `ast-graph.json` (areas → files → members, plus file→file
  // import edges that also record the named members each import pulls in, so a
  // method/class/type is a selectable node), and four views read it. The Graph
  // is a React Flow network;
  // Outline, Focus, and Matrix are vertical, pan-free presentations of the
  // SAME data, all built on the shared indexes in `astViews.ts`. Keep these
  // summaries in step with what each view actually shows and which index it
  // reads — they are surfaced verbatim on the page.
  'src/howitworks/HowItWorksPage.tsx': {
    file: 'Page shell for the AST explorer: palette/motion/nav chrome, the lede with live graph stats, and the lazy-loaded graph.',
    members: {
      HowItWorksPage: 'Renders the "how it works" page: palette-aware chrome, the headline stats lede, and the lazily-loaded AstGraph.',
    },
  },
  'src/howitworks/astGraph.types.ts': {
    file: 'The shared data contract for the build-time AST graph — the one shape the generator writes and every view reads.',
    members: {
      MemberKind: 'The seven kinds of top-level declaration (component, function, class, const, type, interface, enum); drives each member\'s glyph and colour.',
      AstMember: 'One top-level declaration: its name, kind, exported flag, source line, and lifted ABOUTME summary.',
      AstFile: 'One source file as a parent node: id, area, dir, line count, internal/external import counts, ABOUTME summary, and its members.',
      AstArea: 'One top-level src/ directory cluster, with rolled-up file and member counts.',
      AstImport: 'One resolved file→file import edge (deduplicated, no self-edges) plus the target\'s named members the source imports, so a method/class/type is a selectable endpoint.',
      AstGraph: 'The whole graph: schema version, headline stats (including member-link count), and the areas/files/imports collections every view walks.',
    },
  },
  'src/howitworks/astViews.ts': {
    file: 'Shared, build-once indexes over the graph — including the member-node helpers and member-level import maps — that the vertical views (Outline, Focus, Matrix) all read from.',
    members: {
      GRAPH: 'The generated graph JSON typed as AstGraph — the single dataset every index and view here derives from.',
      FILE_BY_ID: 'Lookup from a file\'s repo-relative id to its AstFile record.',
      fileLabel: 'The basename a file is shown as (e.g. Button.tsx), falling back to the id\'s last segment.',
      FILES_BY_AREA: 'Files grouped by their top-level area in the graph\'s stable order — the spine of the Outline tree.',
      IMPORTS_OF: 'Per file, the ids it imports (its outgoing dependencies), built once from the import edges.',
      IMPORTED_BY: 'Per file, the ids that import it (its incoming dependents), built once from the import edges.',
      importsOf: 'The files a file depends on — backs the Outline\'s "Imports" chips and Focus\'s "Depends on" cards.',
      importedBy: 'The files that depend on a file — backs the Outline\'s "Imported by" chips and Focus\'s "Used by" cards.',
      memberNodeId: 'The node id for a member: its file id and member name joined by `#` (e.g. src/foo.ts#bar).',
      isMemberNode: 'Whether a node id points at a member (contains `#`) rather than a whole file.',
      ParsedNode: 'A node id split into its file id and (for member nodes) member name.',
      parseNodeId: 'Splits a node id into its file id and optional member name.',
      MEMBER_BY_ID: 'Every member keyed by its node id, paired with the file it lives in.',
      nodeLabel: 'The short label for any node — the member name for a member, else the file basename.',
      nodeExists: 'Whether a node id resolves to a real file or member in the graph.',
      MemberDepGroup: 'One file\'s outgoing member dependencies on a single target file.',
      IMPORT_MEMBERS_OF: 'Per file, the named members it imports, grouped by the target file they live in.',
      importMembersOf: 'The members a file imports, grouped by target file — backs Focus\'s "Depends on" member chips.',
      MEMBER_IMPORTED_BY: 'Per member node id, the file ids that import that member by name (its incoming dependents).',
      importersOfMember: 'The files that import a given member by name — backs the member\'s "Used by" / "Imported by" lists.',
      NodeMatch: 'One search hit: a file, or a member within a file (with its owning file).',
      searchNodes: 'Searches files and members by name/dir/summary, ranked best-match first — the member-aware search behind Focus\'s jump box.',
      AreaLink: 'One directed area→area dependency: how many file links cross it, and the exact file pairs behind them.',
      AREA_MATRIX: 'The area→area dependency matrix the Matrix view renders, keyed [from][to].',
      AREA_MATRIX_MAX: 'The largest single area→area count, used to scale the Matrix\'s heat shading.',
      fileMatches: 'Whether a file matches a free-text query across its name, dir, summary, and member names — the search predicate shared by every view.',
      MOST_CONNECTED_FILE: 'The most-connected file; the fallback start for Focus when there is no entry point.',
      DEFAULT_FOCUS_FILE: 'The file Focus opens on — the app entry point src/main.tsx when present (so every breadcrumb trail starts at boot), else the most-connected file.',
    },
  },
  'src/howitworks/AstGraph.tsx': {
    file: 'The AST explorer\'s view switcher plus its interactive React Flow graph; Focus/Flows/Outline/Matrix live in their own files.',
    members: {
      AstGraph: 'The AST viewer shell: a tablist defaulting to Focus that switches between the Focus, Flows, Graph, Outline, and Matrix views; owns the Focus breadcrumb trail so a saved flow can be replayed in Focus.',
    },
  },
  'src/howitworks/AstOutline.tsx': {
    file: 'Outline view: the whole graph as an indented, vertically-scrolling disclosure list, built for mobile.',
    members: {
      AstOutline: 'Renders areas → files → members as a nested list; each open file lists its members (each revealing the files that import it) plus tappable Imports / Imported-by chips (from astViews) that jump to the linked file.',
    },
  },
  'src/howitworks/AstFocus.tsx': {
    file: 'Focus view: one file or member at a time, flanked by its dependency neighbours as tappable cards and member chips, with the walked path kept as saveable breadcrumbs.',
    members: {
      AstFocus: 'Shows a single focused file or member flanked by "Depends on" / "Used by" neighbours; "Depends on" cards drill into the exact methods/classes/types imported and a focused member\'s "Used by" lists the files that import it. Tapping any card or chip extends a breadcrumb trail you can backtrack and save as a flow.',
      AstFocusProps: 'Props for AstFocus: the controlled breadcrumb trail (file or member node ids, root first) and a callback to replace it.',
    },
  },
  'src/howitworks/AstFlows.tsx': {
    file: 'Flows view: saved Focus breadcrumb trails replayed as numbered, end-to-end walks through the import graph.',
    members: {
      AstFlows: 'Lists every saved flow from localStorage (via useFlows) and unrolls its trail into a numbered step-by-step story — each step a file or member with its kind, location, and summary; each flow can be reopened in Focus or deleted.',
      AstFlowsProps: 'Props for AstFlows: a callback that drops a saved trail back into the Focus view.',
    },
  },
  'src/howitworks/flows.ts': {
    file: 'localStorage-backed saved Focus trails ("flows") plus a useSyncExternalStore hook that keeps the Focus view and Flows section on one live list.',
    members: {
      Flow: 'One saved Focus trail: a stable id, a human name, the ordered node ids walked (files or members), and when it was saved.',
      listFlows: 'Returns the current saved flows, newest first.',
      saveFlow: 'Saves a named breadcrumb trail as a new flow and returns it; ignores trails shorter than two steps.',
      deleteFlow: 'Deletes the flow with the given id.',
      useFlows: 'React hook returning the live saved-flow list, re-rendering whenever any surface saves or deletes one.',
    },
  },
  'src/howitworks/AstMatrix.tsx': {
    file: 'Matrix view: a compact area×area dependency heat-grid that fits a phone without panning.',
    members: {
      AstMatrix: 'Renders AREA_MATRIX as a heat-grid (rows import columns, shade = link count); tapping a cell opens the exact file→file links behind it.',
    },
  },
  'src/howitworks/astGraphLayout.ts': {
    file: 'Deterministic layout engine that turns the AST graph into positioned nodes and edges.',
    members: {
      buildGraph: 'Builds positioned React Flow nodes and edges for the current expand/auto-layout state.',
      fileHeight: 'Computes a file node\'s height from its member count and expand state.',
      areaNodeId: 'Stable node id for a collapsed area cluster.',
      regionNodeId: 'Stable node id for an expanded area\'s region container.',
      fileNodeId: 'Stable node id for a file node.',
      AreaNodeData: 'Data carried by a collapsed area cluster node.',
      AreaRegionNodeData: 'Data carried by an expanded area\'s region container node.',
      FileNodeData: 'Data carried by a file node, including its members, expand state, and member-selection wiring.',
      AstNodeData: 'Union of every node kind\'s data payload.',
      AstNode: 'A React Flow node specialised to this graph\'s data.',
      AstEdge: 'A React Flow edge carrying an aggregated import weight.',
      BuildOptions: 'Inputs to buildGraph: which areas/files are open, search matches, and auto-layout.',
      BuiltGraph: 'The nodes and edges produced by buildGraph.',
    },
  },
  'src/howitworks/astGraphNodes.tsx': {
    file: 'Custom React Flow node renderers for areas, regions, and files.',
    members: {
      AreaNode: 'Renders a collapsed directory cluster node.',
      RegionNode: 'Renders the container header for an expanded area.',
      FileNode: 'Renders a file node with its name, English summary, badges, and selectable members.',
      astNodeTypes: 'Maps node-type keys to their renderer components for React Flow.',
      MEMBER_KIND_ORDER: 'Display order for member kinds in the legend.',
      memberKindColor: 'Returns the token-based colour for a member kind.',
      memberKindGlyph: 'Returns the single-character glyph for a member kind.',
    },
  },
}
