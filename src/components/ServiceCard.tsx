import { Tag } from './Tag'
import './ServiceCard.css'

/**
 * Figma: "Service card" (node 11:33).
 * "One service in the list on screen 01. Selected marks the user's choice."
 */
type ServiceCardProps = {
  title: string
  price: string
  description: string
  duration: string
  state?: 'Default' | 'Selected'
  onSelect?: () => void
}

export function ServiceCard({
  title,
  price,
  description,
  duration,
  state = 'Default',
  onSelect,
}: ServiceCardProps) {
  const selected = state === 'Selected'

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`service-card${selected ? ' service-card--selected' : ''}`}
      onClick={onSelect}
    >
      <span className="service-card__header">
        <span className="service-card__title">{title}</span>
        <span className="service-card__price">{price}</span>
      </span>
      <span className="service-card__description">{description}</span>
      <span className="service-card__tags">
        <Tag label={duration} />
      </span>
    </button>
  )
}
