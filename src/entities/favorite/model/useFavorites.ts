import { RootState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleFavorite } from './favoriteSlice'

export function useFavorites() {
  const dispatch = useAppDispatch()

  const favoriteIds = useAppSelector((state: RootState) => state.favorites.userIds)

  const toggle = (userId: string) => {
    dispatch(toggleFavorite(userId))
  }

  const isFavorite = (userId: string) => {
    return favoriteIds.includes(userId)
  }

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite: toggle,
  }
}
