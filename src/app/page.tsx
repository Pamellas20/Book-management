  "use client"

  import { useEffect, useState } from "react"
  import Link from "next/link"
  import { type Book, getAllBooks, deleteBook } from "@/lib/api"
  import { Plus, BookOpen, Trash2, SquarePen } from "lucide-react"

  export default function Home() {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [bookToDelete, setBookToDelete] = useState<string | null>(null)

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const data = await getAllBooks()
          setBooks(data)
          setLoading(false)
        } catch (err) {
          setError("Failed to load books. Please try again later.")
          setLoading(false)
        }
      }
      fetchBooks()
    }, [])

    const confirmDeleteBook = (id: string) => {
      setBookToDelete(id)
      setShowModal(true)
    }

    const handleDeleteBook = async () => {
      if (!bookToDelete) return
      try {
        await deleteBook(bookToDelete)
        setBooks(books.filter((book) => book._id !== bookToDelete))
        setShowModal(false)
        setBookToDelete(null)
      } catch (err) {
        setError("Failed to delete book. Please try again later.")
        setShowModal(false)
        setBookToDelete(null)
      }
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Book Collection</h1>
          <Link
            href="/add"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add New Book
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
        ) : books.length === 0 ? (
          <div className="border rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No books found</h2>
            <p className="text-gray-500 mb-6">Get started by adding your first book to the collection.</p>
            <Link
              href="/add"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Add New Book
            </Link>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <table className="hidden md:table min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-md font-medium capitalize tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-md font-medium capitalize tracking-wider">Author</th>
                  <th className="px-4 py-3 text-left text-md font-medium capitalize tracking-wider">ISBN</th>
                  <th className="px-4 py-3 text-left text-md font-medium capitalize tracking-wider">Published</th>
                  <th className="px-4 py-3 text-left text-md font-medium capitalize tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {books.map((book) => (
                  <tr key={book._id}>
                    <td className="px-4 py-3 text-gray-800 text-sm whitespace-nowrap">{book.title}</td>
                    <td className="px-4 py-3 text-gray-800 text-sm whitespace-nowrap">{book.author}</td>
                    <td className="px-4 py-3 text-gray-800 text-sm whitespace-nowrap">{book.isbn}</td>
                    <td className="px-4 py-3 text-gray-800 text-sm whitespace-nowrap">{book.publishedYear}</td>
                    <td className="px-4 py-3 whitespace-nowrap flex gap-2">
                      <Link href={`/view/${book._id}`} className="text-blue-600 hover:text-blue-800">
                        <BookOpen className="h-5 w-5" />
                      </Link>
                      <Link href={`/edit/${book._id}`} className="text-blue-600 hover:text-blue-800">
                        <SquarePen className="h-5 w-5" />
                      </Link>
                      <button onClick={() => confirmDeleteBook(book._id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-4 p-2">
              {books.map((book) => (
                <div key={book._id} className="border rounded-lg shadow-sm p-4 bg-white flex flex-col gap-2">
                  <div>
                    <span className="font-semibold">Title: </span>
                    <span>{book.title}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Author: </span>
                    <span>{book.author}</span>
                  </div>
                  <div>
                    <span className="font-semibold">ISBN: </span>
                    <span>{book.isbn}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Published: </span>
                    <span>{book.publishedYear}</span>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <Link href={`/view/${book._id}`} className="text-blue-600 hover:text-blue-800">
                      <BookOpen className="h-5 w-5" />
                    </Link>
                    <Link href={`/edit/${book._id}`} className="text-blue-600 hover:text-blue-800">
                      <SquarePen className="h-5 w-5" />
                    </Link>
                    <button onClick={() => confirmDeleteBook(book._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Delete Book</h2>
              <p className="mb-6">Are you sure you want to delete this book? This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowModal(false)
                    setBookToDelete(null)
                  }}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteBook}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }