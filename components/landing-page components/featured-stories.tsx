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
    <section className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <div className="w-1 h-6 bg-purple-600 mr-3"></div>
        <h2 className="text-2xl font-bold text-gray-800">FEATURED STORIES</h2>
        <ChevronRight className="w-5 h-5 text-gray-600 ml-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Main Featured Story */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Featured Article */}
            <div className="group cursor-pointer">
              <Link href="/featured/russian-tourists-north-korea">
                <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Russian tourists at airport terminal with luggage"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Travel</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 mb-2">
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
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Opinion Article */}
            <div className="group cursor-pointer">
              <Link href="/opinion/scrap-constituency-projects">
                <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Gavel and scales of justice on books"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">Opinion</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 mb-2">
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
          <div className="space-y-6">
            {/* Advertisement Label */}
            <div className="text-right">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Advertisement</span>
            </div>

            {/* MTN Advertisement */}
            <div className="bg-gradient-to-r from-yellow-400 to-blue-600 rounded-lg p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">
                  Upgrade to a smartphone and enjoy 100% bonus data for 3 months
                </h3>
                <p className="text-sm mb-4 opacity-90">
                  Get the best smartphone deals with amazing data bonuses. Limited time offer for new and existing
                  customers.
                </p>
                <div className="flex items-center">
                  <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded font-bold text-sm mr-3">MTN</div>
                  <span className="text-sm">www.mtn.com.ng</span>
                </div>
              </div>
              <div className="absolute right-4 top-4 bottom-4 w-1/3">
                <div className="w-full h-full bg-gradient-to-l from-white/10 to-transparent rounded-lg flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Domino's Pizza Advertisement */}
            <div className="bg-red-800 rounded-lg p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="bg-white text-red-800 px-3 py-1 rounded font-bold text-lg mr-3">Domino&apos;s Pizza</div>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">MORE VALUE</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">
                  BUY 1 GET 1 <span className="text-yellow-400">FREE</span>
                </h3>
                <p className="text-sm mb-4">Valid Online Only!</p>
                <div className="flex space-x-2">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-red-800 font-bold text-xs">24h</span>
                  </div>
                  <div className="text-xs">
                    <div className="font-bold">DELIVERY</div>
                    <div>GUARANTEE</div>
                  </div>
                </div>
              </div>
              <div className="absolute right-4 top-4 bottom-4 w-1/2">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-6xl opacity-20">🍕</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
