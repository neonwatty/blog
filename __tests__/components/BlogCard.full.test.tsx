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

describe('BlogCard Component (Full Test)', () => {
  test('renders blog post correctly', () => {
    render(<BlogCard post={mockPost} />)
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.getByText('This is a test excerpt for our blog post')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  test('has accessible link to post', () => {
    render(<BlogCard post={mockPost} />)
    
    const titleLink = screen.getByRole('link', { name: /test blog post/i })
    expect(titleLink).toHaveAttribute('href', '/posts/test-post')
  })
})