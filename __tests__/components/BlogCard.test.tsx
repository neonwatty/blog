import { render, screen } from '@testing-library/react'
import BlogCard from '@/components/BlogCard'
import { PostData } from '@/lib/posts'

const mockPost: PostData = {
  id: 'test-post',
  title: 'Test Blog Post',
  date: '2025-01-15',
  excerpt: 'This is a test excerpt for our blog post',
  content: 'This is test content',
  tags: ['test', 'blog', 'jest'],
  readingTime: '5 min read',
  featured: false,
  author: 'Test Author'
}

const mockFeaturedPost: PostData = {
  ...mockPost,
  id: 'featured-post',
  title: 'Featured Blog Post',
  featured: true
}

describe('BlogCard', () => {
  test('renders blog post correctly', () => {
    render(<BlogCard post={mockPost} />)
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.getByText('This is a test excerpt for our blog post')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('blog')).toBeInTheDocument()
    expect(screen.getByText('jest')).toBeInTheDocument()
  })

  test('has accessible link to post', () => {
    render(<BlogCard post={mockPost} />)
    
    const titleLink = screen.getByRole('link', { name: /test blog post/i })
    expect(titleLink).toHaveAttribute('href', '/posts/test-post')
    
    const readMoreLink = screen.getByRole('link', { name: /read more/i })
    expect(readMoreLink).toHaveAttribute('href', '/posts/test-post')
  })

  test('displays featured badge for featured posts', () => {
    render(<BlogCard post={mockFeaturedPost} />)
    
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  test('does not display featured badge for non-featured posts', () => {
    render(<BlogCard post={mockPost} />)
    
    expect(screen.queryByText('Featured')).not.toBeInTheDocument()
  })

  test('displays formatted date', () => {
    render(<BlogCard post={mockPost} />)
    
    expect(screen.getByText('January 15, 2025')).toBeInTheDocument()
  })

  test('limits tags display to 3 tags', () => {
    const postWithManyTags = {
      ...mockPost,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']
    }
    
    render(<BlogCard post={postWithManyTags} />)
    
    expect(screen.getByText('tag1')).toBeInTheDocument()
    expect(screen.getByText('tag2')).toBeInTheDocument()
    expect(screen.getByText('tag3')).toBeInTheDocument()
    expect(screen.queryByText('tag4')).not.toBeInTheDocument()
    expect(screen.queryByText('tag5')).not.toBeInTheDocument()
  })

  test('renders with image when provided', () => {
    const postWithImage = {
      ...mockPost,
      image: '/test-image.jpg'
    }
    
    render(<BlogCard post={postWithImage} />)
    
    const image = screen.getByAltText('Test Blog Post')
    expect(image).toBeInTheDocument()
  })
})