// ABOUTME: Per-palette design page at /palettes/:paletteId/design — renders the palette's full structured description (summary, origin, signatures, anti-signatures, token evidence, lookalikes), a copy-pasteable CSS custom-properties block identical to what PaletteRoot applies inline, and a "Copy as markdown" button emitting the same text as the on-disk docs/styles/*.md file, all painted inside a PaletteRoot using the palette being documented.

/**
 * Per-palette design page. Renders the same content as
 * `docs/styles/<id>.md` directly in the SPA, with the page itself
 * painted in the palette being documented. External projects link to
 * `/palettes/:paletteId/design` as the canonical consumer surface.
 *
 * The page reuses `renderStyleDescriptionMarkdown` and
 * `renderCssVarsBlock` from `src/theme/renderStyleDescription.ts` so
 * the "Copy as markdown" button emits byte-identical text to the disk
 * docs, and the CSS-vars block is the same record that `PaletteRoot`
 * applies inline.
 */
import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { palettes, type PaletteId } from '../../../palettes'
import { descriptions } from '../../../palettes/descriptions'
import { PaletteRoot } from '../../theme/PaletteRoot'
import { AppShell } from '../../components/AppShell/AppShell'
import { APP_SHELL_NAV } from '../../components/AppShell/navLinks'
import { useNavLayout } from '../../components/AppShell/navLayouts'
import {
  renderStyleDescriptionMarkdown,
  renderCssVarsBlock,
} from '../../theme/renderStyleDescription'
import type { Palette } from '../../../tokens/semantic.contract'
import './palettes.css'

// Vite eagerly loads every palette README at build time so the
// "Copy as markdown" button can include the same long-form notes the
// disk docs do. `?raw` + `import: 'default'` gives us a string per file.
// ABOUTME: Eagerly loaded map of all palette README.md files keyed by their import path, so the "Copy as markdown" button can embed long-form notes at build time without a runtime fetch.
const README_MODULES = import.meta.glob(
  '../../../palettes/*.README.md',
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>

// ABOUTME: Finds and returns the raw README string for the given palette id by matching the trailing path segment in README_MODULES, or undefined if no README file exists for that id.
function readmeFor(id: PaletteId): string | undefined {
  for (const [path, body] of Object.entries(README_MODULES)) {
    if (path.endsWith(`/${id}.README.md`)) return body
  }
  return undefined
}

// ABOUTME: Walks a dot-separated token path string through a nested object, returning the value at that path or undefined if any segment is missing or non-object.
function resolveTokenPath(obj: unknown, dotted: string): unknown {
  let cur: unknown = obj
  for (const segment of dotted.split('.')) {
    if (cur === null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[segment]
  }
  return cur
}

// ABOUTME: Converts a resolved token value to a display string for the token evidence table, handling strings, numbers, boxShadow objects, and falling back to JSON for other shapes.
function formatTokenValue(v: unknown): string {
  if (v === undefined) return '(unresolved)'
  if (typeof v === 'string' || typeof v === 'number') return String(v)
  if (v && typeof v === 'object' && 'boxShadow' in v && typeof (v as Record<string, unknown>).boxShadow === 'string') {
    return (v as Record<string, string>).boxShadow
  }
  return JSON.stringify(v)
}

// ABOUTME: A button that calls navigator.clipboard.writeText with the string returned by getText(), briefly showing "Copied!" feedback before reverting to the provided label.
function CopyButton({ label, getText }: { label: string; getText: () => string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="iux-palette-page__copy-btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(getText())
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1600)
        } catch {
          setCopied(false)
        }
      }}
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}

// ABOUTME: Props for the internal PaletteDesignPage component, carrying the resolved Palette object for the id extracted by the routed wrapper.
interface PageProps {
  palette: Palette
}

