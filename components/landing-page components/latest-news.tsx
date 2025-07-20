import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"

interface NewsItem {
  id: number
  title: string
  category: string
  image: string
  slug: string
}

const STORIES_PER_PAGE = 4
const API_URL = "https://api.agcnewsnet.com/api/general/stories/latest-stories?page=1&per_page=7"

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()
        type ApiNewsItem = {
          id: number
          title: string
          category?: { category_name?: string }
          banner_image?: string
        }
        const apiNews = (data?.data?.data || []).map((item: ApiNewsItem) => ({
          id: item.id,
          title: item.title,
          category: item.category?.category_name || "",
          image: item.banner_image || "/placeholder.svg?height=300&width=400",
          slug: item.id.toString(),
        }))
        setNews(apiNews)
      } catch {
        setError("Failed to load latest news.")
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  const totalPages = Math.ceil(news.length / STORIES_PER_PAGE)
  const startIdx = currentPage * STORIES_PER_PAGE
  const endIdx = startIdx + STORIES_PER_PAGE
  const visibleNews = news.slice(startIdx, endIdx)

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }
  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1)
  }

  if (loading) {
    return (
      <section className="container bg-white mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[300px]">
        <div className="flex items-center mb-6">
          <span className="w-1.5 h-6 bg-purple-900 mr-3"></span>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-wide">LATEST NEWS</h2>
        </div>
        {/* Skeleton Loader */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-2 w-full">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[240px] h-[300px] flex-shrink-0 rounded-md bg-white shadow-md relative">
              <Skeleton className="w-full h-full rounded-md" />
              <div className="absolute bottom-4 left-4 right-4">
                <Skeleton className="h-6 w-3/4 mb-2" variant="text" />
              </div>
            </div>
          ))}
        </div>
        {/* Skeleton Ads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-20 w-full">
          <Skeleton className="w-full h-24" />
          <Skeleton className="w-full h-24" />
        </div>
      </section>
    )
  }
  if (error || news.length === 0) {
    return (
      <section className="container bg-white mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <span className="w-1.5 h-6 bg-purple-900 mr-3"></span>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-wide">LATEST NEWS</h2>
        </div>
        <div>{error || "No news available."}</div>
      </section>
    )
  }

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
          <button
            className={`text-gray-400 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'}`}
            aria-label="Previous"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <ArrowLeft/>
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <span key={i} className={`w-3 h-3 rounded-full mx-1 ${i === currentPage ? 'bg-red-500' : 'bg-gray-300'}`}></span>
          ))}
          <button
            className={`text-gray-800 ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'}`}
            aria-label="Next"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <ArrowRight/>
          </button>
        </div>
      </div>
      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-2">
        {visibleNews.map((news) => (
          <Link key={news.id} href={`/stories/${news.slug}`}>
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
