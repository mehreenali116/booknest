import { useParams, useNavigate } from 'react-router-dom'
import { useBooks } from '../context/BookContext'
import { useState } from 'react'

export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { books, addToCart, addToWishlist, wishlist } = useBooks()
  const book = books.find(b => b.id === parseInt(id))
  const [showReserveForm, setShowReserveForm] = useState(false)
  const [reservationData, setReservationData] = useState({
    fullName: '',
    email: '',
    membershipId: '',
    pickupDate: '',
    borrowingDuration: '7'
  })
  const [errors, setErrors] = useState({})

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Book not found</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-arden-lavender-600 text-white rounded-lg hover:bg-arden-lavender-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    )
  }

  const isInWishlist = wishlist.some(b => b.id === book.id)

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>⭐</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half">✨</span>)
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="opacity-30">⭐</span>)
    }

    return stars
  }

  const validateForm = () => {
    const newErrors = {}
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const minDate = tomorrow.toISOString().split('T')[0]

    if (!reservationData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!reservationData.email.trim() || !reservationData.email.includes('@')) {
      newErrors.email = 'Valid email is required'
    }
    if (!reservationData.membershipId.trim()) {
      newErrors.membershipId = 'Library membership ID is required'
    }
    if (!reservationData.pickupDate || reservationData.pickupDate < minDate) {
      newErrors.pickupDate = 'Pickup date must be at least 24 hours from now'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleReserve = () => {
    if (book.availability !== 'Available' || book.copiesAvailable === 0) {
      alert('This book is not available for reservation.')
      return
    }

    if (!validateForm()) {
      return
    }

    const pickupDate = new Date(reservationData.pickupDate)
    const dueDate = new Date(pickupDate)
    dueDate.setDate(dueDate.getDate() + parseInt(reservationData.borrowingDuration))

    addToCart(book, {
      ...reservationData,
      pickupDate: pickupDate.toISOString(),
      dueDate: dueDate.toISOString()
    })

    if (window.confirm('Book added to reservation cart! Would you like to proceed to checkout?')) {
      navigate('/cart')
    }
    setShowReserveForm(false)
    setReservationData({
      fullName: '',
      email: '',
      membershipId: '',
      pickupDate: '',
      borrowingDuration: '7'
    })
  }

  const handleWishlist = () => {
    if (isInWishlist) {
      alert('Book is already in your wishlist!')
    } else {
      addToWishlist(book)
      alert('Book added to wishlist!')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-arden-green-600 dark:text-arden-green-400 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-arden-green-700 dark:text-arden-green-400 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              by {book.author}
            </p>

            <div className="flex items-center gap-2 mb-4">
              {renderStars(book.rating)}
              <span className="text-lg font-semibold">{book.rating}/5</span>
            </div>

            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${book.availability === 'Available' ? 'bg-arden-green-500 text-white' :
                book.availability === 'Reserved' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                {book.availability}
              </span>
              <span className="ml-4 text-gray-600 dark:text-gray-400">
                {book.copiesAvailable} of {book.totalCopies} copies available
              </span>
            </div>

            <div className="mb-6 space-y-2">
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Publisher:</strong> {book.publisher}</p>
              <p><strong>Publication Year:</strong> {book.publicationYear}</p>
              <p><strong>Pages:</strong> {book.pageCount}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{book.description}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowReserveForm(!showReserveForm)}
                disabled={book.availability !== 'Available' || book.copiesAvailable === 0}
                className="px-6 py-2 bg-arden-green-600 text-white rounded-lg hover:bg-arden-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Reserve Book
              </button>
              <button
                onClick={handleWishlist}
                className="px-6 py-2 bg-arden-lavender-600 text-white rounded-lg hover:bg-arden-lavender-700 transition-colors"
              >
                {isInWishlist ? '✓ In Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>

        {/* Reservation Form */}
        {showReserveForm && (
          <div className="mt-8 p-6 bg-arden-green-50 dark:bg-gray-700 rounded-lg border-2 border-arden-green-300 dark:border-arden-green-600">
            <h3 className="text-xl font-bold mb-4 text-arden-green-700 dark:text-arden-green-400">
              Reservation Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Full Name *</label>
                <input
                  type="text"
                  value={reservationData.fullName}
                  onChange={(e) => setReservationData({ ...reservationData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Email *</label>
                <input
                  type="email"
                  value={reservationData.email}
                  onChange={(e) => setReservationData({ ...reservationData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Library Membership ID *</label>
                <input
                  type="text"
                  value={reservationData.membershipId}
                  onChange={(e) => setReservationData({ ...reservationData, membershipId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                {errors.membershipId && <p className="text-red-500 text-sm">{errors.membershipId}</p>}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Pickup Date *</label>
                <input
                  type="date"
                  value={reservationData.pickupDate}
                  onChange={(e) => setReservationData({ ...reservationData, pickupDate: e.target.value })}
                  min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                {errors.pickupDate && <p className="text-red-500 text-sm">{errors.pickupDate}</p>}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Borrowing Duration *</label>
                <select
                  value={reservationData.borrowingDuration}
                  onChange={(e) => setReservationData({ ...reservationData, borrowingDuration: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="21">21 days</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleReserve}
                className="px-6 py-2 bg-arden-green-600 text-white rounded-lg hover:bg-arden-green-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setShowReserveForm(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-arden-lavender-700 dark:text-arden-lavender-400">
            Reviews
          </h2>
          {book.reviews && book.reviews.length > 0 ? (
            <div className="space-y-4">
              {book.reviews.map((review, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{review.userName}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  )
}
