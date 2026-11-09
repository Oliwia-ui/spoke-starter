import { useEffect, useRef, type ReactNode } from 'react'
import './Screen.css'

/**
 * Shared layout of the Figma screens (01, 02, 03):
 * Top bar, scrolling Content, Action bar pinned at the bottom.
 */
type ScreenProps = {
  topBar: ReactNode
  actionBar: ReactNode
  children: ReactNode
}

export function Screen({ topBar, actionBar, children }: ScreenProps) {
  return (
    <div className="screen">
      {topBar}
      <main className="screen__content">{children}</main>
      {actionBar}
    </div>
  )
}

/** The "Header" frame at the top of each screen's content. */
type ScreenHeaderProps = {
  title: string
  subtitle?: string
  /** Move focus to the title when shown, so screen readers announce it. */
  focusOnMount?: boolean
}

export function ScreenHeader({ title, subtitle, focusOnMount = false }: ScreenHeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (focusOnMount) titleRef.current?.focus()
  }, [focusOnMount])

  return (
    <div className="screen-header">
      <h1 className="screen-header__title" ref={titleRef} tabIndex={focusOnMount ? -1 : undefined}>
        {title}
      </h1>
      {subtitle && <p className="screen-header__subtitle">{subtitle}</p>}
    </div>
  )
}

/** A labelled group, like "Day" or "Drop-off time" on screen 02. */
type ScreenSectionProps = {
  label: string
  children: ReactNode
}

export function ScreenSection({ label, children }: ScreenSectionProps) {
  return (
    <section className="screen-section" role="radiogroup" aria-label={label}>
      <p className="screen-section__label">{label}</p>
      <div className="screen-section__items">{children}</div>
    </section>
  )
}

/** Small muted note under the content, for example "Ready the same day…". */
export function ScreenNote({ children }: { children: ReactNode }) {
  return <p className="screen-note">{children}</p>
}
