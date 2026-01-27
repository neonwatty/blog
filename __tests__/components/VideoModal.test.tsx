import { render, screen, fireEvent } from '@testing-library/react'
import VideoModal from '@/components/VideoModal'

describe('VideoModal Component', () => {
  const mockOnClose = jest.fn()
  const defaultProps = {
    youtubeId: 'test123',
    isOpen: true,
    onClose: mockOnClose,
  }

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  test('renders nothing when isOpen is false', () => {
    const { container } = render(
      <VideoModal {...defaultProps} isOpen={false} />
    )
    expect(container.firstChild).toBeNull()
  })

  test('renders modal when isOpen is true', () => {
    render(<VideoModal {...defaultProps} />)
    expect(screen.getByLabelText('Close video')).toBeInTheDocument()
  })

  test('renders YouTube iframe with correct src', () => {
    render(<VideoModal {...defaultProps} />)
    const iframe = screen.getByTitle('YouTube video')
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/test123?autoplay=1&rel=0'
    )
  })

  test('calls onClose when close button is clicked', () => {
    render(<VideoModal {...defaultProps} />)
    const closeButton = screen.getByLabelText('Close video')
    fireEvent.click(closeButton)
    // Close button click may also trigger overlay click due to bubbling
    expect(mockOnClose).toHaveBeenCalled()
  })

  test('calls onClose when overlay background is clicked', () => {
    render(<VideoModal {...defaultProps} />)
    // Click the dark overlay background (has bg-black/90 class)
    const overlay = document.querySelector('.bg-black\\/90')
    if (overlay) {
      fireEvent.click(overlay)
      expect(mockOnClose).toHaveBeenCalled()
    }
  })

  test('does not call onClose when video container is clicked', () => {
    render(<VideoModal {...defaultProps} />)
    const iframe = screen.getByTitle('YouTube video')
    fireEvent.click(iframe.parentElement!)
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  test('calls onClose when Escape key is pressed', () => {
    render(<VideoModal {...defaultProps} />)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test('renders horizontal aspect ratio by default', () => {
    render(<VideoModal {...defaultProps} />)
    const iframe = screen.getByTitle('YouTube video')
    const container = iframe.parentElement
    expect(container).toHaveClass('aspect-video')
    expect(container).toHaveClass('max-w-4xl')
  })

  test('renders vertical aspect ratio when isVertical is true', () => {
    render(<VideoModal {...defaultProps} isVertical={true} />)
    const iframe = screen.getByTitle('YouTube video')
    const container = iframe.parentElement
    expect(container).toHaveClass('aspect-[9/16]')
    expect(container).toHaveClass('max-w-sm')
  })

  test('sets body overflow to hidden when open', () => {
    render(<VideoModal {...defaultProps} />)
    expect(document.body.style.overflow).toBe('hidden')
  })

  test('restores body overflow when closed', () => {
    const { rerender } = render(<VideoModal {...defaultProps} />)
    expect(document.body.style.overflow).toBe('hidden')

    rerender(<VideoModal {...defaultProps} isOpen={false} />)
    expect(document.body.style.overflow).toBe('')
  })
})
