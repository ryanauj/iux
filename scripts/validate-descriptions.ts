/**
 * Style-description validator — the runtime gate for `palettes/*.description.ts`.
 *
 * For each `<id>.description.ts` file, dynamically imports it and checks:
 *
 *   - the filename's `<id>` matches `description.paletteId`
 *   - `description.paletteId` is a real key in `palettes/index.ts`
 *   - `signatures.length >= 3`
 *   - `antiSignatures.length >= 2`
 *   - `recallAliases.length >= 1`
 *   - every `lookalikes[].against` is a real `PaletteId` and not self-referential
 *   - every `tokenEvidence[].path` resolves on the matching palette's `tokens`
 *
 * Exits non-zero on any error.
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { palettes } from '../palettes'
import type { StyleDescription } from '../tokens/style-description.contract'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const PALETTES_DIR = path.join(ROOT, 'palettes')

interface ValidationError {
  file: string
  message: string
}

function resolveTokenPath(obj: unknown, dotted: string): unknown {
  let cur: unknown = obj
  for (const segment of dotted.split('.')) {
    if (cur === null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[segment]
  }
  return cur
}

function validateOne(filePath: string, desc: StyleDescription): ValidationError[] {
  const errors: ValidationError[] = []
  const here = path.relative(ROOT, filePath)

  const filenameId = path.basename(filePath, '.description.ts')
  if (desc.paletteId !== filenameId) {
    errors.push({
      file: here,
      message: `paletteId '${desc.paletteId}' does not match filename '${filenameId}'`,
    })
  }
  if (!(desc.paletteId in palettes)) {
    errors.push({ file: here, message: `paletteId '${desc.paletteId}' is not a registered palette` })
    return errors
  }
  const palette = palettes[desc.paletteId]

  if (!desc.tagline?.trim()) errors.push({ file: here, message: 'tagline is empty' })
  if (!desc.summary?.trim()) errors.push({ file: here, message: 'summary is empty' })
  if (!desc.origin?.trim()) errors.push({ file: here, message: 'origin is empty' })

  if (!desc.signatures || desc.signatures.length < 3) {
    errors.push({
      file: here,
      message: `signatures.length must be >= 3 (got ${desc.signatures?.length ?? 0})`,
    })
  }
  if (!desc.antiSignatures || desc.antiSignatures.length < 2) {
    errors.push({
      file: here,
      message: `antiSignatures.length must be >= 2 (got ${desc.antiSignatures?.length ?? 0})`,
    })
  }
  if (!desc.recallAliases || desc.recallAliases.length < 1) {
    errors.push({
      file: here,
      message: 'recallAliases must have at least one entry',
    })
  }

  for (const [i, l] of (desc.lookalikes ?? []).entries()) {
    if (!(l.against in palettes)) {
      errors.push({
        file: here,
        message: `lookalikes[${i}].against '${l.against}' is not a registered palette`,
      })
    }
    if (l.against === desc.paletteId) {
      errors.push({
        file: here,
        message: `lookalikes[${i}].against is self-referential`,
      })
    }
    if (!l.differentiator?.trim()) {
      errors.push({
        file: here,
        message: `lookalikes[${i}].differentiator is empty`,
      })
    }
  }

  for (const [i, ev] of (desc.tokenEvidence ?? []).entries()) {
    const resolved = resolveTokenPath(palette.tokens, ev.path)
    if (resolved === undefined) {
      errors.push({
        file: here,
        message: `tokenEvidence[${i}].path '${ev.path}' does not resolve on palette tokens`,
      })
    }
    if (!ev.note?.trim()) {
      errors.push({ file: here, message: `tokenEvidence[${i}].note is empty` })
    }
  }

  return errors
}

async function main() {
  const entries = fs.readdirSync(PALETTES_DIR, { withFileTypes: true })
  const files = entries
    .filter(e => e.isFile() && e.name.endsWith('.description.ts'))
    .map(e => path.join(PALETTES_DIR, e.name))

  const all: ValidationError[] = []
  for (const file of files) {
    const mod = (await import(pathToFileURL(file).href)) as {
      description?: StyleDescription
    }
    if (!mod.description) {
      all.push({ file: path.relative(ROOT, file), message: 'no `description` export' })
      continue
    }
    all.push(...validateOne(file, mod.description))
  }

  if (all.length === 0) {
    console.log(`✓ ${files.length} description file(s) validated`)
    return
  }

  for (const e of all) {
    console.error(`  ${e.file}: ${e.message}`)
  }
  console.error(`\n${all.length} validation error(s) across ${files.length} description file(s)`)
  process.exit(1)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
