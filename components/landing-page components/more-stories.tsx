import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface ApiStory {
  id: number
  story: {
    id: number
    title: string
    subtitle: string
    author: string
    banner_image: string
  }
}

const API_URL =
  "https://api.agcnewsnet.com/api/general/editor-picks?page="
const API_PER_PAGE = 15 // API returns 15 per page
const STORIES_PER_PAGE = 5 // Sidebar paginates 5 per page
const PAGINATION_WINDOW = 5 // Show 5 page numbers at a time

export default function MoreStories() {
  const [featured, setFeatured] = useState<ApiStory | null>(null)
  const [allStories, setAllStories] = useState<ApiStory[]>([])
  const [sidebarPage, setSidebarPage] = useState(1)
  const [apiPage, setApiPage] = useState(1)
  const [hasMoreApiPages, setHasMoreApiPages] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalStories, setTotalStories] = useState(0)

  // Fetch stories from API
  const fetchStories = async (pageNum: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}${pageNum}&per_page=${API_PER_PAGE}`)
      if (!res.ok) throw new Error("Failed to fetch stories")
      const data = await res.json()
      const newStories: ApiStory[] = data.data.data
      if (pageNum === 1) {
        setFeatured(newStories[0])
        setAllStories(newStories.slice(1))
      } else {
        setAllStories((prev) => [...prev, ...newStories])
      }
      if (!data.data.links.next) setHasMoreApiPages(false)
      setTotalStories(data.data.meta.total - 1) // minus featured
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Unknown error")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories(1)
  }, [])

  // Calculate stories for current sidebar page
  const startIdx = (sidebarPage - 1) * STORIES_PER_PAGE
  const endIdx = startIdx + STORIES_PER_PAGE
  const currentStories = allStories.slice(startIdx, endIdx)

  // If user paginates past loaded stories, fetch next API page
  useEffect(() => {
    if (endIdx > allStories.length && hasMoreApiPages && !loading) {
      const nextApiPage = apiPage + 1
      setApiPage(nextApiPage)
      fetchStories(nextApiPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarPage])

  // Pagination logic
  const totalPages = Math.ceil(totalStories / STORIES_PER_PAGE)

  // Calculate windowed page numbers
  let pageNumbers: (number | string)[] = []
  if (totalPages <= PAGINATION_WINDOW) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
  } else {
    const windowStart = Math.max(1, sidebarPage - Math.floor(PAGINATION_WINDOW / 2))
    let windowEnd = windowStart + PAGINATION_WINDOW - 1
    if (windowEnd > totalPages) {
      windowEnd = totalPages
    }
    let realWindowStart = windowEnd - PAGINATION_WINDOW + 1
    if (realWindowStart < 1) realWindowStart = 1
    // Add leading ellipsis if needed
    if (realWindowStart > 1) {
      pageNumbers.push('...')
    }
    for (let i = realWindowStart; i <= windowEnd; i++) {
      pageNumbers.push(i)
    }
    // Add trailing ellipsis if needed
    if (windowEnd < totalPages) {
      pageNumbers.push('...')
    }
  }

  const handlePrev = () => {
    if (sidebarPage > 1) setSidebarPage(sidebarPage - 1)
  }
  const handleNext = () => {
    if (sidebarPage < totalPages) setSidebarPage(sidebarPage + 1)
  }
  const handlePage = (n: number) => {
    setSidebarPage(n)
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Article */}
        <div className="lg:col-span-2">
          {featured ? (
            <div className="relative group cursor-pointer">
              <Link href={`/stories/${featured.story.id}`}>
                <div className="relative h-96 rounded-xs overflow-hidden">
                  <Image
                    src={featured.story.banner_image}
                    alt={featured.story.title}
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
                      {featured.story.title}
                    </h2>
                    <p className="text-gray-200 text-lg mb-3">{featured.story.subtitle}</p>
                    <div className="flex items-center text-white text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <span>{featured.story.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ) : loading ? (
            <div className="h-96 flex flex-col gap-4 items-center justify-center">
              <Skeleton className="w-full h-80 mb-4" />
              <Skeleton className="h-8 w-3/4 mb-2" variant="text" />
              <Skeleton className="h-6 w-1/2" variant="text" />
            </div>
          ) : error ? (
            <div className="h-96 flex items-center justify-center text-red-500">{error}</div>
          ) : null}
        </div>
        {/* More Stories Sidebar */}
        <div className="lg:col-span-1">
          <div className="">
            <h3 className="text-xl font-bold text-gray-800 mb-6">MORE STORIES</h3>
            <div
              id="more-stories-scrollable"
              style={{ maxHeight: "500px", overflow: "auto" }}
              className="space-y-2"
            >
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="group">
                    <div className="flex items-start space-x-3 p-2">
                      <Skeleton className="w-3 h-3 rounded mt-2 flex-shrink-0" variant="circle" />
                      <Skeleton className="h-4 w-3/4" variant="text" />
                    </div>
                  </div>
                ))
              ) : (
                currentStories.map((story, idx) => (
                  <div key={`${story.story.id}-${startIdx + idx}`} className="group">
                    <Link href={`/stories/${story.story.id}`}>
                      <div className="flex items-start space-x-3 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                        <div className="w-3 h-3 bg-red-500 rounded mt-2 flex-shrink-0"></div>
                        <p className="text-gray-800 text-sm leading-relaxed group-hover:text-pink-600 transition-colors duration-200">
                          {story.story.title}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))
              )}
              {loading && <div className="text-center py-2">Loading...</div>}
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>
            {/* Pagination Controls (dynamic, styled like other-stories) */}
            <div className="flex items-center gap-8 mt-8 text-sm">
              <div className="flex items-center gap-1">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100"
                  aria-label="Previous"
                  onClick={handlePrev}
                  disabled={sidebarPage === 1}
                >
                  &#60;
                </button>
                {pageNumbers.map((n, idx) =>
                  n === '...'
                    ? <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center">...</span>
                    : <button
                        key={`pagebtn-${n}`}
                        onClick={() => handlePage(n as number)}
                        className={`w-8 h-8 flex items-center text-black justify-center rounded-md border ${n === sidebarPage ? "bg-gray-800 text-white" : "bg-gray-400 hover:bg-gray-100"}`}
                      >
                        {n}
                      </button>
                )}
                <button
                  className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100"
                  aria-label="Next"
                  onClick={handleNext}
                  disabled={sidebarPage === totalPages || totalPages === 0}
                >
                  &#62;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
