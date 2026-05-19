/**
 * Fixture harness for the enforcement gates.
 *
 * Runs each gate against a passing fixture (expects clean) and a failing
 * fixture (expects violations) and prints a pass/fail row per assertion.
 * Exits non-zero if any row fails — the gate gate.
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { validateTokens } from './validate-palettes'
import { lintText, type RuleId } from './lint-raw-values'
import { lintStorageText, type StorageRuleId } from './lint-storage'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FIXTURES = path.join(__dirname, '__fixtures__')

interface Row {
  name: string
  passed: boolean
  detail?: string
}

async function loadPaletteTokens(file: string): Promise<unknown> {
  const url = pathToFileURL(file).href
  const mod = (await import(url)) as { palette?: { tokens?: unknown }; default?: { tokens?: unknown } }
  const candidate = mod.palette ?? mod.default
  if (!candidate) throw new Error(`${path.basename(file)}: no palette export`)
  return candidate.tokens
}

async function run(): Promise<Row[]> {
  const rows: Row[] = []

  const validFile = path.join(FIXTURES, 'palette-valid.ts')
  const validTokens = await loadPaletteTokens(validFile)
  const validErrors = validateTokens(validTokens)
  rows.push({
    name: 'validator: passing fixture has 0 errors',
    passed: validErrors.length === 0,
    detail: validErrors.length === 0
      ? undefined
      : `unexpected errors at: ${validErrors.map(e => e.path).join(', ')}`,
  })

  const invalidFile = path.join(FIXTURES, 'palette-invalid.ts')
  const invalidTokens = await loadPaletteTokens(invalidFile)
  const invalidErrors = validateTokens(invalidTokens)
  const reasonsHit = new Set(invalidErrors.map(e => e.reason))
  const expectedReasons = ['missing', 'empty'] as const
  const allReasonsHit = expectedReasons.every(r => reasonsHit.has(r))
  rows.push({
    name: 'validator: failing fixture trips both missing and empty rules',
    passed: invalidErrors.length > 0 && allReasonsHit,
    detail: invalidErrors.length === 0
      ? 'expected errors but got none'
      : allReasonsHit
        ? undefined
        : `reasons tripped: ${Array.from(reasonsHit).join(', ') || '(none)'} (need ${expectedReasons.join(' + ')})`,
  })

  const cleanFile = path.join(FIXTURES, 'raw-values-clean.css')
  const cleanViolations = lintText(cleanFile, fs.readFileSync(cleanFile, 'utf8'))
  rows.push({
    name: 'lint: clean fixture has 0 violations',
    passed: cleanViolations.length === 0,
    detail: cleanViolations.length === 0
      ? undefined
      : `unexpected: ${cleanViolations.map(v => `${v.rule}(${v.match})`).join(', ')}`,
  })

  const dirtyFile = path.join(FIXTURES, 'raw-values-dirty.css')
  const dirtyViolations = lintText(dirtyFile, fs.readFileSync(dirtyFile, 'utf8'))
  const rulesHit = new Set<RuleId>(dirtyViolations.map(v => v.rule))
  const allRules: RuleId[] = ['hex-color', 'duration-ms', 'px-box-shadow']
  const allRulesHit = allRules.every(r => rulesHit.has(r))
  rows.push({
    name: 'lint: dirty fixture trips all three rules',
    passed: dirtyViolations.length > 0 && allRulesHit,
    detail: allRulesHit
      ? undefined
      : `rules tripped: ${Array.from(rulesHit).join(', ') || '(none)'} (need ${allRules.join(' + ')})`,
  })

  const storageCleanFile = path.join(FIXTURES, 'storage-clean.ts')
  const storageCleanViolations = lintStorageText(storageCleanFile, fs.readFileSync(storageCleanFile, 'utf8'))
  rows.push({
    name: 'storage-lint: clean fixture has 0 violations',
    passed: storageCleanViolations.length === 0,
    detail: storageCleanViolations.length === 0
      ? undefined
      : `unexpected: ${storageCleanViolations.map(v => `${v.rule}(${v.match})`).join(', ')}`,
  })

  const storageDirtyFile = path.join(FIXTURES, 'storage-dirty.ts')
  const storageDirtyViolations = lintStorageText(storageDirtyFile, fs.readFileSync(storageDirtyFile, 'utf8'))
  const storageRulesHit = new Set<StorageRuleId>(storageDirtyViolations.map(v => v.rule))
  const expectedStorageRules: StorageRuleId[] = ['window-storage', 'global-storage', 'bare-storage']
  const allStorageRulesHit = expectedStorageRules.every(r => storageRulesHit.has(r))
  rows.push({
    name: 'storage-lint: dirty fixture trips all three rules',
    passed: storageDirtyViolations.length > 0 && allStorageRulesHit,
    detail: allStorageRulesHit
      ? undefined
      : `rules tripped: ${Array.from(storageRulesHit).join(', ') || '(none)'} (need ${expectedStorageRules.join(' + ')})`,
  })

  return rows
}

run()
  .then(rows => {
    for (const r of rows) {
      const tag = r.passed ? 'pass' : 'FAIL'
      const detail = r.detail ? ` — ${r.detail}` : ''
      console.log(`${tag}: ${r.name}${detail}`)
    }
    const failed = rows.filter(r => !r.passed).length
    if (failed > 0) {
      console.error(`test-gates: ${failed}/${rows.length} assertion(s) failed`)
      process.exit(1)
    }
    console.log(`test-gates: ${rows.length}/${rows.length} assertion(s) passed`)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
