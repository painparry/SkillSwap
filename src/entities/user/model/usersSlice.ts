import type { User } from '@/shared/types'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit' // ← добавь PayloadAction
import { fetchUsers } from '@/api/users'

export type TUserState = {
  users: User[]
  isLoading: boolean
  error: string | null
  selectedUserId: string | null 
}

export const initialState: TUserState = {
  users: [],
  isLoading: false,
  error: null,
  selectedUserId: null, 
}

export const fetchUsersThunk = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetchUsers()
  return response
})

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload
    },
    clearSelectedUser: (state) => {
      state.selectedUserId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        state.users = action.payload
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Ошибка при загрузке данных пользователей'
      })
  },
})


export const { setSelectedUser, clearSelectedUser } = userSlice.actions

export default userSlice.reducer
