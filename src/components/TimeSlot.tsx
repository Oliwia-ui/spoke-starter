import { useEffect, useId, useState } from 'react'
import './TimeSlot.css'

/**
 * Figma: "Time slot" (node 6:14).
 * "A pickable day or drop-off time. Selected is the user's choice, Disabled is fully booked."
 *
 * Disabled slots explain themselves: a tooltip ("Fully booked") shows on
 * hover and keyboard focus, and for a few seconds after a tap on touch
 * screens. They use aria-disabled instead of the disabled attribute, so they
 * stay focusable and screen readers can hear why they can't be picked.
 */
type TimeSlotProps = {
  label: string
  state?: 'Default' | 'Selected' | 'Disabled'
  onSelect?: () => void
  /** Tooltip text for a Disabled slot. */
  unavailableReason?: string
}

const TAP_TOOLTIP_MS = 2500

export function TimeSlot({
  label,
  state = 'Default',
  onSelect,
  unavailableReason = 'Fully booked',
}: TimeSlotProps) {
  const disabled = state === 'Disabled'
  const tooltipId = useId()
  const [tapped, setTapped] = useState(false)

  // Hide the tap tooltip again after a moment
  useEffect(() => {
    if (!tapped) return
    const timer = setTimeout(() => setTapped(false), TAP_TOOLTIP_MS)
    return () => clearTimeout(timer)
  }, [tapped])

  const handleClick = () => {
    if (disabled) setTapped(true)
    else onSelect?.()
  }

  return (
    <span className={`time-slot-wrap${tapped ? ' time-slot-wrap--tip-open' : ''}`}>
      <button
        type="button"
        role="radio"
        aria-checked={state === 'Selected'}
        aria-disabled={disabled || undefined}
        aria-describedby={disabled ? tooltipId : undefined}
        className={`time-slot time-slot--${state.toLowerCase()}`}
        onClick={handleClick}
      >
        {label}
      </button>
      {disabled && (
        <span className="time-slot__tooltip" role="tooltip" id={tooltipId}>
          {unavailableReason}
        </span>
      )}
    </span>
  )
}
