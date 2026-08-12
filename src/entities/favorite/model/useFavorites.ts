import { RootState } from '@/store'
import { useAppDispatch } from '@/store/hooks'
import { useSelector } from 'react-redux'
import { toggleFavorite } from './favoriteSlice'

export function useFavorites() {
  const dispatch = useAppDispatch()

  const favoriteIds = useSelector((state: RootState) => state.favorites.userIds)

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
