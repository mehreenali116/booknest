import { useNavigate } from 'react-router-dom'
import { useBooks } from '../context/BookContext'

export default function ReservationCart() {
  const { reservationCart, removeFromCart } = useBooks()
  const navigate = useNavigate()

  if (reservationCart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center border-2 border-arden-green-200 dark:border-arden-green-700">
          <h2 className="text-2xl font-bold mb-4 text-arden-green-700 dark:text-arden-green-400">
            Your Reservation Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start adding books to your cart to reserve them!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-arden-green-600 text-white rounded-lg hover:bg-arden-green-700"
          >
            Browse Books
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-arden-green-700 dark:text-arden-green-400">
        Reservation Cart ({reservationCart.length} {reservationCart.length === 1 ? 'book' : 'books'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {reservationCart.map((item) => {
            const pickupDate = new Date(item.pickupDate)
            const dueDate = new Date(item.dueDate)
            
            return (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-arden-green-200 dark:border-arden-green-700"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-32 h-48 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-arden-green-700 dark:text-arden-green-400 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      by {item.author}
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Pickup Date:</strong> {pickupDate.toLocaleDateString()}</p>
                      <p><strong>Due Date:</strong> {dueDate.toLocaleDateString()}</p>
                      <p><strong>Borrowing Duration:</strong> {item.borrowingDuration} days</p>
                      <p><strong>Member ID:</strong> {item.membershipId}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-arden-lavender-200 dark:border-arden-lavender-700 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-arden-lavender-700 dark:text-arden-lavender-400">
              Cart Summary
            </h2>
            <div className="space-y-2 mb-4">
              <p className="flex justify-between">
                <span>Total Books:</span>
                <span className="font-semibold">{reservationCart.length}</span>
              </p>
            </div>
            <div className="mb-4 p-4 bg-arden-green-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm font-semibold mb-2">Late Return Policy:</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Fine: $2 per day per book for late returns
              </p>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full px-6 py-3 bg-arden-green-600 text-white rounded-lg hover:bg-arden-green-700 font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
