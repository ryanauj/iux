// ABOUTME: A Button that copies `text` and confirms with a transient label + toast.

import { useEffect, useRef, useState } from 'react'
import { Button, type ButtonProps } from '../../../components/Button/Button'
import { copyText } from './clipboard'
import { useToast } from './feedback'

// ABOUTME: Props for CopyButton: the text to copy, an idle button label, a toast noun for the confirmation message, button variant/intent passthrough, and an extra className.
interface CopyButtonProps {
  /** Text to place on the clipboard. */
  text: string
  /** Idle label. Defaults to "Copy". */
  label?: string
  /** What to call the copied thing in the toast, e.g. "Prompt". */
  what?: string
  variant?: ButtonProps['variant']
  intent?: ButtonProps['intent']
  className?: string
}

// ABOUTME: A Button that copies `text` and confirms with a transient label + toast.
/** A Button that copies `text` and confirms with a transient label + toast. */
export function CopyButton({
  text,
  label = 'Copy',
  what = 'Text',
  variant = 'solid',
  intent = 'neutral',
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const push = useToast()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleClick = async () => {
    const ok = await copyText(text)
    if (ok) {
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1600)
      push({ intent: 'success', title: `${what} copied to clipboard`, durationMs: 2200 })
    } else {
      push({ intent: 'danger', title: 'Copy failed', body: 'Select the text and copy manually.' })
    }
  }

  return (
    <Button
      variant={variant}
      intent={copied ? 'success' : intent}
      className={className}
      onClick={handleClick}
      leadingIcon={copied ? <CheckGlyph /> : <CopyGlyph />}
    >
      {copied ? 'Copied' : label}
    </Button>
  )
}

// ABOUTME: Two-page copy SVG icon shown in CopyButton's idle state.
function CopyGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 5.5V4A1.5 1.5 0 0 0 9 2.5H3.5A1.5 1.5 0 0 0 2 4v5.5A1.5 1.5 0 0 0 3.5 11H5" />
    </svg>
  )
}

// ABOUTME: Checkmark SVG icon shown in CopyButton after a successful copy, replacing CopyGlyph for 1.6 s.
function CheckGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  )
}
