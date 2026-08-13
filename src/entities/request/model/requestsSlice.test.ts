import { beforeEach, describe, expect, it } from 'vitest'
import reducer, {
  addRequest,
  clearReadNotificationsForUser,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  syncNotificationsForUser,
  type Notification,
} from './requestsSlice'
import type { ExchangeRequest } from '@/api/requests'

const request: ExchangeRequest = {
  id: 'request_001',
  skillId: 'skill_001',
  fromUserId: 'user_001',
  toUserId: 'user_002',
  fromUserName: 'Иван',
  toUserName: 'Мария',
  skillTitle: 'Игра на барабанах',
  status: 'pending',
  createdAt: '2026-08-13T12:00:00.000Z',
  updatedAt: '2026-08-13T12:00:00.000Z',
}

describe('requests notifications', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('creates notification for request receiver', () => {
    const state = reducer(undefined, addRequest(request))
    const notifications = state.notifications.user_002

    expect(notifications).toHaveLength(1)
    expect(notifications[0]).toMatchObject({
      message: 'Иван предлагает вам обмен',
      isRead: false,
      skillId: 'skill_001',
      fromUserId: 'user_001',
    })
  })

  it('marks all user notifications as read', () => {
    const state = reducer(undefined, addRequest(request))
    const nextState = reducer(state, markAllNotificationsAsRead('user_002'))

    expect(nextState.notifications.user_002.every((notification) => notification.isRead)).toBe(true)
  })

  it('marks one notification as read and saves notifications', () => {
    const state = reducer(undefined, addRequest(request))
    const notificationId = state.notifications.user_002[0].id
    const nextState = reducer(state, markNotificationAsRead({ userId: 'user_002', notificationId }))
    const savedNotifications = JSON.parse(localStorage.getItem('skillswap_notifications') ?? '{}')

    expect(nextState.notifications.user_002[0].isRead).toBe(true)
    expect(savedNotifications.user_002[0].isRead).toBe(true)
  })

  it('clears only read notifications', () => {
    const readNotification: Notification = {
      id: 'notification_001',
      message: 'Иван предлагает вам обмен',
      isRead: true,
      createdAt: '2026-08-13T12:00:00.000Z',
    }
    const unreadNotification: Notification = {
      id: 'notification_002',
      message: 'Анна предлагает вам обмен',
      isRead: false,
      createdAt: '2026-08-13T13:00:00.000Z',
    }

    const state = reducer(
      {
        requests: [],
        notifications: {
          user_002: [readNotification, unreadNotification],
        },
        loading: false,
        error: null,
      },
      clearReadNotificationsForUser('user_002'),
    )

    expect(state.notifications.user_002).toEqual([unreadNotification])
    expect(localStorage.getItem('skillswap_dismissed_notifications')).toContain('notification_001')
  })

  it('syncs request notifications for current user when requests are available', () => {
    const state = reducer(
      {
        requests: [request],
        notifications: {},
        loading: false,
        error: null,
      },
      syncNotificationsForUser('user_100'),
    )

    expect(state.notifications.user_100).toHaveLength(1)
    expect(state.notifications.user_100[0]).toMatchObject({
      message: 'Иван предлагает вам обмен',
      isRead: false,
      skillId: 'skill_001',
      fromUserId: 'user_001',
    })
  })
})
