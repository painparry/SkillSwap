import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Tag } from './Tag'

describe('Tag', () => {
  it('отображает переданный текст', () => {
    render(<Tag label="Хочу научиться" onRemove={() => {}} />)
    expect(screen.getByText('Хочу научиться')).toBeInTheDocument()
  })

  it('вызывает onRemove при клике на крестик', () => {
    const onRemove = vi.fn()
    render(<Tag label="Хочу научиться" onRemove={onRemove} />)
    fireEvent.click(screen.getByRole('button', { name: 'Удалить «Хочу научиться»' }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('крестик — единственный интерактивный элемент внутри плашки', () => {
    render(<Tag label="Хочу научиться" onRemove={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(1)
  })
})
