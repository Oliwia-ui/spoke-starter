import { ActionBar } from '../components/ActionBar'
import { Button } from '../components/Button'
import { SuccessMark } from '../components/SuccessMark'
import { SummaryRow } from '../components/SummaryRow'
import { Timeline } from '../components/Timeline'
import { TopBar } from '../components/TopBar'
import { dayToDate, formatPrice, shop, type Service } from '../data/booking'
import { downloadIcs } from '../data/calendar'
import { Screen, ScreenHeader, ScreenNote } from './Screen'
import './Confirm.css'

/** Figma: "04 Booked" (node 2017:77). */
type BookedProps = {
  service: Service
  day: string
  time: string
  name: string
  phone: string
  reference: string
  onDone: () => void
}

// "Today" → "today at 16:30", "Mon 16" → "on Mon 16 at 16:30"
const when = (day: string, time: string) =>
  day === 'Today' || day === 'Tomorrow' ? `${day.toLowerCase()} at ${time}` : `on ${day} at ${time}`

export function Booked({ service, day, time, name, phone, reference, onDone }: BookedProps) {
  const firstName = name.split(/\s+/)[0]

  const addToCalendar = () => {
    const start = dayToDate(day)
    const [hours, minutes] = time.split(':').map(Number)
    start.setHours(hours, minutes, 0, 0)
    downloadIcs(
      {
        title: `Drop off bike at ${shop.name}: ${service.title}`,
        start,
        minutes: service.minutes,
        location: shop.address,
        description: `Booking ${reference}. ${formatPrice(service.price)}, pay at pick-up.`,
        uid: reference,
      },
      `spoke-${reference}.ics`,
    )
  }

  return (
    <Screen
      topBar={<TopBar step="Booked" showBack={false} />}
      actionBar={<ActionBar label="Done" onClick={onDone} />}
    >
      <SuccessMark centered />

      <ScreenHeader
        title={`You're all set, ${firstName}!`}
        subtitle={`Your repair is booked. See you ${when(day, time)}.`}
        focusOnMount
        centered
      />

      {/* Starts after the Success mark has drawn its check (about 800ms). */}
      <Timeline
        label="What happens next"
        delay={700}
        steps={[
          { title: 'Booked', detail: `${service.title}, just now`, state: 'Done' },
          { title: `Drop off ${when(day, time)}`, detail: shop.address, state: 'Next' },
          { title: 'We text you', detail: 'When your bike is ready, same day', state: 'Upcoming' },
          { title: 'Pick up and pay', detail: `${formatPrice(service.price)}, pay at pick-up`, state: 'Upcoming' },
        ]}
      />

      {/* Drop-off, place and price now live in the timeline above. */}
      <dl className="summary">
        <SummaryRow label="Service" value={service.title} />
        <SummaryRow label="Reference" value={reference} />
      </dl>

      <Button label="Add to calendar" variant="Secondary" fullWidth onClick={addToCalendar} />

      <ScreenNote>
        We've sent a confirmation to {phone}. Need to change it? Reply to the text.
      </ScreenNote>
    </Screen>
  )
}
