"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
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

export default function NewsPicturesSection() {
  const [editorPicks, setEditorPicks] = useState<EditorPick[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEditorPicks = async () => {
      try {
        const response = await fetch('https://api.agcnewsnet.com/api/general/editor-picks?page=1&per_page=15')
        const data: ApiResponse = await response.json()
        
        // Randomize the order of the news
        const shuffledData = [...data.data.data].sort(() => Math.random() - 0.5)
        setEditorPicks(shuffledData)
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
          <h2 className="text-2xl font-bold text-gray-800">NEWS IN PICTURES</h2>
          <Link
            href="/pictures"
            className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <span className="text-sm mr-1">View more</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-pulse">
            <div className="bg-gray-300 h-80 rounded-xs"></div>
          </div>
          <div className="lg:col-span-1">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-38 rounded-xs"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const featuredStory = editorPicks[0]
  const sideStories = editorPicks.slice(1, 5)

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">NEWS IN PICTURES</h2>
        <Link
          href="/pictures"
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
        >
          <span className="text-sm mr-1">View more</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Image - Left Side */}
        {featuredStory && (
          <div className="lg:col-span-2">
            <div className="group cursor-pointer">
              <Link href={`/stories/${featuredStory.story.id}`}>
                <div className="relative h-80 rounded-xs overflow-hidden">
                  <Image
                    src={featuredStory.story.banner_image || "/placeholder.svg"}
                    alt={featuredStory.story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight group-hover:text-gray-200 transition-colors duration-200">
                      {featuredStory.story.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Side Images Grid - Right Side */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-4">
            {sideStories.map((story) => (
              <div key={story.id} className="group cursor-pointer">
                <Link href={`/stories/${story.story.id}`}>
                  <div className="relative h-38 rounded-xs overflow-hidden">
                    <Image
                      src={story.story.banner_image || "/placeholder.svg"}
                      alt={story.story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white text-xs font-semibold leading-tight group-hover:text-gray-200 transition-colors duration-200">
                        {story.story.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
