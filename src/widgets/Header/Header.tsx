import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Logo } from '@/shared/ui/logo'
import { SearchInput } from '@/shared/ui/SearchInput'
import { SkillsDropdown } from '@/shared/ui/SkillsDropdown'
import { HeartIcon } from '@/shared/ui/Toggle/HeartIcon'
import { skillCategories } from '@/shared/lib/skillCategories'
import { fetchRequestsThunk, syncNotificationsForUser } from '@/entities/request/model/requestsSlice'
import { setSubcategoryFilter } from '@/entities/skill/model/skillsSlice'
import { UserMenu } from '@/features/user-menu'
import { NotificationButton } from '@/features/notification'
import { NotificationsDropdown } from '@/features/notifications'
import { ThemeToggle } from '@/features/theme'
import { setSearchValue } from '@/features/search'
import { useAboutProjectModal } from '@/features/filters/about-project/model/useAboutProjectModal'
import { AboutProjectModal } from '@/features/filters/about-project/ui/AboutProjectModal'
import { ROUTES } from '@/shared/lib/constants'
import styles from './Header.module.css'

export function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const notificationsRef = useRef<HTMLDivElement>(null)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const currentUser = useAppSelector((state) => state.auth.user)
  const searchValue = useAppSelector((state) => state.search.value)
  const subcategoryFilter = useAppSelector((state) => state.skills.filters.subcategory)
  const requests = useAppSelector((state) => state.requests.requests)
  const requestsLoading = useAppSelector((state) => state.requests.loading)
  const notifications = useAppSelector((state) =>
    currentUser ? state.requests.notifications[currentUser.id] ?? [] : [],
  )
  const { isOpen: isAboutOpen, open: openAbout, close: closeAbout } = useAboutProjectModal()
  const hasUnreadNotifications = notifications.some((notification) => !notification.isRead)

  useEffect(() => {
    if (isAuth && currentUser && requests.length === 0 && !requestsLoading) {
      dispatch(fetchRequestsThunk())
    }
  }, [currentUser, dispatch, isAuth, requests.length, requestsLoading])

  useEffect(() => {
    if (isAuth && currentUser && requests.length > 0) {
      dispatch(syncNotificationsForUser(currentUser.id))
    }
  }, [currentUser, dispatch, isAuth, requests.length])

  useEffect(() => {
    if (!isNotificationsOpen) return

    const handleOutsideClick = (event: MouseEvent) => {
      if (!notificationsRef.current?.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isNotificationsOpen])

  const handleSelectCategory = (categoryId: string) => {
    const category = skillCategories.find((item) => item.id === categoryId)
    if (!category) return
    const subcategoryIds = category.subcategories.map((subcategory) => subcategory.id)
    const current = subcategoryFilter ?? []
    const isEverySelected = subcategoryIds.every((id) => current.includes(id))
    const next = isEverySelected
      ? current.filter((id) => !subcategoryIds.includes(id))
      : Array.from(new Set([...current, ...subcategoryIds]))
    dispatch(setSubcategoryFilter(next.length ? next : null))
    navigate(ROUTES.HOME)
  }

  const handleSelectSubcategory = (_categoryId: string, subcategoryId: string) => {
    const current = subcategoryFilter ?? []
    const next = current.includes(subcategoryId)
      ? current.filter((id) => id !== subcategoryId)
      : [...current, subcategoryId]
    dispatch(setSubcategoryFilter(next.length ? next : null))
    navigate(ROUTES.HOME)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Logo />
          <nav className={styles.nav}>
            <button type="button" className={styles.navLink} onClick={openAbout}>
              О проекте
            </button>
            <SkillsDropdown
              sections={skillCategories}
              onSelectCategory={handleSelectCategory}
              onSelectSubcategory={handleSelectSubcategory}
            />
          </nav>
        </div>

        <div className={styles.search}>
          <SearchInput
            value={searchValue}
            onChange={(event) => dispatch(setSearchValue(event.target.value))}
            placeholder="Искать навык"
          />
        </div>

        <div className={styles.actions}>
          <ThemeToggle />

          {isAuth && (
            <>
              <div className={styles.notifications} ref={notificationsRef}>
                <div
                  className={clsx(
                    styles.notificationTrigger,
                    isNotificationsOpen && styles.notificationTriggerOpen,
                  )}
                >
                  <NotificationButton
                    isActive={isNotificationsOpen}
                    onClick={() => setIsNotificationsOpen((currentValue) => !currentValue)}
                  />
                  {hasUnreadNotifications && <span className={styles.notificationDot} aria-hidden="true" />}
                </div>
                {isNotificationsOpen && <NotificationsDropdown />}
              </div>
              <Link to={ROUTES.FAVORITES} className={styles.iconButton} aria-label="Избранное">
                <HeartIcon filled={false} />
              </Link>
              <UserMenu />
            </>
          )}
        </div>
      </header>

      <AboutProjectModal isOpen={isAboutOpen} onClose={closeAbout} />
    </>
  )
}
