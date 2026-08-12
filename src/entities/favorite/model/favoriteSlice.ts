import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FavoriteState {
  userIds: string[]
}

const initialState: FavoriteState = {
  userIds: [],
}

export const favoritesSlce = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const userId = action.payload
      const index = state.userIds.indexOf(userId)

      if (index === -1) {
        state.userIds.push(userId)
      } else {
        state.userIds.splice(index, 1)
      }
    },

    clearFavorites: (state) => {
      state.userIds = []
    },
  },
})

export const { toggleFavorite, clearFavorites } = favoritesSlce.actions

export default favoritesSlce.reducer
