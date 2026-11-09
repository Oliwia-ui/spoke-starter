import type { CSSProperties } from 'react'
import './SuccessMark.css'

/**
 * Figma: "Success mark" (node 2016:83).
 * "Success signal at the top of the Booked screen. Start pops into Done
 * automatically when the screen opens."
 *
 * Plays once on mount: the circle springs in, a ring ripples out, a small
 * burst of dots goes off, and the check draws itself. Re-mount it (change
 * its `key`) to play it again. Static with prefers-reduced-motion.
 */
type SuccessMarkProps = {
  label?: string
}

const BURST_DOTS = 8

export function SuccessMark({ label = 'Booking confirmed' }: SuccessMarkProps) {
  return (
    <div className="success-mark" role="img" aria-label={label}>
      <span className="success-mark__ripple" aria-hidden="true" />
      <span className="success-mark__burst" aria-hidden="true">
        {Array.from({ length: BURST_DOTS }, (_, i) => (
          <span
            key={i}
            className="success-mark__dot"
            style={{ '--angle': `${(360 / BURST_DOTS) * i + 22.5}deg` } as CSSProperties}
          />
        ))}
      </span>
      <span className="success-mark__circle" aria-hidden="true">
        {/* 34×24 check, drawn at 1:1; overflow is visible so the round caps aren't cut. */}
        <svg className="success-mark__check" width="34" height="24" viewBox="0 0 34 24">
          <path d="M 0 12.7 L 11.3 24 L 34 0" pathLength={1} />
        </svg>
      </span>
    </div>
  )
}
