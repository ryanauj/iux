import { useMemo, useState } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { descriptions } from '../../palettes/descriptions'
import { PaletteShowcase } from '../showcase/PaletteShowcase'
import { COMPONENTS } from '../showcase/components'
import { buildDeck, matchesRecall } from './generators'
import type {
  IdentifyQuestion,
  WhatMakesItQuestion,
  LookalikeQuestion,
  FreeRecallQuestion,
} from './types'
import './quiz.css'

interface Props {
  seed: number
  /** Total palettes, used in the "Quiz ready for N / total" header. */
  totalPalettes: number
}

interface AnswerState {
  correct: boolean
  explanation?: string
  picked?: string
}

export function QuizView({ seed, totalPalettes }: Props) {
  const deck = useMemo(() => buildDeck(seed), [seed])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState<AnswerState | null>(null)
  const [textInput, setTextInput] = useState('')

  const describedCount = Object.keys(descriptions).length
  const total = deck.length

  if (total === 0) {
    return (
      <div className="quiz-empty">
        <p>No palette descriptions populated yet.</p>
        <p className="quiz-empty__hint">
          Add a <code>palettes/&lt;id&gt;.description.ts</code> and register it in{' '}
          <code>palettes/descriptions.ts</code> to enable the quiz.
        </p>
      </div>
    )
  }

  if (index >= total) {
    return (
      <div className="quiz-summary">
        <h2 className="quiz-summary__title">Deck complete</h2>
        <p className="quiz-summary__score">
          {score} / {total} correct
        </p>
        <button
          type="button"
          className="quiz-button quiz-button--primary"
          onClick={() => {
            setIndex(0)
            setScore(0)
            setAnswer(null)
            setTextInput('')
          }}
        >
          Restart deck
        </button>
      </div>
    )
  }

  const question = deck[index]

  const submit = (correct: boolean, explanation?: string, picked?: string) => {
    if (answer) return
    if (correct) setScore(s => s + 1)
    setAnswer({ correct, explanation, picked })
  }

  const next = () => {
    setAnswer(null)
    setTextInput('')
    setIndex(i => i + 1)
  }

  return (
    <div className="quiz">
      <header className="quiz__header">
        <div className="quiz__progress">
          Question {index + 1} / {total} · Score {score}
        </div>
        <div className="quiz__coverage">
          Quiz ready for {describedCount} / {totalPalettes} palettes
        </div>
      </header>

      <div className="quiz__body">
        {question.kind === 'identify' && (
          <IdentifyCard question={question} answer={answer} onPick={submit} />
        )}
        {question.kind === 'what-makes-it' && (
          <WhatMakesItCard question={question} answer={answer} onPick={submit} />
        )}
        {question.kind === 'lookalike' && (
          <LookalikeCard question={question} answer={answer} onPick={submit} />
        )}
        {question.kind === 'free-recall' && (
          <FreeRecallCard
            question={question}
            answer={answer}
            value={textInput}
            onChange={setTextInput}
            onSubmit={() => {
              const ok = matchesRecall(textInput, question.aliases)
              submit(ok, question.tagline, textInput)
            }}
          />
        )}
      </div>

      {answer && (
        <div className={`quiz__feedback quiz__feedback--${answer.correct ? 'ok' : 'wrong'}`}>
          <strong>{answer.correct ? 'Correct.' : 'Not quite.'}</strong>{' '}
          {answer.explanation && <span>{answer.explanation}</span>}
        </div>
      )}

      <footer className="quiz__footer">
        <button
          type="button"
          className="quiz-button quiz-button--primary"
          disabled={!answer}
          onClick={next}
        >
          {index + 1 === total ? 'Finish' : 'Next question'}
        </button>
      </footer>
    </div>
  )
}

// ----------------------------------------------------------- stimulus

function Stimulus({ palette }: { palette: PaletteId }) {
  return (
    <div className="quiz-stimulus">
      {/* pointer-events: none so showcase affordances don't trigger inside the quiz. */}
      <div className="quiz-stimulus__shield">
        <PaletteShowcase
          palette={palettes[palette]}
          layout="grid"
          entries={COMPONENTS}
          kindLabel="components"
        />
      </div>
    </div>
  )
}

