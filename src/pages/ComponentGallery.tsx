import { useState, type ReactNode } from 'react'
import { ActionBar } from '../components/ActionBar'
import { BookingCard } from '../components/BookingCard'
import { BookingCardSloppy } from '../components/BookingCardSloppy'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { ServiceCard } from '../components/ServiceCard'
import { SummaryRow } from '../components/SummaryRow'
import { SuccessMark } from '../components/SuccessMark'
import { Tag } from '../components/Tag'
import { Timeline } from '../components/Timeline'
import { TimeSlot } from '../components/TimeSlot'
import { TopBar } from '../components/TopBar'
import './ComponentGallery.css'

/**
 * Every component in every state, next to its Figma name and node ID,
 * so the build can be checked against the Figma file. Open at /#/components.
 */

const FIGMA_FILE =
  'https://www.figma.com/design/KclDEc71ziHXMHyVvPn3P0/Demo--Spoke-booking-card--sloppy-vs-clean--Copy-'

const figmaLink = (nodeId: string) => `${FIGMA_FILE}?node-id=${nodeId.replace(':', '-')}`

/** Shows a token's live value from tokens.css, so the page can't drift from it. */
function TokenValue({ token }: { token: string }) {
  // tokens.css is loaded in main.tsx before the first render, so this is safe to read here.
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  return <span className="gallery-swatch__hex">{value}</span>
}

const colours = [
  { token: '--color-surface', figma: 'color/surface' },
  { token: '--color-text-primary', figma: 'color/text/primary' },
  { token: '--color-text-muted', figma: 'color/text/muted' },
  { token: '--color-border', figma: 'color/border' },
  { token: '--color-brand', figma: 'color/brand' },
  { token: '--color-on-brand', figma: 'color/on-brand' },
  { token: '--color-tag-background', figma: 'color/tag/background' },
  { token: '--color-tag-text', figma: 'color/tag/text' },
  { token: '--color-error', figma: 'color/error' },
]

const typeStyles = [
  { token: '--font-screen-title', figma: 'Screen/Title', spec: '28/34 Semi Bold', sample: 'Choose a service' },
  { token: '--font-card-title', figma: 'Card/Title', spec: '20/28 Semi Bold', sample: 'Flat tyre repair' },
  { token: '--font-card-body', figma: 'Card/Body', spec: '15/22 Regular', sample: 'Tube or tyre swap, any wheel size.' },
  { token: '--font-card-caption', figma: 'Card/Caption', spec: '14/20 Regular', sample: 'Next free slot: today at 16:30' },
  { token: '--font-label-button', figma: 'Label/Button', spec: '16/24 Semi Bold', sample: 'Book this repair' },
  { token: '--font-label-field', figma: 'Label/Field', spec: '14/20 Medium', sample: 'Your name' },
  { token: '--font-label-tag', figma: 'Label/Tag', spec: '13/18 Medium', sample: '30 min' },
]

const spacing = ['4', '8', '12', '16', '20', '24']
const radii = ['--radius-md', '--radius-lg', '--radius-pill']

type EntryProps = {
  name: string
  nodeId?: string
  description: string
  wide?: boolean
  children: ReactNode
}

function Entry({ name, nodeId, description, wide, children }: EntryProps) {
  return (
    <article className="gallery-entry">
      <header className="gallery-entry__header">
        <h3 className="gallery-entry__name">{name}</h3>
        {nodeId && (
          <a className="gallery-entry__node" href={figmaLink(nodeId)} target="_blank" rel="noreferrer">
            Figma {nodeId}
          </a>
        )}
      </header>
      <p className="gallery-entry__description">{description}</p>
      <div className={`gallery-entry__variants${wide ? ' gallery-entry__variants--wide' : ''}`}>
        {children}
      </div>
    </article>
  )
}

function Variant({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="gallery-variant">
      <div className="gallery-variant__preview">{children}</div>
      <figcaption className="gallery-variant__label">{label}</figcaption>
    </figure>
  )
}

/** Success mark with a button that remounts it, so the pop-in plays again. */
function SuccessMarkDemo() {
  const [run, setRun] = useState(0)
  return (
    <div className="gallery-replay">
      <SuccessMark key={run} />
      <Button label="Replay" variant="Secondary" onClick={() => setRun((n) => n + 1)} />
    </div>
  )
}

