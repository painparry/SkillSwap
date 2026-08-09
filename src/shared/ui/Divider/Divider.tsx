import { ReactNode } from 'react'
import styles from './Divider.module.css'

export type DividerProps = {
  children: ReactNode;
  className?: string;
}

export function Divider(props: DividerProps) {
  return (
    <div className={`${styles.dividerWrapper} ${props.className}`}>
      <hr className={styles.line} />
        <span className={styles.text}>{props.children}</span>
      <hr className={styles.line} />
    </div>
  )
}
