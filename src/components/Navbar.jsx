import { Link } from 'react-router-dom'
import { useBooks } from '../context/BookContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { reservationCart } = useBooks()
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <nav className="bg-gradient-to-r from-arden-green-600 to-arden-lavender-600 dark:from-arden-green-800 dark:to-arden-lavender-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-arden-green-200 transition-colors">
             BookNest
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-arden-green-200 transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-arden-green-200 transition-colors">
              Dashboard
            </Link>
            <Link to="/contact" className="hover:text-arden-green-200 transition-colors">
              Contact
            </Link>
            <Link 
              to="/cart" 
              className="relative hover:text-arden-green-200 transition-colors"
            >
              Cart
              {reservationCart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-arden-lavender-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {reservationCart.length}
                </span>
              )}
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
