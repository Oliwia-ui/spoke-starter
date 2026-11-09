/**
 * Builds and downloads an .ics calendar file for the drop-off, so
 * "Add to calendar" works with Apple Calendar, Google Calendar and Outlook.
 */
type CalendarEvent = {
  title: string
  start: Date
  minutes: number
  location: string
  description: string
  uid: string
}

const pad = (n: number) => String(n).padStart(2, '0')

// Local "floating" time (no Z), so the event shows at the time the user picked.
const icsDate = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`

// Escape commas, semicolons and newlines as the iCalendar format requires.
const icsText = (s: string) => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n')

export function buildIcs(event: CalendarEvent): string {
  const end = new Date(event.start.getTime() + event.minutes * 60_000)
  const now = new Date()
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Spoke//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${event.uid}@spoke`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${icsDate(event.start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${icsText(event.title)}`,
    `LOCATION:${icsText(event.location)}`,
    `DESCRIPTION:${icsText(event.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export function downloadIcs(event: CalendarEvent, filename: string) {
  const blob = new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
