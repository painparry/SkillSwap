import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect } from 'vitest'
import { Carousel } from './Carousel'
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
  {
    id: 'user-4',
    name: 'Иван Кузнецов',
    city: 'Новосибирск',
    age: 25,
    avatarUrl: null,
    canTeach: [{ title: 'Математика', category: 'education' as SkillCategory }],
    wantsToLearn: [{ title: 'Физика', category: 'science' as SkillCategory }],
    liked: true,
    onToggleLike: () => console.log('Like toggled for user-4'),
    likesCount: 22,
    exchangeProposed: false,
    onDetailsClick: () => console.log('Details clicked for user-4'),
  },
  {
    id: 'user-5',
    name: 'Елена Смирнова',
    city: 'Екатеринбург',
    age: 29,
    avatarUrl: 'https://example.com/avatar5.jpg',
    canTeach: [{ title: 'Рисование', category: 'art' as SkillCategory }],
    wantsToLearn: [{ title: 'Скульптура', category: 'art' as SkillCategory }],
    liked: false,
    onToggleLike: () => console.log('Like toggled for user-5'),
    likesCount: 18,
    exchangeProposed: true,
    onDetailsClick: () => console.log('Details clicked for user-5'),
  },
]

function renderCarousel(overrides: Partial<Parameters<typeof Carousel>[0]> = {}) {
  return render(<Carousel items={mockUsers} {...overrides} />)
}

it('отображает карточки пользователей', () => {
  renderCarousel()
  expect(screen.getByText('Анна Иванова')).toBeInTheDocument()
  expect(screen.getByText('Пётр Сидоров')).toBeInTheDocument()
  expect(screen.getByText('Мария Петрова')).toBeInTheDocument()
  expect(screen.getByText('Иван Кузнецов')).toBeInTheDocument()
  expect(screen.getByText('Елена Смирнова')).toBeInTheDocument()
})

it('отображает сообщение "Нет пользователей для отображения", если items пуст', () => {
  renderCarousel({ items: [] })
  expect(screen.getByText('Нет пользователей для отображения')).toBeInTheDocument()
})

it('показывает кнопки навигации, если больше одного элемента', () => {
  renderCarousel()
  expect(screen.getByLabelText('Прокрутить карусель назад')).toBeInTheDocument()
  expect(screen.getByLabelText('Прокрутить карусель вперёд')).toBeInTheDocument()
})

it('скрывает кнопки навигации, если один или меньше элементов', () => {
  renderCarousel({ items: [mockUsers[0]] })
  expect(screen.queryByLabelText('Прокрутить карусель назад')).not.toBeInTheDocument()
  expect(screen.queryByLabelText('Прокрутить карусель вперёд')).not.toBeInTheDocument()
})

it('кнопка "назад" отключена на первой позиции', () => {
  renderCarousel()
  const prevButton = screen.getByLabelText('Прокрутить карусель назад')
  expect(prevButton).toBeDisabled()
})

it('кнопка "вперёд" отключена на последней позиции', async () => {
  renderCarousel()

  const nextButton = screen.getByLabelText('Прокрутить карусель вперёд')
  const carouselContainer = screen.getByTestId('carousel-container')

  for (let i = 0; i < 4; i++) {
    fireEvent.click(nextButton)
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  expect(nextButton).toBeDisabled()
  expect(carouselContainer.scrollLeft).toBeGreaterThanOrEqual(1280)
})

it('прокручивает карусель вперёд при клике на кнопку "вперёд"', async () => {
  renderCarousel()

  const nextButton = screen.getByLabelText('Прокрутить карусель вперёд')
  const carouselContainer = screen.getByTestId('carousel-container')
  const initialScrollLeft = carouselContainer.scrollLeft

  fireEvent.click(nextButton)
  await new Promise((resolve) => setTimeout(resolve, 300))

  expect(carouselContainer.scrollLeft).toBeGreaterThan(initialScrollLeft)
})

it('прокручивает карусель назад при клике на кнопку "назад"', async () => {
  renderCarousel()

  const nextButton = screen.getByLabelText('Прокрутить карусель вперёд')
  const prevButton = screen.getByLabelText('Прокрутить карусель назад')
  const carouselContainer = screen.getByTestId('carousel-container')
  const initialScrollLeft = carouselContainer.scrollLeft

  fireEvent.click(nextButton)
  await new Promise((resolve) => setTimeout(resolve, 300))

  const scrollAfterNext = carouselContainer.scrollLeft
  expect(scrollAfterNext).toBeGreaterThan(initialScrollLeft)

  fireEvent.click(prevButton)
  await new Promise((resolve) => setTimeout(resolve, 300))

  const finalScrollLeft = carouselContainer.scrollLeft
  expect(finalScrollLeft).toBeLessThan(scrollAfterNext)
  expect(finalScrollLeft).toBeCloseTo(initialScrollLeft, 1)
})
