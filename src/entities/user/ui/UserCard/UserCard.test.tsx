import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { UserCard } from './UserCard'

function renderCard(overrides: Partial<Parameters<typeof UserCard>[0]> = {}) {
  return render(
    <UserCard
      id="user-1"
      name="Иван"
      city="Санкт-Петербург"
      age={34}
      avatarUrl={null}
      canTeach={[{ title: 'Игра на барабанах', category: 'art' }]}
      wantsToLearn={[
        { title: 'Тайм менеджмент', category: 'business' },
        { title: 'Медитация', category: 'health' },
        { title: 'Йога', category: 'health' },
        { title: 'Рисование', category: 'art' },
      ]}
      liked={false}
      onToggleLike={() => {}}
      {...overrides}
    />,
  )
}

describe('UserCard', () => {
  it('отображает имя, город и возраст', () => {
    renderCard()
    expect(screen.getByText('Иван')).toBeInTheDocument()
    expect(screen.getByText('Санкт-Петербург, 34 года')).toBeInTheDocument()
  })

  it('обрезает список "Хочет научиться" и показывает "+2"', () => {
    renderCard()
    expect(screen.getByText('Тайм менеджмент')).toBeInTheDocument()
    expect(screen.getByText('Медитация')).toBeInTheDocument()
    expect(screen.queryByText('Йога')).not.toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  it('вызывает onToggleLike при клике на сердечко', () => {
    const onToggleLike = vi.fn()
    renderCard({ onToggleLike })
    fireEvent.click(screen.getByRole('button', { name: 'Поставить лайк' }))
    expect(onToggleLike).toHaveBeenCalledTimes(1)
  })

  it('кнопка "Подробнее" вызывает onDetailsClick', () => {
    const onDetailsClick = vi.fn()
    renderCard({ onDetailsClick })
    fireEvent.click(screen.getByRole('button', { name: 'Подробнее' }))
    expect(onDetailsClick).toHaveBeenCalledTimes(1)
  })

  it('если обмен предложен — кнопка неактивна и с другим текстом', () => {
    const onDetailsClick = vi.fn()
    renderCard({ exchangeProposed: true, onDetailsClick })
    const button = screen.getByRole('button', { name: 'Обмен предложен' })
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(onDetailsClick).not.toHaveBeenCalled()
  })

  it('показывает количество лайков рядом с сердечком, если передан likesCount', () => {
    renderCard({ likesCount: 42 })
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('не показывает число рядом с сердечком, если likesCount не передан', () => {
    renderCard()
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument()
  })
})
