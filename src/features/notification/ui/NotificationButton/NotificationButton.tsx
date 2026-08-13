import { BellIcon } from './BellIcon'
import styles from './NotificationButton.module.css'

interface NotificationButtonProps {
  isActive?: boolean
  onClick?: () => void
}

export function NotificationButton({ isActive = false, onClick }: NotificationButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label="Уведомления"
      aria-expanded={isActive}
      onClick={onClick}
    >
      <BellIcon />
    </button>
  )
}
