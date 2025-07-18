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
    slug: "foden-man-city-crush-man-united-business-1",
  },
  {
    id: "2",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    image: "/placeholder.svg?height=80&width=80",
    slug: "foden-man-city-crush-man-united-business-2",
  },
  {
    id: "3",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    image: "/placeholder.svg?height=80&width=80",
    slug: "foden-man-city-crush-man-united-business-3",
  },
  {
    id: "4",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    image: "/placeholder.svg?height=80&width=80",
    slug: "foden-man-city-crush-man-united-business-4",
  },
  {
    id: "5",
    title: "Foden Sparkles As Man City Crush Spineless Man United",
    image: "/placeholder.svg?height=80&width=80",
    slug: "foden-man-city-crush-man-united-business-5",
  },
]

export default function BusinessSection() {
  return (
    <section className="container mx-auto p-4 border-t border-b border-gray-300">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-purple-900 mr-3"></div>
        <h2 className="text-2xl font-bold text-gray-800">BUSINESS</h2>
        <ChevronRight className="w-5 h-5 text-gray-600 ml-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:divide-x lg:divide-gray-300">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <div className="group cursor-pointer">
            <Link href="/business/naira-falling-nigeria-news">
              <div className="relative h-64 md:h-80 rounded-xs overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Hands holding Nigerian naira banknotes with calculator and documents on desk"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                  Any red line for the falling naira? | The Nigeria News - Nigeria and...
                </h3>
                <p className="text-gray-600 text-md leading-relaxed">
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
                <Link href={`/stories/${story.id}`}>
                  <div className="flex items-start space-x-3 hover:bg-gray-50 p-3 rounded transition-colors duration-200">
                    <div className="w-3 h-3 bg-red-500 rounded-xs mt-2 flex-shrink-0"></div>
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
