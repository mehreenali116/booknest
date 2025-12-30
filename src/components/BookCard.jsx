import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-arden-green-500'
      case 'Reserved':
        return 'bg-yellow-500'
      case 'Borrowed':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = []
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-[10px]">⭐</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-[10px]">✨</span>)
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="opacity-30 text-[10px]">⭐</span>)
    }
    
    return stars
  }

  return (
    <Link to={`/book/${book.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border-2 border-arden-green-200 dark:border-arden-green-700 hover:border-arden-lavender-400 dark:hover:border-arden-lavender-500">
        <div className="relative">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          <span className={`absolute top-1 right-1 ${getAvailabilityColor(book.availability)} text-white px-1.5 py-0.5 rounded text-[10px] font-semibold`}>
            {book.availability}
          </span>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-bold text-arden-green-700 dark:text-arden-green-400 mb-1 line-clamp-2 min-h-[2.5rem]">
            {book.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
            by {book.author}
          </p>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] bg-arden-lavender-100 dark:bg-arden-lavender-900 text-arden-lavender-700 dark:text-arden-lavender-300 px-1.5 py-0.5 rounded">
              {book.genre}
            </span>
            <div className="flex items-center gap-0.5">
              <div className="flex items-center gap-0.5 text-[10px]">
                {renderStars(book.rating)}
              </div>
              <span className="text-[10px] text-gray-600 dark:text-gray-400 ml-0.5">
                {book.rating}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 dark:text-gray-500">
            {book.copiesAvailable}/{book.totalCopies} copies
          </p>
        </div>
      </div>
    </Link>
  )
}
