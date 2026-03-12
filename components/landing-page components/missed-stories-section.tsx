"use client";
"use client"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

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
        
        const apiStories = (data?.data?.data || []).filter((item: any) => item).map((item: ApiMissedStory) => ({
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
        {/* Newsletter and Ad Skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-3/4" />
          </div>
          <Skeleton className="w-full h-40" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {visibleStories.map((story) => (
          <div key={story.id} className="group cursor-pointer">
            <Link href={`/stories/${story.slug}`}>
              <div className="space-y-4 p-4 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-800 rounded-full mt-2 flex-shrink-0"></div>
                  <h3 className="text-gray-800 font-semibold leading-tight group-hover:text-purple-600 transition-colors duration-200">
                    {story.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 ml-5">
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

      {/* Newsletter and Advertisement Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Newsletter Signup */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <div className="text-gray-800 font-medium mb-6 text-base flex items-center">
                <div className="w-12 h-12 bg-white shadow-sm rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Image
                    src="/email.svg"
                    alt="Email Icon"
                    width={24}
                    height={24}
                  />
                </div>
                <span>Get the latest news and stories from around Africa directly into your inbox daily.</span>
              </div>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full md:w-3/4 rounded-lg border-gray-200 focus:ring-purple-500"
                />
                <Button className="w-full md:w-3/4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  Get Me In
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Betano Advertisement */}
        <div className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
          <Image
            src="/betads.svg"
            alt="Betano Advertisement"
            width={640}
            height={360}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
