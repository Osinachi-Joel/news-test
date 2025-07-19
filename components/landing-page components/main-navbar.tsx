"use client"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchCategories, Category } from "@/lib/categories"

export default function MainNavbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await fetchCategories()
        setCategories(cats)
      } catch (error) {
        console.error('Failed to load categories:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  // Helper function to get category slug from category name
  const getCategorySlug = (categoryName: string): string => {
    return categoryName.toLowerCase().replace(/\s+/g, '-')
  }

  return (
    <nav className="bg-[#1b1b1b] text-white">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="AGC Logo" width={100} height={100} />
            </Link>

            <div className="hidden md:flex space-x-6">
              <Link href="/" className={`${pathname === '/' ? 'text-pink-400 border-b-2 border-pink-400 pb-4' : 'hover:text-pink-400 pb-4'}`}>
                Home
              </Link>
              {!loading && categories.map((category) => (
                <Link 
                  key={category.category_id}
                  href={`/${getCategorySlug(category.category_name)}`} 
                  className={`${pathname === `/${getCategorySlug(category.category_name)}` ? 'text-pink-400 border-b-2 border-pink-400 pb-4' : 'hover:text-pink-400 pb-4'}`}
                >
                  {category.category_name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-4">
              <Link href="/photos" className="hover:text-pink-400">
                Photos
              </Link>
              <Link href="/videos" className="hover:text-pink-400">
                Videos
              </Link>
              <Link href="/audio" className="hover:text-pink-400">
                Audio
              </Link>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:text-pink-400">
              <Search className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Link href="/login" className="hover:text-pink-400">
                Log in
              </Link>
              <span>/</span>
              <Link href="/signup" className="hover:text-pink-400">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
