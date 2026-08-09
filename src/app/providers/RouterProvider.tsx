import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ROUTES } from '@/shared/lib/constants'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer/'
import styles from './RouterProvider.module.css'

// Lazy-загрузка страниц — каждая страница грузится только при переходе на неё
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const SkillPage = lazy(() => import('@/pages/SkillPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const ServerErrorPage = lazy(() => import('@/pages/ServerErrorPage'))
const RegistrationStep1Page = lazy(() => import('@/pages/RegistrationStep1Page'))

function isAuthPage(pathname: string) {
  return (
    pathname === ROUTES.LOGIN ||
    pathname === ROUTES.REGISTER ||
    pathname.startsWith('/registration')
  )
}

function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className={styles.app}>
      {!isAuthPage(pathname) && <Header />}
      <Routes>
        <Route path={ROUTES.HOME} element={<CatalogPage />} />
        <Route path={ROUTES.SKILL} element={<SkillPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<LoginPage />} />
        <Route path={ROUTES.REGISTRATION_STEP_1} element={<RegistrationStep1Page />} />

        {/* Защищённые маршруты — добавь PrivateRoute обёртку */}
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.CREATE} element={<CreateSkillPage />} />

        <Route path={ROUTES.NOT_FOUND_ERROR} element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <AppLayout />
      </Suspense>
    </BrowserRouter>
  )
}
