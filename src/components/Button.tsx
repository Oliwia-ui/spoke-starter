import type { ButtonHTMLAttributes } from 'react'
import './Button.css'

/**
 * Figma: "Button" (node 3:33).
 * "Primary for the main action on a card, Secondary for anything else."
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  variant?: 'Primary' | 'Secondary'
  fullWidth?: boolean
}

export function Button({
  label,
  variant = 'Primary',
  fullWidth = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'button',
    `button--${variant.toLowerCase()}`,
    fullWidth && 'button--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {label}
    </button>
  )
}
