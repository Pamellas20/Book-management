"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookCopy, BookOpen, BookPlus, Library, PlusSquare } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex w-[270px] bg-blue-600 text-white flex-col h-screen">
      <div className="p-4 flex items-center gap-2">
        <div className="bg-white p-2 rounded">
          <BookCopy className="h-5 w-5 text-blue-600" />
        </div>
        <h1 className="text-xl font-bold">Book Manager</h1>
      </div>

      <div className="mt-8">
        <h2 className="px-4 text-sm mb-2">Navigation</h2>
        <nav className="flex flex-col">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-3 hover:bg-blue-700 ${pathname === "/" ? "bg-blue-700" : ""}`}
          >
            <Library className="h-5 w-5" />
            <span>All Books</span>
          </Link>
          <Link
            href="/add"
            className={`flex items-center gap-2 px-4 py-3 hover:bg-blue-700 ${pathname === "/add" ? "bg-blue-700" : ""
              }`}
          >
            <BookPlus className="h-5 w-5" />
            <span>Add New Book</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-4 text-sm">© 2025 Book Management System</div>
    </div>
  )
}
