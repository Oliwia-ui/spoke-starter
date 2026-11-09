# Spoke design system

Everything you need to build Spoke from the Figma file without guessing. This was extracted from Figma variables, text styles, and component definitions.

- **Figma file:** [Spoke booking card, sloppy vs clean](https://www.figma.com/design/KclDEc71ziHXMHyVvPn3P0/Demo--Spoke-booking-card--sloppy-vs-clean--Copy-?node-id=0-1)
- **File key:** `KclDEc71ziHXMHyVvPn3P0`
- **Pages:** `Sloppy vs clean` (0:1) and `Spoke starter kit` (6:5)
- **Extracted:** 2026-11-09

> If Figma and this file disagree, Figma wins. Re-extract the values and update this file.

---

## 1. Rules

These come from the Figma brief and `AGENTS.md`:

1. **Use tokens for every colour, spacing, and radius value.** Don't hardcode hex or px values in components.
2. **Reuse components** from `src/components/` before adding new ones.
3. **Name components after their Figma component**, for example `Button`, `Tag`, `TimeSlot`, `ServiceCard`.
4. **Build from Figma frame links, not screenshots**, using the Figma MCP server.
5. **Use flex or grid layout to mirror Figma auto layout.** Don't position anything absolutely.
6. **Name things for what they are.** Use `Header`, `Meta`, or `Service list`, not `Frame 47` or `Text 3`.

---

## 2. Design tokens

### Colour

| Figma variable | CSS token | Hex | Used for |
|---|---|---|---|
| `color/surface` | `--color-surface` | `#ffffff` | Card, screen, top bar, and action bar backgrounds; Secondary button; default Time slot |
| `color/text/primary` | `--color-text-primary` | `#1a1a1a` | Titles, prices, field labels, body text on light backgrounds |
| `color/text/muted` | `--color-text-muted` | `#6b6660` | Descriptions, captions, placeholders, step counter, summary labels |
| `color/border` | `--color-border` | `#e4e0d8` | 1px borders on cards, inputs, slots, and bars |
| `color/brand` | `--color-brand` | `#e8552b` | Primary button, selected Time slot, focus and selected borders (2px) |
| `color/on-brand` | `--color-on-brand` | `#ffffff` | Text on brand backgrounds |
| `color/tag/background` | `--color-tag-background` | `#fcebe4` | Tag fill |
| `color/tag/text` | `--color-tag-text` | `#b23e16` | Tag label |
| `color/error` | `--color-error` | `#c81e1e` | Input error border and message |

### Spacing

| Figma variable | CSS token | Value |
|---|---|---|
| `space/4` | `--space-4` | 4px |
| `space/8` | `--space-8` | 8px |
| `space/12` | `--space-12` | 12px |
| `space/16` | `--space-16` | 16px |
| `space/20` | `--space-20` | 20px |
| `space/24` | `--space-24` | 24px |

### Radius

| Figma variable | CSS token | Value | Used for |
|---|---|---|---|
| `radius/md` | `--radius-md` | 12px | Button, Time slot, Input field |
| `radius/lg` | `--radius-lg` | 16px | Booking card, Service card, Summary box |
| `radius/pill` | `--radius-pill` | 999px | Tag |

### Border widths

These aren't Figma variables, but they're used consistently:

| Use | Width |
|---|---|
| Default border (`color/border`) | 1px |
| Focus or selected border (`color/brand`) | 2px |

### Typography

All text uses **Inter** with letter spacing 0.

| Figma text style | Size / line height | Weight | Used for |
|---|---|---|---|
| `Screen/Title` | 28 / 34 | 600 Semi Bold | Screen headings ("Choose a service") |
| `Card/Title` | 20 / 28 | 600 Semi Bold | Card titles, prices, top bar title |
| `Card/Body` | 15 / 22 | 400 Regular | Descriptions, input text and placeholders, summary values |
| `Card/Caption` | 14 / 20 | 400 Regular | Notes, step counter, "Next free slot", summary labels |
| `Label/Button` | 16 / 24 | 600 Semi Bold | Button labels |
| `Label/Field` | 14 / 20 | 500 Medium | Input labels, section labels ("Day"), Time slot labels |
| `Label/Tag` | 13 / 18 | 500 Medium | Tag labels |

### Opacity

| Use | Value |
|---|---|
| Disabled Time slot | `opacity: 0.5` |

---

## 3. `src/styles/tokens.css`

The tokens live in [`src/styles/tokens.css`](src/styles/tokens.css), which is imported in `src/main.tsx`. Inter is loaded in `index.html`. This is the full set, for reference:

```css
:root {
  /* Colour */
  --color-surface: #ffffff;
  --color-text-primary: #1a1a1a;
  --color-text-muted: #6b6660;
  --color-border: #e4e0d8;
  --color-brand: #e8552b;
  --color-on-brand: #ffffff;
  --color-tag-background: #fcebe4;
  --color-tag-text: #b23e16;
  --color-error: #c81e1e;

  /* Spacing */
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;

  /* Radius */
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* Border */
  --border-width: 1px;
  --border-width-strong: 2px;

  /* Typography */
  --font-family: 'Inter', system-ui, sans-serif;

  --font-screen-title: 600 28px/34px var(--font-family);
  --font-card-title: 600 20px/28px var(--font-family);
  --font-card-body: 400 15px/22px var(--font-family);
  --font-card-caption: 400 14px/20px var(--font-family);
  --font-label-button: 600 16px/24px var(--font-family);
  --font-label-field: 500 14px/20px var(--font-family);
  --font-label-tag: 500 13px/18px var(--font-family);

  --letter-spacing: 0;

  /* State */
  --opacity-disabled: 0.5;
}
```

Use the shorthand like this: `font: var(--font-card-title);`

The `font` shorthand doesn't reset letter spacing, so also set `letter-spacing: var(--letter-spacing);` on a component's root.

> `src/index.css` is still the Vite starter. It sets 0.18px letter spacing on `:root`, adds `h1`/`h2` styles, and switches to a dark background in dark mode. Components must reset letter spacing (see above) until it's cleaned up.

---

## 4. Components

These live on the `Spoke starter kit` page in the `Components` section (3:25). Build each one in `src/components/<Name>.tsx` with a matching `<Name>.css`.

### Build status

| Component | Figma node | Code | Status |
|---|---|---|---|
| Button | `3:33` | [`Button.tsx`](src/components/Button.tsx) | ✅ Built |
| Tag | `3:27` | [`Tag.tsx`](src/components/Tag.tsx) | ✅ Built |
| Booking card (demo) | `3:34` | [`BookingCard.tsx`](src/components/BookingCard.tsx) | ✅ Built |
| Booking card, sloppy (demo) | `4:6` | [`BookingCardSloppy.tsx`](src/components/BookingCardSloppy.tsx) | ✅ Built as-is, don't reuse |
| Time slot | `6:14` | [`TimeSlot.tsx`](src/components/TimeSlot.tsx) | ✅ Built |
| Input | `6:23` | [`Input.tsx`](src/components/Input.tsx) | ✅ Built |
| Top bar | `6:24` | [`TopBar.tsx`](src/components/TopBar.tsx) | ✅ Built |
| Service card | `11:33` | [`ServiceCard.tsx`](src/components/ServiceCard.tsx) | ✅ Built |
| Summary row | `11:34` | [`SummaryRow.tsx`](src/components/SummaryRow.tsx) | ✅ Built |
| Action bar | `11:37` | [`ActionBar.tsx`](src/components/ActionBar.tsx) | ✅ Built |
| Success mark | `2016:83` | n/a | Designed in Figma, to build |

| Screen | Figma node | Code | Status |
|---|---|---|---|
| 01 Choose a service | `7:114` | [`ChooseService.tsx`](src/screens/ChooseService.tsx) | ✅ Built |
| 02 Pick a slot | `7:121` | [`PickSlot.tsx`](src/screens/PickSlot.tsx) | ✅ Built |
| 03 Confirm | `7:128` | [`Confirm.tsx`](src/screens/Confirm.tsx) | ✅ Built |
| 04 Booked | `2017:77` | [`Booked.tsx`](src/screens/Booked.tsx) | Designed in Figma. Code is still the old placeholder, to update |

Update this table when you build something.

**Component gallery:** run `npm run dev` and open **http://localhost:5173/#/components**. It shows every foundation (with the live values from `tokens.css`) and every component in every state, each linked to its Figma node so you can compare. When you add or change a component, add it to [`src/pages/ComponentGallery.tsx`](src/pages/ComponentGallery.tsx) too.

**Code structure:**
- `src/components/`: one file per Figma component, plus its `.css`.
- `src/pages/ComponentGallery.tsx`: the gallery page above.
- `src/screens/`: one file per Figma screen. `Screen.tsx` holds the shared layout (Top bar, scrolling Content, Action bar) and the Header, Section and Note pieces.
- `src/data/booking.ts`: services, days and times from the brief and screen 02.
- `src/App.tsx`: the flow state (step, service, day, time). The defaults match the Figma screens: Flat tyre repair, Today, 16:30.

**Deliberate differences from Figma:**
- Selected Service card, selected Time slot and focused Input keep the same outer size as the default state. In Figma they grow or shrink by 2px. Matching that would make the layout jump when you click.
- Input focus comes from the browser's `:focus`, not a prop.

### Button (`3:33`)
*"Primary for the main action on a card, Secondary for anything else."*

| Prop | Values |
|---|---|
| `label` | string, default "Book this repair" |
| `variant` | `Primary` \| `Secondary` |
| `fullWidth` | boolean (code only), stretches to the container |

Code usage: `<Button label="Continue" variant="Primary" fullWidth onClick={...} />`

| Part | Primary (`3:29`) | Secondary (`3:31`) |
|---|---|---|
| Background | `--color-brand` | `--color-surface` |
| Border | none | 1px `--color-border` |
| Text | `--color-on-brand`, `Label/Button` | `--color-text-primary`, `Label/Button` |
| Padding | `--space-12` vertical, `--space-20` horizontal | same |
| Radius | `--radius-md` | same |
| Layout | Centred. Height is 48px when full width | same |

### Tag (`3:27`)
*"Small label for service facts such as duration or bike type."*

| Prop | Values |
|---|---|
| `label` | string, for example "30 min", "All bikes" |

- Background `--color-tag-background`, text `--color-tag-text`, `Label/Tag`
- Padding `--space-4` vertical, `--space-12` horizontal
- Radius `--radius-pill`. Height is 26px.

### Time slot (`6:14`)
*"A pickable day or drop-off time. Selected is the user's choice, Disabled is fully booked."*

| Prop | Values |
|---|---|
| `label` | string, for example "16:30", "Today" |
| `state` | `Default` \| `Selected` \| `Disabled` |

| Part | Default (`6:8`) | Selected (`6:10`) | Disabled (`6:12`) |
|---|---|---|---|
| Background | `--color-surface` | `--color-brand` | `--color-surface` |
| Border | 1px `--color-border` | none | 1px `--color-border` |
| Text colour | `--color-text-primary` | `--color-on-brand` | `--color-text-muted` |
| Opacity | 1 | 1 | `0.5` |

- Text style `Label/Field`, padding `--space-12` vertical, `--space-16` horizontal, radius `--radius-md`
- **In code:** use a `<button>`. Set `aria-pressed` on Selected and `disabled` on Disabled.

### Input (`6:23`)
*"Text field with a label above it. Focus shows the brand border."*

| Prop | Values |
|---|---|
| `label` | string, for example "Your name" |
| `placeholder` | string, for example "First and last name" |
| `state` | `Default` \| `Focus` (in code, use `:focus` / `:focus-visible`, not a prop) |

- Column layout with gap `--space-8`
- Label: `Label/Field`, `--color-text-primary`
- Field: `--color-surface` background, padding `--space-12` vertical and `--space-16` horizontal, radius `--radius-md`
  - Default: 1px `--color-border`
  - Focus: 2px `--color-brand`
- Placeholder and value: `Card/Body`, placeholder in `--color-text-muted`
- The placeholder disappears as soon as the field is focused. In Figma, the Focus variant hides the placeholder (opacity 0, so the field keeps its height) and shows a 1×20 "Cursor" in `color/text/primary`.
- **In code:** use a real `<label>` and `<input>` with matching `id` and `htmlFor`.

**Error state** (`State=Error`, node `2009:76`, Figma text property "Error message"): pass `error="Enter your name"`.
- Field: 2px `--color-error` border, which stays red while focused. The size doesn't change.
- Message under the field: `Card/Caption`, `--color-error`, gap `--space-8`.
- Sets `aria-invalid` and links the message with `aria-describedby`.
- On screen 03, pressing **Confirm booking** with an empty name or phone shows "Enter your name" or "Enter your phone number" and focuses the first empty field. The error clears as soon as you type.
- In Figma: a 2px inside stroke bound to `color/error`, and an "Error message" text layer in `Card/Caption`, also bound to `color/error`. The swatch is in Foundations, Colour.

### Top bar (`6:24`)
*"Screen header with a back arrow, the flow title and the step counter."*

| Prop | Values |
|---|---|
| `title` | string, default "Book a repair" |
| `step` | string, for example "Step 1 of 3" |

- Row layout: gap `--space-12`, padding `--space-16` vertical and `--space-20` horizontal, items centred
- Background `--color-surface`, **bottom** border 1px `--color-border`
- Back icon: `src/assets/icons/chevron-left.svg` (24×24, stroke `#1a1a1a`, width 2). Use a `<button aria-label="Back">`.
- Title: `Card/Title`, `--color-text-primary`, fills the remaining width
- Step: `Card/Caption`, `--color-text-muted`
- **Show back** (boolean, default on): turn it off on the last screen (04 Booked), where going back makes no sense. In code, leave out `onBack` to hide the arrow.

### Success mark (`2016:83`)
*"Success signal at the top of the Booked screen. Start pops into Done automatically when the screen opens."*

| Part | Value |
|---|---|
| Size | 64 × 64 |
| Circle | `--color-tag-background` |
| Check | 3.5px round stroke, `--color-brand` |
| States | `Start` (circle 24px, invisible) → `Done` (circle 64px, visible) |
| Animation | After 150ms, Smart Animate with a gentle spring, about 450ms |

- On the Figma canvas, screen 04 shows the mark in its invisible **Start** state. Press **Present** from screen 03 to see it pop in.
- **In code:** scale from about 0.4 and fade in, with a soft overshoot. With `prefers-reduced-motion`, show it straight away without moving. Give it `role="img"` and `aria-label="Booking confirmed"`.

### Service card (`11:33`)
*"One service in the list on screen 01. Selected marks the user's choice."*

| Prop | Values |
|---|---|
| `title` | string |
| `price` | string, for example "€15" |
| `description` | string |
| `duration` | string, shown as a Tag |
| `state` | `Default` \| `Selected` |

- Column layout with gap `--space-8`, padding `--space-16`, radius `--radius-lg`, background `--color-surface`
- Default: 1px `--color-border`. Selected: 2px `--color-brand`.
- Header row: title on the left (fills the width) and price on the right, both `Card/Title` in `--color-text-primary`, gap `--space-12`
- Description: `Card/Body`, `--color-text-muted`
- Tags row: gap `--space-8`, contains one Tag (duration)
- **In code:** make it selectable, either a `<button>` or a radio input styled as a card.

**Hover** (`State=Hover`, node `2010:76`): an **unselected** card floats up `--lift-hover` (4px) with `--shadow-raised`, over `--duration-fast` (180ms) with `--ease-out`, and settles back when pressed. **The selected card doesn't float.**
- Code: only on devices with a real hover (`@media (hover: hover)`). With `prefers-reduced-motion` the card doesn't move but keeps the shadow.
- Figma: the effect style `Elevation/Raised` (0 8 20 at 10% `#1a1a1a`, plus 0 2 6 at 6%) is on the Hover variant. `State=Default` has a "While hovering" interaction, Change to Hover with Smart Animate, 180ms, bezier(0.2, 0, 0, 1). `State=Selected` has no interaction. The 4px lift exists only in code; Figma shows the shadow.

### Summary row (`11:34`)
*"One line of the booking summary on screen 03."*

| Prop | Values |
|---|---|
| `label` | string, for example "Service" |
| `value` | string, for example "Flat tyre repair" |

- Row layout, `justify-content: space-between`, baseline aligned, gap `--space-16`
- Label: `Card/Caption`, `--color-text-muted`
- Value: `Card/Body`, `--color-text-primary`

### Action bar (`11:37`)
*"Bottom area of a screen with the main action. Change the label on the exposed Button."*

| Prop | Values |
|---|---|
| `label` | string, passed to the Button |

- Background `--color-surface`, **top** border 1px `--color-border`
- Padding `--space-16` vertical, `--space-20` horizontal
- Contains one full-width **Primary Button**
- Pinned to the bottom of the screen

### Booking card (`3:34`, on the `Sloppy vs clean` page)

This is a demo card, not a library component. It shows how the pieces combine. In code it's `<BookingCard />`, with props `title`, `description`, `tags`, `price`, `nextSlot`, `buttonLabel` and `onBook`.

- Column layout with gap `--space-16`, padding `--space-24`, radius `--radius-lg`, 1px `--color-border`, `--color-surface` background. It's 360px wide.
- **Header** (gap `--space-4`): title `Card/Title` "Flat tyre repair", description `Card/Body` muted
- **Meta** (space-between): Tags row (gap `--space-8`, "30 min", "All bikes") and price `Card/Title`
- **Next slot**: `Card/Caption` muted, "Next free slot: today at 16:30"
- **Button**: Primary, full width, "Book this repair"

---

## 5. Screens

These are in the `Screens` section (7:113). Each is a mobile frame, **390 × 844**.

### Shared screen layout

```
Screen (column, --color-surface, 1px --color-border)
├── Top bar
├── Content (column, flex: 1, padding --space-20, gap --space-16, scrolls)
│   └── Header (column, gap --space-4)
│       ├── Title    Screen/Title, text/primary
│       └── Subtitle Card/Body, text/muted   (optional)
└── Action bar
```

Section groups such as "Day" and "Drop-off time" are a column with gap `--space-8`. They have a `Label/Field` label in `text/primary`, then a **wrapping** row of items with gap `--space-8`.

### 01 Choose a service (`7:114`), build this first

- Top bar: "Book a repair" / "Step 1 of 3"
- Header: "Choose a service" / "What does your bike need?"
- Service list (column, gap `--space-12`):

| Service | Price | Description | Duration | Default state |
|---|---|---|---|---|
| Flat tyre repair | €15 | Tube or tyre swap, any wheel size. | 30 min | **Selected** |
| Brake check and adjust | €25 | Pads, cables and alignment. | 45 min | Default |
| Gear tune-up | €30 | Smooth shifting on every gear. | 45 min | Default |
| Full service | €89 | Everything checked, cleaned and adjusted. | 2 hours | Default |

- Action bar: "Continue"

### 02 Pick a slot (`7:121`)

- Top bar: "Book a repair" / "Step 2 of 3"
- Header: "Pick a drop-off time" / "Flat tyre repair, about 30 minutes"
- **Day**: Today (Selected), Tomorrow, Mon 16
- **Drop-off time**: 09:00 (Disabled), 10:30 (Disabled), 12:00, 14:00, 16:30 (Selected), 17:30
- Note (`Card/Caption`, muted): "Ready the same day. We text you when your bike is done."
- Action bar: "Continue"

### 03 Confirm (`7:128`)

- Top bar: "Book a repair" / "Step 3 of 3"
- Header: "Check and confirm" (no subtitle)
- **Summary** box: column, gap `--space-12`, padding `--space-16`, radius `--radius-lg`, 1px `--color-border`. It contains these Summary rows:
  - Service: Flat tyre repair
  - Drop-off: Today at 16:30
  - Price: €15, pay at pick-up
- Input: "Your name" / "First and last name"
- Input: "Phone number" / "+32 470 12 34 56" (shown in Focus state in Figma)
- Note (`Card/Caption`, muted): "We text you when your bike is ready. You pay when you pick it up."
- Action bar: "Confirm booking"

---

### 04 Booked (`2017:77`)

Built from the same pieces as 03, with no new layout:
- Top bar: "Book a repair" / "Booked", **Show back off**
- **Success mark** (pops in)
- Header: "You're all set, {first name}!" / "Your repair is booked. See you {day} at {time}."
- Summary: Service, Drop-off, Where, Price, Reference (for example `SPK-4821`)
- Button, Secondary, full width: "Add to calendar"
- Note: "We've sent a confirmation to {phone}. Need to change it? Reply to the text."
- Action bar: "Done"
- Prototype: on 03, **Confirm booking** navigates to 04 (dissolve, 200ms).
- **Still to decide:** the real shop address (now "Address to confirm") and how booking references are generated.

## 6. Content: services

These come from the brief and are the single source of truth for data:

```ts
export const services = [
  { id: 'flat-tyre',  title: 'Flat tyre repair',       price: 15, duration: '30 min',  description: 'Tube or tyre swap, any wheel size.' },
  { id: 'brakes',     title: 'Brake check and adjust', price: 25, duration: '45 min',  description: 'Pads, cables and alignment.' },
  { id: 'gears',      title: 'Gear tune-up',           price: 30, duration: '45 min',  description: 'Smooth shifting on every gear.' },
  { id: 'full',       title: 'Full service',           price: 89, duration: '2 hours', description: 'Everything checked, cleaned and adjusted.' },
];
```

Prices display as `€15` (euro sign, no space, no decimals).

---

## 7. Assets

| Asset | Path | Notes |
|---|---|---|
| Chevron left | `src/assets/icons/chevron-left.svg` | 24×24, from Figma `icon/chevron-left`. The stroke is hardcoded `#1A1A1A`. Switch it to `currentColor` if you need to recolour it. |

There are no images or other icons in the file.

---

## 8. Figma node ID reference

Use these with the Figma MCP (`get_design_context` with file key `KclDEc71ziHXMHyVvPn3P0`):

| What | Node ID |
|---|---|
| Brief | `7:6` |
| Foundations (swatches, type, spacing) | `7:26` |
| Components section | `3:25` |
| Button / Primary / Secondary | `3:33` / `3:29` / `3:31` |
| Tag | `3:27` |
| Time slot / Default / Selected / Disabled | `6:14` / `6:8` / `6:10` / `6:12` |
| Input / Default / Focus / Error | `6:23` / `6:15` / `6:19` / `2009:76` |
| Top bar | `6:24` |
| Service card / Default / Hover / Selected | `11:33` / `11:17` / `2010:76` / `11:25` |
| Summary row | `11:34` |
| Action bar | `11:37` |
| Screen 01 Choose a service | `7:114` |
| Screen 02 Pick a slot | `7:121` |
| Screen 03 Confirm | `7:128` |
| Screen 04 Booked | `2017:77` |
| Success mark / Start / Done | `2016:83` / `2016:77` / `2016:80` |
| Booking card (clean) | `3:34` |
| Booking card (sloppy, for comparison) | `4:6` |

---

## 9. Sloppy vs clean

The `Sloppy vs clean` page shows the same booking card built two ways. The sloppy version (`4:6`) has no auto layout, uses raw hex values, has layers called "Frame 47" and "Rectangle 12", and has no components. The generated code is all absolute positioning with hardcoded values. The clean version (`3:34`) gives tokenised, flexbox, component-based code. Figma notes the clean version uses:

- Auto layout everywhere
- Colours, spacing, and radius as variables
- Layers named for what they are
- Button and Tag components with a Label property

That's why the rules in section 1 exist. Useful material for `REFLECTION.md`.

Both are built in code and shown in `App.tsx`. They render identically and match Figma to the pixel, but compare the code:

- `BookingCardSloppy.css`: 10 absolutely positioned layers, about 20 hardcoded values, and a "button" that is a rectangle with text on top. Changing one word breaks the layout.
- `BookingCard.tsx`: flexbox, tokens only, a real `<button>`, reusable `Button` and `Tag` components, and content passed in as props.
