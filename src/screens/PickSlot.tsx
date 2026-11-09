import { ActionBar } from '../components/ActionBar'
import { TimeSlot } from '../components/TimeSlot'
import { TopBar } from '../components/TopBar'
import { days, times, type Service } from '../data/booking'
import { Screen, ScreenHeader, ScreenNote, ScreenSection } from './Screen'

/** Figma: "02 Pick a slot" (node 7:121). */
type PickSlotProps = {
  service: Service
  day: string
  time: string
  onDayChange: (day: string) => void
  onTimeChange: (time: string) => void
  onBack: () => void
  onContinue: () => void
}

export function PickSlot({
  service,
  day,
  time,
  onDayChange,
  onTimeChange,
  onBack,
  onContinue,
}: PickSlotProps) {
  return (
    <Screen
      topBar={<TopBar step="Step 2 of 3" onBack={onBack} />}
      actionBar={<ActionBar label="Continue" onClick={onContinue} />}
    >
      <ScreenHeader
        title="Pick a drop-off time"
        subtitle={`${service.title}, about ${service.durationLong}`}
      />

      <ScreenSection label="Day">
        {days.map((d) => (
          <TimeSlot
            key={d}
            label={d}
            state={d === day ? 'Selected' : 'Default'}
            onSelect={() => onDayChange(d)}
          />
        ))}
      </ScreenSection>

      <ScreenSection label="Drop-off time">
        {times.map((t) => (
          <TimeSlot
            key={t.label}
            label={t.label}
            state={!t.available ? 'Disabled' : t.label === time ? 'Selected' : 'Default'}
            onSelect={() => onTimeChange(t.label)}
          />
        ))}
      </ScreenSection>

      <ScreenNote>Ready the same day. We text you when your bike is done.</ScreenNote>
    </Screen>
  )
}
