import { render, screen, fireEvent } from '@testing-library/react'

// Mock the child components
jest.mock('@/components/admin/RawEditor', () => {
  return function MockRawEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return <textarea data-testid="raw-editor" value={value} onChange={(e) => onChange(e.target.value)} />
  }
})

jest.mock('@/components/admin/PreviewPane', () => {
  return function MockPreviewPane({ raw }: { raw: string }) {
    return <div data-testid="preview-pane">{raw.slice(0, 50)}</div>
  }
})

// Must import after mocks
import MarkdownEditor from '@/components/admin/MarkdownEditor'

describe('MarkdownEditor', () => {
  it('defaults to split view', () => {
    render(<MarkdownEditor value="test" onChange={jest.fn()} />)

    expect(screen.getByTestId('raw-editor')).toBeInTheDocument()
    expect(screen.getByTestId('preview-pane')).toBeInTheDocument()
  })

  it('shows only editor in edit mode', () => {
    render(<MarkdownEditor value="test" onChange={jest.fn()} />)

    fireEvent.click(screen.getByText('Edit'))

    expect(screen.getByTestId('raw-editor')).toBeInTheDocument()
    expect(screen.queryByTestId('preview-pane')).not.toBeInTheDocument()
  })

  it('shows only preview in preview mode', () => {
    render(<MarkdownEditor value="test" onChange={jest.fn()} />)

    fireEvent.click(screen.getByText('Preview'))

    expect(screen.queryByTestId('raw-editor')).not.toBeInTheDocument()
    expect(screen.getByTestId('preview-pane')).toBeInTheDocument()
  })

  it('renders view mode buttons', () => {
    render(<MarkdownEditor value="test" onChange={jest.fn()} />)

    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Split')).toBeInTheDocument()
    expect(screen.getByText('Preview')).toBeInTheDocument()
  })

  it('passes value and onChange to editor', () => {
    const onChange = jest.fn()
    render(<MarkdownEditor value="hello" onChange={onChange} />)

    const editor = screen.getByTestId('raw-editor')
    fireEvent.change(editor, { target: { value: 'world' } })

    expect(onChange).toHaveBeenCalledWith('world')
  })
})
