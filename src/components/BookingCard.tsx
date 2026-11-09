import { Button } from './Button'
import { Tag } from './Tag'
import './BookingCard.css'

/**
 * Figma: "Booking card" (node 3:34), page "Sloppy vs clean", section "2. Clean".
 * Built with auto layout, variables, and the Button and Tag components.
 */
type BookingCardProps = {
  title?: string
  description?: string
  tags?: string[]
  price?: string
  nextSlot?: string
  buttonLabel?: string
  onBook?: () => void
}

export function BookingCard({
  title = 'Flat tyre repair',
  description = 'Tube or tyre swap, any wheel size.',
  tags = ['30 min', 'All bikes'],
  price = '€15',
  nextSlot = 'Next free slot: today at 16:30',
  buttonLabel = 'Book this repair',
  onBook,
}: BookingCardProps) {
  return (
    <article className="booking-card">
      <header className="booking-card__header">
        <h3 className="booking-card__title">{title}</h3>
        <p className="booking-card__description">{description}</p>
      </header>

      <div className="booking-card__meta">
        <div className="booking-card__tags">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <p className="booking-card__price">{price}</p>
      </div>

      <p className="booking-card__next-slot">{nextSlot}</p>

      <Button label={buttonLabel} variant="Primary" fullWidth onClick={onBook} />
    </article>
  )
}
