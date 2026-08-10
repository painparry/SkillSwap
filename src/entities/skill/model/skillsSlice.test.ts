import { expect, test } from 'vitest'
import { Skill } from './types'
import reducer, {
  fetchSkillsThunk,
  initialState,
  resetFilters,
  setCategoryFilter,
  setCityFilter,
  setGenderFilter,
  setSubcategoryFilter,
  setTypeFilter,
} from './skillsSlice'
import { RootState } from '@/store'
import { selectFilteredSkills } from './selectors'

const mockSkills: Skill[] = [
  {
    id: 'skill_001',
    title: 'Маркетинг и реклама',
    description:
      'Привет! Я занимаюсь маркетингом и рекламой уже несколько лет — помогал проектам находить клиентов и выстраивать эффективное продвижение. Научу анализировать аудиторию, запускать рекламные кампании и создавать понятную маркетинговую стратегию без сложного профессионального жаргона.',
    type: 'teach',
    category: 'business',
    subcategory: 'marketing',
    tags: 'бизнес',
    imageUrl: null,
    authorId: 'user_001',
    createdAt: '2021-01-18T10:32:00Z',
  },
  {
    id: 'skill_002',
    title: 'Предпринимательство',
    description:
      'Привет! Я запускал собственные проекты и знаю, с какими трудностями сталкиваются предприниматели в начале пути. Поделюсь опытом проверки идей, поиска первых клиентов и выстраивания рабочих процессов без лишней теории.',
    type: 'teach',
    category: 'business',
    subcategory: 'entrepreneurship',
    tags: 'бизнес',
    imageUrl: null,
    authorId: 'user_001',
    createdAt: '2021-01-24T15:10:00Z',
  },
  {
    id: 'skill_003',
    title: 'Питание и ЗОЖ',
    description:
      'Привет! Хочу лучше разобраться в питании и здоровом образе жизни. Интересует, как составлять сбалансированный рацион, поддерживать энергию в течение дня и постепенно формировать полезные привычки без строгих диет.',
    type: 'learn',
    category: 'health',
    subcategory: 'nutrition',
    tags: 'здоровье',
    imageUrl: null,
    authorId: 'user_001',
    createdAt: '2021-02-03T09:45:00Z',
  },
  {
    id: 'skill_004',
    title: 'Английский',
    description:
      'Привет! Я свободно использую английский в работе и путешествиях уже много лет. Помогу подтянуть разговорную речь, разобраться с грамматикой, улучшить произношение и чувствовать себя увереннее в общении.',
    type: 'teach',
    category: 'languages',
    subcategory: 'english',
    tags: 'языки',
    imageUrl: null,
    authorId: 'user_002',
    createdAt: '2021-03-06T11:15:00Z',
  },
  {
    id: 'skill_005',
    title: 'Хранение вещей',
    description:
      'Привет! Хочу научиться лучше организовывать хранение вещей дома. Интересуют удобные системы, которые помогают поддерживать порядок, экономить место и не тратить время на поиски нужных вещей.',
    type: 'learn',
    category: 'home',
    subcategory: 'storage',
    tags: 'дом',
    imageUrl: null,
    authorId: 'user_002',
    createdAt: '2021-03-14T18:30:00Z',
  },
  {
    id: 'skill_006',
    title: 'Физические тренировки',
    description:
      'Привет! Хочу научиться выстраивать эффективные тренировки и заниматься регулярно. Интересует техника упражнений, безопасная нагрузка и развитие силы и выносливости без риска для здоровья.',
    type: 'learn',
    category: 'health',
    subcategory: 'fitness',
    tags: 'здоровье',
    imageUrl: null,
    authorId: 'user_002',
    createdAt: '2021-03-26T08:20:00Z',
  },
  {
    id: 'skill_007',
    title: 'Продажи и переговоры',
    description:
      'Привет! Я несколько лет работаю в продажах и регулярно веду переговоры с клиентами и партнёрами. Научу лучше понимать собеседника, уверенно презентовать свои идеи и договариваться с выгодой для обеих сторон.',
    type: 'teach',
    category: 'business',
    subcategory: 'sales',
    tags: 'бизнес',
    imageUrl: null,
    authorId: 'user_003',
    createdAt: '2021-03-16T10:40:00Z',
  },
  {
    id: 'skill_008',
    title: 'Личный бренд',
    description:
      'Привет! Я развиваю личный бренд и знаю, как важно грамотно рассказывать о своих навыках. Помогу разобраться с позиционированием, контентом и тем, как выстраивать доверие аудитории естественным способом.',
    type: 'teach',
    category: 'business',
    subcategory: 'personal-brand',
    tags: 'бизнес',
    imageUrl: null,
    authorId: 'user_003',
    createdAt: '2021-03-28T17:10:00Z',
  },
  {
    id: 'skill_009',
    title: 'Йога и медитация',
    description:
      'Привет! Хочу познакомиться с практиками йоги и медитации. Хочется научиться расслабляться, лучше справляться со стрессом и сделать такие занятия регулярной частью своей жизни.',
    type: 'learn',
    category: 'health',
    subcategory: 'yoga',
    tags: 'здоровье',
    imageUrl: null,
    authorId: 'user_003',
    createdAt: '2021-04-09T12:05:00Z',
  },
  {
    id: 'skill_010',
    title: 'Фотография',
    description:
      'Привет! Я занимаюсь фотографией уже несколько лет — снимаю портреты, городские прогулки и путешествия. Научу работать со светом, композицией и настройками камеры, чтобы фотографии выглядели живыми и выразительными.',
    type: 'teach',
    category: 'art',
    subcategory: 'photography',
    tags: 'искусство',
    imageUrl: null,
    authorId: 'user_004',
    createdAt: '2021-05-02T14:30:00Z',
  },
]

