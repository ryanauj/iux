// ABOUTME: One-shot maintenance tool that inserts ABOUTME comments into every
// ABOUTME: source file and exported member, idempotently, for the AST explorer.

/**
 * Adds an `ABOUTME:` summary to every authored source file under `src/` and
 * to every exported top-level member that lacks one.
 *
 * Text is chosen in this order:
 *   1. a hand-authored entry in `aboutme-overrides.ts`,
 *   2. the first sentence of an existing file/JSDoc header (reusing the
 *      author's own words), or
 *   3. a concise summary synthesised from the declaration's name and kind.
 *
 * The pass is idempotent: a file/member that already carries an `ABOUTME:`
 * line is left untouched, so re-running only fills gaps. The build step
 * (`scripts/generate-ast-graph.ts`) then lifts these comments into the graph
 * the "how it works" page renders.
 *
 * Run with `tsx scripts/apply-aboutme.ts` (add `--dry` to preview counts).
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as ts from 'typescript'
import { ABOUTME_OVERRIDES } from './aboutme-overrides'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'src')
const SOURCE_EXTS = ['.ts', '.tsx']
const DRY = process.argv.includes('--dry')

function isExcluded(rel: string): boolean {
  return (
    rel.endsWith('.d.ts') ||
    rel.includes('.test.') ||
    rel.includes('.stories.') ||
    rel.includes('/__tests__/') ||
    rel.includes('/__fixtures__/')
  )
}

function toId(abs: string): string {
  return path.relative(ROOT, abs).split(path.sep).join('/')
}

function* walk(dir: string): Generator<string> {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(abs)
    else if (entry.isFile() && SOURCE_EXTS.includes(path.extname(entry.name))) yield abs
  }
}

function isExported(node: ts.Node): boolean {
  const flags = ts.getCombinedModifierFlags(node as ts.Declaration)
  return (flags & ts.ModifierFlags.Export) !== 0 || (flags & ts.ModifierFlags.Default) !== 0
}

function isFunctionLike(init: ts.Expression | undefined): boolean {
  return !!init && (ts.isArrowFunction(init) || ts.isFunctionExpression(init))
}

const isPascal = (name: string) => /^[A-Z]/.test(name)
const isHook = (name: string) => /^use[A-Z]/.test(name)

type Kind = 'component' | 'function' | 'class' | 'const' | 'type' | 'interface' | 'enum'

interface MemberSite {
  name: string
  kind: Kind
  /** Offset to insert a new comment line above (start of leading trivia or decl). */
  insertAt: number
  /** Whether an ABOUTME already sits in this member's (non-header) leading trivia. */
  documented: boolean
}

const rangesHaveAbout = (text: string, ranges: ts.CommentRange[] | undefined): boolean =>
  !!ranges?.some(r => /ABOUTME:/.test(text.slice(r.pos, r.end)))

