import React from 'react'
import { render, screen } from '@testing-library/react'
import Breadcrumbs from '@/components/Breadcrumbs'

// Mock next/link
jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  }
})

// Mock heroicons
jest.mock('@heroicons/react/24/solid', () => ({
  ChevronRightIcon: (props: Record<string, unknown>) => <svg data-testid="chevron-icon" {...props} />,
}))

describe('Breadcrumbs', () => {
  it('renders all breadcrumb items', () => {
    render(
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'My Post' }]} />,
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('My Post')).toBeInTheDocument()
  })

  it('renders links for items with href (except last)', () => {
    render(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Post' }]} />)

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Blog').closest('a')).toHaveAttribute('href', '/blog')
    expect(screen.getByText('Post').closest('a')).toBeNull() // last item is span
  })

  it('marks the last item as current page', () => {
    render(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Current Page' }]} />)

    expect(screen.getByText('Current Page')).toHaveAttribute('aria-current', 'page')
  })

  it('renders chevron separators between items', () => {
    render(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: 'Post' }]} />)

    const chevrons = screen.getAllByTestId('chevron-icon')
    expect(chevrons).toHaveLength(2) // one between each pair
  })

  it('does not render chevron before the first item', () => {
    render(<Breadcrumbs items={[{ label: 'Home', href: '/' }]} />)

    expect(screen.queryByTestId('chevron-icon')).not.toBeInTheDocument()
  })

  it('renders JSON-LD structured data', () => {
    const { container } = render(<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Post' }]} />)

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()

    const data = JSON.parse(script!.textContent!)
    expect(data['@type']).toBe('BreadcrumbList')
    expect(data.itemListElement).toHaveLength(2)
    expect(data.itemListElement[0].position).toBe(1)
    expect(data.itemListElement[1].position).toBe(2)
  })

  it('renders last item with href as span (not link)', () => {
    render(
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Last', href: '/last' },
        ]}
      />,
    )

    // Last item should be a span even if it has href
    expect(screen.getByText('Last').tagName).toBe('SPAN')
  })
})
