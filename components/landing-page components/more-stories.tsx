import Image from "next/image"
import Link from "next/link"

interface MoreStory {
  id: string
  title: string
  slug: string
}

const moreStories: MoreStory[] = [
  {
    id: "1",
    title: "Binance: Nigeria orders cryptocurrency firm to pay $10bn",
    slug: "binance-nigeria-cryptocurrency-10bn",
  },
  {
    id: "2",
    title: "Rivers Community Protests Alleged Killing Of Indigenes By Militia",
    slug: "rivers-community-protests-killing-militia",
  },
  {
    id: "3",
    title: "Former NGX Group Chairman Abimbola Ogunbanjo Laid To Rest",
    slug: "ngx-chairman-abimbola-ogunbanjo-laid-rest",
  },
  {
    id: "4",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    slug: "foden-man-city-crush-man-united",
  },
  {
    id: "5",
    title: "Zamfara Verifies 3,079 Retirees, Settles N2.3bn Gratuity Backlog",
    slug: "zamfara-retirees-gratuity-backlog",
  },
]

export default function MoreStories() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Article */}
        <div className="lg:col-span-2">
          <div className="relative group cursor-pointer">
            <Link href="/story/dangote-refinery-crude-oil-shipment">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Dangote Refinery official in hard hat at industrial facility"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Editor's Pick Badge */}
                <div className="absolute top-4 left-4">
                  <div className="px-3 py-1 rounded-full flex items-center space-x-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-400">
                    <Image
                      src="/crown.svg"
                      alt="Editor's Pick Badge"
                      width={32}
                      height={32}
                    />
                    <span className="text-sm font-medium text-gray-900">Editor&apos;s Pick</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
                    Dangote Refinery&apos;s second crude oil shipment leaves US for Nigeria
                  </h2>
                  <p className="text-gray-200 text-lg mb-3">First cargo to arrive next week</p>
                  <div className="flex items-center text-white text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>Ogechi Joseph</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* More Stories Sidebar */}
        <div className="lg:col-span-1">
          <div className=" p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">MORE STORIES</h3>
            <div className="space-y-2">
              {moreStories.map((story) => (
                <div key={story.id} className="group">
                  <Link href={`/story/${story.slug}`}>
                    <div className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                      <div className="w-3 h-3 bg-red-500 rounded mt-2 flex-shrink-0"></div>
                      <p className="text-gray-800 text-sm leading-relaxed group-hover:text-pink-600 transition-colors duration-200">
                        {story.title}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
