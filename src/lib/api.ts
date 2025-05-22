
export interface Book {
  _id: string
  title: string
  author: string
  isbn: string
  publishedYear: string
}

export interface BookInput {
  title: string
  author: string
  isbn: string
  publishedYear: string
}

const API_URL = "http://localhost:4000/api/v1"

export async function getAllBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books`)

  if (!response.ok) {
    throw new Error("Failed to fetch books")
  }

  return response.json()
}

export async function getBookById(id: string): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`)
  console.log(`Fetching book with ID: ${id}`)
  console.log(`Response status: ${response.status}`);

  if (!response.ok) {
    throw new Error("Failed to fetch book")
  }

  return response.json()
}

export async function createBook(book: BookInput): Promise<Book> {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })

  if (!response.ok) {
    throw new Error("Failed to create book")
  }

  return response.json()
}

export async function updateBook(id: string, book: BookInput): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })

  if (!response.ok) {
    throw new Error("Failed to update book")
  }

  return response.json()
}

export async function deleteBook(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete book")
  }
}