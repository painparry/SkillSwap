import type { AuthUser } from '@/shared/types'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

const REGISTERED_USERS_KEY = 'skillswap_registered_users'

/** Читает текущего авторизованного пользователя из localStorage */
export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

/** Сохраняет пользователя и mock-токен в localStorage */
export function saveAuthUser(user: Omit<AuthUser, 'token'>): AuthUser {
  const authUser: AuthUser = { ...user, token: 'mock_token_' + user.id }
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser))
  return authUser
}

/** Удаляет пользователя из localStorage (logout) */
export function clearAuthUser(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER)
}

/** Сохраняет зарегистрированного пользователя в общий список */
export function saveRegisteredUser(user: Omit<AuthUser, 'token'>): void {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY)
    const users: AuthUser[] = raw ? JSON.parse(raw) : []
    const existingIndex = users.findIndex((item) => item.email === user.email)

    const authUser: AuthUser = { ...user, token: 'mock_token_' + user.id }

    if (existingIndex !== -1) {
      users[existingIndex] = authUser
    } else {
      users.push(authUser)
    }

    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
  } catch {
    // ignore
  }
}

/** Ищет пользователя в списке зарегистрированных по email */
export function findRegisteredUserByEmail(email: string): AuthUser | null {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY)
    const users: AuthUser[] = raw ? JSON.parse(raw) : []
    return users.find((user) => user.email === email) ?? null
  } catch {
    return null
  }
}