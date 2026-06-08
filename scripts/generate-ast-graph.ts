/**
 * AST graph generator — the deterministic source for the "How it works"
 * visualization.
 *
 * Walks every authored source file under `src/`, parses it with the
 * TypeScript syntactic parser (no type-checking needed — we only read
 * structure), and emits a graph of:
 *
 *   - areas    — the top-level directory under `src/` each file lives in
 *   - files    — every file as a parent node, with its top-level members
 *                (components, functions, classes, consts, types…)
 *   - imports  — file → file edges, resolved from relative import/export
 *                specifiers (npm + tokens/palettes imports are counted as
 *                "external" but don't become edges, keeping the graph
 *                scoped to authored UI source). Each edge also records the
 *                target's named members the source pulls in (`members`), so a
 *                method/class/type is a selectable endpoint, not just its file.
 *
 * The output is deterministic: every collection is sorted by a stable
 * key and no timestamps are written, so the committed JSON only changes
 * when the code's structure does. Run via `pnpm run gen:ast-graph`
 * (wired into `build` so deploys always ship a fresh graph).
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as ts from 'typescript'
import type {
  AstArea,
  AstFile,
  AstGraph,
  AstImport,
  AstMember,
  MemberKind,
} from '../src/howitworks/generated/astGraph.types'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'src')
const OUT = path.join(SRC, 'howitworks', 'generated', 'ast-graph.json')

const SOURCE_EXTS = ['.ts', '.tsx']

/** Files we skip: tests, stories, ambient declarations. */
function isExcluded(rel: string): boolean {
  return (
    rel.endsWith('.d.ts') ||
    rel.includes('.test.') ||
    rel.includes('.stories.') ||
    rel.includes('/__tests__/') ||
    rel.includes('/__fixtures__/')
  )
}

/** Repo-relative id with forward slashes. */
function toId(abs: string): string {
  return path.relative(ROOT, abs).split(path.sep).join('/')
}

function* walk(dir: string): Generator<string> {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(abs)
    } else if (entry.isFile() && SOURCE_EXTS.includes(path.extname(entry.name))) {
      yield abs
    }
  }
}

function collectFiles(): string[] {
  const out: string[] = []
  for (const abs of walk(SRC)) {
    const rel = toId(abs)
    if (!isExcluded(rel)) out.push(abs)
  }
  return out.sort((a, b) => toId(a).localeCompare(toId(b)))
}

/** Top-level segment under `src/` — the cluster key. Root files → `(root)`. */
function areaOf(rel: string): string {
  const parts = rel.split('/') // ['src', 'components', 'Button', 'Button.tsx']
  return parts.length > 2 ? parts[1] : '(root)'
}

/** Directory relative to `src/`, e.g. `components/Button` (root → `(root)`). */
function dirOf(rel: string): string {
  const dir = rel.split('/').slice(1, -1).join('/')
  return dir === '' ? '(root)' : dir
}

function isExported(node: ts.Node): boolean {
  const flags = ts.getCombinedModifierFlags(node as ts.Declaration)
  return (flags & ts.ModifierFlags.Export) !== 0 || (flags & ts.ModifierFlags.Default) !== 0
}

function isFunctionLike(init: ts.Expression | undefined): boolean {
  return !!init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))
}

function isPascalCase(name: string): boolean {
  return /^[A-Z]/.test(name)
}

/**
 * Pull the plain-English summary out of `ABOUTME:` comment lines. Works for
 * both line comments (`// ABOUTME: …`) and block comments (`* ABOUTME: …`),
 * joining multiple lines into one sentence. Returns undefined when none of
 * the ranges carry an `ABOUTME:` marker.
 */
function aboutFromRanges(text: string, ranges: ts.CommentRange[] | undefined): string | undefined {
  if (!ranges || ranges.length === 0) return undefined
  const out: string[] = []
  for (const r of ranges) {
    for (const rawLine of text.slice(r.pos, r.end).split(/\r?\n/)) {
      // Require the marker at the start of the comment line (after any `//`,
      // `/*`, or `*` prefix) so prose that merely mentions the token — e.g.
      // a JSDoc sentence about the `ABOUTME` convention — is never captured.
      const m = rawLine.replace(/^\s*(?:\/\/+|\/?\*+)\s*/, '').match(/^ABOUTME:\s?(.*)$/)
      if (!m) continue
      const cleaned = m[1].replace(/\*\/\s*$/, '').trim()
      if (cleaned) out.push(cleaned)
    }
  }
  return out.length ? out.join(' ') : undefined
}

/**
 * The file header `ABOUTME:` comment(s): the contiguous run of `ABOUTME:`
 * lines at the very top of the file. The run stops at the first comment that
 * isn't an `ABOUTME:` line or that sits across a blank-line gap, so a first
 * declaration's own comment is never mistaken for the file summary.
 */
