import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from '@/components/Search'
import { PostData } from '@/lib/posts'

const mockPosts: PostData[] = [
  {
    id: 'nextjs-guide',
    title: 'Getting Started with Next.js',
    date: '2025-01-15',
    excerpt: 'Learn how to build modern web applications with Next.js',
    content: 'Next.js tutorial content',
    tags: ['Next.js', 'React', 'JavaScript'],
    readingTime: '5 min read',
    featured: true,
    author: 'Test Author'
  },
  {
    id: 'css-techniques',
    title: 'Modern CSS Techniques',
    date: '2025-01-10',
    excerpt: 'Explore the latest CSS features for modern web design',
    content: 'CSS tutorial content',
    tags: ['CSS', 'Web Design'],
    readingTime: '3 min read',
    featured: false,
    author: 'Test Author'
  }
]

const mockSearchFunction = (query: string): PostData[] => {
  return mockPosts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  )
}

describe('Search', () => {
  test('renders search input correctly', () => {
    render(<Search onSearch={mockSearchFunction} />)
    
    const searchInput = screen.getByRole('searchbox', { name: /search blog posts/i })
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('placeholder', 'Search posts...')
  })

  test('shows search results when query length > 2', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockSearchFunction} />)
    
    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'Next')
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
      expect(screen.getByText('Getting Started with Next.js')).toBeInTheDocument()
    })
  })

  test('does not show results for short queries', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockSearchFunction} />)
    
    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'Ne')
    
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  test('shows no results message when no posts match', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockSearchFunction} />)
    
    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'nonexistent')
    
    await waitFor(() => {
      expect(screen.getByText('No posts found for "nonexistent"')).toBeInTheDocument()
    })
  })

  test('closes search results on escape key', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockSearchFunction} />)
    
    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'Next')
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
    
    fireEvent.keyDown(searchInput, { key: 'Escape' })
    
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  test('supports keyboard navigation with arrow keys', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockSearchFunction} />)
    
    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'CSS')
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
    
    // Navigate down with arrow key
    fireEvent.keyDown(searchInput, { key: 'ArrowDown' })
    
    const firstResult = screen.getByRole('option')
    expect(firstResult).toHaveClass('bg-blue-50')
  })

  test('displays post tags in search results', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockSearchFunction} />)
    
    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'Next')
    
    await waitFor(() => {
      expect(screen.getByText('Next.js')).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
    })
  })

  test('clears search and closes results when clicking a result', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockSearchFunction} />)
    
    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'Next')
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
    
    const resultLink = screen.getByRole('option')
    await user.click(resultLink)
    
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})