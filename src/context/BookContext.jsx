import { createContext, useContext, useState, useEffect } from 'react'

const BookContext = createContext()

// Sample book data
const initialBooks = [
  {
    id: 1,
    title: "Nineteen Eighty-Four",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    isbn: "978-0-7432-7356-5",
    publisher: "Scribner",
    publicationYear: 1925,
    pageCount: 180,
    description: "Thematically, it centres on totalitarianism, mass surveillance and repressive regimentation of people and behaviours.",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    availability: 'Reserved',
    copiesAvailable: 3,
    totalCopies: 3,
    rating: 4.5,
    reviews: [
      { userName: "John Doe", rating: 5, comment: "A masterpiece!" },
      { userName: "Jane Smith", rating: 4, comment: "Beautifully written." }
    ]
  },
  {
    id: 2,
    title: "Animal Farm",
    author: "George Owell",
    genre: "Fiction",
    isbn: "978-0-06-231609-7",
    publisher: "Harper",
    publicationYear: 2014,
    pageCount: 443,
    description: "Animal Farm is a satirical allegorical dystopian novella, in the form of a beast fable",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    availability: "Available",
    copiesAvailable: 2,
    totalCopies: 2,
    rating: 4.7,
    reviews: [
      { userName: "Alice Brown", rating: 5, comment: "Eye-opening perspective on history." }
    ]
  },
  {
    id: 3,
    title: "I, Claudius",
    author: "Robert Graves",
    genre: "History",
    isbn: "978-0-201-89683-4",
    publisher: "Addison-Wesley",
    publicationYear: 1997,
    pageCount: 672,
    description: " Written in the form of an autobiography of the Roman Emperor Claudius, it tells the history of the Julio-Claudian dynasty ",
    coverImage: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
    availability: "Available",
    copiesAvailable: 0,
    totalCopies: 2,
    rating: 4.9,
    reviews: [
      { userName: "Tech Enthusiast", rating: 5, comment: "The bible of computer science." }
    ]
  },
  {
    id: 4,
    title: "In Cold Blood",
    author: "Bill Bryson",
    genre: "Non-Fiction",
    isbn: "978-0-553-10953-5",
    publisher: "Bantam Books",
    publicationYear: 1988,
    pageCount: 256,
    description: "using easily accessible language that appeals more to the general public than many other books dedicated to the subject. ",
    coverImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
    availability: "Available",
    copiesAvailable: 1,
    totalCopies: 1,
    rating: 4.6,
    reviews: []
  },
  {
    id: 5,
    title: "The Circle",
    author: "Dave Eggers",
    genre: "Technology",
    isbn: "978-0-345-38623-6",
    publisher: "Ballantine Books",
    publicationYear: 1962,
    pageCount: 511,
    description: "The novel chronicles tech worker Mae Holland as she joins a powerful Internet company.",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    availability: "Reserved",
    copiesAvailable: 1,
    totalCopies: 2,
    rating: 4.4,
    reviews: [
      { userName: "History Buff", rating: 4, comment: "Well-researched and engaging." }
    ]
  },
  {
    id: 6,
    title: "On The Origin Of Species",
    author: "Charles Darwin ",
    genre: "Science",
    isbn: "978-0-452-28423-4",
    publisher: "Signet Classics",
    publicationYear: 1949,
    pageCount: 328,
    description: "Charles Darwin's On The Origin of Species, in which he writes of his theories of evolution by natural selection, is one of the most important works of scientific study ever published.",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    availability: "Available",
    copiesAvailable: 4,
    totalCopies: 4,
    rating: 4.8,
    reviews: [
      { userName: "Reader", rating: 5, comment: "Timeless and relevant." }
    ]
  },
  {
    id: 7,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    isbn: "978-0-316-76948-0",
    publisher: "Little, Brown and Company",
    publicationYear: 1951,
    pageCount: 234,
    description: "A controversial novel about teenage rebellion and alienation, following Holden Caulfield's journey through New York City after being expelled from prep school.",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    availability: "Available",
    copiesAvailable: 2,
    totalCopies: 2,
    rating: 4.3,
    reviews: [
      { userName: "Book Lover", rating: 4, comment: "A classic coming-of-age story." }
    ]
  },
  {
    id: 8,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    isbn: "978-0-06-112008-4",
    publisher: "J.B. Lippincott & Co.",
    publicationYear: 1960,
    pageCount: 376,
    description: "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of Scout Finch.",
    coverImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=600&fit=crop",
    availability: "Available",
    copiesAvailable: 3,
    totalCopies: 3,
    rating: 4.7,
    reviews: [
      { userName: "Literature Fan", rating: 5, comment: "Powerful and moving narrative." },
      { userName: "Student", rating: 4, comment: "Required reading for everyone." }
    ]
  },
  {
    id: 9,
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    genre: "Science",
    isbn: "978-0-19-857519-1",
    publisher: "Oxford University Press",
    publicationYear: 1976,
    pageCount: 224,
    description: "A groundbreaking work that explains evolution from the gene's perspective, introducing concepts that revolutionized our understanding of natural selection.",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    availability: "Available",
    copiesAvailable: 2,
    totalCopies: 2,
    rating: 4.6,
    reviews: [
      { userName: "Science Enthusiast", rating: 5, comment: "Brilliant explanation of evolutionary biology." }
    ]
  },
  {
    id: 10,
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    genre: "History",
    isbn: "978-0-553-29698-2",
    publisher: "Bantam Books",
    publicationYear: 1947,
    pageCount: 283,
    description: "The diary of Anne Frank, a Jewish girl who hid from the Nazis during World War II. A poignant and powerful account of hope and resilience.",
    coverImage: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    availability: "Available",
    copiesAvailable: 1,
    totalCopies: 1,
    rating: 4.9,
    reviews: [
      { userName: "History Reader", rating: 5, comment: "A must-read for understanding history." },
      { userName: "Educator", rating: 5, comment: "Profound and deeply moving." }
    ]
  }
]

