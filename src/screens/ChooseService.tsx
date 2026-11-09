import { ActionBar } from '../components/ActionBar'
import { ServiceCard } from '../components/ServiceCard'
import { TopBar } from '../components/TopBar'
import { formatPrice, services } from '../data/booking'
import { Screen, ScreenHeader } from './Screen'
import './ChooseService.css'

/** Figma: "01 Choose a service" (node 7:114). */
type ChooseServiceProps = {
  serviceId: string
  onSelect: (id: string) => void
  onContinue: () => void
}

export function ChooseService({ serviceId, onSelect, onContinue }: ChooseServiceProps) {
  return (
    <Screen
      topBar={<TopBar step="Step 1 of 3" />}
      actionBar={<ActionBar label="Continue" onClick={onContinue} />}
    >
      <ScreenHeader title="Choose a service" subtitle="What does your bike need?" />

      <div className="service-list" role="radiogroup" aria-label="Service">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            price={formatPrice(service.price)}
            description={service.description}
            duration={service.duration}
            state={service.id === serviceId ? 'Selected' : 'Default'}
            onSelect={() => onSelect(service.id)}
          />
        ))}
      </div>
    </Screen>
  )
}
