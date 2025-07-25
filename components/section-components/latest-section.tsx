"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCategoryId, fetchCategoryStories } from "@/lib/categories"
import { Skeleton } from "../ui/skeleton"

interface Story {
  id: string
  title: string
  category: string
  image: string
  slug: string
}

export default function LatestSection({ section }: { section: string }) {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        const response = await fetchCategoryStories(categoryId, 1, 4)
        if (!response) {
          throw new Error("Failed to fetch stories")
        }

        const apiStories = response.data.data.map((story) => ({
          id: story.id.toString(),
          title: story.title,
          category: story.category.category_name,
          image: story.banner_image || "/placeholder.svg?height=400&width=600",
          slug: story.id.toString(),
        }))

        setStories(apiStories)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stories")
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [section])

  if (loading) {
    return (
      <section className="container bg-white mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">Latest in {section}</h2>
        {/* Skeleton Loader */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Main Story Skeleton */}
          <div className="relative group cursor-pointer md:row-span-2">
            <Skeleton className="w-full h-76 mb-2" />
            <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
          </div>
          {/* Side Stories Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="relative group cursor-pointer">
                <Skeleton className="w-full h-32 md:h-36 mb-2" />
                <Skeleton className="h-4 w-3/4 mb-1" variant="text" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error || stories.length === 0) {
    return (
      <section className="container bg-white mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">Latest in {section}</h2>
        <div className="text-center py-8 text-gray-500">
          {error || "No stories available."}
        </div>
      </section>
    )
  }

  return (
    <section className="container bg-white mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">Latest in {section}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Story */}
        <div className="relative group cursor-pointer md:row-span-2">
          <Link href={`/stories/${stories[0].id}`}>
            <div className="relative h-76 rounded-xs overflow-hidden">
              <Image
                src={stories[0].image || "/placeholder.svg"}
                alt={stories[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block bg-pink-600 text-white text-xs px-2 py-1 rounded mb-2 uppercase tracking-wide">
                  {stories[0].category}
                </span>
                <h3 className="text-white text-lg md:text-xl font-bold leading-tight mb-1">{stories[0].title}</h3>
              </div>
            </div>
          </Link>
        </div>
        {/* Side Stories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stories.slice(1).map((story, idx) => (
            <div key={story.id} className={`relative group cursor-pointer ${idx === 2 ? 'col-span-2' : ''}`}>
              <Link href={`/stories/${story.id}`}>
                <div className={`relative h-32 md:h-36 rounded-xs overflow-hidden w-full`}>
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="inline-block bg-pink-600 text-white text-xs px-2 py-1 rounded mb-1 uppercase tracking-wide">
                      {story.category}
                    </span>
                    <h3 className="text-white text-sm md:text-base font-bold leading-tight">{story.title}</h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}