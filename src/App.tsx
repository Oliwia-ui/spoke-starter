import { BookingCard } from './components/BookingCard'
import { BookingCardSloppy } from './components/BookingCardSloppy'
import './App.css'

function App() {
  return (
    <main className="preview">
      <BookingCardSloppy />
      <BookingCard />
    </main>
  )
}

export default App
