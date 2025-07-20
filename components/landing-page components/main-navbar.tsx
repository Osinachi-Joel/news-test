"use client"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { fetchCategories, Category } from "@/lib/categories"
import { useSearch } from "@/lib/search-context"

export default function MainNavbar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const { setSearchQuery } = useSearch()
  const searchRef = useRef<HTMLDivElement>(null)

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

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false)
      }
    }

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSearch])

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
            
            {/* Search Section */}
            <div className="relative" ref={searchRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-pink-400"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="w-5 h-5" />
              </Button>
              
              {/* Search Dropdown */}
              {showSearch && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Search className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Search AGC Newsnet</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSearch(false)}
                        className="ml-auto text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      type="text"
                      placeholder="Search for stories..."
                      className="w-full bg-gray-50 border-gray-300 focus:border-pink-400 focus:ring-pink-400"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setShowSearch(false)
                        }
                      }}
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>
            
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
