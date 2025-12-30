import { useBooks } from '../context/BookContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { borrowedBooks, wishlist, reservations, extendBorrowing, returnBook, cancelReservation, removeFromWishlist, totalBorrowed } = useBooks()

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const activeReservations = reservations.filter(r => {
    const pickupDate = new Date(r.books[0]?.pickupDate || r.createdAt)
    const daysSinceReservation = Math.floor((new Date() - pickupDate) / (1000 * 60 * 60 * 24))
    // Show reservation if date calculation fails or if it's within the 7-day window
    return isNaN(daysSinceReservation) || daysSinceReservation < 7
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-arden-green-700 dark:text-arden-green-400">
        My Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-arden-green-500 to-arden-green-600 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-sm font-semibold mb-2">Total Borrowed</h3>
          <p className="text-3xl font-bold">{totalBorrowed}</p>
        </div>
        <div className="bg-gradient-to-br from-arden-lavender-500 to-arden-lavender-600 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-sm font-semibold mb-2">Currently Borrowed</h3>
          <p className="text-3xl font-bold">{borrowedBooks.length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-sm font-semibold mb-2">Active Reservations</h3>
          <p className="text-3xl font-bold">{activeReservations.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
          <h3 className="text-sm font-semibold mb-2">Wishlist</h3>
          <p className="text-3xl font-bold">{wishlist.length}</p>
        </div>
      </div>

      {/* Currently Borrowed Books */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-arden-green-700 dark:text-arden-green-400">
          Currently Borrowed Books
        </h2>
        {borrowedBooks.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center border-2 border-arden-green-200 dark:border-arden-green-700">
            <p className="text-gray-600 dark:text-gray-400">You don't have any borrowed books at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {borrowedBooks.map((book) => {
              const daysRemaining = calculateDaysRemaining(book.dueDate)
              const isOverdue = daysRemaining < 0

              return (
                <div
                  key={book.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-arden-green-200 dark:border-arden-green-700"
                >
                  <div className="flex gap-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-20 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
                      <p className={`text-sm font-semibold mb-2 ${isOverdue ? 'text-red-600' : daysRemaining <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {isOverdue
                          ? `Overdue by ${Math.abs(daysRemaining)} days`
                          : `${daysRemaining} days remaining`
                        }
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                        Due: {new Date(book.dueDate).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        {!book.extended && !isOverdue && (
                          <button
                            onClick={() => extendBorrowing(book.id)}
                            className="px-3 py-1 text-xs bg-arden-lavender-600 text-white rounded hover:bg-arden-lavender-700"
                          >
                            Extend (7 days)
                          </button>
                        )}
                        {book.extended && (
                          <span className="px-3 py-1 text-xs bg-gray-400 text-white rounded">
                            Extended
                          </span>
                        )}
                        <button
                          onClick={() => returnBook(book.id)}
                          className="px-3 py-1 text-xs bg-arden-green-600 text-white rounded hover:bg-arden-green-700"
                        >
                          Return
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Active Reservations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-arden-lavender-700 dark:text-arden-lavender-400">
          Active Reservations
        </h2>
        {activeReservations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center border-2 border-arden-lavender-200 dark:border-arden-lavender-700">
            <p className="text-gray-600 dark:text-gray-400">You don't have any active reservations.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-arden-lavender-200 dark:border-arden-lavender-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Reservation ID: {reservation.id}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Created: {new Date(reservation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => cancelReservation(reservation.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  >
                    Cancel
                  </button>
                </div>
                <div className="space-y-2">
                  {reservation.books.map((book) => {
                    const pickupDate = new Date(book.pickupDate)
                    return (
                      <div key={book.id} className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-16 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">{book.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">by {book.author}</p>
                          <p className="text-sm mt-1">
                            <strong>Pickup:</strong> {pickupDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Wishlist */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-arden-lavender-700 dark:text-arden-lavender-400">
          My Wishlist
        </h2>
        {wishlist.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center border-2 border-arden-lavender-200 dark:border-arden-lavender-700">
            <p className="text-gray-600 dark:text-gray-400">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.map((book) => (
              <div
                key={book.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-2 border-arden-lavender-200 dark:border-arden-lavender-700"
              >
                <div className="flex gap-4">
                  <Link to={`/book/${book.id}`}>
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-16 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/book/${book.id}`}>
                      <h3 className="font-bold hover:text-arden-green-600 dark:hover:text-arden-green-400">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {book.author}</p>
                    <button
                      onClick={() => removeFromWishlist(book.id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Borrowing History */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-arden-green-700 dark:text-arden-green-400">
          Reservation History
        </h2>
        {reservations.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center border-2 border-arden-green-200 dark:border-arden-green-700">
            <p className="text-gray-600 dark:text-gray-400">No reservation history yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-arden-green-200 dark:border-arden-green-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold">Reservation ID: {reservation.id}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Date: {new Date(reservation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reservation.books.map((book) => (
                    <div key={book.id} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-12 h-18 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-sm">{book.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">by {book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
