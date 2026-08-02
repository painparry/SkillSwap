import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button } from '@/shared/ui/Button'
import styles from './DatePicker.module.css'

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const defaultMaxYear = 2026
const defaultViewDate = new Date(2000, 3, 27)

export interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  minYear?: number
  maxYear?: number
  className?: string
}

type CalendarDay = {
  date: Date
  isCurrentMonth: boolean
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

function clampNumber(value: number, minValue: number, maxValue: number) {
  return Math.min(Math.max(value, minValue), maxValue)
}

function getDaysInMonth(month: number, year = defaultViewDate.getFullYear()) {
  return new Date(year, month, 0).getDate()
}

function formatInputValue(value: string, minYear: number, maxYear: number) {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  const dayDigits = digits.slice(0, 2)
  const monthDigits = digits.slice(2, 4)
  const yearDigits = digits.slice(4, 8)
  const monthValue =
    monthDigits.length === 2 ? clampNumber(Number(monthDigits), 1, monthNames.length) : null
  const yearValue =
    yearDigits.length === 4 ? clampNumber(Number(yearDigits), minYear, maxYear) : null
  const maxDay = monthValue
    ? getDaysInMonth(monthValue, yearValue ?? defaultViewDate.getFullYear())
    : 31
  const parts: string[] = []

  if (dayDigits.length === 1) {
    parts.push(Number(dayDigits) > 3 ? '3' : dayDigits)
  }

  if (dayDigits.length === 2) {
    parts.push(String(clampNumber(Number(dayDigits), 1, maxDay)).padStart(2, '0'))
  }

  if (monthDigits.length === 1) {
    parts.push(Number(monthDigits) > 1 ? '1' : monthDigits)
  }

  if (monthDigits.length === 2) {
    parts.push(String(monthValue).padStart(2, '0'))
  }

  if (yearDigits.length > 0 && yearDigits.length < 4) {
    parts.push(yearDigits)
  }

  if (yearDigits.length === 4) {
    parts.push(String(yearValue))
  }

  return parts.join('.')
}

function getCaretPosition(value: string, digitsBeforeCaret: number) {
  if (digitsBeforeCaret === 0) {
    return 0
  }

  let digitsCount = 0

  for (let index = 0; index < value.length; index += 1) {
    if (/\d/.test(value[index])) {
      digitsCount += 1
    }

    if (digitsCount === digitsBeforeCaret) {
      return index + 1
    }
  }

  return value.length
}

function parseDate(value: string, minYear = 1920, maxYear = defaultMaxYear) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value)

  if (!match) {
    return null
  }

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)

  if (
    year < minYear ||
    year > maxYear ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

function getMonthDays(viewDate: Date): CalendarDay[] {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const mondayIndex = (firstDay.getDay() + 6) % 7
  const startDate = new Date(year, month, 1 - mondayIndex)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + index)

    return {
      date,
      isCurrentMonth: date.getMonth() === month,
    }
  })
}

function isSameDate(firstDate: Date | null, secondDate: Date) {
  return (
    firstDate?.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  )
}

function clampDay(year: number, month: number, day: number) {
  return Math.min(day, new Date(year, month + 1, 0).getDate())
}

