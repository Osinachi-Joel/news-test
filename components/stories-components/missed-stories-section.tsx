"use client"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Spinner } from "../ui/spinner"

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
        
        const apiStories = (data?.data?.data || []).map((item: ApiMissedStory) => ({
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
        <div className="flex justify-center items-center w-full h-full py-12">
          <Spinner />
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
    <section className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          STORIES YOU MAY HAVE MISSED
        </h2>
        {/* Carousel navigation dots and arrows */}
        <div className="flex items-center justify-end gap-2 pr-2">
          <button
            className={`text-gray-400 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'}`}
            aria-label="Previous"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <ArrowLeft/>
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <span key={i} className={`w-3 h-3 rounded-full mx-1 ${i === currentPage ? 'bg-red-500' : 'bg-gray-300'}`}></span>
          ))}
          <button
            className={`text-gray-800 ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'}`}
            aria-label="Next"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <ArrowRight/>
          </button>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {visibleStories.map((story) => (
          <div key={story.id} className="group cursor-pointer">
            <Link href={`/stories/${story.slug}`}>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-gray-800 rounded-sm mt-1 flex-shrink-0"></div>
                  <h3 className="text-gray-800 font-semibold leading-tight group-hover:text-purple-600 transition-colors duration-200">
                    {story.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 ml-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>{new Date(story.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>{story.category}</span>
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
