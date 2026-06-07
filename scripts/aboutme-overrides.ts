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
  'src/howitworks/HowItWorksPage.tsx': {
    file: 'Page shell for the AST explorer: chrome, motion, and nav controls around the graph.',
    members: {
      HowItWorksPage: 'Renders the "how it works" page and its palette-aware chrome around the AST graph.',
    },
  },
  'src/howitworks/AstGraph.tsx': {
    file: 'Interactive React Flow viewer for the generated AST graph.',
    members: {
      AstGraph: 'The AST graph viewer: search, expand/collapse, auto-layout, and palette-themed nodes.',
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
