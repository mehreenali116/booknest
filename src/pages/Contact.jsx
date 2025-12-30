import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Valid email is required'
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      console.log('Form submitted:', formData)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-arden-green-700 dark:text-arden-green-400 text-center">
          Contact Librarian
        </h1>

        {submitted && (
          <div className="mb-6 p-4 bg-arden-green-100 dark:bg-arden-green-900 border-2 border-arden-green-500 rounded-lg">
            <p className="text-arden-green-800 dark:text-arden-green-200 font-semibold">
              ✅ Thank you! Your message has been sent. We'll get back to you soon.
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-arden-green-200 dark:border-arden-green-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-arden-green-700 dark:text-arden-green-400">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border-2 border-arden-green-300 rounded-lg focus:outline-none focus:border-arden-green-500 dark:bg-gray-700 dark:border-arden-green-600 dark:text-white"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-arden-green-700 dark:text-arden-green-400">
                Your Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border-2 border-arden-green-300 rounded-lg focus:outline-none focus:border-arden-green-500 dark:bg-gray-700 dark:border-arden-green-600 dark:text-white"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-arden-green-700 dark:text-arden-green-400">
                Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-2 border-2 border-arden-green-300 rounded-lg focus:outline-none focus:border-arden-green-500 dark:bg-gray-700 dark:border-arden-green-600 dark:text-white"
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-arden-green-700 dark:text-arden-green-400">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={6}
                className="w-full px-4 py-2 border-2 border-arden-green-300 rounded-lg focus:outline-none focus:border-arden-green-500 dark:bg-gray-700 dark:border-arden-green-600 dark:text-white"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-arden-green-600 text-white rounded-lg hover:bg-arden-green-700 font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-8 bg-arden-lavender-50 dark:bg-gray-700 rounded-lg p-6 border-2 border-arden-lavender-200 dark:border-arden-lavender-700">
          <h2 className="text-xl font-bold mb-4 text-arden-lavender-700 dark:text-arden-lavender-400">
            Library Information
          </h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p><strong>Email:</strong> librarian@booknest.com</p>
            <p><strong>Phone:</strong> (555) 123-4567</p>
            <p><strong>Hours:</strong> Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p><strong>Address:</strong> 123 Library Street, Book City, BC 12345</p>
          </div>
        </div>
      </div>
    </div>
  )
}
