import { useState } from 'react'

export default function CopySnippet({ snippet }: { snippet: string }) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className='sg-snippet'>
      <button
        type='button'
        className='sg-snippet__copy'
        onClick={onCopy}
        aria-label='Copy snippet to clipboard'
      >
        {copied ? 'copied' : 'copy'}
      </button>
      <pre><code>{snippet}</code></pre>
    </div>
  )
}