/** Timeline with a Replay button, so the staggered reveal plays again. */
function TimelineDemo() {
  const [run, setRun] = useState(0)
  return (
    <div className="gallery-replay gallery-replay--top">
      <div className="gallery-fixed-width">
        <Timeline
          key={run}
          label="What happens next"
          steps={[
            { title: 'Booked', detail: 'Flat tyre repair, just now', state: 'Done' },
            { title: 'Drop off today at 16:30', detail: 'Address to confirm', state: 'Next' },
            { title: 'We text you', detail: 'When your bike is ready, same day', state: 'Upcoming' },
            { title: 'Pick up and pay', detail: '€15, pay at pick-up', state: 'Upcoming' },
          ]}
        />
      </div>
      <Button label="Replay" variant="Secondary" onClick={() => setRun((n) => n + 1)} />
    </div>
  )
}

export function ComponentGallery() {
  return (
    <div className="gallery">
      <header className="gallery__header">
        <div>
          <h1 className="gallery__title">Spoke components</h1>
          <p className="gallery__intro">
            Every component and token in the build, with its Figma name and node ID. Click a node ID
            to open it in Figma and compare.
          </p>
        </div>
        <a className="gallery__back" href="#/">
          Open the booking flow
        </a>
      </header>

      <nav className="gallery__nav" aria-label="Sections">
        {[
          ['foundations', 'Foundations'],
          ['components', 'Components'],
          ['demo', 'Demo cards'],
        ].map(([id, label]) => (
          <a
            key={id}
            href="#/components"
            onClick={(e) => {
              // Scroll without changing the hash, which drives the page route.
              e.preventDefault()
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Foundations */}
      <section className="gallery__section" aria-labelledby="foundations">
        <h2 className="gallery__section-title" id="foundations">
          Foundations
        </h2>

        <Entry name="Colour" nodeId="7:28" description="Every colour variable, as a token in tokens.css.">
          {colours.map((c) => (
            <figure key={c.token} className="gallery-swatch">
              <div className="gallery-swatch__chip" style={{ background: `var(${c.token})` }} />
              <figcaption>
                <span className="gallery-swatch__name">{c.figma}</span>
                <code>{c.token}</code>
                <TokenValue token={c.token} />
              </figcaption>
            </figure>
          ))}
        </Entry>

        <Entry name="Type styles" nodeId="7:62" description="Inter, letter spacing 0. Use as font: var(--token)." wide>
          {typeStyles.map((t) => (
            <div key={t.token} className="gallery-type">
              <div className="gallery-type__meta">
                <span className="gallery-swatch__name">{t.figma}</span>
                <code>{t.token}</code>
                <span className="gallery-swatch__hex">{t.spec}</span>
              </div>
              <p className="gallery-type__sample" style={{ font: `var(${t.token})` }}>
                {t.sample}
              </p>
            </div>
          ))}
        </Entry>

        <Entry name="Spacing" nodeId="7:85" description="Used for padding and gaps." wide>
          {spacing.map((s) => (
            <div key={s} className="gallery-scale">
              <code className="gallery-scale__token">--space-{s}</code>
              <div className="gallery-scale__bar" style={{ width: `var(--space-${s})` }} />
              <TokenValue token={`--space-${s}`} />
            </div>
          ))}
        </Entry>

        <Entry name="Radius" nodeId="7:85" description="md for buttons, slots and fields; lg for cards; pill for tags.">
          {radii.map((token) => (
            <figure key={token} className="gallery-swatch">
              <div className="gallery-radius" style={{ borderRadius: `var(${token})` }} />
              <figcaption>
                <code>{token}</code>
                <TokenValue token={token} />
              </figcaption>
            </figure>
          ))}
        </Entry>
      </section>

      {/* Components */}
      <section className="gallery__section" aria-labelledby="components">
        <h2 className="gallery__section-title" id="components">
          Components
        </h2>

        <Entry name="Button" nodeId="3:33" description="Primary for the main action on a card, Secondary for anything else.">
          <Variant label="Primary">
            <Button label="Book this repair" variant="Primary" />
          </Variant>
          <Variant label="Secondary">
            <Button label="Book this repair" variant="Secondary" />
          </Variant>
        </Entry>

        <Entry name="Tag" nodeId="3:27" description="Small label for service facts such as duration or bike type.">
          <Variant label="Duration">
            <Tag label="30 min" />
          </Variant>
          <Variant label="Bike type">
            <Tag label="All bikes" />
          </Variant>
        </Entry>

        <Entry
          name="Time slot"
          nodeId="6:14"
          description="A pickable day or drop-off time. Selected is the user's choice, Disabled is fully booked: hover or tap it to see the tooltip."
        >
          <Variant label="Default">
            <TimeSlot label="16:30" />
          </Variant>
          <Variant label="Selected">
            <TimeSlot label="16:30" state="Selected" />
          </Variant>
          <Variant label="Disabled">
            <TimeSlot label="16:30" state="Disabled" />
          </Variant>
        </Entry>

        <Entry
          name="Input"
          nodeId="6:23"
          description="Text field with a label above it. Focus shows the brand border. Error shows the error border and a message, for an empty or invalid required field."
        >
          <Variant label="Default">
            <div className="gallery-fixed-width">
              <Input label="Your name" placeholder="First and last name" />
            </div>
          </Variant>
          <Variant label="Focus">
            <div className="gallery-fixed-width">
              <Input label="Your name" placeholder="First and last name" state="Focus" />
            </div>
          </Variant>
          <Variant label="Error">
            <div className="gallery-fixed-width">
              <Input label="Your name" placeholder="First and last name" error="Enter your name" />
            </div>
          </Variant>
        </Entry>

        <Entry
          name="Service card"
          nodeId="11:33"
          description="One service in the list on screen 01. Selected marks the user's choice. Hover over the Default card: it floats up. The Selected card doesn't."
        >
          <Variant label="Default">
            <div className="gallery-fixed-width">
              <ServiceCard
                title="Flat tyre repair"
                price="€15"
                description="Tube or tyre swap, any wheel size."
                duration="30 min"
              />
            </div>
          </Variant>
          <Variant label="Selected">
            <div className="gallery-fixed-width">
              <ServiceCard
                title="Flat tyre repair"
                price="€15"
                description="Tube or tyre swap, any wheel size."
                duration="30 min"
                state="Selected"
              />
            </div>
          </Variant>
        </Entry>

        <Entry name="Summary row" nodeId="11:34" description="One line of the booking summary on screen 03.">
          <Variant label="Default">
            <dl className="gallery-fixed-width gallery-dl">
              <SummaryRow label="Service" value="Flat tyre repair" />
            </dl>
          </Variant>
        </Entry>

        <Entry
          name="Top bar"
          nodeId="6:24"
          description="Screen header with a back arrow, the flow title and the step counter. Turn off Show back on the last screen."
        >
          <Variant label="Default">
            <div className="gallery-phone-width">
              <TopBar step="Step 1 of 3" onBack={() => {}} />
            </div>
          </Variant>
          <Variant label="Show back off">
            <div className="gallery-phone-width">
              <TopBar step="Booked" showBack={false} />
            </div>
          </Variant>
        </Entry>

        <Entry
          name="Success mark"
          nodeId="2016:83"
          description="Success signal at the top of the Booked screen. Pops in when the screen opens. Press Replay to watch it again."
        >
          <Variant label="Start → Done">
            <SuccessMarkDemo />
          </Variant>
        </Entry>

        <Entry
          name="Timeline"
          description="What happens next, on screen 04. Steps are Done, Next or Upcoming and fade in one after another. Code only, not in Figma yet."
        >
          <Variant label="Done, Next, Upcoming">
            <TimelineDemo />
          </Variant>
        </Entry>

        <Entry
          name="Action bar"
          nodeId="11:37"
          description="Bottom area of a screen with the main action. Change the label on the exposed Button."
        >
          <Variant label="Default">
            <div className="gallery-phone-width">
              <ActionBar label="Book this repair" />
            </div>
          </Variant>
        </Entry>
      </section>

      {/* Demo cards */}
      <section className="gallery__section" aria-labelledby="demo">
        <h2 className="gallery__section-title" id="demo">
          Demo cards
        </h2>

        <Entry
          name="Booking card"
          nodeId="3:34"
          description="Clean build: flexbox, tokens, and the Button and Tag components."
        >
          <Variant label="Clean">
            <div className="gallery-card-width">
              <BookingCard />
            </div>
          </Variant>
        </Entry>

        <Entry
          name="Booking card (sloppy)"
          nodeId="4:6"
          description="Frame 47 coded as-is: absolute positions and raw hex values. Don't reuse."
        >
          <Variant label="Sloppy">
            <BookingCardSloppy />
          </Variant>
        </Entry>
      </section>
    </div>
  )
}
