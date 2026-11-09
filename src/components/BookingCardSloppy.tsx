import './BookingCardSloppy.css'

/**
 * Figma: "Frame 47" (node 4:6), page "Sloppy vs clean", section "1. Sloppy".
 *
 * Coded exactly as the frame is built in Figma: no auto layout, raw hex
 * values and every layer absolutely positioned. Kept on purpose as the
 * "before" example. For real screens, build the clean card (node 3:34) with
 * tokens and the Button / Tag components instead.
 */
export function BookingCardSloppy() {
  return (
    <div className="sloppy-card" data-node-id="4:6">
      <p className="sloppy-card__text-3" data-node-id="4:7">
        Flat tyre repair
      </p>
      <p className="sloppy-card__text-4" data-node-id="4:8">
        Tube or tyre swap, any wheel size.
      </p>
      <div className="sloppy-card__rectangle-12" data-node-id="4:9" />
      <p className="sloppy-card__text-5" data-node-id="4:10">
        30 min
      </p>
      <div className="sloppy-card__rectangle-13" data-node-id="4:11" />
      <p className="sloppy-card__text-6" data-node-id="4:12">
        All bikes
      </p>
      <p className="sloppy-card__text-7" data-node-id="4:13">
        €15
      </p>
      <p className="sloppy-card__text-8" data-node-id="4:14">
        Next free slot: today at 16:30
      </p>
      <div className="sloppy-card__rectangle-14" data-node-id="4:15" />
      <p className="sloppy-card__text-9" data-node-id="4:16">
        Book this repair
      </p>
    </div>
  )
}
