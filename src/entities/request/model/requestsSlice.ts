import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ExchangeRequest, fetchRequests, saveRequest } from '@/api/requests'
import { generateId } from '@/shared/lib/helpers'

export interface Notification {
  id: string
  message: string
  isRead: boolean
  createdAt: string
  skillId?: string
  fromUserId?: string
}

interface RequestsState {
  requests: ExchangeRequest[]
  notifications: Record<string, Notification[]>
  loading: boolean
  error: string | null
}

const NOTIFICATIONS_STORAGE_KEY = 'skillswap_notifications'
const DISMISSED_NOTIFICATIONS_STORAGE_KEY = 'skillswap_dismissed_notifications'

const initialState: RequestsState = {
  requests: [],
  notifications: {},
  loading: false,
  error: null,
}

function getNotificationId(userId: string, message: string, createdAt: string, skillId?: string) {
  return [userId, message, createdAt, skillId ?? ''].join('|')
}

function loadJsonFromStorage<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback

  try {
    const savedValue = localStorage.getItem(key)
    return savedValue ? JSON.parse(savedValue) : fallback
  } catch {
    return fallback
  }
}

function saveNotifications(notifications: Record<string, Notification[]>) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications))
}

function loadSavedNotifications() {
  return loadJsonFromStorage<Record<string, Notification[]>>(NOTIFICATIONS_STORAGE_KEY, {})
}

function loadDismissedNotificationIds() {
  return loadJsonFromStorage<string[]>(DISMISSED_NOTIFICATIONS_STORAGE_KEY, [])
}

function saveDismissedNotificationIds(notificationIds: string[]) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(DISMISSED_NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notificationIds))
}

const addNotificationForUser = (
  state: RequestsState,
  userId: string,
  message: string,
  createdAt?: string,
  meta?: Pick<Notification, 'skillId' | 'fromUserId'> & Pick<Notification, 'isRead'>,
) => {
  if (!state.notifications[userId]) {
    state.notifications[userId] = []
  }

  const notificationCreatedAt = createdAt || new Date().toISOString()
  const notificationId = getNotificationId(userId, message, notificationCreatedAt, meta?.skillId)
  const dismissedNotificationIds = loadDismissedNotificationIds()
  if (dismissedNotificationIds.includes(notificationId)) return

  const hasSameNotification = state.notifications[userId].some(
    (notification) =>
      notification.id === notificationId ||
      (notification.message === message &&
        notification.createdAt === notificationCreatedAt &&
        notification.skillId === meta?.skillId),
  )

  if (hasSameNotification) return

  state.notifications[userId].push({
    id: notificationId,
    message,
    isRead: meta?.isRead ?? false,
    createdAt: notificationCreatedAt,
    ...meta,
  })
}

export const fetchRequestsThunk = createAsyncThunk('requests/fetch', async () => {
  return await fetchRequests()
})

