import { UserCard } from '@/entities/user/ui/UserCard'
import { UserCardProps } from '@/entities/user/ui/UserCard'
import styles from './UsersGrid.module.css'

interface UsersGridProps {
  users?: UserCardProps[]
}

const UsersGrid = ({ users = [] }: UsersGridProps) => {
  if (users.length === 0) {
    return <div className={styles.empty}>Пользователи не найдены</div>
  }

  return (
    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  )
}

UsersGrid.defaultProps = {
  users: [],
}

export default UsersGrid
