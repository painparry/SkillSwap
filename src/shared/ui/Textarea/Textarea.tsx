import { ReactNode, ChangeEvent, useId } from 'react'
import clsx from 'clsx'
import styles from './Textarea.module.css'

interface TextareaProps {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  label?: string
  maxLength?: number
  rows?: number
  className?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  id?: string
}

export const Textarea = ({
  value,
  onChange,
  placeholder,
  label,
  maxLength,
  rows = 4,
  className,
  leftIcon,
  rightIcon,
  id: customId,
}: TextareaProps) => {
  const reactGeneratedId = useId()
  const finalId = customId || reactGeneratedId

  return (
    <div className={styles.textareaWrapper}>
      {label && (
        <label className={styles.label} htmlFor={finalId}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        <textarea
          id={finalId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={rows}
          className={clsx(
            styles.textarea,
            {
              [styles.withLeftIcon]: !!leftIcon,
              [styles.withRightIcon]: !!rightIcon,
            },
            className,
          )}
        />

        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>
    </div>
  )
}
