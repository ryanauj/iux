// ABOUTME: Router entry point that mounts the How It Works page, wiring the /howitworks route to HowItWorksPage.

import { HowItWorksPage } from '../howitworks/HowItWorksPage'

// ABOUTME: Thin wrapper that renders HowItWorksPage at the /howitworks route; the router references this component rather than HowItWorksPage directly.
export function HowItWorks() {
  return <HowItWorksPage />
}