function fileHeaderRanges(sf: ts.SourceFile, text: string): ts.CommentRange[] {
  const ranges = ts.getLeadingCommentRanges(text, 0) ?? []
  const run: ts.CommentRange[] = []
  let prevEndLine = -1
  for (const r of ranges) {
    if (!/ABOUTME:/.test(text.slice(r.pos, r.end))) break
    const startLine = sf.getLineAndCharacterOfPosition(r.pos).line
    if (run.length > 0 && startLine - prevEndLine > 1) break
    run.push(r)
    prevEndLine = sf.getLineAndCharacterOfPosition(r.end).line
  }
  return run
}

/** Extract every top-level declaration as a member, with its `ABOUTME:` line. */
function extractMembers(sf: ts.SourceFile, text: string): AstMember[] {
  const members: AstMember[] = []
  const lineOf = (node: ts.Node) => sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1

  // The file header summary belongs to the file, not to its first
  // declaration — track its ranges so a member never reuses them.
  const headerPos = new Set(fileHeaderRanges(sf, text).map(r => r.pos))

  // The `ABOUTME:` comment in a declaration's leading trivia describes that
  // member. The file header is excluded, so the first declaration never
  // borrows the file's own summary.
  const aboutFor = (stmt: ts.Node): string | undefined => {
    const ranges = ts.getLeadingCommentRanges(text, stmt.getFullStart())
    if (!ranges) return undefined
    for (let i = ranges.length - 1; i >= 0; i--) {
      const r = ranges[i]
      if (headerPos.has(r.pos)) continue
      const about = aboutFromRanges(text, [r])
      if (about) return about
    }
    return undefined
  }

  const push = (name: string, kind: MemberKind, exported: boolean, line: number, about?: string) => {
    if (!name) return
    const member: AstMember = { name, kind, exported, line }
    if (about) member.about = about
    members.push(member)
  }

  for (const stmt of sf.statements) {
    if (ts.isFunctionDeclaration(stmt) && stmt.name) {
      const name = stmt.name.text
      push(name, isPascalCase(name) ? 'component' : 'function', isExported(stmt), lineOf(stmt), aboutFor(stmt))
    } else if (ts.isClassDeclaration(stmt) && stmt.name) {
      push(stmt.name.text, 'class', isExported(stmt), lineOf(stmt), aboutFor(stmt))
    } else if (ts.isInterfaceDeclaration(stmt)) {
      push(stmt.name.text, 'interface', isExported(stmt), lineOf(stmt), aboutFor(stmt))
    } else if (ts.isTypeAliasDeclaration(stmt)) {
      push(stmt.name.text, 'type', isExported(stmt), lineOf(stmt), aboutFor(stmt))
    } else if (ts.isEnumDeclaration(stmt)) {
      push(stmt.name.text, 'enum', isExported(stmt), lineOf(stmt), aboutFor(stmt))
    } else if (ts.isVariableStatement(stmt)) {
      const exported = isExported(stmt)
      const about = aboutFor(stmt)
      for (const decl of stmt.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue
        const name = decl.name.text
        const fn = isFunctionLike(decl.initializer)
        const kind: MemberKind = fn ? (isPascalCase(name) ? 'component' : 'function') : 'const'
        push(name, kind, exported, lineOf(decl), about)
      }
    }
  }

  members.sort((a, b) => a.line - b.line || a.name.localeCompare(b.name))
  return members
}

/** One import/export statement: the module specifier and the member names it
 * pulls in by name (`import { a, b as c }` → `['a', 'b']`, using the *imported*
 * name, not the local alias). `named` is empty for default, namespace, bare
 * side-effect, and wildcard (`export *`) imports. */
interface RawImport {
  spec: string
  named: string[]
}

/** Collect each import/export module specifier and its named bindings. */
function collectImports(sf: ts.SourceFile): RawImport[] {
  const out: RawImport[] = []
  for (const stmt of sf.statements) {
    if (ts.isImportDeclaration(stmt) && stmt.moduleSpecifier && ts.isStringLiteral(stmt.moduleSpecifier)) {
      const named: string[] = []
      const bindings = stmt.importClause?.namedBindings
      // Only `{ … }` named imports name members; `* as ns` and a default
      // binding don't pin a specific exported member, so they add no edge.
      if (bindings && ts.isNamedImports(bindings)) {
        for (const el of bindings.elements) named.push((el.propertyName ?? el.name).text)
      }
      out.push({ spec: stmt.moduleSpecifier.text, named })
    } else if (ts.isExportDeclaration(stmt) && stmt.moduleSpecifier && ts.isStringLiteral(stmt.moduleSpecifier)) {
      const named: string[] = []
      // `export { a, b as c } from '…'` re-exports named members; `export *`
      // has no clause and names none.
      if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        for (const el of stmt.exportClause.elements) named.push((el.propertyName ?? el.name).text)
      }
      out.push({ spec: stmt.moduleSpecifier.text, named })
    }
  }
  return out
}

