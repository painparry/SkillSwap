import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchRequests, saveRequest, ExchangeRequest } from '@/api/requests';
import { generateId } from '@/shared/lib/helpers';

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface RequestsState {
  requests: ExchangeRequest[];
  notifications: Record<string, Notification[]>;
  loading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  requests: [],
  notifications: {},
  loading: false,
  error: null,
};

export const fetchRequestsThunk = createAsyncThunk(
  'requests/fetch',
  async () => {
    return await fetchRequests();
  }
);

export const createRequestThunk = createAsyncThunk(
  'requests/create',
  async (data: Omit<ExchangeRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: ExchangeRequest = {
      id: generateId(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await saveRequest(newRequest);
    return newRequest;
  }
);

const addNotificationForUser = (
  state: RequestsState,
  userId: string,
  message: string,
  createdAt?: string
) => {
  if (!state.notifications[userId]) {
    state.notifications[userId] = [];
  }
  state.notifications[userId].push({
    id: generateId(),
    message,
    isRead: false,
    createdAt: createdAt || new Date().toISOString(),
  });
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<ExchangeRequest>) => {
      state.requests.push(action.payload);

      addNotificationForUser(
        state,
        action.payload.toUserId,
        `${action.payload.fromUserName} предлагает вам обмен`,
        action.payload.createdAt
      );
    },

    acceptRequest: (state, action: PayloadAction<string>) => {
      const request = state.requests.find((r) => r.id === action.payload);
      if (!request) return;

      request.status = 'accepted';
      request.updatedAt = new Date().toISOString();

      addNotificationForUser(
        state,
        request.fromUserId,
        `${request.toUserName} принял ваш обмен`,
        request.updatedAt
      );
    },

    rejectRequest: (state, action: PayloadAction<string>) => {
      const request = state.requests.find((r) => r.id === action.payload);
      if (request) {
        request.status = 'rejected';
        request.updatedAt = new Date().toISOString();

        addNotificationForUser(
          state,
          request.fromUserId,
          `${request.toUserName} отклонил ваш обмен`,
          request.updatedAt
        );
      }
    },

    markNotificationAsRead: (state, action: PayloadAction<{ userId: string; notificationId: string }>) => {
      const { userId, notificationId } = action.payload;
      const userNotifications = state.notifications[userId];
      if (!userNotifications) return;

      const notification = userNotifications.find((n) => n.id === notificationId);
      if (notification) {
        notification.isRead = true;
      }
    },

    clearNotificationsForUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (state.notifications[userId]) {
        state.notifications[userId] = [];
      }
    },

    clearReadNotificationsForUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (state.notifications[userId]) {
        state.notifications[userId] = state.notifications[userId].filter(
          (n) => !n.isRead
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRequestsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchRequestsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заявок';
      })
      .addCase(createRequestThunk.fulfilled, (state, action) => {
        state.requests.push(action.payload);

        addNotificationForUser(
          state,
          action.payload.toUserId,
          `${action.payload.fromUserName} предлагает вам обмен`,
          action.payload.createdAt
        );
      });
  },
});

export const {
  addRequest,
  acceptRequest,
  rejectRequest,
  markNotificationAsRead,
  clearNotificationsForUser,
  clearReadNotificationsForUser,
} = requestsSlice.actions;

export default requestsSlice.reducer;