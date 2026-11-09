import './SuccessMark.css'

/**
 * Figma: "Success mark" (node 2016:83).
 * "Success signal at the top of the Booked screen. Start pops into Done
 * automatically when the screen opens."
 * The pop-in plays once when the component mounts. Re-mount it (change its
 * `key`) to play it again.
 */
type SuccessMarkProps = {
  label?: string
}

export function SuccessMark({ label = 'Booking confirmed' }: SuccessMarkProps) {
  return (
    <div className="success-mark" role="img" aria-label={label}>
      {/* 1:1 with Figma's 24×17 Check vector; overflow is visible so the round caps aren't cut. */}
      <svg className="success-mark__check" width="24" height="17" viewBox="0 0 24 17" aria-hidden="true">
        <path d="M 0 9 L 8 17 L 24 0" pathLength={1} />
      </svg>
    </div>
  )
}
