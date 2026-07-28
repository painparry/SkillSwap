import { ReactNode } from 'react';
import type { HTMLInputTypeAttribute } from 'react';
import styles from './Input.module.css'

export interface InputProps {
  value: string;
  placeholder?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Input({value, placeholder, label, type, onChange, className, leftIcon, rightIcon}: InputProps) {

  return (
    <div className={styles.inputWrapper}>
      {label&&<label className={styles.label}>
        {label}
      </label>}
      {leftIcon}
      <input value={value} type={type||"text"} className={`${styles.input} ${className||""}`} onChange={onChange} placeholder={placeholder} />
      {rightIcon}
    </div>
  )
}
