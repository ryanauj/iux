import { useState, type ReactNode } from 'react'
import { DatePicker, presetLastNDays, presetThisMonth, type DatePickerVariant } from './DatePicker'

export const VARIANTS: DatePickerVariant[] = ['input', 'calendar', 'range', 'nl']

function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="stories__cell" style={{ minWidth: '22rem' }}>
      <span className="stories__cell-label">{label}</span>
      {children}
    </div>
  )
}

function InputStateful() {
  const [d, setD] = useState<Date | null>(new Date())
  return <DatePicker variant="input" label="Birthday" value={d} onValueChange={setD} hint="YYYY-MM-DD or Sep 4 2024" />
}

function CalendarStateful() {
  const [d, setD] = useState<Date | null>(null)
  return <DatePicker variant="calendar" label="Pick a day" value={d} onValueChange={setD} placeholder="Select a date" />
}

function RangeStateful() {
  const [r, setR] = useState<[Date | null, Date | null]>([null, null])
  return (
    <DatePicker
      variant="range"
      label="Reporting period"
      range={r}
      onRangeChange={setR}
      presets={[presetLastNDays(7), presetLastNDays(30), presetThisMonth()]}
    />
  )
}

function NlStateful() {
  const [r, setR] = useState<[Date | null, Date | null]>([null, null])
  return (
    <DatePicker
      variant="nl"
      label="When?"
      range={r}
      onRangeChange={setR}
      timeZone="America/Los_Angeles"
      hint="Try: tomorrow at 9am, next tue, in 3 days"
    />
  )
}

export function DatePickerStories({ variant: variantFilter }: { variant?: string } = {}) {
  return (
    <div className="stories__component">
      {(variantFilter ? VARIANTS.filter(v => v === variantFilter) : VARIANTS).map(variant => (
        <section key={variant} className="stories__row">
          <h3 className="stories__row-title">variant: {variant}</h3>
          <div className="stories__cells">
            {variant === 'input' && (
              <>
                <Cell label="interactive"><InputStateful /></Cell>
                <Cell label="with error">
                  <DatePicker variant="input" label="Due" defaultValue={new Date('2024-09-30')} error="Date is in the past" />
                </Cell>
              </>
            )}
            {variant === 'calendar' && (
              <Cell label="popover"><CalendarStateful /></Cell>
            )}
            {variant === 'range' && (
              <Cell label="presets + hover preview"><RangeStateful /></Cell>
            )}
            {variant === 'nl' && (
              <Cell label="tz-aware NL → range"><NlStateful /></Cell>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
