import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

interface SidebarStory {
  id: string
  title: string
  image: string
  slug: string
}

export default function BusinessSection() {
  const [sidebarStories, setSidebarStories] = useState<SidebarStory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStories() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          "https://api.agcnewsnet.com/api/general/categories/2/stories?page=1&per_page=6"
        )
        if (!res.ok) throw new Error("Failed to fetch stories")
        const data = await res.json()
        // Define the type for the API story object
        type ApiStory = {
          id: number | string
          title: string
          banner_image?: string
        }
        // Map API data to SidebarStory[] (first 6 only)
        const stories = (data?.data?.data as ApiStory[] || []).slice(0, 6).map((story) => ({
          id: String(story.id),
          title: story.title,
          image: story.banner_image || "/placeholder.svg?height=80&width=80",
          slug: String(story.id),
        }))
        setSidebarStories(stories)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  return (
    <section className="container mx-auto p-4 border-t border-b border-gray-300">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-purple-900 mr-3"></div>
        <h2 className="text-xl font-bold text-gray-800">BUSINESS</h2>
        <ChevronRight className="w-5 h-5 text-gray-600 ml-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:divide-x lg:divide-gray-300">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          {loading && <div className="text-gray-500">Loading...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {!loading && !error && sidebarStories.length > 0 && (
            <div className="group cursor-pointer p-4">
              <Link href={`/stories/${sidebarStories[0].id}`}>
                <div className="relative h-64 md:h-80 rounded-xs overflow-hidden mb-4">
                  <Image
                    src={sidebarStories[0].image}
                    alt="Business"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                    {sidebarStories[0].title}
                  </h3>
                  {/* Optionally, you can display a description or author if you fetch and store them in SidebarStory */}
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar Stories */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {loading && <div className="text-gray-500">Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && sidebarStories.slice(1, 6).map((story) => (
              <div key={story.id} className="group">
                <Link href={`/stories/${story.id}`}>
                  <div className="flex items-start space-x-3 hover:bg-gray-50 p-1 rounded transition-colors duration-200">
                    <div className="w-3 h-3 bg-red-500 rounded-xs mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-xs leading-relaxed group-hover:text-purple-600 transition-colors duration-200">
                        {story.title}
                      </p>
                    </div>
                    <div className="">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt="BUSINESS"
                        width={100}
                        height={40}
                        className="object-cover rounded"
                      />
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
