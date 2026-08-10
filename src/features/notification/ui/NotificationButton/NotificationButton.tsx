import { BellIcon } from './BellIcon'
import styles from './NotificationButton.module.css'

export function NotificationButton() {
  return (
    <button type="button" className={styles.button} aria-label="Уведомления">
      <BellIcon />
    </button>
  )
}
