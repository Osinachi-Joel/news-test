"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCategoryId, fetchCategoryStories } from "@/lib/categories"
import { Spinner } from "../ui/spinner"

interface Story {
  id: string
  title: string
  date: string
  excerpt: string
  image: string
  slug: string
}

const ads = [
  { src: "/flakes.svg", alt: "Ad 1" },
  { src: "/foam.svg", alt: "Ad 2" },
  { src: "/socc.svg", alt: "Ad 3" },
]

export default function OtherStories({ section }: { section: string }) {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalStories, setTotalStories] = useState(0)

  useEffect(() => {
    async function fetchStories() {
      setLoading(true)
      setError(null)
      
      const categoryId = getCategoryId(section)
      if (!categoryId) {
        setError(`Category not found for section: ${section}`)
        setLoading(false)
        return
      }

      try {
        const response = await fetchCategoryStories(categoryId, currentPage, 10)
        if (!response) {
          throw new Error("Failed to fetch stories")
        }

        const apiStories = response.data.data.map((story) => ({
          id: story.id.toString(),
          title: story.title,
          date: new Date(story.created_at).toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          excerpt: story.description || story.subtitle || story.title,
          image: story.banner_image || "/placeholder.svg?height=120&width=120",
          slug: story.id.toString(),
        }))

        setStories(apiStories)
        setTotalPages(response.data.meta.last_page)
        setTotalStories(response.data.meta.total)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stories")
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [section, currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const startItem = (currentPage - 1) * 10 + 1
  const endItem = Math.min(currentPage * 10, totalStories)

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <div className="w-1 h-5 bg-purple-900 mr-3"></div>
          <h2 className="text-lg font-bold text-gray-900 tracking-wide">OTHER STORIES IN <span className="uppercase">{section}</span></h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <div className="w-1 h-5 bg-purple-900 mr-3"></div>
          <h2 className="text-lg font-bold text-gray-900 tracking-wide">OTHER STORIES IN <span className="uppercase">{section}</span></h2>
        </div>
        <div className="text-center py-8 text-gray-500">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <div className="w-1 h-5 bg-purple-900 mr-3"></div>
        <h2 className="text-lg font-bold text-gray-900 tracking-wide">OTHER STORIES IN <span className="uppercase">{section}</span></h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stories List */}
        <div className="lg:col-span-2 space-y-6">
          {stories.map((story) => (
            <div key={story.id} className="flex bg-white rounded shadow-md overflow-hidden">
              <div className="relative w-40 h-40 flex-shrink-0">
                <Image src={story.image} alt={story.title} fill className="object-cover" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">
                    {story.title}
                  </h3>
                  <div className="text-xs text-gray-500 mb-2">Posted {story.date}</div>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-3">{story.excerpt}</p>
                </div>
                <Link href={`/stories/${story.id}`} className="inline-block mt-2">
                  <button className="px-4 py-1 text-xs bg-gray-100 rounded-2xl border border-gray-300 hover:bg-gray-200 transition">Continue reading</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Sidebar Ads */}
        <div className="space-y-6">
          {ads.map((ad, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <Image 
                src={ad.src} 
                alt={ad.alt} 
                width={idx === 2 ? 233 : 300} 
                height={idx === 2 ? 466 : 250} 
                className="" 
              />
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center gap-8 mt-8 text-sm">
        <span>Showing {startItem} - {endItem} of {totalStories}</span>
        <div className="flex items-center gap-1">
          <button 
            className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100" 
            aria-label="Previous"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#60;
          </button>
          {Array.from({ length: Math.min(8, totalPages) }, (_, i) => {
            const pageNum = i + 1
            return (
              <button
                key={pageNum}
                className={`w-8 h-8 flex items-center text-white hover:text-black justify-center rounded-md border ${
                  pageNum === currentPage ? "bg-gray-800 text-white" : "bg-gray-400 hover:bg-gray-100"
                }`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            )
          })}
          <button 
            className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100" 
            aria-label="Next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &#62;
          </button>
        </div>
      </div>
    </section>
  )
} 