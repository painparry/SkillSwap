import { useState, useRef, useEffect, useId } from 'react'
import clsx from 'clsx'
import styles from './SingleSelect.module.css'

export type SingleSelectOption = {
  value: string
  label: string
}

export type SingleSelectProps = {
  options: SingleSelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

export function SingleSelect({
  options,
  value,
  onChange,
  placeholder = 'Выберите значение',
  label,
  className,
}: SingleSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const id = useId()

  const selectedLabel = options.find((opt) => opt.value === value)?.label

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={clsx(styles.root, className)} ref={rootRef}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        className={clsx(styles.trigger, { [styles.triggerOpen]: isOpen })}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className={selectedLabel ? styles.value : styles.placeholder}>
          {selectedLabel ?? placeholder}
        </span>
        <span className={clsx(styles.chevron, { [styles.chevronOpen]: isOpen })} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul className={styles.list}>
          {options.map((option) => (
            <li
              key={option.value}
              className={clsx(styles.option, { [styles.optionSelected]: option.value === value })}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}