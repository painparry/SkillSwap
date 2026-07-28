import type { ChangeEvent } from 'react'
import styles from './RadioButton.module.css'

type TRadioButton = {
  id?: string
  name: string
  value: string
  label: string
  className?: string
  disabled?: boolean
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioButton = ({
  id,
  name,
  value,
  label,
  className,
  disabled,
  checked,
  onChange,
}: TRadioButton) => {
  return (
    <label className={`${styles.container} ${className ?? ''}`}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="visuallyHidden"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.radioButton}></span>
      <span className={styles.label}>{label}</span>
    </label>
  )
}
