import { render, screen, fireEvent } from '@testing-library/react'
import RawEditor from '@/components/admin/RawEditor'

describe('RawEditor', () => {
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
})
