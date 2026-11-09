import { useEffect, useState } from 'react'
import { services } from './data/booking'
import { ComponentGallery } from './pages/ComponentGallery'
import { Booked } from './screens/Booked'
import { ChooseService } from './screens/ChooseService'
import { Confirm } from './screens/Confirm'
import { PickSlot } from './screens/PickSlot'
import './App.css'

type Step = 'service' | 'slot' | 'confirm' | 'booked'

// Defaults match the selections shown in the Figma screens.
const DEFAULT_SERVICE = services[0].id
const DEFAULT_DAY = 'Today'
const DEFAULT_TIME = '16:30'

/** Tiny hash router: /#/components shows the gallery, anything else the flow. */
function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function App() {
  const hash = useHash()
  if (hash.startsWith('#/components')) return <ComponentGallery />
  return <BookingFlow />
}

function BookingFlow() {
  const [step, setStep] = useState<Step>('service')
  const [serviceId, setServiceId] = useState(DEFAULT_SERVICE)
  const [day, setDay] = useState(DEFAULT_DAY)
  const [time, setTime] = useState(DEFAULT_TIME)
  const [name, setName] = useState('')

  const service = services.find((s) => s.id === serviceId) ?? services[0]

  const restart = () => {
    setServiceId(DEFAULT_SERVICE)
    setDay(DEFAULT_DAY)
    setTime(DEFAULT_TIME)
    setName('')
    setStep('service')
  }

  return (
    <div className="app">
      {step === 'service' && (
        <ChooseService
          serviceId={serviceId}
          onSelect={setServiceId}
          onContinue={() => setStep('slot')}
        />
      )}

      {step === 'slot' && (
        <PickSlot
          service={service}
          day={day}
          time={time}
          onDayChange={setDay}
          onTimeChange={setTime}
          onBack={() => setStep('service')}
          onContinue={() => setStep('confirm')}
        />
      )}

      {step === 'confirm' && (
        <Confirm
          service={service}
          day={day}
          time={time}
          onBack={() => setStep('slot')}
          onConfirm={(details) => {
            setName(details.name)
            setStep('booked')
          }}
        />
      )}

      {step === 'booked' && (
        <Booked service={service} day={day} time={time} name={name} onRestart={restart} />
      )}
    </div>
  )
}

export default App
