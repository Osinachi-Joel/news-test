import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface PictureNews {
  id: string
  title: string
  image: string
  slug: string
  featured?: boolean
}

const pictureNews: PictureNews[] = [
  {
    id: "1",
    title: "Putin promises grains, debt write-off as Russia seeks Africa allies",
    image: "/placeholder.svg?height=400&width=600",
    slug: "putin-promises-grains-debt-writeoff-russia-africa",
    featured: true,
  },
  {
    id: "2",
    title: "Tinubu Mourns Actors, John Okafor and Quadri Oyebamiji",
    image: "/placeholder.svg?height=300&width=400",
    slug: "tinubu-mourns-actors-john-okafor-quadri-oyebamiji-1",
  },
  {
    id: "3",
    title: "Tinubu Mourns Actors, John Okafor and Quadri Oyebamiji",
    image: "/placeholder.svg?height=300&width=400",
    slug: "tinubu-mourns-actors-john-okafor-quadri-oyebamiji-2",
  },
  {
    id: "4",
    title: "Tinubu Mourns Actors, John Okafor and Quadri Oyebamiji",
    image: "/placeholder.svg?height=300&width=400",
    slug: "tinubu-mourns-actors-john-okafor-quadri-oyebamiji-3",
  },
  {
    id: "5",
    title: "Tinubu Mourns Actors, John Okafor and Quadri Oyebamiji",
    image: "/placeholder.svg?height=300&width=400",
    slug: "tinubu-mourns-actors-john-okafor-quadri-oyebamiji-4",
  },
]

export default function NewsPicturesSection() {
  const featuredStory = pictureNews.find((story) => story.featured)
  const sideStories = pictureNews.filter((story) => !story.featured)

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
              <Link href={`/pictures/${featuredStory.slug}`}>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={featuredStory.image || "/placeholder.svg"}
                    alt={featuredStory.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Team Logos Overlay */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">LFC</span>
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-purple-600">
                        <span className="text-purple-600 font-bold text-xs">RM</span>
                      </div>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight group-hover:text-gray-200 transition-colors duration-200">
                      {featuredStory.title}
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
                <Link href={`/pictures/${story.slug}`}>
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-white text-sm font-semibold leading-tight group-hover:text-gray-200 transition-colors duration-200">
                        {story.title}
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
