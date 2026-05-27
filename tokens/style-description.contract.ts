/**
 * Style description contract — structured prose about what makes a palette
 * look like itself. Companion to `semantic.contract.ts`, kept separate so
 * unpopulated palettes don't have to lie. One `StyleDescription` per palette
 * lives in `palettes/<id>.description.ts`; the aggregator
 * `palettes/descriptions.ts` exposes them as a `Partial<Record<PaletteId, _>>`.
 *
 * Consumed by:
 *   - the in-app quiz (auto-derives all four question types)
 *   - the per-style markdown doc generator (`scripts/generate-style-docs.ts`)
 *
 * Free-text fields are markdown-safe.
 */
import type { PaletteId } from '../palettes'

export interface StyleDescription {
  /** Must equal a key in `palettes`. The validator enforces this. */
  paletteId: PaletteId

  /** One-sentence essence. Also the reveal-answer for the free-recall question. */
  tagline: string

  /** 2–4 sentence what-it-is paragraph. */
  summary: string

  /** Era / origin / cultural hook. */
  origin: string

  /**
   * The load-bearing visual signals — "if you see this, you're looking at X."
   * 3–6 entries. Drives the correct option in the "what-makes-it" question
   * and the bulleted Signatures section in the generated doc.
   */
  signatures: Signature[]

  /**
   * Things that would break the style — "if you see this, it is NOT X."
   * 2–4 entries. Mixed into multiple-choice distractors and shown in the doc.
   */
  antiSignatures: string[]

  /**
   * Pointers from a signature into the real `SemanticTokens` shape.
   * The validator resolves each path against the palette's tokens.
   * Used in the doc's "Token evidence" table and (optionally) as a
   * post-answer hint in the quiz.
   */
  tokenEvidence: TokenEvidence[]

  /**
   * One-directional neighbors. Each style declares who it is confused with
   * and what differentiates it. The validator checks `against` is a real
   * `PaletteId` and not self-referential.
   */
  lookalikes: Lookalike[]

  /** Optional doc-only: UI patterns this style flatters. */
  thrivesWith?: string[]

  /** Optional doc-only: UI patterns that fight this style. */
  degradesWith?: string[]

  /**
   * Accepted answers for the free-recall question. Matched as
   * case-insensitive substrings against trimmed user input. At least one.
   */
  recallAliases: string[]

  /**
   * Optional plain-English voice of the style — surfaced when the reader
   * sets the doc-mode toggle to `plain`. Lets less-technical readers
   * understand how the palette differs from others without parsing CSS or
   * token paths. Absence is fine; the technical fields are used as a
   * fallback.
   */
  plain?: PlainDescription
}

export interface PlainDescription {
  /** One-sentence essence in everyday language — no CSS jargon. */
  tagline: string
  /**
   * 2–4 sentence what-it-looks-like paragraph in plain English. Talks about
   * how the palette feels and what a non-technical reader would notice.
   */
  summary: string
  /**
   * 3–6 short, everyday-language bullets describing things to look for that
   * identify this palette. Rendered as a "What to look for" list.
   */
  lookingLike?: string[]
}

export interface Signature {
  /** Short label used as an MCQ option. */
  label: string
  /** Longer prose for the doc and post-answer explanation. */
  detail: string
}

export interface TokenEvidence {
  /** Dotted path into `SemanticTokens`, e.g. `'effect.pixelGrid'`. */
  path: string
  /** Why this value matters for the style. */
  note: string
}

export interface Lookalike {
  /** A real `PaletteId` other than this description's own. */
  against: PaletteId
  /** What distinguishes this style from `against`. */
  differentiator: string
}
