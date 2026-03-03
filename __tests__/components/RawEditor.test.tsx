import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import RawEditor from '@/components/admin/RawEditor'

// Mock fetch for upload tests
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('RawEditor', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('renders a textarea with the provided value', () => {
    render(<RawEditor value="Hello world" onChange={jest.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('Hello world')
  })

  it('calls onChange when text is typed', () => {
    const onChange = jest.fn()
    render(<RawEditor value="" onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new text' } })
    expect(onChange).toHaveBeenCalledWith('new text')
  })

  it('has spellCheck disabled', () => {
    render(<RawEditor value="" onChange={jest.fn()} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('spellcheck', 'false')
  })

  it('shows placeholder text', () => {
    render(<RawEditor value="" onChange={jest.fn()} />)
    expect(screen.getByPlaceholderText(/title: Your Post Title/)).toBeInTheDocument()
  })

  it('shows drag-over visual when dragging over textarea', () => {
    render(<RawEditor value="" onChange={jest.fn()} slug="test" />)
    const textarea = screen.getByRole('textbox')

    fireEvent.dragOver(textarea)

    expect(textarea.className).toContain('ring-2')
  })

  it('removes drag-over visual on drag leave', () => {
    render(<RawEditor value="" onChange={jest.fn()} slug="test" />)
    const textarea = screen.getByRole('textbox')

    fireEvent.dragOver(textarea)
    fireEvent.dragLeave(textarea)

    expect(textarea.className).not.toContain('ring-2')
  })

  it('uploads image on drop and inserts markdown', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, path: '/images/posts/test/photo.png' }),
    })

    const onChange = jest.fn()
    render(<RawEditor value="hello" onChange={onChange} slug="test" />)
    const textarea = screen.getByRole('textbox')

    const file = new File(['img'], 'photo.png', { type: 'image/png' })
    const dataTransfer = { files: [file] }

    await act(async () => {
      fireEvent.drop(textarea, { dataTransfer })
    })

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/admin/images', expect.objectContaining({ method: 'POST' }))
    })

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(expect.stringContaining('![photo.png]'))
    })
  })

  it('does not upload when slug is not provided', async () => {
    const onChange = jest.fn()
    render(<RawEditor value="" onChange={onChange} />)
    const textarea = screen.getByRole('textbox')

    const file = new File(['img'], 'photo.png', { type: 'image/png' })
    await act(async () => {
      fireEvent.drop(textarea, { dataTransfer: { files: [file] } })
    })

    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('handles upload failure gracefully', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation()
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid file type' }),
    })

    const onChange = jest.fn()
    render(<RawEditor value="" onChange={onChange} slug="test" />)
    const textarea = screen.getByRole('textbox')

    const file = new File(['img'], 'bad.js', { type: 'image/png' })
    await act(async () => {
      fireEvent.drop(textarea, { dataTransfer: { files: [file] } })
    })

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith('Upload failed:', 'Invalid file type')
    })

    errorSpy.mockRestore()
  })

  it('handles paste with image', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, path: '/images/posts/test/pasted.png' }),
    })

    const onChange = jest.fn()
    render(<RawEditor value="" onChange={onChange} slug="test" />)
    const textarea = screen.getByRole('textbox')

    const file = new File(['img'], 'pasted.png', { type: 'image/png' })
    const clipboardData = {
      items: [{ type: 'image/png', getAsFile: () => file }],
    }

    await act(async () => {
      fireEvent.paste(textarea, { clipboardData })
    })

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled()
    })
  })

  it('ignores non-image drops', async () => {
    render(<RawEditor value="" onChange={jest.fn()} slug="test" />)
    const textarea = screen.getByRole('textbox')

    const file = new File(['data'], 'doc.pdf', { type: 'application/pdf' })
    await act(async () => {
      fireEvent.drop(textarea, { dataTransfer: { files: [file] } })
    })

    expect(mockFetch).not.toHaveBeenCalled()
  })
})
