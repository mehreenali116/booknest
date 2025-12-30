import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooks } from '../context/BookContext'

export default function Checkout() {
  const { reservationCart, completeReservation } = useBooks()
  const navigate = useNavigate()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [errors, setErrors] = useState({})

  if (reservationCart.length === 0) {
    navigate('/cart')
    return null
  }

  const handleConfirm = async () => {
    if (!acceptedTerms) {
      setErrors({ terms: 'You must accept the terms and conditions' })
      return
    }

    const reservationData = {
      books: reservationCart,
      userInfo: {
        fullName: reservationCart[0].fullName,
        email: reservationCart[0].email,
        membershipId: reservationCart[0].membershipId
      }
    }

    const reservationId = await completeReservation(reservationData)
    navigate(`/confirmation/${reservationId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-arden-green-700 dark:text-arden-green-400">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-arden-green-200 dark:border-arden-green-700">
            <h2 className="text-xl font-bold mb-4 text-arden-green-700 dark:text-arden-green-400">
              Reservation Summary
            </h2>
            {reservationCart.map((item) => {
              const pickupDate = new Date(item.pickupDate)
              const dueDate = new Date(item.dueDate)

              return (
                <div key={item.id} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className="flex gap-4">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-20 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">by {item.author}</p>
                      <div className="mt-2 text-sm space-y-1">
                        <p><strong>Pickup:</strong> {pickupDate.toLocaleDateString()}</p>
                        <p><strong>Due:</strong> {dueDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-arden-lavender-200 dark:border-arden-lavender-700">
            <h2 className="text-xl font-bold mb-4 text-arden-lavender-700 dark:text-arden-lavender-400">
              Late Return Policy
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>• Fine: <strong>$2 per day per book</strong> for late returns</p>
              <p>• Books must be returned by the due date to avoid fines</p>
              <p>• You can extend your borrowing period once (7 days) if no one else has reserved the book</p>
              <p>• Damaged or lost books may incur additional charges</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-arden-lavender-200 dark:border-arden-lavender-700 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-arden-lavender-700 dark:text-arden-lavender-400">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              <p className="flex justify-between">
                <span>Total Books:</span>
                <span className="font-semibold">{reservationCart.length}</span>
              </p>
            </div>

            <div className="mb-4">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked)
                    setErrors({})
                  }}
                  className="mt-1"
                />
                <span className="text-sm">
                  I accept the terms and conditions and late return policy
                </span>
              </label>
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
              )}
            </div>

            <button
              onClick={handleConfirm}
              disabled={!acceptedTerms}
              className="w-full px-6 py-3 bg-arden-green-600 text-white rounded-lg hover:bg-arden-green-700 font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
