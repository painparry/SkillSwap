import { MoonIcon } from './MoonIcon'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  return (
    <button type="button" className={styles.button} aria-label="Сменить тему">
      <MoonIcon />
    </button>
  )
}
