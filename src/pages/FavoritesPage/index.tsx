import { selectFavoritesUsers } from '@/entities/favorite/model/selectors'
import { useFavorites } from '@/entities/favorite/model/useFavorites'
import { UserCardProps } from '@/entities/user/ui/UserCard'
import { UserSection } from '@/shared/ui/Section'
import { useSelector } from 'react-redux'
import styles from './FavoritePage.module.css'
import { Button } from '@/shared/ui/Button'
import noFavoritesImage from '../../assets/images/no-favorites.png'
import { useNavigate } from 'react-router-dom'

export default function FavoritesPage() {
  const users = useSelector(selectFavoritesUsers)
  const navigate = useNavigate()

  const { toggleFavorite } = useFavorites()
  const cards: UserCardProps[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    city: user.city,
    age: user.age,
    avatarUrl: user.avatarUrl,

    canTeach: [],
    wantsToLearn: [],

    liked: true,
    likesCount: user.likes,
    onToggleLike: () => {
      toggleFavorite(user.id)
    },
  }))

  const isEmpty = cards.length === 0

  return (
    <main className={styles.page}>
      <>
        {isEmpty ? (
          <>
            <img className={styles.images} src={noFavoritesImage} alt="Нет избранных навыков" />
            <h2 className={styles.title}>Пока нет избранных навыков</h2>
            <p className={styles.text}>
              Добавляйте навыки в избранное, чтобы быстро находить их и возвращайтесь к ним позже.
            </p>
            <Button className={styles.button} onClick={() => navigate('/')}>
              Перейти к навыкам
            </Button>
          </>
        ) : (
          <div className={styles.content}>
            <UserSection title="Избранное" users={cards} />
          </div>
        )}
      </>
    </main>
  )
}
