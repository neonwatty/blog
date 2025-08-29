import { PostData } from '@/lib/posts'

describe('Posts Library Types', () => {
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
})