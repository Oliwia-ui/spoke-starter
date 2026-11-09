import { useId, type InputHTMLAttributes } from 'react'
import './Input.css'

/**
 * Figma: "Input" (node 6:23).
 * "Text field with a label above it. Focus shows the brand border."
 * The Focus state comes from the browser's :focus, not a prop.
 */
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Input({ label, id, ...rest }: InputProps) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div className="input">
      <label className="input__label" htmlFor={inputId}>
        {label}
      </label>
      <input className="input__field" id={inputId} {...rest} />
    </div>
  )
}
