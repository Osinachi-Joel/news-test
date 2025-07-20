"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Category interface
interface Category {
  category_id: number
  category_name: string
  total_stories: null
}

// Story interface
interface Story {
  id: number
  title: string
  subtitle: string
  description: string
  status: string
  type: string
  author: string
  content: string
  featured: string
  views: number
  editors_pick: null
  top_story: null
  category: Category
  banner_image: string
  created_at: string
  updated_at: string
}

// Editor pick interface
interface EditorPick {
  id: number
  story: Story
}

// API response interface
interface ApiResponse {
  message: string
  data: {
    data: EditorPick[]
    links: {
      first: string
      last: string
      prev: null
      next: string
    }
    meta: {
      current_page: number
      from: number
      last_page: number
      links: Array<{
        url: string | null
        label: string
        active: boolean
      }>
      path: string
      per_page: number
      to: number
      total: number
    }
  }
}

export default function FeaturedStories() {
  const [stories, setStories] = useState<EditorPick[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('https://api.agcnewsnet.com/api/general/editor-picks?page=1&per_page=15')
        const data: ApiResponse = await response.json()
        setStories(data.data.data)
      } catch (error) {
        console.error('Error fetching stories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8 w-full">
        <div className="flex items-center mb-6">
          <div className="w-1 h-6 bg-purple-600 mr-3"></div>
          <h2 className="text-2xl font-bold text-gray-800">FEATURED STORIES</h2>
          <ChevronRight className="w-5 h-5 text-gray-600 ml-2" />
        </div>
        {/* Skeleton Loader */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 w-full">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-3 space-y-6">
            <div className="group cursor-pointer">
              <div className="relative h-60 rounded-xs overflow-hidden mb-3">
                <Skeleton className="w-full h-full" />
              </div>
              <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
              <div className="flex items-center space-x-4 text-sm mb-4">
                <Skeleton className="h-4 w-1/4" variant="text" />
                <Skeleton className="h-4 w-1/4" variant="text" />
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" variant="text" />
              ))}
            </div>
          </div>
          {/* Middle Column Skeleton */}
          <div className="lg:col-span-3 space-y-6">
            <div className="group cursor-pointer">
              <div className="relative h-60 rounded-xs overflow-hidden mb-3">
                <Skeleton className="w-full h-full" />
              </div>
              <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
              <div className="flex items-center space-x-4 text-sm mb-4">
                <Skeleton className="h-4 w-1/4" variant="text" />
                <Skeleton className="h-4 w-1/4" variant="text" />
              </div>
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" variant="text" />
              ))}
            </div>
          </div>
          {/* Right Column Skeleton (Ads) */}
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-6 w-1/2 mb-2" variant="text" />
            <Skeleton className="w-full h-44 mb-4" />
            <Skeleton className="w-full h-44" />
          </div>
        </div>
      </section>
    )
  }

  // Use first two stories for featured articles with images
  const featuredStories = stories.slice(0, 2)
  // Use remaining stories for headline lists
  const headlineStories = stories.slice(2)

  return (
    <section className="container mx-auto px-4 py-8 w-full">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-purple-600 mr-3"></div>
        <h2 className="text-2xl font-bold text-gray-800">FEATURED STORIES</h2>
        <ChevronRight className="w-5 h-5 text-gray-600 ml-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 w-full">
        {/* Left Column - Main Featured Story */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Featured Article */}
            {featuredStories[0] && (
              <div className="group cursor-pointer">
                <Link href={`/stories/${featuredStories[0].story.id}`}>
                  <div className="relative h-60 rounded-xs overflow-hidden mb-3">
                    <Image
                      src={featuredStories[0].story.banner_image || "/placeholder.svg?height=300&width=400"}
                      alt={featuredStories[0].story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block text-white text-xs px-3 py-2 rounded-xl font-medium 
                      bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-400">
                        {featuredStories[0].story.category.category_name}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 mb-2">
                    {featuredStories[0].story.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#f52a32]  rounded-full mr-2"></div>
                      <span>{featuredStories[0].story.author}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#f52a32] rounded-full mr-2"></div>
                      <span>Posted {new Date(featuredStories[0].story.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* News Headlines List */}
            <div className="space-y-3">
              {headlineStories.slice(0, 5).map((story) => (
                <div key={story.id}>
                  <Link href={`/stories/${story.story.id}`}>
                    <p className="text-gray-800 text-sm leading-relaxed hover:text-purple-600 transition-colors duration-200">
                      {story.story.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Opinion Article */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Opinion Article */}
            {featuredStories[1] && (
              <div className="group cursor-pointer">
                <Link href={`/stories/${featuredStories[1].story.id}`}>
                  <div className="relative h-60 rounded-xs overflow-hidden mb-3">
                    <Image
                      src={featuredStories[1].story.banner_image || "/placeholder.svg?height=300&width=400"}
                      alt={featuredStories[1].story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block text-white text-xs px-3 py-2 rounded-xl font-medium 
                      bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-400">
                        {featuredStories[1].story.category.category_name}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 mb-2">
                    {featuredStories[1].story.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#f52a32]  rounded-full mr-2"></div>
                      <span>{featuredStories[1].story.author}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#f52a32]  rounded-full mr-2"></div>
                      <span>Posted {new Date(featuredStories[1].story.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* News Headlines List */}
            <div className="space-y-3">
              {headlineStories.slice(5, 10).map((story) => (
                <div key={`opinion-${story.id}`}> 
                  <Link href={`/stories/${story.story.id}`}>
                    <p className="text-gray-800 text-sm leading-relaxed hover:text-purple-600 transition-colors duration-200">
                      {story.story.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Advertisements */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* Advertisement Label */}
            <div className="text-right">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Advertisement</span>
            </div>

            {/* MTN Advertisement */}
            <Image src="/mtnads.svg" alt="MTN Advertisement" width={344} height={444} />

            {/* Domino's Pizza Advertisement */}
            <Image src="/pizza.svg" alt="Domino's Pizza Advertisement" width={344} height={444}  />

          </div>
        </div>
      </div>
    </section>
  )
}
