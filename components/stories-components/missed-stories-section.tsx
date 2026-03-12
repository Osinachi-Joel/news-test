"use client"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"

interface MissedStory {
  id: number
  title: string
  category: string
  created_at: string
  slug: string
}

const API_URL = "https://api.agcnewsnet.com/api/general/stories/missed-stories?page=1&per_page=5"

export default function MissedStoriesSection() {
  const [missedStories, setMissedStories] = useState<MissedStory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    async function fetchMissedStories() {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        
        type ApiMissedStory = {
          id: number
          title: string
          category?: { category_name?: string }
          created_at: string
        }
        
        const apiStories = (data?.data?.data || [])
          .filter((item: ApiMissedStory) => item)
          .map((item: ApiMissedStory) => ({
            id: item.id,
            title: item.title,
            category: item.category?.category_name || "",
            created_at: item.created_at,
            slug: item.id.toString(),
          }))
        
        setMissedStories(apiStories)
        setTotalPages(Math.ceil(apiStories.length / 4)) // Show 4 stories per page
      } catch {
        setError("Failed to load missed stories.")
      } finally {
        setLoading(false)
      }
    }
    fetchMissedStories()
  }, [])

  const startIdx = currentPage * 4
  const endIdx = startIdx + 4
  const visibleStories = missedStories.slice(startIdx, endIdx)

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }
  
  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
  }

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            STORIES YOU MAY HAVE MISSED
          </h2>
        </div>
        {/* Skeleton Loader */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Skeleton className="w-3 h-3 rounded-sm mt-1 flex-shrink-0" variant="circle" />
                  <Skeleton className="h-6 w-3/4" variant="text" />
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 ml-6">
                  <Skeleton className="h-4 w-1/4" variant="text" />
                  <Skeleton className="h-4 w-1/4" variant="text" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error || missedStories.length === 0) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            STORIES YOU MAY HAVE MISSED
          </h2>
        </div>
        <div>{error || "No missed stories available."}</div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide uppercase">
          STORIES YOU MAY HAVE MISSED
        </h2>
        {/* Carousel navigation */}
        <div className="flex items-center gap-3">
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50 hover:border-gray-300 text-gray-800'}`}
            aria-label="Previous"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <div className="hidden md:flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-red-500' : 'w-1.5 bg-gray-200'}`}></span>
            ))}
          </div>
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all ${currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50 hover:border-gray-300 text-gray-800'}`}
            aria-label="Next"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <ArrowRight className="w-5 h-5"/>
          </button>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {visibleStories.map((story) => (
          <div key={story.id} className="group">
            <Link href={`/stories/${story.slug}`}>
              <div className="h-full p-5 rounded-xl border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2.5 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                  <h3 className="text-gray-900 font-bold leading-snug group-hover:text-blue-700 transition-colors duration-300 line-clamp-3">
                    {story.title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-gray-400 ml-6">
                  <div className="flex items-center">
                    <svg className="w-3.5 h-3.5 mr-1.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span>{new Date(story.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-1 h-1 bg-gray-300 rounded-full mr-2"></span>
                    <span className="text-purple-600 font-bold uppercase tracking-wider">{story.category}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
