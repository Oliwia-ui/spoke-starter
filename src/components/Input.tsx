import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import './Input.css'

/**
 * Figma: "Input" (node 6:23).
 * "Text field with a label above it. Focus shows the brand border."
 *
 * States:
 * - Default / Focus: from Figma. In the app, Focus comes from the browser's
 *   :focus. `state="Focus"` forces the look for previews such as the gallery.
 * - Error: not in Figma yet. Pass an `error` message to show a red border and
 *   the message under the field.
 */
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  state?: 'Default' | 'Focus'
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, state = 'Default', error, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`

  const fieldClass = [
    'input__field',
    state === 'Focus' && 'input__field--focus',
    error && 'input__field--error',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="input">
      <label className="input__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        ref={ref}
        className={fieldClass}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />
      {error && (
        <p className="input__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
})
