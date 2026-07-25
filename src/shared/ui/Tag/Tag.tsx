import { CrossIcon } from './CrossIcon'
import styles from './Tag.module.css'

export interface TagProps {
  label: string
  onRemove: () => void
  className?: string
}

export function Tag({ label, onRemove, className }: TagProps) {
  const classNames = [styles.tag, className].filter(Boolean).join(' ')

  return (
    <span className={classNames}>
      {label}
      <button
        type="button"
        className={styles.remove}
        onClick={onRemove}
        aria-label={`Удалить «${label}»`}
      >
        <CrossIcon />
      </button>
    </span>
  )
}
