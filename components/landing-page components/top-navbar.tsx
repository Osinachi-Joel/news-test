"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react"
import { useState, useEffect } from "react"

function ClientOnlyDate() {
  const [currentDate, setCurrentDate] = useState<string>("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    setCurrentDate(date.toLocaleDateString('en-US', options))
  }, [])

  if (!mounted) {
    return <span className="invisible">Loading...</span>
  }

  return <span>{currentDate}</span>
}

export default function TopNavbar() {
  return (
    <div className="bg-pink-600 text-white px-4 py-2">
      <div className="mx-auto flex justify-between items-center text-sm">
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-pink-200">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-pink-200">
            Contact Us
          </Link>
          <Link href="/archive" className="hover:text-pink-200">
            AGC Archive
          </Link>
          <Link href="/advert-rate" className="hover:text-pink-200">
            Advert Rate
          </Link>
          <Link href="/privacy" className="hover:text-pink-200">
            Privacy Policy
          </Link>
          <Link href="/vip" className="hover:text-pink-200">
            AGC VIP
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ClientOnlyDate />
          <div className="flex space-x-2">
            <Link href="#" className="hover:text-pink-200">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="hover:text-pink-200">
              <Facebook className="w-4 h-4" />
            </Link>
            <Link href="#" className="hover:text-pink-200">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="hover:text-pink-200">
              <Youtube className="w-4 h-4" />
            </Link>
            <Link href="#" className="hover:text-pink-200">
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
