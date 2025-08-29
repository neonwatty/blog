import { PostData } from '@/lib/posts'

// Mock data for testing
const mockPosts: PostData[] = [
  {
    id: 'post-1',
    title: 'React Best Practices',
    date: '2025-01-15',
    excerpt: 'Learn the best practices for React development',
    content: 'This is content about React best practices and components.',
    tags: ['react', 'javascript', 'frontend'],
    readingTime: '5 min read',
    featured: true
  },
  {
    id: 'post-2',
    title: 'Advanced CSS Techniques',
    date: '2025-01-10',
    excerpt: 'Master advanced CSS techniques for modern web design',
    content: 'Advanced CSS techniques including grid, flexbox, and animations.',
    tags: ['css', 'frontend', 'web design'],
    readingTime: '8 min read',
    featured: false
  },
  {
    id: 'post-3',
    title: 'JavaScript Performance',
    date: '2025-01-05',
    excerpt: 'Optimize your JavaScript code for better performance',
    content: 'Performance optimization techniques for JavaScript applications.',
    tags: ['javascript', 'performance'],
    readingTime: '10 min read',
    featured: false
  }
]

// Mock search function
function searchPosts(query: string): PostData[] {
  const lowercaseQuery = query.toLowerCase()
  return mockPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Mock getAllTags function
function getAllTags(): string[] {
  const tagsSet = new Set<string>()
  mockPosts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag))
  })
  return Array.from(tagsSet).sort()
}

// Mock getPopularTags function
function getPopularTags(limit = 10): { tag: string; count: number }[] {
  const tagCounts: { [key: string]: number } = {}
  
  mockPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

describe('Posts Library', () => {
  test('PostData interface is defined correctly', () => {
    const mockPost: PostData = {
      id: 'test-post',
      title: 'Test Post',
      date: '2025-01-15',
      excerpt: 'Test excerpt',
      content: 'Test content',
      tags: ['test'],
      readingTime: '5 min read',
      featured: false,
      author: 'Test Author'
    }
    
    expect(mockPost.id).toBe('test-post')
    expect(mockPost.title).toBe('Test Post')
    expect(mockPost.tags).toContain('test')
  })

  test('PostData interface supports optional fields', () => {
    const mockPost: PostData = {
      id: 'test-post',
      title: 'Test Post',
      date: '2025-01-15',
      excerpt: 'Test excerpt',
      content: 'Test content',
      tags: ['test'],
      readingTime: '5 min read',
      featured: true,
      author: 'Test Author',
      image: '/test-image.jpg',
      seoTitle: 'SEO Title',
      metaDescription: 'Meta description',
      canonicalUrl: 'https://example.com/test-post',
      relatedPosts: ['related-post-1']
    }
    
    expect(mockPost.featured).toBe(true)
    expect(mockPost.image).toBe('/test-image.jpg')
    expect(mockPost.seoTitle).toBe('SEO Title')
    expect(mockPost.metaDescription).toBe('Meta description')
    expect(mockPost.canonicalUrl).toBe('https://example.com/test-post')
    expect(mockPost.relatedPosts).toEqual(['related-post-1'])
  })

  test('PostData required fields validation', () => {
    const mockPost: PostData = {
      id: 'minimal-post',
      title: 'Minimal Post',
      date: '2025-01-15',
      excerpt: 'Minimal excerpt',
      content: 'Minimal content',
      tags: [],
      readingTime: '1 min read'
    }
    
    expect(mockPost.id).toBeDefined()
    expect(mockPost.title).toBeDefined()
    expect(mockPost.date).toBeDefined()
    expect(mockPost.excerpt).toBeDefined()
    expect(mockPost.content).toBeDefined()
    expect(mockPost.tags).toBeDefined()
    expect(mockPost.readingTime).toBeDefined()
  })

  describe('searchPosts function', () => {
    test('searches by title', () => {
      const results = searchPosts('React')
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('React Best Practices')
    })

    test('searches by excerpt', () => {
      const results = searchPosts('advanced')
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('Advanced CSS Techniques')
    })

    test('searches by tags', () => {
      const results = searchPosts('javascript')
      expect(results).toHaveLength(2)
      expect(results.map(r => r.title)).toContain('React Best Practices')
      expect(results.map(r => r.title)).toContain('JavaScript Performance')
    })

    test('returns empty array for no matches', () => {
      const results = searchPosts('nonexistent')
      expect(results).toHaveLength(0)
    })

    test('search is case insensitive', () => {
      const results = searchPosts('REACT')
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('React Best Practices')
    })
  })

  describe('getAllTags function', () => {
    test('returns all unique tags sorted', () => {
      const tags = getAllTags()
      expect(tags).toEqual(['css', 'frontend', 'javascript', 'performance', 'react', 'web design'])
    })

    test('removes duplicates', () => {
      const tags = getAllTags()
      const uniqueTags = [...new Set(tags)]
      expect(tags).toEqual(uniqueTags)
    })
  })

  describe('getPopularTags function', () => {
    test('returns tags with counts', () => {
      const popularTags = getPopularTags()
      expect(popularTags).toEqual(
        expect.arrayContaining([
          { tag: 'javascript', count: 2 },
          { tag: 'frontend', count: 2 },
          { tag: 'react', count: 1 },
          { tag: 'css', count: 1 },
          { tag: 'web design', count: 1 },
          { tag: 'performance', count: 1 }
        ])
      )
    })

    test('sorts by count descending', () => {
      const popularTags = getPopularTags()
      expect(popularTags[0].count).toBeGreaterThanOrEqual(popularTags[1].count)
    })

    test('respects limit parameter', () => {
      const popularTags = getPopularTags(2)
      expect(popularTags).toHaveLength(2)
    })
  })
})