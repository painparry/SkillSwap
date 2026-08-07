import { Link } from 'react-router-dom'
import { Logo } from '@/shared/ui/logo'
import { HeartIcon } from '@/shared/ui/Toggle/HeartIcon'
import { UserMenu } from '@/features/user-menu'
import { ROUTES } from '@/shared/lib/constants'
import { MoonIcon } from './MoonIcon'
import { BellIcon } from './BellIcon'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />

      <div className={styles.actions}>
        <button type="button" className={styles.iconButton} aria-label="Сменить тему">
          <MoonIcon />
        </button>
        <button type="button" className={styles.iconButton} aria-label="Уведомления">
          <BellIcon />
        </button>
        <Link to={ROUTES.FAVORITES} className={styles.iconButton} aria-label="Избранное">
          <HeartIcon filled={false} />
        </Link>
        <UserMenu />
      </div>
    </header>
  )
}