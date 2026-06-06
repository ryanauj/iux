/**
 * Shared types for the build-time AST graph.
 *
 * The data is produced by `scripts/generate-ast-graph.ts` (run via
 * `pnpm run gen:ast-graph`, wired into `build`) and emitted to
 * `ast-graph.json` next to this file. The viewer in `AstGraph.tsx`
 * reads it. Keeping the shape here means the generator and the viewer
 * type-check against one contract.
 *
 * The graph is deterministic: the generator walks `src/**` with the
 * TypeScript parser, sorts every collection by a stable key, and emits
 * no timestamps — so the committed JSON only changes when the code's
 * structure changes.
 */

/** The kind of a top-level declaration inside a file. */
export type MemberKind =
  | 'component' // PascalCase function / arrow (a React component)
  | 'function' // camelCase function / arrow
  | 'class'
  | 'const' // a non-function value binding (data)
  | 'type' // `type X = …`
  | 'interface'
  | 'enum'

/** A single top-level declaration inside a file. */
export interface AstMember {
  name: string
  kind: MemberKind
  /** Whether the declaration is exported from its file. */
  exported: boolean
  /** 1-based line of the declaration, used for stable ordering. */
  line: number
}

/** One source file — a parent node made up of its members. */
export interface AstFile {
  /** Repo-relative path with forward slashes, e.g. `src/components/Button/Button.tsx`. */
  id: string
  /** Top-level area under `src/` this file belongs to (the cluster key). */
  area: string
  /** Directory relative to `src/`, e.g. `components/Button`. */
  dir: string
  /** Basename, e.g. `Button.tsx`. */
  name: string
  /** Total line count of the file. */
  loc: number
  /** Number of imports that resolve to other files inside the graph. */
  importCount: number
  /** Number of imports that resolve outside the graph (npm, tokens, palettes). */
  externalCount: number
  members: AstMember[]
}

/** A directory cluster grouping files by their top-level `src/` segment. */
export interface AstArea {
  id: string
  label: string
  fileCount: number
  memberCount: number
}

/** A resolved file → file import edge (deduplicated, no self-edges). */
export interface AstImport {
  source: string
  target: string
}

export interface AstGraph {
  schemaVersion: number
  stats: {
    areas: number
    files: number
    members: number
    imports: number
  }
  areas: AstArea[]
  files: AstFile[]
  imports: AstImport[]
}
