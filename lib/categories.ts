export interface Category {
  category_id: number
  category_name: string
  total_stories: number | null
  created_at: string
  updated_at: string
}

export interface CategoryStoriesResponse {
  message: string
  data: {
    data: Array<{
      id: number
      title: string
      subtitle: string
      description: string
      status: string
      type: string
      author: string
      content: string
      featured: string
      views: number
      editors_pick: string | null
      top_story: string | null
      category: Category
      banner_image: string
      created_at: string
      updated_at: string
    }>
    links: {
      first: string
      last: string
      prev: string | null
      next: string | null
    }
    meta: {
      current_page: number
      from: number
      last_page: number
      links: Array<{
        url: string | null
        label: string
        active: boolean
      }>
      path: string
      per_page: number
      to: number
      total: number
    }
  }
}

export interface CategoriesResponse {
  message: string
  data: {
    data: Category[]
  }
}

// Category name to ID mapping based on the API response
export const CATEGORY_MAPPING: Record<string, number> = {
  'politics': 1,
  'business': 2,
  'sports': 3,
  'entertainment': 4,
  'sport': 3, // Alternative spelling
}

// Reverse mapping for getting category name from ID
export const CATEGORY_ID_TO_NAME: Record<number, string> = {
  1: 'Politics',
  2: 'Business',
  3: 'Sports',
  4: 'Entertainment',
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch('https://api.agcnewsnet.com/api/general/categories')
    const data: CategoriesResponse = await response.json()
    return data.data.data
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return []
  }
}

export async function fetchCategoryStories(categoryId: number, page: number = 1, perPage: number = 15): Promise<CategoryStoriesResponse | null> {
  try {
    const response = await fetch(`https://api.agcnewsnet.com/api/general/categories/${categoryId}/stories?page=${page}&per_page=${perPage}`)
    const data: CategoryStoriesResponse = await response.json()
    return data
  } catch (error) {
    console.error(`Failed to fetch stories for category ${categoryId}:`, error)
    return null
  }
}

export function getCategoryId(section: string): number | null {
  const normalizedSection = section.toLowerCase()
  
  // First try exact match
  if (CATEGORY_MAPPING[normalizedSection]) {
    return CATEGORY_MAPPING[normalizedSection]
  }
  
  // Try matching with category names from API
  const categoryNameToId: Record<string, number> = {
    'politics': 1,
    'business': 2,
    'sports': 3,
    'entertainment': 4,
  }
  
  return categoryNameToId[normalizedSection] || null
}

export function getCategoryName(categoryId: number): string {
  return CATEGORY_ID_TO_NAME[categoryId] || 'Unknown'
} 