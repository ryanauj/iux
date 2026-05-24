/**
 * Style-doc generator — emits one `docs/styles/<id>.md` per populated
 * `palettes/<id>.description.ts`, plus `docs/styles/INDEX.md` listing
 * populated + missing palettes. Run via `pnpm run gen:style-docs`.
 *
 * The generated docs are committed to the repo so external projects can
 * link to a stable URL. Each doc appends the existing
 * `palettes/<id>.README.md` verbatim inside a `<details>` block — the
 * curated prose stays adjacent without duplicate maintenance.
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { palettes, type PaletteId } from '../palettes'
import type {
  StyleDescription,
  Signature,
  Lookalike,
  TokenEvidence,
} from '../tokens/style-description.contract'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const PALETTES_DIR = path.join(ROOT, 'palettes')
const OUT_DIR = path.join(ROOT, 'docs', 'styles')

function resolveTokenPath(obj: unknown, dotted: string): unknown {
  let cur: unknown = obj
  for (const segment of dotted.split('.')) {
    if (cur === null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[segment]
  }
  return cur
}

function formatTokenValue(v: unknown): string {
  if (v === undefined) return '_(unresolved)_'
  if (typeof v === 'string' || typeof v === 'number') return `\`${String(v)}\``
  if (v && typeof v === 'object' && 'boxShadow' in v && typeof (v as Record<string, unknown>).boxShadow === 'string') {
    return `\`${(v as Record<string, string>).boxShadow}\``
  }
  return '`' + JSON.stringify(v).replace(/\|/g, '\\|') + '`'
}

function renderSignatures(sigs: Signature[]): string {
  return sigs.map(s => `- **${s.label}** — ${s.detail}`).join('\n')
}

function renderTokenEvidence(palette: PaletteId, ev: TokenEvidence[]): string {
  const head = '| Path | Value | Note |\n|---|---|---|'
  const rows = ev.map(e => {
    const resolved = resolveTokenPath(palettes[palette].tokens, e.path)
    return `| \`${e.path}\` | ${formatTokenValue(resolved).replace(/\|/g, '\\|')} | ${e.note.replace(/\|/g, '\\|')} |`
  })
  return [head, ...rows].join('\n')
}

function renderLookalikes(lk: Lookalike[]): string {
  return lk
    .map(l => {
      const name = palettes[l.against].name
      return `### vs [${name}](./${l.against}.md)\n\n${l.differentiator}`
    })
    .join('\n\n')
}

function renderDoc(desc: StyleDescription): string {
  const palette = palettes[desc.paletteId]
  const lines: string[] = []
  lines.push(`# ${palette.name}`)
  lines.push('')
  lines.push(`> ${desc.tagline}`)
  lines.push('')
  lines.push(`**Engine:** \`${palette.engine}\` · **A11y:** \`${palette.a11y}\``)
  lines.push('')
  lines.push('## Summary')
  lines.push('')
  lines.push(desc.summary)
  lines.push('')
  lines.push('## Origin')
  lines.push('')
  lines.push(desc.origin)
  lines.push('')
  lines.push('## Signatures')
  lines.push('')
  lines.push(renderSignatures(desc.signatures))
  lines.push('')
  lines.push('## Anti-signatures')
  lines.push('')
  lines.push(desc.antiSignatures.map(s => `- ${s}`).join('\n'))
  lines.push('')
  lines.push('## Token evidence')
  lines.push('')
  lines.push(renderTokenEvidence(desc.paletteId, desc.tokenEvidence))
  lines.push('')
  if (desc.lookalikes.length > 0) {
    lines.push('## Often confused with')
    lines.push('')
    lines.push(renderLookalikes(desc.lookalikes))
    lines.push('')
  }
  if (desc.thrivesWith && desc.thrivesWith.length > 0) {
    lines.push('## Where it thrives')
    lines.push('')
    lines.push(desc.thrivesWith.map(s => `- ${s}`).join('\n'))
    lines.push('')
  }
  if (desc.degradesWith && desc.degradesWith.length > 0) {
    lines.push('## Where it degrades')
    lines.push('')
    lines.push(desc.degradesWith.map(s => `- ${s}`).join('\n'))
    lines.push('')
  }
  lines.push('## Recall aliases')
  lines.push('')
  lines.push(desc.recallAliases.map(a => `\`${a}\``).join(', '))
  lines.push('')

  const readmePath = path.join(PALETTES_DIR, `${desc.paletteId}.README.md`)
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf-8').trim()
    lines.push('## Long-form notes')
    lines.push('')
    lines.push('<details>')
    lines.push(`<summary>From <code>palettes/${desc.paletteId}.README.md</code></summary>`)
    lines.push('')
    lines.push(readme)
    lines.push('')
    lines.push('</details>')
    lines.push('')
  }

  lines.push('---')
  lines.push('')
  lines.push(
    `_Generated from \`palettes/${desc.paletteId}.description.ts\` — do not edit by hand. Run \`pnpm run gen:style-docs\` to regenerate._`,
  )
  return lines.join('\n') + '\n'
}

function renderIndex(populated: PaletteId[], missing: PaletteId[]): string {
  const lines: string[] = []
  lines.push('# Style descriptions — index')
  lines.push('')
  lines.push(
    `${populated.length} of ${populated.length + missing.length} palettes have structured descriptions. Add a \`palettes/<id>.description.ts\` and register it in \`palettes/descriptions.ts\` to populate one.`,
  )
  lines.push('')
  lines.push('## Populated')
  lines.push('')
  for (const id of populated) {
    lines.push(`- [${palettes[id].name}](./${id}.md) — \`${palettes[id].engine}\``)
  }
  lines.push('')
  if (missing.length > 0) {
    lines.push('## Missing')
    lines.push('')
    for (const id of missing) {
      lines.push(`- ${palettes[id].name} — \`${palettes[id].engine}\``)
    }
    lines.push('')
  }
  lines.push('---')
  lines.push('')
  lines.push(
    '_Generated by `scripts/generate-style-docs.ts` — do not edit by hand._',
  )
  return lines.join('\n') + '\n'
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const files = fs
    .readdirSync(PALETTES_DIR, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.description.ts'))
    .map(e => path.join(PALETTES_DIR, e.name))

  const populated: PaletteId[] = []

  for (const file of files) {
    const mod = (await import(pathToFileURL(file).href)) as {
      description?: StyleDescription
    }
    if (!mod.description) {
      console.warn(`skipped: ${path.relative(ROOT, file)} (no \`description\` export)`)
      continue
    }
    const desc = mod.description
    const outPath = path.join(OUT_DIR, `${desc.paletteId}.md`)
    fs.writeFileSync(outPath, renderDoc(desc), 'utf-8')
    populated.push(desc.paletteId)
    console.log(`wrote: docs/styles/${desc.paletteId}.md`)
  }

  const all = Object.keys(palettes) as PaletteId[]
  const missing = all.filter(id => !populated.includes(id))
  fs.writeFileSync(path.join(OUT_DIR, 'INDEX.md'), renderIndex(populated, missing), 'utf-8')
  console.log(`wrote: docs/styles/INDEX.md (${populated.length} populated, ${missing.length} missing)`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