export const createRequestThunk = createAsyncThunk(
  'requests/create',
  async (data: Omit<ExchangeRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: ExchangeRequest = {
      id: generateId(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await saveRequest(newRequest)
    return newRequest
  },
)

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<ExchangeRequest>) => {
      state.requests.push(action.payload)

      addNotificationForUser(
        state,
        action.payload.toUserId,
        `${action.payload.fromUserName} предлагает вам обмен`,
        action.payload.createdAt,
        { skillId: action.payload.skillId, fromUserId: action.payload.fromUserId, isRead: false },
      )
      saveNotifications(state.notifications)
    },

    acceptRequest: (state, action: PayloadAction<string>) => {
      const request = state.requests.find((item) => item.id === action.payload)
      if (!request) return

      request.status = 'accepted'
      request.updatedAt = new Date().toISOString()

      addNotificationForUser(
        state,
        request.fromUserId,
        `${request.toUserName} принял ваш обмен`,
        request.updatedAt,
        { skillId: request.skillId, fromUserId: request.toUserId, isRead: false },
      )
      saveNotifications(state.notifications)
    },

    rejectRequest: (state, action: PayloadAction<string>) => {
      const request = state.requests.find((item) => item.id === action.payload)
      if (!request) return

      request.status = 'rejected'
      request.updatedAt = new Date().toISOString()

      addNotificationForUser(
        state,
        request.fromUserId,
        `${request.toUserName} отклонил ваш обмен`,
        request.updatedAt,
        { skillId: request.skillId, fromUserId: request.toUserId, isRead: false },
      )
      saveNotifications(state.notifications)
    },

    markNotificationAsRead: (state, action: PayloadAction<{ userId: string; notificationId: string }>) => {
      const { userId, notificationId } = action.payload
      const notification = state.notifications[userId]?.find((item) => item.id === notificationId)

      if (notification) {
        notification.isRead = true
      }

      saveNotifications(state.notifications)
    },

    markAllNotificationsAsRead: (state, action: PayloadAction<string>) => {
      state.notifications[action.payload]?.forEach((notification) => {
        notification.isRead = true
      })
      saveNotifications(state.notifications)
    },

    clearNotificationsForUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      const notificationIds = state.notifications[userId]?.map((notification) => notification.id) ?? []
      const dismissedNotificationIds = loadDismissedNotificationIds()

      state.notifications[userId] = []
      saveDismissedNotificationIds([...new Set([...dismissedNotificationIds, ...notificationIds])])
      saveNotifications(state.notifications)
    },

    clearReadNotificationsForUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      const readNotificationIds =
        state.notifications[userId]
          ?.filter((notification) => notification.isRead)
          .map((notification) => notification.id) ?? []
      const dismissedNotificationIds = loadDismissedNotificationIds()

      state.notifications[userId] = state.notifications[userId]?.filter((notification) => !notification.isRead) ?? []
      saveDismissedNotificationIds([...new Set([...dismissedNotificationIds, ...readNotificationIds])])
      saveNotifications(state.notifications)
    },

    syncNotificationsForUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      if (!userId) return

      const dismissedNotificationIds = loadDismissedNotificationIds()
      const hasSavedNotifications = Boolean(state.notifications[userId]?.length)
      const hasDismissedNotifications = dismissedNotificationIds.some((notificationId) =>
        notificationId.startsWith(`${userId}|`),
      )

      if (hasSavedNotifications || hasDismissedNotifications) return

      const userRequests = state.requests.filter(
        (request) =>
          (request.status === 'pending' && request.toUserId === userId) ||
          (request.status === 'accepted' && request.fromUserId === userId),
      )
      const requestsForNotifications = userRequests.length > 0 ? userRequests : state.requests

      requestsForNotifications.forEach((request) => {
        if (request.status === 'pending') {
          addNotificationForUser(
            state,
            userId,
            `${request.fromUserName} предлагает вам обмен`,
            request.createdAt,
            {
              skillId: request.skillId,
              fromUserId: request.fromUserId,
              isRead: request.notificationIsRead ?? false,
            },
          )
        }

        if (request.status === 'accepted') {
          addNotificationForUser(
            state,
            userId,
            `${request.toUserName} принял ваш обмен`,
            request.updatedAt,
            {
              skillId: request.skillId,
              fromUserId: request.toUserId,
              isRead: request.notificationIsRead ?? false,
            },
          )
        }
      })

      saveNotifications(state.notifications)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRequestsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.requests = action.payload
        state.notifications = loadSavedNotifications()

        action.payload.forEach((request) => {
          if (request.status === 'pending') {
            addNotificationForUser(
              state,
              request.toUserId,
              `${request.fromUserName} предлагает вам обмен`,
              request.createdAt,
              {
                skillId: request.skillId,
                fromUserId: request.fromUserId,
                isRead: request.notificationIsRead ?? false,
              },
            )
          }

          if (request.status === 'accepted') {
            addNotificationForUser(
              state,
              request.fromUserId,
              `${request.toUserName} принял ваш обмен`,
              request.updatedAt,
              {
                skillId: request.skillId,
                fromUserId: request.toUserId,
                isRead: request.notificationIsRead ?? false,
              },
            )
          }
        })
      })
      .addCase(fetchRequestsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка загрузки заявок'
      })
      .addCase(createRequestThunk.fulfilled, (state, action) => {
        state.requests.push(action.payload)

        addNotificationForUser(
          state,
          action.payload.toUserId,
          `${action.payload.fromUserName} предлагает вам обмен`,
          action.payload.createdAt,
          { skillId: action.payload.skillId, fromUserId: action.payload.fromUserId, isRead: false },
        )
        saveNotifications(state.notifications)
      })
  },
})

export const {
  addRequest,
  acceptRequest,
  rejectRequest,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotificationsForUser,
  clearReadNotificationsForUser,
  syncNotificationsForUser,
} = requestsSlice.actions

export default requestsSlice.reducer
