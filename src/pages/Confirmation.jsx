import { useParams, useNavigate } from 'react-router-dom'
import { useBooks } from '../context/BookContext'

export default function Confirmation() {
  const { reservationId } = useParams()
  const { reservations } = useBooks()
  const navigate = useNavigate()
  const reservation = reservations.find(r => r.id === reservationId)

  if (!reservation) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Reservation not found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-arden-green-600 text-white rounded-lg hover:bg-arden-green-700"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-arden-green-200 dark:border-arden-green-700">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-arden-green-700 dark:text-arden-green-400 mb-2">
            Reservation Confirmed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your reservation has been successfully processed
          </p>
        </div>

        <div className="bg-arden-green-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-arden-green-700 dark:text-arden-green-400">
            Reservation Details
          </h2>
          <div className="space-y-2">
            <p><strong>Reservation ID:</strong> {reservation.id}</p>
            <p><strong>Name:</strong> {reservation.userInfo.fullName}</p>
            <p><strong>Email:</strong> {reservation.userInfo.email}</p>
            <p><strong>Member ID:</strong> {reservation.userInfo.membershipId}</p>
            <p><strong>Reservation Date:</strong> {new Date(reservation.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-arden-lavender-700 dark:text-arden-lavender-400">
            Reserved Books
          </h2>
          <div className="space-y-4">
            {reservation.books.map((book) => {
              const pickupDate = new Date(book.pickupDate)
              const dueDate = new Date(book.dueDate)
              
              return (
                <div key={book.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{book.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">by {book.author}</p>
                    <div className="mt-2 text-sm space-y-1">
                      <p><strong>Pickup Date:</strong> {pickupDate.toLocaleDateString()}</p>
                      <p><strong>Due Date:</strong> {dueDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-arden-lavender-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <h3 className="font-bold mb-2">📧 Email Confirmation</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            A confirmation email has been sent to <strong>{reservation.userInfo.email}</strong> with all the details of your reservation.
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Important:</strong> Please bring your library membership ID when picking up your books. 
            Books must be picked up within 7 days of the reservation date, or the reservation will be cancelled.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex-1 px-6 py-3 bg-arden-green-600 text-white rounded-lg hover:bg-arden-green-700 font-semibold transition-colors"
          >
            View Dashboard
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-3 bg-arden-lavender-600 text-white rounded-lg hover:bg-arden-lavender-700 font-semibold transition-colors"
          >
            Browse More Books
          </button>
        </div>
      </div>
    </div>
  )
}
