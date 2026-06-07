// ABOUTME: One-shot maintenance tool that inserts ABOUTME comments into every
// ABOUTME: source file and exported member, idempotently, for the AST explorer.

/**
 * Adds an `ABOUTME:` summary to every authored source file under `src/` and
 * to every exported top-level member that lacks one.
 *
 * Text is chosen in this order, for both files and exported members:
 *   1. a hand-authored entry in `aboutme-overrides.ts`,
 *   2. the first sentence of the declaration's own doc comment / JSDoc
 *      (reusing the author's own words), or
 *   3. a concise summary synthesised from the declaration's name and kind.
 *
 * The pass is near-idempotent: a hand-authored or prose-derived `ABOUTME:`
 * line is left untouched, but a *generic* structural summary (one that still
 * exactly matches the synthesised fallback) is refreshed in place when real
 * prose has since become available — so adding a JSDoc and re-running upgrades
 * the summary instead of leaving the stale guess. The build step
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
  /** Existing `ABOUTME:` comment in this member's own (non-header) trivia, if any. */
  about?: ts.CommentRange
  /** First sentence of the member's own doc comment (JSDoc / non-ABOUTME), if any. */
  docSentence?: string
}

/** The summary text carried by a single `ABOUTME:` comment range. */
function aboutmeText(text: string, r: ts.CommentRange): string {
  const m = text.slice(r.pos, r.end).match(/ABOUTME:\s?(.*)$/)
  return m ? m[1].replace(/\*\/\s*$/, '').trim() : ''
}

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

/** A single text replacement; `start === end` inserts, `start < end` rewrites. */
interface Edit {
  start: number
  end: number
  text: string
}

function processFile(abs: string): { fileAdded: boolean; membersAdded: number; refreshed: number } {
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

  // Gather exported top-level members: where to insert a comment, the existing
  // ABOUTME (if any), and the first sentence of any real doc comment the author
  // already wrote — so a member with a JSDoc summary gets that prose, not a
  // generic structural guess.
  const members: MemberSite[] = []
  const memberOf = (name: string, kind: Kind, stmt: ts.Node) => {
    const leading = ts.getLeadingCommentRanges(source, stmt.getFullStart()) ?? []
    const placeable = leading.filter(r => !placementPos.has(r.pos))
    const insertAt = placeable.length > 0 ? placeable[0].pos : stmt.getStart(sf)
    // The member's own trivia is everything except the file header ABOUTME run.
    // (`placementPos` can't be used here: the first member in a file shares the
    // file-top trivia with the header, so it would hide the member's own line.)
    const own = leading.filter(r => !aboutRunPos.has(r.pos))
    const about = own.find(r => /ABOUTME:/.test(source.slice(r.pos, r.end)))
    // The member's doc comment is the non-ABOUTME comment closest to the
    // declaration — for the first member, an earlier range may be the file's
    // own header block, which describes the file, not this member.
    const docRanges = own.filter(r => !/ABOUTME:/.test(source.slice(r.pos, r.end)))
    const memberDoc = docRanges.length > 0 ? [docRanges[docRanges.length - 1]] : undefined
    members.push({ name, kind, insertAt, about, docSentence: firstSentence(source, memberDoc) })
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

  // The summary we'd choose for a member today: a hand-authored override wins,
  // then the author's own doc-comment prose, and only then the structural guess.
  const desiredMember = (m: MemberSite): string =>
    override?.members?.[m.name] ?? m.docSentence ?? synthMember(m.name, m.kind)

  // Member-level ABOUTME: insert one where it's missing, and refresh a *generic*
  // one in place when real prose is now available. A hand-edited summary (one
  // that doesn't match the structural guess) is left untouched.
  const edits: Edit[] = []
  let membersAdded = 0
  let refreshed = 0
  for (const m of members) {
    const desired = desiredMember(m)
    if (!m.about) {
      edits.push({ start: m.insertAt, end: m.insertAt, text: `// ABOUTME: ${desired}\n` })
      membersAdded++
      continue
    }
    const existing = aboutmeText(source, m.about)
    if (existing === synthMember(m.name, m.kind) && desired !== existing) {
      edits.push({ start: m.about.pos, end: m.about.end, text: `// ABOUTME: ${desired}` })
      refreshed++
    }
  }

  // File-level ABOUTME. Prefer an override, then a reused file header sentence,
  // then the primary member's prose (so a single-component file reads like its
  // component), and only then the structural guess.
  const existingHeader = (ts.getLeadingCommentRanges(source, 0) ?? []).filter(r => !aboutRunPos.has(r.pos))
  const primary = members.find(m => m.name === base) ?? members.find(m => m.kind === 'component')
  const primaryProse =
    primary && (override?.members?.[primary.name] ?? primary.docSentence) ? desiredMember(primary) : undefined
  const genericFile = synthFile(area, base, members)
  const headerText = override?.file ?? firstSentence(source, existingHeader) ?? primaryProse ?? genericFile

  const fileAdded = aboutRun.length === 0
  if (!fileAdded && aboutRun.length === 1) {
    const existing = aboutmeText(source, aboutRun[0])
    if (existing === genericFile && headerText !== existing) {
      edits.push({ start: aboutRun[0].pos, end: aboutRun[0].end, text: `// ABOUTME: ${headerText}` })
      refreshed++
    }
  }

  if (!fileAdded && edits.length === 0) return { fileAdded: false, membersAdded: 0, refreshed: 0 }

  if (!DRY) {
    let out = source
    // Apply edits high-offset-first so earlier offsets stay valid.
    for (const e of edits.sort((a, b) => b.start - a.start)) {
      out = out.slice(0, e.start) + e.text + out.slice(e.end)
    }
    // Prepend the file header last so it always lands on the first line,
    // separated by a blank line from whatever follows.
    if (fileAdded) out = `// ABOUTME: ${headerText}\n\n` + out
    fs.writeFileSync(abs, out, 'utf8')
  }

  return { fileAdded, membersAdded, refreshed }
}

function main(): void {
  let files = 0
  let filesDocumented = 0
  let membersDocumented = 0
  let refreshedTotal = 0
  for (const abs of walk(SRC)) {
    const id = toId(abs)
    if (isExcluded(id)) continue
    files++
    const { fileAdded, membersAdded, refreshed } = processFile(abs)
    if (fileAdded) filesDocumented++
    membersDocumented += membersAdded
    refreshedTotal += refreshed
  }
  console.log(
    `apply-aboutme${DRY ? ' (dry run)' : ''} → scanned ${files} files · ` +
      `added ${filesDocumented} file summaries, ${membersDocumented} member summaries · ` +
      `refreshed ${refreshedTotal} stale generic summaries`,
  )
}

main()
