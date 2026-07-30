import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ActiveFilters } from './ActiveFilters'

const filters = [
  { id: 'learn', label: 'Хочу научиться' },
  { id: 'english', label: 'Английский' },
]

describe('ActiveFilters', () => {
  it('renders filters title with selected filters count', () => {
    render(<ActiveFilters filters={filters} onRemove={vi.fn()} onReset={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'Фильтры (2)' })).toBeInTheDocument()
  })

  it('renders reset button and selected filter tags', () => {
    render(<ActiveFilters filters={filters} onRemove={vi.fn()} onReset={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Сбросить все фильтры' })).toBeInTheDocument()
    expect(screen.getByText('Хочу научиться')).toBeInTheDocument()
    expect(screen.getByText('Английский')).toBeInTheDocument()
  })

  it('calls onReset by reset button click', () => {
    const onReset = vi.fn()

    render(<ActiveFilters filters={filters} onRemove={vi.fn()} onReset={onReset} />)

    fireEvent.click(screen.getByRole('button', { name: 'Сбросить все фильтры' }))

    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('calls onRemove with selected filter id by tag cross click', () => {
    const onRemove = vi.fn()

    render(<ActiveFilters filters={filters} onRemove={onRemove} onReset={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: /Хочу научиться/ }))

    expect(onRemove).toHaveBeenCalledWith('learn')
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('shows zero counter and disables reset button without selected filters', () => {
    render(<ActiveFilters filters={[]} onRemove={vi.fn()} onReset={vi.fn()} />)

    expect(screen.getByRole('heading', { name: 'Фильтры (0)' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Сбросить все фильтры' })).toBeDisabled()
    expect(screen.queryByRole('list', { name: 'Выбранные фильтры' })).not.toBeInTheDocument()
  })
})
