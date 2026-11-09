import { Button } from './Button'
import './ActionBar.css'

/**
 * Figma: "Action bar" (node 11:37).
 * "Bottom area of a screen with the main action. Change the label on the exposed Button."
 */
type ActionBarProps = {
  label: string
  onClick?: () => void
  type?: 'button' | 'submit'
  form?: string
}

export function ActionBar({ label, onClick, type = 'button', form }: ActionBarProps) {
  return (
    <footer className="action-bar">
      <Button label={label} variant="Primary" fullWidth onClick={onClick} type={type} form={form} />
    </footer>
  )
}
