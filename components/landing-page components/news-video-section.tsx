"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface EditorPick {
  id: number
  story: {
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
    editors_pick: string | null
    top_story: string | null
    user: {
      id: number
      email: string
      email_verified_at: string
      created_at: string
      updated_at: string
      first_name: string
      last_name: string
      failed_login_attempts: number | null
      locked_due_to_failed_login_attempts_at: string | null
      role_id: number
    }
    category: {
      category_id: number
      category_name: string
      total_stories: number | null
      created_at: string
      updated_at: string
    }
    banner_image: string
    created_at: string
    updated_at: string
  }
  created_at: string
  updated_at: string
}

interface ApiResponse {
  message: string
  data: {
    data: EditorPick[]
    links: {
      first: string
      last: string
      prev: string | null
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

export default function NewsVideosSection() {
  const [editorPicks, setEditorPicks] = useState<EditorPick[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEditorPicks = async () => {
      try {
        const response = await fetch('https://api.agcnewsnet.com/api/general/editor-picks?page=1&per_page=15')
        const data: ApiResponse = await response.json()
        setEditorPicks(data.data.data)
      } catch (error) {
        console.error('Error fetching editor picks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEditorPicks()
  }, [])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">NEWS IN VIDEOS</h2>
          <Link
            href="/videos"
            className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <span className="text-sm mr-1">View more</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-xs mb-3"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">NEWS IN VIDEOS</h2>
        <Link
          href="/videos"
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
        >
          <span className="text-sm mr-1">View more</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editorPicks.slice(0, 6).map((pick) => (
          <div key={pick.id} className="group cursor-pointer">
            <Link href={`/stories/${pick.story.id}`}>
              <div className="relative rounded-xs overflow-hidden mb-3">
                <div className="relative h-48">
                  <Image
                    src={pick.story.banner_image || "/placeholder.svg"}
                    alt={pick.story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                      <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block text-white text-xs px-3 py-2 rounded-xl font-medium 
                    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-400">
                      {pick.story.category.category_name}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">2:45</span>
                  </div>
                </div>
              </div>

              {/* Video Title */}
              <h3 className="text-gray-800 font-semibold leading-tight group-hover:text-purple-600 transition-colors duration-200">
                {pick.story.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
