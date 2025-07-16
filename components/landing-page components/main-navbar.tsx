import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function MainNavbar() {
  return (
    <nav className="bg-[#1b1b1b] text-white">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="AGC Logo" width={100} height={100} />
            </Link>

            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-pink-400 border-b-2 border-pink-400 pb-4 hover:text-pink-300">
                Home
              </Link>
              <Link href="/africa" className="hover:text-pink-400 pb-4">
                Africa
              </Link>
              <Link href="/politics" className="hover:text-pink-400 pb-4">
                Politics
              </Link>
              <Link href="/business" className="hover:text-pink-400 pb-4">
                Business
              </Link>
              <Link href="/sport" className="hover:text-pink-400 pb-4">
                Sport
              </Link>
              <Link href="/health" className="hover:text-pink-400 pb-4">
                Health
              </Link>
              <Link href="/tech" className="hover:text-pink-400 pb-4">
                Tech
              </Link>
              <Link href="/opinion" className="hover:text-pink-400 pb-4">
                Opinion
              </Link>
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