export function BookProvider({ children }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/books`)
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }
      const data = await response.json()

      if (data.length === 0) {
        await seedDatabase()
      } else {
        setBooks(data)
      }
    } catch (err) {
      console.error('Error fetching books:', err)
      setError(err.message)
      // Fallback to initialBooks if API fails
      setBooks(initialBooks)
    } finally {
      setLoading(false)
    }
  }

  const seedDatabase = async () => {
    try {
      console.log('Seeding database...')
      const promises = initialBooks.map(({ id, ...bookData }) =>
        fetch(`${API_BASE_URL}/api/books`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData),
        })
      )

      await Promise.all(promises)

      // Fetch again after seeding
      const response = await fetch(`${API_BASE_URL}/api/books`)
      const data = await response.json()
      setBooks(data)
    } catch (err) {
      console.error('Error seeding database:', err)
      setBooks(initialBooks)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])


  const [reservationCart, setReservationCart] = useState(() => {
    const saved = localStorage.getItem('reservationCart')
    return saved ? JSON.parse(saved) : []
  })

  const [borrowedBooks, setBorrowedBooks] = useState(() => {
    const saved = localStorage.getItem('borrowedBooks')
    return saved ? JSON.parse(saved) : []
  })

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  })

  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('reservations')
    return saved ? JSON.parse(saved) : []
  })

  const [totalBorrowed, setTotalBorrowed] = useState(() => {
    const saved = localStorage.getItem('totalBorrowed')
    return saved ? parseInt(saved) : 0
  })



  useEffect(() => {
    localStorage.setItem('reservationCart', JSON.stringify(reservationCart))
  }, [reservationCart])

  useEffect(() => {
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks))
  }, [borrowedBooks])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations))
  }, [reservations])

  useEffect(() => {
    localStorage.setItem('totalBorrowed', totalBorrowed.toString())
  }, [totalBorrowed])

  // Self-healing effect to fix broken image URLs from legacy data
  useEffect(() => {
    const hasBrokenImages = books.some(b =>
      b.coverImage?.includes('squarespace') ||
      b.coverImage?.includes('amazon') ||
      b.coverImage?.includes('m.media-amazon')
    )

    if (hasBrokenImages) {
      setBooks(books.map(book => {
        const correctBook = initialBooks.find(b => b.id === book.id)
        if (correctBook && (
          book.coverImage?.includes('squarespace') ||
          book.coverImage?.includes('amazon') ||
          book.coverImage?.includes('m.media-amazon')
        )) {
          return { ...book, coverImage: correctBook.coverImage }
        }
        return book
      }))
    }
  }, [books])

  const addToCart = (book, reservationData) => {
    if (reservationCart.length >= 5) {
      alert('You cannot reserve more than 5 books at a time.')
      return
    }
    setReservationCart([...reservationCart, { ...book, ...reservationData }])
  }

  const removeFromCart = (bookId) => {
    setReservationCart(reservationCart.filter(item => item.id !== bookId))
  }

  const clearCart = () => {
    setReservationCart([])
  }

  const addToWishlist = (book) => {
    if (!wishlist.find(b => b.id === book.id)) {
      setWishlist([...wishlist, book])
    }
  }

  const removeFromWishlist = (bookId) => {
    setWishlist(wishlist.filter(b => b.id !== bookId))
  }

  const completeReservation = async (reservationData) => {
    // Sync with backend
    try {
      const promises = reservationData.books.map(book =>
        fetch(`${API_BASE_URL}/api/reservations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookId: book.id,
            userName: reservationData.userInfo.fullName,
            reservationDate: book.pickupDate || new Date().toISOString()
          }),
        })
      )
      await Promise.all(promises)
    } catch (err) {
      console.error('Error syncing reservation to database:', err)
      // Continue with local state update so UI doesn't break
    }

    const reservationId = `RES-${Date.now()}`
    const newReservation = {
      id: reservationId,
      ...reservationData,
      createdAt: new Date().toISOString()
    }
    setReservations([...reservations, newReservation])

    // Update book availability
    const updatedBooks = books.map(book => {
      const inCart = reservationCart.find(item => item.id === book.id)
      if (inCart) {
        return {
          ...book,
          copiesAvailable: Math.max(0, book.copiesAvailable - 1),
          availability: book.copiesAvailable - 1 === 0 ? 'Reserved' : book.availability
        }
      }
      return book
    })
    setBooks(updatedBooks)

    clearCart()
    return reservationId
  }

  const cancelReservation = (reservationId) => {
    const reservation = reservations.find(r => r.id === reservationId)
    if (reservation) {
      setReservations(reservations.filter(r => r.id !== reservationId))

      // Update book availability
      const updatedBooks = books.map(book => {
        if (reservation.books.some(b => b.id === book.id)) {
          return {
            ...book,
            copiesAvailable: Math.min(book.totalCopies, book.copiesAvailable + 1),
            availability: book.copiesAvailable + 1 > 0 ? 'Available' : book.availability
          }
        }
        return book
      })
      setBooks(updatedBooks)
    }
  }

  const borrowBook = (book, dueDate) => {
    setBorrowedBooks([...borrowedBooks, { ...book, dueDate, borrowedDate: new Date().toISOString() }])
    setTotalBorrowed(totalBorrowed + 1)

    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        return {
          ...b,
          copiesAvailable: Math.max(0, b.copiesAvailable - 1),
          availability: b.copiesAvailable - 1 === 0 ? 'Borrowed' : b.availability
        }
      }
      return b
    })
    setBooks(updatedBooks)
  }

  const returnBook = (bookId) => {
    const book = borrowedBooks.find(b => b.id === bookId)
    setBorrowedBooks(borrowedBooks.filter(b => b.id !== bookId))

    const updatedBooks = books.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          copiesAvailable: Math.min(b.totalCopies, b.copiesAvailable + 1),
          availability: b.copiesAvailable + 1 > 0 ? 'Available' : b.availability
        }
      }
      return b
    })
    setBooks(updatedBooks)
  }

  const extendBorrowing = (bookId) => {
    setBorrowedBooks(borrowedBooks.map(book => {
      if (book.id === bookId && !book.extended) {
        const currentDueDate = new Date(book.dueDate)
        const newDueDate = new Date(currentDueDate.setDate(currentDueDate.getDate() + 7))
        return { ...book, dueDate: newDueDate.toISOString(), extended: true }
      }
      return book
    }))
  }

  return (
    <BookContext.Provider value={{
      books,
      loading,
      error,
      setBooks,
      reservationCart,
      addToCart,
      removeFromCart,
      clearCart,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      borrowedBooks,
      borrowBook,
      returnBook,
      extendBorrowing,
      reservations,
      completeReservation,
      cancelReservation,
      totalBorrowed
    }}>
      {children}
    </BookContext.Provider>
  )
}

export function useBooks() {
  return useContext(BookContext)
}