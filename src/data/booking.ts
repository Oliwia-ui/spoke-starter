/** Services from the Figma brief (node 7:19). */
export type Service = {
  id: string
  title: string
  price: number
  duration: string
  durationLong: string
  /** Length in minutes, for the calendar event. */
  minutes: number
  description: string
}

export const services: Service[] = [
  {
    id: 'flat-tyre',
    title: 'Flat tyre repair',
    price: 15,
    duration: '30 min',
    durationLong: '30 minutes',
    minutes: 30,
    description: 'Tube or tyre swap, any wheel size.',
  },
  {
    id: 'brakes',
    title: 'Brake check and adjust',
    price: 25,
    duration: '45 min',
    durationLong: '45 minutes',
    minutes: 45,
    description: 'Pads, cables and alignment.',
  },
  {
    id: 'gears',
    title: 'Gear tune-up',
    price: 30,
    duration: '45 min',
    durationLong: '45 minutes',
    minutes: 45,
    description: 'Smooth shifting on every gear.',
  },
  {
    id: 'full',
    title: 'Full service',
    price: 89,
    duration: '2 hours',
    durationLong: '2 hours',
    minutes: 120,
    description: 'Everything checked, cleaned and adjusted.',
  },
]

/** Days and times from screen 02 (node 7:121). */
export const days = ['Today', 'Tomorrow', 'Mon 16']

export const times = [
  { label: '09:00', available: false },
  { label: '10:30', available: false },
  { label: '12:00', available: true },
  { label: '14:00', available: true },
  { label: '16:30', available: true },
  { label: '17:30', available: true },
]

export const formatPrice = (price: number) => `€${price}`

/** Shop details for screen 04. The address isn't known yet (see DESIGN-SYSTEM.md). */
export const shop = {
  name: 'Spoke',
  address: 'Address to confirm',
}

/** A short booking reference like SPK-4821. Real references would come from the booking system. */
export const makeReference = () => `SPK-${String(Math.floor(1000 + Math.random() * 9000))}`

/** Turn a day label from screen 02 ("Today", "Tomorrow", "Mon 16") into a date. */
export function dayToDate(day: string, from = new Date()): Date {
  const date = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  if (day === 'Today') return date
  if (day === 'Tomorrow') {
    date.setDate(date.getDate() + 1)
    return date
  }
  // "Mon 16": the next date (within a month) whose day of the month is 16
  const dayOfMonth = Number(day.split(' ')[1])
  for (let i = 0; i < 31; i++) {
    if (date.getDate() === dayOfMonth) return date
    date.setDate(date.getDate() + 1)
  }
  return date
}
