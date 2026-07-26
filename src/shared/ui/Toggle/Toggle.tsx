import { HeartIcon } from './HeartIcon'
import styles from './Toggle.module.css'

export interface ToggleProps {
  liked: boolean
  onToggle: () => void
  count?: number
  className?: string
}

export function Toggle({ liked, onToggle, count, className }: ToggleProps) {
  const classNames = [styles.toggle, className].filter(Boolean).join(' ')
  const digits = count !== undefined ? String(count).length : 1
  const countOffset = -3 - (digits - 1) * 3

  return (
    <button
      type="button"
      className={classNames}
      onClick={onToggle}
      aria-pressed={liked}
      aria-label={
        liked
          ? `Убрать лайк${count !== undefined ? `, ${count} лайков` : ''}`
          : `Поставить лайк${count !== undefined ? `, ${count} лайков` : ''}`
      }
    >
      <HeartIcon filled={liked} />
      {count !== undefined && (
        <span className={styles.count} style={{ right: `${countOffset}px` }}>
          {count}
        </span>
      )}
    </button>
  )
}
