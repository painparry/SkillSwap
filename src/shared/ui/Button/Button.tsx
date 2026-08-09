import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outlined'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
}

export function Button({
  children,
  variant = 'primary',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  return (
    <button type={type} className={classNames} {...rest}>
      {children}
    </button>
  )
}
