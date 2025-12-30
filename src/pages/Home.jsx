import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useBooks } from '../context/BookContext'
import BookCard from '../components/BookCard'

export default function Home() {
  const { books } = useBooks()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')

  // Extract unique genres from books
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(books.map(book => book.genre))]
    return ['All', ...uniqueGenres.sort()]
  }, [books])

  // Filter books based on search and genre
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre
      return matchesSearch && matchesGenre
    })
  }, [books, searchTerm, selectedGenre])

  // Count books per genre for display
  const genreCounts = useMemo(() => {
    const counts = {}
    books.forEach(book => {
      counts[book.genre] = (counts[book.genre] || 0) + 1
    })
    return counts
  }, [books])

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre)
    setSearchTerm('') // Clear search when selecting genre
  }

  const clearFilters = () => {
    setSelectedGenre('All')
    setSearchTerm('')
  }

  const isFiltering = searchTerm !== '' || selectedGenre !== 'All'

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-arden-green-700 dark:text-arden-green-400 mb-8 text-center">
        Welcome to BookNest
      </h1>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-arden-green-300 rounded-lg focus:outline-none focus:border-arden-green-500 dark:bg-gray-800 dark:border-arden-green-600 dark:text-white"
          />
          {isFiltering && (
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-arden-lavender-500 text-white rounded-lg hover:bg-arden-lavender-600 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Genre Category Filter */}
        <div>
          <h3 className="text-lg font-semibold text-arden-green-700 dark:text-arden-green-400 mb-3">
            Browse by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => handleGenreClick(genre)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedGenre === genre
                    ? 'bg-arden-green-600 text-white shadow-lg scale-105'
                    : 'bg-arden-lavender-100 text-arden-lavender-700 hover:bg-arden-lavender-200 dark:bg-gray-700 dark:text-arden-lavender-300 dark:hover:bg-gray-600'
                }`}
              >
                {genre}
                {genre !== 'All' && genreCounts[genre] && (
                  <span className="ml-2 text-sm opacity-75">
                    ({genreCounts[genre]})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Display */}
        {isFiltering && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Active filters:</span>
            {searchTerm && (
              <span className="px-3 py-1 bg-arden-green-100 text-arden-green-700 rounded-full dark:bg-gray-700 dark:text-arden-green-300">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedGenre !== 'All' && (
              <span className="px-3 py-1 bg-arden-lavender-100 text-arden-lavender-700 rounded-full dark:bg-gray-700 dark:text-arden-lavender-300">
                Genre: {selectedGenre}
              </span>
            )}
          </div>
        )}
      </div>

      {/* All Books */}
      <section>
        <h2 className="text-2xl font-bold text-arden-green-700 dark:text-arden-green-400 mb-4">
          {isFiltering ? (
            <>
              Search Results
              <span className="ml-2 text-lg font-normal text-gray-600 dark:text-gray-400">
                ({filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found)
              </span>
            </>
          ) : (
            'All Books'
          )}
        </h2>
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            <p className="text-xl mb-4">No books found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-arden-green-500 text-white rounded-lg hover:bg-arden-green-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredBooks.slice(0, 10).map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}