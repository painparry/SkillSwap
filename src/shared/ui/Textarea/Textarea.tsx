import { ReactNode, ChangeEvent } from 'react'
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
  const generatedId = customId || `textarea-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={styles.textareaWrapper}>
      {label && (
        <label className={styles.label} htmlFor={generatedId}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

        <textarea
          id={generatedId}
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
          style={{ resize: 'vertical' }}
        />

        {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
      </div>
    </div>
  )
}
