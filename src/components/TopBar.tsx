import chevronLeft from '../assets/icons/chevron-left.svg'
import './TopBar.css'

/**
 * Figma: "Top bar" (node 6:24).
 * "Screen header with a back arrow, the flow title and the step counter."
 */
type TopBarProps = {
  title?: string
  step: string
  onBack?: () => void
  /** Figma "Show back". Turn off on the last screen (04 Booked). */
  showBack?: boolean
}

export function TopBar({ title = 'Book a repair', step, onBack, showBack = true }: TopBarProps) {
  return (
    <header className="top-bar">
      {showBack && (
        <button
          type="button"
          className="top-bar__back"
          aria-label="Back"
          onClick={onBack}
          disabled={!onBack}
        >
          <img src={chevronLeft} width={24} height={24} alt="" />
        </button>
      )}
      <p className="top-bar__title">{title}</p>
      <p className="top-bar__step">{step}</p>
    </header>
  )
}
