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
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-gray-600">Searching...</span>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-500">
                Try searching with different keywords or check your spelling.
              </p>
            </div>
          ) : (
            <div className="p-4">
              <div className="mb-4 text-sm text-gray-600">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </div>
              <div className="space-y-4">
                {searchResults.map((story) => (
                  <Link
                    key={story.id}
                    href={`/stories/${story.slug}`}
                    className="block hover:bg-gray-50 rounded-lg p-4 transition-colors duration-200"
                    onClick={clearSearch}
                  >
                    <div className="flex space-x-4">
                      {story.banner_image && (
                        <div className="flex-shrink-0">
                          <Image
                            src={story.banner_image}
                            alt={story.title}
                            width={120}
                            height={80}
                            className="rounded-md object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {story.title}
                        </h3>
                        {story.subtitle && (
                          <p className="text-gray-600 mb-2 line-clamp-2">
                            {story.subtitle}
                          </p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          {story.author && (
                            <span>By {story.author}</span>
                          )}
                          {story.category && (
                            <span>• {story.category}</span>
                          )}
                          {story.created_at && (
                            <span>• {new Date(story.created_at).toLocaleDateString()}</span>
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