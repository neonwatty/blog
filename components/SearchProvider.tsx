'use client'

import { PostData } from '@/lib/posts'
import Search from './Search'

interface SearchProviderProps {
  allPosts: PostData[]
}

export default function SearchProvider({ allPosts }: SearchProviderProps) {
  const handleSearch = (query: string): PostData[] => {
    // Client-side search implementation
    const lowercaseQuery = query.toLowerCase()
    
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  return <Search onSearch={handleSearch} />
}