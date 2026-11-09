import { useState, type FormEvent } from 'react'
import { ActionBar } from '../components/ActionBar'
import { Input } from '../components/Input'
import { SummaryRow } from '../components/SummaryRow'
import { TopBar } from '../components/TopBar'
import { formatPrice, type Service } from '../data/booking'
import { Screen, ScreenHeader, ScreenNote } from './Screen'
import './Confirm.css'

/** Figma: "03 Confirm" (node 7:128). */
type ConfirmProps = {
  service: Service
  day: string
  time: string
  onBack: () => void
  onConfirm: (details: { name: string; phone: string }) => void
}

export function Confirm({ service, day, time, onBack, onConfirm }: ConfirmProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onConfirm({ name: name.trim(), phone: phone.trim() })
  }

  return (
    <Screen
      topBar={<TopBar step="Step 3 of 3" onBack={onBack} />}
      actionBar={<ActionBar label="Confirm booking" type="submit" form="confirm-form" />}
    >
      <ScreenHeader title="Check and confirm" />

      <dl className="summary">
        <SummaryRow label="Service" value={service.title} />
        <SummaryRow label="Drop-off" value={`${day} at ${time}`} />
        <SummaryRow label="Price" value={`${formatPrice(service.price)}, pay at pick-up`} />
      </dl>

      <form id="confirm-form" className="confirm-form" onSubmit={handleSubmit}>
        <Input
          label="Your name"
          placeholder="First and last name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Phone number"
          placeholder="+32 470 12 34 56"
          type="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </form>

      <ScreenNote>We text you when your bike is ready. You pay when you pick it up.</ScreenNote>
    </Screen>
  )
}
