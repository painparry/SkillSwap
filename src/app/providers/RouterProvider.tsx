import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ROUTES } from '@/shared/lib/constants'
import styles from './RouterProvider.module.css'
import { AuthLayout, MainLayout } from '@/app/layouts'
import { PrivateRoute } from './PrivateRoute'

// Lazy-загрузка страниц — каждая страница грузится только при переходе на неё

const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const SkillPage = lazy(() => import('@/pages/SkillPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))
const ServerErrorPage = lazy(() => import('@/pages/ServerErrorPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage'))

function AppLayout() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<CatalogPage />} />
          <Route path={ROUTES.SKILL} element={<SkillPage />} />
          <Route
            path={ROUTES.PROFILE}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.CREATE}
            element={
              <PrivateRoute>
                <CreateSkillPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.FAVORITES}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={ROUTES.NOT_FOUND_ERROR} element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path={ROUTES.LOGIN}
            element={
              <PrivateRoute onlyUnAuth>
                <LoginPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              <PrivateRoute onlyUnAuth>
                <RegisterPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export function AppRouter() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <AppLayout />
    </Suspense>
  )
}