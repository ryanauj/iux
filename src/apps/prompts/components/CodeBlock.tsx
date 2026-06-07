// ABOUTME: A monospaced, copyable text block for prompt bodies, templates, examples.

import { CopyButton } from './CopyButton'

interface CodeBlockProps {
  text: string
  /** Label for the copy confirmation toast. */
  what?: string
  /** Optional caption shown above the block (e.g. "Template"). */
  label?: string
  className?: string
}

// ABOUTME: A monospaced, copyable text block for prompt bodies, templates, examples.
/** A monospaced, copyable text block for prompt bodies, templates, examples. */
export function CodeBlock({ text, what = 'Text', label, className }: CodeBlockProps) {
  return (
    <div className={['pb-code', className].filter(Boolean).join(' ')}>
      <div className="pb-code__bar">
        {label ? <span className="pb-code__label">{label}</span> : <span />}
        <CopyButton text={text} what={what} variant="solid" intent="neutral" />
      </div>
      <pre className="pb-code__pre">
        <code>{text}</code>
      </pre>
    </div>
  )
}
