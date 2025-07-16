import Image from "next/image"
import Link from "next/link"
import { Play, ChevronRight } from "lucide-react"

interface VideoNews {
  id: string
  title: string
  category: string
  thumbnail: string
  videoUrl: string
  duration?: string
}

const videoNews: VideoNews[] = [
  {
    id: "1",
    title: "US storm: Massive blizzard hits California and Nevada",
    category: "World News",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "/videos/us-storm-blizzard-1",
    duration: "2:45",
  },
  {
    id: "2",
    title: "US storm: Massive blizzard hits California and Nevada",
    category: "World News",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "/videos/us-storm-blizzard-2",
    duration: "1:30",
  },
  {
    id: "3",
    title: "US storm: Massive blizzard hits California and Nevada",
    category: "World News",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "/videos/us-storm-blizzard-3",
    duration: "3:15",
  },
  {
    id: "4",
    title: "US storm: Massive blizzard hits California and Nevada",
    category: "World News",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "/videos/us-storm-blizzard-4",
    duration: "2:20",
  },
  {
    id: "5",
    title: "US storm: Massive blizzard hits California and Nevada",
    category: "World News",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "/videos/us-storm-blizzard-5",
    duration: "4:10",
  },
  {
    id: "6",
    title: "US storm: Massive blizzard hits California and Nevada",
    category: "World News",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "/videos/us-storm-blizzard-6",
    duration: "1:55",
  },
]

export default function NewsVideosSection() {
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
        {videoNews.map((video) => (
          <div key={video.id} className="group cursor-pointer">
            <Link href={video.videoUrl}>
              <div className="relative rounded-xs overflow-hidden mb-3">
                <div className="relative h-48">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
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
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{video.category}</span>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">{video.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Title */}
              <h3 className="text-gray-800 font-semibold leading-tight group-hover:text-purple-600 transition-colors duration-200">
                {video.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
