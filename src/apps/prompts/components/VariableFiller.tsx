// ABOUTME: Live template tool: one input per `{{variable}}`, with a running preview of the filled prompt and a copy button for the result.

import { useState } from 'react'
import { TextInput } from '../../../components/TextInput/TextInput'
import { CopyButton } from './CopyButton'
import { fillTemplate, humanizeVar } from '../format'

interface VariableFillerProps {
  body: string
  variables: string[]
}

// ABOUTME: Live template tool: one input per `{{variable}}`, with a running preview of the filled prompt and a copy button for the result.
/**
 * Live template tool: one input per `{{variable}}`, with a running preview
 * of the filled prompt and a copy button for the result. Unfilled slots
 * stay visible as `{{name}}` so it's obvious what's still missing.
 */
export function VariableFiller({ body, variables }: VariableFillerProps) {
  const [values, setValues] = useState<Record<string, string>>({})
  const filled = fillTemplate(body, values)
  const remaining = variables.filter(v => !values[v]?.trim()).length

  return (
    <div className="pb-filler">
      <div className="pb-filler__fields">
        {variables.map(v => (
          <TextInput
            key={v}
            variant="bordered"
            label={humanizeVar(v)}
            value={values[v] ?? ''}
            onChange={val => setValues(prev => ({ ...prev, [v]: val }))}
            placeholder={`{{${v}}}`}
          />
        ))}
      </div>
      <div className="pb-filler__preview">
        <div className="pb-code">
          <div className="pb-code__bar">
            <span className="pb-code__label">
              Preview{remaining > 0 ? ` · ${remaining} slot${remaining === 1 ? '' : 's'} left` : ' · ready'}
            </span>
            <CopyButton text={filled} what="Filled prompt" label="Copy filled" intent="primary" />
          </div>
          <pre className="pb-code__pre"><code>{filled}</code></pre>
        </div>
      </div>
    </div>
  )
}
