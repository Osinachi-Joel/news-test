import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  category: string
  image: string
  slug: string
}

const latestNews: NewsItem[] = [
  {
    id: "1",
    title: "Tinubu Mourns Actors, John Okafor and Quadri Oyebamiji",
    category: "Entertainment",
    image: "/placeholder.svg?height=300&width=400",
    slug: "tinubu-mourns-actors-john-okafor-quadri-oyebamiji",
  },
  {
    id: "2",
    title: "Gunfire near Haiti airport disrupts flights for second day",
    category: "World News",
    image: "/placeholder.svg?height=300&width=400",
    slug: "gunfire-haiti-airport-disrupts-flights",
  },
  {
    id: "3",
    title: "The worst wildfire in Texas history could get even more dangerous",
    category: "World News",
    image: "/placeholder.svg?height=300&width=400",
    slug: "texas-wildfire-history-dangerous",
  },
  {
    id: "4",
    title: "Moses Bliss ties the knot with Marie Wiseborn in classy wedding",
    category: "Entertainment",
    image: "/placeholder.svg?height=300&width=400",
    slug: "moses-bliss-marie-wiseborn-wedding",
  },
]

export default function LatestNews() {
  return (
    <section className="container bg-white mx-auto px-4 py-8">
      <div className="flex justify-between mb-6">
      {/* Header */}
      <div className="flex items-center ">
        <span className="w-1.5 h-6 bg-purple-900 mr-3"></span>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-wide">LATEST NEWS</h2>
      </div>
      
      {/* Carousel navigation dots and arrows */}
        <div className="flex items-center justify-end gap-2 pr-2">
          <button className="text-gray-400 hover:text-black" aria-label="Previous">
            <ArrowLeft/>
          </button>
          {[...Array(6)].map((_, i) => (
            <span key={i} className={`w-3 h-3 rounded-full mx-1 ${i === 0 ? 'bg-red-500' : 'bg-gray-300'}`}></span>
          ))}
          <button className="text-gray-800 hover:text-black" aria-label="Next">
            <ArrowRight/>
          </button>
        </div>
        </div>
      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-2">
        {latestNews.map((news, idx) => (
          <Link key={idx} href={`/stories/${news.id}`}>
            <div className="w-[240px] h-[300px] flex-shrink-0 rounded-md bg-white shadow-md relative">
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <Image src={news.image} alt={news.title} width={400} height={300} className="rounded-sm object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block text-white text-xs px-3 py-2 rounded-xl font-medium 
                  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-400">{news.category}</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-lg font-semibold drop-shadow-md">{news.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Advertisement Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-20">
        {/* Eversend Ad */}
        <Image
          src="/eversend.svg"
          alt="Eversend Ad"
          width={728}
          height={90}
        />
        {/* IC Markets Ad */}
        <Image
          src="/cmarket.svg"
          alt="IC Markets Ad"
          width={728}
          height={90}
        />
      </div>
    </section>
  )
}
