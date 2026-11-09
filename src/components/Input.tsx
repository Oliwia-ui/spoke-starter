import { useId, type InputHTMLAttributes } from 'react'
import './Input.css'

/**
 * Figma: "Input" (node 6:23).
 * "Text field with a label above it. Focus shows the brand border."
 * In the app, Focus comes from the browser's :focus. `state="Focus"` forces
 * the look, for previews such as the component gallery.
 */
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  state?: 'Default' | 'Focus'
}

export function Input({ label, id, state = 'Default', ...rest }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const fieldClass = `input__field${state === 'Focus' ? ' input__field--focus' : ''}`

  return (
    <div className="input">
      <label className="input__label" htmlFor={inputId}>
        {label}
      </label>
      <input className={fieldClass} id={inputId} {...rest} />
    </div>
  )
}
