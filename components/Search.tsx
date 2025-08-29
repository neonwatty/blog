'use client'

import { useState, useRef, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PostData } from '@/lib/posts'
import Link from 'next/link'

interface SearchProps {
  onSearch: (query: string) => PostData[]
}

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PostData[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length > 2) {
      const searchResults = onSearch(query)
      setResults(searchResults)
      setIsOpen(true)
      setSelectedIndex(-1)
    } else {
      setResults([])
      setIsOpen(false)
      setSelectedIndex(-1)
    }
  }, [query, onSearch])

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setSelectedIndex(-1)
      inputRef.current?.blur()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      const selectedPost = results[selectedIndex]
      if (selectedPost) {
        window.location.href = `/posts/${selectedPost.id}`
      }
    }
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(-1)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 2 && setIsOpen(true)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          aria-label="Search blog posts"
          role="searchbox"
          aria-haspopup="listbox"
          aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50"
          role="listbox"
          aria-label="Search results"
        >
          {results.map((post, index) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className={`block px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 transition-colors ${
                index === selectedIndex 
                  ? 'bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={handleResultClick}
              role="option"
              aria-selected={index === selectedIndex}
              id={`search-result-${index}`}
            >
              <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex gap-2 mt-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length > 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No posts found for "{query}"
          </p>
        </div>
      )}
    </div>
  )
}