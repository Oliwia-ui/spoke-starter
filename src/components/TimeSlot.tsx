import './TimeSlot.css'

/**
 * Figma: "Time slot" (node 6:14).
 * "A pickable day or drop-off time. Selected is the user's choice, Disabled is fully booked."
 */
type TimeSlotProps = {
  label: string
  state?: 'Default' | 'Selected' | 'Disabled'
  onSelect?: () => void
}

export function TimeSlot({ label, state = 'Default', onSelect }: TimeSlotProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={state === 'Selected'}
      className={`time-slot time-slot--${state.toLowerCase()}`}
      disabled={state === 'Disabled'}
      onClick={onSelect}
    >
      {label}
    </button>
  )
}
