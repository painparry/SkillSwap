import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/model/authSlice'
import usersReducer from '@/entities/user/model/usersSlice'
import skillsReducer from '@/entities/skill/model/skillsSlice'
import searchReducer from '@/features/search/model/searchSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    skills: skillsReducer,
    search: searchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
