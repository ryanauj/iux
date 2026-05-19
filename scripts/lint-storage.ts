/**
 * Persistence-contract lint — forbids direct transport access outside
 * `storage/`. The single seam between apps and storage is the `Store`
 * interface; any file that reaches around it for `window.localStorage`,
 * `sessionStorage`, or `indexedDB` breaks the contract.
 *
 * The rule is the sibling of `lint-raw-values.ts`'s ban on raw hex / px
 * outside palette files, and lands alongside the first app that uses the
 * contract (see `PERSISTENCE-CONTRACT.md` § "Lint enforcement").
 *
 * What it catches:
 *
 *   - `window.localStorage` / `window.sessionStorage` / `window.indexedDB`
 *   - `globalThis.localStorage` (etc.)
 *   - `self.localStorage` (etc.)
 *   - bare `localStorage.foo` / `localStorage[...]` access
 *
 * What it deliberately leaves alone:
 *
 *   - identifiers that mention "LocalStorage" as a name (`LocalStorageStore`,
 *     `isLocalStorageAvailable`) — those are the contract's own surface
 *   - prose mentions in comments and JSX text
 *   - everything inside `storage/`, which is the one directory allowed to
 *     touch a transport directly
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

export type StorageRuleId = 'window-storage' | 'global-storage' | 'bare-storage'

export interface StorageViolation {
  file: string
  line: number
  col: number
  rule: StorageRuleId
  match: string
}

const WINDOW_STORAGE = /\b(?:window|globalThis|self)\s*\.\s*(?:localStorage|sessionStorage|indexedDB)\b/g
const BARE_STORAGE = /(?<![A-Za-z0-9_$.])(?:localStorage|sessionStorage|indexedDB)\s*(?:\.|\[)/g

function findAll(
  line: string,
  rule: StorageRuleId,
  re: RegExp,
  file: string,
  lineNo: number,
): StorageViolation[] {
  re.lastIndex = 0
  const out: StorageViolation[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(line)) !== null) {
    out.push({ file, line: lineNo, col: m.index + 1, rule, match: m[0] })
    if (m.index === re.lastIndex) re.lastIndex++
  }
  return out
}

export function lintStorageText(file: string, source: string): StorageViolation[] {
  const out: StorageViolation[] = []
  const lines = source.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    out.push(...findAll(line, 'window-storage', WINDOW_STORAGE, file, i + 1))
    out.push(...findAll(line, 'bare-storage', BARE_STORAGE, file, i + 1))
  }
  // Tag globalThis hits under their own rule for clearer error messages.
  for (const v of out) {
    if (v.rule === 'window-storage' && /globalThis|self/.test(v.match)) v.rule = 'global-storage'
  }
  return out
}

const DEFAULT_INCLUDE_DIRS = ['src']
const FILE_EXTS = new Set(['.ts', '.tsx'])
const EXCLUDE_DIRS = new Set([
  'node_modules',
  'dist',
  '.git',
  'storage',
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
  return targets
}

export function lintFiles(files: string[]): StorageViolation[] {
  const out: StorageViolation[] = []
  for (const f of files) {
    const source = fs.readFileSync(f, 'utf8')
    out.push(...lintStorageText(f, source))
  }
  return out
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const files = args.length > 0 ? args.map(a => path.resolve(a)) : collectDefaultTargets()
  if (files.length === 0) {
    console.log('lint-storage: no target files found')
    return
  }
  const violations = lintFiles(files)
  if (violations.length === 0) {
    console.log(`lint-storage: ${files.length} file(s) scanned; 0 violations`)
    return
  }
  console.error(`lint-storage: ${violations.length} violation(s) in ${new Set(violations.map(v => v.file)).size} file(s)`)
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
