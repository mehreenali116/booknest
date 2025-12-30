# BookNest - Online Library Management System

A modern, user-friendly web application for managing book reservations and lending in a digital library.

## Features

- 📚 **Book Catalog**: Browse and search through the library's collection
- 🔍 **Search & Filter**: Filter books by title, author, or genre
- 📖 **Book Details**: View comprehensive book information, reviews, and ratings
- 🛒 **Reservation System**: Reserve books online with pickup dates and borrowing duration
- ✅ **Checkout**: Review reservations and confirm bookings
- 📊 **User Dashboard**: Track borrowed books, reservations, and wishlist
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **React 18+** with functional components and hooks
- **React Router v6+** for navigation
- **Context API** for state management
- **Tailwind CSS** for styling with Arden theme (green and lavender)
- **localStorage** for data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
booknest/
├── src/
│   ├── components/       # Reusable components
│   ├── context/          # Context providers for state management
│   ├── pages/            # Page components
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features Breakdown

### Home Page
- Grid layout displaying all books
- Search functionality (title/author)
- Category/genre filtering
- Featured books section
- New arrivals section

### Book Details
- Complete book information (ISBN, publisher, year, pages)
- Description/synopsis
- User reviews and ratings
- Reserve book functionality
- Add to wishlist

### Reservation System
- Add books to reservation cart
- Set pickup date (minimum 24 hours ahead)
- Choose borrowing duration (7, 14, or 21 days)
- Maximum 5 books per reservation
- Automatic due date calculation

### Checkout
- Review all reserved books
- Display pickup and due dates
- Late return policy information
- Terms and conditions acceptance

### User Dashboard
- Currently borrowed books with days remaining
- Active reservations
- Wishlist management
- Reservation history
- Total books borrowed counter
- Extend borrowing period (one-time, 7 days)
- Cancel reservations

### Additional Features
- Dark mode toggle (persists across sessions)
- Loading states and error handling
- Form validation
- Contact librarian form
- Responsive design (mobile-first)

## Color Theme

The application uses the Arden theme with:
- **Green**: Primary actions, availability status
- **Lavender**: Secondary elements, accents
- **Dark Mode**: Full support with theme persistence

## Data Persistence

All data is stored in localStorage:
- Books collection
- Reservation cart
- Borrowed books
- Wishlist
- Reservations
- User preferences (dark mode)

## Browser Support

Modern browsers that support ES6+ and localStorage.

## License

This project is created for educational purposes.

