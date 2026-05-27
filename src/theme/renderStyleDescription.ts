/**
 * Shared style-description renderer. Lifted from
 * `scripts/generate-style-docs.ts` so the SPA's per-palette design page
 * and the Node-side disk doc generator emit byte-identical markdown
 * from one source.
 *
 * Pure: no Node, no DOM, no filesystem. The optional `readmeBody`
 * argument is the verbatim contents of `palettes/<id>.README.md` —
 * callers (Node script, Vite frontend) load that string themselves and
 * pass it in. Callers that have no README pass `undefined`.
 */
import type { SemanticTokens, Palette } from '../../tokens/semantic.contract'
import type {
  StyleDescription,
  Signature,
  Lookalike,
  TokenEvidence,
} from '../../tokens/style-description.contract'
import { paletteToCssVars } from './paletteToCssVars'

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

function renderTokenEvidence(palette: Palette, ev: TokenEvidence[]): string {
  const head = '| Path | Value | Note |\n|---|---|---|'
  const rows = ev.map(e => {
    const resolved = resolveTokenPath(palette.tokens, e.path)
    return `| \`${e.path}\` | ${formatTokenValue(resolved).replace(/\|/g, '\\|')} | ${e.note.replace(/\|/g, '\\|')} |`
  })
  return [head, ...rows].join('\n')
}

function renderLookalikes(
  lk: Lookalike[],
  palettes: Record<string, Palette>,
): string {
  return lk
    .map(l => {
      const name = palettes[l.against].name
      return `### vs [${name}](./${l.against}.md)\n\n${l.differentiator}`
    })
    .join('\n\n')
}

/**
 * Renders the canonical `docs/styles/<id>.md` body for a palette.
 *
 * `palettes` is the full palette registry (so lookalikes resolve to
 * names); `readmeBody` is the optional verbatim README text appended
 * inside a `<details>`. Output ends with a single trailing newline,
 * matching what `scripts/generate-style-docs.ts` writes to disk today.
 */
export function renderStyleDescriptionMarkdown(
  desc: StyleDescription,
  palettes: Record<string, Palette>,
  readmeBody?: string,
): string {
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
  lines.push(renderTokenEvidence(palette, desc.tokenEvidence))
  lines.push('')
  if (desc.lookalikes.length > 0) {
    lines.push('## Often confused with')
    lines.push('')
    lines.push(renderLookalikes(desc.lookalikes, palettes))
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

  if (readmeBody && readmeBody.trim()) {
    lines.push('## Long-form notes')
    lines.push('')
    lines.push('<details>')
    lines.push(`<summary>From <code>palettes/${desc.paletteId}.README.md</code></summary>`)
    lines.push('')
    lines.push(readmeBody.trim())
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

/**
 * Renders the palette's CSS custom properties as a copy-pasteable block
 * for external projects. `selector` defaults to `:root` but can be any
 * CSS selector — e.g. `.theme-aero-glass` for a scoped theme.
 */
export function renderCssVarsBlock(
  tokens: SemanticTokens,
  selector = ':root',
): string {
  const vars = paletteToCssVars(tokens)
  const lines: string[] = [`${selector} {`]
  for (const [name, value] of Object.entries(vars)) {
    lines.push(`  ${name}: ${value};`)
  }
  lines.push('}')
  return lines.join('\n') + '\n'
}
