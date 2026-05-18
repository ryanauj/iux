/**
 * Token-lint — forbids three categories of raw values outside `palettes/`
 * and `tokens/`:
 *
 *   1. `hex-color`     — `#abc`, `#abcd`, `#aabbcc`, `#aabbccdd`
 *   2. `duration-ms`   — `200ms`
 *   3. `px-box-shadow` — any `box-shadow` (or camelCase `boxShadow`) value
 *                        containing a `Npx` length
 *
 * Anything outside those three categories is allowed — `1px` borders, `rgba()`
 * fallbacks for tokens, color keywords, etc. The contract's stronger ban
 * ("no `8px` anywhere outside palette files") is a longer-term goal; this gate
 * codifies the three explicit categories the session brief asks for.
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

export type RuleId = 'hex-color' | 'duration-ms' | 'px-box-shadow'

export interface LintViolation {
  file: string
  line: number
  col: number
  rule: RuleId
  match: string
}

const HEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})(?![\w-])/g
const MS = /\b\d+(?:\.\d+)?ms\b/g
const PX_BOX_SHADOW = /box[-]?shadow[^;\n]*?\d+(?:\.\d+)?px[^;\n]*/gi

function findAll(line: string, rule: RuleId, re: RegExp, file: string, lineNo: number): LintViolation[] {
  re.lastIndex = 0
  const out: LintViolation[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(line)) !== null) {
    out.push({ file, line: lineNo, col: m.index + 1, rule, match: m[0] })
    if (m.index === re.lastIndex) re.lastIndex++
  }
  return out
}

export function lintText(file: string, source: string): LintViolation[] {
  const out: LintViolation[] = []
  const lines = source.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    out.push(...findAll(line, 'hex-color', HEX, file, i + 1))
    out.push(...findAll(line, 'duration-ms', MS, file, i + 1))
    out.push(...findAll(line, 'px-box-shadow', PX_BOX_SHADOW, file, i + 1))
  }
  return out
}

const DEFAULT_INCLUDE_DIRS = ['src']
const DEFAULT_INCLUDE_ROOT_FILES = ['index.html']
const FILE_EXTS = new Set(['.ts', '.tsx', '.css', '.scss', '.html'])
const EXCLUDE_DIRS = new Set([
  'node_modules',
  'dist',
  '.git',
  'palettes',
  'tokens',
  'scripts',
  'public',
  '.github',
])

function* walk(dir: string): Generator<string> {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue
      yield* walk(path.join(dir, entry.name))
    } else if (entry.isFile() && FILE_EXTS.has(path.extname(entry.name))) {
      yield path.join(dir, entry.name)
    }
  }
}

export function collectDefaultTargets(): string[] {
  const targets: string[] = []
  for (const dir of DEFAULT_INCLUDE_DIRS) {
    const abs = path.join(ROOT, dir)
    if (fs.existsSync(abs)) {
      for (const f of walk(abs)) targets.push(f)
    }
  }
  for (const f of DEFAULT_INCLUDE_ROOT_FILES) {
    const abs = path.join(ROOT, f)
    if (fs.existsSync(abs)) targets.push(abs)
  }
  return targets
}

export function lintFiles(files: string[]): LintViolation[] {
  const out: LintViolation[] = []
  for (const f of files) {
    const source = fs.readFileSync(f, 'utf8')
    out.push(...lintText(f, source))
  }
  return out
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const files = args.length > 0 ? args.map(a => path.resolve(a)) : collectDefaultTargets()
  if (files.length === 0) {
    console.log('lint-raw-values: no target files found')
    return
  }
  const violations = lintFiles(files)
  if (violations.length === 0) {
    console.log(`lint-raw-values: ${files.length} file(s) scanned; 0 violations`)
    return
  }
  console.error(`lint-raw-values: ${violations.length} violation(s) in ${new Set(violations.map(v => v.file)).size} file(s)`)
  for (const v of violations) {
    const rel = path.relative(ROOT, v.file)
    console.error(`  ${rel}:${v.line}:${v.col}  ${v.rule}  ${v.match}`)
  }
  process.exit(1)
}

const invokedDirectly = !!process.argv[1] && path.resolve(process.argv[1]) === __filename
if (invokedDirectly) {
  main().catch(err => {
    console.error(err)
    process.exit(1)
  })
}
