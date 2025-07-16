import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface SidebarStory {
  id: string
  title: string
  image: string
  slug: string
}

const sidebarStories: SidebarStory[] = [
  {
    id: "1",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    image: "/placeholder.svg?height=80&width=80",
    slug: "foden-man-city-crush-man-united-sport-1",
  },
  {
    id: "2",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    image: "/placeholder.svg?height=80&width=80",
    slug: "foden-man-city-crush-man-united-sport-2",
  },
  {
    id: "3",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    image: "/placeholder.svg?height=80&width=80",
    slug: "foden-man-city-crush-man-united-sport-3",
  },
  {
    id: "4",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    image: "/placeholder.svg?height=80&width=80",
    slug: "foden-man-city-crush-man-united-sport-4",
  },
  {
    id: "5",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    image: "/placeholder.svg?height=80&width=80",
    slug: "foden-man-city-crush-man-united-sport-5",
  },
]

export default function SportSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-purple-900 mr-3"></div>
        <h2 className="text-2xl font-bold text-gray-800">SPORT</h2>
        <ChevronRight className="w-5 h-5 text-gray-600 ml-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <div className="group cursor-pointer">
            <Link href="/sport/mbappe-collision-transfer-deal">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Kylian Mbappé in PSG jersey with Liverpool and Real Madrid logos"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                  Mbappe &apos;collision&apos; hampers deal with obstacle preventing &apos;agreement&apos; with next club
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Human rights lawyer Femi Falana (SAN) wants the Federal Government to review the fuel subsidy removal
                  policy owing to claims that Nigeria is still paying for it.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>Ogechi Joseph</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    <span>Posted 13 mins ago</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar Stories */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {sidebarStories.map((story) => (
              <div key={story.id} className="group">
                <Link href={`/story/${story.slug}`}>
                  <div className="flex items-start space-x-3 hover:bg-gray-50 p-3 rounded transition-colors duration-200">
                    <div className="w-3 h-3 bg-red-500 rounded-sm mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm leading-relaxed group-hover:text-purple-600 transition-colors duration-200 mb-2">
                        {story.title}
                      </p>
                    </div>
                    <div className="w-16 h-12 flex-shrink-0">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        width={64}
                        height={48}
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
