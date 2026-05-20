/**
 * Palette validator — the runtime gate that pairs with the static TS gate.
 *
 * For each file in `palettes/` (excluding `index.ts`), dynamically imports it
 * and walks `SemanticTokens` against `TOKEN_SHAPE` from
 * `tokens/semantic.contract.ts`. Reports every missing or empty token slot,
 * then exits non-zero if any palette has errors.
 *
 * Optional palette properties like `TextStyle.textTransform` are not in
 * `TOKEN_SHAPE` — the static type-check is what catches misuse there. This
 * script only enforces required-slot presence.
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { TOKEN_SHAPE, type TokenShapeNode } from '../tokens/semantic.contract'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const PALETTES_DIR = path.join(ROOT, 'palettes')

export type ValidationReason = 'missing' | 'empty' | 'wrong-type'

export interface ValidationError {
  palette: string
  path: string
  reason: ValidationReason
  detail?: string
}

type LocalError = Omit<ValidationError, 'palette'>

function isPlainObject(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x)
}

export function validateTokens(
  tokens: unknown,
  shape: TokenShapeNode = TOKEN_SHAPE,
  trail: string[] = [],
): LocalError[] {
  const errors: LocalError[] = []
  const here = trail.join('.') || '(root)'

  if (shape === null) {
    if (typeof tokens === 'string') {
      if (tokens === '') errors.push({ path: here, reason: 'empty' })
      return errors
    }
    errors.push({ path: here, reason: 'wrong-type', detail: `expected string, got ${typeof tokens}` })
    return errors
  }

  if (Array.isArray(shape)) {
    if (!isPlainObject(tokens)) {
      errors.push({ path: here, reason: 'wrong-type', detail: `expected object, got ${typeof tokens}` })
      return errors
    }
    for (const key of shape) {
      const value = tokens[key]
      const childPath = [...trail, key].join('.')
      if (value === undefined || value === null) {
        errors.push({ path: childPath, reason: 'missing' })
        continue
      }
      if (typeof value === 'string') {
        if (value === '') errors.push({ path: childPath, reason: 'empty' })
        continue
      }
      if (typeof value === 'number') {
        continue
      }
      errors.push({ path: childPath, reason: 'wrong-type', detail: `expected string|number, got ${typeof value}` })
    }
    return errors
  }

  if (!isPlainObject(tokens)) {
    errors.push({ path: here, reason: 'wrong-type', detail: `expected object, got ${typeof tokens}` })
    return errors
  }
  for (const key of Object.keys(shape)) {
    const childShape = (shape as Record<string, TokenShapeNode>)[key]
    const child = tokens[key]
    if (child === undefined || child === null) {
      errors.push({ path: [...trail, key].join('.'), reason: 'missing' })
      continue
    }
    errors.push(...validateTokens(child, childShape, [...trail, key]))
  }
  return errors
}

interface PaletteLike {
  id?: string
  name?: string
  tokens?: unknown
}

function listPaletteFiles(): string[] {
  if (!fs.existsSync(PALETTES_DIR)) return []
  return fs
    .readdirSync(PALETTES_DIR)
    .filter(name => name.endsWith('.ts') && name !== 'index.ts')
    .map(name => path.join(PALETTES_DIR, name))
    .sort()
}

async function loadPalette(file: string): Promise<{ id: string; tokens: unknown }> {
  const url = pathToFileURL(file).href
  const mod = (await import(url)) as { palette?: PaletteLike; default?: PaletteLike }
  const candidate = mod.palette ?? mod.default
  if (!candidate) {
    throw new Error(`${path.basename(file)}: expected an exported "palette" (or default)`)
  }
  return {
    id: candidate.id ?? path.basename(file, '.ts'),
    tokens: candidate.tokens,
  }
}

export async function validateAllPalettes(): Promise<{ files: string[]; errors: ValidationError[] }> {
  const files = listPaletteFiles()
  const errors: ValidationError[] = []
  for (const file of files) {
    const { id, tokens } = await loadPalette(file)
    for (const e of validateTokens(tokens)) {
      errors.push({ palette: id, ...e })
    }
  }
  return { files, errors }
}

async function main(): Promise<void> {
  const { files, errors } = await validateAllPalettes()
  if (files.length === 0) {
    console.error('validate-palettes: no palette files found under palettes/')
    process.exit(1)
  }
  if (errors.length === 0) {
    console.log(`validate-palettes: ${files.length} palette(s) ok`)
    for (const file of files) {
      console.log(`  pass: ${path.basename(file, '.ts')}`)
    }
    return
  }
  console.error(`validate-palettes: ${errors.length} error(s) across ${new Set(errors.map(e => e.palette)).size} palette(s)`)
  for (const e of errors) {
    const detail = e.detail ? ` (${e.detail})` : ''
    console.error(`  ${e.palette}: ${e.path} — ${e.reason}${detail}`)
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
