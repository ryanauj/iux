// ABOUTME: Question generators for the palette-guessing quiz: makeRng initialises a Mulberry32 deterministic PRNG from a seed, and nextQuestion picks a target palette, selects three distractors (preferring same-engine peers so users must discriminate within a family), shuffles all four options, and returns an IdentifyQuestion.

import { palettes, type PaletteId } from '../../palettes'
import type { IdentifyQuestion, StimulusKind } from './types'

// ABOUTME: All built-in palette ids drawn from the palettes registry; nextQuestion picks its target and distractors from this array.
const ALL_IDS = Object.keys(palettes) as PaletteId[]
// ABOUTME: The three stimulus kinds the quiz cycles through when picking what to show the user: component grid, visualization grid, or sample sports app.
const STIMULUS_KINDS: StimulusKind[] = ['components', 'visualizations', 'app']

// ABOUTME: Mulberry32 PRNG implementation — takes a 32-bit seed and returns a stateful closure that produces uniformly distributed floats in [0, 1); chosen because it is tiny, fast, and produces reproducible sequences from the same seed.
// Mulberry32 — small deterministic PRNG, kept so seeds are reproducible.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ABOUTME: Picks a uniformly random element from a non-empty array using the provided PRNG; used by nextQuestion to choose the target palette and the stimulus kind.
function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]
}

// ABOUTME: Returns a Fisher-Yates shuffled copy of an array using the provided PRNG; used to randomise distractor order and the final four-option list in nextQuestion.
function shuffle<T>(arr: readonly T[], rng: () => number): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// ABOUTME: Initialise a Mulberry32 PRNG from a 32-bit seed and return a stateful function that produces uniformly distributed floats in [0, 1); used by QuizView so questions are reproducible within a session.
export function makeRng(seed: number): () => number {
  return mulberry32(seed)
}

// ABOUTME: Generate one identify question.
/**
 * Generate one identify question. Distractors prefer the same engine as the
 * target so the question forces you to discriminate within an engine family
 * (e.g. which pixel-art palette is this) rather than just naming the engine.
 * `previousTarget` is avoided so the same palette doesn't repeat back-to-back.
 */
export function nextQuestion(
  rng: () => number,
  previousTarget: PaletteId | null = null,
): IdentifyQuestion {
  const targetPool = previousTarget
    ? ALL_IDS.filter(id => id !== previousTarget)
    : ALL_IDS
  const target = pick(targetPool, rng)
  const targetEngine = palettes[target].engine

  const sameEngine = ALL_IDS.filter(
    id => id !== target && palettes[id].engine === targetEngine,
  )
  const otherEngine = ALL_IDS.filter(
    id => id !== target && palettes[id].engine !== targetEngine,
  )
  const distractors = shuffle(sameEngine, rng)
    .concat(shuffle(otherEngine, rng))
    .slice(0, 3)

  const options = shuffle([target, ...distractors], rng)
  return {
    target,
    stimulus: pick(STIMULUS_KINDS, rng),
    options,
    correctIndex: options.indexOf(target),
  }
}
