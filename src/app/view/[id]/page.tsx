"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { type Book, getBookById, deleteBook } from "@/lib/api"
import { ArrowLeft, SquarePen } from "lucide-react"
import { use } from "react"

export default function ViewBook({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)

  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id)
        setBook(data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load book details. Please try again later.")
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  const handleDeleteBook = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id)
        router.push("/")
      } catch (err) {
        setError("Failed to delete book. Please try again later.")
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
  }

  if (!book) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">Book not found.</div>
    )
  }

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 border rounded-md px-4 py-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Books
      </Link>

      <div className="bg-white border rounded-lg p-4 shadow-md max-w-md mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <Link
            href={`/edit/${book._id}`}
            className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
          >
            <SquarePen className="h-4 w-4" />
            Edit
          </Link>
        </div>

        <div className="text-sm text-gray-500 mb-2">
          by {book.author}
        </div>

        <div className="mb-2">
          <span className="inline-block  text-gray-800 text-xs font-semibold px-2 py-1 rounded">
            ISBN
          </span>
        </div>
        <div className="mb-2">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
           {book.isbn}
          </span>
        </div>

        <div className="mb-2">
          <p className="text-sm text-gray-500">Published Year</p>
          <p className="text-lg">{book.publishedYear}</p>
        </div>

        <div className="text-xs text-gray-400">
          Book ID: {book._id}
        </div>
      </div>
    </div>
  )
}