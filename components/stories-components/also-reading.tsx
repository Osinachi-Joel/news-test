"use client"
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

export default function AlsoReading() {
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
        const apiNews = (data?.data?.data || [])
          .filter((item: ApiNewsItem) => item)
          .map((item: ApiNewsItem) => ({
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
          <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-wide">PEOPLE ARE ALSO READING:</h2>
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
      </section>
    )
  }
  if (error || news.length === 0) {
    return (
      <section className="container bg-white mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <span className="w-1.5 h-6 bg-purple-900 mr-3"></span>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-wide">PEOPLE ARE ALSO READING:</h2>
        </div>
        <div>{error || "No news available."}</div>
      </section>
    )
  }

  return (
    <section className="container bg-white mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        {/* Header */}
        <div className="flex items-center ">
          <span className="w-1.5 h-6 bg-purple-900 mr-3 rounded-full"></span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide uppercase">PEOPLE ARE ALSO READING</h2>
        </div>
        {/* Carousel navigation arrows */}
        <div className="flex items-center gap-3">
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all ${currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50 hover:border-gray-300 text-gray-800'}`}
            aria-label="Previous"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-red-500' : 'w-1.5 bg-gray-200'}`}></span>
            ))}
          </div>
          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 transition-all ${currentPage === totalPages - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50 hover:border-gray-300 text-gray-800'}`}
            aria-label="Next"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            <ArrowRight className="w-5 h-5"/>
          </button>
        </div>
      </div>
      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {visibleNews.map((news) => (
          <Link key={news.id} href={`/stories/${news.slug}`} className="group">
            <div className="flex flex-col rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100 h-full">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image 
                  src={news.image} 
                  alt={news.title} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-widest
                  bg-black/40 backdrop-blur-md border border-white/20">{news.category}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-lg font-bold leading-tight group-hover:text-red-400 transition-colors duration-300">{news.title}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
