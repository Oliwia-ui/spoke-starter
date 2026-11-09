import './Timeline.css'

/**
 * "Timeline": the "What happens next" list on screen 04 Booked.
 * Code only for now, not in Figma yet.
 *
 * Each step is Done (filled brand dot with a check), Next (brand ring) or
 * Upcoming (grey ring). Steps fade in one after another when shown;
 * static with prefers-reduced-motion.
 */
export type TimelineStep = {
  title: string
  detail: string
  state: 'Done' | 'Next' | 'Upcoming'
}

type TimelineProps = {
  label: string
  steps: TimelineStep[]
  /** Delay before the first step appears, to follow other animations (ms). */
  delay?: number
}

export function Timeline({ label, steps, delay = 0 }: TimelineProps) {
  return (
    <section className="timeline" aria-label={label}>
      <h2 className="timeline__label">{label}</h2>
      <ol className="timeline__list">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={`timeline__step timeline__step--${step.state.toLowerCase()}`}
            style={{ animationDelay: `${delay + i * 90}ms` }}
          >
            <span className="timeline__marker" aria-hidden="true">
              {step.state === 'Done' && (
                <svg width="10" height="8" viewBox="0 0 10 8">
                  <path d="M 1 4 L 4 7 L 9 1" />
                </svg>
              )}
            </span>
            <div className="timeline__text">
              <p className="timeline__title">
                {step.title}
                {step.state === 'Done' && <span className="visually-hidden"> (done)</span>}
                {step.state === 'Next' && <span className="visually-hidden"> (next)</span>}
              </p>
              <p className="timeline__detail">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