/** The contiguous run of `ABOUTME:` line comments at the very top of a file. */
function topAboutRun(sf: ts.SourceFile, text: string): ts.CommentRange[] {
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

/** First sentence of an existing comment block, cleaned of comment syntax. */
function firstSentence(text: string, ranges: ts.CommentRange[] | undefined): string | undefined {
  if (!ranges || ranges.length === 0) return undefined
  const body = ranges
    .map(r => text.slice(r.pos, r.end))
    .join('\n')
    .replace(/\/\*\*?|\*\/|^\s*\*\s?|^\s*\/\/\s?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!body) return undefined
  const dot = body.indexOf('. ')
  const sentence = (dot === -1 ? body : body.slice(0, dot + 1)).trim()
  if (sentence.length < 6) return undefined
  return sentence.length > 140 ? sentence.slice(0, 137).trimEnd() + '…' : sentence
}

function kindNoun(kind: Kind, name: string): string {
  switch (kind) {
    case 'component':
      return 'a React component'
    case 'function':
      return isHook(name) ? 'a React hook' : 'a helper function'
    case 'class':
      return 'a class'
    case 'const':
      return 'an exported value'
    case 'type':
      return 'a type alias'
    case 'interface':
      return /Props$/.test(name) ? `props for ${name.replace(/Props$/, '')}` : 'an interface'
    case 'enum':
      return 'an enum'
  }
}

function synthMember(name: string, kind: Kind): string {
  if (kind === 'interface' && /Props$/.test(name)) return `Props for ${name.replace(/Props$/, '')}.`
  return `${name} — ${kindNoun(kind, name)}.`
}

function synthFile(area: string, base: string, members: MemberSite[]): string {
  const primary = members.find(m => m.name === base) ?? members.find(m => m.kind === 'component')
  if (base === 'index') return `Barrel entry for the ${area} module.`
  if (primary) return `${primary.name} — ${kindNoun(primary.kind, primary.name)} (${area}).`
  return `${base} — part of the ${area} area.`
}

interface Insert {
  at: number
  text: string
}

function processFile(abs: string): { fileAdded: boolean; membersAdded: number } {
  const id = toId(abs)
  const source = fs.readFileSync(abs, 'utf8')
  const sf = ts.createSourceFile(abs, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const override = ABOUTME_OVERRIDES[id]

  const rel = id.split('/')
  const area = rel.length > 2 ? rel[1] : '(root)'
  const base = path.basename(id).replace(/\.[^.]+$/, '')

  // Two header sets, intentionally different:
  //  · placementPos — every comment at the file top, so a member's comment
  //    is never inserted above the file's own header block.
  //  · aboutRunPos — only the top `ABOUTME:` run, so a member that already
  //    carries its own ABOUTME reads as documented on a re-run.
  const placementPos = new Set((ts.getLeadingCommentRanges(source, 0) ?? []).map(r => r.pos))
  const aboutRun = topAboutRun(sf, source)
  const aboutRunPos = new Set(aboutRun.map(r => r.pos))

  // Gather exported top-level members and where to insert their comment.
  const members: MemberSite[] = []
  const memberOf = (name: string, kind: Kind, stmt: ts.Node) => {
    const leading = ts.getLeadingCommentRanges(source, stmt.getFullStart()) ?? []
    const placeable = leading.filter(r => !placementPos.has(r.pos))
    const insertAt = placeable.length > 0 ? placeable[0].pos : stmt.getStart(sf)
    const documented = rangesHaveAbout(
      source,
      leading.filter(r => !aboutRunPos.has(r.pos)),
    )
    members.push({ name, kind, insertAt, documented })
  }

  for (const stmt of sf.statements) {
    if (ts.isFunctionDeclaration(stmt) && stmt.name && isExported(stmt)) {
      memberOf(stmt.name.text, isPascal(stmt.name.text) ? 'component' : 'function', stmt)
    } else if (ts.isClassDeclaration(stmt) && stmt.name && isExported(stmt)) {
      memberOf(stmt.name.text, 'class', stmt)
    } else if (ts.isInterfaceDeclaration(stmt) && isExported(stmt)) {
      memberOf(stmt.name.text, 'interface', stmt)
    } else if (ts.isTypeAliasDeclaration(stmt) && isExported(stmt)) {
      memberOf(stmt.name.text, 'type', stmt)
    } else if (ts.isEnumDeclaration(stmt) && isExported(stmt)) {
      memberOf(stmt.name.text, 'enum', stmt)
    } else if (ts.isVariableStatement(stmt) && isExported(stmt)) {
      const first = stmt.declarationList.declarations.find(d => ts.isIdentifier(d.name))
      if (first && ts.isIdentifier(first.name)) {
        const name = first.name.text
        const kind: Kind = isFunctionLike(first.initializer) ? (isPascal(name) ? 'component' : 'function') : 'const'
        memberOf(name, kind, stmt)
      }
    }
  }

  // Member-level ABOUTME for any exported member without one.
  const memberInserts: Insert[] = []
  for (const m of members) {
    if (m.documented) continue
    const text = override?.members?.[m.name] ?? synthMember(m.name, m.kind)
    memberInserts.push({ at: m.insertAt, text })
  }

  // File-level ABOUTME at the very top, unless an ABOUTME run already sits
  // there. The existing header block (if any) is reused for its wording.
  const existingHeader = (ts.getLeadingCommentRanges(source, 0) ?? []).filter(r => !aboutRunPos.has(r.pos))
  const fileAdded = aboutRun.length === 0
  const fileText = fileAdded
    ? (override?.file ?? firstSentence(source, existingHeader) ?? synthFile(area, base, members))
    : undefined

  if (!fileAdded && memberInserts.length === 0) return { fileAdded: false, membersAdded: 0 }

  if (!DRY) {
    let out = source
    // Apply member inserts high-offset-first so earlier offsets stay valid.
    for (const ins of memberInserts.sort((a, b) => b.at - a.at)) {
      out = out.slice(0, ins.at) + `// ABOUTME: ${ins.text}\n` + out.slice(ins.at)
    }
    // Prepend the file header last so it always lands on the first line,
    // separated by a blank line from whatever follows.
    if (fileText) out = `// ABOUTME: ${fileText}\n\n` + out
    fs.writeFileSync(abs, out, 'utf8')
  }

  return { fileAdded, membersAdded: memberInserts.length }
}

function main(): void {
  let files = 0
  let filesDocumented = 0
  let membersDocumented = 0
  for (const abs of walk(SRC)) {
    const id = toId(abs)
    if (isExcluded(id)) continue
    files++
    const { fileAdded, membersAdded } = processFile(abs)
    if (fileAdded) filesDocumented++
    membersDocumented += membersAdded
  }
  console.log(
    `apply-aboutme${DRY ? ' (dry run)' : ''} → scanned ${files} files · ` +
      `added ${filesDocumented} file summaries, ${membersDocumented} member summaries`,
  )
}

main()
