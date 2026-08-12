import { RootState } from '@/store'

export const selectFavoritesUserIds = (state: RootState) => state.favorites.userIds

export const selectFavoritesUsers = (state: RootState) => {
  const favoriteIds = state.favorites.userIds

  return state.users.users.filter((user) => favoriteIds.includes(user.id))
}