export function DatePicker({
  value,
  onChange,
  label = 'Дата рождения',
  placeholder = 'дд.мм.гггг',
  minYear = 1920,
  maxYear = defaultMaxYear,
  className,
}: DatePickerProps) {
  const labelId = useId()
  const calendarId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputSelectionRef = useRef<number | null>(null)
  const parsedValue = parseDate(value, minYear, maxYear)
  const initialDate = parsedValue ?? defaultViewDate
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(initialDate)
  const [pendingDate, setPendingDate] = useState<Date | null>(parsedValue)

  const years = useMemo(
    () => Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index),
    [maxYear, minYear],
  )
  const calendarDays = useMemo(() => getMonthDays(viewDate), [viewDate])

  useLayoutEffect(() => {
    const input = inputRef.current

    if (!input || document.activeElement !== input || inputSelectionRef.current === null) {
      return
    }

    const nextPosition = Math.min(inputSelectionRef.current, value.length)
    input.setSelectionRange(nextPosition, nextPosition)
    inputSelectionRef.current = null
  }, [value])

  useEffect(() => {
    const nextDate = parseDate(value, minYear, maxYear)

    if (!nextDate) {
      return
    }

    setPendingDate(nextDate)
    setViewDate(nextDate)
  }, [maxYear, minYear, value])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const caretPosition = event.target.selectionStart ?? event.target.value.length
    const digitsBeforeCaret = event.target.value.slice(0, caretPosition).replace(/\D/g, '').length
    const nextValue = formatInputValue(event.target.value, minYear, maxYear)
    inputSelectionRef.current = getCaretPosition(nextValue, digitsBeforeCaret)
    onChange(nextValue)

    const nextDate = parseDate(nextValue, minYear, maxYear)
    if (nextDate) {
      setPendingDate(nextDate)
      setViewDate(nextDate)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }

    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      const nextValue = formatInputValue(event.target.value, minYear, maxYear)
      const nextDate = parseDate(nextValue, minYear, maxYear)

      if (!nextDate) {
        return
      }

      event.preventDefault()
      setPendingDate(nextDate)
      setViewDate(nextDate)
      onChange(formatDate(nextDate))
      setIsOpen(false)
    }
  }

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextMonth = Number(event.target.value)

    setViewDate((currentDate) => {
      const day = clampDay(currentDate.getFullYear(), nextMonth, currentDate.getDate())
      return new Date(currentDate.getFullYear(), nextMonth, day)
    })
  }

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextYear = Number(event.target.value)

    setViewDate((currentDate) => {
      const day = clampDay(nextYear, currentDate.getMonth(), currentDate.getDate())
      return new Date(nextYear, currentDate.getMonth(), day)
    })
  }

  const handleCancel = () => {
    onChange('')
    setPendingDate(null)
    setViewDate(defaultViewDate)
    setIsOpen(false)
  }

  const handleApply = () => {
    if (pendingDate) {
      onChange(formatDate(pendingDate))
    }

    setIsOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(' ')}
      onKeyDown={handleKeyDown}
    >
      <label id={labelId} className={styles.label} htmlFor={calendarId}>
        {label}
      </label>
      <div className={styles.field}>
        <input
          id={calendarId}
          ref={inputRef}
          className={styles.input}
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          placeholder={placeholder}
          value={value}
          maxLength={10}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={`${calendarId}-calendar`}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        <button
          type="button"
          className={styles.calendarToggle}
          aria-label={isOpen ? 'Закрыть календарь' : 'Открыть календарь'}
          aria-expanded={isOpen}
          aria-controls={`${calendarId}-calendar`}
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M8 3V6M16 3V6M4 9H20M6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
            <path
              d="M8 13H8.01M12 13H12.01M16 13H16.01M8 17H8.01M12 17H12.01M16 17H16.01"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          id={`${calendarId}-calendar`}
          className={styles.calendar}
          role="dialog"
          aria-modal="false"
          aria-labelledby={labelId}
        >
          <div className={styles.calendarControls}>
            <label className={styles.selectWrapper}>
              <span className="visuallyHidden">Месяц</span>
              <select
                className={styles.select}
                value={viewDate.getMonth()}
                aria-label="Месяц"
                onChange={handleMonthChange}
              >
                {monthNames.map((monthName, index) => (
                  <option key={monthName} value={index}>
                    {monthName}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.selectWrapper}>
              <span className="visuallyHidden">Год</span>
              <select
                className={styles.select}
                value={viewDate.getFullYear()}
                aria-label="Год"
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.weekDays}>
            {weekDays.map((dayName) => (
              <span key={dayName}>{dayName}</span>
            ))}
          </div>

          <div className={styles.days}>
            {calendarDays.map(({ date, isCurrentMonth }) => (
              <button
                key={date.toISOString()}
                type="button"
                aria-label={formatDate(date)}
                className={[
                  styles.day,
                  !isCurrentMonth ? styles.mutedDay : '',
                  isSameDate(pendingDate, date) ? styles.selectedDay : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={isSameDate(pendingDate, date)}
                onClick={() => {
                  setPendingDate(date)
                  setViewDate(date)
                  onChange(formatDate(date))
                }}
              >
                {date.getDate()}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <Button className={styles.actionButton} variant="secondary" onClick={handleCancel}>
              Отменить
            </Button>
            <Button className={styles.actionButton} onClick={handleApply} disabled={!pendingDate}>
              Выбрать
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
