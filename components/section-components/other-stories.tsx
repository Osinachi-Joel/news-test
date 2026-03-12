"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCategoryId, fetchCategoryStories } from "@/lib/categories"
import { Skeleton } from "../ui/skeleton"

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
        {/* Skeleton Loader */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stories List Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex bg-white rounded shadow-md overflow-hidden">
                <Skeleton className="w-40 h-40 flex-shrink-0" />
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
                  <Skeleton className="h-4 w-1/2 mb-2" variant="text" />
                  <Skeleton className="h-4 w-full mb-3" variant="text" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
              </div>
            ))}
          </div>
          {/* Sidebar Ads Skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, idx) => (
              <Skeleton key={idx} className="w-full h-40" />
            ))}
          </div>
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
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <div className="w-1.5 h-6 bg-purple-900 mr-3 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-900 tracking-wide uppercase">OTHER STORIES IN {section}</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Stories List */}
        <div className="lg:col-span-2 space-y-8">
          {stories.map((story) => (
            <div key={story.id} className="group flex flex-col md:flex-row bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="relative w-full md:w-48 h-48 flex-shrink-0 overflow-hidden">
                <Image 
                  src={story.image} 
                  alt={story.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-purple-700 transition-colors">
                    {story.title}
                  </h3>
                  <div className="text-xs text-gray-400 mb-3 flex items-center">
                    <span className="w-1 h-1 bg-gray-300 rounded-full mr-2"></span>
                    Posted {story.date}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{story.excerpt}</p>
                </div>
                <Link href={`/stories/${story.id}`} className="inline-block">
                  <button className="px-5 py-2 text-xs font-semibold bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 shadow-sm">
                    Continue reading
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Sidebar Ads */}
        <div className="space-y-8">
          {ads.map((ad, idx) => (
            <div key={idx} className="flex items-center justify-center rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image 
                src={ad.src} 
                alt={ad.alt} 
                width={idx === 2 ? 233 : 300} 
                height={idx === 2 ? 466 : 250} 
                className="w-full h-auto object-contain bg-gray-50 p-2" 
              />
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-gray-100 text-sm">
        <span className="text-gray-500 font-medium tracking-tight">Showing <span className="text-gray-900 font-bold">{startItem} - {endItem}</span> of <span className="text-gray-900 font-bold">{totalStories}</span></span>
        <div className="flex items-center gap-2">
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm" 
            aria-label="Previous"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#60;
          </button>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: Math.min(8, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all shadow-sm ${
                    pageNum === currentPage 
                      ? "bg-purple-700 text-white border border-purple-700" 
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          <button 
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm" 
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