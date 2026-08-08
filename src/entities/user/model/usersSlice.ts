import type { User } from '@/shared/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '@/api/users'

export type TUserState = {
  users: User[]
  isLoading: boolean
  error: string | null
}

export const initialState: TUserState = {
  users: [],
  isLoading: false,
  error: null,
}

export const fetchUsersThunk = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetchUsers()
  return response
})

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
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

export default userSlice.reducer
