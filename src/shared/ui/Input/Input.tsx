import { ReactNode } from 'react'
import type { HTMLInputTypeAttribute } from 'react'
import styles from './Input.module.css'
import clsx from 'clsx'

export interface InputProps {
  value: string;
  placeholder?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  helperText?: string;
  error?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}


export function Input({value, placeholder, label, type, onChange, className, helperText, error, leftIcon, rightIcon}: InputProps) {
  const inputStyle = clsx(
    styles.input,
    {
      [styles.withLeftIcon] : leftIcon,
      [styles.withRightIcon] : rightIcon,
      [styles.inputError] : error,
    },
    className
);

  return (
    <div className={styles.inputWrapper}>
      {label && (<label className={styles.label}>
        {label}
      </label>
      )}
      <div className={styles.inputContainer}>
        {leftIcon && (
          <span className={styles.leftIcon}>
            {leftIcon}
          </span>
        )}
        <input value={value} type={type||"text"} className={inputStyle} onChange={onChange} placeholder={placeholder} />
        {rightIcon && (
          <span className={styles.rightIcon}>
            {rightIcon}
          </span>
        )}
      </div>
      {helperText && (<p className={`${styles.helperText} ${error ? styles.helperError : ''}`}>{helperText}</p>)}
    </div>
  )
}
