import { useState } from 'react'
import { UserCard, UserCardProps } from '@/entities/user/ui/UserCard'
import styles from './Section.module.css'

export interface UserSectionProps {
  title: string
  users: UserCardProps[]
}

export function UserSection({ title, users }: UserSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const displayedUsers = isExpanded ? users.slice(0, 6) : users.slice(0, 3)

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button className={styles.toggleButton} onClick={toggleExpand} aria-expanded={isExpanded}>
          {isExpanded ? (
            <>
              Свернуть
              <svg
                width="7.93"
                height="16"
                viewBox="0 0 7.93 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arrow}
              >
                <path
                  d="M7 1L1 8L7 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </>
          ) : (
            <>
              Смотреть все
              <svg
                width="7.93"
                height="16"
                viewBox="0 0 7.93 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.arrow}
              >
                <path
                  d="M1 1L7 8L1 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      <div className={styles.cardsGrid}>
        {displayedUsers.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </section>
  )
}
