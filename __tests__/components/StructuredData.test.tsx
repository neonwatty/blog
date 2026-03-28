import React from 'react'
import { render } from '@testing-library/react'
import StructuredData from '@/components/StructuredData'
import { PostData } from '@/lib/posts'

const mockPost: PostData = {
  id: 'test-post',
  title: 'Test Post Title',
  date: '2025-01-15',
  excerpt: 'A test excerpt',
  content: 'Some test content for the post',
  tags: ['react', 'testing'],
  readingTime: '5 min read',
  author: 'Test Author',
  image: '/images/test.jpg',
}

describe('StructuredData', () => {
  it('renders website structured data by default', () => {
    const { container } = render(<StructuredData />)

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()

    const data = JSON.parse(script!.textContent!)
    expect(data['@type']).toBe('Website')
    expect(data.name).toContain('Blog')
  })

  it('renders blog structured data for type="blog"', () => {
    const { container } = render(<StructuredData type="blog" />)

    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script!.textContent!)

    expect(data['@type']).toBe('Blog')
  })

  it('renders article structured data with post', () => {
    const { container } = render(<StructuredData type="article" post={mockPost} />)

    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script!.textContent!)

    expect(data['@type']).toBe('BlogPosting')
    expect(data.headline).toBe('Test Post Title')
    expect(data.description).toBe('A test excerpt')
    expect(data.author.name).toBe('Test Author')
  })

  it('falls back to website type when article has no post', () => {
    const { container } = render(<StructuredData type="article" />)

    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script!.textContent!)

    expect(data['@type']).toBe('Website')
  })

  it('includes post image in article data', () => {
    const { container } = render(<StructuredData type="article" post={mockPost} />)

    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script!.textContent!)

    expect(data.image).toContain('/images/test.jpg')
  })

  it('uses default image when post has no image', () => {
    const postNoImage = { ...mockPost, image: undefined }
    const { container } = render(<StructuredData type="article" post={postNoImage} />)

    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script!.textContent!)

    expect(data.image).toContain('og-image.jpg')
  })

  it('includes word count and reading time', () => {
    const { container } = render(<StructuredData type="article" post={mockPost} />)

    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script!.textContent!)

    expect(data.wordCount).toBeGreaterThan(0)
    expect(data.timeRequired).toBe('5 min read')
  })

  it('includes keywords from tags', () => {
    const { container } = render(<StructuredData type="article" post={mockPost} />)

    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script!.textContent!)

    expect(data.keywords).toContain('react')
    expect(data.keywords).toContain('testing')
  })

  it('uses default author when not provided', () => {
    const postNoAuthor = { ...mockPost, author: undefined }
    const { container } = render(<StructuredData type="article" post={postNoAuthor} />)

    const script = container.querySelector('script[type="application/ld+json"]')
    const data = JSON.parse(script!.textContent!)

    expect(data.author.name).toBe('Jeremy Watt')
  })
})
