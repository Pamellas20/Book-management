"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { type BookInput, createBook } from "@/lib/api"
import { ArrowLeft } from "lucide-react"

export default function AddBook() {
  const router = useRouter()
  const [formData, setFormData] = useState<BookInput>({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createBook(formData)
      router.push("/")
    } catch (err) {
      setError("Failed to add book. Please try again.")
      setLoading(false)
    }
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

      <h1 className="text-3xl font-bold mb-8">Add New Book</h1>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="border rounded-lg p-6 max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 font-medium mb-2">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="isbn" className="block text-gray-700 font-medium mb-2">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter ISBN number"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="publishedYear" className="block text-gray-700 font-medium mb-2">
              Published Year
            </label>
            <input
              type="text"
              id="publishedYear"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="E.g., 2023"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
