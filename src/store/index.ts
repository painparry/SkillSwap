import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/model/authSlice'
import usersReducer from '@/entities/user/model/usersSlice'
import skillsReducer from '@/entities/skill/model/skillsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    skills: skillsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
