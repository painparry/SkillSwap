export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SKILL: '/skill/:id',
  PROFILE: '/profile',
  FAVORITES: '/favorites',
  CREATE: '/create',
  LOGIN: '/login',
  REGISTER: '/register',
  SERVER_ERROR: '/500',
  NOT_FOUND_ERROR: '/404',
  REGISTRATION_STEP_1: '/registration/step-1',
  REGISTRATION_STEP_2: '/registration/step-2',
  REGISTRATION_STEP_3: '/registration/step-3',
} as const

export const SKILL_CATEGORIES = [
  'Программирование',
  'Дизайн',
  'Языки',
  'Музыка',
  'Спорт',
  'Кулинария',
  'Фото и видео',
  'Бизнес',
  'Другое',
] as const

export const LOCAL_STORAGE_KEYS = {
  AUTH_USER: 'skillswap_auth_user',
  FAVORITES: 'skillswap_favorites',
  REQUESTS: 'skillswap_requests',
  THEME: 'skillswap_theme',
} as const