const mockUsers = [
  {
    id: 'user_001',
    name: 'Иван',
    email: 'ivan34@mail.ru',
    avatarUrl: 'public/db/images/users/user-02.jpg',
    createdAt: '2021-01-14T08:21:00Z',
    city: 'Казань',
    age: 34,
    gender: 'male',
    about: 'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
    likes: 34,
  },
  {
    id: 'user_002',
    name: 'Алексей',
    email: 'alexey22@mail.ru',
    avatarUrl: 'public/db/images/users/user-03.jpg',
    createdAt: '2021-02-27T15:43:00Z',
    city: 'Москва',
    age: 29,
    gender: 'male',
    about: 'Люблю путешествия, спорт и хорошие разговоры за чашкой кофе',
    likes: 56,
  },
  {
    id: 'user_003',
    name: 'Мария',
    email: 'maria88@mail.ru',
    avatarUrl: 'public/db/images/users/user-04.jpg',
    createdAt: '2021-03-09T11:18:00Z',
    city: 'Санкт-Петербург',
    age: 27,
    gender: 'female',
    about: 'Фотография, книги и вечерние прогулки — мои маленькие радости',
    likes: 78,
  },
  {
    id: 'user_004',
    name: 'Дмитрий',
    email: 'dmitry91@mail.ru',
    avatarUrl: 'public/db/images/users/user-05.jpg',
    createdAt: '2021-04-22T19:55:00Z',
    city: 'Новосибирск',
    age: 31,
    gender: 'male',
    about: 'Разработчик, люблю технологии и активный отдых',
    likes: 41,
  },
]

const createState = (filters = initialState.filters) =>
  ({
    skills: {
      ...initialState,
      skills: mockSkills,
      filters,
    },
    users: {
      users: mockUsers,
    },
  }) as RootState

test('pending: должен установить isLoading в true и сбросить error', () => {
  const state = { ...initialState }

  const nextState = reducer(state, fetchSkillsThunk.pending(''))
  expect(nextState).toEqual({ ...state, isLoading: true, error: null })
})

test('fulfilled: должен загрузить навыки, установить isLoading в false и сбросить error', () => {
  const state = { ...initialState, isLoading: true }

  const nextState = reducer(state, fetchSkillsThunk.fulfilled(mockSkills, ''))

  expect(nextState).toEqual({
    ...state,
    isLoading: false,
    skills: mockSkills,
  })
})

