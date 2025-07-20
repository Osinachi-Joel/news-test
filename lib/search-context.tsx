"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface SearchStory {
  id: number
  title: string
  subtitle?: string
  description?: string
  author?: string
  banner_image?: string
  category?: string
  created_at?: string
  slug: string
}

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: SearchStory[]
  isSearching: boolean
  hasSearched: boolean
  clearSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchStory[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Fetch all stories for search
  const fetchAllStories = async (): Promise<SearchStory[]> => {
    try {
      // Fetch from multiple endpoints to get comprehensive results
      const endpoints = [
        'https://api.agcnewsnet.com/api/general/editor-picks?page=1&per_page=50',
        'https://api.agcnewsnet.com/api/general/top-stories',
        'https://api.agcnewsnet.com/api/general/stories/latest-stories?page=1&per_page=50',
        'https://api.agcnewsnet.com/api/general/stories/missed-stories?page=1&per_page=50'
      ]

      const allStories: SearchStory[] = []
      const seenIds = new Set<number>()

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint)
          const data = await response.json()
          
          let stories: Array<{
            id: number
            title: string
            subtitle?: string
            description?: string
            author?: string
            banner_image?: string
            category?: { category_name?: string }
            created_at?: string
            story?: {
              id: number
              title: string
              subtitle?: string
              description?: string
              author?: string
              banner_image?: string
              category?: { category_name?: string }
              created_at?: string
            }
          }> = []
          
          if (endpoint.includes('editor-picks')) {
            stories = data?.data?.data || []
          } else if (endpoint.includes('top-stories')) {
            stories = (data?.data?.data || []).map((item: { story: { id: number; title: string; subtitle?: string; description?: string; author?: string; banner_image?: string; category?: { category_name?: string }; created_at?: string } }) => item.story)
          } else {
            stories = data?.data?.data || []
          }

          stories.forEach((story) => {
            if (story.id && !seenIds.has(story.id)) {
              seenIds.add(story.id)
              allStories.push({
                id: story.id,
                title: story.title,
                subtitle: story.subtitle,
                description: story.description,
                author: story.author,
                banner_image: story.banner_image,
                category: story.category?.category_name,
                created_at: story.created_at,
                slug: story.id.toString()
              })
            }
          })
        } catch (error) {
          console.error(`Failed to fetch from ${endpoint}:`, error)
        }
      }

      return allStories
    } catch (error) {
      console.error('Failed to fetch stories for search:', error)
      return []
    }
  }

  // Search function
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    setHasSearched(true)

    try {
      const allStories = await fetchAllStories()
      
      const filteredStories = allStories.filter(story => 
        story.title.toLowerCase().includes(query.toLowerCase()) ||
        (story.subtitle && story.subtitle.toLowerCase().includes(query.toLowerCase())) ||
        (story.description && story.description.toLowerCase().includes(query.toLowerCase())) ||
        (story.author && story.author.toLowerCase().includes(query.toLowerCase())) ||
        (story.category && story.category.toLowerCase().includes(query.toLowerCase()))
      )

      setSearchResults(filteredStories)
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery)
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setHasSearched(false)
  }

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasSearched,
    clearSearch
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
} 