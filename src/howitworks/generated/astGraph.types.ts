// ABOUTME: Shared types for the build-time AST graph.

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
// ABOUTME: The kind of a top-level declaration inside a file.
export type MemberKind =
  | 'component' // PascalCase function / arrow (a React component)
  | 'function' // camelCase function / arrow
  | 'class'
  | 'const' // a non-function value binding (data)
  | 'type' // `type X = …`
  | 'interface'
  | 'enum'

// ABOUTME: A single top-level declaration inside a file.
/** A single top-level declaration inside a file. */
export interface AstMember {
  name: string
  kind: MemberKind
  /** Whether the declaration is exported from its file. */
  exported: boolean
  /** 1-based line of the declaration, used for stable ordering. */
  line: number
  /**
   * Plain-English summary, lifted from the member's `ABOUTME:` comment
   * (the line directly above the declaration). Absent when the member
   * carries no such comment.
   */
  about?: string
}

// ABOUTME: One source file — a parent node made up of its members.
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
  /**
   * Plain-English summary, lifted from the file's top-of-file `ABOUTME:`
   * comment. Absent when the file carries no such comment.
   */
  about?: string
  /** Total line count of the file. */
  loc: number
  /** Number of imports that resolve to other files inside the graph. */
  importCount: number
  /** Number of imports that resolve outside the graph (npm, tokens, palettes). */
  externalCount: number
  members: AstMember[]
}

// ABOUTME: A directory cluster grouping files by their top-level `src/` segment.
/** A directory cluster grouping files by their top-level `src/` segment. */
export interface AstArea {
  id: string
  label: string
  fileCount: number
  memberCount: number
}

// ABOUTME: A resolved file → file import edge (deduplicated, no self-edges), plus the named members of the target it pulls in.
/**
 * A resolved file → file import edge (deduplicated, no self-edges).
 *
 * `members` are the exported member names of `target` that `source` imports
 * **by name** (`import { foo, Bar }` / `export { baz } from …`), each one
 * matching a real exported member of the target file — so a method, class, or
 * type is a first-class, selectable endpoint, not just the file it lives in.
 * It is empty for default, namespace (`import * as ns`), bare side-effect, or
 * wildcard re-export imports that name no resolvable member; the file edge
 * still stands in those cases. Names are sorted and de-duplicated.
 */
export interface AstImport {
  source: string
  target: string
  members: string[]
}

// ABOUTME: The whole graph: schema version, headline stats, and the areas/files/imports the viewer renders.
/**
 * The root document the generator emits and the viewer reads. `stats` are
 * the headline counts shown in the page lede (including how many files and
 * members carry a lifted summary); `areas`, `files`, and `imports` are
 * the three collections every view walks.
 */
export interface AstGraph {
  schemaVersion: number
  stats: {
    areas: number
    files: number
    members: number
    imports: number
    /**
     * Total member-level links: the sum of `members.length` across every
     * import edge — i.e. how many (file imports a specific method/class/type)
     * pairs the graph resolved.
     */
    memberEdges: number
    /** Files that carry an `ABOUTME:` summary. */
    documentedFiles: number
    /** Members that carry an `ABOUTME:` summary. */
    documentedMembers: number
  }
  areas: AstArea[]
  files: AstFile[]
  imports: AstImport[]
}
