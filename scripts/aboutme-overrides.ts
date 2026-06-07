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
  // import edges), and four views read it. The Graph is a React Flow network;
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
      AstImport: 'One resolved file→file import edge (deduplicated, no self-edges) — the graph\'s connective tissue.',
      AstGraph: 'The whole graph: schema version, headline stats, and the areas/files/imports collections every view walks.',
    },
  },
  'src/howitworks/astViews.ts': {
    file: 'Shared, build-once indexes over the graph that the three vertical views (Outline, Focus, Matrix) all read from.',
    members: {
      GRAPH: 'The generated graph JSON typed as AstGraph — the single dataset every index and view here derives from.',
      FILE_BY_ID: 'Lookup from a file\'s repo-relative id to its AstFile record.',
      fileLabel: 'The basename a file is shown as (e.g. Button.tsx), falling back to the id\'s last segment.',
      FILES_BY_AREA: 'Files grouped by their top-level area in the graph\'s stable order — the spine of the Outline tree.',
      IMPORTS_OF: 'Per file, the ids it imports (its outgoing dependencies), built once from the import edges.',
      IMPORTED_BY: 'Per file, the ids that import it (its incoming dependents), built once from the import edges.',
      importsOf: 'The files a file depends on — backs the Outline\'s "Imports" chips and Focus\'s "Depends on" cards.',
      importedBy: 'The files that depend on a file — backs the Outline\'s "Imported by" chips and Focus\'s "Used by" cards.',
      AreaLink: 'One directed area→area dependency: how many file links cross it, and the exact file pairs behind them.',
      AREA_MATRIX: 'The area→area dependency matrix the Matrix view renders, keyed [from][to].',
      AREA_MATRIX_MAX: 'The largest single area→area count, used to scale the Matrix\'s heat shading.',
      fileMatches: 'Whether a file matches a free-text query across its name, dir, summary, and member names — the search predicate shared by every view.',
      MOST_CONNECTED_FILE: 'The most-connected file; the Focus view starts here so the first screen is the busiest hub.',
    },
  },
  'src/howitworks/AstGraph.tsx': {
    file: 'The AST explorer\'s view switcher plus its interactive React Flow graph; Outline/Focus/Matrix live in their own files.',
    members: {
      AstGraph: 'The AST viewer shell: a tablist that switches between the Graph, Outline, Focus, and Matrix views (defaulting to Outline on narrow screens).',
    },
  },
  'src/howitworks/AstOutline.tsx': {
    file: 'Outline view: the whole graph as an indented, vertically-scrolling disclosure list, built for mobile.',
    members: {
      AstOutline: 'Renders areas → files → members as a nested list; each open file lists its members plus tappable Imports / Imported-by chips (from astViews) that jump to the linked file.',
    },
  },
  'src/howitworks/AstFocus.tsx': {
    file: 'Focus view: one file at a time, flanked by its dependency neighbours as tappable cards.',
    members: {
      AstFocus: 'Shows a single file\'s summary and members between "Depends on" / "Used by" neighbour cards (from importsOf / importedBy); tapping a card walks the import graph one hop at a time, with back history.',
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
      FileNodeData: 'Data carried by a file node, including its members and expand state.',
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
      FileNode: 'Renders a file node with its name, English summary, badges, and members.',
      astNodeTypes: 'Maps node-type keys to their renderer components for React Flow.',
      MEMBER_KIND_ORDER: 'Display order for member kinds in the legend.',
      memberKindColor: 'Returns the token-based colour for a member kind.',
      memberKindGlyph: 'Returns the single-character glyph for a member kind.',
    },
  },
}