// ABOUTME: Renders the full palette design page body: breadcrumbs, header, all structured description sections (summary through recall aliases), the CSS custom-properties block with a copy button, a markdown copy button, and the raw README in a collapsible details block.
function PaletteDesignPage({ palette }: PageProps) {
  const desc = descriptions[palette.id as PaletteId]
  const cssBlock = useMemo(
    () => renderCssVarsBlock(palette.tokens, `.theme-${palette.id}`),
    [palette],
  )
  const markdown = useMemo(
    () => (desc
      ? renderStyleDescriptionMarkdown(desc, palettes, readmeFor(palette.id as PaletteId))
      : ''),
    [desc, palette.id],
  )
  const readme = readmeFor(palette.id as PaletteId)
  const [navLayout] = useNavLayout()

  const brand = <h1 className="iux-palette-page__brand-title">iux — palettes</h1>

  return (
    <PaletteRoot palette={palette} as="section" className="iux-palette-page-shell">
      <AppShell
        layoutId={navLayout}
        brand={brand}
        nav={APP_SHELL_NAV}
        activeId="palettes"
      >
        <main className="iux-palette-page">
          <nav className="iux-palette-page__crumbs" aria-label="Breadcrumb">
            <Link to="/" className="iux-palette-page__crumb">Stories</Link>
            <span className="iux-palette-page__crumb-sep" aria-hidden="true">/</span>
            <Link to="/palettes" className="iux-palette-page__crumb">Palettes</Link>
            <span className="iux-palette-page__crumb-sep" aria-hidden="true">/</span>
            <span className="iux-palette-page__crumb iux-palette-page__crumb--current" aria-current="page">
              {palette.name}
            </span>
          </nav>

          <header className="iux-palette-page__header">
            <p className="iux-palette-page__eyebrow">Palette · design doc</p>
            <h1 className="iux-palette-page__title">{palette.name}</h1>
            {desc && <p className="iux-palette-page__tagline">{desc.tagline}</p>}
            <p className="iux-palette-page__meta">
              <span><strong>Engine:</strong> <code>{palette.engine}</code></span>
              <span> · </span>
              <span><strong>A11y:</strong> <code>{palette.a11y}</code></span>
              <span> · </span>
              <Link to={`/?palette=${palette.id}&view=per-palette`}>
                Open in Stories →
              </Link>
            </p>
          </header>

          {!desc && (
            <section className="iux-palette-page__missing">
              <p>
                This palette doesn't have a structured description yet — the
                copy-pasteable CSS block below is still authoritative, but the
                prose sections (signatures, anti-signatures, token evidence,
                lookalikes) will populate once a{' '}
                <code>palettes/{palette.id}.description.ts</code> file is
                registered in <code>palettes/descriptions.ts</code>.
              </p>
            </section>
          )}

          {desc && (
            <>
              <section className="iux-palette-page__section">
                <h2 className="iux-palette-page__section-title">Summary</h2>
                <p>{desc.summary}</p>
              </section>

              <section className="iux-palette-page__section">
                <h2 className="iux-palette-page__section-title">Origin</h2>
                <p>{desc.origin}</p>
              </section>

              <section className="iux-palette-page__section">
                <h2 className="iux-palette-page__section-title">Signatures</h2>
                <ul className="iux-palette-page__list">
                  {desc.signatures.map((s, i) => (
                    <li key={i}><strong>{s.label}</strong> — {s.detail}</li>
                  ))}
                </ul>
              </section>

              <section className="iux-palette-page__section">
                <h2 className="iux-palette-page__section-title">Anti-signatures</h2>
                <ul className="iux-palette-page__list">
                  {desc.antiSignatures.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </section>

              <section className="iux-palette-page__section">
                <h2 className="iux-palette-page__section-title">Token evidence</h2>
                <div className="iux-palette-page__table-wrap">
                  <table className="iux-palette-page__table">
                    <thead>
                      <tr><th>Path</th><th>Value</th><th>Note</th></tr>
                    </thead>
                    <tbody>
                      {desc.tokenEvidence.map((ev, i) => (
                        <tr key={i}>
                          <td><code>{ev.path}</code></td>
                          <td><code className="iux-palette-page__token-value">{formatTokenValue(resolveTokenPath(palette.tokens, ev.path))}</code></td>
                          <td>{ev.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {desc.lookalikes.length > 0 && (
                <section className="iux-palette-page__section">
                  <h2 className="iux-palette-page__section-title">Often confused with</h2>
                  {desc.lookalikes.map((l, i) => (
                    <div key={i} className="iux-palette-page__lookalike">
                      <h3 className="iux-palette-page__lookalike-title">
                        vs <Link to={`/palettes/${l.against}/design`}>{palettes[l.against].name}</Link>
                      </h3>
                      <p>{l.differentiator}</p>
                    </div>
                  ))}
                </section>
              )}

              {desc.thrivesWith && desc.thrivesWith.length > 0 && (
                <section className="iux-palette-page__section">
                  <h2 className="iux-palette-page__section-title">Where it thrives</h2>
                  <ul className="iux-palette-page__list">
                    {desc.thrivesWith.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </section>
              )}

              {desc.degradesWith && desc.degradesWith.length > 0 && (
                <section className="iux-palette-page__section">
                  <h2 className="iux-palette-page__section-title">Where it degrades</h2>
                  <ul className="iux-palette-page__list">
                    {desc.degradesWith.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </section>
              )}

              <section className="iux-palette-page__section">
                <h2 className="iux-palette-page__section-title">Recall aliases</h2>
                <p>
                  {desc.recallAliases.map((a, i) => (
                    <span key={i}><code>{a}</code>{i < desc.recallAliases.length - 1 ? ', ' : ''}</span>
                  ))}
                </p>
              </section>
            </>
          )}

          <section className="iux-palette-page__section">
            <div className="iux-palette-page__section-head">
              <h2 className="iux-palette-page__section-title">CSS custom properties</h2>
              <CopyButton label="Copy CSS" getText={() => cssBlock} />
            </div>
            <p className="iux-palette-page__hint">
              Drop the block below into your stylesheet and add{' '}
              <code>class="theme-{palette.id}"</code> to any element you want
              themed. All component CSS reads only these variables.
            </p>
            <pre className="iux-palette-page__code">
              <code>{cssBlock}</code>
            </pre>
          </section>

          {desc && (
            <section className="iux-palette-page__section">
              <div className="iux-palette-page__section-head">
                <h2 className="iux-palette-page__section-title">Markdown source</h2>
                <CopyButton label="Copy as markdown" getText={() => markdown} />
              </div>
              <p className="iux-palette-page__hint">
                The same text as <code>docs/styles/{palette.id}.md</code> on
                disk — byte-identical, generated from this palette's
                description and README.
              </p>
            </section>
          )}

          {readme && (
            <details className="iux-palette-page__details">
              <summary>
                Long-form notes — from <code>palettes/{palette.id}.README.md</code>
              </summary>
              <pre className="iux-palette-page__readme"><code>{readme.trim()}</code></pre>
            </details>
          )}
        </main>
      </AppShell>
    </PaletteRoot>
  )
}

// ABOUTME: PaletteDesignPageRoute — the routed entry point at /palettes/:paletteId/design; extracts the paletteId param, redirects unknown ids to /palettes, and delegates to the internal PaletteDesignPage component.
export function PaletteDesignPageRoute() {
  const { paletteId } = useParams<{ paletteId: string }>()
  if (!paletteId || !(paletteId in palettes)) {
    return <Navigate to="/palettes" replace />
  }
  return <PaletteDesignPage palette={palettes[paletteId as PaletteId]} />
}
