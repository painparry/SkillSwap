import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FiltersSidebar } from './FiltersSidebar'

describe('FiltersSidebar', () => {
  it('renders filters title and default skill type', () => {
    render(<FiltersSidebar />)

    expect(screen.getByRole('heading', { name: 'Фильтры' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Всё' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Хочу научиться' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'Могу научить' })).not.toBeChecked()
  })

  it('allows only one skill type selection', () => {
    render(<FiltersSidebar />)

    fireEvent.click(screen.getByRole('radio', { name: 'Хочу научиться' }))

    expect(screen.getByRole('radio', { name: 'Всё' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'Хочу научиться' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Могу научить' })).not.toBeChecked()
  })

  it('renders skill categories and expands subcategory checkboxes', () => {
    render(<FiltersSidebar />)

    expect(screen.getByRole('button', { name: 'Показать подкатегории Бизнес и карьера' })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'Бизнес и карьера' })).not.toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'Маркетинг и реклама' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Показать подкатегории Бизнес и карьера' }))

    expect(screen.queryByRole('checkbox', { name: 'Бизнес и карьера' })).not.toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Маркетинг и реклама' })).toBeInTheDocument()
  })

  it('allows multiple subcategory selection', () => {
    render(<FiltersSidebar />)

    fireEvent.click(screen.getByRole('button', { name: 'Показать подкатегории Бизнес и карьера' }))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Управление командой' }))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Маркетинг и реклама' }))

    expect(screen.queryByRole('checkbox', { name: 'Бизнес и карьера' })).not.toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Управление командой' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Маркетинг и реклама' })).toBeChecked()
  })

  it('shows selected filters counter and resets filters', () => {
    render(<FiltersSidebar />)

    fireEvent.click(screen.getByRole('radio', { name: 'Хочу научиться' }))
    fireEvent.click(screen.getByRole('button', { name: 'Показать подкатегории Творчество и искусство' }))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Музыка и звук' }))

    expect(screen.getByRole('heading', { name: 'Фильтры (2)' })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'Творчество и искусство' })).not.toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Музыка и звук' })).toBeChecked()

    fireEvent.click(screen.getByRole('button', { name: /Сбросить/ }))

    expect(screen.getByRole('heading', { name: 'Фильтры' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Всё' })).toBeChecked()
    expect(screen.queryByRole('button', { name: /Сбросить/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'Музыка и звук' })).not.toBeInTheDocument()
  })

  it('allows only one author gender selection', () => {
    render(<FiltersSidebar />)

    fireEvent.click(screen.getByRole('radio', { name: 'Мужской' }))

    expect(screen.getByRole('radio', { name: 'Не имеет значения' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'Мужской' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Женский' })).not.toBeChecked()
  })

  it('renders first cities and expands all cities', () => {
    render(<FiltersSidebar />)

    expect(screen.getByRole('checkbox', { name: 'Казань' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Самара' })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'Уфа' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Все города' }))

    expect(screen.getByRole('checkbox', { name: 'Уфа' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Иркутск' })).toBeInTheDocument()
  })

  it('calls onChange with updated value', () => {
    const onChange = vi.fn()

    render(<FiltersSidebar onChange={onChange} />)

    fireEvent.click(screen.getByRole('checkbox', { name: 'Москва' }))

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        cities: ['Москва'],
      }),
    )
  })
})
