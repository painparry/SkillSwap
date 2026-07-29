import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { UserSection } from './Section'
import { UserCardProps } from '@/entities/user/ui/UserCard'
import { SkillCategory } from '../SkillList'

const mockUsers: UserCardProps[] = [
  {
    id: 'user-1',
    name: 'Анна Иванова',
    city: 'Москва',
    age: 28,
    avatarUrl: null,
    canTeach: [{ title: 'Английский язык', category: 'languages' as SkillCategory }],
    wantsToLearn: [{ title: 'Фотография', category: 'art' as SkillCategory }],
    liked: false,
    onToggleLike: () => console.log('Like toggled for user-1'),
    likesCount: 42,
    exchangeProposed: false,
    onDetailsClick: () => console.log('Details clicked for user-1'),
  },
  {
    id: 'user-2',
    name: 'Пётр Сидоров',
    city: 'Санкт-Петербург',
    age: 35,
    avatarUrl: 'https://example.com/avatar2.jpg',
    canTeach: [{ title: 'Программирование', category: 'education' as SkillCategory }],
    wantsToLearn: [{ title: 'Дизайн', category: 'art' as SkillCategory }],
    liked: true,
    onToggleLike: () => console.log('Like toggled for user-2'),
    likesCount: 15,
    exchangeProposed: true,
    onDetailsClick: () => console.log('Details clicked for user-2'),
  },
  {
    id: 'user-3',
    name: 'Мария Петрова',
    city: 'Казань',
    age: 30,
    avatarUrl: null,
    canTeach: [{ title: 'Йога', category: 'health' as SkillCategory }],
    wantsToLearn: [{ title: 'Кулинария', category: 'home' as SkillCategory }],
    liked: false,
    onToggleLike: () => console.log('Like toggled for user-3'),
    likesCount: 8,
    exchangeProposed: false,
    onDetailsClick: () => console.log('Details clicked for user-3'),
  },
]

function renderUserSection(overrides: Partial<Parameters<typeof UserSection>[0]> = {}) {
  return render(<UserSection title="Популярное" users={mockUsers} {...overrides} />)
}
describe('UserSection', () => {
  it('отображает заголовок секции', () => {
    renderUserSection()
    expect(screen.getByText('Популярное')).toBeInTheDocument()
  })

  it('в свёрнутом состоянии отображает 3 карточки', () => {
    renderUserSection()

    expect(screen.getByText('Анна Иванова')).toBeInTheDocument()
    expect(screen.getByText('Пётр Сидоров')).toBeInTheDocument()
    expect(screen.getByText('Мария Петрова')).toBeInTheDocument()
  })

  it('изначально отображает кнопку "Смотреть все"', () => {
    renderUserSection()
    expect(screen.getByRole('button', { name: 'Смотреть все' })).toBeInTheDocument()
  })

  it('при клике на "Смотреть все" отображаются 6 карточек', () => {
    const sixUsers = Array.from({ length: 6 }, (_, i) => ({
      id: `user-${i + 1}`,
      name: `Пользователь ${i + 1}`,
      city: 'Город',
      age: 25 + i,
      avatarUrl: null,
      canTeach: [
        {
          title: `Навык ${i + 1}`,
          category: ['business', 'languages', 'home', 'art', 'education', 'health', 'other'][
            i % 7
          ] as SkillCategory,
        },
      ],
      wantsToLearn: [
        {
          title: `Учить ${i + 1}`,
          category: ['art', 'health', 'business'][i % 3] as SkillCategory,
        },
      ],
      liked: i % 2 === 0,
      onToggleLike: vi.fn(),
      likesCount: 0,
      exchangeProposed: false,
      onDetailsClick: vi.fn(),
    }))

    renderUserSection({ users: sixUsers })

    expect(screen.getByText('Пользователь 1')).toBeInTheDocument()
    expect(screen.getByText('Пользователь 2')).toBeInTheDocument()
    expect(screen.getByText('Пользователь 3')).toBeInTheDocument()
    expect(screen.queryByText('Пользователь 4')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Смотреть все' }))

    expect(screen.getByText('Пользователь 4')).toBeInTheDocument()
    expect(screen.getByText('Пользователь 5')).toBeInTheDocument()
    expect(screen.getByText('Пользователь 6')).toBeInTheDocument()
  })

  it('при клике на "Свернуть" снова отображаются 3 карточки', () => {
    const sixUsers = Array.from({ length: 6 }, (_, i) => ({
      id: `user-${i + 1}`,
      name: `Пользователь ${i + 1}`,
      city: 'Город',
      age: 25 + i,
      avatarUrl: null,
      canTeach: [
        {
          title: `Навык ${i + 1}`,
          category: ['business', 'languages', 'home', 'art', 'education', 'health', 'other'][
            i % 7
          ] as SkillCategory,
        },
      ],
      wantsToLearn: [
        {
          title: `Учить ${i + 1}`,
          category: ['art', 'health', 'business'][i % 3] as SkillCategory,
        },
      ],
      liked: i % 2 === 0,
      onToggleLike: vi.fn(),
      likesCount: 0,
      exchangeProposed: false,
      onDetailsClick: vi.fn(),
    }))

    renderUserSection({ users: sixUsers })

    fireEvent.click(screen.getByRole('button', { name: 'Смотреть все' }))
    expect(screen.getByText('Пользователь 4')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Свернуть' }))

    expect(screen.getByText('Пользователь 1')).toBeInTheDocument()
    expect(screen.getByText('Пользователь 2')).toBeInTheDocument()
    expect(screen.getByText('Пользователь 3')).toBeInTheDocument()
    expect(screen.queryByText('Пользователь 4')).not.toBeInTheDocument()
  })

  it('кнопка меняет текст с "Смотреть все" на "Свернуть"', () => {
    const fiveUsers = Array.from({ length: 5 }, (_, i) => ({
      id: `user-${i + 1}`,
      name: `Пользователь ${i + 1}`,
      city: 'Город',
      age: 25 + i,
      avatarUrl: null,
      canTeach: [
        {
          title: `Навык ${i + 1}`,
          category: ['business', 'languages', 'home'][i % 3] as SkillCategory,
        },
      ],
      wantsToLearn: [
        {
          title: `Учить ${i + 1}`,
          category: ['art', 'health'][i % 2] as SkillCategory,
        },
      ],
      liked: false,
      onToggleLike: vi.fn(),
      likesCount: 0,
      exchangeProposed: false,
      onDetailsClick: vi.fn(),
    }))

    renderUserSection({ users: fiveUsers })

    expect(screen.getByRole('button', { name: 'Смотреть все' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Смотреть все' }))

    expect(screen.getByRole('button', { name: 'Свернуть' })).toBeInTheDocument()
  })

  it('сохраняет состояние expanded при повторном рендере', () => {
    const { rerender } = renderUserSection()

    fireEvent.click(screen.getByRole('button', { name: 'Смотреть все' }))
    expect(screen.getByRole('button', { name: 'Свернуть' })).toBeInTheDocument()

    rerender(<UserSection title="Популярное" users={mockUsers} />)

    expect(screen.getByRole('button', { name: 'Свернуть' })).toBeInTheDocument()
  })
})
