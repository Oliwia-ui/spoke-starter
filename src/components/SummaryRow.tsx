import './SummaryRow.css'

/**
 * Figma: "Summary row" (node 11:34).
 * "One line of the booking summary on screen 03."
 */
type SummaryRowProps = {
  label: string
  value: string
}

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="summary-row">
      <dt className="summary-row__label">{label}</dt>
      <dd className="summary-row__value">{value}</dd>
    </div>
  )
}
