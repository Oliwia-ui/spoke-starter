import { ActionBar } from '../components/ActionBar'
import { SummaryRow } from '../components/SummaryRow'
import { TopBar } from '../components/TopBar'
import { formatPrice, type Service } from '../data/booking'
import { Screen, ScreenHeader, ScreenNote } from './Screen'
import './Confirm.css'

/**
 * Not in Figma. A minimal "done" state after Confirm booking, built only from
 * existing components and tokens so the flow has an end. Replace it when a
 * confirmation screen is designed.
 */
type BookedProps = {
  service: Service
  day: string
  time: string
  name: string
  onRestart: () => void
}

export function Booked({ service, day, time, name, onRestart }: BookedProps) {
  return (
    <Screen
      topBar={<TopBar step="Booked" />}
      actionBar={<ActionBar label="Book another repair" onClick={onRestart} />}
    >
      <ScreenHeader title="You're booked" subtitle={`Thanks, ${name}. See you soon.`} />

      <dl className="summary">
        <SummaryRow label="Service" value={service.title} />
        <SummaryRow label="Drop-off" value={`${day} at ${time}`} />
        <SummaryRow label="Price" value={`${formatPrice(service.price)}, pay at pick-up`} />
      </dl>

      <ScreenNote>We text you when your bike is ready. You pay when you pick it up.</ScreenNote>
    </Screen>
  )
}
