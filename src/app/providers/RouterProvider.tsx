import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ROUTES } from '@/shared/lib/constants'
import styles from './RouterProvider.module.css'
import { AuthLayout, HeaderOnlyLayout, MainLayout } from '@/app/layouts'
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
const RegistrationStep1Page = lazy(() => import('@/pages/RegistrationStep1Page'))

function AppLayout() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<HeaderOnlyLayout />}>
          <Route path={ROUTES.HOME} element={<CatalogPage />} />
        </Route>

        <Route element={<MainLayout />}>
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
            element={<Navigate to={ROUTES.REGISTRATION_STEP_1} replace />}
          />
          <Route
            path={ROUTES.REGISTRATION_STEP_1}
            element={
              <PrivateRoute onlyUnAuth>
                <RegistrationStep1Page />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.REGISTRATION_STEP_2}
            element={
              <PrivateRoute onlyUnAuth>
                <RegistrationStep1Page />
              </PrivateRoute>
            }
          />
          {/* TODO: заменить на RegistrationStep2Page */}
          <Route
            path={ROUTES.REGISTRATION_STEP_3}
            element={
              <PrivateRoute onlyUnAuth>
                <RegistrationStep1Page />
              </PrivateRoute>
            }
          />
          {/* TODO: заменить на RegistrationStep3Page */}
        </Route>
      </Routes>
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
