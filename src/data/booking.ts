/** Services from the Figma brief (node 7:19). */
export type Service = {
  id: string
  title: string
  price: number
  duration: string
  durationLong: string
  description: string
}

export const services: Service[] = [
  {
    id: 'flat-tyre',
    title: 'Flat tyre repair',
    price: 15,
    duration: '30 min',
    durationLong: '30 minutes',
    description: 'Tube or tyre swap, any wheel size.',
  },
  {
    id: 'brakes',
    title: 'Brake check and adjust',
    price: 25,
    duration: '45 min',
    durationLong: '45 minutes',
    description: 'Pads, cables and alignment.',
  },
  {
    id: 'gears',
    title: 'Gear tune-up',
    price: 30,
    duration: '45 min',
    durationLong: '45 minutes',
    description: 'Smooth shifting on every gear.',
  },
  {
    id: 'full',
    title: 'Full service',
    price: 89,
    duration: '2 hours',
    durationLong: '2 hours',
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
