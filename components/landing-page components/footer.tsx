import Link from "next/link"
import { Search, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const footerLinks = {
  column1: [
    { name: "Home", href: "/" },
    { name: "Africa", href: "/africa" },
    { name: "Politics", href: "/politics" },
  ],
  column2: [
    { name: "Business", href: "/business" },
    { name: "Sport", href: "/sport" },
    { name: "Health", href: "/health" },
  ],
  column3: [
    { name: "Tech", href: "/tech" },
    { name: "Opinion", href: "/opinion" },
    { name: "Videos", href: "/videos" },
  ],
  column4: [
    { name: "Photos", href: "/photos" },
    { name: "AGC Archive", href: "/archive" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  column5: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Advert Rate", href: "/advert-rate" },
  ],
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-400" },
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-400" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-300" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-600" },
]

export default function Footer() {
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
          {/* Column 1 */}
          <div className="space-y-3">
            {footerLinks.column1.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            {footerLinks.column2.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            {footerLinks.column3.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            {footerLinks.column4.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Column 5 */}
          <div className="space-y-3">
            {footerLinks.column5.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
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
