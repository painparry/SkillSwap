import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import CatalogPage from './index'
import authReducer from '@/features/auth/model/authSlice'
import usersReducer from '@/entities/user/model/usersSlice'
import skillsReducer from '@/entities/skill/model/skillsSlice'
import searchReducer from '@/features/search/model/searchSlice'
import requestsReducer from '@/entities/request/model/requestsSlice'
import type { GenderType } from '@/shared/types'

const mockSkills = [
    {
        id: 'skill_001',
        title: 'Маркетинг',
        type: 'teach',
        category: 'business',
        subcategory: 'marketing',
        authorId: 'user_001',
        createdAt: '2021-01-18T10:32:00Z',
    },
    {
        id: 'skill_002',
        title: 'Английский',
        type: 'learn',
        category: 'languages',
        subcategory: 'english',
        authorId: 'user_001',
        createdAt: '2021-03-06T11:15:00Z',
    },
]

const mockUsers = [
    {
        id: 'user_001',
        name: 'Иван',
        email: 'ivan@mail.ru',
        avatarUrl: null,
        createdAt: '2021-01-14T08:21:00Z',
        city: 'Москва',
        age: 30,
        gender: 'male' as GenderType,
        likes: 10,
        about: '',
    },
]

function createStore(overrides = {}) {
    return configureStore({
        reducer: {
            auth: authReducer,
            users: usersReducer,
            skills: skillsReducer,
            search: searchReducer,
            requests: requestsReducer,
        },
        preloadedState: {
            users: { users: mockUsers, isLoading: false, error: null, selectedUserId: null },
            skills: {
                skills: [],
                isLoading: false,
                error: null,
                filters: { type: null, category: null, subcategory: null, gender: null, city: null },
            },
            search: { value: '' },
            ...overrides,
        },
    })
}

function renderCatalog(store = createStore()) {
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <CatalogPage />
            </MemoryRouter>
        </Provider>,
    )
}

describe('CatalogPage', () => {
    beforeEach(() => {
        global.fetch = vi.fn().mockResolvedValue({
            json: () => Promise.resolve(mockSkills),
            ok: true,
        })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    // 1. Отрисовка секций
    it('отображает секции Популярное, Новое, Рекомендуемые', async () => {
        renderCatalog()

        expect(await screen.findByText('Популярное')).toBeInTheDocument()
        expect(screen.getByText('Новое')).toBeInTheDocument()
        expect(screen.getByText('Рекомендуемые')).toBeInTheDocument()
    })

    // 2. Загрузка данных
    it('показывает Загрузка... пока данные грузятся', () => {
        global.fetch = vi.fn().mockImplementation(() => new Promise(() => { }))
        renderCatalog()
        expect(screen.getByText('Загрузка...')).toBeInTheDocument()
    })

    // 3. Поиск по навыкам
    it('фильтрует карточки по текстовому поиску', async () => {
        const store = createStore({
            search: { value: 'Английский' },
        })
        renderCatalog(store)

        await screen.findByText('Фильтры')
        
        expect(screen.queryByText('Популярное')).not.toBeInTheDocument()
        expect(screen.queryByText('Новое')).not.toBeInTheDocument()
    })

    // 4. Footer при фильтрации
    it('показывает Footer при активных фильтрах', async () => {
        const store = createStore({
            skills: {
                skills: [],
                isLoading: false,
                error: null,
                filters: { type: 'teach', category: null, subcategory: null, gender: null, city: null },
            },
        })
        renderCatalog(store)

        await waitFor(() => {
            expect(screen.getByText('SkillSwap — 2025')).toBeInTheDocument()
        })
    })

    // 5. Переключение на «Подходящие предложения»
    it('показывает «Подходящие предложения» при активных фильтрах вместо секций', async () => {
        const store = createStore({
            skills: {
                skills: [],
                isLoading: false,
                error: null,
                filters: { type: 'learn', category: null, subcategory: null, gender: null, city: null },
            },
        })
        renderCatalog(store)

        expect(await screen.findByText(/Подходящие предложения/)).toBeInTheDocument()
        expect(screen.queryByText('Популярное')).not.toBeInTheDocument()
        expect(screen.queryByText('Новое')).not.toBeInTheDocument()
    })
})