import type { PaletteId } from '../../palettes'

export type QuestionKind =
  | 'identify'
  | 'what-makes-it'
  | 'lookalike'
  | 'free-recall'

export interface IdentifyQuestion {
  kind: 'identify'
  target: PaletteId
  options: PaletteId[]
  /** Index into `options` of the correct answer. */
  correctIndex: number
  prompt: string
}

export interface WhatMakesItQuestion {
  kind: 'what-makes-it'
  target: PaletteId
  /** Each option is a candidate signature label, mixed signatures + distractors. */
  options: string[]
  correctIndex: number
  prompt: string
  /** Detail shown after answering (the matching `Signature.detail`). */
  explanation: string
}

export interface LookalikeQuestion {
  kind: 'lookalike'
  target: PaletteId
  /** The lookalike palette, also populated, used as the second stimulus. */
  against: PaletteId
  /** `'target'` on the left, `'against'` on the right (deterministic per question). */
  layout: { left: PaletteId; right: PaletteId }
  /** The `Lookalike.differentiator` text shown as feedback after answering. */
  differentiator: string
  /** Which side is the target — the user must pick this. */
  correctSide: 'left' | 'right'
  prompt: string
}

export interface FreeRecallQuestion {
  kind: 'free-recall'
  target: PaletteId
  /** Accepted answers (case-insensitive substring). */
  aliases: string[]
  /** Revealed after submit. */
  tagline: string
  prompt: string
}

export type Question =
  | IdentifyQuestion
  | WhatMakesItQuestion
  | LookalikeQuestion
  | FreeRecallQuestion

export interface AnswerRecord {
  questionKind: QuestionKind
  target: PaletteId
  correct: boolean
}

export interface QuizState {
  index: number
  answers: AnswerRecord[]
  /** The current question's submitted state, or `null` if not yet answered. */
  submitted: { correct: boolean; explanation?: string } | null
}
