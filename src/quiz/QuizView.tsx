// ABOUTME: Interactive view for the palette-guessing quiz: renders a Stimulus (components grid, visualizations grid, or a sample sports app) in the target palette, shows four multiple-choice palette buttons, reveals correct/wrong feedback on answer, and advances to the next seeded question via nextQuestion from generators.ts.

import { useMemo, useState } from 'react'
import { palettes, type PaletteId } from '../../palettes'
import { PaletteShowcase } from '../showcase/PaletteShowcase'
import { COMPONENTS, VISUALIZATIONS } from '../showcase/components'
import { PaletteRoot } from '../theme/PaletteRoot'
import { Home as SportsHome } from '../apps/sports/pages/Home'
import '../apps/sports/sports-app.css'
import { makeRng, nextQuestion } from './generators'
import type { IdentifyQuestion, StimulusKind } from './types'
import './quiz.css'

interface Props {
  seed: number
}

interface AnswerState {
  correct: boolean
  pickedId: PaletteId
}

// ABOUTME: Stateful quiz interaction loop: holds the current IdentifyQuestion and the user's AnswerState, renders a Stimulus inside a shield div, four palette-name option buttons, feedback text after answering, and a Next button that calls nextQuestion to advance the seeded RNG.
export function QuizView({ seed }: Props) {
  const rng = useMemo(() => makeRng(seed), [seed])
  const [question, setQuestion] = useState<IdentifyQuestion>(() =>
    nextQuestion(rng, null),
  )
  const [answer, setAnswer] = useState<AnswerState | null>(null)

  const onPick = (id: PaletteId, correct: boolean) => {
    if (answer) return
    setAnswer({ correct, pickedId: id })
  }

  const onNext = () => {
    setAnswer(null)
    setQuestion(nextQuestion(rng, question.target))
  }

  return (
    <div className="quiz">
      <div className="quiz__body">
        <Stimulus palette={question.target} kind={question.stimulus} />
        <p className="quiz__prompt">
          Which palette / engine is this?{' '}
          <span className="quiz__prompt-kind">({stimulusLabel(question.stimulus)})</span>
        </p>
        <ul className="quiz-options">
          {question.options.map((id, i) => {
            const correct = i === question.correctIndex
            const picked = answer?.pickedId === id
            return (
              <li key={id}>
                <button
                  type="button"
                  className={optionClass(answer, correct, picked)}
                  disabled={!!answer}
                  onClick={() => onPick(id, correct)}
                >
                  {palettes[id].name}
                  <small> ({palettes[id].engine})</small>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {answer && (
        <div className={`quiz__feedback quiz__feedback--${answer.correct ? 'ok' : 'wrong'}`}>
          <strong>{answer.correct ? 'Correct.' : 'Not quite.'}</strong>{' '}
          <span>
            It was <b>{palettes[question.target].name}</b> on the{' '}
            <b>{palettes[question.target].engine}</b> engine.
          </span>
        </div>
      )}

      <footer className="quiz__footer">
        <button
          type="button"
          className="quiz-button quiz-button--primary"
          disabled={!answer}
          onClick={onNext}
        >
          Next
        </button>
      </footer>
    </div>
  )
}

function Stimulus({ palette, kind }: { palette: PaletteId; kind: StimulusKind }) {
  return (
    <div className="quiz-stimulus">
      <div className="quiz-stimulus__shield">
        {kind === 'components' && (
          <PaletteShowcase
            palette={palettes[palette]}
            layout="grid"
            entries={COMPONENTS}
            kindLabel="components"
            showHeader={false}
          />
        )}
        {kind === 'visualizations' && (
          <PaletteShowcase
            palette={palettes[palette]}
            layout="grid"
            entries={VISUALIZATIONS}
            kindLabel="visualizations"
            showHeader={false}
          />
        )}
        {kind === 'app' && (
          <PaletteRoot palette={palettes[palette]} as="div" className="quiz-app-stimulus">
            <SportsHome />
          </PaletteRoot>
        )}
      </div>
    </div>
  )
}

function stimulusLabel(kind: StimulusKind): string {
  if (kind === 'components') return 'components'
  if (kind === 'visualizations') return 'visualizations'
  return 'app'
}

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
