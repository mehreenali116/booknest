import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BookProvider } from './context/BookContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BookDetails from './pages/BookDetails'
import ReservationCart from './pages/ReservationCart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'

function App() {
  return (
    <ThemeProvider>
      <BookProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-arden-green-50 to-arden-lavender-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/cart" element={<ReservationCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation/:reservationId" element={<Confirmation />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Router>
      </BookProvider>
    </ThemeProvider>
  )
}

export default App
