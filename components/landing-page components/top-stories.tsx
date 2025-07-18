import Image from "next/image"
import Link from "next/link"

interface Story {
  id: string
  title: string
  category: string
  image: string
  slug: string
}

const stories: Story[] = [
  {
    id: "1",
    title: "Putin promises grains, debt write-off as Russia seeks Africa allies",
    category: "LATEST TODAY",
    image: "/placeholder.svg?height=400&width=600",
    slug: "putin-promises-grains-debt-writeoff",
  },
  {
    id: "2",
    title: "Tinubu Mourns Actors, John Okafor and Quadri Oyebamiji",
    category: "NEWS TODAY",
    image: "/placeholder.svg?height=300&width=400",
    slug: "tinubu-mourns-actors",
  },
  {
    id: "3",
    title: "Tinubu Mourns Actors, John Okafor and Quadri Oyebamiji",
    category: "NEWS TODAY",
    image: "/placeholder.svg?height=200&width=400",
    slug: "tinubu-mourns-actors-2",
  },
  {
    id: "4",
    title: "Tinubu Mourns Actors, John Okafor and Quadri Oyebamiji",
    category: "NEWS TODAY",
    image: "/placeholder.svg?height=200&width=400",
    slug: "tinubu-mourns-actors-3",
  },
]

export default function TopStories() {
  return (
    <section className="container bg-white mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">TOP STORIES</h2>
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