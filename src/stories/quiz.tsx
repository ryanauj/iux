// ABOUTME: Router entry point that mounts the palette-guessing quiz, wiring the /quiz route to QuizPage.

import { QuizPage } from '../quiz/QuizPage'

// ABOUTME: Thin wrapper that renders QuizPage at the /quiz route; the router references this component rather than QuizPage directly.
export function Quiz() {
  return <QuizPage />
}
