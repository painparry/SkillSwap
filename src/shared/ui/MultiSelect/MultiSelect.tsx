import clsx from 'clsx'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import { CheckBox } from '@/shared/ui/CheckBox/CheckBox'
import { Tag } from '@/shared/ui/Tag'
import styles from './MultiSelect.module.css'

export type MultiSelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  label?: string
  placeholder?: string
  name?: string
  id?: string
  disabled?: boolean
  className?: string
}

export function MultiSelect({
  options,
  selectedValues,
  onChange,
  label,
  placeholder = 'Выберите значение',
  name,
  id,
  disabled = false,
  className,
}: MultiSelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const listId = `${selectId}-list`
  const rootRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const selectedOptions = useMemo(
    () => options.filter((option) => selectedValues.includes(option.value)),
    [options, selectedValues],
  )

  const isDisabled = disabled || options.length === 0

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [])

  useEffect(() => {
    if (isDisabled) {
      setIsOpen(false)
    }
  }, [isDisabled])

  const handleToggle = () => {
    if (!isDisabled) {
      setIsOpen((currentValue) => !currentValue)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target

    if (checked) {
      onChange([...selectedValues, value])
      return
    }

    onChange(selectedValues.filter((selectedValue) => selectedValue !== value))
  }

  const handleRemove = (value: string) => {
    onChange(selectedValues.filter((selectedValue) => selectedValue !== value))
  }

  return (
    <div className={clsx(styles.root, className)} ref={rootRef}>
      {label && (
        <label className={styles.label} id={`${selectId}-label`}>
          {label}
        </label>
      )}

      <div className={styles.field}>
        <button
          type="button"
          className={clsx(styles.control, {
            [styles.controlOpen]: isOpen,
            [styles.controlDisabled]: isDisabled,
          })}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-labelledby={label ? `${selectId}-label` : undefined}
          disabled={isDisabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <span className={clsx(styles.placeholder, { [styles.hasValue]: selectedOptions.length })}>
            {selectedOptions.length ? `Выбрано: ${selectedOptions.length}` : placeholder}
          </span>
          <span className={clsx(styles.chevron, { [styles.chevronOpen]: isOpen })} aria-hidden />
        </button>

        {isOpen && (
          <div className={styles.dropdown} id={listId} role="listbox" aria-multiselectable="true">
            {options.map((option) => (
              <CheckBox
                key={option.value}
                id={`${selectId}-${option.value}`}
                name={name ?? selectId}
                value={option.value}
                label={option.label}
                typeChecked="mark"
                className={styles.option}
                checked={selectedValues.includes(option.value)}
                disabled={option.disabled}
                onChange={handleOptionChange}
              />
            ))}
          </div>
        )}
      </div>

      {selectedOptions.length > 0 && (
        <div className={styles.tags} aria-label="Выбранные значения">
          {selectedOptions.map((option) => (
            <Tag key={option.value} label={option.label} onRemove={() => handleRemove(option.value)} />
          ))}
        </div>
      )}
    </div>
  )
}
