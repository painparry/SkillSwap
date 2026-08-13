import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import {
  clearReadNotificationsForUser,
  fetchRequestsThunk,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type Notification,
} from '@/entities/request/model/requestsSlice'
import { ROUTES } from '@/shared/lib/constants'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { NotificationLampIcon } from './NotificationLampIcon'
import styles from './NotificationsDropdown.module.css'

const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
]

function formatNotificationDate(createdAt: string) {
  const date = new Date(createdAt)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const daysDiff = Math.floor((startOfToday - startOfDate) / (1000 * 60 * 60 * 24))

  if (daysDiff <= 0) return 'сегодня'
  if (daysDiff === 1) return 'вчера'

  return `${date.getDate()} ${MONTHS[date.getMonth()]}`
}

interface NotificationRowProps {
  notification: Notification
  onRead: (notificationId: string) => void
  variant: 'new' | 'read'
}

function NotificationRow({ notification, onRead, variant }: NotificationRowProps) {
  const navigate = useNavigate()

  const handleGoToUser = () => {
    onRead(notification.id)
    navigate(notification.skillId ? ROUTES.SKILL.replace(':id', notification.skillId) : ROUTES.PROFILE)
  }

  return (
    <li className={clsx(styles.item, variant === 'read' && styles.readItem)}>
      <span className={styles.icon}>
        <NotificationLampIcon />
      </span>
      <div className={styles.content}>
        <p className={styles.message}>{notification.message}</p>
        <p className={styles.subMessage}>Перейдите в профиль, чтобы обсудить детали</p>
      </div>
      <span className={styles.time}>{formatNotificationDate(notification.createdAt)}</span>

      {variant === 'new' && (
        <button type="button" className={styles.goButton} onClick={handleGoToUser}>
          Перейти
        </button>
      )}
    </li>
  )
}

export function NotificationsDropdown() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.user)
  const requestsLoading = useAppSelector((state) => state.requests.loading)
  const requests = useAppSelector((state) => state.requests.requests)
  const allNotifications = useAppSelector((state) => state.requests.notifications)

  const userId = currentUser?.id
  const notifications = userId ? allNotifications[userId] ?? [] : []
  const sortedNotifications = [...notifications].sort(
    (first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
  )
  const unreadNotifications = sortedNotifications.filter((notification) => !notification.isRead)
  const readNotifications = sortedNotifications.filter((notification) => notification.isRead)

  useEffect(() => {
    if (userId && requests.length === 0 && !requestsLoading) {
      dispatch(fetchRequestsThunk())
    }
  }, [dispatch, requests.length, requestsLoading, userId])

  const handleReadAll = () => {
    if (userId) {
      dispatch(markAllNotificationsAsRead(userId))
    }
  }

  const handleClearRead = () => {
    if (userId) {
      dispatch(clearReadNotificationsForUser(userId))
    }
  }

  const handleReadNotification = (notificationId: string) => {
    if (userId) {
      dispatch(markNotificationAsRead({ userId, notificationId }))
    }
  }

  if (!userId) {
    return null
  }

  return (
    <div className={styles.dropdown} role="dialog" aria-label="Уведомления">
      <section className={styles.section} aria-labelledby="new-notifications-title">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title} id="new-notifications-title">
            Новые уведомления
          </h2>
          <button
            type="button"
            className={styles.textButton}
            onClick={handleReadAll}
            disabled={unreadNotifications.length === 0}
          >
            Прочитать все
          </button>
        </div>

        {unreadNotifications.length > 0 ? (
          <ul className={styles.list}>
            {unreadNotifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onRead={handleReadNotification}
                variant="new"
              />
            ))}
          </ul>
        ) : (
          <p className={styles.emptyText}>Новых уведомлений нет</p>
        )}
      </section>

      <section className={styles.section} aria-labelledby="read-notifications-title">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title} id="read-notifications-title">
            Просмотренные
          </h2>
          <button
            type="button"
            className={styles.textButton}
            onClick={handleClearRead}
            disabled={readNotifications.length === 0}
          >
            Очистить
          </button>
        </div>

        {readNotifications.length > 0 ? (
          <ul className={styles.list}>
            {readNotifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onRead={handleReadNotification}
                variant="read"
              />
            ))}
          </ul>
        ) : (
          <p className={styles.emptyText}>Просмотренных уведомлений нет</p>
        )}
      </section>
    </div>
  )
}
