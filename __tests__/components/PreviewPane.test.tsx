import { render, screen, act } from '@testing-library/react'

// Mock react-markdown
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: string }) {
    return <div data-testid="markdown-content">{children}</div>
  }
})

jest.mock('remark-gfm', () => jest.fn())
jest.mock('rehype-sanitize', () => jest.fn())

// Mock useDebounce to return immediately
jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}))

import PreviewPane from '@/components/admin/PreviewPane'

describe('PreviewPane', () => {
  it('renders markdown body', () => {
    const raw = `---
title: Test Post
date: 2025-01-15
---

Hello world`

    render(<PreviewPane raw={raw} />)

    expect(screen.getByTestId('markdown-content')).toHaveTextContent('Hello world')
  })

  it('displays frontmatter title', () => {
    const raw = `---
title: My Great Post
date: 2025-01-15
---

Content here`

    render(<PreviewPane raw={raw} />)

    expect(screen.getByText('My Great Post')).toBeInTheDocument()
  })

  it('displays date', () => {
    const raw = `---
title: Test
date: 2025-01-15
---

Content`

    render(<PreviewPane raw={raw} />)

    expect(screen.getByText('2025-01-15')).toBeInTheDocument()
  })

  it('displays tags', () => {
    const raw = `---
title: Test
date: 2025-01-15
tags:
  - react
  - next
---

Content`

    render(<PreviewPane raw={raw} />)

    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('next')).toBeInTheDocument()
  })

  it('shows draft badge when draft is true', () => {
    const raw = `---
title: Test
date: 2025-01-15
draft: true
---

Content`

    render(<PreviewPane raw={raw} />)

    expect(screen.getByText('Draft')).toBeInTheDocument()
  })

  it('handles raw content without frontmatter', () => {
    render(<PreviewPane raw="Just plain markdown" />)

    expect(screen.getByTestId('markdown-content')).toHaveTextContent('Just plain markdown')
  })
})
