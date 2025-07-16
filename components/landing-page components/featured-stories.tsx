import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface NewsHeadline {
  id: string
  title: string
  slug: string
}

const newsHeadlines: NewsHeadline[] = [
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

export default function FeaturedStories() {
  return (
    <section className="container mx-auto px-4 py-8 w-full">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-purple-600 mr-3"></div>
        <h2 className="text-2xl font-bold text-gray-800">FEATURED STORIES</h2>
        <ChevronRight className="w-5 h-5 text-gray-600 ml-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 w-full">
        {/* Left Column - Main Featured Story */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Featured Article */}
            <div className="group cursor-pointer">
              <Link href="/featured/russian-tourists-north-korea">
                <div className="relative h-60 rounded-xs overflow-hidden mb-3">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Russian tourists at airport terminal with luggage"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block text-white text-xs px-3 py-2 rounded-xl font-medium 
                    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-400">Travel</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 mb-2">
                  Dozens of Russian tourists were recently allowed to visit North Korea. Here&apos;s what they saw
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>Ogechi Joseph</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    <span>Posted 13 mins ago</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* News Headlines List */}
            <div className="space-y-3">
              {newsHeadlines.map((headline) => (
                <div key={headline.id}>
                  <Link href={`/story/${headline.slug}`}>
                    <p className="text-gray-800 text-sm leading-relaxed hover:text-purple-600 transition-colors duration-200">
                      {headline.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column - Opinion Article */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Opinion Article */}
            <div className="group cursor-pointer">
              <Link href="/opinion/scrap-constituency-projects">
                <div className="relative h-60 rounded-xs overflow-hidden mb-3">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Gavel and scales of justice on books"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block text-white text-xs px-3 py-2 rounded-xl font-medium 
                    bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-400">Opinion</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 mb-2">
                  Scrap Constituency Projects
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>Ogechi Joseph</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                    <span>Posted 13 mins ago</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* News Headlines List */}
            <div className="space-y-3">
              {newsHeadlines.map((headline) => (
                <div key={`opinion-${headline.id}`}> 
                  <Link href={`/story/${headline.slug}`}>
                    <p className="text-gray-800 text-sm leading-relaxed hover:text-purple-600 transition-colors duration-200">
                      {headline.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Advertisements */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* Advertisement Label */}
            <div className="text-right">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Advertisement</span>
            </div>

            {/* MTN Advertisement */}
            <Image src="/mtnads.svg" alt="MTN Advertisement" width={344} height={444} />

            {/* Domino's Pizza Advertisement */}
            <Image src="/pizza.svg" alt="Domino's Pizza Advertisement" width={344} height={444}  />

          </div>
        </div>
      </div>
    </section>
  )
}
