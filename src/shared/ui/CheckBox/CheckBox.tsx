import type { ChangeEvent } from 'react'
import styles from './CheckBox.module.css'

type TCheckbox = {
  id?: string
  name: string
  value: string
  label: string
  className?: string
  disabled?: boolean
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  typeChecked: 'line' | 'mark'
}

export const CheckBox = ({
  id,
  name,
  value,
  label,
  className,
  disabled,
  checked,
  onChange,
  typeChecked,
}: TCheckbox) => {
  return (
    <label className={`${styles.container} ${className ?? ''}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        className="visuallyHidden"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <span className={`${styles.checkBox} ${styles[typeChecked]}`}></span>
      <span className={styles.label}>{label}</span>
    </label>
  )
}

/**
 * Чекбокс. 2 вида состояния checked: галочка и полоса.
 *
 * - `typeChecked` выбирает вид отметки: `'line'` (тире) или `'mark'` (галочка), на логику не влияет
 * - для множественного выбора держи в родителе массив и фильтруй его по `e.target.checked`
 *
 * @example
 * const [tags, setTags] = useState<string[]>([])
 * <CheckBox
 *   name="tags"
 *   value="react"
 *   label="React"
 *   typeChecked="mark"
 *   checked={tags.includes('react')}
 *   onChange={(e) =>
 *     setTags((prev) => (e.target.checked ? [...prev, e.target.value] : prev.filter((t) => t !== e.target.value)))
 *   }
 * />
 */