import { useRef, useState, type FormEvent } from 'react'
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
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const next = {
      name: name.trim() ? undefined : 'Enter your name',
      phone: phone.trim() ? undefined : 'Enter your phone number',
    }
    setErrors(next)

    // Move focus to the first empty field so it's easy to fix.
    if (next.name) return nameRef.current?.focus()
    if (next.phone) return phoneRef.current?.focus()

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

      {/* noValidate: show our own Error state instead of the browser's bubble. */}
      <form id="confirm-form" className="confirm-form" onSubmit={handleSubmit} noValidate>
        <Input
          ref={nameRef}
          label="Your name"
          placeholder="First and last name"
          autoComplete="name"
          required
          value={name}
          error={errors.name}
          onChange={(e) => {
            setName(e.target.value)
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
          }}
        />
        <Input
          ref={phoneRef}
          label="Phone number"
          placeholder="+32 470 12 34 56"
          type="tel"
          autoComplete="tel"
          required
          value={phone}
          error={errors.phone}
          onChange={(e) => {
            setPhone(e.target.value)
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
          }}
        />
      </form>

      <ScreenNote>We text you when your bike is ready. You pay when you pick it up.</ScreenNote>
    </Screen>
  )
}
