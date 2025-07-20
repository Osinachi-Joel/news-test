"use client"
import Link from "next/link"
import { Search, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { fetchCategories, Category } from "@/lib/categories"
import { useSearch } from "@/lib/search-context"

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" },
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-400" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-300" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
]

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { setSearchQuery } = useSearch()

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

  // Split categories into columns for footer
  const categoryColumns = categories.reduce((acc, category, index) => {
    const columnIndex = Math.floor(index / 2) // 2 categories per column
    if (!acc[columnIndex]) acc[columnIndex] = []
    acc[columnIndex].push(category)
    return acc
  }, [] as Category[][])

  return (
    <footer className="bg-[#2d2a2a] text-white">
      {/* Top Section - Logo, Social Media, Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="AGC Logo" width={100} height={100} />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search AGC Newsnet"
                className="w-full bg-white text-gray-900 border-0 pr-12 h-10"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1 - Home and Categories */}
          <div className="space-y-3">
            <Link href="/" className="block text-gray-300 hover:text-white transition-colors duration-200">
              Home
            </Link>
            {!loading && categoryColumns[0]?.map((category) => (
              <Link
                key={category.category_id}
                href={`/${getCategorySlug(category.category_name)}`}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                {category.category_name}
              </Link>
            ))}
          </div>

          {/* Column 2 - More Categories */}
          <div className="space-y-3">
            {!loading && categoryColumns[1]?.map((category) => (
              <Link
                key={category.category_id}
                href={`/${getCategorySlug(category.category_name)}`}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                {category.category_name}
              </Link>
            ))}
          </div>

          {/* Column 3 - Media */}
          <div className="space-y-3">
            <Link href="/videos" className="block text-gray-300 hover:text-white transition-colors duration-200">
              Videos
            </Link>
            <Link href="/photos" className="block text-gray-300 hover:text-white transition-colors duration-200">
              Photos
            </Link>
            <Link href="/audio" className="block text-gray-300 hover:text-white transition-colors duration-200">
              Audio
            </Link>
          </div>

          {/* Column 4 - Company */}
          <div className="space-y-3">
            <Link href="/about" className="block text-gray-300 hover:text-white transition-colors duration-200">
              About Us
            </Link>
            <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors duration-200">
              Contact Us
            </Link>
            <Link href="/advert-rate" className="block text-gray-300 hover:text-white transition-colors duration-200">
              Advert Rate
            </Link>
          </div>

          {/* Column 5 - Legal */}
          <div className="space-y-3">
            <Link href="/archive" className="block text-gray-300 hover:text-white transition-colors duration-200">
              AGC Archive
            </Link>
            <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/vip" className="block text-gray-300 hover:text-white transition-colors duration-200">
              AGC VIP
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <p className="text-gray-400 text-sm">© 2024 AGC Newsnet. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