/** Resolve a relative specifier to a known file id, or null if external. */
function resolveSpecifier(fromAbs: string, spec: string, known: Set<string>): string | null {
  if (!spec.startsWith('.')) return null // npm / tokens / palettes → external
  const base = path.dirname(fromAbs)
  const target = path.normalize(path.join(base, spec))
  const candidates = [
    ...SOURCE_EXTS.map(ext => target + ext),
    ...SOURCE_EXTS.map(ext => path.join(target, 'index' + ext)),
    target, // already has an extension
  ]
  for (const cand of candidates) {
    const id = toId(cand)
    if (known.has(id)) return id
  }
  return null
}

function generate(): AstGraph {
  const absFiles = collectFiles()
  const ids = absFiles.map(toId)
  const known = new Set(ids)

  const files: AstFile[] = []
  // Per "source target" pair, the union of member names the source imports from
  // the target — resolved against the target's real exported members in a
  // second pass (a target may be parsed after the source that imports it).
  const edgeMembers = new Map<string, Set<string>>()
  // Every resolved import statement, kept for that second pass.
  const pending: { source: string; target: string; named: string[] }[] = []
  // Per file, the names it actually exports — the only members another file may
  // legitimately name in an import edge.
  const exportedNames = new Map<string, Set<string>>()

  for (const abs of absFiles) {
    const id = toId(abs)
    const source = fs.readFileSync(abs, 'utf8')
    const sf = ts.createSourceFile(abs, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

    const members = extractMembers(sf, source)
    exportedNames.set(id, new Set(members.filter(m => m.exported).map(m => m.name)))
    const about = aboutFromRanges(source, fileHeaderRanges(sf, source))
    const imports = collectImports(sf)
    let importCount = 0
    let externalCount = 0
    for (const imp of imports) {
      const resolved = resolveSpecifier(abs, imp.spec, known)
      if (resolved && resolved !== id) {
        importCount++
        pending.push({ source: id, target: resolved, named: imp.named })
      } else if (!resolved) {
        externalCount++
      }
    }

    const file: AstFile = {
      id,
      area: areaOf(id),
      dir: dirOf(id),
      name: path.basename(id),
      loc: source.split(/\r?\n/).length,
      importCount,
      externalCount,
      members,
    }
    if (about) file.about = about
    files.push(file)
  }

  // Second pass: keep only named bindings that resolve to a real exported
  // member of the target, so every member edge points at a selectable node.
  // Seeding a key for every resolved pair (even one that names no member) lets
  // bare/namespace/default imports keep their file edge.
  for (const e of pending) {
    const exported = exportedNames.get(e.target)
    if (!exported) continue
    const key = `${e.source} ${e.target}`
    let set = edgeMembers.get(key)
    if (!set) {
      set = new Set<string>()
      edgeMembers.set(key, set)
    }
    for (const name of e.named) if (exported.has(name)) set.add(name)
  }

  // Areas, derived from files.
  const areaMap = new Map<string, AstArea>()
  for (const f of files) {
    const a = areaMap.get(f.area) ?? { id: f.area, label: f.area, fileCount: 0, memberCount: 0 }
    a.fileCount++
    a.memberCount += f.members.length
    areaMap.set(f.area, a)
  }
  const areas = [...areaMap.values()].sort((a, b) => a.id.localeCompare(b.id))

  const imports: AstImport[] = [...edgeMembers.entries()]
    .map(([key, set]) => {
      const [source, target] = key.split(' ')
      return { source, target, members: [...set].sort((a, b) => a.localeCompare(b)) }
    })
    .sort((a, b) => a.source.localeCompare(b.source) || a.target.localeCompare(b.target))

  const memberTotal = files.reduce((n, f) => n + f.members.length, 0)
  const documentedFiles = files.reduce((n, f) => n + (f.about ? 1 : 0), 0)
  const documentedMembers = files.reduce(
    (n, f) => n + f.members.reduce((m, x) => m + (x.about ? 1 : 0), 0),
    0,
  )

  const memberEdges = imports.reduce((n, imp) => n + imp.members.length, 0)

  return {
    schemaVersion: 2,
    stats: {
      areas: areas.length,
      files: files.length,
      members: memberTotal,
      imports: imports.length,
      memberEdges,
      documentedFiles,
      documentedMembers,
    },
    areas,
    files,
    imports,
  }
}

function main(): void {
  const graph = generate()
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(graph, null, 2) + '\n', 'utf8')
  const { stats } = graph
  console.log(
    `gen:ast-graph → ${path.relative(ROOT, OUT)} · ` +
      `${stats.areas} areas, ${stats.files} files, ${stats.members} members, ${stats.imports} imports (${stats.memberEdges} member links) · ` +
      `aboutme: ${stats.documentedFiles}/${stats.files} files, ${stats.documentedMembers}/${stats.members} members`,
  )
}

const invokedDirectly = !!process.argv[1] && path.resolve(process.argv[1]) === __filename
if (invokedDirectly) {
  main()
}

export { generate }
