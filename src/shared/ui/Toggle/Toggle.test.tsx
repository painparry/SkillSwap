import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Toggle } from './Toggle'

describe('Toggle', () => {
  it('вызывает onToggle при клике', () => {
    const onToggle = vi.fn()
    render(<Toggle liked={false} onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('отражает состояние liked через aria-pressed', () => {
    const { rerender } = render(<Toggle liked={false} onToggle={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')

    rerender(<Toggle liked onToggle={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('не показывает счётчик, если count не передан', () => {
    render(<Toggle liked={false} onToggle={() => {}} />)
    expect(screen.queryByText(/\d/)).not.toBeInTheDocument()
  })

  it('показывает счётчик, если count передан', () => {
    render(<Toggle liked={false} onToggle={() => {}} count={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})
