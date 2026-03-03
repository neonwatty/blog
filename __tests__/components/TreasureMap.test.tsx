import { render, screen, fireEvent } from '@testing-library/react'
import TreasureMap from '@/components/TreasureMap'

const mockImages = [
  {
    src: '/img1.png',
    alt: 'First image',
    position: { top: '50px', left: '50px' },
  },
  {
    src: '/img2.png',
    alt: 'Second image',
    position: { top: '400px', right: '50px' },
  },
]

const mockPaths = ['M 100 100 L 200 200', 'M 200 200 L 300 400']

describe('TreasureMap', () => {
  it('renders the start flag with default title', () => {
    render(<TreasureMap images={mockImages} paths={mockPaths} />)
    expect(screen.getByText(/START HERE/)).toBeInTheDocument()
  })

  it('renders custom title', () => {
    render(<TreasureMap images={mockImages} paths={mockPaths} title="BEGIN" />)
    expect(screen.getByText(/BEGIN/)).toBeInTheDocument()
  })

  it('renders all images', () => {
    render(<TreasureMap images={mockImages} paths={mockPaths} />)
    expect(screen.getByAltText('First image')).toBeInTheDocument()
    expect(screen.getByAltText('Second image')).toBeInTheDocument()
  })

  it('renders numbered badges for each image', () => {
    render(<TreasureMap images={mockImages} paths={mockPaths} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('renders SVG paths', () => {
    const { container } = render(<TreasureMap images={mockImages} paths={mockPaths} />)
    const pathElements = container.querySelectorAll('svg path')
    expect(pathElements).toHaveLength(2)
  })

  it('shows THE END after the last image', () => {
    render(<TreasureMap images={mockImages} paths={mockPaths} />)
    expect(screen.getByText(/THE END/)).toBeInTheDocument()
  })

  it('opens lightbox on image click', () => {
    render(<TreasureMap images={mockImages} paths={mockPaths} />)
    const img = screen.getByAltText('First image')
    fireEvent.click(img)

    // Lightbox should show enlarged view
    expect(screen.getByAltText('Enlarged view')).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('closes lightbox on backdrop click', () => {
    render(<TreasureMap images={mockImages} paths={mockPaths} />)
    const img = screen.getByAltText('First image')
    fireEvent.click(img)

    // Click the lightbox backdrop (the enlarged image wrapper)
    const enlargedImg = screen.getByAltText('Enlarged view')
    fireEvent.click(enlargedImg.parentElement!)

    expect(screen.queryByAltText('Enlarged view')).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('auto')
  })

  it('closes lightbox on Escape key', () => {
    render(<TreasureMap images={mockImages} paths={mockPaths} />)
    const img = screen.getByAltText('First image')
    fireEvent.click(img)

    const lightbox = screen.getByAltText('Enlarged view').parentElement!
    fireEvent.keyDown(lightbox, { key: 'Escape' })

    expect(screen.queryByAltText('Enlarged view')).not.toBeInTheDocument()
  })
})
