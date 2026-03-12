"use client"

import { useSearch } from "@/lib/search-context"
import Link from "next/link"
import Image from "next/image"
import { Search, X } from "lucide-react"
import { Button } from "./button"

export default function SearchResults() {
  const { searchQuery, searchResults, isSearching, hasSearched, clearSearch } = useSearch()

  if (!hasSearched) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-500" />
            <span className="text-lg font-semibold">
              Search Results for &quot;{searchQuery}&quot;
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)] bg-gray-50/30">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mb-4"></div>
              <span className="text-gray-500 font-medium">Searching our database...</span>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                Try searching with different keywords or check your spelling.
              </p>
            </div>
          ) : (
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-sm text-gray-500 font-medium">
                  Found <span className="text-gray-900 font-bold">{searchResults.length}</span> result{searchResults.length !== 1 ? 's' : ''}
                </div>
                <div className="h-px flex-1 bg-gray-100 ml-4"></div>
              </div>
              <div className="space-y-6">
                {searchResults.map((story) => (
                  <Link
                    key={story.id}
                    href={`/stories/${story.slug}`}
                    className="group block bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-100 transition-all duration-300"
                    onClick={clearSearch}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {story.banner_image && (
                        <div className="flex-shrink-0">
                          <div className="relative w-full md:w-40 h-32 rounded-lg overflow-hidden shadow-inner">
                            <Image
                              src={story.banner_image}
                              alt={story.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {story.category && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                              {story.category}
                            </span>
                          )}
                          <span className="text-[10px] text-gray-400 font-medium">
                            {story.created_at && new Date(story.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                          {story.title}
                        </h3>
                        {story.subtitle && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                            {story.subtitle}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                          {story.author && (
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-600 font-bold border border-gray-200">
                                {story.author.charAt(0)}
                              </div>
                              <span>By {story.author}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 