// ----------------------------------------------------------- identify

function IdentifyCard({
  question,
  answer,
  onPick,
}: {
  question: IdentifyQuestion
  answer: AnswerState | null
  onPick: (correct: boolean, explanation?: string, picked?: string) => void
}) {
  return (
    <>
      <Stimulus palette={question.target} />
      <p className="quiz__prompt">{question.prompt}</p>
      <ul className="quiz-options">
        {question.options.map((id, i) => {
          const correct = i === question.correctIndex
          const picked = answer?.picked === id
          return (
            <li key={id}>
              <button
                type="button"
                className={optionClass(answer, correct, picked)}
                disabled={!!answer}
                onClick={() =>
                  onPick(correct, correct ? undefined : `It was ${palettes[question.target].name}.`, id)
                }
              >
                {palettes[id].name}
                <small> ({palettes[id].engine})</small>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

// ----------------------------------------------------------- what-makes-it

function WhatMakesItCard({
  question,
  answer,
  onPick,
}: {
  question: WhatMakesItQuestion
  answer: AnswerState | null
  onPick: (correct: boolean, explanation?: string, picked?: string) => void
}) {
  return (
    <>
      <Stimulus palette={question.target} />
      <p className="quiz__prompt">{question.prompt}</p>
      <ul className="quiz-options">
        {question.options.map((label, i) => {
          const correct = i === question.correctIndex
          const picked = answer?.picked === label
          return (
            <li key={label}>
              <button
                type="button"
                className={optionClass(answer, correct, picked)}
                disabled={!!answer}
                onClick={() => onPick(correct, question.explanation, label)}
              >
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

// ----------------------------------------------------------- lookalike

function LookalikeCard({
  question,
  answer,
  onPick,
}: {
  question: LookalikeQuestion
  answer: AnswerState | null
  onPick: (correct: boolean, explanation?: string, picked?: string) => void
}) {
  return (
    <>
      <div className="quiz-lookalike">
        <div className="quiz-lookalike__side">
          <Stimulus palette={question.layout.left} />
          <button
            type="button"
            className={optionClass(answer, question.correctSide === 'left', answer?.picked === 'left')}
            disabled={!!answer}
            onClick={() =>
              onPick(question.correctSide === 'left', question.differentiator, 'left')
            }
          >
            Left
          </button>
        </div>
        <div className="quiz-lookalike__side">
          <Stimulus palette={question.layout.right} />
          <button
            type="button"
            className={optionClass(answer, question.correctSide === 'right', answer?.picked === 'right')}
            disabled={!!answer}
            onClick={() =>
              onPick(question.correctSide === 'right', question.differentiator, 'right')
            }
          >
            Right
          </button>
        </div>
      </div>
      <p className="quiz__prompt">{question.prompt}</p>
    </>
  )
}

// ----------------------------------------------------------- free-recall

function FreeRecallCard({
  question,
  answer,
  value,
  onChange,
  onSubmit,
}: {
  question: FreeRecallQuestion
  answer: AnswerState | null
  value: string
  onChange: (next: string) => void
  onSubmit: () => void
}) {
  return (
    <>
      <Stimulus palette={question.target} />
      <p className="quiz__prompt">{question.prompt}</p>
      <form
        className="quiz-recall"
        onSubmit={e => {
          e.preventDefault()
          if (!answer) onSubmit()
        }}
      >
        <input
          type="text"
          className="quiz-recall__input"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Type the style name…"
          disabled={!!answer}
          autoFocus
        />
        <button
          type="submit"
          className="quiz-button quiz-button--primary"
          disabled={!!answer || value.trim().length === 0}
        >
          Reveal
        </button>
      </form>
    </>
  )
}

// ----------------------------------------------------------- helpers

function optionClass(
  answer: AnswerState | null,
  correct: boolean,
  picked: boolean,
): string {
  const classes = ['quiz-option']
  if (answer) {
    if (correct) classes.push('quiz-option--correct')
    else if (picked) classes.push('quiz-option--wrong')
    else classes.push('quiz-option--dim')
  }
  return classes.join(' ')
}
