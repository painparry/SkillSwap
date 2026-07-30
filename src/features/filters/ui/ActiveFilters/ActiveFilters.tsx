import { Button } from '@/shared/ui/Button'
import { Tag } from '@/shared/ui/Tag'
import styles from './ActiveFilters.module.css'

export interface ActiveFilter {
  id: string
  label: string
}

export interface ActiveFiltersProps {
  filters: ActiveFilter[]
  onRemove: (id: string) => void
  onReset: () => void
  title?: string
  className?: string
}

export function ActiveFilters({
  filters,
  onRemove,
  onReset,
  title = 'Фильтры',
  className,
}: ActiveFiltersProps) {
  const activeCount = filters.length
  const classNames = [styles.activeFilters, className].filter(Boolean).join(' ')

  return (
    <section className={classNames} aria-label={title}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title} <span>({activeCount})</span>
        </h2>

        <Button
          className={styles.resetButton}
          variant="tertiary"
          onClick={onReset}
          disabled={activeCount === 0}
          aria-label="Сбросить все фильтры"
        >
          <span>Сбросить</span>
          <span className={styles.resetIcon} aria-hidden="true">
            ×
          </span>
        </Button>
      </div>

      {activeCount > 0 && (
        <ul className={styles.list} aria-label="Выбранные фильтры">
          {filters.map((filter) => (
            <li className={styles.item} key={filter.id}>
              <Tag label={filter.label} onRemove={() => onRemove(filter.id)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
