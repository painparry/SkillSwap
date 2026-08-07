import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchRequests, saveRequest, ExchangeRequest } from '@/api/requests';
import { generateId } from '@/shared/lib/helpers';

interface RequestsState {
  requests: ExchangeRequest[];
  notifications: {
    id: string;
    message: string;
    isRead: boolean;
    createdAt: string;
  }[];
  loading: boolean;
  error: string | null;
}

const initialState: RequestsState = {
  requests: [],
  notifications: [],
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

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<ExchangeRequest>) => {
      state.requests.push(action.payload);
      state.notifications.push({
        id: generateId(),
        message: `${action.payload.fromUserName} предлагает вам обмен по навыку "${action.payload.skillTitle}"`,
        isRead: false,
        createdAt: new Date().toISOString(),
      });
    },
    acceptRequest: (state, action: PayloadAction<string>) => {
      const request = state.requests.find((r) => r.id === action.payload);
      if (request) {
        request.status = 'accepted';
        request.updatedAt = new Date().toISOString();
        state.notifications.push({
          id: generateId(),
          message: `${request.toUserName} принял ваш обмен по навыку "${request.skillTitle}"`,
          isRead: false,
          createdAt: new Date().toISOString(),
        });
      }
    },
    rejectRequest: (state, action: PayloadAction<string>) => {
      const request = state.requests.find((r) => r.id === action.payload);
      if (request) {
        request.status = 'rejected';
        request.updatedAt = new Date().toISOString();
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    clearNotifications: (state) => {
    state.notifications = [];
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
        state.notifications.push({
          id: generateId(),
          message: `${action.payload.fromUserName} предлагает вам обмен по навыку "${action.payload.skillTitle}"`,
          isRead: false,
          createdAt: new Date().toISOString(),
        });
      });
  },
});

export const {
  addRequest,
  acceptRequest,
  rejectRequest,
  markNotificationAsRead,
  clearNotifications
} = requestsSlice.actions;

export default requestsSlice.reducer;