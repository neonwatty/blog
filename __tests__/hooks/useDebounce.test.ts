import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@/hooks/useDebounce'

jest.useFakeTimers()

describe('useDebounce', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300))
    expect(result.current).toBe('hello')
  })

  it('does not update before the delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'hello' },
    })

    rerender({ value: 'world' })

    act(() => {
      jest.advanceTimersByTime(100)
    })

    expect(result.current).toBe('hello')
  })

  it('updates after the delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'hello' },
    })

    rerender({ value: 'world' })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe('world')
  })

  it('resets the timer on rapid changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'b' })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    rerender({ value: 'c' })
    act(() => {
      jest.advanceTimersByTime(200)
    })

    // Should still be 'a' since timer keeps resetting
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(100)
    })

    // Now 300ms since last change ('c'), should update
    expect(result.current).toBe('c')
  })
})