test('rejected: должен установить isLoading в false и установить сообщение об ошибке', () => {
  const state = { ...initialState, isLoading: true }
  const errorMessage = 'Ошибка загрузки навыков'

  const nextState = reducer(state, fetchSkillsThunk.rejected(new Error(errorMessage), ''))
  expect(nextState).toEqual({
    ...state,
    isLoading: false,
    error: errorMessage,
  })
})

test('должен вернуть initialState при неизвестном экшене', () => {
  const state = reducer(undefined, { type: 'UNKNOWN' })
  expect(state).toEqual(initialState)
})

test('установка фильтра по типу', () => {
  const state = reducer({ ...initialState }, setTypeFilter('teach'))
  expect(state.filters.type).toBe('teach')
})

test('установка фильтра по категории', () => {
  const state = reducer({ ...initialState }, setCategoryFilter(['health', 'business']))
  expect(state.filters.category).toEqual(['health', 'business'])
})

test('установка фильтра по сабкатегории', () => {
  const state = reducer({ ...initialState }, setSubcategoryFilter(['photography', 'yoga']))
  expect(state.filters.subcategory).toEqual(['photography', 'yoga'])
})

test('установка фильтра по полу пользователя', () => {
  const state = reducer({ ...initialState }, setGenderFilter('male'))
  expect(state.filters.gender).toBe('male')
})

test('установка фильтра по городу пользователя', () => {
  const state = reducer({ ...initialState }, setCityFilter(['Санкт-Петербург']))
  expect(state.filters.city).toEqual(['Санкт-Петербург'])
})

test('сброс фильтров', () => {
  let state = reducer(initialState, setTypeFilter('teach'))
  state = reducer(state, setSubcategoryFilter(['photography', 'yoga']))
  state = reducer(state, setGenderFilter('male'))
  state = reducer(state, setCityFilter(['Санкт-Петербург']))

  const nextState = reducer(state, resetFilters())

  expect(nextState).toEqual(initialState)
})

test('фильтрует по типу', () => {
  const state = createState({
    ...initialState.filters,
    type: 'teach',
  })

  const result = selectFilteredSkills(state)

  expect(result.every((skill) => skill.type === 'teach')).toBe(true)
})

test('фильтрует по категории', () => {
  const state = createState({
    ...initialState.filters,
    category: ['business'],
  })

  const result = selectFilteredSkills(state)

  expect(result.every((skill) => skill.category === 'business')).toBe(true)
})

test('фильтрует по подкатегории', () => {
  const state = createState({
    ...initialState.filters,
    subcategory: ['marketing'],
  })

  const result = selectFilteredSkills(state)

  expect(result).toHaveLength(1)
})

test('фильтрует по полу автора', () => {
  const state = createState({
    ...initialState.filters,
    gender: 'female',
  })

  const result = selectFilteredSkills(state)

  expect(
    result.every((skill) => {
      const user = mockUsers.find((user) => user.id === skill.authorId)
      return user?.gender === 'female'
    }),
  ).toBe(true)
})

test('фильтрует по городу автора', () => {
  const state = createState({
    ...initialState.filters,
    city: ['Москва'],
  })

  const result = selectFilteredSkills(state)

  expect(
    result.every((skill) => {
      const user = mockUsers.find((user) => user.id === skill.authorId)
      return user?.city === 'Москва'
    }),
  ).toBe(true)
})

test('корректно обрабатывает null фильтры', () => {
  const state = createState({
    ...initialState.filters,
    type: null,
    category: null,
  })

  const result = selectFilteredSkills(state)
  expect(result).toHaveLength(mockSkills.length)
})

test('фильтр с пустым массивом возвращает все навыки', () => {
  const state = createState({
    ...initialState.filters,
    category: [],
  })

  const result = selectFilteredSkills(state)
  expect(result).toHaveLength(mockSkills.length)
})
