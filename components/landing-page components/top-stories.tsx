import Image from "next/image"
import { useEffect, useState } from "react"
import { Spinner } from "../ui/spinner"

export default function TopStories() {
  const [stories, setStories] = useState<{
    id: number
    title: string
    subtitle: string
    image: string
  }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories: {
    category: string
  }[] = [
    {
      category: "LATEST TODAY",
    },
    {
      category: "NEWS TODAY",
    },
    {
      category: "NEWS TODAY",
    },
    {
      category: "NEWS TODAY",
    },
  ]

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch("https://api.agcnewsnet.com/api/general/top-stories")
        const data = await res.json()
        type ApiStory = {
          story: {
            id: number
            title: string
            subtitle: string
            banner_image: string
          }
        }
        const apiStories = (data?.data?.data || []).map((item: ApiStory) => ({
          id: item.story.id,
          title: item.story.title,
          subtitle: item.story.subtitle,
          image: item.story.banner_image,
        }))
        // If less than 4, repeat the first to fill the grid (to match design)
        let filledStories = apiStories
        if (apiStories.length > 0 && apiStories.length < 4) {
          filledStories = [...apiStories]
          while (filledStories.length < 4) {
            filledStories.push(apiStories[0])
          }
        }
        setStories(filledStories)
      } catch {
        setError("Failed to load stories.")
      } finally {
        setLoading(false)
      }
    }
    fetchStories()
  }, [])

  if (loading) {
    return (
      <section className="container bg-white mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">TOP STORIES</h2>
        <div className="flex justify-center items-center w-full h-full py-12">
          <Spinner />
        </div>
      </section>
    )
  }
  if (error || stories.length === 0) {
    return (
      <section className="container bg-white mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">TOP STORIES</h2>
        <div>{error || "No stories available."}</div>
      </section>
    )
  }

  return (
    <section className="container bg-white mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">TOP STORIES</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Story */}
        <div className="relative group cursor-pointer md:row-span-2">
          <div className="relative h-76 rounded-xs overflow-hidden">
            <Image
              src={stories[0].image || "/placeholder.svg"}
              alt={stories[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="inline-block text-pink-600 font-bold text-xs px-2 py-1 rounded mb-2 uppercase tracking-wide">
                {categories[0]?.category}
              </span>
              <h3 className="text-white text-lg md:text-xl font-bold leading-tight mb-1">{stories[0].title}</h3>
            </div>
          </div>
        </div>
        {/* Side Stories Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stories.slice(1, 4).map((story, idx) => (
            <div key={story.id + idx} className={`relative group cursor-pointer ${idx === 2 ? 'col-span-2' : ''}`}>
              <div className={`relative h-32 md:h-36 rounded-xs overflow-hidden w-full`}>
                <Image
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="inline-block text-pink-600 font-bold text-xs px-2 py-1 rounded mb-1 uppercase tracking-wide">
                    {categories[idx + 1]?.category}
                  </span>
                  <h3 className="text-white text-sm md:text-base font-bold leading-tight">{story.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}