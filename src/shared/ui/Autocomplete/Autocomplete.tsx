import type { ChangeEvent, KeyboardEvent } from 'react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import styles from './Autocomplete.module.css'

export type AutocompleteOption = {
  value: string
  label: string
}

export interface AutocompleteProps {
  options: AutocompleteOption[]
  value: string
  onChange: (value: string) => void
  onSelect?: (option: AutocompleteOption) => void
  label?: string
  placeholder?: string
  id?: string
  name?: string
  disabled?: boolean
  className?: string
  inputClassName?: string
  maxVisibleOptions?: number
}

export function Autocomplete({
  options,
  value,
  onChange,
  onSelect,
  label,
  placeholder,
  id,
  name,
  disabled = false,
  className,
  inputClassName,
  maxVisibleOptions = 6,
}: AutocompleteProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const listboxId = `${inputId}-listbox`
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const searchValue = value.trim().toLowerCase()
  const filteredOptions = useMemo(() => {
    if (!searchValue) {
      return []
    }

    return options
      .filter((option) => option.label.toLowerCase().includes(searchValue))
      .slice(0, maxVisibleOptions)
  }, [maxVisibleOptions, options, searchValue])

  const isListVisible = isOpen && filteredOptions.length > 0
  const activeOptionId = isListVisible ? `${listboxId}-option-${activeIndex}` : undefined

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
    setActiveIndex(0)
  }, [searchValue])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
    setIsOpen(true)
  }

  const selectOption = (option: AutocompleteOption) => {
    onChange(option.label)
    onSelect?.(option)
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      return
    }

    if (!filteredOptions.length) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((currentIndex) => (currentIndex + 1) % filteredOptions.length)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex(
        (currentIndex) => (currentIndex - 1 + filteredOptions.length) % filteredOptions.length,
      )
    }

    if (event.key === 'Enter' && isOpen) {
      event.preventDefault()
      selectOption(filteredOptions[activeIndex])
    }
  }

  return (
    <div className={`${styles.root} ${className ?? ''}`} ref={rootRef}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className={`${styles.field} ${isListVisible ? styles.fieldOpen : ''}`}>
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={`${styles.input} ${inputClassName ?? ''}`}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isListVisible}
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {value && !disabled && (
          <button
            type="button"
            className={styles.clearButton}
            aria-label={`Очистить поле${label ? ` ${label}` : ''}`}
            onClick={handleClear}
          >
            x
          </button>
        )}
      </div>

      {isListVisible && (
        <ul className={styles.listbox} id={listboxId} role="listbox">
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              id={`${listboxId}-option-${index}`}
              className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
